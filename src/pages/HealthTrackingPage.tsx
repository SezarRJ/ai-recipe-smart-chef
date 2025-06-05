
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Droplet, Moon, Apple, Target, TrendingUp, Clock, Dumbbell } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NutritionEntryForm } from '@/components/nutrition/NutritionEntryForm';
import { useRTL } from '@/contexts/RTLContext';

// Mock global state
let _sharedHealthData = {
  dailyNutritionEntries: [],
  mockWeeklyData: [
    { day: 'Mon', calories: 1850, protein: 72, carbs: 200, fat: 62, goal: 2000 },
    { day: 'Tue', calories: 2100, protein: 85, carbs: 220, fat: 70, goal: 2000 },
    { day: 'Wed', calories: 1950, protein: 78, carbs: 210, fat: 65, goal: 2000 },
    { day: 'Thu', calories: 1800, protein: 70, carbs: 190, fat: 60, goal: 2000 },
    { day: 'Fri', calories: 2200, protein: 90, carbs: 240, fat: 75, goal: 2000 },
    { day: 'Sat', calories: 2300, protein: 95, carbs: 260, fat: 80, goal: 2000 },
    { day: 'Sun', calories: 1900, protein: 75, carbs: 205, fat: 63, goal: 2000 },
  ],
  healthGoals: {
    dailyCaloriesTarget: 2000,
    weeklyExerciseTarget: 5,
    waterIntakeTarget: 2.5,
    sleepHoursTarget: 8,
    proteinTarget: 120,
    carbsTarget: 250,
    fatTarget: 70,
    fiberTarget: 25,
    currentWeeklyExercise: 4,
    currentWaterIntake: 2.1,
    currentSleepHours: 7,
  },
  currentSummary: {
    calories: { consumed: 0, target: 2000 },
    water: { consumed: 1.2, target: 2.5 },
    sleep: { consumed: 7.5, target: 8 },
    activity: { minutes: 25, target: 60 },
    weight: { current: 70, target: 65, change: -0.5 },
    nutritionStatus: { value: 'Good', status: 'More protein needed', progress: 85 }
  }
};

const EventEmitter = {
  _events: {},
  on(event: string, listener: Function) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(listener);
  },
  off(event: string, listener: Function) {
    if (!this._events[event]) return;
    this._events[event] = this._events[event].filter((l: Function) => l !== listener);
  },
  emit(event: string, ...args: any[]) {
    if (this._events[event]) {
      this._events[event].forEach((listener: Function) => listener(...args));
    }
  }
};

const useSharedHealthData = () => {
  const [data, setData] = useState(_sharedHealthData);

  useEffect(() => {
    const handler = (updatedData: any) => setData({ ...updatedData });
    EventEmitter.on('updateHealthData', handler);
    return () => EventEmitter.off('updateHealthData', handler);
  }, []);

  const updateSharedData = (updates: any) => {
    _sharedHealthData = { ..._sharedHealthData, ...updates };
    EventEmitter.emit('updateHealthData', _sharedHealthData);
  };

  return { ...data, updateSharedData };
};

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
  const [waterInput, setWaterInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [activityInput, setActivityInput] = useState('');

  // Calculate dynamic calorie data for the chart
  const calorieChartData = useMemo(() => {
    const dataMap = new Map();
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      dataMap.set(dayName, { name: dayName, consumed: 0, burned: 0, limit: healthGoals.dailyCaloriesTarget });
    }

    dailyNutritionEntries.forEach((entry: any) => {
      const entryDate = new Date(entry.date);
      const dayName = entryDate.toLocaleDateString('en-US', { weekday: 'short' });
      const current = dataMap.get(dayName) || { name: dayName, consumed: 0, burned: 0, limit: healthGoals.dailyCaloriesTarget };
      current.consumed += entry.calories;
      current.burned = (current.burned || 0) + (entry.activityCaloriesBurned || 0);
      dataMap.set(dayName, current);
    });

    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return Array.from(dataMap.values()).sort((a: any, b: any) => dayOrder.indexOf(a.name) - dayOrder.indexOf(b.name));
  }, [dailyNutritionEntries, healthGoals.dailyCaloriesTarget]);

  // Handle nutrition submission
  const handleNutritionSubmit = useCallback((data: any) => {
    const today = new Date().toDateString();
    let updatedDailyEntries = [...dailyNutritionEntries];
    const existingEntryIndex = updatedDailyEntries.findIndex((entry: any) => entry.date === today);

    if (existingEntryIndex > -1) {
      updatedDailyEntries[existingEntryIndex] = {
        ...updatedDailyEntries[existingEntryIndex],
        calories: (updatedDailyEntries[existingEntryIndex].calories || 0) + data.calories,
        protein: (updatedDailyEntries[existingEntryIndex].protein || 0) + data.protein,
        carbs: (updatedDailyEntries[existingEntryIndex].carbs || 0) + data.carbs,
        fat: (updatedDailyEntries[existingEntryIndex].fat || 0) + data.fat,
        fiber: (updatedDailyEntries[existingEntryIndex].fiber || 0) + (data.fiber || 0),
        sugar: (updatedDailyEntries[existingEntryIndex].sugar || 0) + (data.sugar || 0),
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

    updateSharedData({ dailyNutritionEntries: updatedDailyEntries });

    const totalConsumedCaloriesToday = updatedDailyEntries.find((entry: any) => entry.date === today)?.calories || 0;
    const currentWater = currentSummary.water.consumed + (data.waterIntake || 0);

    updateSharedData({
      currentSummary: {
        ...currentSummary,
        calories: { consumed: totalConsumedCaloriesToday, target: healthGoals.dailyCaloriesTarget },
        water: { consumed: currentWater, target: healthGoals.waterIntakeTarget },
        nutritionStatus: {
          value: totalConsumedCaloriesToday > healthGoals.dailyCaloriesTarget * 0.9 && totalConsumedCaloriesToday < healthGoals.dailyCaloriesTarget * 1.1 ? 'Good' : 'Needs attention',
          status: 'Check macros',
          progress: Math.min(100, (totalConsumedCaloriesToday / healthGoals.dailyCaloriesTarget) * 100)
        }
      }
    });

    alert('Meal logged successfully!');
  }, [dailyNutritionEntries, healthGoals, currentSummary, updateSharedData]);

  // Handle water intake
  const handleWaterSubmit = () => {
    const amount = parseFloat(waterInput);
    if (amount > 0) {
      updateSharedData({
        currentSummary: {
          ...currentSummary,
          water: { 
            consumed: currentSummary.water.consumed + amount, 
            target: currentSummary.water.target 
          }
        }
      });
      setWaterInput('');
    }
  };

  // Handle weight update
  const handleWeightSubmit = () => {
    const weight = parseFloat(weightInput);
    if (weight > 0) {
      const change = weight - currentSummary.weight.current;
      updateSharedData({
        currentSummary: {
          ...currentSummary,
          weight: { 
            current: weight,
            target: currentSummary.weight.target,
            change: change
          }
        }
      });
      setWeightInput('');
    }
  };

  // Handle activity update
  const handleActivitySubmit = () => {
    const minutes = parseInt(activityInput);
    if (minutes > 0) {
      updateSharedData({
        currentSummary: {
          ...currentSummary,
          activity: { 
            minutes: currentSummary.activity.minutes + minutes, 
            target: currentSummary.activity.target 
          }
        }
      });
      setActivityInput('');
    }
  };

  // Summary card data
  const summaryCards = useMemo(() => [
    {
      icon: <Activity className="h-5 w-5 text-wasfah-bright-teal mr-2" />,
      title: t('Nutrition Tracking', 'تتبع التغذية'),
      subtitle: t('Track macros, calories, and nutrients from your meals', 'تتبع المغذيات الكبرى والسعرات والمغذيات من وجباتك'),
      value: `${currentSummary.calories.consumed} / ${currentSummary.calories.target} cal`,
      progress: Math.min(100, (currentSummary.calories.consumed / currentSummary.calories.target) * 100) || 0,
      link: '/nutrition-goals'
    },
    {
      icon: <Apple className="h-5 w-5 text-green-500 mr-2" />,
      title: t('Micronutrient Tracker', 'متتبع المغذيات الدقيقة'),
      subtitle: t('Monitor vitamins and minerals for optimal health', 'مراقبة الفيتامينات والمعادن للصحة المثلى'),
      value: t('85% Complete', '85% مكتمل'),
      progress: 85,
      link: '/micronutrient-tracker'
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />,
      title: t('Weight Management', 'إدارة الوزن'),
      subtitle: t('Track weight changes and body composition', 'تتبع تغيرات الوزن وتركيب الجسم'),
      value: `${currentSummary.weight.current} kg`,
      progress: Math.min(100, ((currentSummary.weight.current - currentSummary.weight.target) / currentSummary.weight.current) * 100),
      link: '/body-information'
    },
    {
      icon: <Dumbbell className="h-5 w-5 text-purple-500 mr-2" />,
      title: t('Activity Monitor', 'مراقب النشاط'),
      subtitle: t('Connect fitness trackers and monitor activity', 'ربط أجهزة تتبع اللياقة ومراقبة النشاط'),
      value: `${currentSummary.activity.minutes} min today`,
      progress: Math.min(100, (currentSummary.activity.minutes / currentSummary.activity.target) * 100),
      link: '/health-tracking'
    },
    {
      icon: <Target className="h-5 w-5 text-orange-500 mr-2" />,
      title: t('Health Goals', 'الأهداف الصحية'),
      subtitle: t('Set and track personalized health objectives', 'تحديد وتتبع الأهداف الصحية الشخصية'),
      value: t('3/5 Goals Met', '3/5 أهداف محققة'),
      progress: 60,
      link: '/nutrition-goals'
    },
    {
      icon: <Clock className="h-5 w-5 text-indigo-500 mr-2" />,
      title: t('Meal Timing', 'توقيت الوجبات'),
      subtitle: t('Optimize meal timing for better health', 'تحسين توقيت الوجبات لصحة أفضل'),
      value: t('On Track', 'على المسار الصحيح'),
      progress: 75,
      link: '/meal-timing'
    }
  ], [currentSummary, t]);

  return (
    <PageContainer header={{ title: t('Health Tracking', 'تتبع الصحة'), showBackButton: true }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 pb-6 px-4"
      >
        {/* Summary Cards */}
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t("Health Overview", "نظرة عامة على الصحة")}</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {summaryCards.map((item, idx) => (
              <motion.div key={idx} variants={cardVariants}>
                <Link to={item.link}>
                  <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="py-3">
                      <div className="flex items-center">
                        {item.icon}
                        <div className="flex-1">
                          <CardTitle className="text-base dark:text-white">{item.title}</CardTitle>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.subtitle}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="text-lg font-bold dark:text-white mb-2">{item.value}</div>
                      <Progress value={item.progress} className="h-2 bg-wasfah-bright-teal" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t('Quick Actions', 'إجراءات سريعة')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Water Intake */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                  {t('Add Water', 'إضافة ماء')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.25"
                    value={waterInput}
                    onChange={(e) => setWaterInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleWaterSubmit} size="sm">
                    {t('Add', 'إضافة')}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t('Current:', 'الحالي:')} {currentSummary.water.consumed.toFixed(1)}L / {currentSummary.water.target}L
                </p>
              </CardContent>
            </Card>

            {/* Weight Update */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  {t('Update Weight', 'تحديث الوزن')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="70"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleWeightSubmit} size="sm">
                    {t('Update', 'تحديث')}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t('Current:', 'الحالي:')} {currentSummary.weight.current}kg 
                  {currentSummary.weight.change !== 0 && (
                    <span className={currentSummary.weight.change > 0 ? 'text-red-500' : 'text-green-500'}>
                      {' '}({currentSummary.weight.change > 0 ? '+' : ''}{currentSummary.weight.change.toFixed(1)}kg)
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 text-purple-500 mr-2" />
                  {t('Log Activity', 'تسجيل النشاط')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="30"
                    value={activityInput}
                    onChange={(e) => setActivityInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleActivitySubmit} size="sm">
                    {t('Log', 'تسجيل')}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t('Today:', 'اليوم:')} {currentSummary.activity.minutes} / {currentSummary.activity.target} min
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Calorie Trends Chart */}
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4 dark:text-wasfah-bright-teal">{t('Weekly Trends', 'الاتجاهات الأسبوعية')}</h2>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
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
                    <Line type="monotone" dataKey="limit" stroke="#F97316" strokeDasharray="5 5" name={t("Target", "الهدف")} />
                  </LineChart>
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
      </motion.div>
    </PageContainer>
  );
}
