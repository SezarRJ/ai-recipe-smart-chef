import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Target, TrendingUp, Heart, Zap, Shield } from 'lucide-react';

interface NutritionalData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  cholesterol: number;
  saturatedFat: number;
  transFat: number;
  polyunsaturatedFat: number;
  monounsaturatedFat: number;
  calcium: number;
  iron: number;
  potassium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  thiamine: number;
  riboflavin: number;
  niacin: number;
  vitaminB6: number;
  folate: number;
  vitaminB12: number;
  phosphorus: number;
  magnesium: number;
  zinc: number;
  selenium: number;
}

interface NutritionalInfoProps {
  nutrition: Partial<NutritionalData>;
  servings?: number;
  dailyValues?: boolean;
}

export const NutritionalInfo: React.FC<NutritionalInfoProps> = ({
  nutrition,
  servings = 1,
  dailyValues = true
}) => {
  // Daily Value percentages (based on 2000 calorie diet)
  const dailyValueTargets = {
    calories: 2000,
    protein: 50,
    carbs: 300,
    fat: 65,
    fiber: 25,
    sugar: 50,
    sodium: 2300,
    cholesterol: 300,
    saturatedFat: 20,
    calcium: 1000,
    iron: 18,
    potassium: 3500,
    vitaminA: 900,
    vitaminC: 90,
    vitaminD: 20,
    vitaminE: 15,
    vitaminK: 120,
    thiamine: 1.2,
    riboflavin: 1.3,
    niacin: 16,
    vitaminB6: 1.7,
    folate: 400,
    vitaminB12: 2.4,
    phosphorus: 1000,
    magnesium: 400,
    zinc: 11,
    selenium: 55
  };

  const calculateDV = (nutrient: keyof typeof dailyValueTargets, amount: number) => {
    const target = dailyValueTargets[nutrient];
    return Math.round((amount / target) * 100);
  };

  const macronutrients = [
    {
      name: 'Calories',
      value: nutrition.calories || 0,
      unit: 'kcal',
      color: 'bg-blue-500',
      icon: <Zap className="h-4 w-4" />,
      dv: dailyValues ? calculateDV('calories', nutrition.calories || 0) : null
    },
    {
      name: 'Protein',
      value: nutrition.protein || 0,
      unit: 'g',
      color: 'bg-red-500',
      icon: <Target className="h-4 w-4" />,
      dv: dailyValues ? calculateDV('protein', nutrition.protein || 0) : null
    },
    {
      name: 'Carbohydrates',
      value: nutrition.carbs || 0,
      unit: 'g',
      color: 'bg-yellow-500',
      icon: <Activity className="h-4 w-4" />,
      dv: dailyValues ? calculateDV('carbs', nutrition.carbs || 0) : null
    },
    {
      name: 'Fat',
      value: nutrition.fat || 0,
      unit: 'g',
      color: 'bg-purple-500',
      icon: <Heart className="h-4 w-4" />,
      dv: dailyValues ? calculateDV('fat', nutrition.fat || 0) : null
    }
  ];

  const micronutrients = [
    { name: 'Fiber', value: nutrition.fiber || 0, unit: 'g', target: 'fiber' },
    { name: 'Sugar', value: nutrition.sugar || 0, unit: 'g', target: 'sugar' },
    { name: 'Sodium', value: nutrition.sodium || 0, unit: 'mg', target: 'sodium' },
    { name: 'Cholesterol', value: nutrition.cholesterol || 0, unit: 'mg', target: 'cholesterol' },
    { name: 'Saturated Fat', value: nutrition.saturatedFat || 0, unit: 'g', target: 'saturatedFat' },
    { name: 'Trans Fat', value: nutrition.transFat || 0, unit: 'g', target: null },
    { name: 'Polyunsaturated Fat', value: nutrition.polyunsaturatedFat || 0, unit: 'g', target: null },
    { name: 'Monounsaturated Fat', value: nutrition.monounsaturatedFat || 0, unit: 'g', target: null }
  ];

  const vitamins = [
    { name: 'Vitamin A', value: nutrition.vitaminA || 0, unit: 'µg', target: 'vitaminA' },
    { name: 'Vitamin C', value: nutrition.vitaminC || 0, unit: 'mg', target: 'vitaminC' },
    { name: 'Vitamin D', value: nutrition.vitaminD || 0, unit: 'µg', target: 'vitaminD' },
    { name: 'Vitamin E', value: nutrition.vitaminE || 0, unit: 'mg', target: 'vitaminE' },
    { name: 'Vitamin K', value: nutrition.vitaminK || 0, unit: 'µg', target: 'vitaminK' },
    { name: 'Thiamine (B1)', value: nutrition.thiamine || 0, unit: 'mg', target: 'thiamine' },
    { name: 'Riboflavin (B2)', value: nutrition.riboflavin || 0, unit: 'mg', target: 'riboflavin' },
    { name: 'Niacin (B3)', value: nutrition.niacin || 0, unit: 'mg', target: 'niacin' },
    { name: 'Vitamin B6', value: nutrition.vitaminB6 || 0, unit: 'mg', target: 'vitaminB6' },
    { name: 'Folate', value: nutrition.folate || 0, unit: 'µg', target: 'folate' },
    { name: 'Vitamin B12', value: nutrition.vitaminB12 || 0, unit: 'µg', target: 'vitaminB12' }
  ];

  const minerals = [
    { name: 'Calcium', value: nutrition.calcium || 0, unit: 'mg', target: 'calcium' },
    { name: 'Iron', value: nutrition.iron || 0, unit: 'mg', target: 'iron' },
    { name: 'Potassium', value: nutrition.potassium || 0, unit: 'mg', target: 'potassium' },
    { name: 'Phosphorus', value: nutrition.phosphorus || 0, unit: 'mg', target: 'phosphorus' },
    { name: 'Magnesium', value: nutrition.magnesium || 0, unit: 'mg', target: 'magnesium' },
    { name: 'Zinc', value: nutrition.zinc || 0, unit: 'mg', target: 'zinc' },
    { name: 'Selenium', value: nutrition.selenium || 0, unit: 'µg', target: 'selenium' }
  ];

  const getDVColor = (dv: number) => {
    if (dv < 5) return 'text-gray-500';
    if (dv < 20) return 'text-yellow-600';
    if (dv < 100) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Nutrition Facts Header */}
      <Card>
        <CardHeader className="border-b-2 border-black">
          <CardTitle className="text-2xl font-bold">Nutrition Facts</CardTitle>
          <div className="text-sm">
            {servings} serving{servings !== 1 ? 's' : ''} per container
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-b-8 border-black p-4">
            <div className="flex justify-between items-end">
              <span className="text-xl font-bold">Calories</span>
              <span className="text-4xl font-bold">{nutrition.calories || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macronutrients Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Macronutrients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {macronutrients.map((macro) => (
              <div key={macro.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {macro.icon}
                    <span className="font-medium">{macro.name}</span>
                  </div>
                  {macro.dv && (
                    <Badge variant="outline" className={getDVColor(macro.dv)}>
                      {macro.dv}% DV
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span>{macro.value}{macro.unit}</span>
                </div>
                {macro.dv && (
                  <Progress 
                    value={Math.min(macro.dv, 100)} 
                    className={`h-2 ${macro.color}`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Nutrients */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Other Nutrients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Other Nutrients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {micronutrients.map((nutrient) => (
                <div key={nutrient.name} className="flex justify-between items-center">
                  <span className="text-sm">{nutrient.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{nutrient.value}{nutrient.unit}</span>
                    {nutrient.target && dailyValues && (
                      <Badge variant="outline" className={getDVColor(calculateDV(nutrient.target as keyof typeof dailyValueTargets, nutrient.value))}>
                        {calculateDV(nutrient.target as keyof typeof dailyValueTargets, nutrient.value)}% DV
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vitamins */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Vitamins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vitamins.map((vitamin) => (
                <div key={vitamin.name} className="flex justify-between items-center">
                  <span className="text-sm">{vitamin.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{vitamin.value}{vitamin.unit}</span>
                    {vitamin.target && dailyValues && (
                      <Badge variant="outline" className={getDVColor(calculateDV(vitamin.target as keyof typeof dailyValueTargets, vitamin.value))}>
                        {calculateDV(vitamin.target as keyof typeof dailyValueTargets, vitamin.value)}% DV
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Minerals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Minerals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {minerals.map((mineral) => (
              <div key={mineral.name} className="flex justify-between items-center">
                <span className="text-sm">{mineral.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{mineral.value}{mineral.unit}</span>
                  {mineral.target && dailyValues && (
                    <Badge variant="outline" className={getDVColor(calculateDV(mineral.target as keyof typeof dailyValueTargets, mineral.value))}>
                      {calculateDV(mineral.target as keyof typeof dailyValueTargets, mineral.value)}% DV
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Values Note */}
      {dailyValues && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <p className="text-xs text-gray-600">
              * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 
              2,000 calories a day is used for general nutrition advice. Your daily values may be higher or lower 
              depending on your calorie needs.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
