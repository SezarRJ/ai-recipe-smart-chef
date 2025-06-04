
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Droplet, Moon, Apple } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { NutritionEntryForm } from '@/components/nutrition/NutritionEntryForm'; // Assuming you have this component
import { useRTL } from '@/contexts/RTLContext'; // Assume useRTL provides a t function

// --- MOCK GLOBAL STATE (from HealthInformationPage) ---
// This needs to be the exact same mock or a shared context/store.
// Pasting it here for self-contained example, but ideally it's imported.

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
    proteinTarget: 120, // grams
    carbsTarget: 250, // grams
    fatTarget: 70, // grams
    fiberTarget: 25, // grams
    // Current values should come from consumed data, not hardcoded
    currentWeeklyExercise: 4,
    currentWaterIntake: 2.1,
    currentSleepHours: 7,
  },
  // Simulate initial summary data for HealthTrackingPage
  currentSummary: {
    calories: { consumed: 0, target: 2000 }, // Start with 0 for dynamic update
    water: { consumed: 1.2, target: 2.5 }, // liters
    sleep: { consumed: 7.5, target: 8 }, // hours
    nutritionStatus: { value: 'Good', status: 'More protein needed', progress: 85 } // Simplified
  }
};

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


// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HealthTrackingPage() {
  const { t } = useRTL();
  const { dailyNutritionEntries, healthGoals, currentSummary, updateSharedData } = useSharedHealthData();

  // Calculate dynamic calorie data for the chart based on dailyNutritionEntries
  const calorieChartData = useMemo(() => {
    const dataMap = new Map();
    // Initialize with a few recent days if no entries yet
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i)); // Go back 6 days from today
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      dataMap.set(dayName, { name: dayName, consumed: 0, burned: 0, limit: healthGoals.dailyCaloriesTarget });
    }

    dailyNutritionEntries.forEach(entry => {
      const entryDate = new Date(entry.date);
      const dayName = entryDate.toLocaleDateString('en-US', { weekday: 'short' });
      const current = dataMap.get(dayName) || { name: dayName, consumed: 0, burned: 0, limit: healthGoals.dailyCaloriesTarget };
      current.consumed += entry.calories; // Accumulate calories for the day
      // For burned calories, you'd need a separate activity tracking system.
      // For now, we'll keep it simple or use a placeholder
      current.burned = (current.burned || 0) + (entry.activityCaloriesBurned || 0); // Assuming you'd have this field
      dataMap.set(dayName, current);
    });

    // Convert map to array, ensuring consistent order
    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return Array.from(dataMap.values()).sort((a, b) => dayOrder.indexOf(a.name) - dayOrder.indexOf(b.name));
  }, [dailyNutritionEntries, healthGoals.dailyCaloriesTarget]);


  // Calculate dynamic nutrition data for the bar chart
  const nutritionBarData = useMemo(() => {
    const today = new Date().toDateString();
    const todayEntry = dailyNutritionEntries.find(entry => entry.date === today) || { protein: 0, carbs: 0, fat: 0, fiber: 0 };

    return [
      { name: t('Protein', 'بروتين'), consumed: todayEntry.protein, goal: healthGoals.proteinTarget },
      { name: t('Carbs', 'كربوهيدرات'), consumed: todayEntry.carbs, goal: healthGoals.carbsTarget },
      { name: t('Fat', 'دهون'), consumed: todayEntry.fat, goal: healthGoals.fatTarget },
      { name: t('Fiber', 'ألياف'), consumed: todayEntry.fiber, goal: healthGoals.fiberTarget },
    ];
  }, [dailyNutritionEntries, healthGoals, t]);


  // Update currentSummary on nutrition entry submission
  const handleNutritionSubmit = useCallback((data) => {
    const today = new Date().toDateString();
    let updatedDailyEntries = [...dailyNutritionEntries];
    const existingEntryIndex = updatedDailyEntries.findIndex(entry => entry.date === today);

    if (existingEntryIndex > -1) {
      updatedDailyEntries[existingEntryIndex] = {
        ...updatedDailyEntries[existingEntryIndex],
        calories: (updatedDailyEntries[existingEntryIndex].calories || 0) + data.calories,
        protein: (updatedDailyEntries[existingEntryIndex].protein || 0) + data.protein,
        carbs: (updatedDailyEntries[existingEntryIndex].carbs || 0) + data.carbs,
        fat: (updatedDailyEntries[existingEntryIndex].fat || 0) + data.fat,
        fiber: (updatedDailyEntries[existingEntryIndex].fiber || 0) + (data.fiber || 0), // Add fiber if available
        sugar: (updatedDailyEntries[existingEntryIndex].sugar || 0) + (data.sugar || 0), // Add sugar if available
      };
    } else {
      updatedDailyEntries.push({
        date: today,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        fiber: data.fiber || 0,
        sugar: data.sugar || 0,
      });
    }

    // Update shared state
    updateSharedData({ dailyNutritionEntries: updatedDailyEntries });

    // Update the summary values for the cards at the top
    const totalConsumedCaloriesToday = updatedDailyEntries.find(entry => entry.date === today)?.calories || 0;
    const currentWater = currentSummary.water.consumed + (data.waterIntake || 0); // Assuming NutritionEntryForm might have water
    const currentSleep = currentSummary.sleep.consumed; // Sleep not added here, typically separate tracking

    updateSharedData({
      currentSummary: {
        calories: { consumed: totalConsumedCaloriesToday, target: healthGoals.dailyCaloriesTarget },
        water: { consumed: currentWater, target: healthGoals.waterIntakeTarget },
        sleep: { consumed: currentSleep, target: healthGoals.sleepHoursTarget },
        // Re-evaluate nutrition status based on new data
        nutritionStatus: {
          value: totalConsumedCaloriesToday > healthGoals.dailyCaloriesTarget * 0.9 && totalConsumedCaloriesToday < healthGoals.dailyCaloriesTarget * 1.1 ? t('Good', 'جيد') : t('Needs attention', 'يحتاج اهتمام'),
          status: t('Check macros', 'تحقق من المغذيات الكبرى'),
          progress: Math.min(100, (totalConsumedCaloriesToday / healthGoals.dailyCaloriesTarget) * 100)
        }
      }
    });

    alert(t('Meal logged successfully!', 'تم تسجيل الوجبة بنجاح!'));
  }, [dailyNutritionEntries, healthGoals, currentSummary, updateSharedData, t]);


  // Summary card data (dynamically updated)
  const summaryCards = useMemo(() => [
    {
      icon: <Activity className="h-5 w-5 text-wasfah-bright-teal mr-2" />,
      title: t('Calories', 'السعرات الحرارية'),
      value: `${currentSummary.calories.consumed} / ${currentSummary.calories.target}`,
      progress: Math.min(100, (currentSummary.calories.consumed / currentSummary.calories.target) * 100) || 0,
      footer: currentSummary.calories.consumed < currentSummary.calories.target ?
        `${currentSummary.calories.target - currentSummary.calories.consumed} ${t('calories remaining', 'سعرة حرارية متبقية')}` :
        `${t('Goal met!', 'تم تحقيق الهدف!')}`,
    },
    {
      icon: <Droplet className="h-5 w-5 text-blue-500 mr-2" />,
      title: t('Water', 'الماء'),
      value: `${currentSummary.water.consumed} / ${currentSummary.water.target} L`,
      progress: Math.min(100, (currentSummary.water.consumed / currentSummary.water.target) * 100) || 0,
      footer: currentSummary.water.consumed < currentSummary.water.target ?
        `${(currentSummary.water.target - currentSummary.water.consumed).toFixed(1)} ${t('liters remaining', 'لتر متبقي')}` :
        `${t('Goal met!', 'تم تحقيق الهدف!')}`,
    },
    {
      icon: <Moon className="h-5 w-5 text-indigo-500 mr-2" />,
      title: t('Sleep', 'النوم'),
      value: `${currentSummary.sleep.consumed} ${t('hrs', 'ساعات')}`,
      progress: Math.min(100, (currentSummary.sleep.consumed / currentSummary.sleep.target) * 100) || 0,
      footer: `${t('Target', 'الهدف')}: ${currentSummary.sleep.target} ${t('hours', 'ساعات')}`,
    },
    {
      icon: <Apple className="h-5 w-5 text-red-500 mr-2" />,
      title: t('Nutrition', 'التغذية'),
      value: currentSummary.nutritionStatus.value,
      progress: currentSummary.nutritionStatus.progress,
      footer: currentSummary.nutritionStatus.status,
    },
  ], [currentSummary, healthGoals, t]);


  return (
    <PageContainer header={{ title: t('Health Tracking', 'تتبع الصحة'), showBackButton: true }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 pb-6 px-4" // Added px-4 for consistent padding
      >
        {/* Summary Cards */}
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t("Today's Summary", "ملخص اليوم")}</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4"
          >
            {summaryCards.map((item, idx) => (
              <motion.div key={idx} variants={cardVariants}>
                <Card className="dark:bg-gray-800 dark:border-gray-700"> {/* Added dark mode styles */}
                  <CardHeader className="py-3">
                    <div className="flex items-center">
                      {item.icon}
                      <CardTitle className="text-base dark:text-white">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="py-3">
                    <div className="text-2xl font-bold dark:text-white">{item.value}</div>
                    <Progress value={item.progress} className="h-2 mt-2 bg-wasfah-bright-teal" /> {/* Applied brand color */}
                    <div className="text-xs text-gray-500 mt-1 dark:text-gray-400">{item.footer}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Calorie Trends Chart */}
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t('Calorie Trends', 'اتجاهات السعرات الحرارية')}</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={calorieChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" /> {/* Dark mode stroke */}
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(22,22,22,0.9)',
                          borderColor: '#666',
                          color: '#fff'
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="consumed" stroke="#05BFDB" name={t("Consumed", "المستهلكة")} />
                    <Line type="monotone" dataKey="burned" stroke="#088395" name={t("Burned", "المحروقة")} />
                    <Line type="monotone" dataKey="limit" stroke="#F97316" strokeDasharray="5 5" name={t("Limit", "الحد الأقصى")} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Nutrient Intake Chart */}
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t('Nutrient Intake', 'تناول المغذيات')}</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={nutritionBarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" /> {/* Dark mode stroke */}
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(22,22,22,0.9)',
                          borderColor: '#666',
                          color: '#fff'
                        }}
                    />
                    <Legend />
                    <Bar dataKey="consumed" fill="#05BFDB" name={t("Consumed", "المستهلكة")} />
                    <Bar dataKey="goal" fill="#0A4D68" name={t("Goal", "الهدف")} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Nutrition Entry Form */}
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t("Log Today's Meal", "سجل وجبة اليوم")}</h2>
          <NutritionEntryForm onSubmit={handleNutritionSubmit} />
        </section>


        {/* Button to go to Health Information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/health-information">
            <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
              {t('View Detailed Health Information', 'عرض معلومات صحية مفصلة')}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}
