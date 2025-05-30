
import React, { useState } from 'react';
import { Recipe } from '@/types/index';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Clock, ChefHat, Users, Heart, Share2, PlayCircle, Plus, Eye, Star } from 'lucide-react';
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
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleToggleFavorite = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Recipe removed from your favorites" : "Recipe added to your favorites",
    });
  };

  const handleShare = () => {
    const recipeUrl = `${window.location.origin}/recipes/${recipe.id}`;
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

  const toggleIngredient = (ingredientId: string) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredientId)) {
      newChecked.delete(ingredientId);
    } else {
      newChecked.add(ingredientId);
    }
    setCheckedIngredients(newChecked);
  };

  const toggleStep = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const handleLike = (recipeId: string) => {
    handleToggleFavorite();
  };

  const handleComment = (recipeId: string, comment: string) => {
    console.log(`New comment on recipe ${recipeId}: ${comment}`);
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
    });
  };

  const handleSocialShare = (recipeId: string) => {
    handleShare();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image Section with Overlaid Content */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Overlaid Action Icons (Top Right) */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <button
            onClick={handleToggleFavorite}
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
          >
            <Heart 
              className={`h-6 w-6 text-white ${isLiked ? 'fill-current' : ''}`}
            />
          </button>
          <button
            onClick={handleShare}
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
          >
            <Share2 className="h-6 w-6 text-white" />
          </button>
        </div>
        
        {/* Overlaid Content (Bottom Left) */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {recipe.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* Key Stats Bar */}
      <div className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-wasfah-bright-teal" />
              <span className="font-medium text-gray-700">{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-wasfah-bright-teal" />
              <span className="font-medium text-gray-700">{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-wasfah-bright-teal" />
              <span className="font-medium text-gray-700">{recipe.difficulty}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-700">{recipe.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{Math.floor(recipe.rating * 20)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Ingredients Section (Left Column on Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient) => {
                  const isChecked = checkedIngredients.has(ingredient.id);
                  return (
                    <div 
                      key={ingredient.id} 
                      className={`flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-wasfah-bright-teal/30'
                      }`}
                      onClick={() => toggleIngredient(ingredient.id)}
                    >
                      <Checkbox 
                        id={ingredient.id}
                        checked={isChecked}
                        onCheckedChange={() => toggleIngredient(ingredient.id)}
                        className="h-5 w-5 mt-0.5"
                      />
                      <label
                        htmlFor={ingredient.id}
                        className={`flex-1 cursor-pointer ${
                          isChecked ? 'line-through text-gray-500' : 'text-gray-700'
                        }`}
                      >
                        <span className="font-semibold text-wasfah-deep-teal">
                          {ingredient.amount} {ingredient.unit}
                        </span>{' '}
                        {ingredient.name}
                        {!ingredient.inPantry && (
                          <span className="text-wasfah-coral-red font-medium ml-1">(missing)</span>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full mt-6 border-2 border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
                onClick={onAddToShoppingList}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Missing to Shopping List
              </Button>
            </div>
          </div>
          
          {/* Instructions Section (Right Column on Desktop) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
            <div className="space-y-6">
              {recipe.instructions.map((instruction, index) => {
                const isCompleted = completedSteps.has(index);
                return (
                  <div 
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                      isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-wasfah-bright-teal/30 hover:shadow-md'
                    }`}
                    onClick={() => toggleStep(index)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-wasfah-bright-teal text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <p className={`text-lg leading-relaxed ${
                        isCompleted ? 'line-through text-gray-500' : 'text-gray-700'
                      }`}>
                        {instruction}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Social Interactions & Rating Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
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
          onShare={handleSocialShare}
          className="justify-center"
        />
      </div>

      <Separator className="my-8" />

      {/* Additional Actions */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white font-semibold py-4"
            onClick={handleAddToMealPlan}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add to Meal Plan
          </Button>
          
          <Card className="p-4 bg-gradient-to-br from-wasfah-bright-teal/10 to-wasfah-teal/10 border-wasfah-bright-teal/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-wasfah-deep-teal">{recipe.calories}</div>
              <div className="text-sm text-gray-600">Calories per serving</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Sticky Primary Action Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden">
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal text-white font-semibold py-4"
          onClick={onStartCookingMode}
        >
          <PlayCircle className="mr-2 h-6 w-6" />
          Start Cooking
        </Button>
      </div>

      {/* Desktop Primary Action Button */}
      <div className="hidden lg:block fixed bottom-8 right-8">
        <Button
          size="lg"
          className="bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal text-white font-semibold py-4 px-8 shadow-lg"
          onClick={onStartCookingMode}
        >
          <PlayCircle className="mr-2 h-6 w-6" />
          Start Cooking
        </Button>
      </div>
    </div>
  );
};
