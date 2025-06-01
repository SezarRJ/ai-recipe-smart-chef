import { mockRecipes } from '@/data/mockData';
import { MealPlan, Meal, Recipe } from '@/types/index';

export const mealPlanService = {
  getMealPlan: async (date: string): Promise<MealPlan | null> => {
    console.log('Fetching meal plan for date:', date);
    
    const mockMeals: Meal[] = [
      {
        id: 'meal-1',
        type: 'Breakfast',
        recipe: mockRecipes[0],
        scheduled_for: date,
        notes: 'Morning meal'
      },
      {
        id: 'meal-2', 
        type: 'Lunch',
        recipe: mockRecipes[1],
        scheduled_for: date,
        notes: 'Afternoon meal'
      }
    ];

    // Mock meal plan data
    const mealPlan: MealPlan = {
      id: `meal-plan-${date}`,
      user_id: 'mock-user-id',
      date: date,
      meals: mockMeals,
      total_calories: mockMeals.reduce((sum, meal) => sum + meal.recipe.calories, 0),
      total_protein: mockMeals.reduce((sum, meal) => sum + meal.recipe.protein, 0),
      total_carbs: mockMeals.reduce((sum, meal) => sum + meal.recipe.carbs, 0),
      total_fat: mockMeals.reduce((sum, meal) => sum + meal.recipe.fat, 0)
    };

    return mealPlan;
  },

  addMealToPlan: async (date: string, mealType: string, recipeId: string): Promise<boolean> => {
    console.log('Adding meal to plan:', { date, mealType, recipeId });
    return true;
  },

  removeMealFromPlan: async (mealId: string): Promise<boolean> => {
    console.log('Removing meal from plan:', mealId);
    return true;
  },

  generateMealPlan: async (startDate: string, days: number, preferences: any): Promise<MealPlan[]> => {
    console.log('Generating meal plan:', { startDate, days, preferences });
    
    const plans: MealPlan[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const mockMeals: Meal[] = [
        {
          id: `meal-${i}-1`,
          type: 'Breakfast',
          recipe: {
            ...mockRecipes[i % mockRecipes.length],
            prep_time: 10,
            cooking_time: 15
          },
          scheduled_for: dateStr
        }
      ];
      
      plans.push({
        id: `plan-${i}`,
        user_id: 'mock-user-id',
        date: dateStr,
        meals: mockMeals,
        total_calories: mockMeals.reduce((sum, meal) => sum + meal.recipe.calories, 0),
        total_protein: mockMeals.reduce((sum, meal) => sum + meal.recipe.protein, 0),
        total_carbs: mockMeals.reduce((sum, meal) => sum + meal.recipe.carbs, 0),
        total_fat: mockMeals.reduce((sum, meal) => sum + meal.recipe.fat, 0)
      });
    }
    
    return plans;
  },

  getRecipeSuggestions: async (ingredients: string[]): Promise<Recipe[]> => {
    console.log('Fetching recipe suggestions for ingredients:', ingredients);
    return mockRecipes;
  },

  savePreferences: async (preferences: any): Promise<boolean> => {
    console.log('Saving preferences:', preferences);
    return true;
  },

  getPreferences: async (): Promise<any> => {
    console.log('Fetching preferences');
    return {
      dietaryRestrictions: ['Vegetarian'],
      cuisinePreferences: ['Italian', 'Mexican']
    };
  },

  getWeeklyMealPlan: async (startDate: string): Promise<MealPlan[]> => {
    console.log('Fetching weekly meal plan starting:', startDate);
    
    const plans: MealPlan[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const mockMeals: Meal[] = [
        {
          id: `weekly-meal-${i}-1`,
          type: 'Lunch',
          recipe: {
            ...mockRecipes[i % mockRecipes.length],
            prep_time: 15,
            cooking_time: 20
          },
          scheduled_for: dateStr
        }
      ];
      
      plans.push({
        id: `weekly-plan-${i}`,
        user_id: 'mock-user-id', 
        date: dateStr,
        meals: mockMeals,
        total_calories: mockMeals.reduce((sum, meal) => sum + meal.recipe.calories, 0),
        total_protein: mockMeals.reduce((sum, meal) => sum + meal.recipe.protein, 0),
        total_carbs: mockMeals.reduce((sum, meal) => sum + meal.recipe.carbs, 0),
        total_fat: mockMeals.reduce((sum, meal) => sum + meal.recipe.fat, 0)
      });
    }
    
    return plans;
  }
};
