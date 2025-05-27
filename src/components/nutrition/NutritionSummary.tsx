
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface NutritionSummaryProps {
  calories: {
    consumed: number;
    target: number;
  };
  protein: {
    consumed: number;
    target: number;
  };
  carbs: {
    consumed: number;
    target: number;
  };
  fat: {
    consumed: number;
    target: number;
  };
}

export const NutritionSummary: React.FC<NutritionSummaryProps> = ({
  calories,
  protein,
  carbs,
  fat,
}) => {
  const calculatePercentage = (consumed: number, target: number) => {
    return Math.min(Math.round((consumed / target) * 100), 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-wasfah-deep-teal">Today's Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Calories</span>
              <span className="text-sm text-gray-500">
                {calories.consumed} / {calories.target} kcal
              </span>
            </div>
            <Progress value={calculatePercentage(calories.consumed, calories.target)} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Protein</span>
              <span className="text-sm text-gray-500">
                {protein.consumed} / {protein.target} g
              </span>
            </div>
            <Progress value={calculatePercentage(protein.consumed, protein.target)} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Carbs</span>
              <span className="text-sm text-gray-500">
                {carbs.consumed} / {carbs.target} g
              </span>
            </div>
            <Progress value={calculatePercentage(carbs.consumed, carbs.target)} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Fat</span>
              <span className="text-sm text-gray-500">
                {fat.consumed} / {fat.target} g
              </span>
            </div>
            <Progress value={calculatePercentage(fat.consumed, fat.target)} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
