import React, { useState } from 'react';
// ...other imports

export const IngredientManager: React.FC<IngredientManagerProps> = ({
  // ...props
}) => {
  // ...existing state
  const [editingPantryId, setEditingPantryId] = useState<string | null>(null);
  const [pantryEdit, setPantryEdit] = useState<{ quantity: string; unit: string }>({ quantity: '', unit: '' });

  // ...existing handlers

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

  // ...rest of the component

  return (
    <div className="space-y-4">
      {/* ...other UI */}
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
      {/* ...rest of the component */}
    </div>
  );
};
