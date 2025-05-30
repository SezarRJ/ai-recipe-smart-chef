
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Recipe, RecipeFilters } from '@/types/recipe';
import {
  fetchRecipesFromDB,
  createRecipeInDB,
  updateRecipeInDB,
  deleteRecipeFromDB,
  toggleFavoriteInDB
} from '@/services/recipeService';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRecipes = async (filters?: RecipeFilters) => {
    setLoading(true);
    setError(null);

    try {
      const formattedRecipes = await fetchRecipesFromDB(filters);
      setRecipes(formattedRecipes);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error fetching recipes',
        description: err.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createRecipe = async (recipeData: Partial<Recipe>) => {
    try {
      const data = await createRecipeInDB(recipeData);
      
      toast({
        title: 'Recipe created successfully',
        description: 'Your recipe has been saved as a draft.'
      });

      return data;
    } catch (err: any) {
      toast({
        title: 'Error creating recipe',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    try {
      const data = await updateRecipeInDB(id, updates);

      toast({
        title: 'Recipe updated successfully'
      });

      return data;
    } catch (err: any) {
      toast({
        title: 'Error updating recipe',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      await deleteRecipeFromDB(id);

      toast({
        title: 'Recipe deleted successfully'
      });

      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (err: any) {
      toast({
        title: 'Error deleting recipe',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const toggleFavorite = async (recipeId: string) => {
    try {
      const isFavorited = await toggleFavoriteInDB(recipeId);
      
      toast({
        title: isFavorited ? 'Added to favorites' : 'Removed from favorites'
      });

      // Refresh recipes to update favorite status
      fetchRecipes();
    } catch (err: any) {
      toast({
        title: 'Error updating favorites',
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite
  };
};
