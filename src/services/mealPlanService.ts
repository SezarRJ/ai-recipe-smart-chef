
import { supabase } from '@/integrations/supabase/client';
import { Recipe } from '@/types/index';
import recipeService from './recipeService';

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snack?: Recipe;
  user_id: string;
  created_at: string;
  updated_at: string;
}

class MealPlanService {
  async getMealPlan(date: string, userId: string): Promise<MealPlan | null> {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', userId)
        .eq('date', date)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) return null;

      // Since the current schema has recipe_id, meal_type structure
      // We need to query all meals for this date and group them
      const { data: meals, error: mealsError } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', userId)
        .eq('date', date);

      if (mealsError) throw mealsError;

      const mealPlan: MealPlan = {
        id: data.id,
        date: data.date,
        user_id: data.user_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      // Group meals by type
      if (meals) {
        for (const meal of meals) {
          if (meal.recipe_id && meal.meal_type) {
            const recipe = await this.getRecipeById(meal.recipe_id);
            if (recipe) {
              switch (meal.meal_type) {
                case 'breakfast':
                  mealPlan.breakfast = recipe;
                  break;
                case 'lunch':
                  mealPlan.lunch = recipe;
                  break;
                case 'dinner':
                  mealPlan.dinner = recipe;
                  break;
                case 'snack':
                  mealPlan.snack = recipe;
                  break;
              }
            }
          }
        }
      }

      return mealPlan;
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      return null;
    }
  }

  private async getRecipeById(recipeId: string): Promise<Recipe | undefined> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', recipeId)
        .single();

      if (error) throw error;

      // Convert Json[] to string[] for instructions
      const instructionsArray = Array.isArray(data.instructions) 
        ? data.instructions.map(instruction => String(instruction))
        : [];

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image_url,
        image_url: data.image_url,
        prepTime: data.prep_time || 0,
        prep_time: data.prep_time || 0,
        cookTime: data.cooking_time || 0,
        cook_time: data.cooking_time || 0,
        servings: data.servings,
        difficulty: data.difficulty as 'Easy' | 'Medium' | 'Hard',
        calories: data.calories,
        rating: 4.5,
        ratingCount: 89,
        cuisineType: data.cuisine_type,
        cuisine_type: data.cuisine_type,
        categories: [], // Database doesn't have categories field, so use empty array
        tags: [], // Database doesn't have tags field, so use empty array
        ingredients: [],
        instructions: instructionsArray,
        isFavorite: false,
        status: 'published' as const,
        author_id: data.user_id,
        is_verified: true,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error fetching recipe:', error);
      return undefined;
    }
  }

  async updateMealPlan(
    date: string,
    userId: string,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    recipeId: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('meal_plans')
        .upsert({
          user_id: userId,
          date,
          meal_type: mealType,
          recipe_id: recipeId,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating meal plan:', error);
      return false;
    }
  }
}

export const mealPlanService = new MealPlanService();
