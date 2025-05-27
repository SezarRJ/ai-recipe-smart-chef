
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface NutritionData {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  goal?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }
}

interface NutritionProgressChartProps {
  data: NutritionData[];
  type: 'daily' | 'weekly' | 'monthly';
}

export const NutritionProgressChart: React.FC<NutritionProgressChartProps> = ({ data, type }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-wasfah-deep-teal">
          {type === 'daily' ? 'Daily' : type === 'weekly' ? 'Weekly' : 'Monthly'} Nutrition Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="calories" name="Calories (kcal)" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="protein" name="Protein (g)" fill="#82ca9d" />
            <Bar yAxisId="right" dataKey="carbs" name="Carbs (g)" fill="#ffc658" />
            <Bar yAxisId="right" dataKey="fat" name="Fat (g)" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
