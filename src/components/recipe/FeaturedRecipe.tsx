
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Recipe } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

interface FeaturedRecipeProps {
  recipe: Recipe;
}

export const FeaturedRecipe: React.FC<FeaturedRecipeProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden mb-6">
        <div className="relative">
          <div
            className="h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${recipe.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-4 text-white w-full">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="recipe-title text-xl font-bold">{recipe.title}</h2>
                <div className="rounded-full bg-wasfah-bright-teal/90 backdrop-blur-sm text-white px-3 py-1 text-xs">
                  Featured
                </div>
              </div>
              <p className="text-sm line-clamp-2 text-gray-200">
                {recipe.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center">
                    <span>{recipe.prepTime + recipe.cookTime}m</span>
                  </div>
                  <div className="h-1 w-1 bg-white rounded-full"></div>
                  <div className="flex items-center">
                    <span className="text-wasfah-mint">★</span>
                    <span className="ml-1">{recipe.rating}</span>
                  </div>
                  <div className="h-1 w-1 bg-white rounded-full"></div>
                  <div>
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
                >
                  <ChefHat size={16} className="mr-1" />
                  Cook Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
