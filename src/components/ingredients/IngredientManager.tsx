
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, X, Camera, Mic, Package } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  source: 'manual' | 'pantry';
  icon?: React.ElementType;
}

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  icon?: React.ElementType;
}

interface IngredientManagerProps {
  addedIngredients: Ingredient[];
  pantryItems: PantryItem[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (id: string) => void;
  onAddPantryItem: (item: PantryItem) => void;
  onScanIngredients: () => void;
  onVoiceInput: () => void;
}

export const IngredientManager: React.FC<IngredientManagerProps> = ({
  addedIngredients,
  pantryItems,
  onAddIngredient,
  onRemoveIngredient,
  onAddPantryItem,
  onScanIngredients,
  onVoiceInput,
}) => {
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: '' });

  const handleAddManualIngredient = () => {
    if (newIngredient.name.trim()) {
      onAddIngredient({
        id: `manual-${Date.now()}`,
        name: newIngredient.name,
        quantity: newIngredient.quantity || '1',
        unit: newIngredient.unit || 'cup',
        source: 'manual'
      });
      setNewIngredient({ name: '', quantity: '', unit: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Manual Input */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Add Ingredients</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Ingredient name"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                className="col-span-2"
              />
              <Input
                placeholder="Amount"
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Unit (e.g., cup, tbsp)"
                value={newIngredient.unit}
                onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                className="flex-1"
              />
              <Button onClick={handleAddManualIngredient}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onScanIngredients}>
          <Camera className="h-4 w-4 mr-2" />
          Scan
        </Button>
        <Button variant="outline" onClick={onVoiceInput}>
          <Mic className="h-4 w-4 mr-2" />
          Voice
        </Button>
      </div>

      {/* Added Ingredients */}
      {addedIngredients.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Selected Ingredients ({addedIngredients.length})</h3>
            <div className="space-y-2">
              {addedIngredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div>
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveIngredient(ingredient.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pantry Items */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">
            <Package className="h-4 w-4 inline mr-2" />
            From Pantry
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {pantryItems.slice(0, 6).map((item) => {
              const IconComponent = item.icon || Package;
              return (
                <Button
                  key={item.id}
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 text-left"
                  onClick={() => onAddPantryItem(item)}
                >
                  <div className="flex items-center">
                    <IconComponent className="h-4 w-4 mr-2 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.quantity} {item.unit}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
