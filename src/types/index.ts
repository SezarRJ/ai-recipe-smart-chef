
// src/types/index.ts (or wherever your main interfaces are defined)

// --- IMPORTANT: ADD OR UPDATE THESE INTERFACES ---

export interface ScanHistoryItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
  image: string;
  ingredients?: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prep_time: number;
  cooking_time: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  rating: number;
  rating_count: number;
  ingredients: Array<{ id?: string; name: string; quantity: number; unit: string; }>;
  instructions: string[];
  categories: string[];
  tags: string[];
  isFavorite: boolean;
  stepImages?: { [key: number]: string };
  is_published?: boolean;
  is_public?: boolean;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  location?: string;
  expiryDate?: string;
  addedDate?: string;
  isLowStock?: boolean;
  daysUntilExpiry?: number;
}

export interface VoiceLanguage {
  code: string;
  name: string;
  voice: string;
  rtl: boolean;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  dietary_preferences?: string[];
  cuisine_preferences?: string[];
  allergies?: string[];
  nutritional_goals?: any;
}

export interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  recipe: Recipe;
  scheduled_for: string;
}

export interface MealPlan {
  id: string;
  user_id: string;
  date: string;
  meals: Meal[];
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
}

export type ToastVariant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "success";
