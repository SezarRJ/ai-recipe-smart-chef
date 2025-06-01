
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Recipe } from '@/types/index';

const SharedRecipesTrackingPage = () => {
  // Mock data for shared recipes
  const sharedRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Grandma\'s Secret Pasta',
      description: 'Traditional family recipe passed down through generations',
      image: '/placeholder.svg',
      image_url: '/placeholder.svg',
      prep_time: 20,
      cook_time: 30,
      cooking_time: 30,
      servings: 4,
      difficulty: 'Medium',
      calories: 450,
      protein: 25,
      carbs: 55,
      fat: 15,
      cuisine_type: 'Italian',
      instructions: ['Boil water', 'Cook pasta', 'Add sauce'],
      categories: ['Italian', 'Main Course'],
      tags: ['family', 'traditional'],
      user_id: 'user1',
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rating: 4.8,
      rating_count: 52,
      isFavorite: false,
      ingredients: [
        { id: '1', name: 'Pasta', quantity: 1, unit: 'lb' },
        { id: '2', name: 'Tomato Sauce', quantity: 2, unit: 'cups' }
      ]
    },
    {
      id: '2',
      title: 'Healthy Green Smoothie',
      description: 'Perfect morning boost with spinach and fruits',
      image: '/placeholder.svg',
      image_url: '/placeholder.svg',
      prep_time: 5,
      cook_time: 0,
      cooking_time: 0,
      servings: 1,
      difficulty: 'Easy',
      calories: 150,
      protein: 8,
      carbs: 30,
      fat: 2,
      cuisine_type: 'Health',
      instructions: ['Blend ingredients'],
      categories: ['Healthy', 'Smoothie'],
      tags: ['healthy', 'quick'],
      user_id: 'user1',
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rating: 4.5,
      rating_count: 28,
      isFavorite: false,
      ingredients: [
        { id: '3', name: 'Spinach', quantity: 1, unit: 'cup' },
        { id: '4', name: 'Banana', quantity: 1, unit: 'piece' }
      ]
    },
    {
      id: '3',
      title: 'Spicy Tacos',
      description: 'Authentic Mexican street tacos with homemade salsa',
      image: '/placeholder.svg',
      image_url: '/placeholder.svg',
      prep_time: 15,
      cook_time: 20,
      cooking_time: 20,
      servings: 3,
      difficulty: 'Medium',
      calories: 320,
      protein: 22,
      carbs: 35,
      fat: 12,
      cuisine_type: 'Mexican',
      instructions: ['Prepare filling', 'Heat tortillas', 'Assemble tacos'],
      categories: ['Mexican', 'Street Food'],
      tags: ['spicy', 'authentic'],
      user_id: 'user1',
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rating: 4.6,
      rating_count: 35,
      isFavorite: false,
      ingredients: [
        { id: '5', name: 'Ground Beef', quantity: 1, unit: 'lb' },
        { id: '6', name: 'Tortillas', quantity: 6, unit: 'pieces' }
      ]
    }
  ];

  return (
    <PageContainer header={{ title: 'Shared Recipes Tracking', showBackButton: true }}>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Shared Recipes</h1>
        {sharedRecipes.length > 0 ? (
          <ul className="list-disc pl-5">
            {sharedRecipes.map(recipe => (
              <li key={recipe.id} className="mb-2">
                {recipe.title} - {recipe.cuisine_type}
              </li>
            ))}
          </ul>
        ) : (
          <p>No shared recipes found.</p>
        )}
      </div>
    </PageContainer>
  );
};

export default SharedRecipesTrackingPage;
