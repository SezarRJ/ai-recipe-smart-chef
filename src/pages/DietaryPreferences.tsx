
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Save, Target, Heart, AlertTriangle, Utensils } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DietaryPreferences = () => {
  const { t } = useLanguage();
  const [preferences, setPreferences] = useState({
    dietTypes: ["vegetarian"],
    allergies: ["nuts"],
    dislikes: ["mushrooms"],
    cuisines: ["mediterranean", "italian"],
    healthGoals: ["weight-loss"]
  });

  const dietTypes = [
    { id: "vegetarian", label: "Vegetarian", icon: "🥬" },
    { id: "vegan", label: "Vegan", icon: "🌱" },
    { id: "keto", label: "Ketogenic", icon: "🥑" },
    { id: "paleo", label: "Paleo", icon: "🥩" },
    { id: "mediterranean", label: "Mediterranean", icon: "🫒" },
    { id: "low-carb", label: "Low Carb", icon: "🥗" },
    { id: "gluten-free", label: "Gluten Free", icon: "🌾" },
    { id: "dairy-free", label: "Dairy Free", icon: "🥛" }
  ];

  const allergies = [
    { id: "nuts", label: "Tree Nuts", icon: "🥜" },
    { id: "peanuts", label: "Peanuts", icon: "🥜" },
    { id: "shellfish", label: "Shellfish", icon: "🦐" },
    { id: "fish", label: "Fish", icon: "🐟" },
    { id: "eggs", label: "Eggs", icon: "🥚" },
    { id: "dairy", label: "Dairy", icon: "🥛" },
    { id: "soy", label: "Soy", icon: "🫘" },
    { id: "gluten", label: "Gluten", icon: "🌾" }
  ];

  const commonDislikes = [
    { id: "mushrooms", label: "Mushrooms", icon: "🍄" },
    { id: "onions", label: "Onions", icon: "🧅" },
    { id: "garlic", label: "Garlic", icon: "🧄" },
    { id: "tomatoes", label: "Tomatoes", icon: "🍅" },
    { id: "spicy", label: "Spicy Food", icon: "🌶️" },
    { id: "cilantro", label: "Cilantro", icon: "🌿" },
    { id: "seafood", label: "Seafood", icon: "🐟" },
    { id: "liver", label: "Liver", icon: "🫘" }
  ];

  const cuisineTypes = [
    { id: "italian", label: "Italian", icon: "🍝" },
    { id: "mediterranean", label: "Mediterranean", icon: "🫒" },
    { id: "asian", label: "Asian", icon: "🥢" },
    { id: "mexican", label: "Mexican", icon: "🌮" },
    { id: "indian", label: "Indian", icon: "🍛" },
    { id: "french", label: "French", icon: "🥖" },
    { id: "american", label: "American", icon: "🍔" },
    { id: "middle-eastern", label: "Middle Eastern", icon: "🧆" }
  ];

  const healthGoals = [
    { id: "weight-loss", label: "Weight Loss", icon: "⚖️" },
    { id: "muscle-gain", label: "Muscle Gain", icon: "💪" },
    { id: "heart-health", label: "Heart Health", icon: "❤️" },
    { id: "energy-boost", label: "Energy Boost", icon: "⚡" },
    { id: "better-sleep", label: "Better Sleep", icon: "😴" },
    { id: "digestive-health", label: "Digestive Health", icon: "🫃" },
    { id: "immune-support", label: "Immune Support", icon: "🛡️" },
    { id: "anti-inflammatory", label: "Anti-inflammatory", icon: "🌿" }
  ];

  const togglePreference = (category: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const savePreferences = () => {
    // Here you would save to your backend/database
    toast({
      title: "Preferences saved",
      description: "Your dietary preferences have been updated successfully",
    });
  };

  const PreferenceGrid = ({ items, category, selectedItems }: any) => (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item: any) => (
        <Card
          key={item.id}
          className={`cursor-pointer transition-all ${
            selectedItems.includes(item.id)
              ? 'ring-2 ring-wasfah-orange bg-wasfah-orange/10'
              : 'hover:shadow-md'
          }`}
          onClick={() => togglePreference(category, item.id)}
        >
          <CardContent className="p-3 text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-sm font-medium">{item.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Dietary Preferences
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Customize your food recommendations
          </p>
        </div>

        <Tabs defaultValue="diet" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="diet" className="text-xs">Diet</TabsTrigger>
            <TabsTrigger value="allergies" className="text-xs">Allergies</TabsTrigger>
            <TabsTrigger value="preferences" className="text-xs">Likes</TabsTrigger>
            <TabsTrigger value="goals" className="text-xs">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="diet" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="text-wasfah-orange" size={20} />
                  Diet Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PreferenceGrid
                  items={dietTypes}
                  category="dietTypes"
                  selectedItems={preferences.dietTypes}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allergies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-red-500" size={20} />
                  Allergies & Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PreferenceGrid
                  items={allergies}
                  category="allergies"
                  selectedItems={preferences.allergies}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-gray-500">👎</span>
                  Foods You Dislike
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PreferenceGrid
                  items={commonDislikes}
                  category="dislikes"
                  selectedItems={preferences.dislikes}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="text-wasfah-orange" size={20} />
                  Favorite Cuisines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PreferenceGrid
                  items={cuisineTypes}
                  category="cuisines"
                  selectedItems={preferences.cuisines}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-wasfah-orange" size={20} />
                  Health Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PreferenceGrid
                  items={healthGoals}
                  category="healthGoals"
                  selectedItems={preferences.healthGoals}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Preferences Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Diet Types:</p>
              <div className="flex flex-wrap gap-1">
                {preferences.dietTypes.map(diet => (
                  <Badge key={diet} variant="secondary">{diet}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Allergies:</p>
              <div className="flex flex-wrap gap-1">
                {preferences.allergies.map(allergy => (
                  <Badge key={allergy} variant="destructive">{allergy}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Health Goals:</p>
              <div className="flex flex-wrap gap-1">
                {preferences.healthGoals.map(goal => (
                  <Badge key={goal} className="bg-wasfah-orange">{goal}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={savePreferences} className="w-full mt-6 bg-gradient-to-r from-wasfah-orange to-wasfah-green">
          <Save className="mr-2" size={16} />
          Save Preferences
        </Button>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default DietaryPreferences;
