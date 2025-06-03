
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Recipe } from '@/types/index';
import { recipeService } from '@/services/recipeService';

interface SearchFilters {
  category?: string;
  difficulty?: string;
  search?: string;
}

export const useRecipeSearch = () => {
  const [filters, setFilters] = useState<SearchFilters>({});

  const { data: recipes = [], isLoading, error } = useQuery({
    queryKey: ['recipes', filters],
    queryFn: () => recipeService.fetchRecipesFromDB(filters),
    enabled: true,
  });

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    recipes,
    isLoading,
    error,
    filters,
    updateFilters,
    clearFilters,
  };
};
