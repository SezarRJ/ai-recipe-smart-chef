
import React, { useState } from 'react';
import { Recipe } from '@/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, ChefHat, Users, ArrowUpRight, Heart, Share, Info, Plus, Globe } from 'lucide-react';
import { RecipeSocialInteractions } from './RecipeSocialInteractions';
import { useToast } from '@/hooks/use-toast';

interface RecipeDetailProps {
  recipe: Recipe;
  onAddToShoppingList: () => void;
  onStartCookingMode: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onAddToShoppingList,
  onStartCookingMode,
}) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(recipe.isFavorite);
  const [likeCount, setLikeCount] = useState(recipe.rating * 10);

  const handleLike = (recipeId: string) => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Recipe removed from your favorites" : "Recipe added to your favorites",
    });
  };

  const handleComment = (recipeId: string, comment: string) => {
    console.log(`New comment on recipe ${recipeId}: ${comment}`);
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
    });
  };

  const handleShare = (recipeId: string) => {
    // Copy recipe URL to clipboard
    const recipeUrl = `${window.location.origin}/recipes/${recipeId}`;
    navigator.clipboard.writeText(recipeUrl).then(() => {
      toast({
        title: "Recipe shared",
        description: "Recipe link copied to clipboard",
      });
    }).catch(() => {
      toast({
        title: "Share failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive",
      });
    });
  };

  const handleAddToMealPlan = () => {
    toast({
      title: "Added to Meal Plan",
      description: "Recipe has been added to your meal plan",
    });
  };

  const handleToggleFavorite = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Recipe removed from your favorites" : "Recipe added to your favorites",
    });
  };

  const handleShareClick = () => {
    handleShare(recipe.id);
  };

  return (
    <div>
      <div 
        className="w-full h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${recipe.image})` }}
      />
      
      <div className="container px-4 py-4">
        <div className="flex items-start justify-between mb-2">
          <h1 className="recipe-title text-2xl font-bold text-wasfah-deep-teal flex-1">
            {recipe.title}
          </h1>
          {recipe.cuisineType && (
            <div className="flex items-center ml-3">
              <Globe className="h-4 w-4 text-wasfah-bright-teal mr-1" />
              <span className="text-sm text-wasfah-bright-teal font-medium">{recipe.cuisineType}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center mt-1 text-sm">
          <span className="text-wasfah-mint">★</span>
          <span className="ml-1 text-gray-700">{recipe.rating}</span>
          <span className="mx-1 text-gray-400">|</span>
          <span className="text-gray-700">{recipe.ratingCount} ratings</span>
        </div>
        
        <p className="mt-3 text-gray-600">
          {recipe.description}
        </p>
        
        <div className="grid grid-cols-4 gap-2 mt-4">
          <Card className="p-3 text-center">
            <div className="flex justify-center text-wasfah-bright-teal mb-1">
              <Clock size={18} />
            </div>
            <p className="text-sm font-semibold">{recipe.prepTime + recipe.cookTime}m</p>
            <p className="text-xs text-gray-500">Time</p>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="flex justify-center text-wasfah-bright-teal mb-1">
              <Users size={18} />
            </div>
            <p className="text-sm font-semibold">{recipe.servings}</p>
            <p className="text-xs text-gray-500">Servings</p>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="flex justify-center text-wasfah-bright-teal mb-1">
              <ChefHat size={18} />
            </div>
            <p className="text-sm font-semibold">{recipe.difficulty}</p>
            <p className="text-xs text-gray-500">Difficulty</p>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="flex justify-center text-wasfah-bright-teal mb-1">
              <ArrowUpRight size={18} />
            </div>
            <p className="text-sm font-semibold">{recipe.calories}</p>
            <p className="text-xs text-gray-500">Calories</p>
          </Card>
        </div>
        
        <Tabs defaultValue="ingredients" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="space-y-4 mt-4">
            <div className="mt-3 space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center space-x-2">
                  <Checkbox id={ingredient.id} />
                  <label
                    htmlFor={ingredient.id}
                    className={`text-gray-700 ${ingredient.inPantry ? '' : 'text-wasfah-coral-red'}`}
                  >
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    {!ingredient.inPantry && ' (missing)'}
                  </label>
                </div>
              ))}
            </div>
            
            <Button
              variant="outline"
              className="w-full mt-4 border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal/10"
              onClick={onAddToShoppingList}
            >
              Add missing to shopping list
            </Button>
          </TabsContent>
          
          <TabsContent value="instructions" className="space-y-4 mt-4">
            <ol className="mt-3 space-y-4 list-decimal list-inside">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700 pl-2">
                  {instruction}
                </li>
              ))}
            </ol>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Calories</span>
                <span>{recipe.calories} kcal</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Protein</span>
                <span>{recipe.nutritionalInfo?.protein || 0} g</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Carbohydrates</span>
                <span>{recipe.nutritionalInfo?.carbs || 0} g</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Fat</span>
                <span>{recipe.nutritionalInfo?.fat || 0} g</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Fiber</span>
                <span>{recipe.nutritionalInfo?.fiber || 0} g</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="font-medium">Sugar</span>
                <span>{recipe.nutritionalInfo?.sugar || 0} g</span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600 flex items-center">
                <Info size={14} className="mr-2 text-wasfah-bright-teal" />
                Values are per serving
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex space-x-3 mt-6">
          <Button
            className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            onClick={onStartCookingMode}
          >
            <ChefHat size={18} className="mr-2" />
            Start Cooking Mode
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
            onClick={handleAddToMealPlan}
          >
            <Plus size={18} className="mr-2" />
            Add to Meal Plan
          </Button>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <button 
            className="flex items-center text-gray-600 hover:text-wasfah-coral-red transition-colors"
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-6 w-6 mr-2 ${isLiked ? 'fill-wasfah-coral-red text-wasfah-coral-red' : ''}`} />
            <span>{isLiked ? 'Favorited' : 'Favorite'}</span>
          </button>
          
          <button 
            className="flex items-center text-gray-600 hover:text-wasfah-bright-teal transition-colors"
            onClick={handleShareClick}
          >
            <Share className="h-6 w-6 mr-2" />
            <span>Share</span>
          </button>
        </div>
        
        <RecipeSocialInteractions
          recipeId={recipe.id}
          commentCount={recipe.ratingCount}
          shares={Math.floor(recipe.rating * 5)}
          rating={recipe.rating}
          ratingCount={recipe.ratingCount}
          usedCount={Math.floor(recipe.rating * 20)}
          isLiked={isLiked}
          comments={[]}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      </div>
    </div>
  );
};
