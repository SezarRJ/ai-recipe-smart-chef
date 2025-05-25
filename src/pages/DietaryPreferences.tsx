
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Save, Heart, Utensils, Shield, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const DietaryPreferences = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [preferences, setPreferences] = useState({
    dietary: [] as string[],
    allergens: [] as string[],
    religious: [] as string[],
    healthGoals: [] as string[]
  });

  const dietaryOptions = [
    { id: "vegetarian", label: "Vegetarian", icon: "🥬", description: "No meat or fish" },
    { id: "vegan", label: "Vegan", icon: "🌱", description: "No animal products" },
    { id: "keto", label: "Keto", icon: "🥑", description: "Low carb, high fat" },
    { id: "paleo", label: "Paleo", icon: "🥩", description: "Stone age diet" },
    { id: "mediterranean", label: "Mediterranean", icon: "🫒", description: "Heart-healthy diet" },
    { id: "gluten-free", label: "Gluten-Free", icon: "🌾", description: "No gluten" },
    { id: "dairy-free", label: "Dairy-Free", icon: "🥛", description: "No dairy products" },
    { id: "low-carb", label: "Low-Carb", icon: "🥒", description: "Reduced carbohydrates" }
  ];

  const allergenOptions = [
    { id: "nuts", label: "Tree Nuts", icon: "🥜" },
    { id: "peanuts", label: "Peanuts", icon: "🥜" },
    { id: "shellfish", label: "Shellfish", icon: "🦐" },
    { id: "fish", label: "Fish", icon: "🐟" },
    { id: "eggs", label: "Eggs", icon: "🥚" },
    { id: "soy", label: "Soy", icon: "🫘" },
    { id: "sesame", label: "Sesame", icon: "🌰" }
  ];

  const religiousOptions = [
    { id: "halal", label: "Halal", icon: "☪️", description: "Islamic dietary laws" },
    { id: "kosher", label: "Kosher", icon: "✡️", description: "Jewish dietary laws" },
    { id: "hindu-veg", label: "Hindu Vegetarian", icon: "🕉️", description: "Hindu dietary practices" },
    { id: "jain-veg", label: "Jain Vegetarian", icon: "☸️", description: "Jain dietary restrictions" }
  ];

  const healthGoalOptions = [
    { id: "weight-loss", label: "Weight Loss", icon: "⚖️", description: "Calorie controlled" },
    { id: "muscle-gain", label: "Muscle Gain", icon: "💪", description: "High protein" },
    { id: "heart-health", label: "Heart Health", icon: "❤️", description: "Heart-friendly foods" },
    { id: "diabetes", label: "Diabetes Friendly", icon: "🩺", description: "Blood sugar control" },
    { id: "low-sodium", label: "Low Sodium", icon: "🧂", description: "Reduced salt" },
    { id: "high-fiber", label: "High Fiber", icon: "🌾", description: "Digestive health" }
  ];

  const handleToggle = (category: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const savePreferences = () => {
    // Save preferences logic here
    console.log('Saving preferences:', preferences);
    toast({
      title: "Preferences saved!",
      description: "Your dietary preferences have been updated successfully.",
    });
  };

  const getTotalSelected = () => {
    return Object.values(preferences).reduce((total, arr) => total + arr.length, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
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
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2 flex items-center gap-2">
              <Utensils className="text-wasfah-orange" size={28} />
              Dietary Preferences
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Tell us about your dietary needs and preferences
            </p>
          </div>
          {getTotalSelected() > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {getTotalSelected()} selected
            </Badge>
          )}
        </div>

        {/* Dietary Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="text-green-600" size={20} />
              Dietary Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dietaryOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    preferences.dietary.includes(option.id)
                      ? 'border-wasfah-orange bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleToggle('dietary', option.id)}
                >
                  <Checkbox
                    checked={preferences.dietary.includes(option.id)}
                    onChange={() => {}}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Allergies & Intolerances */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-red-600" size={20} />
              Allergies & Intolerances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allergenOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                    preferences.allergens.includes(option.id)
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleToggle('allergens', option.id)}
                >
                  <Checkbox
                    checked={preferences.allergens.includes(option.id)}
                    onChange={() => {}}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{option.icon}</span>
                      <span className="font-medium text-sm">{option.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Religious Dietary Requirements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="text-purple-600" size={20} />
              Religious Dietary Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {religiousOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    preferences.religious.includes(option.id)
                      ? 'border-purple-400 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleToggle('religious', option.id)}
                >
                  <Checkbox
                    checked={preferences.religious.includes(option.id)}
                    onChange={() => {}}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Goals */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="text-blue-600" size={20} />
              Health Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthGoalOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    preferences.healthGoals.includes(option.id)
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleToggle('healthGoals', option.id)}
                >
                  <Checkbox
                    checked={preferences.healthGoals.includes(option.id)}
                    onChange={() => {}}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button
            onClick={savePreferences}
            className="bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <Save size={20} />
            Save Preferences
          </Button>
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default DietaryPreferences;
