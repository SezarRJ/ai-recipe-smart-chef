
import React, { useState, ElementType } from 'react';
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
import { useLanguage } from '@/contexts/LanguageContext';
import { DrinkCustomizationForm, DrinkOptions } from '@/components/drinks/DrinkCustomizationForm';
import { Recipe } from '@/types/index';
import { supabase } from '@/integrations/supabase/client';

interface MainCategory {
  id: string;
  name: string;
  icon: ElementType;
  subcategories: { name: string; icon: ElementType; requiresCustomForm?: boolean }[];
}

interface Filters {
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
  const { t } = useLanguage();

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

  const FILTER_OPTIONS = {
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
  const [currentStep, setCurrentStep] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<{ name: string; icon: ElementType; requiresCustomForm?: boolean } | null>(null);
  const [filters, setFilters] = useState<Filters>({
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

  // --- Handlers ---
  const handleCategorySelect = (category: MainCategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setAddedIngredients([]);
    setCustomDrinkOptions(null);
    setSearchResults([]);
    setShowResults(false);
    setCurrentStep(2);
  };

  const handleSubcategorySelect = (subcategory: { name: string; icon: ElementType; requiresCustomForm?: boolean }) => {
    setSelectedSubcategory(subcategory);
    setAddedIngredients([]);
    setCustomDrinkOptions(null);
    setSearchResults([]);
    setShowResults(false);
    setCurrentStep(3);
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
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
        title: t('error.title') || "Error",
        description: t('error.selectIngredients') || "Please select at least one ingredient",
        variant: "destructive",
      });
      return;
    }
    setIsSearching(true);
    try {
      let results: Recipe[] = [];
      if (isAlcoholicDrinkSearch && customDrinkOptions) {
        toast({
          title: t('feature.customDrinks') || "Custom Drinks",
          description: t('feature.customDrinksDescription') || "Custom drink generation coming soon!",
        });
        results = [];
      } else {
        // Use AI-powered search
        const ingredientNames = addedIngredients.map(ing => ing.name);
        const aiQuery = `Generate 3-5 practical recipes using these ingredients: ${ingredientNames.join(', ')}.

IMPORTANT: Respond with ONLY a valid JSON array. No extra text before or after.

Format each recipe as:
{
  "title": "Recipe Name",
  "description": "Brief 2-3 sentence description",
  "difficulty": "Easy",
  "prep_time": 15,
  "cook_time": 30,
  "servings": 4,
  "cuisine_type": "International",
  "calories": 350,
  "protein": 25,
  "carbs": 30,
  "fat": 15,
  "ingredients": [
    {"name": "ingredient", "amount": 1, "unit": "cup"}
  ],
  "instructions": [
    "Step 1: Prepare ingredients",
    "Step 2: Cook as directed"
  ]
}

Return array of 3-5 recipes that can realistically be made with the provided ingredients. Focus on Middle Eastern and international cuisines.`;

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
            const jsonArrayMatch = responseText.match(/\[[\s\S]*\]/);
            if (jsonArrayMatch) {
              aiRecipes = JSON.parse(jsonArrayMatch[0]);
            } else {
              const objectMatches = responseText.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
              if (objectMatches && objectMatches.length > 0) {
                aiRecipes = objectMatches.map((match) => {
                  try { return JSON.parse(match); } catch { return null; }
                }).filter(Boolean);
              } else {
                const cleanedResponse = responseText
                  .replace(/```json/g, '')
                  .replace(/```/g, '')
                  .replace(/^\s*[\w\s:]*\s*/, '')
                  .trim();
                if (cleanedResponse.startsWith('[') || cleanedResponse.startsWith('{')) {
                  const parsed = JSON.parse(cleanedResponse);
                  aiRecipes = Array.isArray(parsed) ? parsed : [parsed];
                }
              }
            }
          }
          if (!Array.isArray(aiRecipes) || aiRecipes.length === 0) throw new Error('No valid recipes found in AI response');
        } catch {
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
              protein: 20,
              carbs: 25,
              fat: 12,
              instructions: [
                'Prepare and wash all ingredients',
                'Heat oil in a large pan',
                'Add ingredients in order of cooking time needed',
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

        results = aiRecipes.map((recipe: any, index: number): Recipe => ({
          id: `ai-recipe-${Date.now()}-${index}`,
          title: recipe.title || `Recipe with ${ingredientNames.join(', ')}`,
          description: recipe.description || `A recipe using ${ingredientNames.join(', ')}`,
          image_url: '',
          image: '',
          prep_time: recipe.prep_time || 15,
          cooking_time: recipe.cook_time || recipe.cooking_time || 30,
          total_time: (recipe.prep_time || 15) + (recipe.cook_time || recipe.cooking_time || 30),
          servings: recipe.servings || 4,
          difficulty: recipe.difficulty || 'Medium' as 'Easy' | 'Medium' | 'Hard',
          calories: recipe.calories || 300,
          protein: recipe.protein || Math.floor(Math.random() * 20) + 15,
          carbs: recipe.carbs || Math.floor(Math.random() * 30) + 20,
          fat: recipe.fat || Math.floor(Math.random() * 15) + 10,
          rating: 0,
          rating_count: 0,
          instructions: Array.isArray(recipe.instructions) ? recipe.instructions :
            (recipe.instructions ? [recipe.instructions] : ['Follow recipe steps']),
          categories: [],
          tags: ['AI Generated'],
          isFavorite: false,
          is_published: true,
          is_public: true,
          user_id: 'ai-chef',
          author_id: 'ai-chef',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_verified: true,
          ingredients: Array.isArray(recipe.ingredients) ?
            recipe.ingredients.map((ing: any) => ({
              id: `ing-${Math.random()}`,
              name: typeof ing === 'string' ? ing : (ing.name || ing.ingredient || 'Unknown'),
              quantity: typeof ing === 'object' ? (ing.amount || ing.quantity || 1) : 1,
              unit: typeof ing === 'object' ? (ing.unit || 'cup') : 'cup'
            })) :
            ingredientNames.map(ing => ({
              id: `ing-${Math.random()}`,
              name: ing,
              quantity: 1,
              unit: 'cup'
            }))
        }));
      }

      setSearchResults(results);
      setShowResults(true);

      if (results.length === 0) {
        toast({
          title: t('search.noResults') || "No Results Found",
          description: t('search.noRecipesMatchingIngredients') || "No recipes found with your selected ingredients. Try different ingredients or remove some filters.",
        });
      } else {
        toast({
          title: t('search.success') || "Search Complete",
          description: `${t('search.foundRecipes') || 'Found'} ${results.length} ${t('search.recipes') || 'recipes'}!`,
        });
      }
    } catch (error: any) {
      toast({
        title: t('error.title') || "Error",
        description: error.message || t('error.searchFailed') || "Failed to search recipes. Please try again.",
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
          title: t('search.results') || 'Search Results',
          showBackButton: true
        }}
        className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
      >
        <div className="space-y-6 pb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {t('search.foundRecipesCount') || `Found ${searchResults.length} recipes`}
            </h2>
            <p className="text-gray-600">
              {t('search.withIngredients') || 'Recipes using your selected ingredients'}
            </p>
          </div>
          <RecipeGrid recipes={searchResults} />
          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {t('search.noRecipesFound') || 'No recipes found'}
              </h3>
              <p className="text-gray-500 mb-4">
                {t('search.tryDifferentIngredients') || 'Try different ingredients or adjust your filters'}
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
        title: t('findRecipe.title') || 'Find Recipe',
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        {renderStepIndicator()}

        <FilterPanel
          filters={filters}
          filterOptions={FILTER_OPTIONS}
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
                  {t('action.continueToSearch') || 'Continue to Search'}
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
                  {t('search.searching') || 'Searching for recipes...'}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
