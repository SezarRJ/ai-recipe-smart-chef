
import { useState, useEffect } from 'react';
import { Recipe } from '@/types/index';
import { recipeService } from '@/services/recipeService';
import { useToast } from '@/hooks/use-toast';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRecipes = async (filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching recipes with filters:', filters);
      const fetchedRecipes = await recipeService.getRecipes(filters);
      console.log('Fetched recipes:', fetchedRecipes);
      setRecipes(fetchedRecipes);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes');
      toast({
        title: 'Error',
        description: 'Failed to fetch recipes',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createRecipe = async (recipeData: Partial<Recipe>) => {
    try {
      console.log('Creating recipe:', recipeData);
      const newRecipe = await recipeService.createRecipe(recipeData);
      if (newRecipe) {
        setRecipes(prev => [newRecipe, ...prev]);
        toast({
          title: 'Success',
          description: 'Recipe created successfully'
        });
        return newRecipe;
      }
    } catch (err) {
      console.error('Error creating recipe:', err);
      toast({
        title: 'Error',
        description: 'Failed to create recipe',
        variant: 'destructive'
      });
    }
    return null;
  };

  const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    try {
      console.log('Updating recipe:', id, updates);
      const updatedRecipe = await recipeService.updateRecipe(id, updates);
      if (updatedRecipe) {
        setRecipes(prev => prev.map(recipe => 
          recipe.id === id ? updatedRecipe : recipe
        ));
        toast({
          title: 'Success',
          description: 'Recipe updated successfully'
        });
        return updatedRecipe;
      }
    } catch (err) {
      console.error('Error updating recipe:', err);
      toast({
        title: 'Error',
        description: 'Failed to update recipe',
        variant: 'destructive'
      });
    }
    return null;
  };

  const deleteRecipe = async (id: string) => {
    try {
      console.log('Deleting recipe:', id);
      const success = await recipeService.deleteRecipe(id);
      if (success) {
        setRecipes(prev => prev.filter(recipe => recipe.id !== id));
        toast({
          title: 'Success',
          description: 'Recipe deleted successfully'
        });
        return true;
      }
    } catch (err) {
      console.error('Error deleting recipe:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete recipe',
        variant: 'destructive'
      });
    }
    return false;
  };

  const getRecipeById = async (id: string) => {
    try {
      console.log('Fetching recipe by ID:', id);
      return await recipeService.getRecipeById(id);
    } catch (err) {
      console.error('Error fetching recipe by ID:', err);
      toast({
        title: 'Error',
        description: 'Failed to fetch recipe',
        variant: 'destructive'
      });
    }
    return null;
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
    getRecipeById
  };
};
