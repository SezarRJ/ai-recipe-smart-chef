
import { supabase } from '@/integrations/supabase/client';

export interface MealPlan {
  id: string;
  user_id: string;
  date: string;
  meal_type: string;
  recipe_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  recipe?: {
    id: string;
    title: string;
    image_url?: string;
    prep_time?: number;
    cooking_time?: number;
    calories?: number;
  };
}

export class MealPlanService {
  async getMealPlans(userId: string, startDate?: string, endDate?: string): Promise<MealPlan[]> {
    try {
      let query = supabase
        .from('meal_plans')
        .select(`
          *,
          recipe:recipes (
            id,
            title,
            image_url,
            prep_time,
            cooking_time,
            calories
          )
        `)
        .eq('user_id', userId)
        .order('date', { ascending: true });

      if (startDate) {
        query = query.gte('date', startDate);
      }
      if (endDate) {
        query = query.lte('date', endDate);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data?.map(plan => ({
        id: plan.id,
        user_id: plan.user_id,
        date: plan.date,
        meal_type: plan.meal_type,
        recipe_id: plan.recipe_id,
        notes: plan.notes,
        created_at: plan.created_at,
        updated_at: plan.updated_at,
        recipe: plan.recipe ? {
          id: plan.recipe.id,
          title: plan.recipe.title,
          image_url: plan.recipe.image_url,
          prep_time: plan.recipe.prep_time || 0,
          cooking_time: plan.recipe.cooking_time || 0,
          calories: plan.recipe.calories || 0
        } : undefined
      })) || [];
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      return [];
    }
  }

  async createMealPlan(mealPlan: Omit<MealPlan, 'id' | 'created_at' | 'updated_at'>): Promise<MealPlan | null> {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .insert(mealPlan)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating meal plan:', error);
      return null;
    }
  }

  async updateMealPlan(id: string, updates: Partial<MealPlan>): Promise<MealPlan | null> {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating meal plan:', error);
      return null;
    }
  }

  async deleteMealPlan(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      return false;
    }
  }
}

const mealPlanService = new MealPlanService();
export default mealPlanService;
