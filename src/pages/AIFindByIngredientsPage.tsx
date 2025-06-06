import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { CategorySelector } from '@/components/ingredients/CategorySelector';
import { IngredientManager } from '@/components/ingredients/IngredientManager';
import { FilterPanel } from '@/components/ingredients/FilterPanel';
import { SearchSummary } from '@/components/ingredients/SearchSummary';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';
import { DrinkCustomizationForm, DrinkOptions } from '@/components/drinks/DrinkCustomizationForm';
import { useLocation } from 'react-router-dom';
import { StepIndicator } from '@/components/ingredients/StepIndicator';
import { RecipeSearchResults } from '@/components/ingredients/RecipeSearchResults';
import { useRecipeSearch } from '@/hooks/useRecipeSearch';
import { mainCategories, AI_FILTER_OPTIONS, PANTRY_ITEMS } from '@/components/ingredients/constants';
import { AIFilters, Ingredient } from '@/components/ingredients/types';

export default function FindByIngredients() {
  const { toast } = useToast();
  const { t } = useRTL();
  const location = useLocation();
  const { 
    searchResults, setSearchResults,
    isSearching, setIsSearching,
    showResults, setShowResults,
    searchRecipes 
  } = useRecipeSearch();

  // Get ingredients from previous page if navigated from ingredient selection
  const stateIngredients = location.state?.selectedIngredients || [];

  const [currentStep, setCurrentStep] = useState(stateIngredients.length > 0 ? 4 : 1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(
    stateIngredients.length > 0 ? mainCategories[0] : null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<{ name: string; icon: React.ElementType; requiresCustomForm?: boolean } | null>(
    stateIngredients.length > 0 ? mainCategories[0].subcategories[0] : null
  );
  const [filters, setFilters] = useState<AIFilters>({
    dietary: '',
    cookTime: '',
    difficulty: '',
    cuisine: '',
  });
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);
  const [customDrinkOptions, setCustomDrinkOptions] = useState<DrinkOptions | null>(null);

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

  const handleCategorySelect = (category: any) => {
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

  const handleSubcategorySelect = (subcategory: { name: string; icon: React.ElementType; requiresCustomForm?: boolean }) => {
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

  const handleAddPantryItem = (item: any) => {
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

  const handleSearchRecipes = async () => {
    const { results, showResults: shouldShowResults } = await searchRecipes(
      addedIngredients, 
      customDrinkOptions,
      selectedCategory,
      selectedSubcategory
    );
    
    if (shouldShowResults) {
      setSearchResults(results);
      setShowResults(true);
    }
  };

  const handleGoBack = () => {
    setShowResults(false);
  };

  const showDrinkCustomizationForm = currentStep === 3 && selectedCategory?.id === 'alcohol' && selectedSubcategory;

  if (showResults) {
    return (
      <RecipeSearchResults
        searchResults={searchResults}
        onBack={handleGoBack}
      />
    );
  }

  return (
    <PageContainer
      header={{
        title: t('Find Recipe', 'ابحث عن وصفة'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <StepIndicator currentStep={currentStep} />

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
