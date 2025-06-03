
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NutritionSummary } from '@/components/nutrition/NutritionSummary';
import { NutritionEntryForm } from '@/components/nutrition/NutritionEntryForm';
import { ActionButton } from './ActionButton';
import { Activity, Target } from 'lucide-react';

interface TrackingTabContentProps {
  currentNutritionSummary: {
    calories: { consumed: number; target: number };
    protein: { consumed: number; target: number };
    carbs: { consumed: number; target: number };
    fat: { consumed: number; target: number };
  };
  onNutritionSubmit: (data: any) => void;
  t: (english: string, arabic?: string) => string;
}

export const TrackingTabContent: React.FC<TrackingTabContentProps> = ({
  currentNutritionSummary,
  onNutritionSubmit,
  t
}) => (
  <div className="space-y-4 mt-4">
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
      <NutritionEntryForm onSubmit={onNutritionSubmit} />
    </div>

    <div className="flex flex-col gap-2">
      <ActionButton to="/health-tracking" icon={<Activity className="h-4 w-4" />}>
        {t('Detailed Tracking', 'التتبع التفصيلي')}
      </ActionButton>
      <ActionButton to="/body-information" variant="outline" icon={<Target className="h-4 w-4" />}>
        {t('Body Information', 'معلومات الجسم')}
      </ActionButton>
    </div>
  </div>
);
