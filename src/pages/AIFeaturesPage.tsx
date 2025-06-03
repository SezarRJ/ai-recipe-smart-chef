
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AIRecipeDiscovery } from '@/components/ai/AIRecipeDiscovery';
import AIChefAssistant from '@/components/ai/AIChefAssistant';
import { VoiceRecipeAssistant } from '@/components/ai/VoiceRecipeAssistant';
import { SmartRecipeAdaptation } from '@/components/ai/SmartRecipeAdaptation';
import { MoodBasedRecipes } from '@/components/ai/MoodBasedRecipes';
import { MicronutrientTracker } from '@/components/ai/MicronutrientTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRTL } from '@/contexts/RTLContext';
import { 
  Sparkles, 
  MessageCircle, 
  Mic, 
  Settings, 
  Heart, 
  BarChart3 
} from 'lucide-react';

export default function AIFeaturesPage() {
  const { t } = useRTL();

  const mockRecipe = {
    title: t("Chicken Stir Fry", "دجاج مقلي"),
    instructions: [
      t("Heat oil in a large wok or skillet", "سخن الزيت في مقلاة كبيرة"),
      t("Add chicken and cook until golden", "أضف الدجاج واطبخه حتى يصبح ذهبياً"),
      t("Add vegetables and stir fry for 3-4 minutes", "أضف الخضار وحركها لمدة 3-4 دقائق"),
      t("Season with soy sauce and serve", "تبل بصلصة الصويا وقدمه")
    ]
  };

  const mockAdaptationRecipe = {
    id: "recipe-1",
    title: t("Chicken Stir Fry", "دجاج مقلي"),
    ingredients: [
      { id: "1", name: "Chicken breast", amount: 500, unit: "g" },
      { id: "2", name: "Soy sauce", amount: 3, unit: "tbsp" },
      { id: "3", name: "Bell peppers", amount: 2, unit: "pieces" },
      { id: "4", name: "Onion", amount: 1, unit: "piece" },
      { id: "5", name: "Garlic", amount: 3, unit: "cloves" },
      { id: "6", name: "Vegetable oil", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      t("Heat oil in a large wok or skillet", "سخن الزيت في مقلاة كبيرة"),
      t("Add chicken and cook until golden", "أضف الدجاج واطبخه حتى يصبح ذهبياً"),
      t("Add vegetables and stir fry for 3-4 minutes", "أضف الخضار وحركها لمدة 3-4 دقائق"),
      t("Season with soy sauce and serve", "تبل بصلصة الصويا وقدمه")
    ],
    difficulty: "Medium" as const,
    servings: 4,
    prep_time: 15,
    cook_time: 20
  };

  return (
    <PageContainer 
      header={{ 
        title: t('AI Features', 'ميزات الذكاء الاصطناعي'), 
        showBackButton: true 
      }}
    >
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            {t('AI-Powered Cooking Features', 'ميزات الطبخ بالذكاء الاصطناعي')}
          </h1>
          <p className="opacity-90">
            {t('Experience the future of cooking with our advanced AI features', 'اختبر مستقبل الطبخ مع ميزات الذكاء الاصطناعي المتقدمة')}
          </p>
        </div>

        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="discovery" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Discovery', 'الاكتشاف')}</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Assistant', 'المساعد')}</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-1">
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Voice', 'الصوت')}</span>
            </TabsTrigger>
            <TabsTrigger value="adaptation" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Adapt', 'التكيف')}</span>
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Mood', 'المزاج')}</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Nutrition', 'التغذية')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discovery" className="mt-6">
            <AIRecipeDiscovery />
          </TabsContent>

          <TabsContent value="assistant" className="mt-6">
            <AIChefAssistant />
          </TabsContent>

          <TabsContent value="voice" className="mt-6">
            <VoiceRecipeAssistant 
              recipe={mockRecipe}
              onStepChange={(step) => console.log('Step changed to:', step)}
            />
          </TabsContent>

          <TabsContent value="adaptation" className="mt-6">
            <SmartRecipeAdaptation 
              recipe={mockAdaptationRecipe}
              pantryItems={["Chicken breast", "Onion", "Garlic", "Vegetable oil"]}
              dietaryRestrictions={["Gluten-free"]}
            />
          </TabsContent>

          <TabsContent value="mood" className="mt-6">
            <MoodBasedRecipes />
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <MicronutrientTracker />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
