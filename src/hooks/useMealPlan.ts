
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

      // Use the existing meal_plans table to get basic meal plan data
      const { data: mealPlanData, error: mealPlanError } = await supabase
        .from('meal_plans')
        .select(`
          id,
          date,
          meal_type,
          recipe_id,
          recipes (
            id,
            title,
            description,
            image_url,
            cooking_time,
            servings,
            difficulty
          )
        `)
        .eq('user_id', user.id)
        .eq('date', date);

      if (mealPlanError) throw mealPlanError;

      // Transform data to match expected format
      const transformedMeals: MealPlanMeal[] = mealPlanData?.map((item: any) => ({
        id: item.id,
        meal_type: item.meal_type || 'breakfast',
        scheduled_time: null,
        recipe: {
          id: item.recipes?.id || '',
          title: item.recipes?.title || '',
          description: item.recipes?.description || '',
          image_url: item.recipes?.image_url || '',
          cooking_time: item.recipes?.cooking_time || 0,
          prep_time: 0, // Default since not in schema
          servings: item.recipes?.servings || 1,
          difficulty: item.recipes?.difficulty || 'Easy',
          calories: 0 // Default since not in schema
        }
      })) || [];

      const mealPlan: MealPlan = {
        id: date,
        date,
        meals: transformedMeals
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

      // Insert into existing meal_plans table
      const { error } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user.id,
          date,
          recipe_id: recipeId,
          meal_type: mealType
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
