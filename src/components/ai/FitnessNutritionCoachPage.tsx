// src/pages/ai/FitnessNutritionCoachPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Dumbbell, Utensils } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

const FitnessNutritionCoachPage = () => {
  const { t, direction } = useRTL();
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [currentDiet, setCurrentDiet] = useState('');
  const [coachingPlan, setCoachingPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const mockAICoaching = async (goal: string, diet: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1500)); // 1.5 to 3.5 seconds

    let response = t("Here's a personalized fitness and nutrition plan based on your goals and current diet:\n\n", "إليك خطة لياقة وتغذية مخصصة بناءً على أهدافك ونظامك الغذائي الحالي:\n\n");

    if (goal.toLowerCase().includes('weight loss')) {
      response += t("Goal: Weight Loss\n", "الهدف: فقدان الوزن\n");
      response += t("Diet: Low-Carb, High-Protein\n", "النظام الغذائي: قليل الكربوهيدرات، عالي البروتين\n");
      response += t("Exercise: 30 mins cardio, 3 times a week, plus strength training.\n", "التمرين: 30 دقيقة كارديو، 3 مرات في الأسبوع، بالإضافة إلى تدريب القوة.\n");
      response += t("Sample Meal: Grilled chicken salad with mixed greens and olive oil dressing.\n", "وجبة نموذجية: سلطة دجاج مشوية مع الخضار المشكلة وصلصة زيت الزيتون.\n");
    } else if (goal.toLowerCase().includes('muscle gain')) {
      response += t("Goal: Muscle Gain\n", "الهدف: اكتساب العضلات\n");
      response += t("Diet: High-Calorie, High-Protein\n", "النظام الغذائي: عالي السعرات الحرارية، عالي البروتين\n");
      response += t("Exercise: Heavy weightlifting, 4 times a week.\n", "التمرين: رفع الأثقال الثقيلة، 4 مرات في الأسبوع.\n");
      response += t("Sample Meal: Protein shake with banana and peanut butter, post-workout.\n", "وجبة نموذجية: مخفوق البروتين مع الموز وزبدة الفول السوداني، بعد التمرين.\n");
    } else {
      response += t("Goal: General Fitness\n", "الهدف: اللياقة العامة\n");
      response += t("Diet: Balanced, Whole Foods\n", "النظام الغذائي: متوازن، أطعمة كاملة\n");
      response += t("Exercise: Mix of cardio and strength training, 3 times a week.\n", "التمرين: مزيج من تمارين الكارديو والقوة، 3 مرات في الأسبوع.\n");
      response += t("Sample Meal: Salmon with roasted vegetables.\n", "وجبة نموذجية: سمك السلمون مع الخضار المشوية.\n");
    }

    response += t("\n\n(This is a sample plan. Consult with a professional for personalized advice.)", "\n\n(هذه خطة نموذجية. استشر متخصصًا للحصول على نصيحة مخصصة.)");
    return response;
  };

  const handleGetCoaching = async () => {
    if (!fitnessGoal.trim() || !currentDiet.trim()) {
      toast({
        title: t("Missing Information", "معلومات مفقودة"),
        description: t("Please provide both your fitness goal and current diet.", "الرجاء توفير هدف اللياقة الخاص بك والنظام الغذائي الحالي."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setCoachingPlan(''); // Clear previous results
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate AI processing

    try {
      const result = await mockAICoaching(fitnessGoal, currentDiet);
      setCoachingPlan(result);
      toast({
        title: t("Coaching Plan Generated!", "تم إنشاء خطة التدريب!"),
        description: t("Your personalized fitness and nutrition plan is ready.", "خطة اللياقة والتغذية المخصصة لك جاهزة."),
      });
    } catch (error) {
      console.error('Coaching plan error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("An error occurred while generating your coaching plan.", "حدث خطأ أثناء إنشاء خطة التدريب الخاصة بك."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer header={{ title: t('Fitness & Nutrition Coach', 'مدرب اللياقة والتغذية'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-red-500 to-orange-600 p-6 rounded-lg text-white text-center mb-6">
          <Dumbbell className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Get Personalized Fitness & Nutrition Advice', 'احصل على نصائح مخصصة للياقة والتغذية')}</h1>
          <p className="opacity-90">{t('Achieve your health goals with AI-driven coaching.', 'حقق أهدافك الصحية مع التدريب المدعوم بالذكاء الاصطناعي.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="fitness-goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('What is your primary fitness goal?', 'ما هو هدفك الأساسي للياقة البدنية؟')}
              </label>
              <Textarea
                id="fitness-goal"
                placeholder={t('e.g., "Weight loss", "Muscle gain", "Improve endurance"', 'مثال: "فقدان الوزن"، "اكتساب العضلات"، "تحسين القدرة على التحمل"')}
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                rows={3}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="current-diet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Describe your current diet', 'صف نظامك الغذائي الحالي')}
              </label>
              <Textarea
                id="current-diet"
                placeholder={t('e.g., "Vegetarian", "High protein", "Balanced"', 'مثال: "نباتي"، "عالي البروتين"، "متوازن"')}
                value={currentDiet}
                onChange={(e) => setCurrentDiet(e.target.value)}
                rows={3}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleGetCoaching}
              disabled={isLoading || !fitnessGoal.trim() || !currentDiet.trim()}
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
                  {t('Get Coaching Plan', 'الحصول على خطة تدريب')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {hasSearched && coachingPlan && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Your Personalized Coaching Plan', 'خطة التدريب المخصصة لك')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                {coachingPlan}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default FitnessNutritionCoachPage;
