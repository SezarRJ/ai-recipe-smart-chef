
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockRecipes } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Heart, Share, ArrowLeft } from 'lucide-react';
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
        <div className={`container px-4 py-8 text-center ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <p>{t("The recipe you're looking for doesn't exist.", "الوصفة التي تبحث عنها غير موجودة.")}</p>
          <Button 
            className="mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
            onClick={() => navigate('/recipes')}
          >
            {t('Browse Recipes', 'تصفح الوصفات')}
          </Button>
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
