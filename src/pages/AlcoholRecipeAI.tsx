
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useRTL } from '@/contexts/RTLContext';
import { GlassWater, Brain, Users, Heart, ChefHat } from 'lucide-react';

// Placeholder component for BasicSearch
const BasicSearch = ({ setRecipes, filters, setFilters, t }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    const data = await fetchRecipes({ ...filters, query: searchQuery });
    setRecipes(data);
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded-lg"
        placeholder={t('Search by ingredient, mood, or occasion...', 'ابحث حسب المكون، المزاج، أو المناسبة...')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <select
          className="p-2 border rounded-lg"
          value={filters.mood}
          onChange={(e) => setFilters({ ...filters, mood: e.target.value })}
        >
          <option value="">{t('Select Mood', 'اختر المزاج')}</option>
          <option value="Relaxed">{t('Relaxed', 'مرتاح')}</option>
          <option value="Festive">{t('Festive', 'احتفالي')}</option>
          <option value="Romantic">{t('Romantic', 'رومانسي')}</option>
        </select>
        <select
          className="p-2 border rounded-lg"
          value={filters.occasion}
          onChange={(e) => setFilters({ ...filters, occasion: e.target.value })}
        >
          <option value="">{t('Select Occasion', 'اختر المناسبة')}</option>
          <option value="Party">{t('Party', 'حفلة')}</option>
          <option value="Dinner">{t('Dinner', 'عشاء')}</option>
          <option value="Casual">{t('Casual Night', 'ليلة عادية')}</option>
        </select>
        <select
          className="p-2 border rounded-lg"
          value={filters.glass}
          onChange={(e) => setFilters({ ...filters, glass: e.target.value })}
        >
          <option value="">{t('Select Glass', 'اختر الكأس')}</option>
          <option value="Martini">{t('Martini Glass', 'كأس مارتيني')}</option>
          <option value="Highball">{t('Highball', 'هايبول')}</option>
          <option value="Flute">{t('Flute', 'فلوت')}</option>
        </select>
        <select
          className="p-2 border rounded-lg"
          value={filters.abvRange}
          onChange={(e) => setFilters({ ...filters, abvRange: e.target.value })}
        >
          <option value="">{t('Select ABV', 'اختر نسبة الكحول')}</option>
          <option value="low">{t('Low (<10%)', 'منخفض (<10%)')}</option>
          <option value="medium">{t('Medium (10-20%)', 'متوسط (10-20%)')}</option>
          <option value="high">{t('High (>20%)', 'مرتفع (>20%)')}</option>
        </select>
        <select
          className="p-2 border rounded-lg"
          value={filters.dietary}
          onChange={(e) => setFilters({ ...filters, dietary: e.target.value })}
        >
          <option value="">{t('Select Dietary', 'اختر النظام الغذائي')}</option>
          <option value="vegetarian">{t('Vegetarian', 'نباتي')}</option>
          <option value="gluten-free">{t('Gluten-Free', 'خالي من الغلوتين')}</option>
        </select>
      </div>
      <button
        className="w-full p-2 bg-wasfah-deep-teal text-white rounded-lg"
        onClick={handleSearch}
      >
        {t('Search', 'بحث')}
      </button>
    </div>
  );
};

// Placeholder component for AIDrinkGenerator
const AIDrinkGenerator = ({ setRecipes, t }) => {
  const [ingredients, setIngredients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sweetness, setSweetness] = useState('medium');
  const [strength, setStrength] = useState('medium');

  const handleGenerateRecipe = async () => {
    if (!ingredients) return;
    setIsLoading(true);
    const ingredientList = ingredients.split(',').map(item => item.trim());
    const newRecipe = await generateRecipe(ingredientList, { sweetness, strength });
    setRecipes((prev) => [newRecipe, ...prev]);
    setIngredients('');
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded-lg"
        placeholder={t('Enter ingredients (e.g., vodka, lime, mint)', 'أدخل المكونات (مثل: الفودكا، الليمون، النعناع)')}
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <div className="flex gap-2">
        <select
          className="p-2 border rounded-lg"
          value={sweetness}
          onChange={(e) => setSweetness(e.target.value)}
        >
          <option value="low">{t('Low Sweetness', 'حلاوة منخفضة')}</option>
          <option value="medium">{t('Medium Sweetness', 'حلاوة متوسطة')}</option>
          <option value="high">{t('High Sweetness', 'حلاوة مرتفعة')}</option>
        </select>
        <select
          className="p-2 border rounded-lg"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
        >
          <option value="low">{t('Low Strength', 'قوة منخفضة')}</option>
          <option value="medium">{t('Medium Strength', 'قوة متوسطة')}</option>
          <option value="high">{t('High Strength', 'قوة مرتفعة')}</option>
        </select>
      </div>
      <button
        className="w-full p-2 bg-wasfah-deep-teal text-white rounded-lg"
        onClick={handleGenerateRecipe}
        disabled={isLoading}
      >
        {isLoading ? t('Generating...', 'جارٍ التوليد...') : t('Generate Recipe', 'إنشاء وصفة')}
      </button>
    </div>
  );
};

// Placeholder component for CommunityFeed
const CommunityFeed = ({ recipes, t, navigateToCommunity }) => {
  const handleShareRecipe = async () => {
    console.log('Share recipe');
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600">{t('Explore and share recipes with the community.', 'استكشف وشارك الوصفات مع المجتمع.')}</p>
      <button
        className="w-full p-2 bg-green-600 text-white rounded-lg"
        onClick={navigateToCommunity}
      >
        {t('Join the Community', 'انضم إلى المجتمع')}
      </button>
      <button
        className="w-full p-2 bg-blue-600 text-white rounded-lg"
        onClick={handleShareRecipe}
      >
        {t('Share Your Recipe', 'شارك وصفتك')}
      </button>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold">{recipe.name}</h3>
          <p>{t('ABV', 'نسبة الكحول')}: {recipe.abv}</p>
          <p>{t('Shared by', 'مشاركة بواسطة')}: {recipe.user || 'Anonymous'}</p>
          <div className="flex gap-2 mt-2">
            <button className="p-1 bg-gray-200 rounded">{t('Like', 'إعجاب')}</button>
            <button className="p-1 bg-gray-200 rounded">{t('Comment', 'تعليق')}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Placeholder component for FavoritesList
const FavoritesList = ({ recipes, saveToFavorites, navigateToCookMode, t }) => {
  const [category, setCategory] = useState('All');
  const [notes, setNotes] = useState({});

  const handleAddNote = async (recipeId, note) => {
    const updatedNotes = { ...notes, [recipeId]: note };
    setNotes(updatedNotes);
    localStorage.setItem('recipeNotes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600">{t('Your saved drinks.', 'مشروباتك المحفوظة.')}</p>
      <select
        className="p-2 border rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">{t('All', 'الكل')}</option>
        <option value="Summer Drinks">{t('Summer Drinks', 'مشروبات الصيف')}</option>
        <option value="Party Cocktails">{t('Party Cocktails', 'كوكتيلات الحفلات')}</option>
      </select>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="p-4 bg-white rounded-lg shadow flex justify-between">
          <div>
            <h3 className="font-bold">{recipe.name}</h3>
            <p>{t('ABV', 'نسبة الكحول')}: {recipe.abv}</p>
            <p>{t('Food Pairing', 'الاقتران بالطعام')}: {recipe.foodPairing}</p>
            <input
              className="w-full p-2 border rounded-lg mt-2"
              placeholder={t('Add a note...', 'أضف ملاحظة...')}
              value={notes[recipe.id] || ''}
              onChange={(e) => handleAddNote(recipe.id, e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="p-2 bg-orange-500 text-white rounded-lg"
              onClick={() => saveToFavorites(recipe.id)}
            >
              {t('Save', 'حفظ')}
            </button>
            <button
              className="p-2 bg-wasfah-deep-teal text-white rounded-lg"
              onClick={() => navigateToCookMode(recipe)}
            >
              {t('Cook Mode', 'وضع الطهي')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Placeholder component for CookMode
const CookMode = ({ recipe, t }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleNextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleVoiceNarration = () => {
    console.log('Narrate:', recipe.instructions[currentStep]);
  };

  const startTimer = (duration) => {
    setTimer(duration);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{recipe.name}</h3>
      <p>{t('Step', 'الخطوة')} {currentStep + 1}: {recipe.instructions[currentStep]}</p>
      <div className="flex gap-2">
        <button
          className="p-2 bg-wasfah-deep-teal text-white rounded-lg"
          onClick={handleNextStep}
          disabled={currentStep === recipe.instructions.length - 1}
        >
          {t('Next Step', 'الخطوة التالية')}
        </button>
        <button
          className="p-2 bg-gray-600 text-white rounded-lg"
          onClick={handleVoiceNarration}
        >
          {t('Voice Narration', 'التعليق الصوتي')}
        </button>
        <button
          className="p-2 bg-gray-600 text-white rounded-lg"
          onClick={() => startTimer(30)}
        >
          {t('Start 30s Timer', 'بدء مؤقت 30 ثانية')}
        </button>
      </div>
      {isTimerRunning && <p>{t('Time Remaining', 'الوقت المتبقي')}: {timer}s</p>}
      <img src={recipe.image} alt={recipe.name} className="w-32 h-32 rounded-lg" />
    </div>
  );
};

// Mock API calls (replace with actual API endpoints)
const fetchRecipes = async (filters = {}) => {
  return [
    {
      id: '1',
      name: 'Mojito',
      abv: '12%',
      image: 'https://example.com/mojito.jpg',
      mood: 'Relaxed',
      glass: 'Highball',
      foodPairing: 'Grilled Shrimp',
      serving: 'Chilled',
      instructions: ['Muddle mint', 'Add lime juice', 'Shake with ice', 'Top with soda'],
      user: 'User1',
      prepTime: 'Quick',
      dietary: 'Vegetarian',
    },
    {
      id: '2',
      name: 'Margarita',
      abv: '20%',
      image: 'https://example.com/margarita.jpg',
      mood: 'Festive',
      glass: 'Margarita',
      foodPairing: 'Tacos',
      serving: 'On the rocks',
      instructions: ['Shake tequila, lime, triple sec', 'Strain into salted glass'],
      user: 'User2',
      prepTime: 'Moderate',
      dietary: 'Gluten-Free',
    },
  ];
};

const generateRecipe = async (ingredients, { sweetness, strength }) => {
  return {
    id: 'generated',
    name: 'Custom Cocktail',
    ingredients: ingredients.map(ing => `${ing} (${sweetness === 'low' ? 0.5 : sweetness === 'medium' ? 1 : 1.5} oz)`),
    instructions: ['Muddle ingredients', 'Shake with ice', 'Strain into glass'],
    abv: strength === 'low' ? '10%' : strength === 'medium' ? '15%' : '20%',
    glass: 'Martini',
    foodPairing: 'Grilled Shrimp',
    serving: 'Chilled',
    user: 'AI',
    prepTime: 'Quick',
    dietary: 'Vegetarian',
  };
};

const AlcoholRecipeAI = () => {
  const { t, direction } = useRTL();
  const [activeTab, setActiveTab] = useState('basic-search');
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ mood: '', occasion: '', glass: '', abvRange: '', dietary: '', query: '' });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchRecipes(filters);
      setRecipes(data);
    };
    loadRecipes();
  }, [filters]);

  const saveToFavorites = async (recipeId) => {
    try {
      const favorites = localStorage.getItem('favorites') || '[]';
      const updatedFavorites = [...JSON.parse(favorites), recipeId];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert(t('Recipe saved to favorites!', 'تم حفظ الوصفة في المفضلة!'));
    } catch (error) {
      console.error('Error saving to favorites:', error);
    }
  };

  const navigateToCookMode = (recipe) => {
    setSelectedRecipe(recipe);
    setActiveTab('cook-mode');
  };

  const navigateToCommunity = () => {
    console.log('Navigate to Community');
  };

  return (
    <PageContainer
      header={{
        title: t('Alcohol Recipes & AI', 'وصفات الكحول والذكاء الاصطناعي'),
        showBackButton: true,
      }}
      className={`bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
    >
      <div className="space-y-6 pb-6" dir={direction}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Craft Your Perfect Drink', 'اصنع مشروبك المثالي')}
          </h2>
          <p className="text-gray-600">
            {t('Explore existing recipes or let AI create a new one for you.', 'استكشف الوصفات الموجودة أو دع الذكاء الاصطناعي ينشئ وصفة جديدة لك.')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic-search">
              <div className="flex items-center space-x-2">
                <GlassWater className="h-5 w-5" />
                <span>{t('Basic Search', 'بحث أساسي')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="ai-generator">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>{t('AI Recipe Generator', 'مولد وصفات الذكاء الاصطناعي')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="community">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{t('Community', 'المجتمع')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>{t('Favorites', 'المفضلة')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="cook-mode">
              <div className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5" />
                <span>{t('Cook Mode', 'وضع الطهي')}</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic-search">
            <BasicSearch setRecipes={setRecipes} filters={filters} setFilters={setFilters} t={t} />
          </TabsContent>

          <TabsContent value="ai-generator">
            <AIDrinkGenerator setRecipes={setRecipes} t={t} />
          </TabsContent>

          <TabsContent value="community">
            <CommunityFeed recipes={recipes} t={t} navigateToCommunity={navigateToCommunity} />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesList recipes={recipes} saveToFavorites={saveToFavorites} navigateToCookMode={navigateToCookMode} t={t} />
          </TabsContent>

          <TabsContent value="cook-mode">
            {selectedRecipe ? (
              <CookMode recipe={selectedRecipe} t={t} />
            ) : (
              <p>{t('Select a recipe to start cook mode.', 'اختر وصفة لبدء وضع الطهي.')}</p>
            )}
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-wasfah-deep-teal">
            {t('Discover Drinks', 'اكتشف المشروبات')}
          </h3>
          {recipes.length === 0 ? (
            <p>{t('No recipes found.', 'لم يتم العثور على وصفات.')}</p>
          ) : (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center cursor-pointer"
                onClick={() => navigateToCookMode(recipe)}
              >
                <div>
                  <h4 className="font-bold">{recipe.name}</h4>
                  <p className="text-gray-600">{t('ABV', 'نسبة الكحول')}: {recipe.abv}</p>
                  <p className="text-gray-600">{t('Glass', 'الكأس')}: {recipe.glass}</p>
                  <p className="text-gray-600">{t('Mood', 'المزاج')}: {recipe.mood}</p>
                  <p className="text-gray-600">{t('Food Pairing', 'الاقتران بالطعام')}: {recipe.foodPairing}</p>
                  <p className="text-gray-600">{t('Serving', 'التقديم')}: {recipe.serving}</p>
                  <p className="text-gray-600">{t('Prep Time', 'وقت التحضير')}: {recipe.prepTime}</p>
                </div>
                <button
                  className="p-2 bg-orange-500 text-white rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveToFavorites(recipe.id);
                  }}
                >
                  {t('Save to Favorites', 'حفظ في المفضلة')}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AlcoholRecipeAI;
