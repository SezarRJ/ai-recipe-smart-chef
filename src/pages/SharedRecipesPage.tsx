
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Heart, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRTL } from '@/contexts/RTLContext';

const SharedRecipesPage = () => {
  const { t } = useRTL();

  const mockRecipes = [
    {
      id: 1,
      title: t('Chicken Tikka Masala', 'دجاج تيكا ماسالا'),
      author: t('Chef Sarah', 'الشيف سارة'),
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop',
      likes: 124,
      cookTime: 45,
      servings: 4
    },
    {
      id: 2,
      title: t('Mediterranean Pasta', 'باستا البحر المتوسط'),
      author: t('Chef Marco', 'الشيف ماركو'),
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop',
      likes: 89,
      cookTime: 30,
      servings: 6
    }
  ];

  return (
    <PageContainer
      header={{
        title: t('Shared Recipes', 'الوصفات المشتركة'),
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-6">
        <div className="text-center space-y-4">
          <Share2 className="h-12 w-12 mx-auto text-wasfah-deep-teal" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Community Recipes', 'وصفات المجتمع')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Discover amazing recipes shared by our community', 'اكتشف وصفات رائعة يشاركها مجتمعنا')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{t('By', 'بواسطة')} {recipe.author}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-sm">{recipe.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm">{recipe.cookTime} {t('min', 'دقيقة')}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm">{recipe.servings}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  {t('View Recipe', 'عرض الوصفة')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default SharedRecipesPage;
