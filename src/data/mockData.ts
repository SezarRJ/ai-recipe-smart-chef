
import { Recipe, User, PantryItem, MealPlan, Meal } from '@/types/index';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/placeholder.svg',
  dietaryPreferences: ['vegetarian'],
  cuisinePreferences: ['Italian', 'Mediterranean'],
  allergies: ['nuts'],
  chefAvatar: 'The Grill Master',
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};

export const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Beverages'];
export const cuisines = ['Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian'];
export const difficulties = ['Easy', 'Medium', 'Hard'];
export const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: 5,
    unit: 'pieces',
    category: 'Vegetables',
    location: 'Refrigerator',
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    name: 'Chicken Breast',
    quantity: 500,
    unit: 'g',
    category: 'Meat & Poultry',
    location: 'Freezer',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'Rice',
    quantity: 2,
    unit: 'kg',
    category: 'Grains & Pasta',
    location: 'Pantry',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    name: 'Milk',
    quantity: 1,
    unit: 'L',
    category: 'Dairy & Eggs',
    location: 'Refrigerator',
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    name: 'Bananas',
    quantity: 6,
    unit: 'pieces',
    category: 'Fruits',
    location: 'Pantry',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Salad',
    description: 'Fresh and healthy Mediterranean salad with olive oil dressing',
    image: '/placeholder.svg',
    image_url: '/placeholder.svg',
    prepTime: 15,
    prep_time: 15,
    cookTime: 0,
    cook_time: 0,
    servings: 4,
    difficulty: 'Easy',
    calories: 250,
    rating: 4.5,
    ratingCount: 120,
    cuisineType: 'Mediterranean',
    cuisine_type: 'Mediterranean',
    ingredients: [
      { id: '1', name: 'Lettuce', amount: 1, unit: 'head' },
      { id: '2', name: 'Tomatoes', amount: 2, unit: 'medium' },
      { id: '3', name: 'Olive Oil', amount: 3, unit: 'tbsp' }
    ],
    instructions: [
      'Wash and chop the lettuce',
      'Cut tomatoes into wedges',
      'Mix with olive oil and season'
    ],
    categories: ['Salad', 'Mediterranean'],
    tags: ['healthy', 'quick', 'vegetarian'],
    isFavorite: false,
    status: 'published',
    author_id: '1',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Chicken Stir Fry',
    description: 'Quick and delicious chicken stir fry with vegetables',
    image: '/placeholder.svg',
    image_url: '/placeholder.svg',
    prepTime: 20,
    prep_time: 20,
    cookTime: 15,
    cook_time: 15,
    servings: 4,
    difficulty: 'Medium',
    calories: 380,
    rating: 4.3,
    ratingCount: 89,
    cuisineType: 'Asian',
    cuisine_type: 'Asian',
    ingredients: [
      { id: '4', name: 'Chicken Breast', amount: 500, unit: 'g' },
      { id: '5', name: 'Bell Peppers', amount: 2, unit: 'pieces' },
      { id: '6', name: 'Soy Sauce', amount: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Cut chicken into strips',
      'Heat oil in wok',
      'Stir fry chicken and vegetables'
    ],
    categories: ['Main Course', 'Asian'],
    tags: ['protein', 'quick'],
    isFavorite: true,
    status: 'published',
    author_id: '1',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Pancakes',
    description: 'Fluffy morning pancakes with maple syrup',
    image: '/placeholder.svg',
    image_url: '/placeholder.svg',
    prepTime: 10,
    prep_time: 10,
    cookTime: 15,
    cook_time: 15,
    servings: 4,
    difficulty: 'Easy',
    calories: 320,
    rating: 4.7,
    ratingCount: 156,
    cuisineType: 'American',
    cuisine_type: 'American',
    ingredients: [
      { id: '7', name: 'Flour', amount: 2, unit: 'cups' },
      { id: '8', name: 'Milk', amount: 1, unit: 'cup' },
      { id: '9', name: 'Eggs', amount: 2, unit: 'pieces' }
    ],
    instructions: [
      'Mix dry ingredients',
      'Add wet ingredients',
      'Cook on griddle'
    ],
    categories: ['Breakfast'],
    tags: ['breakfast', 'sweet'],
    isFavorite: false,
    status: 'published',
    author_id: '1',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const favoriteRecipes = mockRecipes.filter(recipe => recipe.isFavorite);

// Create mock meals that match the Meal interface
const mockMeals: Meal[] = [
  {
    id: '1',
    type: 'breakfast',
    recipe: mockRecipes[2], // Pancakes
    scheduledTime: '08:00'
  },
  {
    id: '2',
    type: 'lunch',
    recipe: mockRecipes[0], // Mediterranean Salad
    scheduledTime: '12:30'
  },
  {
    id: '3',
    type: 'dinner',
    recipe: mockRecipes[1], // Chicken Stir Fry
    scheduledTime: '19:00'
  }
];

// Export the mock meal plan
export const mockMealPlan: MealPlan = {
  id: '1',
  date: new Date().toISOString().split('T')[0], // Today's date
  meals: mockMeals,
  user_id: '1',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};
