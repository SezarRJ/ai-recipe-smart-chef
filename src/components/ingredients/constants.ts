
import { Utensils, Pizza, Leaf, Carrot, Apple, Fish, Egg, Wheat, Coffee } from 'lucide-react';

export const mainCategories = [
  {
    id: 'food',
    name: 'Food & Recipes',
    nameAr: 'الطعام والوصفات',
    icon: Utensils,
    subcategories: [
      { name: 'Main Dishes', icon: Pizza },
      { name: 'Appetizers', icon: Leaf },
      { name: 'Desserts', icon: Apple },
      { name: 'Salads', icon: Carrot },
    ]
  },
  {
    id: 'ingredients',
    name: 'By Ingredients',
    nameAr: 'حسب المكونات',
    icon: Carrot,
    subcategories: [
      { name: 'Vegetables', icon: Carrot },
      { name: 'Fruits', icon: Apple },
      { name: 'Proteins', icon: Fish },
      { name: 'Dairy & Eggs', icon: Egg },
      { name: 'Grains & Cereals', icon: Wheat },
    ]
  },
  {
    id: 'beverages',
    name: 'Non-Alcoholic Beverages',
    nameAr: 'المشروبات غير الكحولية',
    icon: Coffee,
    subcategories: [
      { name: 'Hot Beverages', icon: Coffee },
      { name: 'Cold Beverages', icon: Coffee },
      { name: 'Smoothies', icon: Apple },
      { name: 'Juices', icon: Apple },
    ]
  }
];

export const AI_FILTER_OPTIONS = {
  dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Dairy-Free'],
  cookTime: ['Under 15 min', '15-30 min', '30-60 min', 'Over 1 hour'],
  difficulty: ['Easy', 'Medium', 'Hard'],
  cuisine: ['Italian', 'Asian', 'Mexican', 'Indian', 'Mediterranean', 'American']
};

export const PANTRY_ITEMS = [
  { id: 'chicken', name: 'Chicken Breast', quantity: '2 lbs', unit: 'pounds', icon: Fish },
  { id: 'rice', name: 'Basmati Rice', quantity: '2', unit: 'cups', icon: Wheat },
  { id: 'onions', name: 'Yellow Onions', quantity: '3', unit: 'pieces', icon: Carrot },
  { id: 'tomatoes', name: 'Roma Tomatoes', quantity: '4', unit: 'pieces', icon: Apple },
  { id: 'garlic', name: 'Garlic Cloves', quantity: '6', unit: 'pieces', icon: Carrot },
  { id: 'olive-oil', name: 'Olive Oil', quantity: '500', unit: 'ml', icon: Coffee },
  { id: 'eggs', name: 'Fresh Eggs', quantity: '12', unit: 'pieces', icon: Egg },
  { id: 'milk', name: 'Whole Milk', quantity: '1', unit: 'liter', icon: Egg }
];
