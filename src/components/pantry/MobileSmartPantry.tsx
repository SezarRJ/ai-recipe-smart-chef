
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Package, AlertTriangle, Search, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePantry } from '@/hooks/usePantry';

export const MobileSmartPantry: React.FC = () => {
  const { pantryItems, loading, addPantryItem, updatePantryItem, deletePantryItem } = usePantry();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: 'pieces',
    category: 'Pantry',
    location: 'Pantry'
  });

  const { toast } = useToast();

  const categories = ['Grains', 'Dairy', 'Meat', 'Vegetables', 'Fruits', 'Spices', 'Pantry', 'Frozen'];

  const updateQuantity = async (id: string, currentQuantity: number, change: number) => {
    const newQuantity = Math.max(0, currentQuantity + change);
    try {
      await updatePantryItem(id, { quantity: newQuantity });
      toast({
        title: "Updated",
        description: "Item quantity updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive"
      });
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter item name",
        variant: "destructive"
      });
      return;
    }

    try {
      await addPantryItem({
        ...newItem,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      });
      
      setNewItem({
        name: '',
        quantity: 1,
        unit: 'pieces',
        category: 'Pantry',
        location: 'Pantry'
      });
      setShowAddForm(false);

      toast({
        title: "Item Added",
        description: `${newItem.name} has been added to your pantry`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = async (id: string, name: string) => {
    try {
      await deletePantryItem(id);
      toast({
        title: "Item Removed",
        description: `${name} has been removed from your pantry`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
    }
  };

  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wasfah-bright-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search pantry items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Add Button */}
      <Button 
        onClick={() => setShowAddForm(!showAddForm)}
        className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Item
      </Button>

      {/* Add Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                className="flex-1"
              />
              <Input
                placeholder="Unit"
                value={newItem.unit}
                onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                className="w-24"
              />
            </div>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <Button onClick={handleAddItem} className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal">
                Add Item
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pantry Items */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No items in your pantry yet</p>
              <p className="text-sm text-gray-400 mt-1">Add some items to get started</p>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map(item => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="h-4 w-4 text-gray-600" />
                      <h3 className="font-medium">{item.name}</h3>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.quantity} {item.unit} • {item.location}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity, -1)}
                      disabled={item.quantity <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
