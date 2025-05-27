
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';
import { PantryItem } from '@/types';

interface ExpiringIngredientsProps {
  expiringItems?: PantryItem[];
  onAddIngredient?: (itemName: string) => void;
}

export const ExpiringIngredients: React.FC<ExpiringIngredientsProps> = ({ 
  expiringItems = [],
  onAddIngredient 
}) => {
  // Mock expiring items if none provided
  const mockExpiringItems: PantryItem[] = [
    {
      id: '1',
      name: 'Tomatoes',
      category: 'Vegetables',
      quantity: 3,
      unit: 'pieces',
      expiryDate: '2025-01-30'
    },
    {
      id: '2',
      name: 'Bell Peppers',
      category: 'Vegetables',
      quantity: 2,
      unit: 'pieces',
      expiryDate: '2025-01-28'
    },
    {
      id: '3',
      name: 'Spinach',
      category: 'Leafy Greens',
      quantity: 1,
      unit: 'bunch',
      expiryDate: '2025-01-29'
    }
  ];

  const displayItems = expiringItems.length > 0 ? expiringItems : mockExpiringItems;
  
  if (displayItems.length === 0) return null;
  
  const handleAddIngredient = (itemName: string) => {
    if (onAddIngredient) {
      onAddIngredient(itemName);
    }
  };
  
  return (
    <div className="mb-6 animate-scale-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-wasfah-deep-teal">Cook with what you have</h2>
        <Link to="/pantry">
          <Button variant="link" className="text-wasfah-bright-teal p-0">
            View All
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300">
        <p className="text-sm text-gray-600 mb-3">
          You have {displayItems.length} items expiring soon. Let's use them!
        </p>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              className="px-3 py-2 bg-wasfah-light-gray rounded-md text-wasfah-deep-teal text-sm whitespace-nowrap flex-shrink-0 border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:border-wasfah-bright-teal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.name}
            </div>
          ))}
          <button 
            className="px-3 py-2 bg-wasfah-light-gray rounded-md text-wasfah-bright-teal text-sm font-medium whitespace-nowrap flex-shrink-0 border border-wasfah-bright-teal flex items-center transform transition-all duration-300 hover:scale-105 hover:bg-wasfah-bright-teal hover:text-white cursor-pointer"
            onClick={() => handleAddIngredient("Custom Ingredient")}
          >
            + Add
          </button>
        </div>
        <Button className="w-full mt-3 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white transition-all duration-300 transform hover:translate-y-[-1px]">
          <Utensils size={16} className="mr-2" />
          Find Recipes
        </Button>
      </div>
    </div>
  );
};
