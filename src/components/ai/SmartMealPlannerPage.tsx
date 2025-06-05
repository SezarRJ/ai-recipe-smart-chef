// src/pages/ai/SmartMealPlannerPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Calendar, Utensils } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const SmartMealPlannerPage = () => {
  const { t, direction } = useRTL();
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [calorieGoals, setCalorieGoals] = useState('');
  const [mealPlan, setMealPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const mockAIMealPlan = async (preferences: string, calories: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1500)); // 1.5 to 3.5 seconds

    let response = t("Here is your personalized meal plan:\n\n", "إليك خطة وجباتك المخصصة:\n\n");

    if (preferences.toLowerCase().includes('vegetarian')) {
      response += t("Monday:\nBreakfast: Oatmeal with berries and nuts\nLunch: Quinoa salad with chickpeas and vegetables\nDinner: Lentil soup with whole grain bread\n\n", "الاثنين:\nالإفطار: دقيق الشوفان مع التوت والمكسرات\nالغداء: سلطة الكينوا مع الحمص والخضروات\nالعشاء: حساء العدس مع خبز الحبوب الكاملة\n\n");
    } else {
      response += t("Monday:\nBreakfast: Scrambled eggs with whole wheat toast\nLunch: Chicken salad sandwich on whole grain bread\nDinner: Baked salmon with roasted vegetables\n\n", "الاثنين:\nالإفطار: بيض مخفوق مع خبز القمح الكامل المحمص\nالغداء: ساندويتش سلطة الدجاج على خبز الحبوب الكاملة\nالعشاء: سمك السلمون المخبوز مع الخضار المشوية\n\n");
    }

    response += t("This meal plan is designed to meet your calorie goals and dietary preferences. Adjust portions as needed.", "تم تصميم خطة الوجبات هذه لتلبية أهداف السعرات الحرارية والتفضيلات الغذائية الخاصة بك. عدّل الحصص حسب الحاجة.");
    return response;
  };

  const handleGenerateMealPlan = async () => {
    if (!dietaryPreferences.trim() || !calorieGoals.trim()) {
      toast({
        title: t("Missing Information", "معلومات مفقودة"),
        description: t("Please provide both your dietary preferences and calorie goals.", "الرجاء تقديم تفضيلاتك الغذائية وأهداف السعرات الحرارية."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasGenerated(true);
    setMealPlan(''); // Clear previous results
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate AI processing

    try {
      const result = await mockAIMealPlan(dietaryPreferences, calorieGoals);
      setMealPlan(result);
      toast({
        title: t("Meal Plan Generated!", "تم إنشاء خطة الوجبات!"),
        description: t("Your personalized meal plan has been generated.", "تم إنشاء خطة وجباتك المخصصة."),
      });
    } catch (error) {
      console.error('Meal plan generation error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("An error occurred during meal plan generation.", "حدث خطأ أثناء إنشاء خطة الوجبات."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer header={{ title: t('Smart Meal Planner', 'مخطط الوجبات الذكي'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-lg text-white text-center mb-6">
          <Calendar className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Generate Your Weekly Meal Plan', 'أنشئ خطة وجباتك الأسبوعية')}</h1>
          <p className="opacity-90">{t('Get a personalized meal plan based on your dietary needs and calorie goals.', 'احصل على خطة وجبات مخصصة بناءً على احتياجاتك الغذائية وأهداف السعرات الحرارية.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="dietary-preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Dietary Preferences', 'التفضيلات الغذائية')}
              </label>
              <Input
                id="dietary-preferences"
                placeholder={t('e.g., Vegetarian, Gluten-Free, Low Carb', 'مثال: نباتي، خالي من الغلوتين، قليل الكربوهيدرات')}
                value={dietaryPreferences}
                onChange={(e) => setDietaryPreferences(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="calorie-goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Calorie Goals', 'أهداف السعرات الحرارية')}
              </label>
              <Input
                id="calorie-goals"
                placeholder={t('e.g., 2000 calories per day', 'مثال: 2000 سعرة حرارية في اليوم')}
                value={calorieGoals}
                onChange={(e) => setCalorieGoals(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleGenerateMealPlan}
              disabled={isLoading || !dietaryPreferences.trim() || !calorieGoals.trim()}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Generating...', 'جاري الإنشاء...')}
                </>
              ) : (
                <>
                  <Sparkles className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Generate Meal Plan', 'إنشاء خطة وجبات')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {hasGenerated && mealPlan && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Your Meal Plan', 'خطة وجباتك')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                {mealPlan}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SmartMealPlannerPage;
