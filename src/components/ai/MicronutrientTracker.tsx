
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Minus, Activity, TrendingUp, Award } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

interface Micronutrient {
  name: string;
  nameAr: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

const MicronutrientTracker = () => {
  const { t, direction } = useRTL();
  
  const [micronutrients, setMicronutrients] = useState<Micronutrient[]>([
    { name: 'Vitamin C', nameAr: 'فيتامين ج', current: 45, target: 90, unit: 'mg', color: 'bg-orange-500' },
    { name: 'Vitamin D', nameAr: 'فيتامين د', current: 15, target: 20, unit: 'µg', color: 'bg-yellow-500' },
    { name: 'Iron', nameAr: 'الحديد', current: 12, target: 18, unit: 'mg', color: 'bg-red-500' },
    { name: 'Calcium', nameAr: 'الكالسيوم', current: 800, target: 1000, unit: 'mg', color: 'bg-blue-500' },
    { name: 'Magnesium', nameAr: 'المغنيسيوم', current: 280, target: 400, unit: 'mg', color: 'bg-green-500' },
    { name: 'Zinc', nameAr: 'الزنك', current: 8, target: 11, unit: 'mg', color: 'bg-purple-500' },
  ]);

  const [newAmount, setNewAmount] = useState<number | "">("");
  const [selectedNutrient, setSelectedNutrient] = useState<number | null>(null);

  const updateNutrient = (index: number, amount: number) => {
    const updatedNutrients = [...micronutrients];
    updatedNutrients[index].current = Math.max(0, updatedNutrients[index].current + amount);
    setMicronutrients(updatedNutrients);
    
    const nutrient = updatedNutrients[index];
    const percentage = (nutrient.current / nutrient.target) * 100;
    
    if (percentage >= 100) {
      toast({
        title: t("Target Reached!", "تم الوصول للهدف!"),
        description: t(`You've reached your daily ${nutrient.name} goal!`, `لقد حققت هدفك اليومي من ${nutrient.nameAr}!`),
      });
    }
  };

  const addCustomAmount = () => {
    if (selectedNutrient !== null && newAmount !== "" && newAmount > 0) {
      updateNutrient(selectedNutrient, Number(newAmount));
      setNewAmount("");
      setSelectedNutrient(null);
    }
  };

  const getOverallProgress = () => {
    const totalProgress = micronutrients.reduce((sum, nutrient) => {
      return sum + Math.min((nutrient.current / nutrient.target) * 100, 100);
    }, 0);
    return Math.round(totalProgress / micronutrients.length);
  };

  const getCompletedCount = () => {
    return micronutrients.filter(n => n.current >= n.target).length;
  };

  return (
    <PageContainer header={{ title: t('Micronutrient Tracker', 'متتبع المغذيات الدقيقة'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        
        {/* Header Stats */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{t('Daily Progress', 'التقدم اليومي')}</h1>
              <p className="opacity-90">{t('Track your essential micronutrients', 'تتبع المغذيات الدقيقة الأساسية')}</p>
            </div>
            <Activity className="h-12 w-12 opacity-80" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">{t('Overall Progress', 'التقدم العام')}</span>
              </div>
              <div className="text-2xl font-bold">{getOverallProgress()}%</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">{t('Completed', 'مكتمل')}</span>
              </div>
              <div className="text-2xl font-bold">{getCompletedCount()}/{micronutrients.length}</div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{t('Daily Goal Progress', 'تقدم الهدف اليومي')}</span>
              <span className="text-sm text-gray-600">{getOverallProgress()}%</span>
            </div>
            <Progress value={getOverallProgress()} className="h-3" />
          </CardContent>
        </Card>

        {/* Micronutrients List */}
        <div className="space-y-4">
          {micronutrients.map((nutrient, index) => {
            const percentage = Math.min((nutrient.current / nutrient.target) * 100, 100);
            const isCompleted = nutrient.current >= nutrient.target;
            
            return (
              <Card key={index} className={`${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${nutrient.color}`} />
                      <div>
                        <h3 className="font-medium">{direction === 'rtl' ? nutrient.nameAr : nutrient.name}</h3>
                        <p className="text-sm text-gray-600">
                          {nutrient.current.toFixed(1)} / {nutrient.target} {nutrient.unit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCompleted && <Badge variant="default" className="bg-green-500">{t('Complete', 'مكتمل')}</Badge>}
                      <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                  
                  <Progress value={percentage} className="mb-3 h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateNutrient(index, -5)}
                        disabled={nutrient.current <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-gray-500">-5 {nutrient.unit}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedNutrient(selectedNutrient === index ? null : index)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateNutrient(index, 5)}
                      >
                        +5 {nutrient.unit}
                      </Button>
                    </div>
                  </div>
                  
                  {selectedNutrient === index && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder={`${t('Amount', 'الكمية')} (${nutrient.unit})`}
                          value={newAmount}
                          onChange={(e) => setNewAmount(e.target.value === "" ? "" : Number(e.target.value))}
                          className="flex-1"
                        />
                        <Button onClick={addCustomAmount} size="sm">
                          {t('Add', 'إضافة')}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('Quick Tips', 'نصائح سريعة')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• {t('Vitamin C: Citrus fruits, berries, bell peppers', 'فيتامين ج: الحمضيات، التوت، الفلفل الحلو')}</p>
              <p>• {t('Vitamin D: Sunlight, fatty fish, fortified foods', 'فيتامين د: أشعة الشمس، الأسماك الدهنية، الأطعمة المدعمة')}</p>
              <p>• {t('Iron: Red meat, spinach, lentils', 'الحديد: اللحوم الحمراء، السبانخ، العدس')}</p>
              <p>• {t('Calcium: Dairy products, leafy greens, almonds', 'الكالسيوم: منتجات الألبان، الخضار الورقية، اللوز')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MicronutrientTracker;
