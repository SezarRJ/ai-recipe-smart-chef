// pages/alcohol-recipes-ai.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRTL } from '@/contexts/RTLContext';
import BasicSearch from '@/components/alcohol/BasicSearch'; // Import new BasicSearch component
import AIDrinkGenerator from '@/components/alcohol/AIDrinkGenerator'; // Import new AIDrinkGenerator component
import { GlassWater, Brain } from 'lucide-react'; // Example icons

const AlcoholRecipeAI = () => {
  const { t, direction } = useRTL();
  const [activeTab, setActiveTab] = useState<string>('basic-search');

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic-search">
              <div className="flex items-center space-x-2">
                <GlassWater className="h-5 w-5" />
                <span>{t('Basic Search', 'بحث أساسي')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="ai-generator">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>{t('AI Recipe Generator', 'مولد وصفات الذكاء الاصطناعي')}</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic-search">
            <BasicSearch />
          </TabsContent>

          <TabsContent value="ai-generator">
            <AIDrinkGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default AlcoholRecipeAI;
