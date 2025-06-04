
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Plus, List, Camera, Mic } from 'lucide-react';

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
  onVoiceInput
}) => {
  const [ingredientTab, setIngredientTab] = useState('manual');
  const [ingredientForm, setIngredientForm] = useState({
    name: '',
    quantity: '',
    unit: ''
  });

  const handleIngredientFormChange = (field: string, value: string) => {
    setIngredientForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddManualIngredient = () => {
    if (!ingredientForm.name.trim()) return;
    
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: ingredientForm.name.trim(),
      quantity: ingredientForm.quantity || '1',
      unit: ingredientForm.unit.trim(),
      source: 'manual',
    };

    onAddIngredient(newIngredient);
    setIngredientForm({ name: '', quantity: '', unit: '' });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-center text-wasfah-deep-teal mb-6">Add Ingredients</h2>
      
      <Tabs value={ingredientTab} onValueChange={setIngredientTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 bg-wasfah-light-gray p-1 rounded-lg">
          <TabsTrigger value="manual" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Manual Entry</TabsTrigger>
          <TabsTrigger value="pantry" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Smart Pantry</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4 mt-4">
          <div className="space-y-3">
            <Input
              placeholder="Ingredient name (e.g., Chicken Breast)"
              value={ingredientForm.name}
              onChange={(e) => handleIngredientFormChange('name', e.target.value)}
              className="h-12"
            />

            <div className="flex gap-2">
              <Input
                placeholder="Quantity"
                value={ingredientForm.quantity}
                onChange={(e) => handleIngredientFormChange('quantity', e.target.value)}
                className="h-12 flex-1"
                type="number"
              />
              <Input
                placeholder="Unit (kg, pcs, etc)"
                value={ingredientForm.unit}
                onChange={(e) => handleIngredientFormChange('unit', e.target.value)}
                className="h-12 flex-1"
              />
            </div>

            <Button
              onClick={handleAddManualIngredient}
              className="w-full h-12 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
              disabled={!ingredientForm.name.trim()}
            >
              <Plus className="mr-2 h-5 w-5" /> Add Ingredient
            </Button>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1 h-12 border-wasfah-mint/30 text-wasfah-deep-teal hover:bg-wasfah-light-gray"
              onClick={onScanIngredients}
            >
              <Camera className="mr-2 h-4 w-4" /> Scan
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 h-12 border-wasfah-mint/30 text-wasfah-deep-teal hover:bg-wasfah-light-gray"
              onClick={onVoiceInput}
            >
              <Mic className="mr-2 h-4 w-4" /> Voice
            </Button>
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddPantryItem(item)}
                  disabled={addedIngredients.some(ing => ing.name === item.name)}
                  className="text-wasfah-bright-teal border-wasfah-bright-teal disabled:opacity-50 hover:bg-wasfah-light-gray"
                >
                  {addedIngredients.some(ing => ing.name === item.name) ? 'Added' : 'Add'}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Added Ingredients List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center text-wasfah-deep-teal">
            <List className="mr-2 h-5 w-5" />
            Your Ingredients
          </h3>
          <span className="text-sm text-gray-500">({addedIngredients.length})</span>
        </div>

        {addedIngredients.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500">No ingredients added yet</p>
            <p className="text-sm text-gray-400 mt-1">Add ingredients to get started</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {addedIngredients.map(ingredient => (
              <div key={ingredient.id} className="flex items-center justify-between p-3 bg-wasfah-light-gray rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-wasfah-deep-teal">{ingredient.name}</p>
                  <p className="text-sm text-gray-500">
                    {ingredient.quantity} {ingredient.unit} • From {ingredient.source}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveIngredient(ingredient.id)}
                  className="text-red-500 hover:bg-red-50 p-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
