
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MealPlanMeal {
  id: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  scheduled_time: string | null;
  recipe: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    cooking_time: number;
    prep_time: number;
    servings: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    calories: number;
  };
}

export interface MealPlan {
  id: string;
  date: string;
  meals: MealPlanMeal[];
}

export const useMealPlan = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMealPlan = async (date: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // First get the meal plan for the date
      const { data: mealPlanData, error: mealPlanError } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', date)
        .single();

      if (mealPlanError && mealPlanError.code !== 'PGRST116') {
        throw mealPlanError;
      }

      if (!mealPlanData) {
        setMealPlans([]);
        return;
      }

      // Get meal plan meals with recipe data
      const { data: mealsData, error: mealsError } = await supabase
        .from('meal_plan_meals')
        .select(`
          *,
          recipes (
            id,
            title,
            description,
            image_url,
            cooking_time,
            prep_time,
            servings,
            difficulty,
            calories
          )
        `)
        .eq('meal_plan_id', mealPlanData.id);

      if (mealsError) throw mealsError;

      const meals: MealPlanMeal[] = mealsData?.map((meal: any) => ({
        id: meal.id,
        meal_type: meal.meal_type,
        scheduled_time: meal.scheduled_time,
        recipe: meal.recipes || {
          id: '',
          title: 'Unknown Recipe',
          description: '',
          image_url: '',
          cooking_time: 0,
          prep_time: 0,
          servings: 1,
          difficulty: 'Easy' as const,
          calories: 0
        }
      })) || [];

      const mealPlan: MealPlan = {
        id: mealPlanData.id,
        date: mealPlanData.date,
        meals
      };

      setMealPlans([mealPlan]);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error fetching meal plan',
        description: err.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addMealToPlan = async (date: string, recipeId: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', scheduledTime?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // First, ensure meal plan exists for the date
      let { data: mealPlan, error: mealPlanError } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', date)
        .single();

      if (mealPlanError && mealPlanError.code === 'PGRST116') {
        // Create meal plan if it doesn't exist
        const { data: newMealPlan, error: createError } = await supabase
          .from('meal_plans')
          .insert([{ user_id: user.id, date }])
          .select()
          .single();

        if (createError) throw createError;
        mealPlan = newMealPlan;
      } else if (mealPlanError) {
        throw mealPlanError;
      }

      // Add meal to plan
      const { error } = await supabase
        .from('meal_plan_meals')
        .insert([{
          meal_plan_id: mealPlan.id,
          recipe_id: recipeId,
          meal_type: mealType,
          scheduled_time: scheduledTime || null
        }]);

      if (error) throw error;

      toast({
        title: 'Meal added to plan',
        description: `${mealType} has been added to your meal plan.`
      });

      // Refresh meal plan
      fetchMealPlan(date);
    } catch (err: any) {
      toast({
        title: 'Error adding meal to plan',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const removeMealFromPlan = async (mealId: string, date: string) => {
    try {
      const { error } = await supabase
        .from('meal_plan_meals')
        .delete()
        .eq('id', mealId);

      if (error) throw error;

      toast({
        title: 'Meal removed from plan'
      });

      // Refresh meal plan
      fetchMealPlan(date);
    } catch (err: any) {
      toast({
        title: 'Error removing meal from plan',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  return {
    mealPlans,
    loading,
    error,
    fetchMealPlan,
    addMealToPlan,
    removeMealFromPlan
  };
};
