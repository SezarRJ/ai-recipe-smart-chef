
import { Recipe, User, PantryItem, MealPlan } from '@/types/index';

export const mockUser: User = {
  id: '1',
  full_name: 'John Doe',
  email: 'john@example.com',
  avatar_url: '/placeholder.svg',
  dietary_preferences: ['vegetarian'],
  allergies: ['nuts']
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
    prep_time: 15,
    cooking_time: 0,
    servings: 4,
    difficulty: 'Easy',
    calories: 250,
    rating: 4.5,
    rating_count: 120,
    cuisine_type: 'Mediterranean',
    ingredients: [
      { id: '1', name: 'Lettuce', quantity: 1, unit: 'head' },
      { id: '2', name: 'Tomatoes', quantity: 2, unit: 'medium' },
      { id: '3', name: 'Olive Oil', quantity: 3, unit: 'tbsp' }
    ],
    instructions: [
      'Wash and chop the lettuce',
      'Cut tomatoes into wedges',
      'Mix with olive oil and season'
    ],
    categories: ['Salad', 'Mediterranean'],
    tags: ['healthy', 'quick', 'vegetarian'],
    isFavorite: false
  },
  {
    id: '2',
    title: 'Chicken Stir Fry',
    description: 'Quick and delicious chicken stir fry with vegetables',
    image: '/placeholder.svg',
    prep_time: 20,
    cooking_time: 15,
    servings: 4,
    difficulty: 'Medium',
    calories: 380,
    rating: 4.3,
    rating_count: 89,
    cuisine_type: 'Asian',
    ingredients: [
      { id: '4', name: 'Chicken Breast', quantity: 500, unit: 'g' },
      { id: '5', name: 'Bell Peppers', quantity: 2, unit: 'pieces' },
      { id: '6', name: 'Soy Sauce', quantity: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Cut chicken into strips',
      'Heat oil in wok',
      'Stir fry chicken and vegetables'
    ],
    categories: ['Main Course', 'Asian'],
    tags: ['protein', 'quick'],
    isFavorite: true
  }
];

export const favoriteRecipes = mockRecipes.filter(recipe => recipe.isFavorite);

// Add the missing mockMealPlan using the correct type from types/index.ts
export const mockMealPlan: MealPlan = {
  id: 'meal-plan-1',
  user_id: 'user-1',
  date: new Date().toISOString().split('T')[0],
  meals: [
    {
      id: 'breakfast-1',
      type: 'Breakfast',
      recipe: {
        id: '1',
        title: 'Avocado Toast',
        description: 'Healthy avocado toast with eggs',
        image: '/placeholder.svg',
        prep_time: 5,
        cooking_time: 10,
        servings: 1,
        difficulty: 'Easy',
        calories: 280,
        rating: 4.5,
        rating_count: 120,
        cuisine_type: 'American',
        ingredients: [
          { id: '1', name: 'Avocado', quantity: 1, unit: 'piece' },
          { id: '2', name: 'Bread', quantity: 2, unit: 'slices' }
        ],
        instructions: [
          'Toast the bread',
          'Mash the avocado',
          'Spread on toast'
        ],
        categories: ['Breakfast'],
        tags: ['healthy', 'quick'],
        isFavorite: false
      },
      scheduled_for: new Date().toISOString()
    },
    {
      id: 'lunch-1',
      type: 'Lunch',
      recipe: {
        id: '2',
        title: 'Mediterranean Salad',
        description: 'Fresh and healthy Mediterranean salad with olive oil dressing',
        image: '/placeholder.svg',
        prep_time: 15,
        cooking_time: 0,
        servings: 2,
        difficulty: 'Easy',
        calories: 250,
        rating: 4.3,
        rating_count: 89,
        cuisine_type: 'Mediterranean',
        ingredients: [
          { id: '1', name: 'Lettuce', quantity: 1, unit: 'head' },
          { id: '2', name: 'Tomatoes', quantity: 2, unit: 'medium' }
        ],
        instructions: [
          'Wash and chop lettuce',
          'Cut tomatoes',
          'Mix with dressing'
        ],
        categories: ['Salad'],
        tags: ['healthy', 'vegetarian'],
        isFavorite: false
      },
      scheduled_for: new Date().toISOString()
    },
    {
      id: 'dinner-1',
      type: 'Dinner',
      recipe: {
        id: '3',
        title: 'Chicken Stir Fry',
        description: 'Quick and delicious chicken stir fry with vegetables',
        image: '/placeholder.svg',
        prep_time: 20,
        cooking_time: 25,
        servings: 4,
        difficulty: 'Medium',
        calories: 380,
        rating: 4.1,
        rating_count: 156,
        cuisine_type: 'Asian',
        ingredients: [
          { id: '1', name: 'Chicken Breast', quantity: 500, unit: 'g' },
          { id: '2', name: 'Bell Peppers', quantity: 2, unit: 'pieces' }
        ],
        instructions: [
          'Cut chicken into strips',
          'Heat oil in wok',
          'Stir fry chicken and vegetables'
        ],
        categories: ['Main Course'],
        tags: ['protein', 'quick'],
        isFavorite: false
      },
      scheduled_for: new Date().toISOString()
    }
  ],
  total_calories: 910,
  total_protein: 45,
  total_carbs: 68,
  total_fat: 32
};
