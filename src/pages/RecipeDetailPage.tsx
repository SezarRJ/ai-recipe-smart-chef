
import React from 'react';
import { useParams } from 'react-router-dom';
import { RecipeDetail } from '@/components/recipe/RecipeDetail';
import { Recipe } from '@/types/index';

const RecipeDetailPage = () => {
  const { id } = useParams();

  // Mock recipe data
  const mockRecipe: Recipe = {
    id: id || '1',
    title: 'Chicken Biryani',
    description: 'Aromatic rice dish with tender chicken and authentic spices',
    image: 'https://images.unsplash.com/photo-1563379091339-03246962d633?auto=format&fit=crop&w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1563379091339-03246962d633?auto=format&fit=crop&w=800&q=80',
    prep_time: 30,
    cooking_time: 45,
    servings: 4,
    difficulty: 'Medium',
    cuisine_type: 'Indian',
    rating: 4.8,
    rating_count: 127,
    calories: 450,
    protein: 25,
    carbs: 55,
    fat: 12,
    categories: ['Main Course', 'Indian', 'Rice Dishes'],
    tags: ['spicy', 'aromatic', 'traditional', 'family-meal'],
    ingredients: [
      { name: 'Basmati Rice', quantity: 2, unit: 'cups' },
      { name: 'Chicken', quantity: 500, unit: 'g' },
      { name: 'Onions', quantity: 2, unit: 'medium' },
      { name: 'Yogurt', quantity: 1, unit: 'cup' },
      { name: 'Ginger-Garlic Paste', quantity: 2, unit: 'tbsp' },
      { name: 'Biryani Masala', quantity: 2, unit: 'tsp' }
    ],
    instructions: [
      'Soak basmati rice in water for 30 minutes, then drain.',
      'Marinate chicken with yogurt, ginger-garlic paste, and spices for 1 hour.',
      'Heat oil in a heavy-bottomed pot and fry sliced onions until golden.',
      'Add marinated chicken and cook until tender.',
      'In a separate pot, boil water with whole spices and salt.',
      'Add soaked rice to boiling water and cook until 70% done.',
      'Layer the partially cooked rice over chicken.',
      'Cover and cook on high heat for 2 minutes, then reduce to low heat.',
      'Cook for 45 minutes on low heat, then let it rest for 10 minutes.',
      'Gently mix and serve hot with raita and boiled eggs.'
    ],
    isFavorite: false
  };

  return <RecipeDetail recipe={mockRecipe} />;
};

export default RecipeDetailPage;
