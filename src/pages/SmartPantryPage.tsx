
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Plus, Package, AlertTriangle, Calendar, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SmartPantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  aiSuggestions?: string[];
}

const SmartPantryPage = () => {
  const { toast } = useToast();
  const [pantryItems, setPantryItems] = useState<SmartPantryItem[]>([
    {
      id: '1',
      name: 'Milk',
      quantity: 1,
      unit: 'liter',
      expiryDate: '2024-01-15',
      category: 'Dairy',
      aiSuggestions: ['Use in pancakes', 'Make yogurt', 'Coffee creamer']
    },
    {
      id: '2',
      name: 'Chicken Breast',
      quantity: 500,
      unit: 'grams',
      expiryDate: '2024-01-12',
      category: 'Meat',
      aiSuggestions: ['Grilled chicken', 'Chicken curry', 'Chicken salad']
    }
  ]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '', expiryDate: '' });

  const addItem = () => {
    if (!newItem.name || !newItem.quantity) {
      toast({
        title: 'Missing information',
        description: 'Please fill in item name and quantity',
        variant: 'destructive'
      });
      return;
    }

    const item: SmartPantryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: Number(newItem.quantity),
      unit: newItem.unit || 'pieces',
      expiryDate: newItem.expiryDate,
      category: 'General',
      aiSuggestions: ['Use in recipes', 'Quick meal ideas']
    };

    setPantryItems([...pantryItems, item]);
    setNewItem({ name: '', quantity: '', unit: '', expiryDate: '' });
    
    toast({
      title: 'Item added',
      description: `${item.name} added to smart pantry`
    });
  };

  const removeItem = (id: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
    toast({
      title: 'Item removed',
      description: 'Item removed from pantry'
    });
  };

  const isExpiringSoon = (expiryDate: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isExpired = (expiryDate: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  return (
    <PageContainer
      header={{
        title: 'Smart Pantry',
        showBackButton: true,
      }}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-wasfah-bright-teal" />
              AI-Powered Pantry Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
              <Input
                placeholder="Quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
              />
              <Input
                placeholder="Unit"
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
              />
              <Input
                placeholder="Expiry date"
                type="date"
                value={newItem.expiryDate}
                onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
              />
            </div>
            <Button onClick={addItem} className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pantryItems.map((item) => (
            <Card key={item.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.expiryDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm ${
                      isExpired(item.expiryDate) ? 'text-red-600' :
                      isExpiringSoon(item.expiryDate) ? 'text-orange-600' : 'text-gray-600'
                    }`}>
                      {isExpired(item.expiryDate) ? 'Expired' :
                       isExpiringSoon(item.expiryDate) ? 'Expiring soon' : 'Fresh'}
                    </span>
                    {(isExpired(item.expiryDate) || isExpiringSoon(item.expiryDate)) && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                )}

                <Badge variant="secondary">{item.category}</Badge>

                {item.aiSuggestions && item.aiSuggestions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">AI Suggestions:</p>
                    <div className="space-y-1">
                      {item.aiSuggestions.map((suggestion, index) => (
                        <p key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          • {suggestion}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {pantryItems.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Empty Pantry</h3>
              <p className="text-gray-500">Add items to start managing your smart pantry</p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SmartPantryPage;
