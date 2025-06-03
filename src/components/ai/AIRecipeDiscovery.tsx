
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Users, 
  ChefHat,
  Sunrise,
  Sun,
  Sunset,
  Coffee
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const mealTimes = [
  { id: 'morning', label: 'Morning', labelAr: 'صباح', icon: Sunrise },
  { id: 'lunch', label: 'Lunch', labelAr: 'غداء', icon: Sun },
  { id: 'dinner', label: 'Dinner', labelAr: 'عشاء', icon: Sunset },
  { id: 'snack', label: 'Snack', labelAr: 'وجبة خفيفة', icon: Coffee }
];

const mockRecipes = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    titleAr: 'سلطة الكينوا المتوسطية',
    description: 'A healthy and colorful bowl with quinoa, vegetables, and tahini dressing',
    descriptionAr: 'وعاء صحي وملون مع الكينوا والخضروات وصلصة الطحينة',
    time: 25,
    servings: 2,
    mealTime: 'lunch',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Overnight Oats with Berries',
    titleAr: 'الشوفان المنقوع مع التوت',
    description: 'Creamy overnight oats topped with fresh berries and nuts',
    descriptionAr: 'شوفان كريمي منقوع طوال الليل مع التوت الطازج والمكسرات',
    time: 5,
    servings: 1,
    mealTime: 'morning',
    image: '/placeholder.svg'
  }
];

export const AIRecipeDiscovery = () => {
  const { t } = useRTL();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealTime, setSelectedMealTime] = useState<string>('');
  const [preferences, setPreferences] = useState('');
  const [discoveredRecipes, setDiscoveredRecipes] = useState(mockRecipes);
  const [isSearching, setIsSearching] = useState(false);

  const handleDiscover = async () => {
    setIsSearching(true);
    // Simulate AI search delay
    setTimeout(() => {
      let filtered = mockRecipes;
      
      if (selectedMealTime) {
        filtered = filtered.filter(recipe => recipe.mealTime === selectedMealTime);
      }
      
      if (searchQuery) {
        filtered = filtered.filter(recipe => 
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setDiscoveredRecipes(filtered);
      setIsSearching(false);
    }, 1500);
  };

  const getMealTimeBadge = (mealTime: string) => {
    const mealTimeConfig = mealTimes.find(mt => mt.id === mealTime);
    if (!mealTimeConfig) return null;
    
    const Icon = mealTimeConfig.icon;
    
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {t(mealTimeConfig.label, mealTimeConfig.labelAr)}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          {t('AI Recipe Discovery', 'اكتشاف الوصفات بالذكاء الاصطناعي')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('What would you like to cook?', 'ماذا تريد أن تطبخ؟')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Meal Time Filter */}
        <div>
          <label className="text-sm font-medium mb-3 block">
            {t('Meal Time', 'وقت الوجبة')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {mealTimes.map((mealTime) => {
              const Icon = mealTime.icon;
              return (
                <Button
                  key={mealTime.id}
                  variant={selectedMealTime === mealTime.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMealTime(selectedMealTime === mealTime.id ? '' : mealTime.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {t(mealTime.label, mealTime.labelAr)}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            {t('Dietary Preferences & Restrictions', 'التفضيلات والقيود الغذائية')}
          </label>
          <Textarea
            placeholder={t('e.g., vegetarian, gluten-free, low-carb...', 'مثل: نباتي، خالي من الجلوتين، قليل الكربوهيدرات...')}
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            rows={2}
          />
        </div>

        {/* Discover Button */}
        <Button 
          onClick={handleDiscover}
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              {t('Discovering...', 'جاري الاكتشاف...')}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {t('Discover Recipes', 'اكتشف الوصفات')}
            </>
          )}
        </Button>

        {/* Results */}
        {discoveredRecipes.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {t('Discovered Recipes', 'الوصفات المكتشفة')}
            </h3>
            <div className="grid gap-4">
              {discoveredRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <img
                      src={recipe.image}
                      alt={t(recipe.title, recipe.titleAr)}
                      className="w-24 h-24 object-cover"
                    />
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">
                          {t(recipe.title, recipe.titleAr)}
                        </h4>
                        {getMealTimeBadge(recipe.mealTime)}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {t(recipe.description, recipe.descriptionAr)}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{recipe.time} {t('min', 'دقيقة')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{recipe.servings} {t('servings', 'حصص')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
