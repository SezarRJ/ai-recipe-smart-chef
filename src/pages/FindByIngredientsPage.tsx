// src/pages/FindByIngredientsPage.tsx
import React, { useState, ElementType } from 'react';
import {
  Utensils, Cake, Coffee, Camera, Mic, Soup, Salad, Egg, Milk, Drumstick,
  LeafyGreen, Apple, Carrot, IceCream, Cookie, Wine, Beer, Pizza, ChefHat,
  Share2, Calendar, Users, Award, Sparkles, Circle, Wheat, Fish, GlassWater,
  Package2, Candy, MoreHorizontal,
  // New icons for drink customization
  GlassWater as Cocktail, Droplet, Sun, Snowflake as Snow, Flame as Chili, Citrus, Leaf, Diamond, Cherry,
} from 'lucide-react';

import { PageContainer } from '@/components/layout/PageContainer';
import { CategorySelector } from '@/components/ingredients/CategorySelector';
import { IngredientManager } from '@/components/ingredients/IngredientManager';
import { FilterPanel } from '@/components/ingredients/FilterPanel';
import { SearchSummary } from '@/components/ingredients/SearchSummary';
import { useToast } from '@/hooks/use-toast';
// Import the new component and its type
import { DrinkCustomizationForm, DrinkOptions } from '@/components/drinks/DrinkCustomizationForm';

// Updated Ingredient interface to include optional icon
interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  source: 'manual' | 'pantry';
  icon?: ElementType;
}

// Updated PantryItem interface to include optional icon
interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  icon?: ElementType;
}

interface Filters {
  dietary: string;
  cookingTime: string;
  difficulty: string;
  cuisine: string;
}

// Define a type for the category structure including the new flag
interface MainCategory {
  id: string;
  name: string;
  icon: ElementType;
  // Removed 'image' property as it wasn't used in this component's logic
  // isCustomizable?: boolean; // Removed this flag from the main category
  // Reverted subcategories to use 'icon' as expected by CategorySelector
  subcategories: { name: string; icon: ElementType; requiresCustomForm?: boolean }[]; // Added flag to subcategory
}


export default function FindByIngredientsPage() {
  const { toast } = useToast();

  // --- Data with Thematic Icons (Updated based on image for main 'Food' category) ---
  const mainCategories: MainCategory[] = [ // Use the defined type
    {
      id: 'food',
      name: 'Food',
      icon: ChefHat, // Changed to ChefHat as it's the "By Ingredients" icon in the attached image
      subcategories: [
        { name: 'Main Dishes', icon: ChefHat }, // Chef hat for main cooking (still relevant here)
        { name: 'Appetizers', icon: Salad }, // Salad for starters
        { name: 'Pickles', icon: Package2 }, // Using Package2 as a generic substitute for Jar/Pickles
        { name: 'Soups', icon: Soup }, // Soup bowl
        { name: 'Sauces', icon: Utensils }, // Using Utensils as a substitute for Sauce
        { name: 'Others', icon: Utensils } // Generic food icon
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: Cake, // Cake icon (retained)
      subcategories: [
        { name: 'Traditional', icon: Cookie }, // Cookie/Pastry icon (retained)
        { name: 'Western', icon: IceCream }, // Ice cream for cold/western desserts (retained)
        { name: 'Pastries', icon: Cake }, // Cake/Pastry icon (retained)
        { name: 'Ice Cream', icon: IceCream }, // Ice cream icon (retained)
        { name: 'Others', icon: Sparkles } // Sparkles for sweet/special (retained)
      ]
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: Coffee, // Coffee/Drink icon (retained)
      subcategories: [
        { name: 'Detox', icon: GlassWater }, // Standard flow
        { name: 'Cocktails', icon: Wine }, // Standard flow (unless you want custom form for all cocktails?) - Keeping standard for now
        { name: 'Alcoholic', icon: Beer, requiresCustomForm: true }, // ADDED flag to this subcategory
        { name: 'Hot Drinks', icon: Coffee }, // Standard flow
        { name: 'Others', icon: GlassWater } // Standard flow
      ]
    },
  ];

  const FILTER_OPTIONS = {
    dietary: ['Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free'],
    cookingTime: ['Under 30 mins', '30-60 mins', '1-2 hours', 'Over 2 hours'],
    difficulty: ['Beginner', 'Intermediate', 'Expert'],
    cuisine: ['Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
  };

  // Mock Pantry Items - Using specific icons (retained)
  const PANTRY_ITEMS: PantryItem[] = [
    { id: 'p1', name: 'Flour', quantity: '1', unit: 'kg', icon: Wheat },
    { id: 'p2', name: 'Sugar', quantity: '500', unit: 'g', icon: Sparkles },
    { id: 'p3', name: 'Eggs', quantity: '6', unit: 'pcs', icon: Egg },
    { id: 'p4', name: 'Milk', quantity: '1', unit: 'liter', icon: Milk },
    { id: 'p5', name: 'Chicken Breast', quantity: '500', unit: 'g', icon: Drumstick },
    { id: 'p6', name: 'Spinach', quantity: '200', unit: 'g', icon: LeafyGreen },
    { id: 'p7', name: 'Cheese', quantity: '300', unit: 'g', icon: Package2 }, // Using Package2 for cheese
    { id: 'p8', name: 'Salmon', quantity: '400', unit: 'g', icon: Fish }, // Using Fish for Salmon
    { id: 'p9', name: 'Shrimp', quantity: '500', unit: 'g', icon: Fish }, // Using Fish for Shrimp
    { id: 'p10', name: 'Carrots', quantity: '5', unit: 'pcs', icon: Carrot },
  ];

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  // Use the MainCategory type for selectedCategory
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null);
  // Store the full subcategory object to access the requiresCustomForm flag
  const [selectedSubcategory, setSelectedSubcategory] = useState<{ name: string; icon: ElementType; requiresCustomForm?: boolean } | null>(null);
  const [filters, setFilters] = useState<Filters>({
    dietary: '',
    cookingTime: '',
    difficulty: '',
    cuisine: '',
  });
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);
  // NEW: State for custom drink options
  const [customDrinkOptions, setCustomDrinkOptions] = useState<DrinkOptions | null>(null);

  // Handlers
  const handleCategorySelect = (category: MainCategory) => { // Use MainCategory type
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory when category changes
    setAddedIngredients([]); // Reset ingredients when category changes
    setCustomDrinkOptions(null); // Reset drink options when category changes
    setCurrentStep(2); // Always go to step 2 (subcategory selection or custom form if applicable)
  };

  // Modified to accept the full subcategory object
  const handleSubcategorySelect = (subcategory: { name: string; icon: ElementType; requiresCustomForm?: boolean }) => {
    setSelectedSubcategory(subcategory);
    setAddedIngredients([]); // Reset ingredients when subcategory changes
    setCustomDrinkOptions(null); // Reset drink options when subcategory changes

    // Check if this specific subcategory requires the custom form
    if (selectedCategory?.id === 'drinks' && subcategory.requiresCustomForm) {
        setCurrentStep(3); // Go to step 3, which will render the custom form
    } else {
        setCurrentStep(3); // Go to step 3, which will render the Ingredient Manager
    }
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
            title: "Already Added",
            description: `${item.name} is already in your list.`,
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
        icon: item.icon // Include icon if available
    }]);
  };

  const handleRemoveIngredient = (id: string) => {
    setAddedIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const handleScanIngredients = () => {
    toast({
      title: "Scan Feature",
      description: "Camera scanning feature will be implemented soon!",
    });
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Feature",
      description: "Voice input feature will be implemented soon!",
    });
  };

  // NEW: Handle generation of custom drink
  const handleGenerateCustomDrink = (options: DrinkOptions) => {
    setCustomDrinkOptions(options);
    setCurrentStep(4); // Go straight to search summary after custom form
  };

  const handleSearchRecipes = () => {
    let searchData: any; // Use 'any' for flexibility, or define a more complex type

    // Check if the selected category is 'drinks' AND the selected subcategory requires the custom form
    const isAlcoholicDrinkSearch = selectedCategory?.id === 'drinks' && selectedSubcategory?.requiresCustomForm;

    if (isAlcoholicDrinkSearch && customDrinkOptions) {
      searchData = {
        category: selectedCategory.name,
        subcategory: selectedSubcategory.name, // Include subcategory name
        drinkOptions: customDrinkOptions, // Pass the new drink options structure
        filters,
      };
    } else {
      searchData = {
        category: selectedCategory?.name,
        subcategory: selectedSubcategory?.name, // Include subcategory name
        filters,
        ingredients: addedIngredients.map(ing => ({
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
        })),
      };
    }

    console.log('Searching recipes with:', searchData);
    toast({
      title: "Search Started",
      description: "Looking for recipes with your criteria...",
    });
    // In a real app, this would trigger an API call and navigate to results page
    // Example: navigate('/search-results', { state: { searchData } });
  };

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

  // Determine if the current view should be the custom drink form
  const showDrinkCustomizationForm = currentStep === 3 && selectedCategory?.id === 'drinks' && selectedSubcategory?.requiresCustomForm;

  return (
    <PageContainer
      header={{
        title: 'Find Recipe',
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

        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <CategorySelector
            categories={mainCategories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory} // This will be null at step 1
            currentStep={currentStep}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect} // This won't be called in step 1
            onBack={() => { /* No back from step 1 */ }}
          />
        )}

        {/* Step 2: Subcategory Selection (Always shown after category selection) */}
        {currentStep === 2 && selectedCategory && (
           <CategorySelector
              categories={mainCategories} // Pass all categories to allow CategorySelector to find subcategories
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory} // This will be null initially in step 2
              currentStep={currentStep}
              onCategorySelect={handleCategorySelect} // This won't be used here but kept for prop structure
              onSubcategorySelect={handleSubcategorySelect} // This is where subcategory is selected
              onBack={() => setCurrentStep(1)} // Back to main categories
            />
        )}

        {/* Step 3: Conditional Rendering - Ingredient Manager OR Drink Customization Form */}
        {currentStep === 3 && (
            showDrinkCustomizationForm ? (
                // If 'Drinks' category and 'Alcoholic' subcategory are selected, show the custom form
                <DrinkCustomizationForm
                  onGenerateDrink={handleGenerateCustomDrink}
                  onBack={() => setCurrentStep(2)} // Back to subcategory selection
                />
            ) : (
                // Otherwise (Food, Desserts, or non-Alcoholic Drinks), show Ingredient Manager
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
                        Continue to Search
                      </button>
                    </div>
                </>
            )
        )}

        {/* Step 4: Search Summary */}
        {currentStep === 4 && (
          <SearchSummary
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            // Pass 0 ingredient count if it's an alcoholic drink search, otherwise pass the actual count
            ingredientCount={showDrinkCustomizationForm ? 0 : addedIngredients.length}
            filterCount={Object.values(filters).filter(v => v).length}
            customDrinkOptions={customDrinkOptions} // Pass the new drink options structure
            onSearch={handleSearchRecipes}
          />
        )}
      </div>
    </PageContainer>
  );
}
