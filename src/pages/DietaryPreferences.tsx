
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Leaf, Heart, Zap, Shield, Save } from 'lucide-react';

interface DietaryPreference {
  id: string;
  name: string;
  description: string;
  icon: any;
  selected: boolean;
}

interface NutritionalGoal {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  unit: string;
}

const DietaryPreferences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [dietTypes, setDietTypes] = useState<DietaryPreference[]>([
    { id: "vegetarian", name: "Vegetarian", description: "No meat or fish", icon: Leaf, selected: false },
    { id: "vegan", name: "Vegan", description: "No animal products", icon: Leaf, selected: false },
    { id: "keto", name: "Keto", description: "Low carb, high fat", icon: Zap, selected: false },
    { id: "paleo", name: "Paleo", description: "Whole foods only", icon: Heart, selected: false },
    { id: "gluten-free", name: "Gluten Free", description: "No gluten", icon: Shield, selected: true },
    { id: "dairy-free", name: "Dairy Free", description: "No dairy products", icon: Shield, selected: false },
  ]);

  const [allergens, setAllergens] = useState<DietaryPreference[]>([
    { id: "nuts", name: "Tree Nuts", description: "Avoid all tree nuts", icon: Shield, selected: false },
    { id: "peanuts", name: "Peanuts", description: "Avoid peanuts", icon: Shield, selected: false },
    { id: "shellfish", name: "Shellfish", description: "Avoid shellfish", icon: Shield, selected: false },
    { id: "fish", name: "Fish", description: "Avoid all fish", icon: Shield, selected: false },
    { id: "eggs", name: "Eggs", description: "Avoid eggs", icon: Shield, selected: false },
    { id: "soy", name: "Soy", description: "Avoid soy products", icon: Shield, selected: false },
  ]);

  const [nutritionalGoals, setNutritionalGoals] = useState<NutritionalGoal[]>([
    { id: "calories", name: "Daily Calories", value: 2000, min: 1200, max: 3500, unit: "kcal" },
    { id: "protein", name: "Protein", value: 150, min: 50, max: 300, unit: "g" },
    { id: "carbs", name: "Carbohydrates", value: 200, min: 50, max: 400, unit: "g" },
    { id: "fat", name: "Fat", value: 65, min: 20, max: 150, unit: "g" },
    { id: "fiber", name: "Fiber", value: 25, min: 10, max: 50, unit: "g" },
    { id: "sodium", name: "Sodium", value: 2300, min: 500, max: 4000, unit: "mg" },
  ]);

  const toggleDietType = (id: string) => {
    setDietTypes(prev => prev.map(diet => 
      diet.id === id ? { ...diet, selected: !diet.selected } : diet
    ));
  };

  const toggleAllergen = (id: string) => {
    setAllergens(prev => prev.map(allergen => 
      allergen.id === id ? { ...allergen, selected: !allergen.selected } : allergen
    ));
  };

  const updateNutritionalGoal = (id: string, value: number[]) => {
    setNutritionalGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, value: value[0] } : goal
    ));
  };

  const savePreferences = () => {
    const preferences = {
      dietTypes: dietTypes.filter(diet => diet.selected),
      allergens: allergens.filter(allergen => allergen.selected),
      nutritionalGoals: nutritionalGoals,
    };

    // Save to localStorage for demo
    localStorage.setItem('dietaryPreferences', JSON.stringify(preferences));

    toast({
      title: "Preferences saved",
      description: "Your dietary preferences have been updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Dietary Preferences</h1>
          <p className="text-gray-600">Customize your nutrition goals and dietary restrictions</p>
        </motion.div>

        <div className="space-y-6">
          {/* Diet Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="text-wasfah-green" size={20} />
                  Diet Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dietTypes.map((diet) => {
                    const IconComponent = diet.icon;
                    return (
                      <div
                        key={diet.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          diet.selected 
                            ? 'border-wasfah-orange bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleDietType(diet.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox checked={diet.selected} onChange={() => {}} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <IconComponent size={16} className="text-wasfah-orange" />
                              <span className="font-medium">{diet.name}</span>
                            </div>
                            <p className="text-sm text-gray-600">{diet.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Allergens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="text-red-500" size={20} />
                  Allergens & Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allergens.map((allergen) => (
                    <div
                      key={allergen.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        allergen.selected 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleAllergen(allergen.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox checked={allergen.selected} onChange={() => {}} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Shield size={16} className="text-red-500" />
                            <span className="font-medium">{allergen.name}</span>
                          </div>
                          <p className="text-sm text-gray-600">{allergen.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Nutritional Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="text-wasfah-orange" size={20} />
                  Nutritional Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {nutritionalGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="font-medium">{goal.name}</label>
                        <span className="text-sm text-gray-600">
                          {goal.value} {goal.unit}
                        </span>
                      </div>
                      <Slider
                        value={[goal.value]}
                        onValueChange={(value) => updateNutritionalGoal(goal.id, value)}
                        min={goal.min}
                        max={goal.max}
                        step={goal.unit === 'mg' ? 100 : goal.unit === 'kcal' ? 50 : 5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{goal.min} {goal.unit}</span>
                        <span>{goal.max} {goal.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Button onClick={savePreferences} size="lg" className="px-8">
              <Save size={16} className="mr-2" />
              Save Preferences
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DietaryPreferences;
