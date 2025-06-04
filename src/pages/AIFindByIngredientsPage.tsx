
import React, { useState, ElementType, useEffect } from 'react';
import {
  Utensils, Cake, Coffee, Camera, Mic, Soup, Salad, Egg, Milk, Drumstick,
  LeafyGreen, Carrot, IceCream, Cookie, Wine, Beer, ChefHat,
  Sparkles, Wheat, Fish, GlassWater, Package2, Loader2,
} from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { CategorySelector } from '@/components/ingredients/CategorySelector';
import { IngredientManager } from '@/components/ingredients/IngredientManager';
import { FilterPanel } from '@/components/ingredients/FilterPanel';
import { SearchSummary } from '@/components/ingredients/SearchSummary';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import { DrinkCustomizationForm, DrinkOptions } from '@/components/drinks/DrinkCustomizationForm';
import { Recipe } from '@/types/index';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';

interface MainCategory {
  id: string;
  name: string;
  icon: ElementType;
  subcategories: { name: string; icon: ElementType; requiresCustomForm?: boolean }[];
}

interface AIFilters {
  dietary: string;
  cookingTime: string;
  difficulty: string;
  cuisine: string;
}

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  source: 'manual' | 'pantry';
  icon?: ElementType;
}

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  icon?: ElementType;
}

export default function FindByIngredients() {
  const { toast } = useToast();
  const { t } = useRTL();
  const location = useLocation();

  // Get ingredients from previous page if navigated from ingredient selection
  const stateIngredients = location.state?.selectedIngredients || [];

  // --- Categories, Filters, Pantry ---
  const mainCategories: MainCategory[] = [
    {
      id: 'food',
      name: 'Food',
      icon: ChefHat,
      subcategories: [
        { name: 'Main Dishes', icon: ChefHat },
        { name: 'Appetizers', icon: Salad },
        { name: 'Pickles', icon: Package2 },
        { name: 'Soups', icon: Soup },
        { name: 'Sauces', icon: Utensils },
        { name: 'Others', icon: Utensils }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: Cake,
      subcategories: [
        { name: 'Traditional', icon: Cookie },
        { name: 'Western', icon: IceCream },
        { name: 'Pastries', icon: Cake },
        { name: 'Ice Cream', icon: IceCream },
        { name: 'Others', icon: Sparkles }
      ]
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: Coffee,
      subcategories: [
        { name: 'Detox', icon: GlassWater },
        { name: 'Cocktails', icon: Wine },
        { name: 'Alcoholic', icon: Beer, requiresCustomForm: true },
        { name: 'Hot Drinks', icon: Coffee },
        { name: 'Others', icon: GlassWater }
      ]
    },
  ];

  const AI_FILTER_OPTIONS = {
    dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
    cookingTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
    difficulty: ['Beginner', 'Intermediate', 'Expert'],
    cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
  };

  const PANTRY_ITEMS: PantryItem[] = [
    { id: 'p1', name: 'Flour', quantity: '1', unit: 'kg', icon: Wheat },
    { id: 'p2', name: 'Sugar', quantity: '500', unit: 'g', icon: Sparkles },
    { id: 'p3', name: 'Eggs', quantity: '6', unit: 'pcs', icon: Egg },
    { id: 'p4', name: 'Milk', quantity: '1', unit: 'liter', icon: Milk },
    { id: 'p5', name: 'Chicken Breast', quantity: '500', unit: 'g', icon: Drumstick },
    { id: 'p6', name: 'Spinach', quantity: '200', unit: 'g', icon: LeafyGreen },
    { id: 'p7', name: 'Cheese', quantity: '300', unit: 'g', icon: Package2 },
    { id: 'p8', name: 'Salmon', quantity: '400', unit: 'g', icon: Fish },
    { id: 'p9', name: 'Shrimp', quantity: '500', unit: 'g', icon: Fish },
    { id: 'p10', name: 'Carrots', quantity: '5', unit: 'pcs', icon: Carrot },
  ];

  // --- State ---
  const [currentStep, setCurrentStep] = useState(stateIngredients.length > 0 ? 4 : 1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(
    stateIngredients.length > 0 ? mainCategories[0] : null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<{ name: string; icon: ElementType; requiresCustomForm?: boolean } | null>(
    stateIngredients.length > 0 ? mainCategories[0].subcategories[0] : null
  );
  const [filters, setFilters] = useState<AIFilters>({
    dietary: '',
    cookingTime: '',
    difficulty: '',
    cuisine: '',
  });
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);
  const [customDrinkOptions, setCustomDrinkOptions] = useState<DrinkOptions | null>(null);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Initialize ingredients from previous page
  useEffect(() => {
    if (stateIngredients.length > 0) {
      const initialIngredients: Ingredient[] = stateIngredients.map((name: string, index: number) => ({
        id: `from-selection-${index}`,
        name,
        quantity: '1',
        unit: 'cup',
        source: 'manual' as const
      }));
      setAddedIngredients(initialIngredients);
    }
  }, []);

  // --- Handlers ---
  const handleCategorySelect = (category: MainCategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    if (!stateIngredients.length) {
      setAddedIngredients([]);
    }
    setCustomDrinkOptions(null);
    setSearchResults([]);
    setShowResults(false);
    setCurrentStep(2);
  };

  const handleSubcategorySelect = (subcategory: { name: string; icon: ElementType; requiresCustomForm?: boolean }) => {
    setSelectedSubcategory(subcategory);
    if (!stateIngredients.length) {
      setAddedIngredients([]);
    }
    setCustomDrinkOptions(null);
    setSearchResults([]);
    setShowResults(false);
    setCurrentStep(3);
  };

  const handleFilterChange = (filterType: keyof AIFilters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    const ingredientWithId = ingredient.id ? ingredient : { ...ingredient, id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
    setAddedIngredients(prev => [...prev, ingredientWithId]);
  };

  const handleAddPantryItem = (item: PantryItem) => {
    const isAlreadyAdded = addedIngredients.some(ing => ing.name === item.name);
    if (isAlreadyAdded) {
      toast({
        title: t('error.alreadyAdded') || "Already Added",
        description: `${item.name} ${t('error.alreadyInList') || 'is already in your list.'}`,
        variant: "default",
      });
      return;
    }
    setAddedIngredients(prev => [...prev, {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      source: 'pantry',
      icon: item.icon
    }]);
  };

  const handleRemoveIngredient = (id: string) => {
    setAddedIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const handleScanIngredients = () => {
    toast({
      title: t('feature.scan') || "Scan Feature",
      description: t('feature.scanDescription') || "Camera scanning feature will be implemented soon!",
    });
  };

  const handleVoiceInput = () => {
    toast({
      title: t('feature.voice') || "Voice Feature",
      description: t('feature.voiceDescription') || "Voice input feature will be implemented soon!",
    });
  };

  const handleGenerateCustomDrink = (options: DrinkOptions) => {
    setCustomDrinkOptions(options);
    setCurrentStep(4);
  };

  // --- AI-powered Search ---
  const handleSearchRecipes = async () => {
    const isAlcoholicDrinkSearch = selectedCategory?.id === 'drinks' && selectedSubcategory?.requiresCustomForm;
    if (!isAlcoholicDrinkSearch && addedIngredients.length === 0) {
      toast({
        title: t('Error', 'خطأ'),
        description: t('Please select at least one ingredient', 'يرجى اختيار مكون واحد على الأقل'),
        variant: "destructive",
      });
      return;
    }
    setIsSearching(true);
    try {
      let results: Recipe[] = [];
      if (isAlcoholicDrinkSearch && customDrinkOptions) {
        toast({
          title: t('Custom Drinks', 'المشروبات المخصصة'),
          description: t('Custom drink generation coming soon!', 'توليد المشروبات المخصصة قريباً!'),
        });
        results = [];
      } else {
        // Use AI-powered search with optimized query for mobile
        const ingredientNames = addedIngredients.map(ing => ing.name);
        const aiQuery = `Generate 3-4 quick and easy recipes using: ${ingredientNames.join(', ')}.

Return ONLY valid JSON array. Format:
[{
  "title": "Recipe Name",
  "description": "Brief description", 
  "difficulty": "Easy",
  "prep_time": 10,
  "cook_time": 20,
  "servings": 4,
  "cuisine_type": "International",
  "calories": 300,
  "ingredients": [{"name": "ingredient", "amount": 1, "unit": "cup"}],
  "instructions": ["Step 1", "Step 2"]
}]

Focus on practical recipes that can be made with the ingredients provided.`;

        const { data: aiResponse, error: aiError } = await supabase.functions.invoke('ai-chef', {
          body: {
            query: aiQuery,
            context: {
              selectedIngredients: ingredientNames,
              requestType: 'recipe_generation',
              responseFormat: 'json_array'
            }
          }
        });

        if (aiError) throw new Error(`AI service error: ${aiError.message || 'Unknown error'}`);
        if (!aiResponse || !aiResponse.response) throw new Error('Invalid or empty response from AI service');

        let aiRecipes = [];
        try {
          const responseText = aiResponse.response.trim();
          if (responseText.startsWith('[') && responseText.endsWith(']')) {
            aiRecipes = JSON.parse(responseText);
          } else {
            // Fallback parsing logic
            const jsonArrayMatch = responseText.match(/\[[\s\S]*\]/);
            if (jsonArrayMatch) {
              aiRecipes = JSON.parse(jsonArrayMatch[0]);
            } else {
              // Create fallback recipe
              aiRecipes = [
                {
                  title: `Recipe with ${ingredientNames.slice(0, 2).join(' & ')}`,
                  description: `A delicious combination using ${ingredientNames.join(', ')}.`,
                  difficulty: 'Easy',
                  prep_time: 10,
                  cook_time: 20,
                  servings: 4,
                  cuisine_type: 'Fusion',
                  calories: 300,
                  instructions: [
                    'Prepare all ingredients',
                    'Heat oil in a pan',
                    'Add ingredients and cook',
                    'Season and serve'
                  ],
                  ingredients: ingredientNames.map(ing => ({
                    name: ing,
                    amount: 1,
                    unit: 'cup'
                  }))
                }
              ];
            }
          }
          if (!Array.isArray(aiRecipes) || aiRecipes.length === 0) throw new Error('No valid recipes found');
        } catch {
          // Fallback recipe
          aiRecipes = [
            {
              title: `Creative Recipe with ${ingredientNames.slice(0, 2).join(' & ')}`,
              description: `A delicious combination using ${ingredientNames.join(', ')}.`,
              difficulty: 'Medium',
              prep_time: 15,
              cook_time: 25,
              servings: 4,
              cuisine_type: 'Fusion',
              calories: 320,
              instructions: [
                'Prepare and wash all ingredients',
                'Heat oil in a large pan',
                'Add ingredients in order of cook time needed',
                'Season with salt, pepper, and preferred spices',
                'Cook until ingredients are tender',
                'Adjust seasoning and serve hot'
              ],
              ingredients: ingredientNames.map(ing => ({
                name: ing,
                amount: 1,
                unit: 'cup'
              }))
            }
          ];
        }

        // Transform to Recipe format
        results = aiRecipes.map((recipe: any, index: number): Recipe => ({
          id: `ai-recipe-${Date.now()}-${index}`,
          title: recipe.title || `Recipe with ${ingredientNames.join(', ')}`,
          description: recipe.description || `A recipe using ${ingredientNames.join(', ')}`,
          image_url: '',
          image: '',
          prep_time: recipe.prep_time || 15,
          prepTime: recipe.prep_time || 15,
          cook_time: recipe.cook_time || 30,
          cookTime: recipe.cook_time || 30,
          servings: recipe.servings || 4,
          difficulty: recipe.difficulty || 'Medium' as 'Easy' | 'Medium' | 'Hard',
          calories: recipe.calories || 300,
          rating: 0,
          ratingCount: 0,
          instructions: Array.isArray(recipe.instructions) ? recipe.instructions :
            (recipe.instructions ? [recipe.instructions] : ['Follow recipe steps']),
          categories: [],
          tags: ['AI Generated'],
          isFavorite: false,
          author_id: 'ai-chef',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_verified: true,
          cuisine_type: recipe.cuisine_type || 'Fusion',
          cuisineType: recipe.cuisine_type || 'Fusion',
          status: 'published' as 'draft' | 'published' | 'pending_review',
          ingredients: Array.isArray(recipe.ingredients) ?
            recipe.ingredients.map((ing: any) => ({
              id: `ing-${Math.random()}`,
              name: typeof ing === 'string' ? ing : (ing.name || ing.ingredient || 'Unknown'),
              amount: typeof ing === 'object' ? (ing.amount || ing.quantity || 1) : 1,
              unit: typeof ing === 'object' ? (ing.unit || 'cup') : 'cup'
            })) :
            ingredientNames.map(ing => ({
              id: `ing-${Math.random()}`,
              name: ing,
              amount: 1,
              unit: 'cup'
            }))
        }));
      }

      setSearchResults(results);
      setShowResults(true);

      if (results.length === 0) {
        toast({
          title: t('No Results Found', 'لم يتم العثور على نتائج'),
          description: t('No recipes found with your selected ingredients. Try different ingredients or remove some filters.', 'لم يتم العثور على وصفات بالمكونات المختارة. جرب مكونات أخرى أو احذف بعض المرشحات.'),
        });
      } else {
        toast({
          title: t('Search Complete', 'اكتمل البحث'),
          description: `${t('Found', 'تم العثور على')} ${results.length} ${t('recipes', 'وصفة')}!`,
        });
      }
    } catch (error: any) {
      toast({
        title: t('Error', 'خطأ'),
        description: error.message || t('Failed to search recipes. Please try again.', 'فشل في البحث عن الوصفات. يرجى المحاولة مرة أخرى.'),
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // --- Step Indicator ---
  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      <div className="flex space-x-2">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              step <= currentStep
                ? 'bg-wasfah-bright-teal text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );

  const showDrinkCustomizationForm = currentStep === 3 && selectedCategory?.id === 'drinks' && selectedSubcategory?.requiresCustomForm;

  // --- Results View ---
  if (showResults) {
    return (
      <PageContainer
        header={{
          title: t('Search Results', 'نتائج البحث'),
          showBackButton: true
        }}
        className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
      >
        <div className="space-y-6 pb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {t(`Found ${searchResults.length} recipes`, `تم العثور على ${searchResults.length} وصفة`)}
            </h2>
            <p className="text-gray-600">
              {t('Recipes using your selected ingredients', 'وصفات باستخدام المكونات المختارة')}
            </p>
          </div>
          <RecipeGrid recipes={searchResults} />
          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {t('No recipes found', 'لم يتم العثور على وصفات')}
              </h3>
              <p className="text-gray-500 mb-4">
                {t('Try different ingredients or adjust your filters', 'جرب مكونات مختلفة أو عدل المرشحات')}
              </p>
            </div>
          )}
        </div>
      </PageContainer>
    );
  }

  // --- Main Multi-Step UI ---
  return (
    <PageContainer
      header={{
        title: t('Find Recipe', 'ابحث عن وصفة'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        {renderStepIndicator()}

        <FilterPanel
          filters={filters}
          filterOptions={AI_FILTER_OPTIONS}
          showFilters={showFilters}
          onFilterChange={handleFilterChange}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onCloseFilters={() => setShowFilters(false)}
        />

        {currentStep === 1 && (
          <CategorySelector
            categories={mainCategories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            currentStep={currentStep}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect}
            onBack={() => {}}
          />
        )}

        {currentStep === 2 && selectedCategory && (
          <CategorySelector
            categories={mainCategories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            currentStep={currentStep}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          showDrinkCustomizationForm ? (
            <DrinkCustomizationForm
              onGenerateDrink={handleGenerateCustomDrink}
              onBack={() => setCurrentStep(2)}
            />
          ) : (
            <>
              <IngredientManager
                addedIngredients={addedIngredients}
                pantryItems={PANTRY_ITEMS}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                onAddPantryItem={handleAddPantryItem}
                onScanIngredients={handleScanIngredients}
                onVoiceInput={handleVoiceInput}
              />
              <div className="pt-4">
                <button
                  onClick={() => setCurrentStep(4)}
                  disabled={addedIngredients.length === 0}
                  className="w-full h-12 mt-6 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white disabled:bg-gray-300 rounded-lg font-medium transition-colors"
                >
                  {t('Continue to Search', 'متابعة للبحث')}
                </button>
              </div>
            </>
          )
        )}

        {currentStep === 4 && (
          <>
            <SearchSummary
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              ingredientCount={showDrinkCustomizationForm ? 0 : addedIngredients.length}
              filterCount={Object.values(filters).filter(v => v).length}
              customDrinkOptions={customDrinkOptions}
              onSearch={handleSearchRecipes}
            />
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-wasfah-bright-teal mr-2" />
                <span className="text-gray-600">
                  {t('Searching for recipes...', 'البحث عن الوصفات...')}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
