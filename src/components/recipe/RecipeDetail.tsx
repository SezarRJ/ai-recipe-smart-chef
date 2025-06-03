import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, ChefHat, Heart, Share2, Star } from 'lucide-react';
import { Recipe } from '@/types/index';
import { useToast } from '@/hooks/use-toast';

interface RecipeDetailProps {
  recipe: Recipe;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);
  const [servings, setServings] = useState(recipe.servings);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Recipe removed from your favorites" : "Recipe added to your favorites",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Recipe link copied to clipboard",
      });
    }
  };

  const adjustQuantity = (originalQuantity: number, originalServings: number, newServings: number) => {
    return (originalQuantity * newServings) / originalServings;
  };

  const formatQuantity = (quantity: number): string => {
    if (quantity % 1 === 0) {
      return quantity.toString();
    }
    return quantity.toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
            <p className="text-gray-600 mb-4">{recipe.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{recipe.rating}</span>
                <span className="text-gray-500">({recipe.rating_count} reviews)</span>
              </div>
              <Badge variant="secondary">{recipe.difficulty}</Badge>
              <Badge variant="outline">{recipe.cuisine_type}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleFavorite}>
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Recipe Image */}
        {recipe.image_url && (
          <div className="w-full h-64 rounded-lg overflow-hidden mb-6">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Recipe Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Prep Time</p>
              <p className="font-semibold">{recipe.prep_time} min</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Cook Time</p>
              <p className="font-semibold">{recipe.cooking_time} min</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Servings</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="h-6 w-6 p-0"
                >
                  -
                </Button>
                <span className="font-semibold min-w-[2rem] text-center">{servings.toString()}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setServings(servings + 1)}
                  className="h-6 w-6 p-0"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Ingredients */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="text-gray-600">
                      {formatQuantity(adjustQuantity(ingredient.quantity, recipe.servings, servings))} {ingredient.unit}
                    </span>
                  </div>
                )) || <p className="text-gray-500">No ingredients listed</p>}
              </div>
            </CardContent>
          </Card>

          {/* Nutrition */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Nutrition per serving</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{recipe.calories}</p>
                  <p className="text-sm text-gray-600">Calories</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{recipe.protein}g</p>
                  <p className="text-sm text-gray-600">Protein</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{recipe.carbs}g</p>
                  <p className="text-sm text-gray-600">Carbs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{recipe.fat}g</p>
                  <p className="text-sm text-gray-600">Fat</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{instruction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Button 
          onClick={() => navigate(`/cooking/${recipe.id}`)}
          className="flex-1 bg-orange-600 hover:bg-orange-700"
        >
          <ChefHat className="mr-2 h-4 w-4" />
          Start Cooking
        </Button>
        <Button variant="outline" className="flex-1">
          Add to Meal Plan
        </Button>
        <Button variant="outline" className="flex-1">
          Add to Shopping List
        </Button>
      </div>
    </div>
  );
};
