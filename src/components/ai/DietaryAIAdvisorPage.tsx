// src/pages/ai/DietaryAIAdvisorPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Loader2, MessageCircle } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

const DietaryAIAdvisorPage = () => {
  const { t, direction } = useRTL();
  const [dietType, setDietType] = useState('');
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockAIDietaryAdvisor = async (diet: string, userQuestion: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(Math.random() * 1500 + 1000, resolve)); // 1 to 2.5 seconds

    const lowerQuestion = userQuestion.toLowerCase();
    let baseAdvice = t("Here is some general advice regarding your dietary inquiry for the ", "إليك بعض النصائح العامة بخصوص استفسارك الغذائي لـ ");

    switch (diet) {
      case 'keto':
        baseAdvice += t("Ketogenic diet:", "حمية الكيتو:");
        if (lowerQuestion.includes('carbs') || lowerQuestion.includes('net carbs')) {
          return baseAdvice + t(" Focus on keeping net carbs (total carbs - fiber) very low, typically below 20-50g per day. Prioritize non-starchy vegetables, healthy fats, and protein.", "ركز على الحفاظ على الكربوهيدرات الصافية (إجمالي الكربوهيدرات - الألياف) منخفضة جدًا، وعادة ما تكون أقل من 20-50 جرامًا يوميًا. أعط الأولوية للخضروات غير النشوية والدهون الصحية والبروتين.");
        }
        return baseAdvice + t(" The ketogenic diet emphasizes high fat, adequate protein, and very low carbohydrates. It aims to shift your body's metabolism towards burning fat for fuel.", "تركز حمية الكيتو على الدهون العالية، البروتين الكافي، والكربوهيدرات المنخفضة جدًا. تهدف إلى تحويل عملية الأيض في جسمك نحو حرق الدهون للحصول على الوقود.");
      case 'vegan':
        baseAdvice += t("Vegan diet:", "النظام الغذائي النباتي الصرف:");
        if (lowerQuestion.includes('protein')) {
          return baseAdvice + t(" Ensure adequate protein intake from sources like lentils, beans, tofu, tempeh, nuts, seeds, and plant-based protein powders.", "تأكد من الحصول على كمية كافية من البروتين من مصادر مثل العدس والفول والتوفو والتمبيه والمكسرات والبذور ومساحيق البروتين النباتية.");
        }
        return baseAdvice + t(" A vegan diet excludes all animal products. Focus on a wide variety of fruits, vegetables, grains, legumes, nuts, and seeds to ensure all nutrient needs are met.", "النظام الغذائي النباتي الصرف يستثني جميع المنتجات الحيوانية. ركز على مجموعة واسعة من الفواكه والخضروات والحبوب والبقوليات والمكسرات والبذور لضمان تلبية جميع الاحتياجات الغذائية.");
      case 'gluten-free':
        baseAdvice += t("Gluten-Free diet:", "حمية خالية من الغلوتين:");
        if (lowerQuestion.includes('cross-contamination')) {
          return baseAdvice + t(" Be vigilant about cross-contamination in kitchens and restaurants. Use separate cutting boards, toasters, and utensils for gluten-free cooking.", "كن حذرًا بشأن التلوث المتبادل في المطابخ والمطاعم. استخدم ألواح تقطيع منفصلة ومحمصات وأدوات مطبخ للطهي الخالي من الغلوتين.");
        }
        return baseAdvice + t(" This diet avoids gluten, a protein found in wheat, barley, and rye. Look for naturally gluten-free foods and certified gluten-free products.", "هذه الحمية تتجنب الغلوتين، وهو بروتين موجود في القمح والشعير والجاودار. ابحث عن الأطعمة الخالية من الغلوتين بشكل طبيعي والمنتجات المعتمدة الخالية من الغلوتين.");
      default:
        return t("Please select a specific diet type for more tailored advice. Then, ask your question.", "الرجاء تحديد نوع حمية معين للحصول على نصيحة أكثر تفصيلاً. ثم، اطرح سؤالك.");
    }
  };

  const handleGetAdvice = async () => {
    if (!dietType || !question.trim()) {
      toast({
        title: t("Missing Information", "معلومات مفقودة"),
        description: t("Please select a diet type and ask your question.", "الرجاء تحديد نوع حمية وطرح سؤالك."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAdvice(''); // Clear previous results

    try {
      const result = await mockAIDietaryAdvisor(dietType, question);
      setAdvice(result);
      toast({
        title: t("Advice Generated!", "تم إنشاء النصيحة!"),
        description: t("Your AI-driven dietary advice is ready.", "نصيحتك الغذائية المدعومة بالذكاء الاصطناعي جاهزة."),
      });
    } catch (error) {
      console.error('Dietary advisor error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("An error occurred while getting dietary advice.", "حدث خطأ أثناء الحصول على النصيحة الغذائية."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dietOptions = [
    { value: 'keto', label: t('Ketogenic', 'كيتو') },
    { value: 'vegan', label: t('Vegan', 'نباتي صرف') },
    { value: 'gluten-free', label: t('Gluten-Free', 'خالي من الغلوتين') },
    { value: 'paleo', label: t('Paleo', 'باليو') },
    { value: 'vegetarian', label: t('Vegetarian', 'نباتي') },
    { value: 'mediterranean', label: t('Mediterranean', 'متوسطي') },
  ];

  return (
    <PageContainer header={{ title: t('Dietary AI Advisor', 'مستشار الحمية بالذكاء الاصطناعي'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-lg text-white text-center mb-6">
          <Leaf className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Personalized Dietary Guidance', 'إرشاد غذائي مخصص')}</h1>
          <p className="opacity-90">{t('Get expert advice on specific diets and nutritional concerns.', 'احصل على نصائح خبراء حول الحميات الغذائية المحددة والمخاوف الغذائية.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="diet-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Select Diet Type', 'اختر نوع الحمية')}
              </label>
              <Select value={dietType} onValueChange={setDietType} disabled={isLoading}>
                <SelectTrigger id="diet-type" className="bg-white dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder={t('Choose a diet', 'اختر حمية')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800">
                  {dietOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Your Question', 'سؤالك')}
              </label>
              <Textarea
                id="question"
                placeholder={t('e.g., "What are good keto-friendly snacks?", "How to get enough iron on a vegan diet?"', 'مثال: "ما هي الوجبات الخفيفة المناسبة للكيتو؟", "كيف أحصل على ما يكفي من الحديد في حمية نباتية؟"')}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={5}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleGetAdvice}
              disabled={isLoading || !dietType || !question.trim()}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Getting Advice...', 'جاري الحصول على النصيحة...')}
                </>
              ) : (
                <>
                  <MessageCircle className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Get Advice', 'احصل على نصيحة')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {advice && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Leaf className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('AI Advisor Says', 'مستشار الذكاء الاصطناعي يقول')}
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
