
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@/types/index';
import { recipeService } from '@/services/recipeService';

export const useRecipes = (filters?: any) => {
  return useQuery({
    queryKey: ['recipes', filters],
    queryFn: () => recipeService.fetchRecipesFromDB(filters),
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (recipeData: Partial<Recipe>) => recipeService.createRecipeInDB(recipeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Recipe> }) =>
      recipeService.updateRecipeInDB(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => recipeService.deleteRecipeFromDB(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (recipeId: string) => recipeService.toggleFavoriteInDB(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};
