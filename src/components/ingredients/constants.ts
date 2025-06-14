
import { 
  ChefHat, Cake, Coffee, Soup, Salad, Egg, Milk, Drumstick,
  LeafyGreen, Carrot, IceCream, Cookie, Wine, Beer,
  Sparkles, Wheat, Fish, GlassWater, Package2
} from 'lucide-react';

export const INGREDIENT_CATEGORIES = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '🥕',
    subcategories: ['Root Vegetables', 'Leafy Greens', 'Nightshades', 'Squash', 'Cruciferous']
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: '🍎',
    subcategories: ['Citrus', 'Berries', 'Stone Fruits', 'Tropical', 'Apples & Pears']
  },
  {
    id: 'proteins',
    name: 'Proteins',
    icon: '🥩',
    subcategories: ['Meat', 'Poultry', 'Seafood', 'Eggs', 'Plant-based']
  },
  {
    id: 'grains',
    name: 'Grains & Starches',
    icon: '🌾',
    subcategories: ['Rice', 'Pasta', 'Bread', 'Quinoa', 'Potatoes']
  },
  {
    id: 'dairy',
    name: 'Dairy',
    icon: '🥛',
    subcategories: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream']
  },
  {
    id: 'spices',
    name: 'Herbs & Spices',
    icon: '🌿',
    subcategories: ['Fresh Herbs', 'Dried Spices', 'Spice Blends', 'Aromatics']
  },
  {
    id: 'pantry',
    name: 'Pantry Staples',
    icon: '🥫',
    subcategories: ['Oils & Vinegars', 'Condiments', 'Canned Goods', 'Baking', 'Nuts & Seeds']
  }
];

export const COMMON_INGREDIENTS = [
  // Vegetables
  'onion', 'garlic', 'tomato', 'carrot', 'celery', 'bell pepper', 'mushroom', 'spinach', 'broccoli', 'potato',
  
  // Proteins  
  'chicken breast', 'ground beef', 'salmon', 'eggs', 'tofu', 'chicken thighs', 'shrimp', 'pork', 'beans', 'lentils',
  
  // Dairy
  'milk', 'cheese', 'butter', 'yogurt', 'cream', 'mozzarella', 'parmesan', 'cheddar',
  
  // Pantry Staples
  'olive oil', 'salt', 'black pepper', 'flour', 'sugar', 'rice', 'pasta', 'soy sauce', 'vinegar', 'lemon',
  
  // Herbs & Spices
  'basil', 'oregano', 'thyme', 'rosemary', 'paprika', 'cumin', 'ginger', 'cilantro', 'parsley', 'bay leaves'
];

export const DIETARY_PREFERENCES = [
  'Vegetarian',
  'Vegan', 
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Low-Carb',
  'Mediterranean',
  'Whole30',
  'Nut-Free'
];

export const CUISINE_TYPES = [
  'Italian',
  'Mexican', 
  'Asian',
  'Indian',
  'Mediterranean',
  'American',
  'French',
  'Thai',
  'Japanese',
  'Greek'
];

// New exports that were missing
export const mainCategories = [
  {
    id: 'food',
    name: 'Food',
    icon: ChefHat,
    subcategories: [
      { name: 'Main Dishes', icon: ChefHat },
      { name: 'Appetizers', icon: Salad },
      { name: 'Pickles', icon: Package2 },
      { name: 'Soups', icon: Soup },
      { name: 'Sauces', icon: ChefHat },
      { name: 'Others', icon: ChefHat }
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
      { name: 'Cocktails', icon: Wine },
      { name: 'Hot Drinks', icon: Coffee },
      { name: 'Others', icon: GlassWater }
    ]
  },
];

export const AI_FILTER_OPTIONS = {
  dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
  cookTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
  difficulty: ['Beginner', 'Intermediate', 'Expert'],
  cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
};

export const PANTRY_ITEMS = [
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
