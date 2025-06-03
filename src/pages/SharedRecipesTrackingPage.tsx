
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Heart, MessageCircle, Share2, Users, TrendingUp } from 'lucide-react';
import { Recipe } from '@/types/index';

interface SharedRecipeStats {
  views: number;
  likes: number;
  commentCount: number;
  comments: Comment[];
  shares: number;
  usedCount: number;
}

type SharedRecipe = Recipe & SharedRecipeStats;

export default function SharedRecipesTrackingPage() {
  const [recipes] = useState<SharedRecipe[]>([
    {
      id: '1',
      title: 'Creamy Mushroom Risotto',
      image: '/api/placeholder/300/200',
      image_url: '/api/placeholder/300/200',
      description: 'Rich and creamy risotto with wild mushrooms',
      prep_time: 15,
      prepTime: 15,
      cook_time: 30,
      cookTime: 30,
      cooking_time: 30,
      total_time: 45,
      servings: 4,
      difficulty: 'Medium' as const,
      calories: 380,
      protein: 12,
      carbs: 65,
      fat: 8,
      rating: 4.7,
      rating_count: 89,
      ratingCount: 89,
      cuisine_type: 'Italian',
      cuisineType: 'Italian',
      instructions: ['Step 1', 'Step 2'],
      categories: ['Main Course'],
      tags: ['Vegetarian'],
      isFavorite: true,
      user_id: 'user123',
      author_id: 'user123',
      is_verified: true,
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
      ingredients: [],
      views: 1250,
      likes: 89,
      commentCount: 23,
      comments: [],
      shares: 15,
      usedCount: 67
    },
    {
      id: '2',
      title: 'Spicy Thai Green Curry',
      image: '/api/placeholder/300/200',
      image_url: '/api/placeholder/300/200',
      description: 'Authentic Thai green curry with coconut milk',
      prep_time: 20,
      prepTime: 20,
      cook_time: 25,
      cookTime: 25,
      cooking_time: 25,
      total_time: 45,
      servings: 4,
      difficulty: 'Medium' as const,
      calories: 320,
      protein: 22,
      carbs: 18,
      fat: 20,
      rating: 4.5,
      rating_count: 156,
      ratingCount: 156,
      cuisine_type: 'Thai',
      cuisineType: 'Thai',
      instructions: ['Step 1', 'Step 2'],
      categories: ['Main Course'],
      tags: ['Spicy'],
      isFavorite: false,
      user_id: 'user123',
      author_id: 'user123',
      is_verified: true,
      created_at: '2024-01-10',
      updated_at: '2024-01-10',
      ingredients: [],
      views: 980,
      likes: 156,
      commentCount: 31,
      comments: [],
      shares: 22,
      usedCount: 89
    },
    {
      id: '3',
      title: 'Classic Chocolate Brownies',
      image: '/api/placeholder/300/200',
      image_url: '/api/placeholder/300/200',
      description: 'Fudgy chocolate brownies with walnuts',
      prep_time: 15,
      prepTime: 15,
      cook_time: 35,
      cookTime: 35,
      cooking_time: 35,
      total_time: 50,
      servings: 12,
      difficulty: 'Easy' as const,
      calories: 280,
      protein: 4,
      carbs: 35,
      fat: 15,
      rating: 4.8,
      rating_count: 203,
      ratingCount: 203,
      cuisine_type: 'American',
      cuisineType: 'American',
      instructions: ['Step 1', 'Step 2'],
      categories: ['Dessert'],
      tags: ['Sweet'],
      isFavorite: true,
      user_id: 'user123',
      author_id: 'user123',
      is_verified: true,
      created_at: '2024-01-05',
      updated_at: '2024-01-05',
      ingredients: [],
      views: 2100,
      likes: 203,
      commentCount: 45,
      comments: [],
      shares: 38,
      usedCount: 145
    }
  ]);

  const totalViews = recipes.reduce((sum, recipe) => sum + recipe.views, 0);
  const totalLikes = recipes.reduce((sum, recipe) => sum + recipe.likes, 0);
  const totalShares = recipes.reduce((sum, recipe) => sum + recipe.shares, 0);

  return (
    <PageContainer
      header={{
        title: 'My Shared Recipes',
        showBackButton: true,
      }}
      className="max-w-6xl mx-auto"
    >
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Likes</p>
                  <p className="text-2xl font-bold">{totalLikes.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Share2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Shares</p>
                  <p className="text-2xl font-bold">{totalShares.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="flex">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-32 h-32 object-cover"
                />
                <div className="flex-1 p-4">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{recipe.cuisine_type}</Badge>
                      <Badge variant="outline">{recipe.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span>{recipe.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-gray-400" />
                        <span>{recipe.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4 text-gray-400" />
                        <span>{recipe.commentCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{recipe.usedCount}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <div className="flex items-center space-x-1 text-sm text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>+12% this week</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
