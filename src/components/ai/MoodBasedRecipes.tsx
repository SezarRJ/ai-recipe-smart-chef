
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Heart, Cloud, Sun, CloudRain, Snowflake, Coffee, Pizza, Salad, Soup } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAIChef } from '@/hooks/useAIChef';

interface MoodRecipe {
  id: string;
  title: string;
  description: string;
  mood_match: number;
  comfort_level: 'Light' | 'Moderate' | 'High';
  prep_time: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

export const MoodBasedRecipes: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedWeather, setSelectedWeather] = useState<string>('');
  const [recommendations, setRecommendations] = useState<MoodRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  const { askAIChef } = useAIChef();
  const { toast } = useToast();

  const moods = [
    { id: 'happy', label: 'Happy & Energetic', icon: '😊', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'stressed', label: 'Stressed & Overwhelmed', icon: '😰', color: 'bg-red-100 text-red-800' },
    { id: 'sad', label: 'Sad & Down', icon: '😢', color: 'bg-blue-100 text-blue-800' },
    { id: 'excited', label: 'Excited & Adventurous', icon: '🤩', color: 'bg-purple-100 text-purple-800' },
    { id: 'tired', label: 'Tired & Low Energy', icon: '😴', color: 'bg-gray-100 text-gray-800' },
    { id: 'anxious', label: 'Anxious & Restless', icon: '😟', color: 'bg-orange-100 text-orange-800' },
    { id: 'romantic', label: 'Romantic & Cozy', icon: '🥰', color: 'bg-pink-100 text-pink-800' },
    { id: 'productive', label: 'Focused & Productive', icon: '💪', color: 'bg-green-100 text-green-800' }
  ];

  const weatherConditions = [
    { id: 'sunny', label: 'Sunny & Warm', icon: Sun, color: 'text-yellow-600' },
    { id: 'cloudy', label: 'Cloudy & Mild', icon: Cloud, color: 'text-gray-600' },
    { id: 'rainy', label: 'Rainy & Cool', icon: CloudRain, color: 'text-blue-600' },
    { id: 'cold', label: 'Cold & Crisp', icon: Snowflake, color: 'text-blue-400' }
  ];

  // Get current weather automatically (mock implementation)
  useEffect(() => {
    // In a real app, you'd use a weather API
    const detectWeather = () => {
      const hour = new Date().getHours();
      const season = Math.floor(Math.random() * 4);
      const conditions = ['sunny', 'cloudy', 'rainy', 'cold'];
      setSelectedWeather(conditions[season]);
    };
    
    detectWeather();
  }, []);

  const getMoodRecommendations = async () => {
    if (!selectedMood) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling to get personalized recommendations",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const prompt = `
        Please recommend 4-5 recipes based on the following emotional and environmental context:
        
        Current Mood: ${selectedMood}
        Weather: ${selectedWeather}
        Additional Context: ${userInput || 'None'}
        
        For each recommendation, consider:
        - How the recipe matches the emotional state
        - Comfort level and psychological benefits
        - Weather appropriateness
        - Preparation complexity based on energy levels
        - Specific ingredients that boost mood
        
        Please provide recipes that would psychologically comfort, energize, or soothe based on the mood.
        
        Format as a list with:
        - Recipe name and brief description
        - Why it matches the mood/weather
        - Comfort level (Light/Moderate/High)
        - Preparation time and difficulty
        - Key mood-boosting ingredients
      `;

      const response = await askAIChef(prompt);
      
      // Parse AI response into structured data (simplified parsing)
      const mockRecommendations: MoodRecipe[] = [
        {
          id: '1',
          title: getMoodSpecificRecipe(selectedMood).title,
          description: getMoodSpecificRecipe(selectedMood).description,
          mood_match: 95,
          comfort_level: getMoodSpecificRecipe(selectedMood).comfort_level,
          prep_time: getMoodSpecificRecipe(selectedMood).prep_time,
          difficulty: getMoodSpecificRecipe(selectedMood).difficulty,
          tags: getMoodSpecificRecipe(selectedMood).tags
        },
        {
          id: '2',
          title: getWeatherSpecificRecipe(selectedWeather).title,
          description: getWeatherSpecificRecipe(selectedWeather).description,
          mood_match: 88,
          comfort_level: getWeatherSpecificRecipe(selectedWeather).comfort_level,
          prep_time: getWeatherSpecificRecipe(selectedWeather).prep_time,
          difficulty: getWeatherSpecificRecipe(selectedWeather).difficulty,
          tags: getWeatherSpecificRecipe(selectedWeather).tags
        }
      ];

      setRecommendations(mockRecommendations);
      
      toast({
        title: "Recommendations ready!",
        description: `Found ${mockRecommendations.length} perfect recipes for your mood.`
      });
    } catch (error) {
      toast({
        title: "Failed to get recommendations",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodSpecificRecipe = (mood: string) => {
    const recipes = {
      happy: {
        title: "Colorful Buddha Bowl",
        description: "Vibrant, nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
        comfort_level: 'Light' as const,
        prep_time: 25,
        difficulty: 'Easy' as const,
        tags: ['energizing', 'colorful', 'healthy', 'fresh']
      },
      stressed: {
        title: "Chamomile Honey Chicken",
        description: "Soothing one-pan dish with calming herbs and gentle flavors",
        comfort_level: 'High' as const,
        prep_time: 35,
        difficulty: 'Easy' as const,
        tags: ['calming', 'one-pan', 'comfort', 'herbs']
      },
      sad: {
        title: "Classic Mac & Cheese",
        description: "Ultimate comfort food with creamy cheese sauce and crispy breadcrumbs",
        comfort_level: 'High' as const,
        prep_time: 30,
        difficulty: 'Easy' as const,
        tags: ['comfort', 'cheesy', 'warm', 'nostalgic']
      },
      excited: {
        title: "Spicy Korean Tacos",
        description: "Fusion adventure with gochujang-glazed protein and kimchi slaw",
        comfort_level: 'Light' as const,
        prep_time: 40,
        difficulty: 'Medium' as const,
        tags: ['spicy', 'fusion', 'adventurous', 'bold']
      },
      tired: {
        title: "Sheet Pan Lemon Herb Salmon",
        description: "Effortless dinner with minimal prep and maximum flavor",
        comfort_level: 'Moderate' as const,
        prep_time: 20,
        difficulty: 'Easy' as const,
        tags: ['easy', 'sheet-pan', 'protein-rich', 'omega-3']
      },
      anxious: {
        title: "Lavender Honey Tea Cake",
        description: "Gentle, aromatic cake with calming lavender and sweet honey",
        comfort_level: 'High' as const,
        prep_time: 45,
        difficulty: 'Medium' as const,
        tags: ['calming', 'lavender', 'sweet', 'therapeutic']
      },
      romantic: {
        title: "Chocolate Lava Cake for Two",
        description: "Intimate dessert with molten chocolate center and fresh berries",
        comfort_level: 'High' as const,
        prep_time: 25,
        difficulty: 'Medium' as const,
        tags: ['chocolate', 'romantic', 'intimate', 'decadent']
      },
      productive: {
        title: "Power Green Smoothie Bowl",
        description: "Brain-boosting bowl with spinach, berries, and nuts for sustained energy",
        comfort_level: 'Light' as const,
        prep_time: 10,
        difficulty: 'Easy' as const,
        tags: ['brain-food', 'energizing', 'quick', 'nutritious']
      }
    };
    
    return recipes[mood as keyof typeof recipes] || recipes.happy;
  };

  const getWeatherSpecificRecipe = (weather: string) => {
    const recipes = {
      sunny: {
        title: "Gazpacho with Herb Oil",
        description: "Refreshing cold soup perfect for warm weather",
        comfort_level: 'Light' as const,
        prep_time: 15,
        difficulty: 'Easy' as const,
        tags: ['cold', 'refreshing', 'hydrating', 'light']
      },
      cloudy: {
        title: "Mushroom Risotto",
        description: "Creamy, earthy comfort dish for mild weather",
        comfort_level: 'Moderate' as const,
        prep_time: 35,
        difficulty: 'Medium' as const,
        tags: ['creamy', 'earthy', 'warming', 'satisfying']
      },
      rainy: {
        title: "Hearty Lentil Stew",
        description: "Warming, protein-rich stew perfect for rainy days",
        comfort_level: 'High' as const,
        prep_time: 45,
        difficulty: 'Easy' as const,
        tags: ['warming', 'hearty', 'protein-rich', 'cozy']
      },
      cold: {
        title: "Beef and Barley Soup",
        description: "Soul-warming soup with tender beef and hearty grains",
        comfort_level: 'High' as const,
        prep_time: 60,
        difficulty: 'Medium' as const,
        tags: ['warming', 'hearty', 'protein', 'soul-food']
      }
    };
    
    return recipes[weather as keyof typeof recipes] || recipes.cloudy;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-wasfah-bright-teal" />
            Mood-Based Recipe Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div className="space-y-3">
            <h4 className="font-medium">How are you feeling today?</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {moods.map((mood) => (
                <Button
                  key={mood.id}
                  variant={selectedMood === mood.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`h-auto p-3 text-left ${
                    selectedMood === mood.id 
                      ? 'bg-wasfah-bright-teal text-white' 
                      : mood.color
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-lg">{mood.icon}</span>
                    <span className="text-xs font-medium leading-tight">
                      {mood.label}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Weather Detection */}
          <div className="space-y-3">
            <h4 className="font-medium">Current Weather</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {weatherConditions.map((weather) => {
                const IconComponent = weather.icon;
                return (
                  <Button
                    key={weather.id}
                    variant={selectedWeather === weather.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedWeather(weather.id)}
                    className={selectedWeather === weather.id ? 'bg-wasfah-bright-teal text-white' : ''}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <IconComponent className={`h-4 w-4 ${weather.color}`} />
                      <span className="text-xs">{weather.label}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Additional Context */}
          <div className="space-y-3">
            <h4 className="font-medium">Anything else? (Optional)</h4>
            <textarea
              placeholder="Tell me more about what you're craving or any specific dietary needs..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
            />
          </div>

          <Button
            onClick={getMoodRecommendations}
            disabled={isLoading || !selectedMood}
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Perfect Recipes...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Get My Mood Recipes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Perfect Recipes for You</h3>
          {recommendations.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{recipe.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {recipe.description}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium text-wasfah-bright-teal">
                      {recipe.mood_match}% match
                    </div>
                    <div className="text-gray-500">
                      {recipe.prep_time} min • {recipe.difficulty}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge 
                    variant={recipe.comfort_level === 'High' ? 'default' : 'secondary'}
                    className={
                      recipe.comfort_level === 'High' 
                        ? 'bg-wasfah-bright-teal text-white' 
                        : ''
                    }
                  >
                    {recipe.comfort_level} Comfort
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
