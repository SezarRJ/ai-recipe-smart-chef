
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Package, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate?: string;
  lowStockThreshold: number;
  isLowStock: boolean;
  isExpiringSoon: boolean;
}

export const SmartPantry: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: '1',
      name: 'Flour',
      quantity: 2,
      unit: 'kg',
      category: 'Grains',
      expiryDate: '2024-12-31',
      lowStockThreshold: 1,
      isLowStock: false,
      isExpiringSoon: false
    },
    {
      id: '2',
      name: 'Milk',
      quantity: 1,
      unit: 'liter',
      category: 'Dairy',
      expiryDate: '2024-06-05',
      lowStockThreshold: 2,
      isLowStock: true,
      isExpiringSoon: true
    },
    {
      id: '3',
      name: 'Eggs',
      quantity: 6,
      unit: 'pieces',
      category: 'Dairy',
      expiryDate: '2024-06-10',
      lowStockThreshold: 12,
      isLowStock: true,
      isExpiringSoon: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: '',
    expiryDate: '',
    lowStockThreshold: ''
  });

  const { toast } = useToast();

  const categories = ['Grains', 'Dairy', 'Meat', 'Vegetables', 'Fruits', 'Spices', 'Pantry', 'Frozen'];

  const updateQuantity = (id: string, change: number) => {
    setPantryItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return {
            ...item,
            quantity: newQuantity,
            isLowStock: newQuantity <= item.lowStockThreshold
          };
        }
        return item;
      })
    );
  };

  const addNewItem = () => {
    if (!newItem.name || !newItem.quantity) {
      toast({
        title: "Missing Information",
        description: "Please enter item name and quantity",
        variant: "destructive"
      });
      return;
    }

    const item: PantryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
      unit: newItem.unit || 'pieces',
      category: newItem.category || 'Pantry',
      expiryDate: newItem.expiryDate,
      lowStockThreshold: parseInt(newItem.lowStockThreshold) || 1,
      isLowStock: parseInt(newItem.quantity) <= (parseInt(newItem.lowStockThreshold) || 1),
      isExpiringSoon: false
    };

    setPantryItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      quantity: '',
      unit: '',
      category: '',
      expiryDate: '',
      lowStockThreshold: ''
    });

    toast({
      title: "Item Added",
      description: `${item.name} has been added to your pantry`
    });
  };

  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = pantryItems.filter(item => item.isLowStock);
  const expiringSoonItems = pantryItems.filter(item => item.isExpiringSoon);

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {(lowStockItems.length > 0 || expiringSoonItems.length > 0) && (
        <div className="space-y-2">
          {lowStockItems.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Low Stock Alert</span>
                </div>
                <p className="text-sm text-orange-700 mt-1">
                  {lowStockItems.length} item(s) running low: {lowStockItems.map(item => item.name).join(', ')}
                </p>
              </CardContent>
            </Card>
          )}
          
          {expiringSoonItems.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Expiring Soon</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  {expiringSoonItems.length} item(s) expiring soon: {expiringSoonItems.map(item => item.name).join(', ')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

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

      {/* Add New Item */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Item
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                className="flex-1"
              />
              <Input
                placeholder="Unit"
                value={newItem.unit}
                onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                className="w-20"
              />
            </div>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Input
              placeholder="Expiry date"
              type="date"
              value={newItem.expiryDate}
              onChange={(e) => setNewItem(prev => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>
          <Button onClick={addNewItem} className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
            Add Item
          </Button>
        </CardContent>
      </Card>

      {/* Pantry Items */}
      <div className="grid gap-4">
        {filteredItems.map(item => (
          <Card key={item.id} className={`${item.isLowStock ? 'border-orange-200' : ''} ${item.isExpiringSoon ? 'border-red-200' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-gray-600" />
                    <h3 className="font-medium">{item.name}</h3>
                    <Badge variant="outline">{item.category}</Badge>
                    {item.isLowStock && <Badge variant="destructive">Low Stock</Badge>}
                    {item.isExpiringSoon && <Badge className="bg-red-100 text-red-800">Expiring Soon</Badge>}
                  </div>
                  <p className="text-sm text-gray-600">
                    {item.quantity} {item.unit}
                    {item.expiryDate && ` • Expires: ${item.expiryDate}`}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
