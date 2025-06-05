// src/pages/ai/MoodBasedRecipes.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Smile, Loader2, Sparkles, Utensils, Heart } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface RecipeSuggestion {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
}

const mockMoodRecipes: { [mood: string]: RecipeSuggestion[] } = {
  "happy": [
    { id: '1', name: "Celebration Cake", description: "A joyful and sweet treat for special moments.", image: "https://images.unsplash.com/photo-1578985545067-69b50b69bc3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/1" },
    { id: '2', name: "Bright Summer Salad", description: "Fresh and vibrant, perfect for a sunny mood.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/2" },
  ],
  "sad": [
    { id: '3', name: "Comforting Tomato Soup", description: "Warm and cozy, a hug in a bowl.", image: "https://images.unsplash.com/photo-1533777324503-e8477045b4c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/3" },
    { id: '4', name: "Rich Chocolate Brownies", description: "Indulgent and satisfying, perfect for a pick-me-up.", image: "https://images.unsplash.com/photo-1533777324503-e8477045b4c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/4" },
  ],
  "tired": [
    { id: '5', name: "Quick One-Pan Pasta", description: "Easy to make, minimal cleanup for tired evenings.", image: "https://images.unsplash.com/photo-1551887373-c8d45371c4c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/5" },
    { id: '6', name: "Soothing Herbal Tea Blend", description: "Relaxing and simple, to unwind.", image: "https://images.unsplash.com/photo-1576092497883-91b38f88c800?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/6" },
  ],
  "energetic": [
    { id: '7', name: "High-Protein Power Bowl", description: "Fuel your active day with this nutrient-packed meal.", image: "https://images.unsplash.com/photo-1540189549336-e69623e1b7f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/7" },
    { id: '8', name: "Spicy Stir-Fry", description: "Vibrant flavors to match your energetic mood.", image: "https://images.unsplash.com/photo-1563821014169-c0ae7f0d0e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/8" },
  ],
  // Default/Fallback
  "default": [
    { id: '9', name: "Classic Chicken Curry", description: "A popular and comforting dish for any mood.", image: "https://images.unsplash.com/photo-1512621776951-a579624eec3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/9" },
    { id: '10', name: "Vegetable Fried Rice", description: "Quick, versatile, and satisfying.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/recipe/10" },
  ]
};

const MoodBasedRecipes = () => {
  const { t, direction } = useRTL();
  const [selectedMood, setSelectedMood] = useState('');
  const [suggestedRecipes, setSuggestedRecipes] = useState<RecipeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const moods = [
    { value: 'happy', label: t('Happy', 'سعيد') },
    { value: 'sad', label: t('Sad', 'حزين') },
    { value: 'tired', label: t('Tired', 'متعب') },
    { value: 'energetic', label: t('Energetic', 'مفعم بالحيوية') },
    { value: 'calm', label: t('Calm', 'هادئ') },
    { value: 'stressed', label: t('Stressed', 'مجهد') },
    { value: 'adventurous', label: t('Adventurous', 'مغامر') },
  ];

  const handleGetRecipes = async () => {
    if (!selectedMood) {
      toast({
        title: t('Select Mood', 'اختر الحالة المزاجية'),
        description: t('Please select your current mood to get recipe suggestions.', 'الرجاء تحديد حالتك المزاجية الحالية للحصول على اقتراحات الوصفات.'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setSuggestedRecipes([]); // Clear previous results
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate AI processing

    try {
      const recipes = mockMoodRecipes[selectedMood] || mockMoodRecipes["default"];
      setSuggestedRecipes(recipes);
      toast({
        title: t('Recipes Suggested!', 'تم اقتراح الوصفات!'),
        description: t('Here are some recipes to match your mood.', 'إليك بعض الوصفات لتناسب حالتك المزاجية.'),
      });
    } catch (error) {
      console.error('Mood-based recipe error:', error);
      toast({
        title: t('Error', 'خطأ'),
        description: t('An error occurred while fetching mood-based recipes.', 'حدث خطأ أثناء جلب الوصفات بناءً على الحالة المزاجية.'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer header={{ title: t('Mood-Based Recipes', 'وصفات حسب الحالة المزاجية'), showBackButton: true }}>
      <div className={`p-4 pb-20 space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="bg-gradient-to-br from-pink-500 to-red-600 p-6 rounded-lg text-white text-center mb-6">
          <Smile className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('Recipes to Match Your Mood', 'وصفات لتناسب حالتك المزاجية')}</h1>
          <p className="opacity-90">{t('Let AI suggest dishes that resonate with how you feel.', 'دع الذكاء الاصطناعي يقترح أطباقًا تتوافق مع شعورك.')}</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label htmlFor="mood-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('How are you feeling today?', 'كيف تشعر اليوم؟')}
              </label>
              <Select value={selectedMood} onValueChange={setSelectedMood} disabled={isLoading}>
                <SelectTrigger id="mood-select" className="bg-white dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder={t('Select your mood', 'اختر حالتك المزاجية')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800">
                  {moods.map((mood) => (
                    <SelectItem key={mood.value} value={mood.value}>
                      {mood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleGetRecipes}
              disabled={isLoading || !selectedMood}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 animate-spin`} />
                  {t('Suggesting...', 'جاري الاقتراح...')}
                </>
              ) : (
                <>
                  <Sparkles className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {t('Get Recipe Suggestions', 'الحصول على اقتراحات الوصفات')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {hasSearched && !isLoading && suggestedRecipes.length > 0 && (
          <Card>
            <CardHeader className={`px-4 pt-4 pb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <CardTitle className="text-xl font-bold text-wasfah-deep-teal flex items-center">
                <Utensils className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-6 w-6`} />
                {t('Recipes for Your Mood', 'وصفات لحالتك المزاجية')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedRecipes.map(recipe => (
                <Link to={recipe.path} key={recipe.id} className="block">
                  <Card className="hover:shadow-md transition-all duration-300 group overflow-hidden">
                    <img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover" />
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{recipe.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{recipe.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}

        {hasSearched && !isLoading && suggestedRecipes.length === 0 && (
          <Card className="p-4 text-center text-gray-500 dark:text-gray-400">
            <p>{t('No recipes found for this mood.', 'لم يتم العثور على وصفات لهذه الحالة المزاجية.')}</p>
            <p className="mt-2 text-sm">{t('Try selecting a different mood or broaden your preferences.', 'حاول اختيار حالة مزاجية مختلفة أو وسّع تفضيلاتك.')}</p>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default MoodBasedRecipes;
