
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Utensils, 
  Heart,
  Leaf,
  Wheat,
  Fish,
  Beef,
  Zap
} from 'lucide-react';

const SmartRecipeAdaptationPage = () => {
  const [originalRecipe] = useState({
    id: '1',
    title: 'Classic Beef Stroganoff',
    servings: 4,
    difficulty: 'Medium',
    cookTime: 45,
    equipment: ['Large skillet', 'Medium pot'],
    dietary: ['Contains gluten', 'Contains dairy'],
    ingredients: [
      '1 lb beef sirloin, sliced thin',
      '8 oz egg noodles',
      '1 cup sour cream',
      '2 tbsp flour',
      '1 onion, diced',
      '8 oz mushrooms, sliced'
    ]
  });

  const [adaptations, setAdaptations] = useState({
    servings: 4,
    skillLevel: 'medium',
    timeConstraint: 45,
    dietaryRestrictions: [] as string[],
    availableEquipment: [] as string[],
  });

  const [adaptedRecipe, setAdaptedRecipe] = useState<any>(null);

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: <Leaf className="h-4 w-4" /> },
    { id: 'vegan', label: 'Vegan', icon: <Heart className="h-4 w-4" /> },
    { id: 'gluten-free', label: 'Gluten-Free', icon: <Wheat className="h-4 w-4" /> },
    { id: 'dairy-free', label: 'Dairy-Free', icon: <Fish className="h-4 w-4" /> },
    { id: 'low-carb', label: 'Low-Carb', icon: <Beef className="h-4 w-4" /> },
  ];

  const skillLevels = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'medium', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];

  const equipment = [
    'Large skillet',
    'Medium pot',
    'Slow cooker',
    'Instant Pot',
    'Oven',
    'Microwave',
    'Food processor',
    'Blender'
  ];

  const adaptRecipe = () => {
    // Mock adaptation logic
    const adapted = {
      title: adaptations.dietaryRestrictions.includes('vegetarian') 
        ? 'Vegetarian Mushroom Stroganoff' 
        : 'Quick Beef Stroganoff',
      servings: adaptations.servings,
      difficulty: adaptations.skillLevel === 'beginner' ? 'Easy' : 
                  adaptations.skillLevel === 'advanced' ? 'Hard' : 'Medium',
      cookTime: adaptations.timeConstraint,
      ingredients: adaptations.dietaryRestrictions.includes('vegetarian')
        ? [
            '1 lb mixed mushrooms, sliced',
            '8 oz pasta (gluten-free if needed)',
            '1 cup cashew cream or coconut cream',
            '2 tbsp flour (or gluten-free flour)',
            '1 onion, diced',
            'Vegetable broth'
          ]
        : [
            '1 lb beef sirloin, sliced thin',
            '8 oz noodles',
            '1 cup sour cream',
            '2 tbsp flour',
            '1 onion, diced',
            '8 oz mushrooms, sliced'
          ],
      adaptations: [
        adaptations.dietaryRestrictions.includes('vegetarian') && 'Replaced beef with mixed mushrooms',
        adaptations.dietaryRestrictions.includes('gluten-free') && 'Used gluten-free flour and pasta',
        adaptations.dietaryRestrictions.includes('dairy-free') && 'Substituted cashew cream for sour cream',
        adaptations.timeConstraint < 30 && 'Simplified preparation steps for quicker cooking',
        adaptations.skillLevel === 'beginner' && 'Added detailed instructions for beginners'
      ].filter(Boolean)
    };

    setAdaptedRecipe(adapted);
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setAdaptations(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  };

  const toggleEquipment = (item: string) => {
    setAdaptations(prev => ({
      ...prev,
      availableEquipment: prev.availableEquipment.includes(item)
        ? prev.availableEquipment.filter(e => e !== item)
        : [...prev.availableEquipment, item]
    }));
  };

  return (
    <PageContainer header={{ title: 'Smart Recipe Adaptation', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Adapt Any Recipe</h1>
          <p className="text-gray-600">
            Automatically modify recipes for your dietary needs, skill level, and constraints
          </p>
        </div>

        {/* Original Recipe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-wasfah-bright-teal" />
              Original Recipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">{originalRecipe.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Users className="h-5 w-5 mx-auto mb-1 text-wasfah-bright-teal" />
                <p className="text-sm text-gray-600">Serves</p>
                <p className="font-semibold">{originalRecipe.servings}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 mx-auto mb-1 text-wasfah-bright-teal" />
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold">{originalRecipe.cookTime}m</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <ChefHat className="h-5 w-5 mx-auto mb-1 text-wasfah-bright-teal" />
                <p className="text-sm text-gray-600">Difficulty</p>
                <p className="font-semibold">{originalRecipe.difficulty}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Utensils className="h-5 w-5 mx-auto mb-1 text-wasfah-bright-teal" />
                <p className="text-sm text-gray-600">Equipment</p>
                <p className="font-semibold">{originalRecipe.equipment.length}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Ingredients:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {originalRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>• {ingredient}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Adaptation Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Adaptation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Servings */}
            <div>
              <Label htmlFor="servings">Number of Servings</Label>
              <Input
                id="servings"
                type="number"
                value={adaptations.servings}
                onChange={(e) => setAdaptations(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                min={1}
                max={20}
                className="mt-1"
              />
            </div>

            {/* Time Constraint */}
            <div>
              <Label htmlFor="time">Maximum Cooking Time (minutes)</Label>
              <Input
                id="time"
                type="number"
                value={adaptations.timeConstraint}
                onChange={(e) => setAdaptations(prev => ({ ...prev, timeConstraint: parseInt(e.target.value) }))}
                min={10}
                max={180}
                className="mt-1"
              />
            </div>

            {/* Skill Level */}
            <div>
              <Label>Skill Level</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {skillLevels.map((level) => (
                  <Button
                    key={level.id}
                    variant={adaptations.skillLevel === level.id ? "default" : "outline"}
                    onClick={() => setAdaptations(prev => ({ ...prev, skillLevel: level.id }))}
                    size="sm"
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <Label>Dietary Restrictions</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {dietaryOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={adaptations.dietaryRestrictions.includes(option.id) ? "default" : "outline"}
                    onClick={() => toggleDietaryRestriction(option.id)}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {option.icon}
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <Label>Available Equipment</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {equipment.map((item) => (
                  <Button
                    key={item}
                    variant={adaptations.availableEquipment.includes(item) ? "default" : "outline"}
                    onClick={() => toggleEquipment(item)}
                    size="sm"
                    className="text-xs"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Adapt Button */}
        <Button
          onClick={adaptRecipe}
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          size="lg"
        >
          <Zap className="h-5 w-5 mr-2" />
          Adapt Recipe
        </Button>

        {/* Adapted Recipe */}
        {adaptedRecipe && (
          <Card className="border-wasfah-bright-teal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-wasfah-bright-teal">
                <Zap className="h-5 w-5" />
                Adapted Recipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">{adaptedRecipe.title}</h3>
              
              {/* Adaptations Made */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Adaptations Made:</h4>
                <div className="space-y-1">
                  {adaptedRecipe.adaptations.map((adaptation: string, index: number) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {adaptation}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-wasfah-bright-teal/10 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-wasfah-bright-teal" />
                  <p className="text-sm text-gray-600">Serves</p>
                  <p className="font-semibold">{adaptedRecipe.servings}</p>
                </div>
                <div className="text-center p-3 bg-wasfah-bright-teal/10 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-wasfah-bright-teal" />
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold">{adaptedRecipe.cookTime}m</p>
                </div>
                <div className="text-center p-3 bg-wasfah-bright-teal/10 rounded-lg">
                  <ChefHat className="h-5 w-5 mx-auto mb-1 text-wasfah-bright-teal" />
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <p className="font-semibold">{adaptedRecipe.difficulty}</p>
                </div>
              </div>

              {/* Adapted Ingredients */}
              <div className="space-y-2">
                <p className="font-medium">Adapted Ingredients:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {adaptedRecipe.ingredients.map((ingredient: string, index: number) => (
                    <li key={index}>• {ingredient}</li>
                  ))}
                </ul>
              </div>

              <Button className="w-full mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal">
                View Full Adapted Recipe
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SmartRecipeAdaptationPage;
