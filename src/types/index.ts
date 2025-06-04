
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  image: string;
  prep_time: number;
  prepTime: number;
  cook_time: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  cuisine_type: string;
  cuisineType: string;
  instructions: string[];
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'pending_review';
  author_id: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  rating?: number;
  ratingCount?: number;
  isFavorite?: boolean;
  ingredients?: RecipeIngredient[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  tips?: string[];
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  inPantry?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  expiry_date?: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
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
  };
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
  scheduledTime?: string;
}

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
  meals: Meal[];
}
