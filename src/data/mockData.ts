
import { Recipe } from '@/types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil',
    image: '/placeholder.svg',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'medium',
    cuisineType: 'italian',
    rating: 4.8,
    isFavorite: true,
    ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Pizza dough'],
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
    difficulty: 'medium',
    cuisineType: 'indian',
    rating: 4.7,
    isFavorite: false,
    ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Spices'],
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
    difficulty: 'easy',
    cuisineType: 'mexican',
    rating: 4.5,
    isFavorite: true,
    ingredients: ['Ground beef', 'Taco shells', 'Lettuce', 'Cheese'],
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
    difficulty: 'easy',
    cuisineType: 'italian',
    rating: 4.3,
    isFavorite: false,
    ingredients: ['Romaine lettuce', 'Caesar dressing', 'Croutons', 'Parmesan'],
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
    difficulty: 'easy',
    cuisineType: 'american',
    rating: 4.9,
    isFavorite: true,
    ingredients: ['Flour', 'Butter', 'Sugar', 'Chocolate chips'],
    instructions: ['Mix ingredients', 'Shape cookies', 'Bake until golden']
  }
];
