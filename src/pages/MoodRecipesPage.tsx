
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Sun, 
  Cloud, 
  Snowflake, 
  Smile, 
  Frown, 
  Meh, 
  Zap,
  Coffee,
  Thermometer,
  MapPin
} from 'lucide-react';

const MoodRecipesPage = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [weather, setWeather] = useState('sunny');
  const [recipes, setRecipes] = useState<any[]>([]);

  const moods = [
    { id: 'happy', label: 'Happy', icon: <Smile className="h-6 w-6" />, color: 'bg-yellow-500' },
    { id: 'sad', label: 'Sad', icon: <Frown className="h-6 w-6" />, color: 'bg-blue-500' },
    { id: 'neutral', label: 'Neutral', icon: <Meh className="h-6 w-6" />, color: 'bg-gray-500' },
    { id: 'energetic', label: 'Energetic', icon: <Zap className="h-6 w-6" />, color: 'bg-orange-500' },
    { id: 'tired', label: 'Tired', icon: <Coffee className="h-6 w-6" />, color: 'bg-amber-500' },
    { id: 'stressed', label: 'Stressed', icon: <Heart className="h-6 w-6" />, color: 'bg-red-500' },
  ];

  const weatherOptions = [
    { id: 'sunny', label: 'Sunny', icon: <Sun className="h-5 w-5" /> },
    { id: 'cloudy', label: 'Cloudy', icon: <Cloud className="h-5 w-5" /> },
    { id: 'cold', label: 'Cold', icon: <Snowflake className="h-5 w-5" /> },
    { id: 'hot', label: 'Hot', icon: <Thermometer className="h-5 w-5" /> },
  ];

  const generateRecipes = () => {
    // Mock recipe generation based on mood and weather
    const mockRecipes = [
      {
        id: '1',
        title: 'Comfort Mac & Cheese',
        image: '/placeholder.svg',
        prepTime: 15,
        cookTime: 25,
        mood: ['sad', 'stressed'],
        weather: ['cold', 'cloudy'],
        description: 'Creamy comfort food to boost your mood'
      },
      {
        id: '2',
        title: 'Fresh Summer Salad',
        image: '/placeholder.svg',
        prepTime: 10,
        cookTime: 0,
        mood: ['happy', 'energetic'],
        weather: ['sunny', 'hot'],
        description: 'Light and refreshing for sunny days'
      },
      {
        id: '3',
        title: 'Warm Soup Bowl',
        image: '/placeholder.svg',
        prepTime: 20,
        cookTime: 30,
        mood: ['tired', 'neutral'],
        weather: ['cold', 'cloudy'],
        description: 'Nourishing and warming soup'
      }
    ];

    const filtered = mockRecipes.filter(recipe => 
      recipe.mood.includes(selectedMood) && recipe.weather.includes(weather)
    );

    setRecipes(filtered.length > 0 ? filtered : mockRecipes);
  };

  return (
    <PageContainer header={{ title: 'Mood-Based Recipes', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">How are you feeling?</h1>
          <p className="text-gray-600">
            Get personalized recipe suggestions based on your mood and the weather
          </p>
        </div>

        {/* Current Weather */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-wasfah-bright-teal" />
              Current Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {weatherOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={weather === option.id ? "default" : "outline"}
                  onClick={() => setWeather(option.id)}
                  className="flex items-center gap-2"
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mood Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Your Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {moods.map((mood) => (
                <Card
                  key={mood.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedMood === mood.id ? 'ring-2 ring-wasfah-bright-teal' : ''
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <CardContent className="pt-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${mood.color} text-white mb-3`}>
                      {mood.icon}
                    </div>
                    <h3 className="font-semibold">{mood.label}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        {selectedMood && (
          <Button
            onClick={generateRecipes}
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
            size="lg"
          >
            Find Perfect Recipes for My Mood
          </Button>
        )}

        {/* Recipe Results */}
        {recipes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Recipes for You</h2>
            <div className="grid gap-4">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden">
                  <div className="md:flex">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full md:w-48 h-48 md:h-auto object-cover"
                    />
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{recipe.title}</h3>
                        <Badge variant="secondary">Perfect Match</Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{recipe.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Prep: {recipe.prepTime}m</span>
                        <span>Cook: {recipe.cookTime}m</span>
                      </div>
                      <Button className="mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal">
                        View Recipe
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default MoodRecipesPage;
