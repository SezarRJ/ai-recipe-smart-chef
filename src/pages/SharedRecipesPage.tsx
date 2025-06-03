
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Share2 } from 'lucide-react';
import { mockRecipes } from '@/data/mockData';
import { RecipeSocialInteractions, Comment } from '@/components/recipe/RecipeSocialInteractions';

export default function SharedRecipesPage() {
  // Add mock social data to recipes
  const recipesWithSocial = mockRecipes.map(recipe => ({
    ...recipe,
    views: Math.floor(Math.random() * 100) + 50,
    likes: Math.floor(Math.random() * 30) + 10,
    commentCount: Math.floor(Math.random() * 15),
    comments: [] as Comment[],
    shares: Math.floor(Math.random() * 10),
    usedCount: Math.floor(Math.random() * 20)
  }));

  return (
    <PageContainer
      header={{
        title: 'Shared Recipes',
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-20">
        <Card className="bg-gradient-to-r from-wasfah-deep-teal to-wasfah-bright-teal text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Share Your Recipes</h2>
                <p className="text-sm opacity-90">Share your favorite recipes with the Wasfah community</p>
              </div>
              <ChefHat size={48} className="opacity-70" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-wasfah-deep-teal">Community Recipes</h3>
          <Link to="/shared-recipes-tracking">
            <Button variant="ghost" size="sm" className="text-wasfah-bright-teal">
              View My Shared
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {recipesWithSocial.slice(0, 3).map(recipe => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 p-4">
                  <h3 className="font-semibold text-lg mb-1">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>

                  <RecipeSocialInteractions
                    recipeId={recipe.id}
                    commentCount={recipe.commentCount}
                    shares={recipe.shares}
                    rating={recipe.rating}
                    ratingCount={recipe.ratingCount}
                    usedCount={recipe.usedCount}
                    isLiked={recipe.isFavorite}
                    comments={recipe.comments}
                  />

                  <div className="mt-3 flex justify-end">
                    <Link to={`/recipe/${recipe.id}`}>
                      <Button size="sm">View Recipe</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex space-x-3">
          <Link to="/create-recipe" className="flex-1">
            <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
              <Share2 className="mr-2 h-4 w-4" />
              Share New Recipe
            </Button>
          </Link>
          <Link to="/recipes" className="flex-1">
            <Button variant="outline" className="w-full border-wasfah-bright-teal text-wasfah-bright-teal">
              View All Recipes
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
