
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRTL } from '@/contexts/RTLContext';
import { 
  Brain, 
  Search, 
  ChefHat, 
  Users, 
  Heart, 
  UtensilsCrossed,
  Info,
  Percent
} from 'lucide-react';

const AlcoholRecipesAI = () => {
  const { t, direction } = useRTL();
  const [activeTab, setActiveTab] = useState('ai-generator');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Mock data for demonstration
  const mockRecipes = [
    {
      id: '1',
      name: 'Classic Mojito',
      abv: '12%',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=200&fit=crop',
      ingredients: ['White Rum', 'Lime Juice', 'Mint Leaves', 'Sugar', 'Soda Water'],
      instructions: ['Muddle mint leaves', 'Add lime juice and sugar', 'Pour rum', 'Top with soda water'],
      foodPairing: ['Grilled Seafood', 'Light Appetizers', 'Tropical Fruits'],
      servingSuggestion: 'Serve in a highball glass with ice and fresh mint garnish',
      mood: 'Refreshing',
      difficulty: 'Easy',
      prepTime: '5 minutes'
    },
    {
      id: '2',
      name: 'Spiced Old Fashioned',
      abv: '30%',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300&h=200&fit=crop',
      ingredients: ['Bourbon', 'Simple Syrup', 'Angostura Bitters', 'Orange Peel'],
      instructions: ['Mix bitters and syrup', 'Add bourbon', 'Stir with ice', 'Garnish with orange peel'],
      foodPairing: ['Dark Chocolate', 'Grilled Meats', 'Aged Cheese'],
      servingSuggestion: 'Serve in a rocks glass over a large ice cube',
      mood: 'Sophisticated',
      difficulty: 'Medium',
      prepTime: '8 minutes'
    }
  ];

  useEffect(() => {
    setRecipes(mockRecipes);
  }, []);

  // AI-Powered Drink Recipe Creation Component
  const AIDrinkCreation = () => {
    const [ingredients, setIngredients] = useState('');
    const [mood, setMood] = useState('');
    const [strength, setStrength] = useState('medium');

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-wasfah-bright-teal" />
            {t('AI-Powered Recipe Creation', 'إنشاء الوصفات بالذكاء الاصطناعي')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('Available Ingredients', 'المكونات المتاحة')}
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder={t('e.g., vodka, lime, mint...', 'مثل: فودكا، ليمون، نعناع...')}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('Desired Mood', 'المزاج المرغوب')}
            </label>
            <select 
              className="w-full p-3 border rounded-lg"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">{t('Select mood', 'اختر المزاج')}</option>
              <option value="refreshing">{t('Refreshing', 'منعش')}</option>
              <option value="sophisticated">{t('Sophisticated', 'راقي')}</option>
              <option value="tropical">{t('Tropical', 'استوائي')}</option>
              <option value="warming">{t('Warming', 'دافئ')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('Strength Preference', 'تفضيل القوة')}
            </label>
            <div className="flex gap-2">
              {['light', 'medium', 'strong'].map((level) => (
                <Button
                  key={level}
                  variant={strength === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStrength(level)}
                  className={strength === level ? "bg-wasfah-bright-teal" : ""}
                >
                  {t(level.charAt(0).toUpperCase() + level.slice(1), level)}
                </Button>
              ))}
            </div>
          </div>
          <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
            {t('Generate Recipe', 'إنشاء وصفة')}
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Recipe Browsing and Filtering Component
  const RecipeBrowsing = () => {
    const [filters, setFilters] = useState({
      abv: '',
      difficulty: '',
      mood: '',
      ingredient: ''
    });

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-wasfah-bright-teal" />
              {t('Browse & Filter Recipes', 'تصفح وتصفية الوصفات')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <select 
                className="p-2 border rounded-lg text-sm"
                value={filters.abv}
                onChange={(e) => setFilters({...filters, abv: e.target.value})}
              >
                <option value="">{t('ABV Range', 'نطاق الكحول')}</option>
                <option value="low">{t('Low (0-15%)', 'منخفض (0-15%)')}</option>
                <option value="medium">{t('Medium (15-25%)', 'متوسط (15-25%)')}</option>
                <option value="high">{t('High (25%+)', 'مرتفع (25%+)')}</option>
              </select>
              <select 
                className="p-2 border rounded-lg text-sm"
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              >
                <option value="">{t('Difficulty', 'الصعوبة')}</option>
                <option value="easy">{t('Easy', 'سهل')}</option>
                <option value="medium">{t('Medium', 'متوسط')}</option>
                <option value="hard">{t('Hard', 'صعب')}</option>
              </select>
            </div>
            <input
              type="text"
              className="w-full p-2 border rounded-lg text-sm"
              placeholder={t('Search by ingredient...', 'البحث حسب المكون...')}
              value={filters.ingredient}
              onChange={(e) => setFilters({...filters, ingredient: e.target.value})}
            />
          </CardContent>
        </Card>

        {/* Recipe Results */}
        <div className="grid gap-4">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-wasfah-deep-teal">{recipe.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{recipe.mood} • {recipe.prepTime}</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        ABV: {recipe.abv}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Cook Mode Component
  const CookMode = () => {
    const [currentStep, setCurrentStep] = useState(0);

    if (!selectedRecipe) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {t('Select a recipe to start cook mode', 'اختر وصفة لبدء وضع الطبخ')}
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-wasfah-bright-teal" />
            {selectedRecipe.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-wasfah-light-gray p-4 rounded-lg">
            <h4 className="font-medium mb-2">
              {t('Step', 'الخطوة')} {currentStep + 1} {t('of', 'من')} {selectedRecipe.instructions.length}
            </h4>
            <p className="text-gray-700">{selectedRecipe.instructions[currentStep]}</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              {t('Previous', 'السابق')}
            </Button>
            <Button 
              className="flex-1 bg-wasfah-bright-teal"
              onClick={() => setCurrentStep(Math.min(selectedRecipe.instructions.length - 1, currentStep + 1))}
              disabled={currentStep === selectedRecipe.instructions.length - 1}
            >
              {currentStep === selectedRecipe.instructions.length - 1 
                ? t('Complete', 'اكتمل') 
                : t('Next Step', 'الخطوة التالية')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Community Features Component
  const CommunityFeatures = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-wasfah-bright-teal" />
          {t('Community Features', 'ميزات المجتمع')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full justify-start">
          {t('Share Your Creation', 'شارك إبداعك')}
        </Button>
        <Button variant="outline" className="w-full justify-start">
          {t('Browse Community Recipes', 'تصفح وصفات المجتمع')}
        </Button>
        <Button variant="outline" className="w-full justify-start">
          {t('Join Bartending Challenges', 'انضم لتحديات النادل')}
        </Button>
        <Button variant="outline" className="w-full justify-start">
          {t('Rate & Review', 'قيم واكتب مراجعة')}
        </Button>
      </CardContent>
    </Card>
  );

  // User Favorites Component
  const UserFavorites = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-wasfah-bright-teal" />
          {t('Your Favorites & Wishlist', 'مفضلاتك وقائمة الأمنيات')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {t('Your favorite recipes will appear here', 'ستظهر وصفاتك المفضلة هنا')}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Food Pairing & Serving Component
  const FoodPairingServing = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-wasfah-bright-teal" />
            {t('Food Pairing Recommendations', 'توصيات تقديم الطعام')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedRecipe ? (
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">{t('Perfect Pairings', 'تقديمات مثالية')}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.foodPairing.map((pairing, index) => (
                    <Badge key={index} variant="outline">{pairing}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t('Serving Suggestion', 'اقتراح التقديم')}</h4>
                <p className="text-gray-600 text-sm">{selectedRecipe.servingSuggestion}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">
              {t('Select a recipe to see pairing suggestions', 'اختر وصفة لرؤية اقتراحات التقديم')}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-wasfah-bright-teal" />
            {t('ABV Information & Guidelines', 'معلومات وإرشادات نسبة الكحول')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-800">{t('Understanding ABV', 'فهم نسبة الكحول')}</h4>
              <p className="text-blue-600 text-sm mt-1">
                {t('ABV (Alcohol by Volume) indicates the percentage of alcohol in your drink', 'تشير نسبة الكحول إلى النسبة المئوية للكحول في مشروبك')}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-50 p-2 rounded">
                <p className="font-medium text-green-800">0-15%</p>
                <p className="text-xs text-green-600">{t('Light', 'خفيف')}</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded">
                <p className="font-medium text-yellow-800">15-25%</p>
                <p className="text-xs text-yellow-600">{t('Medium', 'متوسط')}</p>
              </div>
              <div className="bg-red-50 p-2 rounded">
                <p className="font-medium text-red-800">25%+</p>
                <p className="text-xs text-red-600">{t('Strong', 'قوي')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <PageContainer
      header={{
        title: t('Alcohol Recipes & AI', 'وصفات الكحول والذكاء الاصطناعي'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
      style={{ direction }}
    >
      <div className="space-y-6 pb-6 px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Craft Your Perfect Drink', 'اصنع مشروبك المثالي')}
          </h2>
          <p className="text-gray-600">
            {t('AI-powered drink creation and expert recommendations', 'إنشاء المشروبات بالذكاء الاصطناعي والتوصيات الخبيرة')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1">
            <TabsTrigger value="ai-generator" className="text-xs">
              <Brain className="h-4 w-4 mr-1" />
              {t('AI Create', 'إنشاء ذكي')}
            </TabsTrigger>
            <TabsTrigger value="browse" className="text-xs">
              <Search className="h-4 w-4 mr-1" />
              {t('Browse', 'تصفح')}
            </TabsTrigger>
            <TabsTrigger value="cook-mode" className="text-xs">
              <ChefHat className="h-4 w-4 mr-1" />
              {t('Cook', 'طبخ')}
            </TabsTrigger>
            <TabsTrigger value="community" className="text-xs">
              <Users className="h-4 w-4 mr-1" />
              {t('Community', 'مجتمع')}
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs">
              <Heart className="h-4 w-4 mr-1" />
              {t('Favorites', 'مفضلة')}
            </TabsTrigger>
            <TabsTrigger value="pairing" className="text-xs">
              <Info className="h-4 w-4 mr-1" />
              {t('Info & Pairing', 'معلومات')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-generator">
            <AIDrinkCreation />
          </TabsContent>

          <TabsContent value="browse">
            <RecipeBrowsing />
          </TabsContent>

          <TabsContent value="cook-mode">
            <CookMode />
          </TabsContent>

          <TabsContent value="community">
            <CommunityFeatures />
          </TabsContent>

          <TabsContent value="favorites">
            <UserFavorites />
          </TabsContent>

          <TabsContent value="pairing">
            <FoodPairingServing />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default AlcoholRecipesAI;
