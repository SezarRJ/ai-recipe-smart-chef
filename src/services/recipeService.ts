
import { supabase } from '@/integrations/supabase/client';
import { Recipe, RecipeIngredient } from '@/types/index';

export class RecipeService {
  async getRecipes(): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          recipe_ingredients (
            id,
            ingredient:ingredients (name),
            quantity,
            unit
          )
        `)
        .eq('is_published', true);

      if (error) throw error;

      // Convert database results to Recipe type with proper type conversion
      const recipes = data?.map(recipe => {
        // Convert Json[] to string[] for instructions
        const instructionsArray = Array.isArray(recipe.instructions) 
          ? recipe.instructions.map(instruction => String(instruction))
          : [];

        return {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image_url,
          image: recipe.image_url,
          prep_time: recipe.prep_time || 0,
          prepTime: recipe.prep_time || 0,
          cook_time: recipe.cooking_time || 0,
          cookTime: recipe.cooking_time || 0,
          servings: recipe.servings,
          difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard',
          calories: recipe.calories,
          cuisine_type: recipe.cuisine_type,
          cuisineType: recipe.cuisine_type,
          instructions: instructionsArray,
          categories: [], // Database doesn't have categories field, use empty array
          tags: [], // Database doesn't have tags field, use empty array
          status: 'published' as const,
          author_id: recipe.user_id,
          is_verified: recipe.is_verified || false,
          created_at: recipe.created_at,
          updated_at: recipe.updated_at,
          rating: 4.5,
          ratingCount: 89,
          isFavorite: false,
          ingredients: recipe.recipe_ingredients?.map((ri: any) => ({
            id: ri.id,
            name: ri.ingredient?.name || '',
            amount: ri.quantity,
            unit: ri.unit
          })) || []
        };
      }) || [];

      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  }

  async searchRecipes(query: string): Promise<Recipe[]> {
    // Implementation for text search
    return [];
  }

  async searchRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    // Implementation for ingredient-based search
    return [];
  }

  async getIngredientsForRecipe(recipeId: string): Promise<RecipeIngredient[]> {
    // Implementation to get ingredients for a specific recipe
    return [];
  }

  async getUserPantryItems() {
    // Implementation to get user's pantry items
    return [];
  }
}

// Export additional functions expected by useRecipes hook
export const fetchRecipesFromDB = async (filters?: any): Promise<Recipe[]> => {
  const service = new RecipeService();
  return service.getRecipes();
};

export const createRecipeInDB = async (recipeData: Partial<Recipe>): Promise<Recipe> => {
  // Implementation for creating recipe
  throw new Error('Not implemented');
};

export const updateRecipeInDB = async (id: string, updates: Partial<Recipe>): Promise<Recipe> => {
  // Implementation for updating recipe
  throw new Error('Not implemented');
};

export const deleteRecipeFromDB = async (id: string): Promise<void> => {
  // Implementation for deleting recipe
  throw new Error('Not implemented');
};

export const toggleFavoriteInDB = async (recipeId: string): Promise<boolean> => {
  // Implementation for toggling favorite
  return false;
};

const recipeService = new RecipeService();
export default recipeService;
