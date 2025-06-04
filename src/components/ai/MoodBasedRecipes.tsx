import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Heart, Cloud, Sun, CloudRain, Snowflake, Coffee, Pizza, Salad, Soup } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAIChef } from '@/hooks/useAIChef';
import { useRTL } from '@/contexts/RTLContext';

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

const MoodBasedRecipes: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedWeather, setSelectedWeather] = useState<string>('');
  const [recommendations, setRecommendations] = useState<MoodRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  const { askAIChef } = useAIChef();
  const { toast } = useToast();
  const { t, direction } = useRTL();

  const moods = [
    { id: 'happy', label: t('Happy & Energetic', 'سعيد ونشيط'), icon: '😊', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { id: 'stressed', label: t('Stressed & Overwhelmed', 'متوتر ومثقل'), icon: '😰', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
    { id: 'sad', label: t('Sad & Down', 'حزين ومحبط'), icon: '😢', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    { id: 'excited', label: t('Excited & Adventurous', 'متحمس ومغامر'), icon: '🤩', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    { id: 'tired', label: t('Tired & Low Energy', 'متعب وقليل الطاقة'), icon: '😴', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' },
    { id: 'anxious', label: t('Anxious & Restless', 'قلق ومضطرب'), icon: '😟', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
    { id: 'romantic', label: t('Romantic & Cozy', 'رومانسي ودافئ'), icon: '🥰', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
    { id: 'productive', label: t('Focused & Productive', 'مركز ومنتج'), icon: '💪', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' }
  ];

  const weatherConditions = [
    { id: 'sunny', label: t('Sunny & Warm', 'مشمس ودافئ'), icon: Sun, color: 'text-yellow-600' },
    { id: 'cloudy', label: t('Cloudy & Mild', 'غائم ومعتدل'), icon: Cloud, color: 'text-gray-600' },
    { id: 'rainy', label: t('Rainy & Cool', 'ممطر وبارد'), icon: CloudRain, color: 'text-blue-600' },
    { id: 'cold', label: t('Cold & Crisp', 'بارد ومنعش'), icon: Snowflake, color: 'text-blue-400' }
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
        title: t("Please select your mood", "يرجى اختيار مزاجك"),
        description: t("Choose how you're feeling to get personalized recommendations", "اختر كيف تشعر للحصول على توصيات مخصصة"),
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
        title: t("Recommendations ready!", "التوصيات جاهزة!"),
        description: t(`Found ${mockRecommendations.length} perfect recipes for your mood.`, `تم العثور على ${mockRecommendations.length} وصفة مثالية لمزاجك.`)
      });
    } catch (error) {
      toast({
        title: t("Failed to get recommendations", "فشل في الحصول على التوصيات"),
        description: t("Please try again later.", "يرجى المحاولة مرة أخرى لاحقاً."),
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
    <div className={`space-y-6 ${direction === 'rtl' ? 'text-right font-arabic' : 'text-left'}`} dir={direction}>
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-4">
          <CardTitle className={`flex items-center gap-3 text-xl font-bold ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <Heart className="h-6 w-6 text-wasfah-bright-teal" />
            {t('Mood-Based Recipe Suggestions', 'اقتراحات الوصفات حسب المزاج')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Mood Selection */}
          <div className="space-y-4">
            <h4 className={`font-semibold text-lg text-gray-800 dark:text-gray-200 ${direction === 'rtl' ? 'font-arabic' : ''}`}>
              {t('How are you feeling today?', 'كيف تشعر اليوم؟')}
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {moods.map((mood) => (
                <Button
                  key={mood.id}
                  variant={selectedMood === mood.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`h-auto p-4 ${
                    selectedMood === mood.id 
                      ? 'bg-wasfah-bright-teal hover:bg-wasfah-deep-teal text-white shadow-lg transform scale-105' 
                      : `${mood.color} hover:shadow-md transition-all duration-200`
                  } ${direction === 'rtl' ? 'font-arabic' : ''}`}
                >
                  <div className={`flex flex-col items-center space-y-2 ${direction === 'rtl' ? 'text-center' : ''}`}>
                    <span className="text-2xl">{mood.icon}</span>
                    <span className={`text-sm font-medium leading-tight text-center ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                      {mood.label}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Weather Detection */}
          <div className="space-y-4">
            <h4 className={`font-semibold text-lg text-gray-800 dark:text-gray-200 ${direction === 'rtl' ? 'font-arabic' : ''}`}>
              {t('Current Weather', 'الطقس الحالي')}
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {weatherConditions.map((weather) => {
                const IconComponent = weather.icon;
                return (
                  <Button
                    key={weather.id}
                    variant={selectedWeather === weather.id ? "default" : "outline"}
                    size="lg"
                    onClick={() => setSelectedWeather(weather.id)}
                    className={`h-auto p-4 ${
                      selectedWeather === weather.id 
                        ? 'bg-wasfah-bright-teal hover:bg-wasfah-deep-teal text-white shadow-lg' 
                        : 'hover:shadow-md'
                    } transition-all duration-200 ${direction === 'rtl' ? 'font-arabic' : ''}`}
                  >
                    <div className={`flex flex-col items-center space-y-2 ${direction === 'rtl' ? 'text-center' : ''}`}>
                      <IconComponent className={`h-6 w-6 ${selectedWeather === weather.id ? 'text-white' : weather.color}`} />
                      <span className={`text-sm font-medium ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                        {weather.label}
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Additional Context */}
          <div className="space-y-4">
            <h4 className={`font-semibold text-lg text-gray-800 dark:text-gray-200 ${direction === 'rtl' ? 'font-arabic' : ''}`}>
              {t('Anything else? (Optional)', 'أي شيء آخر؟ (اختياري)')}
            </h4>
            <textarea
              placeholder={t('Tell me more about what you\'re craving or any specific dietary needs...', 'أخبرني المزيد عما تشتهيه أو أي احتياجات غذائية محددة...')}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={`w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-wasfah-bright-teal focus:border-transparent transition-all duration-200 ${direction === 'rtl' ? 'text-right font-arabic' : 'text-left'}`}
              rows={3}
              dir={direction}
            />
          </div>

          <Button
            onClick={getMoodRecommendations}
            disabled={isLoading || !selectedMood}
            className={`w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 ${direction === 'rtl' ? 'font-arabic' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className={`h-5 w-5 animate-spin ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                {t('Finding Perfect Recipes...', 'البحث عن الوصفات المثالية...')}
              </>
            ) : (
              <>
                <Heart className={`h-5 w-5 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                {t('Get My Mood Recipes', 'احصل على وصفات مزاجي')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className={`text-2xl font-bold text-gray-900 dark:text-white ${direction === 'rtl' ? 'font-arabic' : ''}`}>
            {t('Perfect Recipes for You', 'الوصفات المثالية لك')}
          </h3>
          {recommendations.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardContent className="p-6">
                <div className={`flex justify-between items-start mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <h4 className={`font-bold text-xl text-gray-900 dark:text-white mb-2 ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                      {recipe.title}
                    </h4>
                    <p className={`text-gray-600 dark:text-gray-400 text-base leading-relaxed ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                      {recipe.description}
                    </p>
                  </div>
                  <div className={`text-center ml-6 ${direction === 'rtl' ? 'mr-6 ml-0' : ''}`}>
                    <div className="font-bold text-2xl text-wasfah-bright-teal mb-1">
                      {recipe.mood_match}%
                    </div>
                    <div className={`text-sm text-gray-500 dark:text-gray-400 ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                      {t('match', 'مطابقة')}
                    </div>
                    <div className={`text-sm text-gray-500 dark:text-gray-400 mt-2 ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                      {recipe.prep_time} {t('min', 'دقيقة')} • {recipe.difficulty}
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center justify-between ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex gap-2 flex-wrap ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    {recipe.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className={`text-sm px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 ${direction === 'rtl' ? 'font-arabic' : ''}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge 
                    variant={recipe.comfort_level === 'High' ? 'default' : 'secondary'}
                    className={`text-sm px-4 py-2 font-semibold ${
                      recipe.comfort_level === 'High' 
                        ? 'bg-wasfah-bright-teal text-white' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    } ${direction === 'rtl' ? 'font-arabic' : ''}`}
                  >
                    {recipe.comfort_level} {t('Comfort', 'راحة')}
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

export default MoodBasedRecipes;
