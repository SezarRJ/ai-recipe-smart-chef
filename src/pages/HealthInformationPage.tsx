import React, { useMemo, useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { NutritionTip } from '@/components/nutrition/NutritionTip';
import { AlertCircle, TrendingUp, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRTL } from '@/contexts/RTLContext'; // Assume useRTL provides a t function

// --- MOCK GLOBAL STATE (for demonstration purposes) ---
// In a real application, you'd use Context API, Redux, Zustand, or React Query
// to share this data across your application.
// For now, we'll create a simple "mock" state and a hook to access it.

// This data will be shared and updated across both pages.
// It simulates what a global store or API would provide.
let _sharedHealthData = {
  dailyNutritionEntries: [], // Detailed entries from NutritionEntryForm
  mockWeeklyData: [ // Baseline for weekly trends
    { day: 'Mon', calories: 1850, protein: 72, carbs: 200, fat: 62, goal: 2000 },
    { day: 'Tue', calories: 2100, protein: 85, carbs: 220, fat: 70, goal: 2000 },
    { day: 'Wed', calories: 1950, protein: 78, carbs: 210, fat: 65, goal: 2000 },
    { day: 'Thu', calories: 1800, protein: 70, carbs: 190, fat: 60, goal: 2000 },
    { day: 'Fri', calories: 2200, protein: 90, carbs: 240, fat: 75, goal: 2000 },
    { day: 'Sat', calories: 2300, protein: 95, carbs: 260, fat: 80, goal: 2000 },
    { day: 'Sun', calories: 1900, protein: 75, carbs: 205, fat: 63, goal: 2000 },
  ],
  userAllergens: ['Peanuts', 'Shellfish', 'Tree Nuts'],
  healthGoals: {
    dailyCaloriesTarget: 2000,
    weeklyExerciseTarget: 5, // hours
    waterIntakeTarget: 2.5, // liters
    sleepHoursTarget: 8, // hours
    // Current values should come from consumed data, not hardcoded
    currentWeeklyExercise: 4,
    currentWaterIntake: 2.1,
    currentSleepHours: 7,
  },
  // Simulate initial summary data for HealthTrackingPage
  currentSummary: {
    calories: { consumed: 1450, target: 2000 },
    water: { consumed: 1.2, target: 2.5 }, // liters
    sleep: { consumed: 7.5, target: 8 }, // hours
    nutritionStatus: { value: 'Good', status: 'More protein needed', progress: 85 } // Simplified
  }
};

// Simple event emitter to simulate state updates
const EventEmitter = {
  _events: {},
  on(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(listener);
  },
  off(event, listener) {
    if (!this._events[event]) return;
    this._events[event] = this._events[event].filter(l => l !== listener);
  },
  emit(event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach(listener => listener(...args));
    }
  }
};

// Custom hook to access and update shared data
const useSharedHealthData = () => {
  const [data, setData] = useState(_sharedHealthData);

  useEffect(() => {
    const handler = (updatedData) => setData({ ...updatedData });
    EventEmitter.on('updateHealthData', handler);
    return () => EventEmitter.off('updateHealthData', handler);
  }, []);

  const updateSharedData = (updates) => {
    _sharedHealthData = { ..._sharedHealthData, ...updates };
    EventEmitter.emit('updateHealthData', _sharedHealthData);
  };

  return { ...data, updateSharedData };
};

// --- END MOCK GLOBAL STATE ---


export default function HealthInformationPage() {
  const { t } = useRTL(); // For translation
  const { dailyNutritionEntries, mockWeeklyData, userAllergens, healthGoals, updateSharedData } = useSharedHealthData();

  // Calculate Today's Nutrition based on dynamic dailyNutritionEntries
  const todayNutritionSummary = useMemo(() => {
    const today = new Date().toDateString();
    const currentDayEntry = dailyNutritionEntries.find(entry => entry.date === today) || {
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0
    };

    // Define fixed goals or fetch from a user profile/settings
    const goals = {
      protein: 100, carbs: 275, fat: 80, fiber: 25, sugar: 50 // Example goals
    };

    return [
      { name: t('Protein', 'بروتين'), amount: currentDayEntry.protein, goal: goals.protein, unit: 'g' },
      { name: t('Carbs', 'كربوهيدرات'), amount: currentDayEntry.carbs, goal: goals.carbs, unit: 'g' },
      { name: t('Fat', 'دهون'), amount: currentDayEntry.fat, goal: goals.fat, unit: 'g' },
      { name: t('Fiber', 'ألياف'), amount: currentDayEntry.fiber, goal: goals.fiber, unit: 'g' },
      { name: t('Sugar', 'سكر'), amount: currentDayEntry.sugar, goal: goals.sugar, unit: 'g' },
    ];
  }, [dailyNutritionEntries, t]);

  // Calculate Weekly Overview data dynamically
  const weeklyChartData = useMemo(() => {
    // This part is tricky as `dailyNutritionEntries` might not cover a full week.
    // For a real app, you'd fetch weekly historical data.
    // Here, we'll try to integrate.
    const combinedData = [...mockWeeklyData]; // Start with mock baseline

    dailyNutritionEntries.forEach(entry => {
      const entryDate = new Date(entry.date);
      const dayName = entryDate.toLocaleDateString('en-US', { weekday: 'short' });
      const existingDayIndex = combinedData.findIndex(d => d.day === dayName);

      if (existingDayIndex !== -1) {
        // Update existing mock day with accumulated actual data
        combinedData[existingDayIndex] = {
          ...combinedData[existingDayIndex],
          calories: (combinedData[existingDayIndex].calories || 0) + entry.calories, // Accumulate if multiple entries per day
          protein: (combinedData[existingDayIndex].protein || 0) + entry.protein,
          carbs: (combinedData[existingDayIndex].carbs || 0) + entry.carbs,
          fat: (combinedData[existingDayIndex].fat || 0) + entry.fat,
        };
      } else {
        // If it's a new day not in mock, add it (simple addition)
        combinedData.push({
          day: dayName,
          calories: entry.calories,
          protein: entry.protein,
          carbs: entry.carbs,
          fat: entry.fat,
          goal: healthGoals.dailyCaloriesTarget // Use the general calorie goal
        });
      }
    });

    // Sort by day of the week for consistent chart display
    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return combinedData.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

  }, [dailyNutritionEntries, mockWeeklyData, healthGoals.dailyCaloriesTarget]);


  // Calculate average daily calories & protein from `weeklyChartData`
  const averageDailyCalories = useMemo(() => {
    if (weeklyChartData.length === 0) return 0;
    const totalCalories = weeklyChartData.reduce((sum, data) => sum + (data.calories || 0), 0);
    return Math.round(totalCalories / weeklyChartData.length);
  }, [weeklyChartData]);

  const averageDailyProtein = useMemo(() => {
    if (weeklyChartData.length === 0) return 0;
    const totalProtein = weeklyChartData.reduce((sum, data) => sum + (data.protein || 0), 0);
    return Math.round(totalProtein / weeklyChartData.length);
  }, [weeklyChartData]);


  // Goal achievement data (derived from healthGoals and current values)
  const dynamicGoalAchievement = useMemo(() => ([
    {
      name: t('Daily Calories', 'السعرات الحرارية اليومية'),
      current: dailyNutritionEntries.reduce((sum, entry) => sum + entry.calories, 0), // Sum today's calories
      goal: healthGoals.dailyCaloriesTarget,
      unit: 'kcal'
    },
    {
      name: t('Weekly Exercise', 'التمرين الأسبوعي'),
      current: healthGoals.currentWeeklyExercise,
      goal: healthGoals.weeklyExerciseTarget,
      unit: 'hours'
    },
    {
      name: t('Water Intake', 'تناول الماء'),
      current: healthGoals.currentWaterIntake,
      goal: healthGoals.waterIntakeTarget,
      unit: 'L'
    },
    {
      name: t('Sleep Hours', 'ساعات النوم'),
      current: healthGoals.currentSleepHours,
      goal: healthGoals.sleepHoursTarget,
      unit: 'hours'
    },
  ]).map(goal => ({
    ...goal,
    percentComplete: (goal.current / goal.goal) * 100 > 100 ? 100 : ((goal.current / goal.goal) * 100) || 0, // Cap at 100% for progress bar
  })), [dailyNutritionEntries, healthGoals, t]);


  // Placeholder for `onApply` in NutritionTip
  const handleApplyTip = (tip) => {
    console.log('Tip applied:', tip);
    alert(t('Tip applied! (Logic to adjust goals/plan goes here)', 'تم تطبيق النصيحة! (منطق لتعديل الأهداف/الخطة هنا)'));
  };

  return (
    <PageContainer header={{ title: t('Health Information', 'معلومات الصحة'), showBackButton: true }}>
      <div className="space-y-6 pb-6 px-4">
        <Tabs defaultValue="nutrition">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="nutrition">{t('Nutrition', 'التغذية')}</TabsTrigger>
            <TabsTrigger value="goals">{t('Goals', 'الأهداف')}</TabsTrigger>
            <TabsTrigger value="allergens">{t('Allergens', 'مسببات الحساسية')}</TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition">
            <section>
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t("Today's Nutrition", "تغذية اليوم")}</h2>

              <Card className="mb-6 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white">{t('Daily Progress', 'التقدم اليومي')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayNutritionSummary.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium dark:text-white">{item.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.amount} / {item.goal} {item.unit}
                          </span>
                        </div>
                        <Progress value={(item.amount / item.goal) * 100} className="h-2 bg-wasfah-bright-teal" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white">{t('Weekly Overview', 'نظرة عامة أسبوعية')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={weeklyChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="day" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(22,22,22,0.9)',
                          borderColor: '#666',
                          color: '#fff'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="calories" name={t("Calories Consumed", "السعرات الحرارية المستهلكة")} stroke="#05BFDB" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="goal" name={t("Daily Goal", "الهدف اليومي")} stroke="#F97316" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>

                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    <p>{t('Average Daily Calories', 'متوسط السعرات الحرارية اليومية')}: {averageDailyCalories} kcal</p>
                    <p>{t('Average Daily Protein', 'متوسط البروتين اليومي')}: {averageDailyProtein}g</p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <NutritionTip
                  tip={t("Adding more lean protein to your meals can help you feel fuller for longer and support muscle maintenance.", "إضافة المزيد من البروتين الخالي من الدهون إلى وجباتك يمكن أن يساعدك على الشعور بالشبع لفترة أطول ويدعم الحفاظ على العضلات.")}
                  source="Nutrition AI"
                  onApply={handleApplyTip}
                  type="info"
                />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="goals">
            <section>
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal flex items-center">
                <Award className="mr-2 h-5 w-5" />
                {t('Goal Tracking', 'تتبع الأهداف')}
              </h2>

              <div className="space-y-4 mb-6">
                {dynamicGoalAchievement.map((goal) => (
                  <Card key={goal.name} className="overflow-hidden dark:border-gray-700 dark:bg-gray-800">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium dark:text-white">{goal.name}</h3>
                          <div className="flex items-center">
                            <span className={`text-sm ${goal.percentComplete >= 100 ? 'text-green-500' : 'text-amber-500'} mr-1`}>
                              {Math.round(goal.percentComplete)}%
                            </span>
                            {goal.current >= goal.goal ? (
                              <ArrowUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <span>{t('Current', 'الحالي')}: {goal.current} {goal.unit}</span>
                          <span>{t('Goal', 'الهدف')}: {goal.goal} {goal.unit}</span>
                        </div>
                        <Progress value={goal.percentComplete} className="h-2 bg-wasfah-bright-teal" />
                      </div>

                      <div className={`h-1 ${goal.percentComplete >= 100 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-4 flex gap-4">
                <Link to="/nutrition-goals-settings" className="flex-1"> {/* Update this route to match your routing */}
                  <Button variant="default" className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {t('Update Goals', 'تحديث الأهداف')}
                  </Button>
                </Link>
                <Link to="/health-tracking-detail" className="flex-1"> {/* Update this route to match your routing */}
                  <Button variant="outline" className="w-full border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal/10 dark:text-wasfah-bright-teal dark:border-wasfah-bright-teal/50">
                    {t('View Details', 'عرض التفاصيل')}
                  </Button>
                </Link>
              </div>

              <div className="mt-6">
                <NutritionTip
                  tip={t("Setting realistic, achievable goals increases your chances of success. Try to improve by small increments each week.", "تحديد أهداف واقعية وقابلة للتحقيق يزيد من فرص نجاحك. حاول التحسن بزيادات صغيرة كل أسبوع.")}
                  source="Fitness Coach"
                  onApply={handleApplyTip}
                  type="success"
                />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="allergens">
            <section>
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t('Your Allergen Profile', 'ملفك الشخصي للحساسية')}</h2>

              <Card className="mb-6 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white">{t('Registered Allergens', 'مسببات الحساسية المسجلة')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {userAllergens.length > 0 ? (
                    <div className="space-y-2">
                      {userAllergens.map((allergen) => (
                        <div key={allergen} className="flex items-center p-2 rounded-md bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                          <AlertCircle size={16} className="mr-2" />
                          <span>{allergen}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">{t('No allergens have been registered.', 'لم يتم تسجيل أي مسببات حساسية.')}</p>
                  )}

                  <div className="mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('Recipes containing these allergens will be clearly marked with warnings. You can update your allergen information in your profile settings.', 'سيتم وضع علامة واضحة على الوصفات التي تحتوي على هذه المواد المسببة للحساسية. يمكنك تحديث معلومات الحساسية الخاصة بك في إعدادات ملفك الشخصي.')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white">{t('Allergen Information', 'معلومات مسببات الحساسية')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {t('While we do our best to highlight potential allergens in recipes, please always check the ingredients list carefully if you have severe allergies.', 'بينما نبذل قصارى جهدنا لتسليط الضوء على مسببات الحساسية المحتملة في الوصفات، يرجى دائمًا التحقق من قائمة المكونات بعناية إذا كان لديك حساسية شديدة.')}
                  </p>

                  <h3 className="font-semibold mb-2 dark:text-white">{t('Common Allergens We Track:', 'مسببات الحساسية الشائعة التي نتتبعها:')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>{t('Peanuts', 'الفول السوداني')}</li>
                    <li>{t('Tree Nuts', 'المكسرات')}</li>
                    <li>{t('Dairy', 'منتجات الألبان')}</li>
                    <li>{t('Eggs', 'البيض')}</li>
                    <li>{t('Fish', 'الأسماك')}</li>
                    <li>{t('Shellfish', 'المحار')}</li>
                    <li>{t('Soy', 'الصويا')}</li>
                    <li>{t('Wheat (Gluten)', 'القمح (الغلوتين)')}</li>
                    <li>{t('Sesame', 'السمسم')}</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
