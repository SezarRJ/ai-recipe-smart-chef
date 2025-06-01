import { supabase } from '@/integrations/supabase/client';
import { Recipe } from '@/types/index';

// ... (other code and functions remain unchanged)

// AI-powered search function
export const searchRecipesByIngredientsAI = async (
  ingredients: string[],
  dietary_preferences?: string[],
  cuisine_type?: string
) => {
  // Replace <YOUR_SUPABASE_PROJECT> with your actual Supabase project ref
  const response = await fetch('https://<tnjttgmjjikmdrypvknp>.functions.supabase.co/find-recipes-by-ingredients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients, dietary_preferences, cuisine_type }),
  });
  if (!response.ok) throw new Error('AI search failed');
  const { recipes } = await response.json();
  return recipes;
};

export const recipeService = {
  searchRecipes: async (query: string) => {
    return fetchRecipesFromDB({ search: query });
  },

  searchRecipesByIngredients: async (ingredients: string[]) => {
    // ... (existing implementation)
  },

  searchRecipesByIngredientsAI, // <-- Add this line

  getUserPantryItems: async () => {
    // ... (existing implementation)
  },

  getIngredientsForRecipe: async (recipeId: string) => {
    // ... (existing implementation)
  }
};
