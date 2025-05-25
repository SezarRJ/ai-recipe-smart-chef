
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, Heart, Scale, Target, TrendingUp, Calendar, Plus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HealthTracking = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [weight, setWeight] = useState("74.6");
  const [height, setHeight] = useState("175");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

  const healthGoals = [
    "Weight Loss", "Muscle Gain", "Heart Healthy", "Low Sodium", 
    "High Protein", "Low Carb", "High Fiber", "Diabetes Management"
  ];

  const allergens = [
    "Dairy", "Gluten", "Tree Nuts", "Shellfish", "Soy", "Eggs", 
    "Fish", "Peanuts", "Sesame", "Sulfites"
  ];

  const calculateBMI = () => {
    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100;
    if (weightKg && heightM) {
      return (weightKg / (heightM * heightM)).toFixed(1);
    }
    return "0";
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const handleAllergenToggle = (allergen: string) => {
    setSelectedAllergens(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const bmi = parseFloat(calculateBMI());
  const bmiInfo = getBMICategory(bmi);

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

        {/* Quick Stats with BMI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Scale className="mx-auto mb-2 text-wasfah-orange" size={24} />
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-xl font-bold">{weight} kg</p>
              <p className="text-xs text-green-600">-0.6 kg this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="mx-auto mb-2 text-purple-500" size={24} />
              <p className="text-sm text-gray-600">BMI</p>
              <p className="text-xl font-bold">{calculateBMI()}</p>
              <p className={`text-xs ${bmiInfo.color}`}>{bmiInfo.category}</p>
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
        </div>

        {/* Allergen-Free Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-wasfah-orange" size={20} />
              Allergen-Free Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Select allergens you want to avoid in your recipes</p>
            <div className="flex flex-wrap gap-2">
              {allergens.map((allergen) => (
                <Button
                  key={allergen}
                  variant={selectedAllergens.includes(allergen) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAllergenToggle(allergen)}
                  className="flex items-center gap-1"
                >
                  {allergen}
                </Button>
              ))}
            </div>
            {selectedAllergens.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-800">Active Allergen Restrictions:</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedAllergens.map((allergen) => (
                    <Badge key={allergen} variant="destructive" className="text-xs">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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

        {/* Add New Entry */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="text-wasfah-orange" size={20} />
              Add New Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <Input
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
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
