
import {
  ChefHat, Salad, Soup, Package2, Utensils,
  Cookie, IceCream, Cake, Sparkles, GlassWater,
  Wine, Beer, Coffee, Wheat, Egg, Milk, Drumstick,
  LeafyGreen, Fish, Carrot, Martini, Flame, Calendar,
  Wrench, Crown
} from 'lucide-react';
import { MainCategory, PantryItem, FilterOptions } from './types';

export const mainCategories: MainCategory[] = [
  {
    id: 'food',
    name: 'Food',
    icon: ChefHat,
    subcategories: [
      { name: 'Main Dishes', icon: ChefHat },
      { name: 'Appetizers', icon: Salad },
      { name: 'Pickles', icon: Package2 },
      { name: 'Soups', icon: Soup },
      { name: 'Sauces', icon: Utensils },
      { name: 'Others', icon: Utensils }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: Cake,
    subcategories: [
      { name: 'Traditional', icon: Cookie },
      { name: 'Western', icon: IceCream },
      { name: 'Pastries', icon: Cake },
      { name: 'Ice Cream', icon: IceCream },
      { name: 'Others', icon: Sparkles }
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    icon: Coffee,
    subcategories: [
      { name: 'Detox', icon: GlassWater },
      { name: 'Cocktails', icon: Martini },
      { name: 'Hot Drinks', icon: Coffee },
      { name: 'Others', icon: GlassWater }
    ]
  },
  {
    id: 'alcohol',
    name: 'Alcohol Drinks',
    icon: Wine,
    subcategories: [
      { name: 'Spirit', icon: Wine, requiresCustomForm: true },
      { name: 'By Flavor', icon: Sparkles, requiresCustomForm: true },
      { name: 'By Occasion', icon: Calendar, requiresCustomForm: true },
      { name: 'By Technique', icon: Wrench, requiresCustomForm: true },
      { name: 'Classics', icon: Crown, requiresCustomForm: true }
    ]
  }
];

export const AI_FILTER_OPTIONS: FilterOptions = {
  dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
  cookTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
  difficulty: ['Beginner', 'Intermediate', 'Expert'],
  cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
};

export const PANTRY_ITEMS: PantryItem[] = [
  { id: 'p1', name: 'Flour', quantity: '1', unit: 'kg', icon: Wheat },
  { id: 'p2', name: 'Sugar', quantity: '500', unit: 'g', icon: Sparkles },
  { id: 'p3', name: 'Eggs', quantity: '6', unit: 'pcs', icon: Egg },
  { id: 'p4', name: 'Milk', quantity: '1', unit: 'liter', icon: Milk },
  { id: 'p5', name: 'Chicken Breast', quantity: '500', unit: 'g', icon: Drumstick },
  { id: 'p6', name: 'Spinach', quantity: '200', unit: 'g', icon: LeafyGreen },
  { id: 'p7', name: 'Cheese', quantity: '300', unit: 'g', icon: Package2 },
  { id: 'p8', name: 'Salmon', quantity: '400', unit: 'g', icon: Fish },
  { id: 'p9', name: 'Shrimp', quantity: '500', unit: 'g', icon: Fish },
  { id: 'p10', name: 'Carrots', quantity: '5', unit: 'pcs', icon: Carrot },
];
