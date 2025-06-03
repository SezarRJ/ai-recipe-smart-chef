
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Recipe } from '@/types/index';
import { recipeService } from '@/services/recipeService';
import { toast } from '@/hooks/use-toast';

interface SearchFilters {
  dietary?: string;
  cookingTime?: string;
  difficulty?: string;
  cuisineType?: string;
  allergenFree?: string[];
  mealType?: string;
  religiousDiet?: string;
  healthGoal?: string;
}

export const useRecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});

  // Text-based search
  const textSearchQuery = useQuery({
    queryKey: ['recipeSearch', searchQuery],
    queryFn: () => recipeService.fetchRecipesFromDB({ search: searchQuery }),
    enabled: searchQuery.length > 2,
  });

  // Ingredient-based search
  const ingredientSearchQuery = useQuery({
    queryKey: ['recipesByIngredients', selectedIngredients],
    queryFn: () => recipeService.fetchRecipesFromDB(),
    enabled: selectedIngredients.length > 0,
  });

  // Get pantry items
  const pantryQuery = useQuery({
    queryKey: ['pantryItems'],
    queryFn: async () => {
      try {
        // Mock implementation - replace with actual service call
        return [];
      } catch (error) {
        console.error('Error fetching pantry items:', error);
        return [];
      }
    },
    enabled: false,
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
        if (recipe.cooking_time && recipe.cooking_time > maxTime) {
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
      toast({
        title: "Pantry items loaded",
        description: "Successfully loaded pantry items"
      });
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
    recipes: results(), // For backward compatibility
    isLoading: textSearchQuery.isLoading || ingredientSearchQuery.isLoading,
    isPantryLoading: pantryQuery.isLoading,
    error: textSearchQuery.error || ingredientSearchQuery.error,
    handleSearch,
    handleIngredientAdd,
    handleIngredientRemove,
    handleFilterChange: setFilters,
    updateFilters: handleFilterChange,
    clearFilters: () => setFilters({}),
    loadPantryItems
  };
};
