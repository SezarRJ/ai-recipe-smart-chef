
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Recipe, recipeService, PantryItemWithIngredient } from '@/services/recipeService';
import { toast } from '@/hooks/use-toast';

type SearchFilters = {
  dietary?: string;
  cookingTime?: string;
  difficulty?: string;
  cuisineType?: string;
  allergenFree?: string[];
  mealType?: string;
  religiousDiet?: string;
  healthGoal?: string;
};

export const useRecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});

  // Get ingredients from pantry
  const pantryQuery = useQuery({
    queryKey: ['pantryItems'],
    queryFn: recipeService.getUserPantryItems,
    enabled: false, // Only load when user is authenticated and explicit call
  });

  // Text-based search
  const textSearchQuery = useQuery({
    queryKey: ['recipeSearch', searchQuery],
    queryFn: () => recipeService.searchRecipes(searchQuery),
    enabled: searchQuery.length > 2,
  });

  // Ingredient-based search
  const ingredientSearchQuery = useQuery({
    queryKey: ['recipesByIngredients', selectedIngredients],
    queryFn: () => recipeService.searchRecipesByIngredients(selectedIngredients),
    enabled: selectedIngredients.length > 0,
  });

  // Combined results from both searches
  const results = (): Recipe[] => {
    const textResults = textSearchQuery.data || [];
    const ingredientResults = ingredientSearchQuery.data || [];

    // Merge and deduplicate results
    const combinedResults = [...textResults];

    ingredientResults.forEach(recipe => {
      if (!combinedResults.some(r => r.id === recipe.id)) {
        combinedResults.push(recipe);
      }
    });

    // Apply filters (simplified example - in a real app, this would be more detailed)
    return combinedResults.filter(recipe => {
      let passesFilter = true;

      if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
        passesFilter = false;
      }

      if (filters.cuisineType && recipe.cuisine_type !== filters.cuisineType) {
        passesFilter = false;
      }

      if (filters.cookingTime) {
        const maxTime = parseInt(filters.cookingTime);
        if (recipe.cook_time && recipe.cook_time > maxTime) {
          passesFilter = false;
        }
      }

      // More filter logic would go here

      return passesFilter;
    });
  };

  const handleIngredientAdd = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const handleIngredientRemove = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(item => item !== ingredient));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const loadPantryItems = async () => {
    try {
      await pantryQuery.refetch();
      // Extract ingredient names from pantry items with proper typing
      const pantryIngredients = (pantryQuery.data as PantryItemWithIngredient[] || [])
        .map((item: PantryItemWithIngredient) => item.ingredient?.name || '')
        .filter(name => name.length > 0);

      if (pantryIngredients && pantryIngredients.length) {
        setSelectedIngredients(pantryIngredients);
      } else {
        toast({
          title: "No pantry items found",
          description: "Add ingredients to your pantry first"
        });
      }
    } catch (error) {
      console.error("Failed to load pantry items:", error);
      toast({
        title: "Failed to load pantry items",
        variant: "destructive"
      });
    }
  };

  return {
    searchQuery,
    selectedIngredients,
    filters,
    results: results(),
    isLoading: textSearchQuery.isLoading || ingredientSearchQuery.isLoading,
    isPantryLoading: pantryQuery.isLoading,
    handleSearch,
    handleIngredientAdd,
    handleIngredientRemove,
    handleFilterChange,
    loadPantryItems
  };
};
