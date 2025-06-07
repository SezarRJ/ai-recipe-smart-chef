import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRTL } from '@/contexts/RTLContext';
import BasicSearch from '@/components/alcohol/BasicSearch';
import AIDrinkGenerator from '@/components/alcohol/AIDrinkGenerator';
import CommunityFeed from '@/components/alcohol/CommunityFeed';
import Favorites from '@/components/alcohol/Favorites';
import FoodPairing from '@/components/alcohol/FoodPairing';
import CookMode from '@/components/alcohol/CookMode';
import RecipeFilters from '@/components/alcohol/RecipeFilters';
import { GlassWater, Brain, Users, Heart, Menu, Utensils } from 'lucide-react';

const AlcoholRecipeAI = () => {
  const { t, direction } = useRTL();
  const [activeTab, setActiveTab] = useState<string>('ai-generator');

  return (
    <PageContainer
      header={{
        title: t('Alcohol Recipes & AI', 'وصفات الكحول والذكاء الاصطناعي'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Craft Your Perfect Drink', 'اصنع مشروبك المثالي')}
          </h2>
          <p className="text-gray-600">
            {t('Explore existing recipes or let AI create a new one for you.', 'استكشف الوصفات الموجودة أو دع الذكاء الاصطناعي ينشئ وصفة جديدة لك.')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ai-generator">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>{t('AI Generator', 'مولد الذكاء الاصطناعي')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="recipe-filters">
              <div className="flex items-center space-x-2">
                <Menu className="h-5 w-5" />
                <span>{t('Browse Recipes', 'تصفح الوصفات')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="cook-mode">
              <div className="flex items-center space-x-2">
                <Utensils className="h-5 w-5" />
                <span>{t('Cook Mode', 'وضع التحضير')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="community">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{t('Community', 'المجتمع')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>{t('Favorites', 'المفضلة')}</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* AI Generator Tab */}
          <TabsContent value="ai-generator">
            <AIDrinkGenerator />
          </TabsContent>

          {/* Recipe Browsing and Filtering Tab */}
          <TabsContent value="recipe-filters">
            <RecipeFilters />
          </TabsContent>

          {/* Cook Mode Tab */}
          <TabsContent value="cook-mode">
            <CookMode />
          </TabsContent>

          {/* Community Features Tab */}
          <TabsContent value="community">
            <CommunityFeed />
          </TabsContent>

          {/* User Favorites Tab */}
          <TabsContent value="favorites">
            <Favorites />
          </TabsContent>
        </Tabs>
      </div>

      {/* Food Pairing Recommendations Section */}
      <div className="bg-wasfah-light-gray py-6 px-4">
        <h3 className="text-xl font-semibold mb-4 text-wasfah-deep-teal">
          {t('Food Pairing Recommendations', 'توصيات توافق الطعام')}
        </h3>
        <FoodPairing />
      </div>
    </PageContainer>
  );
};

export default AlcoholRecipeAI;
