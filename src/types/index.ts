
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
  image_url?: string; // For compatibility
  prep_time: number;
  prepTime?: number; // For compatibility
  cooking_time: number;
  cook_time?: number; // For compatibility
  cookTime?: number; // For compatibility
  total_time?: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  rating: number;
  rating_count: number;
  ratingCount?: number; // For compatibility
  ingredients: Array<{ 
    id?: string; 
    name: string; 
    quantity: number; 
    unit: string;
    amount?: number; // For compatibility
    inPantry?: boolean; // For compatibility
  }>;
  instructions: string[];
  categories: string[];
  tags: string[];
  isFavorite: boolean;
  stepImages?: { [key: number]: string };
  is_published?: boolean;
  is_public?: boolean;
  user_id?: string;
  author_id?: string; // For compatibility
  created_at?: string;
  updated_at?: string;
  cuisine_type?: string;
  cuisineType?: string; // For compatibility
  tips?: string[];
  category_id?: string;
  is_verified?: boolean;
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
}

export interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
  isPremiumUser?: boolean;
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
  name?: string; // For compatibility
  avatar_url?: string;
  bio?: string;
  dietary_preferences?: string[];
  dietaryPreferences?: string[]; // For compatibility
  cuisine_preferences?: string[];
  cuisinePreferences?: string[]; // For compatibility
  allergies?: string[];
  nutritional_goals?: any;
  nutritionalGoals?: any; // For compatibility
  chef_avatar?: string;
  chefAvatar?: string; // For compatibility
}

export interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  recipe: Recipe;
  scheduled_for: string;
  notes?: string; // Add optional notes field
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

// New interfaces for community moderation
export interface SharedRecipe extends Recipe {
  status: 'pending' | 'approved' | 'rejected';
  submitted_by: string;
  submitted_at: string;
  moderated_by?: string;
  moderated_at?: string;
  moderation_notes?: string;
}

export interface ModerationAction {
  id: string;
  recipe_id: string;
  action: 'approve' | 'reject';
  moderator_id: string;
  notes?: string;
  timestamp: string;
}
