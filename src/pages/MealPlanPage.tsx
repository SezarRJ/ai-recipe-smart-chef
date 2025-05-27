import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, ChevronLeft, ChevronRight, Calendar, Search, Zap, Utensils } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useToast } from '@/hooks/use-toast';

// Helper Functions
const getWeekDays = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
};

const formatDateForDisplay = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const getMealTypeLabel = (type: string) => {
  switch (type) {
    case 'breakfast': return 'Breakfast';
    case 'lunch': return 'Lunch';
    case 'dinner': return 'Dinner';
    case 'snack': return 'Snack';
    default: return '';
  }
};

interface Recipe {
  id: string;
  name: string;
  category: string;
}

interface Meal {
  id: string;
  type: 'recipe' | 'custom';
  recipeId?: string;
  customText?: string;
  servings?: number;
  date: string;
  mealType: string;
  addedDate: string;
}

export default function MealPlanPage() {
  const { toast } = useToast();
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [mealPlan, setMealPlan] = useState<Meal[]>([]);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newMealRecipeId, setNewMealRecipeId] = useState<string>('');
  const [newMealCustomText, setNewMealCustomText] = useState('');
  const [newMealDate, setNewMealDate] = useState('');
  const [newMealType, setNewMealType] = useState('lunch');
  const [newMealServings, setNewMealServings] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const mockRecipes: Recipe[] = [
    { id: 'rec1', name: 'Chicken Stir-fry', category: 'Dinner' },
    { id: 'rec2', name: 'Oatmeal', category: 'Breakfast' },
    { id: 'rec3', name: 'Quinoa Salad', category: 'Lunch' },
    { id: 'rec4', name: 'Fruit Smoothie', category: 'Snack' },
    { id: 'rec5', name: 'Lentil Soup', category: 'Dinner' }
  ];

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const weekDays = useMemo(() => getWeekDays(currentWeekStart), [currentWeekStart]);

  useEffect(() => {
    setNewMealDate(weekDays[0]);
    // Load initial meal plan
    setMealPlan([
      {
        id: 'm1',
        type: 'recipe',
        recipeId: 'rec1',
        servings: 2,
        date: weekDays[0],
        mealType: 'dinner',
        addedDate: new Date().toISOString()
      },
      {
        id: 'm2',
        type: 'custom',
        customText: 'Eating Out',
        date: weekDays[1],
        mealType: 'dinner',
        addedDate: new Date().toISOString()
      }
    ]);
  }, [weekDays]);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const handleAddMeal = () => {
    if (!newMealRecipeId && !newMealCustomText.trim()) {
      alert('Please select a recipe or enter custom text.');
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      date: newMealDate,
      mealType: newMealType,
      type: newMealRecipeId ? 'recipe' : 'custom',
      addedDate: new Date().toISOString(),
      ...(newMealRecipeId && {
        recipeId: newMealRecipeId,
        servings: Number(newMealServings) || 1
      }),
      ...(!newMealRecipeId && {
        customText: newMealCustomText.trim()
      })
    };

    setMealPlan([...mealPlan, newMeal]);
    setIsAddingMeal(false);
    setNewMealRecipeId('');
    setNewMealCustomText('');
    setNewMealServings('1');
  };

  const handleRemoveMeal = (id: string) => {
    setMealPlan(mealPlan.filter(meal => meal.id !== id));
  };

  const filteredRecipes = mockRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMealsForDay = (date: string) => {
    return mealPlan.filter(meal => meal.date === date);
  };

  const handleGenerateAIMealPlan = () => {
    toast({
      title: "AI Meal Plan Generated!",
      description: "Your personalized meal plan has been created based on your preferences and dietary needs.",
    });
    
    // Mock AI generated meals
    const aiGeneratedMeals = [
      {
        id: 'ai1',
        type: 'recipe' as const,
        recipeId: 'rec3',
        servings: 2,
        date: weekDays[0],
        mealType: 'breakfast',
        addedDate: new Date().toISOString()
      },
      {
        id: 'ai2',
        type: 'recipe' as const,
        recipeId: 'rec1',
        servings: 4,
        date: weekDays[1],
        mealType: 'dinner',
        addedDate: new Date().toISOString()
      },
      {
        id: 'ai3',
        type: 'recipe' as const,
        recipeId: 'rec5',
        servings: 3,
        date: weekDays[2],
        mealType: 'lunch',
        addedDate: new Date().toISOString()
      }
    ];
    
    setMealPlan([...mealPlan, ...aiGeneratedMeals]);
  };

  return (
    <PageContainer
      header={{
        title: 'Meal Plan',
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white"
    >
      <div className="space-y-6">
        {/* Week Navigation */}
        <Card className="border-wasfah-mint/20 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousWeek}
                className="border-wasfah-teal text-wasfah-teal hover:bg-wasfah-teal hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-wasfah-deep-teal">
                  Week of {formatDateForDisplay(weekDays[0])}
                </h2>
                <p className="text-sm text-gray-600">Plan your meals</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextWeek}
                className="border-wasfah-teal text-wasfah-teal hover:bg-wasfah-teal hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Add Meal Button */}
        <Dialog open={isAddingMeal} onOpenChange={setIsAddingMeal}>
          <DialogTrigger asChild>
            <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Meal to Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-wasfah-deep-teal">Add New Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Select value={newMealDate} onValueChange={setNewMealDate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map(day => (
                      <SelectItem key={day} value={day}>
                        {formatDateForDisplay(day)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Meal Type</label>
                <Select value={newMealType} onValueChange={setNewMealType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {getMealTypeLabel(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Recipe Search</label>
                <Input
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
                {filteredRecipes.length > 0 && (
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {filteredRecipes.map(recipe => (
                      <Button
                        key={recipe.id}
                        variant={newMealRecipeId === recipe.id ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          setNewMealRecipeId(recipe.id);
                          setNewMealCustomText('');
                        }}
                      >
                        {recipe.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {newMealRecipeId && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Servings</label>
                  <Input
                    type="number"
                    value={newMealServings}
                    onChange={(e) => setNewMealServings(e.target.value)}
                    min="1"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Or Custom Meal</label>
                <Input
                  placeholder="Enter custom meal..."
                  value={newMealCustomText}
                  onChange={(e) => {
                    setNewMealCustomText(e.target.value);
                    setNewMealRecipeId('');
                  }}
                />
              </div>

              <Button
                onClick={handleAddMeal}
                className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
              >
                Add Meal
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Meal Plan Grid */}
        <div className="grid grid-cols-1 gap-4">
          {weekDays.map(day => {
            const dayMeals = getMealsForDay(day);
            return (
              <Card key={day} className="border-wasfah-mint/20 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-wasfah-deep-teal flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDateForDisplay(day)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dayMeals.length === 0 ? (
                    <p className="text-gray-500 text-sm">No meals planned</p>
                  ) : (
                    <div className="space-y-2">
                      {dayMeals.map(meal => {
                        const recipe = meal.type === 'recipe' 
                          ? mockRecipes.find(r => r.id === meal.recipeId)
                          : null;
                        
                        return (
                          <div key={meal.id} className="flex items-center justify-between p-2 bg-wasfah-light-gray rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-wasfah-mint/20 text-wasfah-deep-teal">
                                  {getMealTypeLabel(meal.mealType)}
                                </Badge>
                                <Utensils className="h-3 w-3 text-wasfah-teal" />
                              </div>
                              <p className="font-medium text-sm mt-1">
                                {meal.type === 'recipe' ? recipe?.name : meal.customText}
                              </p>
                              {meal.type === 'recipe' && (
                                <p className="text-xs text-gray-600">
                                  {meal.servings} servings • {recipe?.category}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveMeal(meal.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Auto-Planning Button */}
        <Button
          variant="outline"
          className="w-full border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
          onClick={handleGenerateAIMealPlan}
        >
          <Zap className="h-4 w-4 mr-2" />
          Generate AI Meal Plan (Premium)
        </Button>
      </div>
    </PageContainer>
  );
}
