
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Apple,
  Fish,
  Milk,
  Leaf,
  Plus,
  Calendar
} from 'lucide-react';

const MicronutrientTrackerPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [nutrientIntake, setNutrientIntake] = useState({
    vitamin_d: 15,
    vitamin_b12: 1.8,
    iron: 12,
    calcium: 800,
    omega3: 0.8,
    magnesium: 280,
    zinc: 8,
    folate: 320
  });

  const nutrients = [
    {
      id: 'vitamin_d',
      name: 'Vitamin D',
      unit: 'μg',
      daily_target: 20,
      current: nutrientIntake.vitamin_d,
      status: 'low',
      icon: <Target className="h-5 w-5" />,
      color: 'text-orange-600',
      sources: ['Salmon', 'Egg yolks', 'Fortified milk', 'Sunlight exposure']
    },
    {
      id: 'vitamin_b12',
      name: 'Vitamin B12',
      unit: 'μg',
      daily_target: 2.4,
      current: nutrientIntake.vitamin_b12,
      status: 'low',
      icon: <Fish className="h-5 w-5" />,
      color: 'text-red-600',
      sources: ['Fish', 'Meat', 'Dairy', 'Fortified cereals']
    },
    {
      id: 'iron',
      name: 'Iron',
      unit: 'mg',
      daily_target: 18,
      current: nutrientIntake.iron,
      status: 'good',
      icon: <Apple className="h-5 w-5" />,
      color: 'text-green-600',
      sources: ['Spinach', 'Red meat', 'Beans', 'Dark chocolate']
    },
    {
      id: 'calcium',
      name: 'Calcium',
      unit: 'mg',
      daily_target: 1000,
      current: nutrientIntake.calcium,
      status: 'good',
      icon: <Milk className="h-5 w-5" />,
      color: 'text-blue-600',
      sources: ['Dairy products', 'Leafy greens', 'Almonds', 'Sardines']
    },
    {
      id: 'omega3',
      name: 'Omega-3',
      unit: 'g',
      daily_target: 1.6,
      current: nutrientIntake.omega3,
      status: 'low',
      icon: <Fish className="h-5 w-5" />,
      color: 'text-cyan-600',
      sources: ['Fatty fish', 'Walnuts', 'Flax seeds', 'Chia seeds']
    },
    {
      id: 'magnesium',
      name: 'Magnesium',
      unit: 'mg',
      daily_target: 400,
      current: nutrientIntake.magnesium,
      status: 'good',
      icon: <Leaf className="h-5 w-5" />,
      color: 'text-green-600',
      sources: ['Nuts', 'Seeds', 'Whole grains', 'Dark leafy greens']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-600 bg-red-50';
      case 'good': return 'text-green-600 bg-green-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low': return <AlertTriangle className="h-4 w-4" />;
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'high': return <TrendingUp className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const deficiencies = nutrients.filter(n => n.status === 'low');

  return (
    <PageContainer header={{ title: 'Micronutrient Tracker', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Micronutrient Tracker</h1>
          <p className="text-gray-600">
            Track vitamins and minerals to optimize your health
          </p>
        </div>

        {/* Date Selection */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-wasfah-bright-teal" />
              <Label htmlFor="date">Tracking Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </CardContent>
        </Card>

        {/* Deficiency Alerts */}
        {deficiencies.length > 0 && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Nutrient Deficiency Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deficiencies.map((nutrient) => (
                  <div key={nutrient.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {nutrient.icon}
                      <div>
                        <p className="font-medium text-red-700">{nutrient.name}</p>
                        <p className="text-sm text-red-600">
                          {nutrient.current}{nutrient.unit} / {nutrient.daily_target}{nutrient.unit}
                        </p>
                      </div>
                    </div>
                    <Badge variant="destructive">Low</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="recommendations">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Nutrient Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {nutrients.map((nutrient) => (
                    <div key={nutrient.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {nutrient.icon}
                          <span className="font-medium">{nutrient.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {nutrient.current}{nutrient.unit} / {nutrient.daily_target}{nutrient.unit}
                          </span>
                          <Badge className={getStatusColor(nutrient.status)}>
                            {getStatusIcon(nutrient.status)}
                            {nutrient.status}
                          </Badge>
                        </div>
                      </div>
                      <Progress 
                        value={calculateProgress(nutrient.current, nutrient.daily_target)} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-4">
            <div className="grid gap-4">
              {nutrients.map((nutrient) => (
                <Card key={nutrient.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {nutrient.icon}
                      {nutrient.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Current Intake:</span>
                        <span className="font-semibold">
                          {nutrient.current}{nutrient.unit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Daily Target:</span>
                        <span className="font-semibold">
                          {nutrient.daily_target}{nutrient.unit}
                        </span>
                      </div>
                      <Progress 
                        value={calculateProgress(nutrient.current, nutrient.daily_target)} 
                        className="h-3"
                      />
                      <div>
                        <p className="text-sm font-medium mb-2">Best Food Sources:</p>
                        <div className="flex flex-wrap gap-2">
                          {nutrient.sources.map((source, index) => (
                            <Badge key={index} variant="outline">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Log Intake
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Vitamin D Boost</h4>
                    <p className="text-blue-700 text-sm">
                      Consider 15 minutes of sunlight exposure daily or add fatty fish to your diet twice a week.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Iron Absorption</h4>
                    <p className="text-green-700 text-sm">
                      Pair iron-rich foods with vitamin C sources like citrus fruits to enhance absorption.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">B12 for Vegans</h4>
                    <p className="text-purple-700 text-sm">
                      Consider fortified nutritional yeast or B12 supplements if following a plant-based diet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Meal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Based on your current nutrient profile, here are some meal ideas:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Fish className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Salmon with Spinach Salad</p>
                      <p className="text-sm text-gray-600">Rich in Omega-3, Iron, and Vitamin D</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Milk className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Greek Yogurt with Almonds</p>
                      <p className="text-sm text-gray-600">Excellent source of Calcium and Protein</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default MicronutrientTrackerPage;
