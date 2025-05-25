
import { useState } from "react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Plus, ChefHat, Clock, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface MealPlan {
  id: string;
  day: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeName: string;
  cookingTime: number;
  servings: number;
}

const MealPlanning = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: "1",
      day: "Monday",
      mealType: "breakfast",
      recipeName: "Overnight Oats",
      cookingTime: 5,
      servings: 2
    },
    {
      id: "2",
      day: "Monday",
      mealType: "lunch",
      recipeName: "Mediterranean Salad",
      cookingTime: 15,
      servings: 2
    }
  ]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = [
    { key: "breakfast", label: "Breakfast", icon: "🌅" },
    { key: "lunch", label: "Lunch", icon: "🌞" },
    { key: "dinner", label: "Dinner", icon: "🌙" },
    { key: "snack", label: "Snack", icon: "🍎" }
  ];

  const getMealForDayAndType = (day: string, mealType: string) => {
    return mealPlans.find(meal => meal.day === day && meal.mealType === mealType);
  };

  const addMeal = (day: string, mealType: string) => {
    const newMeal: MealPlan = {
      id: Date.now().toString(),
      day,
      mealType: mealType as any,
      recipeName: "Click to add recipe",
      cookingTime: 30,
      servings: 2
    };
    setMealPlans(prev => [...prev, newMeal]);
    toast({
      title: "Meal slot added",
      description: `Added ${mealType} for ${day}`
    });
  };

  const removeMeal = (id: string) => {
    setMealPlans(prev => prev.filter(meal => meal.id !== id));
    toast({
      title: "Meal removed",
      description: "Meal has been removed from your plan"
    });
  };

  const generateWeeklyPlan = () => {
    toast({
      title: "AI Weekly Plan",
      description: "This feature will generate a complete weekly meal plan based on your preferences"
    });
  };

  const generateShoppingList = () => {
    toast({
      title: "Shopping List Generated",
      description: "Created shopping list from your meal plan"
    });
    navigate("/shopping-lists");
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
              <CalendarIcon className="text-wasfah-orange" size={28} />
              {t("nav.mealPlan")}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Plan your meals for the week ahead
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button onClick={generateWeeklyPlan} className="flex items-center gap-2 whitespace-nowrap">
            <ChefHat size={18} />
            Generate AI Plan
          </Button>
          <Button onClick={generateShoppingList} variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <Plus size={18} />
            Create Shopping List
          </Button>
        </div>

        {/* Weekly Meal Plan Grid */}
        <div className="space-y-4">
          {daysOfWeek.map((day) => (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mealTypes.map((mealType) => {
                    const meal = getMealForDayAndType(day, mealType.key);
                    return (
                      <div key={mealType.key} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <span>{mealType.icon}</span>
                            {mealType.label}
                          </h4>
                          {meal && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMeal(meal.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                        {meal ? (
                          <div className="space-y-2">
                            <p className="font-medium text-sm">{meal.recipeName}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {meal.cookingTime}m
                              </span>
                              <span className="flex items-center gap-1">
                                <Users size={12} />
                                {meal.servings}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Planned
                            </Badge>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addMeal(day, mealType.key)}
                            className="w-full h-16 text-gray-500 border-dashed"
                          >
                            <Plus size={16} className="mr-2" />
                            Add {mealType.label}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default MealPlanning;
