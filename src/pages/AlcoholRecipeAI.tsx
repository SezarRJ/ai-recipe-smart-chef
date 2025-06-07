import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRTL } from '@/contexts/RTLContext';
import BasicSearch from '@/components/alcohol/BasicSearch';
import AIDrinkGenerator from '@/components/alcohol/AIDrinkGenerator';
import { GlassWater, Brain, Filter, Heart, Share2, Clock, Utensils, Wine } from 'lucide-react';

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
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <Filter className="h-5 w-5 text-wasfah-deep-teal" />
                <span className="font-medium text-wasfah-deep-teal">
                  {t('Filter by:', 'تصفية حسب:')}
                </span>
              </div>
              <div className="flex space-x-2">
                <select className="border rounded p-2">
                  <option value="">{t('Mood', 'المزاج')}</option>
                  <option value="relaxing">{t('Relaxing', 'مريح')}</option>
                  <option value="festive">{t('Festive', 'مهرجاني')}</option>
                </select>
                <select className="border rounded p-2">
                  <option value="">{t('Occasion', 'المناسبة')}</option>
                  <option value="party">{t('Party', 'حفل')}</option>
                  <option value="dinner">{t('Dinner', 'عشاء')}</option>
                </select>
                <select className="border rounded p-2">
                  <option value="">{t('Glass Type', 'نوع الزجاج')}</option>
                  <option value="martini">{t('Martini', 'مارتيني')}</option>
                  <option value="highball">{t('Highball', 'هايبول')}</option>
                </select>
              </div>
            </div>
            <BasicSearch />
          </TabsContent>

          <TabsContent value="ai-generator">
            <div className="space-y-4">
              <AIDrinkGenerator />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Heart className="h-5 w-5 text-wasfah-deep-teal" />
                  <span className="font-medium text-wasfah-deep-teal">
                    {t('Save to Favorites', 'حفظ إلى المفضلة')}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Share2 className="h-5 w-5 text-wasfah-deep-teal" />
                  <span className="font-medium text-wasfah-deep-teal">
                    {t('Share Recipe', 'مشاركة الوصفة')}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default AlcoholRecipeAI;
