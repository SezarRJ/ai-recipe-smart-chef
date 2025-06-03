
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Clock, Users, Star } from 'lucide-react';
import { Recipe } from '@/types/index';
import { Link } from 'react-router-dom';
import { AnimatedCard } from '@/components/ui/enhanced-animations';

interface EnhancedRecipeCardProps {
  recipe: Recipe;
  size?: 'small' | 'medium' | 'large';
  delay?: number;
}

export const EnhancedRecipeCard: React.FC<EnhancedRecipeCardProps> = ({ 
  recipe, 
  size = 'medium',
  delay = 0 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'h-32',
    medium: 'h-44',
    large: 'h-60',
  };

  return (
    <div 
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link to={`/recipe/${recipe.id}`}>
        <AnimatedCard 
          className="overflow-hidden"
          onClick={() => {}}
        >
          <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="relative">
              {/* Image with loading animation */}
              <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Favorite button with pulse animation */}
              <div className="absolute top-3 right-3">
                <button 
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Heart
                    size={16}
                    className={`transition-all duration-300 ${
                      recipe.isFavorite 
                        ? 'fill-red-500 text-red-500 animate-pulse' 
                        : 'text-white hover:text-red-300'
                    }`}
                  />
                </button>
              </div>

              {/* New/Popular badges with glow effect */}
              <div className="absolute top-3 left-3">
                {recipe.rating > 4.5 && (
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse-glow">
                    Popular
                  </div>
                )}
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg line-clamp-2 group-hover:text-wasfah-mint transition-colors duration-300">
                    {recipe.title}
                  </h3>
                  
                  {size !== 'small' && (
                    <p className="text-sm line-clamp-2 text-gray-200 opacity-90">
                      {recipe.description}
                    </p>
                  )}
                  
                  {/* Recipe metadata with icons */}
                  <div className="flex items-center justify-between text-xs pt-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{recipe.prepTime + recipe.cookTime}m</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400" />
                        <span>{recipe.rating}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{recipe.servings}</span>
                      </div>
                    </div>
                    
                    <div className="bg-wasfah-bright-teal/80 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="font-medium">{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedCard>
      </Link>
    </div>
  );
};
