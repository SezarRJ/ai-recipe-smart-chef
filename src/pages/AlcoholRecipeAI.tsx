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
import { GlassWater, Brain, Users, Heart, Menu, Utensils, Wine, Search, Filter } from 'lucide-react';

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
          <TabsList className="grid w-full grid-cols-5 gap-2">
            <TabsTrigger value="ai-generator" className="flex flex-col items-center">
              <Brain className="h-5 w-5 mb-1" />
              <span>{t('AI Generator', 'مولد الذكاء الاصطناعي')}</span>
            </TabsTrigger>
            <TabsTrigger value="recipe-filters" className="flex flex-col items-center">
              <Filter className="h-5 w-5 mb-1" />
              <span>{t('Browse', 'تصفح')}</span>
            </TabsTrigger>
            <TabsTrigger value="cook-mode" className="flex flex-col items-center">
              <Utensils className="h-5 w-5 mb-1" />
              <span>{t('Cook Mode', 'وضع التحضير')}</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex flex-col items-center">
              <Users className="h-5 w-5 mb-1" />
              <span>{t('Community', 'المجتمع')}</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex flex-col items-center">
              <Heart className="h-5 w-5 mb-1" />
              <span>{t('Favorites', 'المفضلة')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-generator">
            <AIDrinkGenerator />
          </TabsContent>

          <TabsContent value="recipe-filters">
            <RecipeFilters />
          </TabsContent>

          <TabsContent value="cook-mode">
            <CookMode />
          </TabsContent>

          <TabsContent value="community">
            <CommunityFeed />
          </TabsContent>

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
