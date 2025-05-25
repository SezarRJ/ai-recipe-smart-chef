
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Edit, Trash2, Clock, Users, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface MealPlan {
  id: string;
  date: string;
  day: string;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snack?: Recipe;
  };
}

interface Recipe {
  id: string;
  name: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: string;
  calories?: number;
}

const MealPlanning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<{ date: string; mealType: string } | null>(null);

  // Sample recipes
  const sampleRecipes: Recipe[] = [
    {
      id: "1",
      name: "Greek Yogurt Bowl",
      image: "/placeholder.svg",
      cookTime: 5,
      servings: 1,
      difficulty: "easy",
      calories: 320
    },
    {
      id: "2", 
      name: "Grilled Chicken Salad",
      image: "/placeholder.svg",
      cookTime: 20,
      servings: 2,
      difficulty: "medium",
      calories: 450
    },
    {
      id: "3",
      name: "Salmon with Vegetables",
      image: "/placeholder.svg", 
      cookTime: 25,
      servings: 4,
      difficulty: "medium",
      calories: 520
    }
  ];

  // Generate week dates
  const getWeekDates = (weekOffset: number = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDay: date.toLocaleDateString('en-US', { weekday: 'long' })
      });
    }
    return week;
  };

  const [mealPlans, setMealPlans] = useState<MealPlan[]>(() => {
    const week = getWeekDates();
    return week.map(day => ({
      id: day.date,
      date: day.date,
      day: day.day,
      meals: {
        breakfast: day.day === 'Mon' ? sampleRecipes[0] : undefined,
        lunch: day.day === 'Mon' ? sampleRecipes[1] : undefined,
        dinner: day.day === 'Mon' ? sampleRecipes[2] : undefined,
      }
    }));
  });

  const weekDates = getWeekDates(currentWeek);

  const addMealToPlan = (date: string, mealType: string, recipe: Recipe) => {
    setMealPlans(prev => prev.map(plan => 
      plan.date === date 
        ? { ...plan, meals: { ...plan.meals, [mealType]: recipe } }
        : plan
    ));
    setSelectedMeal(null);
    toast({
      title: "Meal added",
      description: `${recipe.name} added to ${mealType}`,
    });
  };

  const removeMealFromPlan = (date: string, mealType: string) => {
    setMealPlans(prev => prev.map(plan => 
      plan.date === date 
        ? { ...plan, meals: { ...plan.meals, [mealType]: undefined } }
        : plan
    ));
    toast({
      title: "Meal removed",
      description: "Meal removed from plan",
    });
  };

  const generateShoppingList = () => {
    const ingredients = [
      "Greek yogurt",
      "Mixed berries", 
      "Chicken breast",
      "Mixed greens",
      "Salmon fillet",
      "Broccoli",
      "Sweet potatoes"
    ];
    
    toast({
      title: "Shopping list generated",
      description: `Added ${ingredients.length} items to your shopping list`,
    });
    navigate('/shopping-lists');
  };

  const getTotalCalories = (meals: MealPlan['meals']) => {
    return Object.values(meals).reduce((total, meal) => {
      return total + (meal?.calories || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Meal Planning</h1>
          <p className="text-gray-600">Plan your weekly meals and generate shopping lists</p>
        </motion.div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => setCurrentWeek(prev => prev - 1)}
          >
            Previous Week
          </Button>
          
          <div className="text-center">
            <h2 className="text-lg font-semibold">
              {weekDates[0]?.date && weekDates[6]?.date && 
                `${new Date(weekDates[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(weekDates[6].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              }
            </h2>
            <p className="text-sm text-gray-600">
              {currentWeek === 0 ? 'This Week' : currentWeek > 0 ? `${currentWeek} week(s) ahead` : `${Math.abs(currentWeek)} week(s) ago`}
            </p>
          </div>
          
          <Button
            variant="outline" 
            onClick={() => setCurrentWeek(prev => prev + 1)}
          >
            Next Week
          </Button>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={generateShoppingList} className="bg-wasfah-green hover:bg-wasfah-green/90">
            Generate Shopping List
          </Button>
          <Button variant="outline" onClick={() => navigate('/explore')}>
            <Plus size={16} className="mr-2" />
            Find Recipes
          </Button>
        </div>

        {/* Weekly Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-6">
          {weekDates.map((day, dayIndex) => {
            const dayPlan = mealPlans.find(plan => plan.date === day.date);
            const totalCalories = dayPlan ? getTotalCalories(dayPlan.meals) : 0;
            
            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-center">
                      <div className="text-sm font-medium text-gray-600">{day.fullDay}</div>
                      <div className="text-lg font-bold">{new Date(day.date).getDate()}</div>
                      {totalCalories > 0 && (
                        <div className="text-xs text-wasfah-orange mt-1">{totalCalories} cal</div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                      const meal = dayPlan?.meals[mealType as keyof typeof dayPlan.meals];
                      
                      return (
                        <div key={mealType} className="border rounded-lg p-2">
                          <div className="text-xs font-medium text-gray-600 mb-1 capitalize">
                            {mealType}
                          </div>
                          
                          {meal ? (
                            <div className="space-y-2">
                              <div className="text-sm font-medium">{meal.name}</div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock size={12} />
                                <span>{meal.cookTime}m</span>
                                <Users size={12} />
                                <span>{meal.servings}</span>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedMeal({ date: day.date, mealType })}
                                  className="text-xs h-6 px-2"
                                >
                                  <Edit size={10} className="mr-1" />
                                  Change
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeMealFromPlan(day.date, mealType)}
                                  className="text-xs h-6 px-2"
                                >
                                  <Trash2 size={10} />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMeal({ date: day.date, mealType })}
                              className="w-full text-xs h-8"
                            >
                              <Plus size={12} className="mr-1" />
                              Add {mealType}
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Recipe Selection Modal */}
        <AnimatePresence>
          {selectedMeal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMeal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    Select Recipe for {selectedMeal.mealType}
                  </h3>
                  <Button variant="ghost" onClick={() => setSelectedMeal(null)}>
                    ×
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sampleRecipes.map((recipe) => (
                    <Card 
                      key={recipe.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => addMealToPlan(selectedMeal.date, selectedMeal.mealType, recipe)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3"></div>
                        <h4 className="font-semibold mb-2">{recipe.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{recipe.cookTime}m</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{recipe.servings}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ChefHat size={14} />
                            <span className="capitalize">{recipe.difficulty}</span>
                          </div>
                        </div>
                        {recipe.calories && (
                          <div className="text-sm text-wasfah-orange mt-2">
                            {recipe.calories} calories
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={() => navigate('/explore')}>
                    Browse More Recipes
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weekly Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-wasfah-orange">
                  {mealPlans.reduce((total, plan) => {
                    return total + Object.values(plan.meals).filter(Boolean).length;
                  }, 0)}
                </div>
                <div className="text-sm text-gray-600">Meals Planned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-wasfah-green">
                  {mealPlans.reduce((total, plan) => total + getTotalCalories(plan.meals), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Calories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(mealPlans.reduce((total, plan) => total + getTotalCalories(plan.meals), 0) / 7)}
                </div>
                <div className="text-sm text-gray-600">Avg Daily Calories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanning;
