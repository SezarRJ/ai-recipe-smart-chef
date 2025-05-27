
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Recipe } from '@/types';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
  size?: 'small' | 'medium' | 'large';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-32',
    medium: 'h-44',
    large: 'h-60',
  };

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden hover-scale">
        <div className="relative">
          <div
            className={`bg-cover bg-center ${sizeClasses[size]}`}
            style={{ backgroundImage: `url(${recipe.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute top-2 right-2">
            <button className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full">
              <Heart
                size={18}
                className={recipe.isFavorite ? 'fill-wasfah-coral-red text-wasfah-coral-red' : 'text-white'}
              />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 p-3 text-white">
            <div className="space-y-1">
              <h3 className="recipe-title font-bold line-clamp-1">
                {recipe.title}
              </h3>
              {size !== 'small' && (
                <p className="text-xs line-clamp-2 text-gray-100 opacity-90">
                  {recipe.description}
                </p>
              )}
              <div className="flex items-center space-x-2 text-xs pt-1">
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
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
