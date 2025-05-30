
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Camera, Mic } from 'lucide-react';

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  source: 'manual' | 'pantry';
}

export interface PantryItem {
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
  const [editingPantryId, setEditingPantryId] = useState<string | null>(null);
  const [pantryEdit, setPantryEdit] = useState<{ quantity: string; unit: string }>({ quantity: '', unit: '' });
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'piece'
  });

  const units = ['piece', 'cup', 'tbsp', 'tsp', 'lb', 'oz', 'gram', 'kg', 'ml', 'liter'];

  const handleStartEditPantry = (item: PantryItem) => {
    setEditingPantryId(item.id);
    setPantryEdit({ quantity: item.quantity, unit: item.unit });
  };

  const handleConfirmPantryEdit = (item: PantryItem) => {
    if (!pantryEdit.quantity || !pantryEdit.unit) return;
    onAddPantryItem({
      ...item,
      quantity: pantryEdit.quantity,
      unit: pantryEdit.unit,
    });
    setEditingPantryId(null);
    setPantryEdit({ quantity: '', unit: '' });
  };

  const handleAddIngredient = () => {
    if (newIngredient.name.trim()) {
      onAddIngredient({
        id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: newIngredient.name.trim(),
        quantity: newIngredient.quantity || '1',
        unit: newIngredient.unit,
        source: 'manual'
      });
      setNewIngredient({ name: '', quantity: '', unit: 'piece' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Added Ingredients */}
      {addedIngredients.length > 0 && (
        <div className="p-4 bg-wasfah-light-gray rounded-lg">
          <h3 className="font-semibold text-wasfah-deep-teal mb-3">Your Ingredients ({addedIngredients.length})</h3>
          <div className="flex flex-wrap gap-2">
            {addedIngredients.map((ingredient) => (
              <Badge
                key={ingredient.id}
                variant="secondary"
                className="px-3 py-1 bg-wasfah-mint text-wasfah-deep-teal border border-wasfah-bright-teal"
              >
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                <button
                  onClick={() => onRemoveIngredient(ingredient.id)}
                  className="ml-2 text-wasfah-coral-red hover:text-red-700"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Add Ingredients Section */}
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white border border-wasfah-mint">
          <TabsTrigger value="manual" className="data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white">
            Manual Entry
          </TabsTrigger>
          <TabsTrigger value="pantry" className="data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white">
            From Pantry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="mt-4">
          <div className="p-4 bg-white border border-wasfah-mint/30 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="e.g., Chicken breast"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, name: e.target.value }))}
                  className="border-wasfah-mint/50 focus:border-wasfah-bright-teal"
                />
              </div>
              <div>
                <Input
                  placeholder="Quantity"
                  value={newIngredient.quantity}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, quantity: e.target.value }))}
                  className="border-wasfah-mint/50 focus:border-wasfah-bright-teal"
                />
              </div>
              <div>
                <select
                  value={newIngredient.unit}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, unit: e.target.value }))}
                  className="w-full h-10 px-3 border border-wasfah-mint/50 rounded-md focus:border-wasfah-bright-teal"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAddIngredient} 
                className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white flex-1"
              >
                <Plus size={16} className="mr-2" />
                Add Ingredient
              </Button>
              <Button 
                onClick={onScanIngredients} 
                variant="outline" 
                className="border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
              >
                <Camera size={16} />
              </Button>
              <Button 
                onClick={onVoiceInput} 
                variant="outline" 
                className="border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
              >
                <Mic size={16} />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pantry" className="mt-4">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pantryItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-wasfah-mint/30 rounded-lg">
                <div>
                  <p className="font-medium text-wasfah-deep-teal">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
                </div>
                {editingPantryId === item.id ? (
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Quantity"
                      value={pantryEdit.quantity}
                      onChange={e => setPantryEdit(prev => ({ ...prev, quantity: e.target.value }))}
                      className="h-8 w-16"
                      type="number"
                    />
                    <Input
                      placeholder="Unit"
                      value={pantryEdit.unit}
                      onChange={e => setPantryEdit(prev => ({ ...prev, unit: e.target.value }))}
                      className="h-8 w-16"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleConfirmPantryEdit(item)}
                      className="bg-wasfah-bright-teal text-white"
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingPantryId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStartEditPantry(item)}
                    disabled={addedIngredients.some(ing => ing.name === item.name)}
                    className="text-wasfah-bright-teal border-wasfah-bright-teal disabled:opacity-50 hover:bg-wasfah-light-gray"
                  >
                    {addedIngredients.some(ing => ing.name === item.name) ? 'Added' : 'Add'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
