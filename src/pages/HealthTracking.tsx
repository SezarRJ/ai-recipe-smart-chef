
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, Heart, Scale, Target, TrendingUp, Calendar, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HealthTracking = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  const healthGoals = [
    "Weight Loss", "Muscle Gain", "Heart Healthy", "Low Sodium", 
    "High Protein", "Low Carb", "High Fiber", "Diabetes Management"
  ];

  const weeklyData = [
    { day: "Mon", weight: 75.2, steps: 8500, calories: 2100 },
    { day: "Tue", weight: 75.0, steps: 9200, calories: 2050 },
    { day: "Wed", weight: 74.8, steps: 7800, calories: 2200 },
    { day: "Thu", weight: 74.9, steps: 10500, calories: 1950 },
    { day: "Fri", weight: 74.7, steps: 9800, calories: 2150 },
    { day: "Sat", weight: 74.5, steps: 12000, calories: 2300 },
    { day: "Sun", weight: 74.6, steps: 6500, calories: 2000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              Health Tracking
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Monitor your health metrics and progress
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Scale className="mx-auto mb-2 text-wasfah-orange" size={24} />
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-xl font-bold">74.6 kg</p>
              <p className="text-xs text-green-600">-0.6 kg this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="mx-auto mb-2 text-red-500" size={24} />
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="text-xl font-bold">72 bpm</p>
              <p className="text-xs text-green-600">Normal</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="mx-auto mb-2 text-blue-500" size={24} />
              <p className="text-sm text-gray-600">Steps</p>
              <p className="text-xl font-bold">9,200</p>
              <p className="text-xs text-green-600">+15% today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="mx-auto mb-2 text-purple-500" size={24} />
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-xl font-bold">2,050</p>
              <p className="text-xs text-gray-600">Target: 2,000</p>
            </CardContent>
          </Card>
        </div>

        {/* Health Goals */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-wasfah-orange" size={20} />
              Health Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {healthGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={selectedGoal === goal ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGoal(selectedGoal === goal ? "" : goal)}
                >
                  {goal}
                </Button>
              ))}
            </div>
            {selectedGoal && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-800">Active Goal: {selectedGoal}</p>
                <p className="text-sm text-blue-600">Track your progress and get personalized recipe recommendations</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-wasfah-orange" size={20} />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-center">
                      <p className="font-semibold">{day.day}</p>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-xs text-gray-600">Weight</p>
                        <p className="font-semibold">{day.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Steps</p>
                        <p className="font-semibold">{day.steps.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Calories</p>
                        <p className="font-semibold">{day.calories}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {index < weeklyData.length - 1 && day.weight > weeklyData[index + 1]?.weight && (
                      <Badge variant="secondary" className="text-green-600">↓</Badge>
                    )}
                    {index < weeklyData.length - 1 && day.weight < weeklyData[index + 1]?.weight && (
                      <Badge variant="secondary" className="text-red-600">↑</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add New Entry */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="text-wasfah-orange" size={20} />
              Add New Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="75.0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Heart Rate (bpm)</label>
                <Input
                  type="number"
                  placeholder="72"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Blood Pressure</label>
                <Input
                  type="text"
                  placeholder="120/80"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green">
              Save Entry
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default HealthTracking;
