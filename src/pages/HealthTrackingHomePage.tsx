
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NutritionGoals } from '@/components/nutrition/NutritionGoals';
import { NutritionProgressChart } from '@/components/nutrition/NutritionProgressChart';
import { NutritionSummary } from '@/components/nutrition/NutritionSummary';
import { NutritionEntryForm } from '@/components/nutrition/NutritionEntryForm';
import { NutritionTip } from '@/components/nutrition/NutritionTip';
import { Activity, Scale, CalendarDays, ArrowLeftRight, Tag, Target, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DailyIndependenceChallenges } from '@/components/health/DailyIndependenceChallenges';
import { BMICalculator } from '@/components/health/BMICalculator';
import { useRTL } from '@/contexts/RTLContext';

// Mock for useUserHealth hook
const useUserHealthMock = () => {
    const [isHealthGoalsOpen, setIsHealthGoalsOpen] = useState(false);
    const [userWeight, setUserWeight] = useState(75); // Initial weight
    const [userHeight, setUserHeight] = useState(170); // Initial height in cm
    const [userTargetWeight, setUserTargetWeight] = useState(65); // Initial target weight

    // Simulate updating health goals
    const updateHealthGoals = useCallback(({ weight, height, targetWeight }) => {
        if (weight !== undefined) setUserWeight(weight);
        if (height !== undefined) setUserHeight(height);
        if (targetWeight !== undefined) setUserTargetWeight(targetWeight);
    }, []);

    return {
        isHealthGoalsOpen,
        setIsHealthGoalsOpen,
        userWeight,
        userHeight,
        userTargetWeight,
        updateHealthGoals, // Expose update function
    };
};

const IngredientSwapCard = ({ swap, t }) => (
    <Card className="border border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
            <h4 className="font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal flex items-center mb-3">
                <Tag className="h-4 w-4 mr-2" />
                {t('Instead of', 'بدلاً من')} <span className="text-wasfah-bright-teal ml-1">{swap.original}</span>, {t('try', 'جرب')}:
            </h4>
            <div className="space-y-3">
                {swap.alternatives.map((alt, altIdx) => (
                    <div key={altIdx} className="bg-wasfah-light-gray dark:bg-gray-800 p-3 rounded-md">
                        <div className="flex justify-between">
                            <h5 className="font-medium">{alt.name}</h5>
                            <span className="text-xs bg-wasfah-bright-teal text-white px-2 py-0.5 rounded-full">{alt.ratio}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alt.benefits}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const ActionButton = ({ to, children, variant = "default", icon }) => (
    <Link to={to}>
        <Button className={`w-full ${variant === "outline" ? "border-wasfah-bright-teal text-wasfah-bright-teal" : "bg-wasfah-bright-teal hover:bg-wasfah-teal"}`}>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </Button>
    </Link>
);

export default function HealthTrackingHomePage() {
    const { t } = useRTL();
    const {
        isHealthGoalsOpen,
        setIsHealthGoalsOpen,
        userWeight,
        userHeight,
        userTargetWeight,
        updateHealthGoals,
    } = useUserHealthMock();

    // --- State for Nutrition Tracking ---
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

    const handleApplyTip = useCallback((tip) => {
        console.log('Applied tip:', tip);
        alert(t('Tip applied! (In a real app, this would update your goals/plan)', 'تم تطبيق النصيحة! (في تطبيق حقيقي، سيتم تحديث أهدافك/خطتك)'));
    }, [t]);

    const handleNutritionSubmit = useCallback((data) => {
        console.log('Nutrition data submitted:', data);

        setCurrentNutritionSummary(prev => ({
            calories: { ...prev.calories, consumed: prev.calories.consumed + data.calories },
            protein: { ...prev.protein, consumed: prev.protein.consumed + data.protein },
            carbs: { ...prev.carbs, consumed: prev.carbs.consumed + data.carbs },
            fat: { ...prev.fat, consumed: prev.fat.consumed + data.fat },
        }));

        setDailyNutritionData(prev => {
            const today = new Date().toDateString();
            const existingEntryIndex = prev.findIndex(entry => entry.date === today);

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
        const todayData = dailyNutritionData.find(d => d.date === today);

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
                    source="Wasfah AI"
                    onApply={handleApplyTip}
                    type="ai"
                />

                <BMICalculator
                    userWeight={userWeight}
                    userHeight={userHeight}
                    userTargetWeight={userTargetWeight}
                    initialWeight={userWeight}
                    initialHeight={userHeight}
                    isHealthGoalsOpen={isHealthGoalsOpen}
                    setIsHealthGoalsOpen={setIsHealthGoalsOpen}
                    onUpdateGoals={updateHealthGoals}
                />

                <DailyIndependenceChallenges />

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

                    <TabsContent value="track" className="space-y-4 mt-4">
                        <Card className="border border-gray-200 dark:border-gray-700">
                            <CardContent className="pt-6">
                                <NutritionSummary
                                    calories={currentNutritionSummary.calories}
                                    protein={currentNutritionSummary.protein}
                                    carbs={currentNutritionSummary.carbs}
                                    fat={currentNutritionSummary.fat}
                                />
                            </CardContent>
                        </Card>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
                                {t("Add Today's Nutrition", "أضف التغذية اليوم")}
                            </h3>
                            <NutritionEntryForm onSubmit={handleNutritionSubmit} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <ActionButton to="/health-tracking" icon={<Activity className="h-4 w-4" />}>
                                {t('Detailed Tracking', 'التتبع التفصيلي')}
                            </ActionButton>
                            <ActionButton to="/body-information" variant="outline" icon={<Target className="h-4 w-4" />}>
                                {t('Body Information', 'معلومات الجسم')}
                            </ActionButton>
                        </div>
                    </TabsContent>

                    <TabsContent value="goals" className="space-y-4 mt-4">
                        <Card>
                            <CardContent className="pt-6">
                                <NutritionGoals
                                    initialGoals={{
                                        calories: 2000,
                                        protein: 100,
                                        carbs: 250,
                                        fat: 65,
                                        activityLevel: 'moderate',
                                        dietaryType: 'balanced'
                                    }}
                                />
                            </CardContent>
                        </Card>
                        <ActionButton to="/nutrition-goals" icon={<Target className="h-4 w-4" />}>
                            {t('Update Nutrition Goals', 'تحديث أهداف التغذية')}
                        </ActionButton>
                        <ActionButton to="/dietary-preferences" variant="outline" icon={<Settings className="h-4 w-4" />}>
                            {t('Manage Dietary Preferences', 'إدارة التفضيلات الغذائية')}
                        </ActionButton>
                    </TabsContent>

                    <TabsContent value="swaps" className="space-y-4 mt-4">
                        <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
                            {t('Healthier Ingredient Alternatives', 'بدائل المكونات الصحية')}
                        </h3>
                        <div className="space-y-4">
                            {ingredientSwaps.map((swap, index) => (
                                <IngredientSwapCard key={index} swap={swap} t={t} />
                            ))}
                        </div>
                        <ActionButton to="/ingredient-swap" icon={<ArrowLeftRight className="h-4 w-4" />}>
                            {t('View All Ingredient Swaps', 'عرض جميع بدائل المكونات')}
                        </ActionButton>
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4 mt-4">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal mb-2">
                                    {t('Weekly Progress', 'التقدم الأسبوعي')}
                                </h3>
                                {combinedChartData.length > 0 ? (
                                    <NutritionProgressChart data={combinedChartData} type="weekly" />
                                ) : (
                                    <p className="text-sm text-gray-500">{t('No data available', 'لا توجد بيانات متاحة')}</p>
                                )}
                            </CardContent>
                        </Card>
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
                                {t('Recent Meals', 'الوجبات الأخيرة')}
                            </h3>
                            {recentMeals.length > 0 ? (
                                recentMeals.map((meal) => (
                                    <Card key={meal.id} className="border border-gray-200 dark:border-gray-700">
                                        <CardContent className="p-3 flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{meal.type}</p>
                                                <p className="text-xs text-gray-500">{meal.time}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-wasfah-bright-teal">{meal.calories} kcal</p>
                                                <p className="text-xs text-gray-500">P: {meal.macros.protein}g | C: {meal.macros.carbs}g | F: {meal.macros.fat}g</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">{t('No recent meals added yet.', 'لم يتم إضافة وجبات حديثة بعد.')}</p>
                            )}
                        </div>
                        <ActionButton to="/health-tracking" icon={<CalendarDays className="h-4 w-4" />}>
                            {t('View Complete History', 'عرض السجل الكامل')}
                        </ActionButton>
                    </TabsContent>
                </Tabs>
            </div>
        </PageContainer>
    );
}
