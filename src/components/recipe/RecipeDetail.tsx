import React, { useState } from 'react';
import { Recipe } from '@/types/index';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, ChefHat, Users, Heart, Share2, PlayCircle, Plus, Eye, Star, Timer, Bookmark } from 'lucide-react';
import { RecipeSocialInteractions } from './RecipeSocialInteractions';
import { ImageGallery } from './ImageGallery';
import { ServingsAdjuster } from './ServingsAdjuster';
import { TimerOverlay } from './TimerOverlay';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

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
  const { t, direction } = useRTL();
  const [isLiked, setIsLiked] = useState(recipe.isFavorite);
  const [isSaved, setIsSaved] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentServings, setCurrentServings] = useState(recipe.servings);
  const [timerOverlay, setTimerOverlay] = useState<{
    isOpen: boolean;
    minutes: number;
    stepDescription?: string;
  }>({ isOpen: false, minutes: 5 });

  // Calculate ingredient multiplier based on servings
  const servingMultiplier = currentServings / recipe.servings;

  const handleToggleFavorite = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? t("Removed from favorites", "تمت الإزالة من المفضلة") : t("Added to favorites", "تمت الإضافة للمفضلة"),
      description: isLiked ? t("Recipe removed from your favorites", "تمت إزالة الوصفة من مفضلتك") : t("Recipe added to your favorites", "تمت إضافة الوصفة لمفضلتك"),
    });
  };

  const handleToggleSaved = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? t("Removed from saved", "تمت الإزالة من المحفوظة") : t("Saved recipe", "تم حفظ الوصفة"),
      description: isSaved ? t("Recipe removed from saved list", "تمت إزالة الوصفة من قائمة المحفوظات") : t("Recipe saved to your collection", "تم حفظ الوصفة في مجموعتك"),
    });
  };

  const handleShare = () => {
    const recipeUrl = `${window.location.origin}/recipes/${recipe.id}`;
    navigator.clipboard.writeText(recipeUrl).then(() => {
      toast({
        title: t("Recipe shared", "تم مشاركة الوصفة"),
        description: t("Recipe link copied to clipboard", "تم نسخ رابط الوصفة"),
      });
    }).catch(() => {
      toast({
        title: t("Share failed", "فشل المشاركة"),
        description: t("Unable to copy link to clipboard", "غير قادر على نسخ الرابط"),
        variant: "destructive",
      });
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

  const openTimer = (minutes: number, stepDescription?: string) => {
    setTimerOverlay({ isOpen: true, minutes, stepDescription });
  };

  const handleLike = (recipeId: string) => {
    handleToggleFavorite();
  };

  const handleComment = (recipeId: string, comment: string) => {
    console.log(`New comment on recipe ${recipeId}: ${comment}`);
    toast({
      title: t("Comment added", "تمت إضافة التعليق"),
      description: t("Your comment has been posted successfully", "تم نشر تعليقك بنجاح"),
    });
  };

  const handleSocialShare = (recipeId: string) => {
    handleShare();
  };

  // Create image gallery - using recipe.image multiple times as placeholder
  const recipeImages = [recipe.image, recipe.image, recipe.image].filter(Boolean);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image Gallery */}
      <div className="relative">
        <ImageGallery images={recipeImages} title={recipe.title} />
        
        {/* Overlaid Action Icons */}
        <div className={`absolute top-6 ${direction === 'rtl' ? 'left-6' : 'right-6'} flex space-x-3 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
          <button
            onClick={handleToggleSaved}
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
          >
            <Bookmark 
              className={`h-6 w-6 text-white ${isSaved ? 'fill-current' : ''}`}
            />
          </button>
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
        
        {/* Overlaid Content */}
        <div className={`absolute bottom-6 ${direction === 'rtl' ? 'right-6 left-6' : 'left-6 right-6'} text-white`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {recipe.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* Stats Bar with Servings Adjuster */}
      <div className="bg-white border-b border-gray-100 py-4 px-6">
        <div className={`flex items-center justify-between max-w-6xl mx-auto ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-6 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
              <Clock className="h-5 w-5 text-wasfah-bright-teal" />
              <span className="font-medium text-gray-700">{(recipe.prepTime || 0) + (recipe.cookTime || 0)} min</span>
            </div>
            <ServingsAdjuster 
              servings={currentServings} 
              onServingsChange={setCurrentServings} 
            />
            <div className={`flex items-center space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
              <ChefHat className="h-5 w-5 text-wasfah-bright-teal" />
              <span className="font-medium text-gray-700">{recipe.difficulty}</span>
            </div>
          </div>
          
          <div className={`flex items-center space-x-4 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <div className={`flex items-center space-x-1 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-700">{recipe.rating}</span>
            </div>
            <div className={`flex items-center space-x-1 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{Math.floor((recipe.rating || 0) * 20)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">{t('Ingredients', 'المكونات')}</TabsTrigger>
            <TabsTrigger value="instructions">{t('Instructions', 'التعليمات')}</TabsTrigger>
            <TabsTrigger value="nutrition">{t('Nutrition', 'التغذية')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="mt-6">
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient) => {
                const isChecked = checkedIngredients.has(ingredient.id);
                const adjustedAmount = Math.round((parseFloat(ingredient.amount || '0') * servingMultiplier) * 100) / 100;
                
                return (
                  <div 
                    key={ingredient.id} 
                    className={`flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      isChecked 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-wasfah-bright-teal/30'
                    } ${direction === 'rtl' ? 'space-x-reverse' : ''}`}
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
                        {adjustedAmount} {ingredient.unit}
                      </span>{' '}
                      {ingredient.name}
                      {!ingredient.inPantry && (
                        <span className="text-wasfah-coral-red font-medium ml-1">
                          ({t('missing', 'مفقود')})
                        </span>
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
              {t('Add Missing to Shopping List', 'أضف المفقود لقائمة التسوق')}
            </Button>
          </TabsContent>

          <TabsContent value="instructions" className="mt-6">
            <div className="space-y-6">
              {recipe.instructions.map((instruction, index) => {
                const isCompleted = completedSteps.has(index);
                return (
                  <div 
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-wasfah-bright-teal/30 hover:shadow-md'
                    }`}
                  >
                    <div className={`flex items-start space-x-4 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                      <button
                        onClick={() => toggleStep(index)}
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : 'bg-wasfah-bright-teal text-white'
                        }`}
                      >
                        {index + 1}
                      </button>
                      <div className="flex-1">
                        <p className={`text-lg leading-relaxed mb-3 ${
                          isCompleted ? 'line-through text-gray-500' : 'text-gray-700'
                        }`}>
                          {instruction}
                        </p>
                        
                        {/* Timer buttons for steps that mention time */}
                        {(instruction.includes('minute') || instruction.includes('دقيقة')) && (
                          <div className={`flex space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openTimer(5, instruction)}
                              className="text-wasfah-bright-teal border-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
                            >
                              <Timer className="h-4 w-4 mr-1" />
                              {t('5 min', '5 دقائق')}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openTimer(10, instruction)}
                              className="text-wasfah-bright-teal border-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
                            >
                              <Timer className="h-4 w-4 mr-1" />
                              {t('10 min', '10 دقائق')}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {t('Nutritional Information', 'المعلومات الغذائية')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-wasfah-deep-teal">
                    {Math.round((recipe.calories || 0) * servingMultiplier)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('Calories', 'سعرات حرارية')}
                  </div>
                </div>
                {recipe.nutritionalInfo && (
                  <>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-wasfah-deep-teal">
                        {Math.round((recipe.nutritionalInfo.protein || 0) * servingMultiplier)}g
                      </div>
                      <div className="text-sm text-gray-600">
                        {t('Protein', 'بروتين')}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-wasfah-deep-teal">
                        {Math.round((recipe.nutritionalInfo.carbs || 0) * servingMultiplier)}g
                      </div>
                      <div className="text-sm text-gray-600">
                        {t('Carbs', 'كربوهيدرات')}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-wasfah-deep-teal">
                        {Math.round((recipe.nutritionalInfo.fat || 0) * servingMultiplier)}g
                      </div>
                      <div className="text-sm text-gray-600">
                        {t('Fat', 'دهون')}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Social Interactions */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <RecipeSocialInteractions
          recipeId={recipe.id}
          commentCount={recipe.ratingCount || 0}
          shares={Math.floor((recipe.rating || 0) * 5)}
          rating={recipe.rating}
          ratingCount={recipe.ratingCount}
          usedCount={Math.floor((recipe.rating || 0) * 20)}
          isLiked={isLiked}
          comments={[]}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleSocialShare}
          className="justify-center"
        />
      </div>

      {/* Cook Now Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden">
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal text-white font-semibold py-4"
          onClick={onStartCookingMode}
        >
          <PlayCircle className="mr-2 h-6 w-6" />
          {t('Cook Now', 'ابدأ الطبخ')}
        </Button>
      </div>

      {/* Desktop Cook Now Button */}
      <div className="hidden lg:block fixed bottom-8 right-8">
        <Button
          size="lg"
          className="bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal text-white font-semibold py-4 px-8 shadow-lg"
          onClick={onStartCookingMode}
        >
          <PlayCircle className="mr-2 h-6 w-6" />
          {t('Cook Now', 'ابدأ الطبخ')}
        </Button>
      </div>

      {/* Timer Overlay */}
      <TimerOverlay
        isOpen={timerOverlay.isOpen}
        onClose={() => setTimerOverlay(prev => ({ ...prev, isOpen: false }))}
        initialMinutes={timerOverlay.minutes}
        stepDescription={timerOverlay.stepDescription}
      />
    </div>
  );
};
