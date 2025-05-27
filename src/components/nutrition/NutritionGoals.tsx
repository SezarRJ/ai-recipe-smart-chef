
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Save } from 'lucide-react';

interface NutritionGoalsProps {
  onSave?: (goals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    activityLevel: string;
    dietaryType: string;
  }) => void;
  initialGoals?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    activityLevel: string;
    dietaryType: string;
  };
  userTargetWeight?: number;
  userWeight?: number;
  userHeight?: number;
  onUpdateGoals?: ({ weight, height, targetWeight }: { weight: any; height: any; targetWeight: any; }) => void;
}

export const NutritionGoals: React.FC<NutritionGoalsProps> = ({
  onSave,
  initialGoals = {
    calories: 2000,
    protein: 100,
    carbs: 250,
    fat: 65,
    activityLevel: 'moderate',
    dietaryType: 'balanced'
  },
  userTargetWeight,
  userWeight,
  userHeight,
  onUpdateGoals
}) => {
  const [calories, setCalories] = useState(initialGoals.calories.toString());
  const [protein, setProtein] = useState(initialGoals.protein.toString());
  const [carbs, setCarbs] = useState(initialGoals.carbs.toString());
  const [fat, setFat] = useState(initialGoals.fat.toString());
  const [activityLevel, setActivityLevel] = useState(initialGoals.activityLevel);
  const [dietaryType, setDietaryType] = useState(initialGoals.dietaryType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSave) {
      onSave({
        calories: parseInt(calories),
        protein: parseInt(protein),
        carbs: parseInt(carbs),
        fat: parseInt(fat),
        activityLevel,
        dietaryType
      });
    }
  };

  const activityOptions = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'light', label: 'Light (1-3 days of exercise/week)' },
    { value: 'moderate', label: 'Moderate (3-5 days of exercise/week)' },
    { value: 'active', label: 'Active (6-7 days of exercise/week)' },
    { value: 'very_active', label: 'Very Active (twice daily exercise)' }
  ];

  const dietaryOptions = [
    { value: 'balanced', label: 'Balanced' },
    { value: 'high_protein', label: 'High Protein' },
    { value: 'low_carb', label: 'Low Carb' },
    { value: 'keto', label: 'Ketogenic' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-wasfah-deep-teal flex items-center">
          <Target size={18} className="mr-2 text-wasfah-bright-teal" />
          Nutrition Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Calories</label>
              <Input 
                type="number" 
                value={calories} 
                onChange={(e) => setCalories(e.target.value)}
                placeholder="e.g. 2000"
                className="border-wasfah-bright-teal/30"
              />
              <p className="text-xs text-gray-500">Recommended: 2000-2500 kcal</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Protein</label>
              <Input 
                type="number" 
                value={protein} 
                onChange={(e) => setProtein(e.target.value)}
                placeholder="e.g. 100"
                className="border-wasfah-bright-teal/30"
              />
              <p className="text-xs text-gray-500">Recommended: 0.8g per kg of body weight</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Carbs</label>
              <Input 
                type="number" 
                value={carbs} 
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="e.g. 250"
                className="border-wasfah-bright-teal/30"
              />
              <p className="text-xs text-gray-500">Recommended: 45-65% of total calories</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Fat</label>
              <Input 
                type="number" 
                value={fat} 
                onChange={(e) => setFat(e.target.value)}
                placeholder="e.g. 65"
                className="border-wasfah-bright-teal/30"
              />
              <p className="text-xs text-gray-500">Recommended: 20-35% of total calories</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Activity Level</label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger className="border-wasfah-bright-teal/30">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  {activityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Dietary Preference</label>
              <Select value={dietaryType} onValueChange={setDietaryType}>
                <SelectTrigger className="border-wasfah-bright-teal/30">
                  <SelectValue placeholder="Select dietary preference" />
                </SelectTrigger>
                <SelectContent>
                  {dietaryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal flex items-center justify-center"
          >
            <Save size={16} className="mr-2" />
            Save Nutrition Goals
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
