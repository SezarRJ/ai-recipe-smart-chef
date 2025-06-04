
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus } from 'lucide-react';

interface IngredientQuantityManagerProps {
  onAddIngredient: (ingredient: { name: string; quantity: number; unit: string }) => void;
  pantryItems: Array<{ id: string; name: string; quantity: string; unit: string }>;
}

const UNITS = [
  'cups', 'tablespoons', 'teaspoons', 'ounces', 'pounds', 'grams', 'kilograms',
  'pieces', 'cloves', 'slices', 'whole', 'pinch', 'dash', 'bunch', 'can', 'bottle'
];

export const IngredientQuantityManager: React.FC<IngredientQuantityManagerProps> = ({
  onAddIngredient,
  pantryItems
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, { quantity: number; unit: string }>>({});

  const updateIngredientQuantity = (itemId: string, quantity: number, unit: string) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [itemId]: { quantity, unit }
    }));
  };

  const handleAddIngredient = (item: any) => {
    const ingredientData = selectedIngredients[item.id];
    if (ingredientData && ingredientData.quantity > 0) {
      onAddIngredient({
        name: item.name,
        quantity: ingredientData.quantity,
        unit: ingredientData.unit
      });
    }
  };

  return (
    <div className="space-y-3">
      {pantryItems.map(item => (
        <div key={item.id} className="flex items-center gap-2 p-3 bg-white border border-wasfah-mint/30 rounded-lg">
          <div className="flex-1">
            <p className="font-medium text-wasfah-deep-teal">{item.name}</p>
            <p className="text-sm text-gray-500">Available: {item.quantity} {item.unit}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const current = selectedIngredients[item.id]?.quantity || 0;
                  if (current > 0) {
                    updateIngredientQuantity(
                      item.id, 
                      current - 1, 
                      selectedIngredients[item.id]?.unit || 'cups'
                    );
                  }
                }}
                className="p-1 h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <Input
                type="number"
                value={selectedIngredients[item.id]?.quantity || 0}
                onChange={(e) => {
                  const quantity = parseInt(e.target.value) || 0;
                  updateIngredientQuantity(
                    item.id, 
                    quantity, 
                    selectedIngredients[item.id]?.unit || 'cups'
                  );
                }}
                className="w-16 h-8 text-center border-0"
                min="0"
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const current = selectedIngredients[item.id]?.quantity || 0;
                  updateIngredientQuantity(
                    item.id, 
                    current + 1, 
                    selectedIngredients[item.id]?.unit || 'cups'
                  );
                }}
                className="p-1 h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <Select
              value={selectedIngredients[item.id]?.unit || 'cups'}
              onValueChange={(unit) => {
                updateIngredientQuantity(
                  item.id, 
                  selectedIngredients[item.id]?.quantity || 1, 
                  unit
                );
              }}
            >
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UNITS.map(unit => (
                  <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAddIngredient(item)}
              disabled={!selectedIngredients[item.id]?.quantity || selectedIngredients[item.id]?.quantity === 0}
              className="text-wasfah-bright-teal border-wasfah-bright-teal hover:bg-wasfah-light-gray"
            >
              Add
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
