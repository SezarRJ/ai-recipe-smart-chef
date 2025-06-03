
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRecipes } from '@/data/mockData';
import { Flag, Utensils, Dessert, Wine, Martini } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlobalCuisinePage = () => {
  const navigate = useNavigate();
  const [selectedMainCategory, setSelectedMainCategory] = useState('Foods');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('');

  // Main categories and their subcategories
  const categories = {
    'Foods': ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'],
    'Desserts': ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'],
    'Drinks': ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others']
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
        return <Dessert size={16} className="mr-2" />;
      case 'Drinks':
        return <Martini size={16} className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Global Cuisine',
        showBackButton: true,
        showSearch: true
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Filter Section - Cuisine Country with flags */}
        <Card className="p-4">
          <div className="flex items-center mb-3">
            <Flag className="h-5 w-5 text-wasfah-deep-teal mr-2" />
            <h3 className="font-semibold text-wasfah-deep-teal">Select Cuisine</h3>
          </div>
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select cuisine country" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine.name} value={cuisine.name.toLowerCase()}>
                  <span className="mr-2">{cuisine.flag}</span> {cuisine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
        
        {/* Main Categories (horizontal scroll) */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {Object.keys(categories).map((category) => (
              <Button 
                key={category}
                variant={selectedMainCategory === category ? "default" : "outline"}
                className={selectedMainCategory === category ? 
                  "bg-wasfah-bright-teal hover:bg-wasfah-teal" : 
                  "border-wasfah-bright-teal text-wasfah-bright-teal"}
                onClick={() => setSelectedMainCategory(category)}
              >
                {getCategoryIcon(category)}
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Subcategories */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categories[selectedMainCategory as keyof typeof categories].map((subcategory) => (
              <Button 
                key={subcategory}
                variant="outline"
                size="sm"
                className={selectedSubcategories.includes(subcategory) ? 
                  "bg-wasfah-deep-teal text-white border-wasfah-deep-teal" : 
                  "border-wasfah-deep-teal text-wasfah-deep-teal"}
                onClick={() => toggleSubcategory(subcategory)}
              >
                {subcategory}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Find Recipe Button - MOVED UP */}
        <Button 
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
        >
          Find Recipe
        </Button>
        
        {/* Recipe Results */}
        <div>
          <h2 className="text-lg font-bold text-wasfah-deep-teal mb-4">
            {selectedCuisine ? (
              <div className="flex items-center">
                <span className="mr-2">
                  {cuisines.find(c => c.name.toLowerCase() === selectedCuisine)?.flag}
                </span>
                {selectedCuisine.charAt(0).toUpperCase() + selectedCuisine.slice(1)} Recipes
              </div>
            ) : 'Recommended for you'}
          </h2>
          <RecipeGrid recipes={mockRecipes} columns={2} cardSize="medium" />
        </div>
      </div>
    </PageContainer>
  );
};

export default GlobalCuisinePage;
