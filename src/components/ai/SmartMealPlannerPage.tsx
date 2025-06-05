// src/pages/ai/SmartMealPlannerPage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Loader2, Calendar, Utensils, Zap, PlusCircle } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const SmartMealPlannerPage = () => {
  const { t, direction } = useRTL();
  const [dietType, setDietType] = useState('');
  const [calorieGoal, setCalorieGoal] = useState<number | ''>('');
  const [numDays, setNumDays] = useState<number | ''>(7);
  const [dislikedIngredients, setDislikedIngredients] = useState('');
  const [mealPlan, setMealPlan] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mockAIMealPlanner = async (options: { diet: string, calories: number, days: number, disliked: string }): Promise<string[]> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(Math.random() * 2500 + 2000, resolve)); // 2 to 4.5 seconds

    const plans: string[] = [];
    const baseMeals = [
      { name: "Scrambled Eggs with Spinach & Toast", type: "Breakfast", calories: 350 },
      { name: "Grilled Chicken Salad with Quinoa", type: "Lunch", calories: 450 },
      { name: "Baked Salmon with Roasted Vegetables", type: "Dinner", calories: 600 },
    ];

    for (let i = 1; i <= options.days; i++) {
      let dayPlan = `--- ${t("Day", "اليوم")} ${i} ---\n`;
      baseMeals.forEach(meal => {
        let mealName = meal.name;
        if (options.diet === 'vegan') {
          if (meal.name.includes("Eggs")) mealName = "Tofu Scramble with Spinach & Toast";
          if (meal.name.includes("Chicken")) mealName = "Lentil Salad with Roasted Vegetables";
          if (meal.name.includes("Salmon")) mealName = "Chickpea Curry with Rice";
        } else if (options.diet === 'keto') {
            if (meal.name.includes("Toast")) mealName = "Scrambled Eggs with Spinach & Avocado";
            if (meal.name.includes("Quinoa")) mealName = "Grilled Chicken Salad with Extra Avocado";
            if (meal.name.includes("Rice")) mealName = "Baked Salmon with Broccoli Puree";
        }

        if (options.disliked.toLowerCase().split(',').some(d => mealName.toLowerCase().includes(d.trim()))) {
            mealName = `${mealName} (${t("Substitute Recommended", "يوصى ببديل")})`;
        }

        dayPlan += `${t(meal.type, meal.type)}: ${mealName} (~${(meal.calories * (options.calories / 1400)).toFixed(0)} kcal)\n`; // Adjust calories proportional to goal
      });
      plans.push(dayPlan);
    }

    return plans;
  };

  const handleGeneratePlan = async () => {
    if (!dietType || calorieGoal === '' || calorieGoal <= 0 || numDays === '' || numDays <= 0) {
      toast({
        title: t("Missing Information", "معلومات مفقودة"),
        description: t("Please fill in all required fields for meal planning.", "الرجاء ملء جميع الحقول المطلوبة لتخطيط الوجبات."),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setMealPlan([]); // Clear previous results

    try {
      const result = await mockAIMealPlanner({
        diet: dietType,
        calories: Number(calorieGoal),
        days: Number(numDays),
        disliked: dislikedIngredients,
      });
      setMealPlan(result);
      toast({
        title: t("Meal Plan Generated!", "تم إنشاء خطة الوجبات!"),
        description: t("Your personalized meal plan is ready.", "خطتك الغذائية المخصصة جاهزة."),
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

  const dietOptions = [
    { value: 'none', label: t('None', 'لا شيء') },
    { value: 'vegetarian', label: t('Vegetarian', 'نباتي') },
    { value: 'vegan', label: t('Vegan', 'نباتي صرف') },
    { value: 'keto', label: t('Keto', 'كيتو') },
    { value: 'gluten-free', label: t('Gluten-Free', 'خالي من الغلوتين') },
    { value: 'paleo', label: t('Paleo', 'باليو') },
  ];

  return (
    <PageContainer header={{ title: t('Smart Meal Planner', 'مخطط الوجبات الذكي'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-6 rounded-lg text-white text-center mb-6">
          <Calendar className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Plan Your Meals Intelligently', 'خطط لوجباتك بذكاء')}</h1>
          <p className="opacity-90">{t('Generate personalized meal plans based on your dietary needs and goals.', 'أنشئ خطط وجبات مخصصة بناءً على احتياجاتك وأهدافك الغذائية.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="diet-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Diet Type', 'نوع الحمية')}
              </label>
              <Select value={dietType} onValueChange={setDietType} disabled={isLoading}>
                <SelectTrigger id="diet-type" className="bg-white dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder={t('Select a diet type', 'اختر نوع حمية')} />
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="calorie-goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('Daily Calorie Goal (kcal)', 'الهدف اليومي من السعرات الحرارية (سعرة حرارية)')}
                </label>
                <Input
                  id="calorie-goal"
                  type="number"
                  placeholder="e.g., 2000"
                  value={calorieGoal}
                  onChange={(e) => setCalorieGoal(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="bg-white dark:bg-gray-700 dark:text-white"
                  min="1"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="num-days" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('Number of Days', 'عدد الأيام')}
                </label>
                <Input
                  id="num-days"
                  type="number"
                  placeholder="e.g., 7"
                  value={numDays}
                  onChange={(e) => setNumDays(e.target.value === '' ? '' : parseInt(e.target.value))}
                  className="bg-white dark:bg-gray-700 dark:text-white"
                  min="1"
                  max="30"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="disliked-ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Disliked Ingredients (comma-separated)', 'مكونات لا تفضلها (مفصولة بفاصلة)')}
              </label>
              <Textarea
                id="disliked-ingredients"
                placeholder={t('e.g., cilantro, mushrooms, olives', 'مثال: كزبرة، فطر، زيتون')}
                value={dislikedIngredients}
                onChange={(e) => setDislikedIngredients(e.target.value)}
                rows={3}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleGeneratePlan}
              disabled={isLoading || !dietType || calorieGoal === '' || numDays === ''}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Generating...', 'جاري الإنشاء...')}
                </>
              ) : (
                <>
                  <PlusCircle className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Generate Meal Plan', 'إنشاء خطة وجبات')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {mealPlan.length > 0 && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Your Personalized Meal Plan', 'خطة وجباتك المخصصة')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {mealPlan.map((dayPlan, index) => (
                  <Card key={index} className="bg-gray-50 dark:bg-gray-700 p-4">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200">
                      {dayPlan}
                    </pre>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SmartMealPlannerPage;
