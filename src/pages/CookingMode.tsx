
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Recipe } from '@/types/index';
import { CookingMode } from '@/components/recipe/CookingMode';
import { EnhancedCookingMode } from '@/components/recipe/EnhancedCookingMode';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function CookingModePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [useEnhanced, setUseEnhanced] = useState(false);

  useEffect(() => {
    // Mock recipe data - replace with actual API call
    const mockRecipe: Recipe = {
      id: id || '1',
      title: 'Delicious Chicken Curry',
      description: 'A flavorful and aromatic chicken curry with spices',
      image: '/api/placeholder/400/300',
      image_url: '/api/placeholder/400/300',
      prep_time: 20,
      prepTime: 20,
      cook_time: 40,
      cookTime: 40,
      cooking_time: 40,
      total_time: 60,
      servings: 4,
      difficulty: 'Easy' as const,
      cuisine_type: 'Indian',
      cuisineType: 'Indian',
      calories: 350,
      protein: 25,
      carbs: 15,
      fat: 20,
      rating: 4.5,
      rating_count: 128,
      ratingCount: 128,
      instructions: [
        'Heat oil in a large pan over medium heat',
        'Add onions and cook until golden brown',
        'Add garlic and ginger, cook for 1 minute',
        'Add chicken pieces and brown on all sides',
        'Add curry powder, turmeric, and other spices',
        'Pour in coconut milk and simmer for 20 minutes',
        'Season with salt and pepper to taste',
        'Garnish with fresh cilantro and serve'
      ],
      categories: ['Main Course'],
      tags: ['Spicy', 'Comfort Food'],
      isFavorite: false,
      user_id: 'user123',
      author_id: 'user123',
      is_verified: true,
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ingredients: [
        { id: '1', name: 'Chicken breast', quantity: 500, unit: 'g', amount: 500 },
        { id: '2', name: 'Onion', quantity: 1, unit: 'large', amount: 1 },
        { id: '3', name: 'Garlic', quantity: 3, unit: 'cloves', amount: 3 },
        { id: '4', name: 'Ginger', quantity: 1, unit: 'tbsp', amount: 1 },
        { id: '5', name: 'Curry powder', quantity: 2, unit: 'tbsp', amount: 2 }
      ]
    };

    setRecipe(mockRecipe);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
          <Button onClick={() => navigate('/recipes')}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  const handleClose = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="min-h-screen">
      {useEnhanced ? (
        <EnhancedCookingMode recipe={recipe} onClose={handleClose} />
      ) : (
        <CookingMode recipe={recipe} onClose={handleClose} />
      )}
      
      {/* Toggle button for switching modes */}
      <Button
        onClick={() => setUseEnhanced(!useEnhanced)}
        className="fixed bottom-4 right-4 z-50"
        variant="outline"
      >
        {useEnhanced ? 'Classic Mode' : 'Enhanced Mode'}
      </Button>
    </div>
  );
}
