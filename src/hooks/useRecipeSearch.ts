
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Recipe } from '@/types/index';
import recipeService from '@/services/recipeService';
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

  // Get ingredients from pantry using simplified approach
  const pantryQuery = useQuery({
    queryKey: ['pantryItems'],
    queryFn: async () => {
      try {
        const pantryData = await recipeService.getUserPantryItems();
        return pantryData || [];
      } catch (error) {
        console.error('Error fetching pantry items:', error);
        return [];
      }
    },
    enabled: false,
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

    // Apply filters
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
        if (recipe.cookTime && recipe.cookTime > maxTime) {
          passesFilter = false;
        }
      }

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
      const pantryData = pantryQuery.data;
      
      if (pantryData && Array.isArray(pantryData) && pantryData.length > 0) {
        // Extract ingredient names from pantry items
        const pantryIngredients = pantryData
          .map((item: any) => item.ingredient?.name || item.name || '')
          .filter(name => name.length > 0);

        if (pantryIngredients.length > 0) {
          setSelectedIngredients(pantryIngredients);
        } else {
          toast({
            title: "No pantry items found",
            description: "Add ingredients to your pantry first"
          });
        }
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
