import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Target, Activity, Zap, Scale } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  fiber: number;
}

export const NutritionGoalSetting = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65,
    water: 8,
    fiber: 25
  });

  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goalType, setGoalType] = useState('maintain');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  const calculateGoals = () => {
    if (!age || !weight || !height || !gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all personal information fields",
        variant: "destructive"
      });
      return;
    }

    // Basic BMR calculation (Mifflin-St Jeor)
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Activity factor
    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    let tdee = bmr * activityFactors[activityLevel as keyof typeof activityFactors];

    // Goal adjustment
    if (goalType === 'lose') tdee -= 500; // 1 lb per week
    if (goalType === 'gain') tdee += 500;

    // Macro distribution (balanced approach)
    const protein = Math.round((tdee * 0.25) / 4); // 25% protein
    const fat = Math.round((tdee * 0.30) / 9); // 30% fat
    const carbs = Math.round((tdee * 0.45) / 4); // 45% carbs

    setGoals({
      calories: Math.round(tdee),
      protein,
      carbs,
      fat,
      water: Math.max(8, Math.round(weightNum * 0.035)), // 35ml per kg
      fiber: Math.round(tdee / 1000 * 14) // 14g per 1000 calories
    });

    toast({
      title: "Goals Updated!",
      description: "Your nutrition goals have been calculated based on your profile"
    });
  };

  const saveGoals = () => {
    // Save to localStorage or database
    localStorage.setItem('nutritionGoals', JSON.stringify(goals));
    toast({
      title: "Goals Saved!",
      description: "Your nutrition goals have been saved successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-wasfah-bright-teal" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="170"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (desk job)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very_active">Very Active (2x/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Goal</Label>
              <Select value={goalType} onValueChange={setGoalType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateGoals} className="w-full mt-4">
            Calculate Goals
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-wasfah-bright-teal" />
            Nutrition Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calories */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Daily Calories
              </Label>
              <Badge variant="outline">{goals.calories} kcal</Badge>
            </div>
            <Slider
              value={[goals.calories]}
              onValueChange={(value) => setGoals({...goals, calories: value[0]})}
              max={4000}
              min={1200}
              step={50}
              className="w-full"
            />
          </div>

          {/* Macros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Protein (g)</Label>
              <Input
                type="number"
                value={goals.protein}
                onChange={(e) => setGoals({...goals, protein: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label>Carbs (g)</Label>
              <Input
                type="number"
                value={goals.carbs}
                onChange={(e) => setGoals({...goals, carbs: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label>Fat (g)</Label>
              <Input
                type="number"
                value={goals.fat}
                onChange={(e) => setGoals({...goals, fat: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          {/* Other Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Water (glasses)</Label>
              <Input
                type="number"
                value={goals.water}
                onChange={(e) => setGoals({...goals, water: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label>Fiber (g)</Label>
              <Input
                type="number"
                value={goals.fiber}
                onChange={(e) => setGoals({...goals, fiber: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <Button onClick={saveGoals} className="w-full">
            <Scale className="h-4 w-4 mr-2" />
            Save Goals
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
