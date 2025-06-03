
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NutritionProgressChart } from '@/components/nutrition/NutritionProgressChart';
import { ActionButton } from './ActionButton';
import { CalendarDays } from 'lucide-react';

interface HistoryTabContentProps {
  combinedChartData: any[];
  recentMeals: any[];
  t: (english: string, arabic?: string) => string;
}

export const HistoryTabContent: React.FC<HistoryTabContentProps> = ({
  combinedChartData,
  recentMeals,
  t
}) => (
  <div className="space-y-4 mt-4">
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
        recentMeals.map((meal: any) => (
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
  </div>
);
