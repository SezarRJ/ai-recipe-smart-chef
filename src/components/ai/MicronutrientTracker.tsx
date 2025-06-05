// src/components/ai/MicronutrientTracker.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Loader2, Utensils, CheckCircle, AlertTriangle } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutrientRecommendation {
  nutrient: string;
  recommendedAmount: string;
  actualAmount: number;
  status: 'met' | 'low' | 'high';
}

const MicronutrientTracker = () => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState<number | ''>('');
  const [protein, setProtein] = useState<number | ''>('');
  const [carbs, setCarbs] = useState<number | ''>('');
  const [fat, setFat] = useState<number | ''>('');
  const [currentEntries, setCurrentEntries] = useState<FoodEntry[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [recommendations, setRecommendations] = useState<NutrientRecommendation[]>([]);
  const { t, direction } = useRTL();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const handleAddFood = () => {
    if (!foodName.trim() || calories === '' || protein === '' || carbs === '' || fat === '') {
      toast({
        title: t('Missing Information', 'معلومات مفقودة'),
        description: t('Please fill in all fields.', 'الرجاء ملء جميع الحقول.'),
        variant: 'destructive',
      });
      return;
    }

    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name: foodName,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
    };

    setCurrentEntries(prev => [...prev, newEntry]);
    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  const handleRemoveFood = (id: string) => {
    setCurrentEntries(prev => prev.filter(entry => entry.id !== id));
    setRecommendations([]);
    setHasAnalyzed(false);
  };

  const handleAnalyzeNutrition = async () => {
    if (currentEntries.length === 0) {
      toast({
        title: t('No entries found', 'لا توجد إدخالات'),
        description: t('Please add some foods to analyze.', 'الرجاء إضافة بعض الأطعمة للتحليل.'),
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setHasAnalyzed(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock AI-driven analysis and recommendations
    const totalProtein = currentEntries.reduce((sum, entry) => sum + entry.protein, 0);
    const totalCarbs = currentEntries.reduce((sum, entry) => sum + entry.carbs, 0);
    const totalFat = currentEntries.reduce((sum, entry) => sum + entry.fat, 0);

    const mockRecommendations: NutrientRecommendation[] = [
      {
        nutrient: t('Protein', 'بروتين'),
        recommendedAmount: '50-60g',
        actualAmount: totalProtein,
        status: totalProtein >= 50 && totalProtein <= 60 ? 'met' : totalProtein < 50 ? 'low' : 'high',
      },
      {
        nutrient: t('Carbohydrates', 'الكربوهيدرات'),
        recommendedAmount: '225-325g',
        actualAmount: totalCarbs,
        status: totalCarbs >= 225 && totalCarbs <= 325 ? 'met' : totalCarbs < 225 ? 'low' : 'high',
      },
      {
        nutrient: t('Fat', 'الدهون'),
        recommendedAmount: '44-78g',
        actualAmount: totalFat,
        status: totalFat >= 44 && totalFat <= 78 ? 'met' : totalFat < 44 ? 'low' : 'high',
      },
    ];

    setRecommendations(mockRecommendations);
    setIsAnalyzing(false);
  };

  const pieChartData = [
    { name: t('Protein', 'بروتين'), value: recommendations.length > 0 ? recommendations[0].actualAmount : 0 },
    { name: t('Carbs', 'الكربوهيدرات'), value: recommendations.length > 0 ? recommendations[1].actualAmount : 0 },
    { name: t('Fat', 'الدهون'), value: recommendations.length > 0 ? recommendations[2].actualAmount : 0 },
  ];

  return (
    <PageContainer header={{ title: t('Micronutrient Tracker', 'متتبع المغذيات الدقيقة'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-lg text-white text-center mb-6">
          <Utensils className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Track Your Daily Nutrition', 'تتبع تغذيتك اليومية')}</h1>
          <p className="opacity-90">{t('Log your meals and get instant analysis of your micronutrient intake.', 'سجل وجباتك واحصل على تحليل فوري لتناول المغذيات الدقيقة.')}</p>
        </div>

        <Card>
          <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
            <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
              <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
              {t('Add Food Entry', 'إضافة وجبة')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <Input
              type="text"
              placeholder={t('Food Name', 'اسم الوجبة')}
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="bg-white dark:bg-gray-700 dark:text-white"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder={t('Calories', 'السعرات الحرارية')}
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
              />
              <Input
                type="number"
                placeholder={t('Protein (g)', 'بروتين (غ)')}
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
              />
              <Input
                type="number"
                placeholder={t('Carbs (g)', 'الكربوهيدرات (غ)')}
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
              />
              <Input
                type="number"
                placeholder={t('Fat (g)', 'الدهون (غ)')}
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button
              onClick={handleAddFood}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {t('Add Food', 'أضف وجبة')}
            </Button>
          </CardContent>
        </Card>

        {currentEntries.length > 0 && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Current Food Entries', 'قائمة الوجبات الحالية')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">{t('Food', 'اسم الوجبة')}</TableHead>
                    <TableHead>{t('Calories', 'السعرات الحرارية')}</TableHead>
                    <TableHead>{t('Protein', 'بروتين')}</TableHead>
                    <TableHead>{t('Carbs', 'الكربوهيدرات')}</TableHead>
                    <TableHead>{t('Fat', 'الدهون')}</TableHead>
                    <TableHead className="text-right">{t('Actions', 'إجراءات')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEntries.map(entry => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.name}</TableCell>
                      <TableCell>{entry.calories}</TableCell>
                      <TableCell>{entry.protein}</TableCell>
                      <TableCell>{entry.carbs}</TableCell>
                      <TableCell>{entry.fat}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveFood(entry.id)}>
                          {t('Remove', 'إزالة')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                onClick={handleAnalyzeNutrition}
                disabled={isAnalyzing}
                className="w-full mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                    {t('Analyzing...', 'جاري التحليل...')}
                  </>
                ) : (
                  t('Analyze Nutrition', 'تحليل التغذية')
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {hasAnalyzed && recommendations.length > 0 && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Nutrition Analysis', 'تحليل التغذية')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('Macronutrient Breakdown', 'تحليل المغذيات الكبيرة')}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('Recommendations', 'التوصيات')}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('Nutrient', 'المغذيات')}</TableHead>
                      <TableHead>{t('Recommended', 'الموصى بها')}</TableHead>
                      <TableHead>{t('Actual', 'الكمية الفعلية')}</TableHead>
                      <TableHead className="text-center">{t('Status', 'الحالة')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recommendations.map(item => (
                      <TableRow key={item.nutrient}>
                        <TableCell>{item.nutrient}</TableCell>
                        <TableCell>{item.recommendedAmount}</TableCell>
                        <TableCell>{item.actualAmount}g</TableCell>
                        <TableCell className="text-center">
                          {item.status === 'met' && (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" title={t('Met', 'تمت')} />
                          )}
                          {item.status === 'low' && (
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto" title={t('Low', 'منخفضة')} />
                          )}
                          {item.status === 'high' && (
                            <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" title={t('High', 'عالية')} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {hasAnalyzed && currentEntries.length === 0 && (
          <Card className="p-4 text-center text-gray-500 dark:text-gray-400">
            <p>{t('No food entries to analyze.', 'لا توجد وجبات لتحليلها.')}</p>
            <p className="mt-2 text-sm">{t('Add some food entries to get started.', 'أضف بعض الوجبات لتبدأ.')}</p>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default MicronutrientTracker;
