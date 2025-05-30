import { Recipe, User, PantryItem } from '@/types/index';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/placeholder.svg',
  preferences: {
    dietary: ['vegetarian'],
    allergies: ['nuts']
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
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    difficulty: 'Easy',
    calories: 250,
    rating: 4.5,
    ratingCount: 120,
    cuisineType: 'Mediterranean',
    ingredients: [
      { id: '1', name: 'Lettuce', amount: '1', unit: 'head', category: 'vegetables' },
      { id: '2', name: 'Tomatoes', amount: '2', unit: 'medium', category: 'vegetables' },
      { id: '3', name: 'Olive Oil', amount: '3', unit: 'tbsp', category: 'oils' }
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
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    calories: 380,
    rating: 4.3,
    ratingCount: 89,
    cuisineType: 'Asian',
    ingredients: [
      { id: '4', name: 'Chicken Breast', amount: '500', unit: 'g', category: 'meat' },
      { id: '5', name: 'Bell Peppers', amount: '2', unit: 'pieces', category: 'vegetables' },
      { id: '6', name: 'Soy Sauce', amount: '2', unit: 'tbsp', category: 'sauces' }
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
