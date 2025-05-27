
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { NutritionGoals } from '@/components/nutrition/NutritionGoals';
import { NutritionSummary } from '@/components/nutrition/NutritionSummary';
import { NutritionProgressChart } from '@/components/nutrition/NutritionProgressChart';
import { useToast } from '@/hooks/use-toast';

const NutritionGoalsPage: React.FC = () => {
  const { toast } = useToast();

  // Mock data for nutrition summary
  const mockSummaryData = {
    calories: { consumed: 1450, target: 2000 },
    protein: { consumed: 78, target: 100 },
    carbs: { consumed: 160, target: 250 },
    fat: { consumed: 42, target: 65 }
  };

  // Mock data for nutrition chart
  const mockChartData = [
    { date: 'Mon', calories: 1800, protein: 85, carbs: 220, fat: 58 },
    { date: 'Tue', calories: 1600, protein: 90, carbs: 180, fat: 45 },
    { date: 'Wed', calories: 1750, protein: 88, carbs: 200, fat: 52 },
    { date: 'Thu', calories: 1450, protein: 78, carbs: 160, fat: 42 },
    { date: 'Fri', calories: 1900, protein: 95, carbs: 230, fat: 60 },
    { date: 'Sat', calories: 2100, protein: 105, carbs: 260, fat: 70 },
    { date: 'Sun', calories: 1700, protein: 80, carbs: 190, fat: 55 }
  ];

  const handleSaveGoals = (goals: any) => {
    console.log("Saving nutrition goals:", goals);
    toast({
      title: "Goals Updated",
      description: "Your nutrition goals have been updated successfully."
    });
  };

  return (
    <PageContainer
      header={{
        title: 'Nutrition Goals',
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-20">
        <NutritionSummary {...mockSummaryData} />
        <NutritionProgressChart data={mockChartData} type="weekly" />
        <NutritionGoals onSave={handleSaveGoals} />
      </div>
    </PageContainer>
  );
};

export default NutritionGoalsPage;
