
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Heart, MessageSquare, Share2, Clock, Users, ChefHat, TrendingUp } from 'lucide-react';
import { Recipe } from '@/types/index';
import { Link } from 'react-router-dom';

const mockSharedRecipes: Recipe[] = [
  {
    id: '1',
    title: 'My Secret Pasta Recipe',
    description: 'Family recipe passed down through generations',
    image: '/placeholder.svg',
    prep_time: 20,
    cooking_time: 25,
    servings: 4,
    difficulty: 'Medium',
    calories: 450,
    protein: 18,
    carbs: 65,
    fat: 12,
    rating: 4.8,
    rating_count: 24,
    ingredients: [],
    instructions: [],
    categories: ['Italian', 'Pasta'],
    tags: ['family-recipe', 'comfort-food'],
    isFavorite: false
  },
  {
    id: '2', 
    title: 'Healthy Green Smoothie Bowl',
    description: 'Nutritious breakfast packed with vitamins',
    image: '/placeholder.svg',
    prep_time: 10,
    cooking_time: 0,
    servings: 2,
    difficulty: 'Easy',
    calories: 280,
    protein: 8,
    carbs: 45,
    fat: 6,
    rating: 4.6,
    rating_count: 18,
    ingredients: [],
    instructions: [],
    categories: ['Healthy', 'Breakfast'],
    tags: ['vegan', 'quick'],
    isFavorite: false
  },
  {
    id: '3',
    title: 'Spicy Korean Bibimbap',
    description: 'Authentic Korean mixed rice bowl with vegetables',
    image: '/placeholder.svg',
    prep_time: 30,
    cooking_time: 20,
    servings: 3,
    difficulty: 'Hard',
    calories: 520,
    protein: 22,
    carbs: 75,
    fat: 15,
    rating: 4.9,
    rating_count: 31,
    ingredients: [],
    instructions: [],
    categories: ['Korean', 'Main Course'],
    tags: ['spicy', 'authentic'],
    isFavorite: false
  }
];

interface RecipeStats {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

const mockStats: { [key: string]: RecipeStats } = {
  '1': { views: 1250, likes: 89, comments: 24, shares: 12, saves: 67 },
  '2': { views: 890, likes: 62, comments: 18, shares: 8, saves: 45 },
  '3': { views: 1680, likes: 124, comments: 31, shares: 18, saves: 89 }
};

export default function SharedRecipesTrackingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('month');

  const totalViews = Object.values(mockStats).reduce((sum, stats) => sum + stats.views, 0);
  const totalLikes = Object.values(mockStats).reduce((sum, stats) => sum + stats.likes, 0);
  const totalComments = Object.values(mockStats).reduce((sum, stats) => sum + stats.comments, 0);
  const avgRating = mockSharedRecipes.reduce((sum, recipe) => sum + recipe.rating, 0) / mockSharedRecipes.length;

  const getStatusBadge = (recipe: Recipe) => {
    if (recipe.rating >= 4.5) {
      return <Badge className="bg-green-100 text-green-800">Popular</Badge>;
    } else if (recipe.rating >= 4.0) {
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">New</Badge>;
    }
  };

  return (
    <PageContainer 
      header={{ 
        title: 'My Shared Recipes', 
        showBackButton: true 
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center">
                <Eye className="h-4 w-4 mr-1" />
                Total Views
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{totalLikes}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center">
                <Heart className="h-4 w-4 mr-1" />
                Total Likes
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{totalComments}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                Comments
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{avgRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Period Selector */}
        <Tabs value={selectedPeriod} onValueChange={(value: any) => setSelectedPeriod(value)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="mt-6">
            {/* Recipe Performance List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recipe Performance</h3>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>

              {mockSharedRecipes.map((recipe) => {
                const stats = mockStats[recipe.id];
                return (
                  <Card key={recipe.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{recipe.title}</h4>
                              <p className="text-sm text-gray-600 line-clamp-1">{recipe.description}</p>
                            </div>
                            {getStatusBadge(recipe)}
                          </div>

                          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center text-sm">
                            <div>
                              <div className="font-semibold text-blue-600">{stats.views}</div>
                              <div className="text-gray-500">Views</div>
                            </div>
                            <div>
                              <div className="font-semibold text-red-600">{stats.likes}</div>
                              <div className="text-gray-500">Likes</div>
                            </div>
                            <div>
                              <div className="font-semibold text-green-600">{stats.comments}</div>
                              <div className="text-gray-500">Comments</div>
                            </div>
                            <div>
                              <div className="font-semibold text-purple-600">{stats.shares}</div>
                              <div className="text-gray-500">Shares</div>
                            </div>
                            <div>
                              <div className="font-semibold text-orange-600">{stats.saves}</div>
                              <div className="text-gray-500">Saves</div>
                            </div>
                            <div>
                              <div className="font-semibold text-yellow-600">{recipe.rating}</div>
                              <div className="text-gray-500">Rating</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {recipe.prep_time + recipe.cooking_time}m
                              </span>
                              <span className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {recipe.servings}
                              </span>
                              <span className="flex items-center">
                                <ChefHat className="h-3 w-3 mr-1" />
                                {recipe.difficulty}
                              </span>
                            </div>
                            <Link to={`/recipe/${recipe.id}`}>
                              <Button variant="outline" size="sm">
                                View Recipe
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/create-recipe">
            <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
              <Share2 className="mr-2 h-4 w-4" />
              Share New Recipe
            </Button>
          </Link>
          <Link to="/shared-recipes">
            <Button variant="outline" className="w-full border-wasfah-bright-teal text-wasfah-bright-teal">
              View Community Recipes
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
