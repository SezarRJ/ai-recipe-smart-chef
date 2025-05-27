
import React, { useState } from 'react';
import { Utensils, Cake, Coffee, Camera, Mic } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { CategorySelector } from '@/components/ingredients/CategorySelector';
import { IngredientManager } from '@/components/ingredients/IngredientManager';
import { FilterPanel } from '@/components/ingredients/FilterPanel';
import { SearchSummary } from '@/components/ingredients/SearchSummary';
import { useToast } from '@/hooks/use-toast';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  source: 'manual' | 'pantry';
}

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface Filters {
  dietary: string;
  cookingTime: string;
  difficulty: string;
  cuisine: string;
}

export default function FindByIngredientsPage() {
  const { toast } = useToast();
  
  const mainCategories = [
    {
      id: 'food',
      name: 'Food',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
      subcategories: [
        { name: 'Main Dishes', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center' },
        { name: 'Appetizers', image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=300&h=200&fit=crop&crop=center' },
        { name: 'Pickles', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop&crop=center' },
        { name: 'Soups', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop&crop=center' },
        { name: 'Sauces', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=300&h=200&fit=crop&crop=center' },
        { name: 'Others', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop&crop=center' }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: Cake,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center',
      subcategories: [
        { name: 'Traditional', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop&crop=center' },
        { name: 'Western', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop&crop=center' },
        { name: 'Pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop&crop=center' },
        { name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=200&fit=crop&crop=center' },
        { name: 'Others', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop&crop=center' }
      ]
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center',
      subcategories: [
        { name: 'Detox', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=300&h=200&fit=crop&crop=center' },
        { name: 'Cocktails', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop&crop=center' },
        { name: 'Alcoholic', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300&h=200&fit=crop&crop=center' },
        { name: 'Hot Drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop&crop=center' },
        { name: 'Others', image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=300&h=200&fit=crop&crop=center' }
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
    { id: '1', name: 'Flour', quantity: '1', unit: 'kg' },
    { id: '2', name: 'Sugar', quantity: '500', unit: 'g' },
    { id: '3', name: 'Eggs', quantity: '6', unit: 'pcs' },
    { id: '4', name: 'Milk', quantity: '1', unit: 'liter' },
    { id: '5', name: 'Chicken Breast', quantity: '500', unit: 'g' },
    { id: '6', name: 'Spinach', quantity: '200', unit: 'g' },
  ];

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filters, setFilters] = useState<Filters>({
    dietary: '',
    cookingTime: '',
    difficulty: '',
    cuisine: '',
  });
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);

  // Handlers
  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setCurrentStep(2);
  };

  const handleSubcategorySelect = (subcategoryName: string) => {
    setSelectedSubcategory(subcategoryName);
    setCurrentStep(3);
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    setAddedIngredients(prev => [...prev, ingredient]);
  };

  const handleAddPantryItem = (item: PantryItem) => {
    const isAlreadyAdded = addedIngredients.some(ing => ing.name === item.name);
    if (isAlreadyAdded) return;
    setAddedIngredients(prev => [...prev, { ...item, source: 'pantry' as const }]);
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

  const handleSearchRecipes = () => {
    const searchData = {
      category: selectedCategory?.name,
      subcategory: selectedSubcategory,
      filters,
      ingredients: addedIngredients.map(ing => ({ name: ing.name, quantity: ing.quantity, unit: ing.unit })),
    };
    console.log('Searching recipes with:', searchData);
    toast({
      title: "Search Started",
      description: "Looking for recipes with your criteria...",
    });
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

        {(currentStep === 1 || currentStep === 2) && (
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
        )}

        {currentStep === 4 && (
          <SearchSummary
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            ingredientCount={addedIngredients.length}
            filterCount={Object.values(filters).filter(v => v).length}
            onSearch={handleSearchRecipes}
          />
        )}
      </div>
    </PageContainer>
  );
}
