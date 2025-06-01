
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
  ingredients: Array<{ name: string; quantity: number; unit: string; }>;
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

export type ToastVariant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "success";
