
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NutritionTip } from '@/components/nutrition/NutritionTip';
import { Activity, Scale, CalendarDays, ArrowLeftRight } from 'lucide-react';
import { DailyChallengesManager } from '@/components/challenges/DailyChallengesManager';
import { BMICalculator } from '@/components/health/BMICalculator';
import { TrackingTabContent } from '@/components/health/TrackingTabContent';
import { GoalsTabContent } from '@/components/health/GoalsTabContent';
import { SwapsTabContent } from '@/components/health/SwapsTabContent';
import { HistoryTabContent } from '@/components/health/HistoryTabContent';
import { useRTL } from '@/contexts/RTLContext';
import { useUserHealth } from '@/hooks/useUserHealth';

export default function HealthTrackingHomePage() {
    const { t } = useRTL();
    const userHealthHook = useUserHealth();

    const [dailyNutritionData, setDailyNutritionData] = useState([]);
    const [currentNutritionSummary, setCurrentNutritionSummary] = useState({
        calories: { consumed: 0, target: 2000 },
        protein: { consumed: 0, target: 120 },
        carbs: { consumed: 0, target: 240 },
        fat: { consumed: 0, target: 65 },
    });
    const [recentMeals, setRecentMeals] = useState([]);

    const mockWeeklyNutritionChartData = useMemo(() => ([
        { date: 'Mon', calories: 1800, protein: 85, carbs: 210, fat: 55 },
        { date: 'Tue', calories: 2100, protein: 95, carbs: 240, fat: 60 },
        { date: 'Wed', calories: 1950, protein: 90, carbs: 225, fat: 58 },
        { date: 'Thu', calories: 2000, protein: 92, carbs: 230, fat: 59 },
        { date: 'Fri', calories: 1900, protein: 88, carbs: 220, fat: 57 },
        { date: 'Sat', calories: 2200, protein: 100, carbs: 250, fat: 62 },
        { date: 'Sun', calories: 1850, protein: 86, carbs: 215, fat: 56 },
    ]), []);

    useEffect(() => {
        const initialCalories = mockWeeklyNutritionChartData.reduce((sum, d) => sum + d.calories, 0) / mockWeeklyNutritionChartData.length;
        const initialProtein = mockWeeklyNutritionChartData.reduce((sum, d) => sum + d.protein, 0) / mockWeeklyNutritionChartData.length;
        const initialCarbs = mockWeeklyNutritionChartData.reduce((sum, d) => sum + d.carbs, 0) / mockWeeklyNutritionChartData.length;
        const initialFat = mockWeeklyNutritionChartData.reduce((sum, d) => sum + d.fat, 0) / mockWeeklyNutritionChartData.length;

        setCurrentNutritionSummary(prev => ({
            calories: { ...prev.calories, consumed: Math.round(initialCalories * 0.7) },
            protein: { ...prev.protein, consumed: Math.round(initialProtein * 0.7) },
            carbs: { ...prev.carbs, consumed: Math.round(initialCarbs * 0.7) },
            fat: { ...prev.fat, consumed: Math.round(initialFat * 0.7) },
        }));

        setRecentMeals([
            { id: 1, type: t('Breakfast', 'إفطار'), time: t('Yesterday, 8:30 AM', 'الأمس، 8:30 صباحًا'), calories: 450, macros: { protein: 25, carbs: 45, fat: 15 } },
            { id: 2, type: t('Lunch', 'غداء'), time: t('Yesterday, 1:00 PM', 'الأمس، 1:00 مساءً'), calories: 600, macros: { protein: 35, carbs: 60, fat: 20 } },
            { id: 3, type: t('Dinner', 'عشاء'), time: t('Yesterday, 7:00 PM', 'الأمس، 7:00 مساءً'), calories: 500, macros: { protein: 30, carbs: 50, fat: 18 } },
        ]);
    }, [mockWeeklyNutritionChartData, t]);

    const handleApplyTip = useCallback((tip: any) => {
        console.log('Applied tip:', tip);
        alert(t('Tip applied! (In a real app, this would update your goals/plan)', 'تم تطبيق النصيحة! (في تطبيق حقيقي، سيتم تحديث أهدافك/خطتك)'));
    }, [t]);

    const handleNutritionSubmit = useCallback((data: any) => {
        console.log('Nutrition data submitted:', data);

        setCurrentNutritionSummary(prev => ({
            calories: { ...prev.calories, consumed: prev.calories.consumed + data.calories },
            protein: { ...prev.protein, consumed: prev.protein.consumed + data.protein },
            carbs: { ...prev.carbs, consumed: prev.carbs.consumed + data.carbs },
            fat: { ...prev.fat, consumed: prev.fat.consumed + data.fat },
        }));

        setDailyNutritionData(prev => {
            const today = new Date().toDateString();
            const existingEntryIndex = prev.findIndex((entry: any) => entry.date === today);

            if (existingEntryIndex > -1) {
                const updatedEntries = [...prev];
                updatedEntries[existingEntryIndex] = {
                    ...updatedEntries[existingEntryIndex],
                    calories: updatedEntries[existingEntryIndex].calories + data.calories,
                    protein: updatedEntries[existingEntryIndex].protein + data.protein,
                    carbs: updatedEntries[existingEntryIndex].carbs + data.carbs,
                    fat: updatedEntries[existingEntryIndex].fat + data.fat,
                };
                return updatedEntries;
            } else {
                return [...prev, {
                    date: today,
                    calories: data.calories,
                    protein: data.protein,
                    carbs: data.carbs,
                    fat: data.fat,
                }];
            }
        });

        setRecentMeals(prev => [
            {
                id: prev.length + 1,
                type: data.mealType || t('Meal', 'وجبة'),
                time: t('Just now', 'الآن') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                calories: data.calories,
                macros: { protein: data.protein, carbs: data.carbs, fat: data.fat },
            },
            ...prev.slice(0, 2),
        ]);

        alert(t('Nutrition data added successfully!', 'تمت إضافة بيانات التغذية بنجاح!'));
    }, [t]);

    const ingredientSwaps = useMemo(() => ([
        {
            original: 'Butter',
            alternatives: [
                { name: 'Olive Oil', benefits: 'Heart-healthy fats, less saturated fat', ratio: '3/4 cup for 1 cup butter' },
                { name: 'Greek Yogurt', benefits: 'Lower fat, higher protein', ratio: '1/2 cup for 1 cup butter' },
                { name: 'Applesauce', benefits: 'No fat, adds moisture', ratio: '1 cup for 1 cup butter' },
            ],
        },
        {
            original: 'Sugar',
            alternatives: [
                { name: 'Honey', benefits: 'Natural sweetener, contains antioxidants', ratio: '3/4 cup for 1 cup sugar' },
                { name: 'Maple Syrup', benefits: 'Contains minerals, lower glycemic index', ratio: '3/4 cup for 1 cup sugar' },
                { name: 'Stevia', benefits: 'Zero calories, natural sweetener', ratio: '1 tsp for 1 cup sugar' },
            ],
        },
        {
            original: 'White Flour',
            alternatives: [
                { name: 'Almond Flour', benefits: 'Low carb, high protein, gluten-free', ratio: '1:1 replacement' },
                { name: 'Coconut Flour', benefits: 'High fiber, low carb', ratio: '1/4 cup for 1 cup flour' },
                { name: 'Whole Wheat Flour', benefits: 'More fiber and nutrients', ratio: '1:1 replacement' },
            ],
        },
    ]), []);

    const combinedChartData = useMemo(() => {
        const today = new Date().toDateString();
        const todayData = dailyNutritionData.find((d: any) => d.date === today);

        const mappedMockData = mockWeeklyNutritionChartData.map(d => {
            const dayOfWeekIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(d.date);
            const todayIndex = new Date().getDay();
            const diff = dayOfWeekIndex - todayIndex;
            const date = new Date();
            date.setDate(date.getDate() + diff);
            return { ...d, date: date.toDateString() };
        });

        const chartData = mappedMockData.filter(d => d.date !== today);
        if (todayData) {
            chartData.push({ ...todayData, date: today });
        } else {
            const averageToday = mockWeeklyNutritionChartData[new Date().getDay() % 7];
            chartData.push({ ...averageToday, date: today })
        }

        return chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [mockWeeklyNutritionChartData, dailyNutritionData]);

    return (
        <PageContainer header={{ title: t('Health & Tracking', 'الصحة والتتبع'), showBackButton: true }}>
            <div className="space-y-6 pb-20">
                <NutritionTip
                    tip={t(
                        "Based on your recent activity and diet patterns, I recommend increasing protein intake by 15g daily while reducing carbs slightly to help reach your weight goal of 65kg.",
                        "بناءً على أنماط نشاطك ونظامك الغذائي الأخيرة، أوصي بزيادة تناول البروتين بمقدار 15 جرام يوميًا مع تقليل الكربوهيدرات قليلاً للمساعدة في الوصول إلى هدفك في الوزن وهو 65 كجم."
                    )}
                    onApply={handleApplyTip}
                    type="ai"
                />

                <BMICalculator />

                <DailyChallengesManager />

                <Tabs defaultValue="track">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="track" aria-label={t('Track', 'تتبع')}>
                            <Activity className="h-4 w-4 mr-1" />
                            {t('Track', 'تتبع')}
                        </TabsTrigger>
                        <TabsTrigger value="goals" aria-label={t('Goals', 'الأهداف')}>
                            <Scale className="h-4 w-4 mr-1" />
                            {t('Goals', 'الأهداف')}
                        </TabsTrigger>
                        <TabsTrigger value="swaps" aria-label={t('Swaps', 'البدائل')}>
                            <ArrowLeftRight className="h-4 w-4 mr-1" />
                            {t('Swaps', 'البدائل')}
                        </TabsTrigger>
                        <TabsTrigger value="history" aria-label={t('History', 'السجل')}>
                            <CalendarDays className="h-4 w-4 mr-1" />
                            {t('History', 'السجل')}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="track">
                        <TrackingTabContent
                            currentNutritionSummary={currentNutritionSummary}
                            onNutritionSubmit={handleNutritionSubmit}
                            t={t}
                        />
                    </TabsContent>

                    <TabsContent value="goals">
                        <GoalsTabContent t={t} />
                    </TabsContent>

                    <TabsContent value="swaps">
                        <SwapsTabContent ingredientSwaps={ingredientSwaps} t={t} />
                    </TabsContent>

                    <TabsContent value="history">
                        <HistoryTabContent
                            combinedChartData={combinedChartData}
                            recentMeals={recentMeals}
                            t={t}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </PageContainer>
    );
}
