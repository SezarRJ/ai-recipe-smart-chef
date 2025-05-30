
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
    prep_time: number;
    cook_time: number;
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

      const { data, error } = await supabase
        .from('meal_plans')
        .select(`
          *,
          meal_plan_meals (
            id,
            meal_type,
            scheduled_time,
            recipes (
              id,
              title,
              description,
              image_url,
              prep_time,
              cook_time,
              servings,
              difficulty,
              calories
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('date', date)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        const mealPlan: MealPlan = {
          id: data.id,
          date: data.date,
          meals: data.meal_plan_meals.map((meal: any) => ({
            id: meal.id,
            meal_type: meal.meal_type,
            scheduled_time: meal.scheduled_time,
            recipe: meal.recipes
          }))
        };
        setMealPlans([mealPlan]);
      } else {
        setMealPlans([]);
      }
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

      // First, ensure a meal plan exists for this date
      let { data: mealPlan, error: mealPlanError } = await supabase
        .from('meal_plans')
        .select('id')
        .eq('user_id', user.id)
        .eq('date', date)
        .single();

      if (mealPlanError && mealPlanError.code === 'PGRST116') {
        // Create new meal plan
        const { data: newMealPlan, error: createError } = await supabase
          .from('meal_plans')
          .insert([{
            user_id: user.id,
            date: date
          }])
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
          scheduled_time: scheduledTime
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
