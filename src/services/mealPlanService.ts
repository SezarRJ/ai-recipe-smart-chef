
import { supabase } from '@/integrations/supabase/client';
import { MealPlan, Meal, Recipe } from '@/types/index';
import { recipeService } from './recipeService';

export const mealPlanService = {
  async getMealPlan(userId: string, date: string): Promise<MealPlan | null> {
    const { data, error } = await supabase
      .from('meal_plans')
      .select(`
        *,
        recipes(
          *,
          recipe_ingredients(
            quantity,
            unit,
            ingredients(name)
          ),
          recipe_categories(name)
        )
      `)
      .eq('user_id', userId)
      .eq('date', date);

    if (error) {
      console.error('Error fetching meal plan:', error);
      return null;
    }

    if (!data || data.length === 0) {
      return {
        id: `meal-plan-${date}`,
        date,
        meals: []
      };
    }

    const meals: Meal[] = data.map(item => ({
      id: item.id,
      type: item.meal_type as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      recipe: item.recipes ? transformRecipeFromMealPlan(item.recipes) : createEmptyRecipe(),
      notes: item.notes || undefined
    }));

    return {
      id: `meal-plan-${date}`,
      date,
      meals
    };
  },

  async addMealToPlan(userId: string, date: string, mealType: string, recipeId: string, notes?: string): Promise<boolean> {
    const { error } = await supabase
      .from('meal_plans')
      .insert({
        user_id: userId,
        date,
        meal_type: mealType,
        recipe_id: recipeId,
        notes
      });

    if (error) {
      console.error('Error adding meal to plan:', error);
      return false;
    }

    return true;
  },

  async removeMealFromPlan(mealId: string): Promise<boolean> {
    const { error } = await supabase
      .from('meal_plans')
      .delete()
      .eq('id', mealId);

    if (error) {
      console.error('Error removing meal from plan:', error);
      return false;
    }

    return true;
  },

  async updateMealNotes(mealId: string, notes: string): Promise<boolean> {
    const { error } = await supabase
      .from('meal_plans')
      .update({ notes })
      .eq('id', mealId);

    if (error) {
      console.error('Error updating meal notes:', error);
      return false;
    }

    return true;
  }
};

function createEmptyRecipe(): Recipe {
  return {
    id: '',
    title: 'Unknown Recipe',
    description: '',
    image: '/placeholder.svg',
    image_url: '/placeholder.svg',
    prep_time: 0,
    prepTime: 0,
    cook_time: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    calories: 0,
    cuisine_type: '',
    rating: 0,
    ratingCount: 0,
    ingredients: [],
    instructions: [],
    categories: [],
    tags: [],
    status: 'draft',
    author_id: '',
    is_verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isFavorite: false
  };
}

function transformRecipeFromMealPlan(dbRecipe: any): Recipe {
  return {
    id: dbRecipe.id,
    title: dbRecipe.title,
    description: dbRecipe.description || '',
    image: dbRecipe.image_url || '/placeholder.svg',
    image_url: dbRecipe.image_url || '/placeholder.svg',
    prep_time: dbRecipe.prep_time || 0,
    prepTime: dbRecipe.prep_time || 0,
    cook_time: dbRecipe.cooking_time || 0,
    cookTime: dbRecipe.cooking_time || 0,
    servings: dbRecipe.servings || 1,
    difficulty: dbRecipe.difficulty || 'Easy',
    calories: dbRecipe.calories || 0,
    cuisine_type: dbRecipe.cuisine_type || '',
    rating: dbRecipe.rating || 0,
    ratingCount: dbRecipe.rating_count || 0,
    ingredients: dbRecipe.recipe_ingredients?.map((ri: any) => ({
      id: ri.ingredients?.id || '',
      name: ri.ingredients?.name || '',
      amount: ri.quantity || 0,
      unit: ri.unit || '',
      inPantry: false
    })) || [],
    instructions: Array.isArray(dbRecipe.instructions) 
      ? dbRecipe.instructions 
      : dbRecipe.instructions 
        ? [dbRecipe.instructions] 
        : [],
    categories: dbRecipe.recipe_categories?.name ? [dbRecipe.recipe_categories.name] : [],
    tags: [],
    status: 'published',
    author_id: dbRecipe.user_id || '',
    is_verified: dbRecipe.is_verified || false,
    created_at: dbRecipe.created_at || new Date().toISOString(),
    updated_at: dbRecipe.updated_at || new Date().toISOString(),
    isFavorite: false
  };
}
