
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

      console.log('Fetching meal plan for date:', date, 'user:', user.id);

      const { data: mealPlanData, error: mealPlanError } = await supabase
        .from('meal_plans')
        .select(`
          id,
          date,
          meal_type,
          scheduled_time,
          recipe_id,
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
        .eq('user_id', user.id)
        .eq('date', date);

      if (mealPlanError) throw mealPlanError;

      console.log('Fetched meal plan data:', mealPlanData);

      // Transform data to match expected format
      const transformedMeals: MealPlanMeal[] = mealPlanData?.map((item: any) => ({
        id: item.id,
        meal_type: item.meal_type || 'breakfast',
        scheduled_time: item.scheduled_time,
        recipe: {
          id: item.recipes?.id || '',
          title: item.recipes?.title || '',
          description: item.recipes?.description || '',
          image_url: item.recipes?.image_url || '',
          cooking_time: item.recipes?.cooking_time || 0,
          prep_time: item.recipes?.prep_time || 0,
          servings: item.recipes?.servings || 1,
          difficulty: item.recipes?.difficulty || 'Easy',
          calories: item.recipes?.calories || 0
        }
      })) || [];

      const mealPlan: MealPlan = {
        id: date,
        date,
        meals: transformedMeals
      };

      setMealPlans([mealPlan]);
    } catch (err: any) {
      console.error('Error fetching meal plan:', err);
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

      console.log('Adding meal to plan:', { date, recipeId, mealType, scheduledTime });

      const { error } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user.id,
          date,
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
      console.error('Error adding meal to plan:', err);
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
      console.log('Removing meal from plan:', mealId);
      
      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .eq('id', mealId);

      if (error) throw error;

      toast({
        title: 'Meal removed from plan'
      });

      // Refresh meal plan
      fetchMealPlan(date);
    } catch (err: any) {
      console.error('Error removing meal from plan:', err);
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
