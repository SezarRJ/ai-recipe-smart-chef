
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
      console.log('Fetching recipes with filters:', filters);
      const formattedRecipes = await fetchRecipesFromDB(filters);
      console.log('Fetched recipes:', formattedRecipes);
      setRecipes(formattedRecipes);
    } catch (err: any) {
      console.error('Error fetching recipes:', err);
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
      console.log('Creating recipe:', recipeData);
      const data = await createRecipeInDB(recipeData);
      console.log('Recipe created:', data);
      
      toast({
        title: 'Recipe created successfully',
        description: 'Your recipe has been saved as a draft.'
      });

      // Refresh recipes
      await fetchRecipes();
      return data;
    } catch (err: any) {
      console.error('Error creating recipe:', err);
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
      console.log('Updating recipe:', id, updates);
      const data = await updateRecipeInDB(id, updates);
      console.log('Recipe updated:', data);

      toast({
        title: 'Recipe updated successfully'
      });

      // Refresh recipes
      await fetchRecipes();
      return data;
    } catch (err: any) {
      console.error('Error updating recipe:', err);
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
      console.log('Deleting recipe:', id);
      await deleteRecipeFromDB(id);

      toast({
        title: 'Recipe deleted successfully'
      });

      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (err: any) {
      console.error('Error deleting recipe:', err);
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
      console.log('Toggling favorite for recipe:', recipeId);
      const isFavorited = await toggleFavoriteInDB(recipeId);
      
      toast({
        title: isFavorited ? 'Added to favorites' : 'Removed from favorites'
      });

      // Refresh recipes to update favorite status
      fetchRecipes();
    } catch (err: any) {
      console.error('Error updating favorites:', err);
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
