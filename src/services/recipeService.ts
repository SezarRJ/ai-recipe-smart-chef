
import { supabase } from '@/integrations/supabase/client';
import { Recipe } from '@/types/index';

export const recipeService = {
  async getRecipes(filters?: {
    search?: string;
    category?: string;
    difficulty?: string;
    maxCookTime?: number;
    cuisine?: string;
  }): Promise<Recipe[]> {
    try {
      let query = supabase
        .from('recipes')
        .select(`
          *,
          recipe_categories(name),
          recipe_ingredients(
            quantity,
            unit,
            ingredients(name)
          )
        `)
        .eq('is_public', true)
        .eq('is_published', true);

      if (filters?.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }

      if (filters?.maxCookTime) {
        query = query.lte('cooking_time', filters.maxCookTime);
      }

      if (filters?.cuisine) {
        query = query.eq('cuisine_type', filters.cuisine);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data?.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description || '',
        image: recipe.image_url || '',
        image_url: recipe.image_url || '',
        prep_time: recipe.prep_time || 0,
        cooking_time: recipe.cooking_time || 0,
        cook_time: recipe.cooking_time || 0, // For compatibility
        total_time: (recipe.prep_time || 0) + (recipe.cooking_time || 0),
        servings: recipe.servings || 1,
        difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard' || 'Easy',
        calories: recipe.calories || 0,
        protein: recipe.protein || 0,
        carbs: recipe.carbs || 0,
        fat: recipe.fat || 0,
        rating: Number(recipe.rating) || 0,
        rating_count: recipe.rating_count || 0,
        ingredients: recipe.recipe_ingredients?.map((ri: any) => ({
          id: ri.id,
          name: ri.ingredients?.name || '',
          quantity: ri.quantity || 0,
          unit: ri.unit || '',
          amount: ri.quantity || 0, // For compatibility
        })) || [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions.map(inst => String(inst)) : [],
        categories: recipe.recipe_categories ? [recipe.recipe_categories.name] : [],
        tags: [],
        isFavorite: false,
        is_published: recipe.is_published,
        is_public: recipe.is_public,
        user_id: recipe.user_id,
        created_at: recipe.created_at,
        updated_at: recipe.updated_at,
        cuisine_type: recipe.cuisine_type,
        category_id: recipe.category_id,
        is_verified: recipe.is_verified
      })) || [];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  },

  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          recipe_categories(name),
          recipe_ingredients(
            quantity,
            unit,
            ingredients(name)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        image: data.image_url || '',
        image_url: data.image_url || '',
        prep_time: data.prep_time || 0,
        cooking_time: data.cooking_time || 0,
        cook_time: data.cooking_time || 0,
        total_time: (data.prep_time || 0) + (data.cooking_time || 0),
        servings: data.servings || 1,
        difficulty: data.difficulty as 'Easy' | 'Medium' | 'Hard' || 'Easy',
        calories: data.calories || 0,
        protein: data.protein || 0,
        carbs: data.carbs || 0,
        fat: data.fat || 0,
        rating: Number(data.rating) || 0,
        rating_count: data.rating_count || 0,
        ingredients: data.recipe_ingredients?.map((ri: any) => ({
          id: ri.id,
          name: ri.ingredients?.name || '',
          quantity: ri.quantity || 0,
          unit: ri.unit || '',
          amount: ri.quantity || 0,
        })) || [],
        instructions: Array.isArray(data.instructions) ? data.instructions.map(inst => String(inst)) : [],
        categories: data.recipe_categories ? [data.recipe_categories.name] : [],
        tags: [],
        isFavorite: false,
        is_published: data.is_published,
        is_public: data.is_public,
        user_id: data.user_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        cuisine_type: data.cuisine_type,
        category_id: data.category_id,
        is_verified: data.is_verified
      };
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      return null;
    }
  },

  async createRecipe(recipe: Partial<Recipe>): Promise<Recipe | null> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert({
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image || recipe.image_url,
          prep_time: recipe.prep_time,
          cooking_time: recipe.cooking_time,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          calories: recipe.calories,
          protein: recipe.protein,
          carbs: recipe.carbs,
          fat: recipe.fat,
          instructions: recipe.instructions,
          is_published: false,
          is_public: true
        })
        .select()
        .single();

      if (error) throw error;

      return data ? await this.getRecipeById(data.id) : null;
    } catch (error) {
      console.error('Error creating recipe:', error);
      return null;
    }
  },

  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .update({
          title: updates.title,
          description: updates.description,
          image_url: updates.image || updates.image_url,
          prep_time: updates.prep_time,
          cooking_time: updates.cooking_time,
          servings: updates.servings,
          difficulty: updates.difficulty,
          calories: updates.calories,
          protein: updates.protein,
          carbs: updates.carbs,
          fat: updates.fat,
          instructions: updates.instructions
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data ? await this.getRecipeById(data.id) : null;
    } catch (error) {
      console.error('Error updating recipe:', error);
      return null;
    }
  },

  async deleteRecipe(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return false;
    }
  },

  // Legacy method names for compatibility
  fetchRecipesFromDB: async () => {
    return recipeService.getRecipes();
  },

  createRecipeInDB: async (recipe: Partial<Recipe>) => {
    return recipeService.createRecipe(recipe);
  },

  updateRecipeInDB: async (id: string, updates: Partial<Recipe>) => {
    return recipeService.updateRecipe(id, updates);
  },

  deleteRecipeFromDB: async (id: string) => {
    return recipeService.deleteRecipe(id);
  },

  toggleFavoriteInDB: async (userId: string, recipeId: string) => {
    // This should be handled by the favorites service
    console.log('Use favoritesService for favorites management');
    return false;
  },

  searchRecipes: async (query: string) => {
    return recipeService.getRecipes({ search: query });
  },

  searchRecipesByIngredients: async (ingredients: string[]) => {
    // For now, return all recipes - can be enhanced later
    return recipeService.getRecipes();
  },

  getUserPantryItems: async (userId?: string) => {
    // Mock pantry items for now
    return [];
  },

  getIngredientsForRecipe: async (recipeId: string) => {
    const recipe = await recipeService.getRecipeById(recipeId);
    return recipe?.ingredients || [];
  }
};

// Export the Recipe type for compatibility
export type { Recipe };
