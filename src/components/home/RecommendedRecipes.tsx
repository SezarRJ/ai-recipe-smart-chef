
import React from 'react';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { Recipe } from '@/types/index';

export const RecommendedRecipes: React.FC = () => {
  // Mock recommended recipes data
  const recommendedRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Mediterranean Quinoa Bowl',
      description: 'A healthy and flavorful bowl packed with fresh vegetables',
      image: '/placeholder.svg',
      prep_time: 15,
      cooking_time: 20,
      servings: 2,
      difficulty: 'Easy',
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 8,
      rating: 4.8,
      rating_count: 156,
      ingredients: [
        { id: '1', name: 'Quinoa', quantity: 1, unit: 'cup' },
        { id: '2', name: 'Cucumber', quantity: 1, unit: 'medium' },
        { id: '3', name: 'Cherry Tomatoes', quantity: 150, unit: 'g' }
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Dice cucumber and halve cherry tomatoes',
        'Combine all ingredients in a bowl'
      ],
      categories: ['Healthy', 'Mediterranean'],
      tags: ['vegetarian', 'gluten-free', 'healthy'],
      isFavorite: false
    },
    {
      id: '2',
      title: 'Honey Garlic Salmon',
      description: 'Perfectly glazed salmon with a sweet and savory coating',
      image: '/placeholder.svg',
      prep_time: 10,
      cooking_time: 15,
      servings: 4,
      difficulty: 'Easy',
      calories: 280,
      protein: 25,
      carbs: 12,
      fat: 15,
      rating: 4.6,
      rating_count: 203,
      ingredients: [
        { id: '1', name: 'Salmon Fillets', quantity: 4, unit: 'pieces' },
        { id: '2', name: 'Honey', quantity: 3, unit: 'tbsp' },
        { id: '3', name: 'Garlic', quantity: 3, unit: 'cloves' }
      ],
      instructions: [
        'Season salmon with salt and pepper',
        'Mix honey, garlic, and soy sauce',
        'Cook salmon and glaze with sauce'
      ],
      categories: ['Main Course', 'Seafood'],
      tags: ['protein', 'quick', 'healthy'],
      isFavorite: true
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} size="medium" />
        ))}
      </div>
    </div>
  );
};
