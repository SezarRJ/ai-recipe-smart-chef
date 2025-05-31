// src/types/index.ts (or wherever your main interfaces are defined)

// --- IMPORTANT: ADD OR UPDATE THESE INTERFACES ---

export interface ScanHistoryItem {
  // Add properties based on the errors in ScanDishComponent/ScanDishPage
  id: string; // TS2339 error
  name: string; // TS2339 error
  calories: number; // TS2339 error
  protein: number;  // TS2339 error
  carbs: number;    // TS2339 error
  fat: number;      // TS2339 error
  // Add other properties that are part of your scanned dish history
  timestamp: string; // e.g., ISO string
  image: string;     // URL to the scanned dish image
  // ... any other properties your actual ScanHistoryItem object might have
}

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
  protein: number; // TS2339 error for recipeService.ts
  carbs: number;   // TS2339 error for recipeService.ts
  fat: number;     // TS2339 error for recipeService.ts
  rating: number;
  ratingCount: number;
  ingredients: Array<{ name: string; quantity: number; unit: string; }>;
  instructions: string[];
  categories: string[];
  tags: string[];
  isFavorite: boolean;
  // NEW: Add stepImages property for CookingMode.tsx errors
  stepImages?: { [key: number]: string }; // Map of step number to image URL
  // Or if it's just an array of URLs for main steps: stepImages?: string[];
  // Choose the type that best represents your step images. { [key: number]: string } is more flexible.
  // ... any other properties your actual Recipe object might have
}

// Ensure this interface exists, likely near your CookingMode component or in types/index.ts
export interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
  isPremiumUser: boolean; // ADD THIS PROPERTY for RecipeDetailPage.tsx error
  // ... any other existing props for CookingMode
}

// --- OPTIONAL: If your ToastVariant is not in use-toast.ts but in a central types file ---
// This type is usually defined by shadcn-ui in components/ui/use-toast.ts or components/ui/toast.ts
// If it's in a central types file, add 'success' here:
export type ToastVariant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "success"; // ADD "success"
