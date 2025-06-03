
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VoiceRecipeAssistant } from '@/components/ai/VoiceRecipeAssistant';
import { 
  Clock, 
  Users, 
  Star, 
  Heart, 
  Share2, 
  ChefHat, 
  Flame,
  Mic,
  MicOff
} from 'lucide-react';
import { Recipe } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface RecipeDetailProps {
  recipe: Recipe;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: isFavorite ? 'Recipe removed from your favorites' : 'Recipe added to your favorites'
    });
  };

  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Recipe link copied to clipboard'
      });
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <PageContainer header={{ title: recipe.title, showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Recipe Image & Basic Info */}
        <Card>
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/90 hover:bg-white"
                onClick={toggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/90 hover:bg-white"
                onClick={shareRecipe}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className={`${showVoiceAssistant ? 'bg-wasfah-bright-teal text-white' : 'bg-white/90'} hover:bg-wasfah-bright-teal hover:text-white`}
                onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
              >
                {showVoiceAssistant ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                <p className="text-gray-600">{recipe.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {recipe.categories?.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <Clock className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium">{recipe.prep_time + recipe.cooking_time} min</p>
                  <p className="text-xs text-gray-500">Total Time</p>
                </div>
                <div>
                  <Users className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium">{recipe.servings}</p>
                  <p className="text-xs text-gray-500">Servings</p>
                </div>
                <div>
                  <Star className="h-5 w-5 mx-auto mb-1 text-yellow-500 fill-current" />
                  <p className="text-sm font-medium">{recipe.rating}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div>
                  <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                  <p className="text-sm font-medium">{recipe.calories}</p>
                  <p className="text-xs text-gray-500">Calories</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Assistant */}
        {showVoiceAssistant && (
          <VoiceRecipeAssistant 
            recipe={{
              title: recipe.title,
              instructions: recipe.instructions
            }}
            onStepChange={handleStepChange}
          />
        )}

        {/* Recipe Content Tabs */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-gray-600">{ingredient.quantity} {ingredient.unit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div 
                      key={index} 
                      className={`flex gap-4 p-4 rounded-lg transition-colors ${
                        showVoiceAssistant && currentStep === index 
                          ? 'bg-wasfah-bright-teal/10 border border-wasfah-bright-teal/20' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        showVoiceAssistant && currentStep === index
                          ? 'bg-wasfah-bright-teal text-white'
                          : 'bg-white text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{instruction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Information</CardTitle>
                <p className="text-sm text-gray-600">Per serving</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wasfah-bright-teal">{recipe.calories}</p>
                    <p className="text-sm text-gray-600">Calories</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{recipe.protein}g</p>
                    <p className="text-sm text-gray-600">Protein</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{recipe.carbs}g</p>
                    <p className="text-sm text-gray-600">Carbs</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{recipe.fat}g</p>
                    <p className="text-sm text-gray-600">Fat</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};
