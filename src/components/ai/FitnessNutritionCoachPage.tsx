// src/pages/ai/FitnessNutritionCoachPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dumbbell, Loader2, Sparkles, User, Target } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const FitnessNutritionCoachPage = () => {
  const { t, direction } = useRTL();
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [currentWeight, setCurrentWeight] = useState<number | ''>('');
  const [targetWeight, setTargetWeight] = useState<number | ''>('');
  const [question, setQuestion] = useState('');
  const [coachingAdvice, setCoachingAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockAIFitnessCoach = async (options: { goal: string, currentW: number, targetW: number, question: string }): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(Math.random() * 2000 + 1500, resolve)); // 1.5 to 3.5 seconds

    const lowerQuestion = options.question.toLowerCase();
    let baseAdvice = t("As your AI Fitness & Nutrition Coach, here's some guidance based on your goals: ", "بصفتي مدربك في اللياقة البدنية والتغذية بالذكاء الاصطناعي، إليك بعض الإرشادات بناءً على أهدافك: ");

    if (options.goal === 'lose_weight') {
      baseAdvice += t("For weight loss, a calorie deficit is key. Focus on lean proteins, lots of vegetables, and complex carbohydrates. Aim for consistency and moderate exercise.", "لفقدان الوزن، يعد عجز السعرات الحرارية أمرًا أساسيًا. ركز على البروتينات الخالية من الدهون والكثير من الخضروات والكربوهيدرات المعقدة. اهدف إلى الاتساق وممارسة التمارين المعتدلة.");
      if (options.currentW && options.targetW && options.currentW > options.targetW) {
        const deficit = ((options.currentW - options.targetW) * 7700 / 30).toFixed(0); // Rough estimate for 1 month
        baseAdvice += t(` You'll need to maintain a consistent calorie deficit of around ${deficit} kcal per day to reach your target weight.`, ` ستحتاج إلى الحفاظ على عجز ثابت في السعرات الحرارية يبلغ حوالي ${deficit} سعرة حرارية يوميًا للوصول إلى وزنك المستهدف.`);
      }
    } else if (options.goal === 'gain_muscle') {
      baseAdvice += t("For muscle gain, ensure a slight calorie surplus and adequate protein intake (around 1.6-2.2g per kg of body weight). Combine with strength training.", "لكسب العضلات، تأكد من وجود فائض طفيف في السعرات الحرارية وتناول كمية كافية من البروتين (حوالي 1.6-2.2 جرام لكل كجم من وزن الجسم). ادمج ذلك مع تدريب القوة.");
    } else if (options.goal === 'maintain') {
      baseAdvice += t("To maintain weight, focus on balanced nutrition and consistent activity. Listen to your body's hunger and fullness cues.", "للحفاظ على الوزن، ركز على التغذية المتوازنة والنشاط المستمر. استمع إلى إشارات الجوع والشبع في جسمك.");
    }

    if (lowerQuestion.includes('macros') || lowerQuestion.includes('macronutrients')) {
      return baseAdvice + t(" General macro ratios for balanced eating are often around 45-65% carbs, 10-35% protein, and 20-35% fat. These can be adjusted based on your specific diet or goals.", "تتراوح نسب المغذيات الكبرى الشائعة للتغذية المتوازنة غالبًا بين 45-65% كربوهيدرات، 10-35% بروتين، و20-35% دهون. يمكن تعديل هذه النسب بناءً على نظامك الغذائي أو أهدافك المحددة.");
    } else if (lowerQuestion.includes('best exercises')) {
      return baseAdvice + t(" The best exercises depend on your goal. For muscle gain, compound lifts like squats, deadlifts, and bench presses are excellent. For weight loss, a mix of cardio and strength training is effective.", "تعتمد أفضل التمارين على هدفك. لكسب العضلات، تعتبر التمارين المركبة مثل القرفصاء والرفعة المميتة والضغط على البنش ممتازة. لفقدان الوزن، مزيج من تمارين الكارديو وتدريبات القوة فعال.");
    }

    return baseAdvice + t(" Feel free to ask more specific questions about your fitness journey!", "لا تتردد في طرح أسئلة أكثر تحديدًا حول رحلتك في اللياقة البدنية!");
  };

  const handleGetCoaching = async () => {
    if (!fitnessGoal || question === '') {
      toast({
        title: t("Missing Information", "معلومات مفقودة"),
        description: t("Please select a fitness goal and ask your question.", "الرجاء تحديد هدف لياقة بدنية وطرح سؤالك."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCoachingAdvice(''); // Clear previous results

    try {
      const result = await mockAIFitnessCoach({
        goal: fitnessGoal,
        currentW: Number(currentWeight),
        targetW: Number(targetWeight),
        question: question,
      });
      setCoachingAdvice(result);
      toast({
        title: t("Coaching Advice Generated!", "تم إنشاء نصيحة تدريب!"),
        description: t("Your AI fitness and nutrition advice is ready.", "نصيحتك في اللياقة البدنية والتغذية بالذكاء الاصطناعي جاهزة."),
      });
    } catch (error) {
      console.error('Fitness coach error:', error);
      toast({
        title: t("Error", "خطأ"),
        description: t("An error occurred while getting coaching advice.", "حدث خطأ أثناء الحصول على نصيحة التدريب."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goalOptions = [
    { value: 'lose_weight', label: t('Lose Weight', 'فقدان الوزن') },
    { value: 'gain_muscle', label: t('Gain Muscle', 'بناء العضلات') },
    { value: 'maintain', label: t('Maintain Weight', 'الحفاظ على الوزن') },
    { value: 'improve_health', label: t('Improve General Health', 'تحسين الصحة العامة') },
  ];

  return (
    <PageContainer header={{ title: t('Fitness & Nutrition Coach', 'مدرب اللياقة والتغذية'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-lg text-white text-center mb-6">
          <Dumbbell className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Your Personal AI Health Coach', 'مدربك الصحي الشخصي بالذكاء الاصطناعي')}</h1>
          <p className="opacity-90">{t('Get tailored guidance for your fitness goals, calorie tracking, and macronutrient intake.', 'احصل على إرشادات مخصصة لأهداف لياقتك، تتبع السعرات الحرارية، وتناول المغذيات الكبرى.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="fitness-goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Your Primary Fitness Goal', 'هدف لياقتك الأساسي')}
              </label>
              <Select value={fitnessGoal} onValueChange={setFitnessGoal} disabled={isLoading}>
                <SelectTrigger id="fitness-goal" className="bg-white dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder={t('Select a goal', 'اختر هدفاً')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800">
                  {goalOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="current-weight" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('Current Weight (kg)', 'الوزن الحالي (كجم)')}
                </label>
                <Input
                  id="current-weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="bg-white dark:bg-gray-700 dark:text-white"
                  min="1"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="target-weight" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('Target Weight (kg)', 'الوزن المستهدف (كجم)')}
                </label>
                <Input
                  id="target-weight"
                  type="number"
                  placeholder="e.g., 65"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="bg-white dark:bg-gray-700 dark:text-white"
                  min="1"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Your Specific Question', 'سؤالك المحدد')}
              </label>
              <Textarea
                id="question"
                placeholder={t('e.g., "What are the best exercises for fat loss?", "How much protein do I need?", "Suggest a healthy snack for energy."', 'مثال: "ما هي أفضل التمارين لخسارة الدهون؟"، "كم أحتاج من البروتين؟"، "اقترح وجبة خفيفة صحية للطاقة."')}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={5}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleGetCoaching}
              disabled={isLoading || !fitnessGoal || !question.trim()}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Getting Coaching...', 'جاري الحصول على التدريب...')}
                </>
              ) : (
                <>
                  <Target className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Get Coaching', 'احصل على تدريب')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {coachingAdvice && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Dumbbell className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('AI Coach Says', 'مدرب الذكاء الاصطناعي يقول')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                {coachingAdvice}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default FitnessNutritionCoachPage;
