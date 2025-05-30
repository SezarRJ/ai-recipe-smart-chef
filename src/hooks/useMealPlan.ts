
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MealPlanMeal {
  id: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes: string | null;
  recipe: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    cooking_time: number;
    servings: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
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

      if (error) throw error;

      if (data && data.length > 0) {
        // Group meal plans by date and structure them properly
        const groupedMeals: { [key: string]: MealPlanMeal[] } = {};
        
        data.forEach((meal: any) => {
          const mealPlanMeal: MealPlanMeal = {
            id: meal.id,
            meal_type: meal.meal_type as 'breakfast' | 'lunch' | 'dinner' | 'snack',
            notes: meal.notes,
            recipe: meal.recipes || {
              id: '',
              title: 'Unknown Recipe',
              description: '',
              image_url: '',
              cooking_time: 0,
              servings: 1,
              difficulty: 'Easy' as const
            }
          };

          if (!groupedMeals[meal.date]) {
            groupedMeals[meal.date] = [];
          }
          groupedMeals[meal.date].push(mealPlanMeal);
        });

        const mealPlansArray = Object.entries(groupedMeals).map(([date, meals]) => ({
          id: meals[0]?.id || '',
          date,
          meals
        }));

        setMealPlans(mealPlansArray);
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

  const addMealToPlan = async (date: string, recipeId: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', notes?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Add meal to plan using the existing meal_plans table structure
      const { error } = await supabase
        .from('meal_plans')
        .insert([{
          user_id: user.id,
          date: date,
          recipe_id: recipeId,
          meal_type: mealType,
          notes: notes || null
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
