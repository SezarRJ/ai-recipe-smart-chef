
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NutritionGoals } from '@/components/nutrition/NutritionGoals';
import { ActionButton } from './ActionButton';
import { Target, Settings } from 'lucide-react';

interface GoalsTabContentProps {
  t: (english: string, arabic?: string) => string;
}

export const GoalsTabContent: React.FC<GoalsTabContentProps> = ({ t }) => (
  <div className="space-y-4 mt-4">
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
  </div>
);
