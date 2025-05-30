
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

      // Use RPC function to get meal plan data
      const { data: mealPlanData, error: mealPlanError } = await supabase.rpc('get_meal_plan_for_date', {
        user_id: user.id,
        plan_date: date
      });

      if (mealPlanError) {
        throw mealPlanError;
      }

      if (!mealPlanData || mealPlanData.length === 0) {
        setMealPlans([]);
        return;
      }

      // Transform the data to match our interface
      const mealPlan: MealPlan = {
        id: mealPlanData[0]?.meal_plan_id || '',
        date: date,
        meals: mealPlanData.map((meal: any) => ({
          id: meal.meal_id,
          meal_type: meal.meal_type,
          scheduled_time: meal.scheduled_time,
          recipe: {
            id: meal.recipe_id,
            title: meal.recipe_title || 'Unknown Recipe',
            description: meal.recipe_description || '',
            image_url: meal.recipe_image_url || '',
            cooking_time: meal.cooking_time || 0,
            prep_time: meal.prep_time || 0,
            servings: meal.servings || 1,
            difficulty: meal.difficulty || 'Easy',
            calories: meal.calories || 0
          }
        }))
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

      const { error } = await supabase.rpc('add_meal_to_plan', {
        user_id: user.id,
        plan_date: date,
        recipe_id: recipeId,
        meal_type: mealType,
        scheduled_time: scheduledTime || null
      });

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
      const { error } = await supabase.rpc('remove_meal_from_plan', {
        meal_id: mealId
      });

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
