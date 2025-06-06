
import { ElementType } from 'react';

export interface MainCategory {
  id: string;
  name: string;
  icon: ElementType;
  subcategories: { name: string; icon: ElementType; requiresCustomForm?: boolean }[];
}

export interface AIFilters {
  dietary: string;
  cookTime: string;
  difficulty: string;
  cuisine: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  source: 'manual' | 'pantry';
  icon?: ElementType;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  icon?: ElementType;
}

export interface FilterOptions {
  dietary: string[];
  cookTime: string[];
  difficulty: string[];
  cuisine: string[];
}
