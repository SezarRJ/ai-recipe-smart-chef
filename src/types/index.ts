
// Define ChefPersonality type
export type ChefPersonality = 'Traditional' | 'Adventurous' | 'Health-conscious' | 'Comfort Food' | 
  'Gourmet' | 'Speedy Chef' | 'Precision' | 'Creative';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  rating: number;
  ratingCount: number;
  ingredients: {
    id: string;
    name: string;
    quantity: string | number;
    unit: string;
    inPantry: boolean;
  }[];
  instructions: string[];
  categories: string[];
  tags: string[];
  isFavorite: boolean;
  tips?: string[]; // Add tips property
  cuisineType?: string; // Add cuisineType property
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium?: boolean; // Add isPremium property
  dietaryPreferences?: string[];
  allergies?: string[];
  allergens?: string[]; // Add allergens property
  favoriteRecipes?: string[];
  recipesSaved?: number; // Add recipesSaved property
  recipesCreated?: number; // Add recipesCreated property
  followersCount?: number; // Add followersCount property
  cuisinePreferences?: string[]; // Add cuisinePreferences property
  chefAvatar?: string; // Add chefAvatar property
  nutritionalGoals?: { // Add nutritionalGoals property
    calories: number;
    protein: number;
    carbs?: number;
    fat?: number;
  };
}

export interface MealPlan {
  id: string;
  date: string; // Change to string for easier comparison
  meals: Meal[];
  nutritionSummary?: { // Add nutritionSummary property
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
  completed?: boolean;
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string; // Change to string for easier date handling
  image?: string;
  location?: string; // Add location property
}

export interface NutritionGoal {
  id: string;
  type: 'calories' | 'protein' | 'carbs' | 'fat' | 'fiber' | 'sugar';
  target: number;
  current: number;
}

export interface HealthRecord {
  id: string;
  date: string; // Change to string for easier date handling
  weight?: number;
  height?: number;
  bmi?: number;
  notes?: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  category?: string;
}

export interface RecipeSocialData {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  usedCount: number;
  isLiked: boolean;
}
