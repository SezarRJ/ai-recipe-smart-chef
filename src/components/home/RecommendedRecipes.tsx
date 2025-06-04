
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { CategoryFilters } from '@/components/recipe/CategoryFilters';
import { Recipe } from '@/types/index';

interface RecommendedRecipesProps {
  recipes?: Recipe[];
  categories?: string[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const RecommendedRecipes: React.FC<RecommendedRecipesProps> = ({
  recipes = [],
  categories = [],
  selectedCategory = 'All',
  onSelectCategory
}) => {
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);
  
  const handleCategorySelect = (category: string) => {
    setLocalSelectedCategory(category);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  // Mock recipes if none provided
  const mockRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Quick Pasta Primavera',
      description: 'Fresh vegetables with pasta in a light sauce',
      image: '/placeholder.svg',
      image_url: '/placeholder.svg',
      prepTime: 15,
      prep_time: 15,
      cookTime: 20,
      cook_time: 20,
      servings: 4,
      difficulty: 'Easy' as const,
      calories: 320,
      rating: 4.5,
      ratingCount: 128,
      ingredients: [],
      instructions: [],
      categories: ['Italian', 'Vegetarian'],
      tags: ['quick', 'healthy'],
      isFavorite: false,
      cuisine_type: 'Italian',
      cuisineType: 'Italian',
      status: 'published',
      author_id: '1',
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Mediterranean Bowl',
      description: 'Healthy bowl with quinoa and fresh vegetables',
      image: '/placeholder.svg',
      image_url: '/placeholder.svg',
      prepTime: 10,
      prep_time: 10,
      cookTime: 15,
      cook_time: 15,
      servings: 2,
      difficulty: 'Easy' as const,
      calories: 280,
      rating: 4.7,
      ratingCount: 89,
      ingredients: [],
      instructions: [],
      categories: ['Mediterranean', 'Healthy'],
      tags: ['bowl', 'quinoa'],
      isFavorite: true,
      cuisine_type: 'Mediterranean',
      cuisineType: 'Mediterranean',
      status: 'published',
      author_id: '2',
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  const displayRecipes = recipes.length > 0 ? recipes : mockRecipes;
  const displayCategories = categories.length > 0 ? categories : ['Italian', 'Mediterranean', 'Healthy'];

  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-wasfah-deep-teal">Recommended for you</h2>
        <Link to="/recipes">
          <Button variant="link" className="text-wasfah-bright-teal p-0">
            View All
          </Button>
        </Link>
      </div>
      
      <CategoryFilters
        categories={['All', ...displayCategories]}
        selectedCategory={localSelectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      
      <div className="mt-4 transition-all duration-500 ease-in-out">
        <RecipeGrid recipes={displayRecipes} columns={2} cardSize="medium" />
      </div>
    </div>
  );
};
