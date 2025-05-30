
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, MessageCircle, ChevronLeft, ChevronRight, Timer, Share2 } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Recipe } from '@/types/index';
import { useFavorites } from '@/hooks/useFavorites';
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
  const [servings, setServings] = useState(recipe.servings || 1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [showTimer, setShowTimer] = useState<{ open: boolean, step?: number }>({ open: false });
  const instructionsRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const nutritionRef = useRef<HTMLDivElement>(null);
  
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  // Helper to recalculate ingredient amounts
  const getAdjustedAmount = (ingredient: any) => {
    if (!ingredient.amount || !recipe.servings) return ingredient.amount;
    return (Number(ingredient.amount) * servings / recipe.servings).toFixed(2);
  };

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler functions
  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
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

  const handleOpenCommentModal = () => {
    toast({
      title: "Comments",
      description: "Comment feature coming soon!",
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image Gallery */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {recipe.image && (
              <CarouselItem>
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        {/* Overlay icons */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <button 
            onClick={handleToggleFavorite} 
            className="p-3 rounded-full bg-black/30 hover:bg-black/40 transition-colors"
          >
            <Bookmark className={`h-6 w-6 text-white ${isFavorite(recipe.id) ? 'fill-white' : ''}`} />
          </button>
          <button 
            onClick={handleShare} 
            className="p-3 rounded-full bg-black/30 hover:bg-black/40 transition-colors"
          >
            <Share2 className="h-6 w-6 text-white" />
          </button>
          <button 
            onClick={handleOpenCommentModal} 
            className="p-3 rounded-full bg-black/30 hover:bg-black/40 transition-colors"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </button>
        </div>
        
        {/* Title/description overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-white/90 text-sm md:text-base">{recipe.description}</p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients" onClick={() => scrollToSection(ingredientsRef)}>
              Ingredients
            </TabsTrigger>
            <TabsTrigger value="instructions" onClick={() => scrollToSection(instructionsRef)}>
              Instructions
            </TabsTrigger>
            <TabsTrigger value="nutrition" onClick={() => scrollToSection(nutritionRef)}>
              Nutrition
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Servings Adjuster */}
      <div className="flex items-center justify-center my-4 p-4">
        <span className="mr-4 font-medium">Servings:</span>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setServings(s => Math.max(1, s - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="mx-4 text-lg font-semibold min-w-8 text-center">{servings}</span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setServings(s => s + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
          {/* Ingredients Section */}
          <TabsContent value="ingredients">
            <div ref={ingredientsRef} className="space-y-3">
              <h2 className="text-xl font-bold mb-4">Ingredients</h2>
              {recipe.ingredients?.map((ingredient, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-gray-600">
                    {getAdjustedAmount(ingredient)} {ingredient.unit}
                  </span>
                </div>
              ))}
              <Button 
                onClick={onAddToShoppingList}
                className="w-full mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
              >
                Add to Shopping List
              </Button>
            </div>
          </TabsContent>

          {/* Instructions Section */}
          <TabsContent value="instructions">
            <div ref={instructionsRef} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Instructions</h2>
              {recipe.instructions.map((instruction, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <p className="flex-1 text-gray-700">{instruction}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTimer({ open: true, step: idx })}
                    >
                      <Timer className="mr-1 h-4 w-4" /> Timer
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {/* go to prev step */}} 
                        disabled={idx === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {/* go to next step */}} 
                        disabled={idx === recipe.instructions.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Nutrition Section */}
          <TabsContent value="nutrition">
            <div ref={nutritionRef} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Nutrition Information</h2>
              {recipe.nutritionalInfo ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-wasfah-bright-teal">
                      {recipe.nutritionalInfo.calories}
                    </div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-wasfah-bright-teal">
                      {recipe.nutritionalInfo.protein}g
                    </div>
                    <div className="text-sm text-gray-600">Protein</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-wasfah-bright-teal">
                      {recipe.nutritionalInfo.carbs}g
                    </div>
                    <div className="text-sm text-gray-600">Carbs</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-wasfah-bright-teal">
                      {recipe.nutritionalInfo.fat}g
                    </div>
                    <div className="text-sm text-gray-600">Fat</div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-600">
                  Nutrition information not available for this recipe.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Cook Now Button */}
        <div className="mt-6">
          <Button 
            onClick={onStartCookingMode}
            className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white py-3"
            size="lg"
          >
            Start Cooking Mode
          </Button>
        </div>
      </div>

      {/* Timer Overlay */}
      {showTimer.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Timer for Step {(showTimer.step || 0) + 1}</h3>
            <p className="text-gray-600 mb-4">Timer functionality coming soon!</p>
            <Button 
              onClick={() => setShowTimer({ open: false })}
              className="w-full"
            >
              Close Timer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
