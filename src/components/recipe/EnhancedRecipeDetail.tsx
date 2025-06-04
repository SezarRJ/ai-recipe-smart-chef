
import React, { useState, useRef } from 'react';
import { Recipe } from '@/types/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Heart, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Timer, 
  ShoppingCart,
  Play,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Clock,
  Users,
  ChefHat,
  Star,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

interface EnhancedRecipeDetailProps {
  recipe: Recipe;
  onStartCookingMode: () => void;
  onClose?: () => void;
}

export const EnhancedRecipeDetail: React.FC<EnhancedRecipeDetailProps> = ({
  recipe,
  onStartCookingMode,
  onClose
}) => {
  const { toast } = useToast();
  const { t, direction } = useRTL();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [servings, setServings] = useState(recipe.servings);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showNutritionDetails, setShowNutritionDetails] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock image gallery - in real app this would come from recipe.images
  const images = [recipe.image, recipe.image, recipe.image];

  const servingMultiplier = servings / recipe.servings;

  const handleImageNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const adjustServings = (change: number) => {
    const newServings = Math.max(1, servings + change);
    setServings(newServings);
    toast({
      title: t('Servings Updated', 'تم تحديث الحصص'),
      description: t(`Recipe adjusted for ${newServings} servings`, `تم تعديل الوصفة لـ ${newServings} حصة`),
    });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? t('Removed from Saved', 'تم الإزالة من المحفوظات') : t('Recipe Saved', 'تم حفظ الوصفة'),
      description: isSaved ? t('Recipe removed from your saved list', 'تم إزالة الوصفة من قائمتك المحفوظة') : t('Recipe added to your saved list', 'تم إضافة الوصفة إلى قائمتك المحفوظة'),
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? t('Unliked', 'تم إلغاء الإعجاب') : t('Liked', 'تم الإعجاب'),
      description: t('Thank you for your feedback!', 'شكراً لك على تقييمك!'),
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
        title: t('Link Copied', 'تم نسخ الرابط'),
        description: t('Recipe link copied to clipboard', 'تم نسخ رابط الوصفة إلى الحافظة'),
      });
    }
  };

  const handleAddToShoppingList = () => {
    toast({
      title: t('Added to Shopping List', 'تم الإضافة إلى قائمة التسوق'),
      description: t('Missing ingredients added to your shopping list', 'تم إضافة المكونات المفقودة إلى قائمة التسوق'),
    });
  };

  const handleStepTimer = (stepIndex: number) => {
    setShowTimer(true);
    setTimerSeconds(300); // 5 minutes default
    toast({
      title: t('Timer Started', 'تم بدء المؤقت'),
      description: t(`Timer set for step ${stepIndex + 1}`, `تم ضبط المؤقت للخطوة ${stepIndex + 1}`),
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAdjustedAmount = (amount: number) => {
    return Math.round(amount * servingMultiplier * 10) / 10;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image Gallery */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${recipe.title} - ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => handleImageNavigation('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleImageNavigation('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Header Actions */}
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          {onClose && (
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
            >
              <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
            >
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Recipe Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h1 className="text-4xl font-bold text-white mb-2">{recipe.title}</h1>
          <p className="text-white/90 text-lg">{recipe.description}</p>
        </div>
      </div>

      {/* Quick Stats & Actions */}
      <div className="bg-white border-b border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-wasfah-bright-teal" />
              <span className="font-medium">{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-wasfah-bright-teal" />
              <span className="font-medium">{servings} servings</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-wasfah-bright-teal" />
              <span className="font-medium">{recipe.difficulty}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">{recipe.rating}</span>
            </div>
          </div>
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{t('Like', 'إعجاب')}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">{t('Comment', 'تعليق')}</span>
            </button>
          </div>

          {/* Servings Adjuster */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
            <button
              onClick={() => adjustServings(-1)}
              disabled={servings <= 1}
              className="p-1 rounded-full bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-medium min-w-[3rem] text-center">
              {servings} {t('servings', 'حصة')}
            </span>
            <button
              onClick={() => adjustServings(1)}
              className="p-1 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-6xl mx-auto px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="ingredients">{t('Ingredients', 'المكونات')}</TabsTrigger>
            <TabsTrigger value="instructions">{t('Instructions', 'التعليمات')}</TabsTrigger>
            <TabsTrigger value="nutrition">{t('Nutrition', 'التغذية')}</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-4">
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="text-wasfah-bright-teal font-semibold">
                      {getAdjustedAmount(ingredient.amount)} {ingredient.unit}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            
            <Button
              onClick={handleAddToShoppingList}
              variant="outline"
              className="w-full mt-4"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t('Add Missing to Shopping List', 'إضافة المفقود إلى قائمة التسوق')}
            </Button>
          </TabsContent>

          <TabsContent value="instructions" className="space-y-4">
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg leading-relaxed mb-3">{instruction}</p>
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => handleStepTimer(index)}
                          variant="outline"
                          size="sm"
                        >
                          <Timer className="mr-2 h-4 w-4" />
                          {t('Set Timer', 'ضبط المؤقت')}
                        </Button>
                        <Button
                          onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                          variant="ghost"
                          size="sm"
                        >
                          {t('View Details', 'عرض التفاصيل')}
                        </Button>
                      </div>
                      
                      {expandedStep === index && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            {t('Detailed cooking tips and techniques for this step would appear here in the premium version.', 'ستظهر هنا نصائح وتقنيات الطبخ التفصيلية لهذه الخطوة في النسخة المميزة.')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-wasfah-bright-teal/10 rounded-lg">
                  <div className="text-3xl font-bold text-wasfah-bright-teal">{Math.round(recipe.calories * servingMultiplier)}</div>
                  <div className="text-sm text-gray-600">{t('Calories', 'سعرة حرارية')}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">12g</div>
                  <div className="text-sm text-gray-600">{t('Protein', 'بروتين')}</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">28g</div>
                  <div className="text-sm text-gray-600">{t('Carbs', 'كربوهيدرات')}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">18g</div>
                  <div className="text-sm text-gray-600">{t('Fat', 'دهون')}</div>
                </div>
              </div>
              
              <Button
                onClick={() => setShowNutritionDetails(!showNutritionDetails)}
                variant="outline"
                className="w-full"
              >
                {showNutritionDetails ? t('Hide Details', 'إخفاء التفاصيل') : t('Show Detailed Breakdown', 'عرض التفصيل الكامل')}
              </Button>
              
              {showNutritionDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {t('Detailed nutritional breakdown including vitamins, minerals, and other nutrients would appear here in the premium version.', 'سيظهر هنا التحليل الغذائي التفصيلي بما في ذلك الفيتامينات والمعادن والعناصر الغذائية الأخرى في النسخة المميزة.')}
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cook Now Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <Button
          onClick={onStartCookingMode}
          className="w-full bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal text-white font-semibold py-4"
          size="lg"
        >
          <Play className="mr-2 h-6 w-6" />
          {t('Cook Now', 'ابدأ الطبخ الآن')}
        </Button>
      </div>

      {/* Timer Overlay */}
      {showTimer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 m-4 max-w-sm w-full">
            <div className="text-center">
              <div className="text-4xl font-bold mb-4">{formatTime(timerSeconds)}</div>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => setShowTimer(false)} variant="outline">
                  {t('Cancel', 'إلغاء')}
                </Button>
                <Button onClick={() => setShowTimer(false)}>
                  {t('Start', 'بدء')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
