
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockRecipes } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Heart, Share, ArrowLeft, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CookingMode } from '@/components/recipe/CookingMode';
import { RecipeDetail } from '@/components/recipe/RecipeDetail';
import { useRTL } from '@/contexts/RTLContext';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, direction } = useRTL();
  const [isCookingMode, setIsCookingMode] = useState(false);
  
  const recipe = mockRecipes.find(r => r.id === id);
  
  if (!recipe) {
    return (
      <PageContainer
        header={{
          title: t('Recipe Not Found', 'الوصفة غير موجودة'),
          showBackButton: true,
        }}
      >
        <div className={`min-h-screen flex items-center justify-center px-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("Oops! Recipe not found", "عفواً! الوصفة غير موجودة")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t("The recipe you're looking for doesn't exist or has been removed.", "الوصفة التي تبحث عنها غير موجودة أو تم حذفها.")}
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
                onClick={() => navigate('/recipes')}
              >
                {t('Browse All Recipes', 'تصفح جميع الوصفات')}
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => navigate('/home')}
              >
                {t('Back to Home', 'العودة للرئيسية')}
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  const handleAddToShoppingList = () => {
    toast({
      title: t("Added to Shopping List", "تمت الإضافة إلى قائمة التسوق"),
      description: t("Missing ingredients have been added to your shopping list.", "تمت إضافة المكونات المفقودة إلى قائمة التسوق الخاصة بك."),
    });
  };

  const handleStartCookingMode = () => {
    setIsCookingMode(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isCookingMode) {
    return <CookingMode recipe={recipe} onClose={() => setIsCookingMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header with Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className={`flex items-center justify-between px-4 py-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}
          >
            <ArrowLeft size={20} className={direction === 'rtl' ? 'rotate-180' : ''} />
            <span>{t('Back', 'رجوع')}</span>
          </Button>
          
          <div className={`flex space-x-2 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
              <Heart 
                size={20} 
                className={recipe.isFavorite ? 'fill-wasfah-coral-red text-wasfah-coral-red' : ''}
              />
            </Button>
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
              <Share size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="pt-16">
        <RecipeDetail 
          recipe={recipe}
          onAddToShoppingList={handleAddToShoppingList}
          onStartCookingMode={handleStartCookingMode}
        />
      </div>
    </div>
  );
}
