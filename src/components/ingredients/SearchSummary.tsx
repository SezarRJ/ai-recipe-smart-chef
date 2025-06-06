
import React, { ElementType } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { DrinkOptions } from '@/components/drinks/DrinkCustomizationForm';

interface MainCategory {
  id: string;
  name: string;
  icon: ElementType;
  subcategories: { name: string; icon: ElementType; requiresCustomForm?: boolean }[];
}

interface SearchSummaryProps {
  selectedCategory: MainCategory | null;
  selectedSubcategory: { name: string; icon: ElementType; requiresCustomForm?: boolean } | null;
  ingredientCount: number;
  filterCount: number;
  customDrinkOptions?: DrinkOptions | null;
  onSearch: () => void;
}

export const SearchSummary: React.FC<SearchSummaryProps> = ({
  selectedCategory,
  selectedSubcategory,
  ingredientCount,
  filterCount,
  customDrinkOptions,
  onSearch,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Search Summary</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{selectedCategory?.name || 'None'}</span>
          </div>
          
          {selectedSubcategory && (
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{selectedSubcategory.name}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Ingredients:</span>
            <span className="font-medium">{ingredientCount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Filters:</span>
            <span className="font-medium">{filterCount}</span>
          </div>

          {customDrinkOptions && (
            <div className="border-t pt-3">
              <div className="text-sm text-gray-600 mb-2">Custom Drink Options:</div>
              <div className="text-xs space-y-1">
                <div>Type: {customDrinkOptions.type}</div>
                <div>Strength: {customDrinkOptions.strength < 33 ? 'Mild' : customDrinkOptions.strength > 66 ? 'Strong' : 'Medium'}</div>
                <div>Flavor: {customDrinkOptions.flavor}</div>
                <div>Temperature: {customDrinkOptions.temperature}</div>
              </div>
            </div>
          )}
        </div>

        <Button 
          onClick={onSearch}
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          size="lg"
        >
          <Search className="h-5 w-5 mr-2" />
          Find Recipes
        </Button>
      </CardContent>
    </Card>
  );
};
