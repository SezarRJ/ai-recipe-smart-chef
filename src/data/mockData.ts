
import { Recipe, User, PantryItem } from '@/types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil',
    image: '/placeholder.svg',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    cuisineType: 'italian',
    rating: 4.8,
    ratingCount: 156,
    calories: 285,
    isFavorite: true,
    categories: ['Italian', 'Main Dishes'],
    tags: ['pizza', 'italian', 'vegetarian'],
    ingredients: [
      { id: '1', name: 'Tomatoes', quantity: '2', unit: 'cups', inPantry: false },
      { id: '2', name: 'Mozzarella', quantity: '200', unit: 'g', inPantry: false },
      { id: '3', name: 'Basil', quantity: '10', unit: 'leaves', inPantry: false },
      { id: '4', name: 'Pizza dough', quantity: '1', unit: 'piece', inPantry: false }
    ],
    instructions: ['Prepare dough', 'Add toppings', 'Bake in oven']
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy and flavorful Indian curry with tender chicken pieces',
    image: '/placeholder.svg',
    prepTime: 30,
    cookTime: 25,
    servings: 6,
    difficulty: 'Medium',
    cuisineType: 'indian',
    rating: 4.7,
    ratingCount: 203,
    calories: 420,
    isFavorite: false,
    categories: ['Indian', 'Main Dishes'],
    tags: ['curry', 'indian', 'spicy'],
    ingredients: [
      { id: '1', name: 'Chicken', quantity: '500', unit: 'g', inPantry: false },
      { id: '2', name: 'Tomatoes', quantity: '3', unit: 'pieces', inPantry: false },
      { id: '3', name: 'Cream', quantity: '200', unit: 'ml', inPantry: false },
      { id: '4', name: 'Spices', quantity: '2', unit: 'tbsp', inPantry: false }
    ],
    instructions: ['Marinate chicken', 'Cook curry', 'Serve with rice']
  },
  {
    id: '3',
    title: 'Beef Tacos',
    description: 'Authentic Mexican tacos with seasoned ground beef and fresh toppings',
    image: '/placeholder.svg',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    cuisineType: 'mexican',
    rating: 4.5,
    ratingCount: 87,
    calories: 320,
    isFavorite: true,
    categories: ['Mexican', 'Main Dishes'],
    tags: ['tacos', 'mexican', 'beef'],
    ingredients: [
      { id: '1', name: 'Ground beef', quantity: '400', unit: 'g', inPantry: false },
      { id: '2', name: 'Taco shells', quantity: '8', unit: 'pieces', inPantry: false },
      { id: '3', name: 'Lettuce', quantity: '1', unit: 'head', inPantry: false },
      { id: '4', name: 'Cheese', quantity: '100', unit: 'g', inPantry: false }
    ],
    instructions: ['Cook beef', 'Prepare toppings', 'Assemble tacos']
  },
  {
    id: '4',
    title: 'Caesar Salad',
    description: 'Fresh romaine lettuce with classic Caesar dressing and croutons',
    image: '/placeholder.svg',
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    cuisineType: 'italian',
    rating: 4.3,
    ratingCount: 92,
    calories: 180,
    isFavorite: false,
    categories: ['Italian', 'Salads'],
    tags: ['salad', 'healthy', 'quick'],
    ingredients: [
      { id: '1', name: 'Romaine lettuce', quantity: '1', unit: 'head', inPantry: false },
      { id: '2', name: 'Caesar dressing', quantity: '100', unit: 'ml', inPantry: false },
      { id: '3', name: 'Croutons', quantity: '50', unit: 'g', inPantry: false },
      { id: '4', name: 'Parmesan', quantity: '50', unit: 'g', inPantry: false }
    ],
    instructions: ['Wash lettuce', 'Make dressing', 'Toss and serve']
  },
  {
    id: '5',
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade cookies with chocolate chips',
    image: '/placeholder.svg',
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: 'Easy',
    cuisineType: 'american',
    rating: 4.9,
    ratingCount: 312,
    calories: 150,
    isFavorite: true,
    categories: ['American', 'Desserts'],
    tags: ['cookies', 'dessert', 'baking'],
    ingredients: [
      { id: '1', name: 'Flour', quantity: '2', unit: 'cups', inPantry: false },
      { id: '2', name: 'Butter', quantity: '100', unit: 'g', inPantry: false },
      { id: '3', name: 'Sugar', quantity: '150', unit: 'g', inPantry: false },
      { id: '4', name: 'Chocolate chips', quantity: '100', unit: 'g', inPantry: false }
    ],
    instructions: ['Mix ingredients', 'Shape cookies', 'Bake until golden']
  }
];

export const categories = [
  'Main Dishes',
  'Appetizers', 
  'Desserts',
  'Salads',
  'Soups',
  'Beverages'
];

export const cuisines = [
  'Italian',
  'Mexican', 
  'Indian',
  'American',
  'Chinese',
  'Mediterranean'
];

export const difficulties = [
  'Easy',
  'Medium',
  'Hard'
];

export const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Keto',
  'Low-carb'
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder.svg',
  dietaryPreferences: ['Vegetarian'],
  allergies: [],
  cuisinePreferences: ['Italian', 'Mexican'],
  chefAvatar: 'The Grill Master',
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: 5,
    unit: 'pieces',
    category: 'Vegetables',
    expiryDate: '2024-02-15',
    addedDate: '2024-02-01'
  },
  {
    id: '2', 
    name: 'Flour',
    quantity: 2,
    unit: 'kg',
    category: 'Pantry',
    expiryDate: '2024-06-30',
    addedDate: '2024-01-15'
  }
];
