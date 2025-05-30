

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    dietary: string[];
    allergies: string[];
  };
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  allergies?: string[];
  chefAvatar?: string;
  nutritionalGoals?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  location?: string;
  expiryDate?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  category: string;
  inPantry?: boolean;
  quantity?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  calories: number;
  rating: number;
  ratingCount: number;
  cuisineType?: string;
  ingredients: Ingredient[];
  instructions: string[];
  categories: string[];
  tags: string[];
  isFavorite: boolean;
  tips?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar?: number;
  };
}

export interface Meal {
  id: string;
  type: string;
  recipe: Recipe;
  scheduledTime?: string;
}

export interface MealPlan {
  id: string;
  date: string;
  meals: Meal[];
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;
}

