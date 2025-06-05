// src/pages/MicronutrientTracker.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Loader2, PlusCircle, PieChart, FlaskConical } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';

interface LoggedFood {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  micronutrients: { [key: string]: { amount: number; unit: string } };
}

const mockMicronutrientData: { [food: string]: LoggedFood['micronutrients'] } = {
  "apple": {
    "Vitamin C": { amount: 8.4, unit: "mg" },
    "Potassium": { amount: 195, unit: "mg" },
    "Fiber": { amount: 2.4, unit: "g" },
  },
  "spinach (cooked)": {
    "Vitamin K": { amount: 483, unit: "mcg" },
    "Vitamin A": { amount: 5626, unit: "IU" },
    "Folate": { amount: 131, unit: "mcg" },
    "Iron": { amount: 3.6, unit: "mg" },
  },
  "chicken breast": {
    "Niacin (B3)": { amount: 11.4, unit: "mg" },
    "Vitamin B6": { amount: 0.6, unit: "mg" },
    "Selenium": { amount: 30, unit: "mcg" },
    "Phosphorus": { amount: 246, unit: "mg" },
  },
  "almonds": {
    "Vitamin E": { amount: 7.3, unit: "mg" },
    "Magnesium": { amount: 76, unit: "mg" },
    "Manganese": { amount: 0.6, unit: "mg" },
  },
  "milk": {
    "Calcium": { amount: 300, unit: "mg" },
    "Vitamin D": { amount: 100, unit: "IU" },
    "Vitamin B12": { amount: 1.2, unit: "mcg" },
  }
};

const MicronutrientTracker = () => {
  const { t, direction } = useRTL();
  const [foodItem, setFoodItem] = useState('');
  const [quantity, setQuantity] = useState<number | ''>(100);
  const [unit, setUnit] = useState('grams');
  const [loggedFoods, setLoggedFoods] = useState<LoggedFood[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const units = [
    { value: 'grams', label: t('Grams', 'جرام') },
    { value: 'ml', label: t('ml', 'مل') },
    { value: 'cups', label: t('Cups', 'كوب') },
    { value: 'units', label: t('Units', 'وحدات') },
  ];

  const handleAddFood = async () => {
    if (!foodItem.trim() || quantity === '' || quantity <= 0) {
      toast({
        title: t('Missing Information', 'معلومات مفقودة'),
        description: t('Please enter a valid food item and quantity.', 'الرجاء إدخال عنصر غذائي وكمية صالحة.'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call for nutrition data
    await new Promise(resolve => setTimeout(800, resolve));

    const lowerFoodItem = foodItem.toLowerCase();
    const mockDataKey = Object.keys(mockMicronutrientData).find(key => lowerFoodItem.includes(key));
    const micronutrients = mockDataKey ? mockMicronutrientData[mockDataKey] : {};

    if (!mockDataKey) {
        toast({
            title: t('No detailed data', 'لا توجد بيانات تفصيلية'),
            description: t('Could not find detailed micronutrient data for this item in mock.', 'لم يتم العثور على بيانات المغذيات الدقيقة التفصيلية لهذا العنصر في البيانات الوهمية.'),
            variant: 'default',
        });
    }

    const newLoggedFood: LoggedFood = {
      id: Date.now().toString(),
      name: foodItem,
      quantity: Number(quantity),
      unit: unit,
      micronutrients: Object.fromEntries(
        Object.entries(micronutrients).map(([key, val]) => [
          key,
          { amount: val.amount * (Number(quantity) / 100), unit: val.unit } // Scale for 100g base
        ])
      )
    };

    setLoggedFoods(prev => [...prev, newLoggedFood]);
    setFoodItem('');
    setQuantity(100);
    setUnit('grams');
    setIsLoading(false);

    toast({
      title: t('Food Added', 'تمت إضافة الطعام'),
      description: t(`${newLoggedFood.name} added to your log.`, `تمت إضافة ${newLoggedFood.name} إلى سجلك.`),
    });
  };

  const calculateTotalMicronutrients = () => {
    const totals: { [key: string]: { amount: number; unit: string } } = {};
    loggedFoods.forEach(food => {
      Object.entries(food.micronutrients).forEach(([nutrientName, data]) => {
        if (!totals[nutrientName]) {
          totals[nutrientName] = { amount: 0, unit: data.unit };
        }
        totals[nutrientName].amount += data.amount;
      });
    });
    return totals;
  };

  const totalMicronutrients = calculateTotalMicronutrients();

  return (
    <PageContainer header={{ title: t('Micronutrient Tracker', 'متتبع المغذيات الدقيقة'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-lg text-white text-center mb-6">
          <FlaskConical className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Track Your Vitamins & Minerals', 'تتبع فيتاميناتك ومعادنك')}</h1>
          <p className="opacity-90">{t('Monitor your daily intake of essential micronutrients.', 'راقب تناولك اليومي من المغذيات الدقيقة الأساسية.')}</p>
        </div>

        <Card>
          <CardHeader className={`px-0 pt-0 pb-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
            <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
              <PlusCircle className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
              {t('Log a Food Item', 'سجل عنصرًا غذائيًا')}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <div>
              <label htmlFor="food-item" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Food Item', 'عنصر غذائي')}
              </label>
              <Input
                id="food-item"
                placeholder={t('e.g., Apple, Cooked Spinach, Chicken Breast', 'مثال: تفاح، سبانخ مطبوخة، صدر دجاج')}
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
                className="bg-white dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-end space-x-2 rtl:space-x-reverse">
              <div className="flex-1">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('Quantity', 'الكمية')}
                </label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="bg-white dark:bg-gray-700 dark:text-white"
                  min="1"
                  disabled={isLoading}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('Unit', 'الوحدة')}
                </label>
                <Select value={unit} onValueChange={setUnit} disabled={isLoading}>
                  <SelectTrigger id="unit" className="bg-white dark:bg-gray-700 dark:text-white">
                    <SelectValue placeholder={t('Select unit', 'اختر الوحدة')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
                      {units.map((u) => (
                          <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleAddFood}
              disabled={isLoading || !foodItem.trim() || quantity === ''}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Adding...', 'جاري الإضافة...')}
                </>
              ) : (
                <>
                  <PlusCircle className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Add to Log', 'أضف إلى السجل')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {loggedFoods.length > 0 && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <PieChart className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Today\'s Micronutrient Summary', 'ملخص المغذيات الدقيقة لليوم')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-3">{t('Logged Foods:', 'الأطعمة المسجلة:')}</h3>
              <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                {loggedFoods.map(food => (
                  <li key={food.id}>{food.name} ({food.quantity} {food.unit})</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">{t('Total Micronutrients:', 'إجمالي المغذيات الدقيقة:')}</h3>
              {Object.keys(totalMicronutrients).length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  {t('No detailed micronutrient data for logged items yet.', 'لا توجد بيانات تفصيلية للمغذيات الدقيقة للعناصر المسجلة بعد.')}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                  {Object.entries(totalMicronutrients).map(([nutrientName, data]) => (
                    <div key={nutrientName} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                      <span className="font-medium">{nutrientName}:</span>
                      <span>{data.amount.toFixed(2)} {data.unit}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default MicronutrientTracker;
