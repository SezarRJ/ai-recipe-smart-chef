
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRecipes } from '@/data/mockData';
import { Flag, Utensils, Coffee, Wine } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const GlobalCuisinePage = () => {
  const { t, direction } = useRTL();
  const [selectedMainCategory, setSelectedMainCategory] = useState('Foods');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('');

  // Main categories and their subcategories
  const categories = {
    'Foods': ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'],
    'Desserts': ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'],
    'Drinks': ['Detox', 'Hot Drinks', 'Cold Drinks', 'Smoothies', 'Others']
  };

  // List of cuisine countries with flag emoji
  const cuisines = [
    { name: 'Levant', flag: '🇱🇧' },
    { name: 'Italian', flag: '🇮🇹' },
    { name: 'Mexican', flag: '🇲🇽' },
    { name: 'Chinese', flag: '🇨🇳' },
    { name: 'Indian', flag: '🇮🇳' },
    { name: 'Japanese', flag: '🇯🇵' },
    { name: 'Thai', flag: '🇹🇭' },
    { name: 'Turkish', flag: '🇹🇷' },
    { name: 'Syrian', flag: '🇸🇾' },
    { name: 'Iraqi', flag: '🇮🇶' },
    { name: 'Yemeni', flag: '🇾🇪' },
    { name: 'American', flag: '🇺🇸' },
    { name: 'Moroccan', flag: '🇲🇦' },
    { name: 'Lebanese', flag: '🇱🇧' },
    { name: 'German', flag: '🇩🇪' }
  ];

  const toggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter(item => item !== subcategory));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  // Get icon for main category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Foods':
        return <Utensils size={16} className="mr-2" />;
      case 'Desserts':
        return <Coffee size={16} className="mr-2" />;
      case 'Drinks':
        return <Wine size={16} className="mr-2" />;
      default:
        return null;
    }
  };

  // Transform recipes to ensure proper string types
  const transformedRecipes = mockRecipes.map(recipe => ({
    ...recipe,
    id: String(recipe.id),
    author_id: String(recipe.author_id || '1'),
    created_at: recipe.created_at || new Date().toISOString(),
    updated_at: recipe.updated_at || new Date().toISOString()
  }));

  return (
    <PageContainer
      header={{
        title: t('Global Cuisine', 'المطبخ العالمي'),
        showBackButton: true,
        showSearch: true
      }}
      className={`${direction === 'rtl' ? 'text-right' : 'text-left'}`}
    >
      <div className="space-y-4 pb-20 px-4" dir={direction}>
        {/* Mobile-optimized Filter Section - Cuisine Country */}
        <Card className="p-3">
          <div className="flex items-center mb-3">
            <Flag className="h-4 w-4 text-wasfah-deep-teal mr-2" />
            <h3 className="font-semibold text-wasfah-deep-teal text-sm">
              {t('Select Cuisine', 'اختر المطبخ')}
            </h3>
          </div>
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger className="bg-white h-10">
              <SelectValue placeholder={t('Select cuisine country', 'اختر دولة المطبخ')} />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-60">
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine.name} value={cuisine.name.toLowerCase()}>
                  <span className="mr-2">{cuisine.flag}</span> {cuisine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
        
        {/* Mobile-optimized Main Categories */}
        <div>
          <h3 className="font-semibold text-wasfah-deep-teal text-sm mb-2">
            {t('Category', 'الفئة')}
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.keys(categories).map((category) => (
              <Button 
                key={category}
                variant={selectedMainCategory === category ? "default" : "outline"}
                size="sm"
                className={`flex-shrink-0 ${selectedMainCategory === category ? 
                  "bg-wasfah-bright-teal hover:bg-wasfah-teal text-white" : 
                  "border-wasfah-bright-teal text-wasfah-bright-teal"}`}
                onClick={() => setSelectedMainCategory(category)}
              >
                {getCategoryIcon(category)}
                {t(category, category)}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Mobile-optimized Subcategories */}
        <div>
          <h3 className="font-semibold text-wasfah-deep-teal text-sm mb-2">
            {t('Subcategory', 'الفئة الفرعية')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories[selectedMainCategory as keyof typeof categories].map((subcategory) => (
              <Button 
                key={subcategory}
                variant="outline"
                size="sm"
                className={`text-xs ${selectedSubcategories.includes(subcategory) ? 
                  "bg-wasfah-deep-teal text-white border-wasfah-deep-teal" : 
                  "border-wasfah-deep-teal text-wasfah-deep-teal"}`}
                onClick={() => toggleSubcategory(subcategory)}
              >
                {t(subcategory, subcategory)}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Mobile-optimized Find Recipe Button */}
        <Button 
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white py-3 text-base font-semibold"
        >
          {t('Find Recipe', 'ابحث عن وصفة')}
        </Button>
        
        {/* Recipe Results */}
        <div>
          <h2 className="text-lg font-bold text-wasfah-deep-teal mb-4">
            {selectedCuisine ? (
              <div className="flex items-center">
                <span className="mr-2">
                  {cuisines.find(c => c.name.toLowerCase() === selectedCuisine)?.flag}
                </span>
                {t(`${selectedCuisine.charAt(0).toUpperCase() + selectedCuisine.slice(1)} Recipes`, 'وصفات')}
              </div>
            ) : t('Recommended for you', 'موصى لك')}
          </h2>
          <RecipeGrid recipes={transformedRecipes} columns={2} cardSize="medium" />
        </div>
      </div>
    </PageContainer>
  );
};

export default GlobalCuisinePage;
