
// src/pages/ai/DietaryAIAdvisorPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, HeartHandshake, Utensils } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

const DietaryAIAdvisorPage = () => {
  const { t, direction } = useRTL();
  const [userQuery, setUserQuery] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const mockAIAdvice = async (query: string): Promise<string> => {
    // Simulate AI processing time - Fixed setTimeout syntax
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1500)); // 1.5 to 3.5 seconds

    let response = t("Based on your query, here's some dietary advice:\n\n", "بناءً على استفسارك، إليك بعض النصائح الغذائية:\n\n");

    if (query.toLowerCase().includes('diabetes')) {
      response += t("For diabetes management:\n• Focus on low glycemic index foods\n• Limit refined sugars and processed foods\n• Include plenty of fiber-rich vegetables\n• Monitor portion sizes\n• Consider consulting with a registered dietitian", "لإدارة مرض السكري:\n• ركز على الأطعمة ذات المؤشر الجلايسيمي المنخفض\n• قلل من السكريات المكررة والأطعمة المصنعة\n• أدرج الكثير من الخضروات الغنية بالألياف\n• راقب أحجام الحصص\n• فكر في استشارة اختصاصي تغذية مسجل");
    } else if (query.toLowerCase().includes('weight loss')) {
      response += t("For healthy weight loss:\n• Create a moderate calorie deficit\n• Focus on whole, unprocessed foods\n• Include lean proteins in every meal\n• Stay hydrated throughout the day\n• Combine diet with regular exercise", "لفقدان الوزن الصحي:\n• أنشئ عجزًا معتدلًا في السعرات الحرارية\n• ركز على الأطعمة الكاملة غير المصنعة\n• أدرج البروتينات الخالية من الدهون في كل وجبة\n• حافظ على الترطيب طوال اليوم\n• اجمع بين النظام الغذائي والتمارين المنتظمة");
    } else {
      response += t("General dietary advice:\n• Eat a variety of colorful fruits and vegetables\n• Choose whole grains over refined grains\n• Include healthy fats like nuts and olive oil\n• Limit processed and ultra-processed foods\n• Practice mindful eating", "نصائح غذائية عامة:\n• تناول مجموعة متنوعة من الفواكه والخضروات الملونة\n• اختر الحبوب الكاملة بدلاً من الحبوب المكررة\n• أدرج الدهون الصحية مثل المكسرات وزيت الزيتون\n• قلل من الأطعمة المصنعة والمعالجة فائقة التصنيع\n• مارس الأكل الواعي");
    }

    response += t("\n\n(Please consult with a healthcare professional for personalized medical advice.)", "\n\n(يرجى استشارة متخصص في الرعاية الصحية للحصول على نصيحة طبية مخصصة.)");
    return response;
  };

  const handleGetAdvice = async () => {
    if (!userQuery.trim()) {
      toast({
        title: t("Please enter your question", "الرجاء إدخال سؤالك"),
        description: t("Please provide a dietary question or concern.", "الرجاء تقديم سؤال أو مخاوف غذائية."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setAdvice(''); // Clear previous results
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate AI processing

    try {
      const result = await mockAIAdvice(userQuery);
      setAdvice(result);
      toast({
        title: t("Advice Generated!", "تم إنشاء النصيحة!"),
        description: t("Your personalized dietary advice is ready.", "نصيحتك الغذائية المخصصة جاهزة."),
      });
    } catch (error) {
      console.error('Dietary advice error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("An error occurred while generating advice.", "حدث خطأ أثناء إنشاء النصيحة."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer header={{ title: t('Dietary AI Advisor', 'مستشار التغذية بالذكاء الاصطناعي'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-green-500 to-blue-600 p-6 rounded-lg text-white text-center mb-6">
          <HeartHandshake className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Get Personalized Dietary Advice', 'احصل على نصائح غذائية مخصصة')}</h1>
          <p className="opacity-90">{t('Ask about nutrition, dietary restrictions, health conditions, and more.', 'اسأل عن التغذية، القيود الغذائية، الحالات الصحية، وأكثر.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="dietary-question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('What would you like to know about nutrition?', 'ما الذي تريد معرفته عن التغذية؟')}
              </label>
              <Textarea
                id="dietary-question"
                placeholder={t('e.g., "How can I manage diabetes through diet?", "What foods are good for weight loss?"', 'مثال: "كيف يمكنني إدارة مرض السكري من خلال النظام الغذائي؟"، "ما هي الأطعمة الجيدة لفقدان الوزن؟"')}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                rows={4}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleGetAdvice}
              disabled={isLoading || !userQuery.trim()}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Getting Advice...', 'جاري الحصول على النصيحة...')}
                </>
              ) : (
                <>
                  <Sparkles className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Get Dietary Advice', 'الحصول على نصيحة غذائية')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {hasSearched && advice && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Dietary Advice', 'نصيحة غذائية')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                {advice}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default DietaryAIAdvisorPage;
