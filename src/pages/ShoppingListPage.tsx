
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Share2, ShoppingCart, Trash2, Edit } from 'lucide-react';

const ShoppingListPage = () => {
  const [newItem, setNewItem] = useState('');
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: 'Weekly Groceries',
      items: [
        { id: 1, name: 'Milk', quantity: '2 liters', category: 'Dairy', completed: false },
        { id: 2, name: 'Bread', quantity: '1 loaf', category: 'Bakery', completed: true },
        { id: 3, name: 'Apples', quantity: '6 pieces', category: 'Fruits', completed: false },
        { id: 4, name: 'Chicken', quantity: '2 lbs', category: 'Meat', completed: false },
      ],
      createdAt: '2024-01-15',
      shared: false
    },
    {
      id: 2,
      name: 'Party Supplies',
      items: [
        { id: 5, name: 'Cake mix', quantity: '2 boxes', category: 'Baking', completed: false },
        { id: 6, name: 'Balloons', quantity: '20 pieces', category: 'Party', completed: false },
      ],
      createdAt: '2024-01-14',
      shared: true
    }
  ]);

  const [activeList, setActiveList] = useState(shoppingLists[0]);

  const toggleItemCompletion = (itemId: number) => {
    const updatedLists = shoppingLists.map(list => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: list.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return list;
    });
    setShoppingLists(updatedLists);
    setActiveList(updatedLists.find(list => list.id === activeList.id) || activeList);
  };

  const addItem = () => {
    if (newItem.trim()) {
      const newItemObject = {
        id: Date.now(),
        name: newItem,
        quantity: '1',
        category: 'Other',
        completed: false
      };
      
      const updatedLists = shoppingLists.map(list => {
        if (list.id === activeList.id) {
          return {
            ...list,
            items: [...list.items, newItemObject]
          };
        }
        return list;
      });
      
      setShoppingLists(updatedLists);
      setActiveList(updatedLists.find(list => list.id === activeList.id) || activeList);
      setNewItem('');
    }
  };

  const completedCount = activeList.items.filter(item => item.completed).length;
  const totalCount = activeList.items.length;

  return (
    <PageContainer
      header={{
        title: 'Smart Shopping Lists',
        showBackButton: true
      }}
    >
      <div className="space-y-6 pb-20">
        {/* List Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Shopping Lists</span>
              <Button size="sm" className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                <Plus className="h-4 w-4 mr-1" />
                New List
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {shoppingLists.map((list) => (
                <div 
                  key={list.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeList.id === list.id ? 'border-wasfah-bright-teal bg-wasfah-bright-teal/5' : 'border-gray-200'
                  }`}
                  onClick={() => setActiveList(list)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{list.name}</h3>
                      <p className="text-sm text-gray-600">{list.items.length} items</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {list.shared && <Badge variant="outline">Shared</Badge>}
                      <Badge variant="secondary">{list.createdAt}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active List Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{activeList.name}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {completedCount} of {totalCount} items completed
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-wasfah-bright-teal h-2 rounded-full transition-all duration-300" 
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Item */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add new item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="flex-1"
              />
              <Button onClick={addItem} className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Items */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {activeList.items.map((item) => (
              <Card key={item.id} className={item.completed ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItemCompletion(item.id)}
                    />
                    <div className="flex-1">
                      <h4 className={`font-medium ${item.completed ? 'line-through' : ''}`}>
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-3">
            {activeList.items.filter(item => !item.completed).map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItemCompletion(item.id)}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {activeList.items.filter(item => item.completed).map((item) => (
              <Card key={item.id} className="opacity-60">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItemCompletion(item.id)}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium line-through">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Generate from Recipes
          </Button>
          <Button variant="outline" className="h-12">
            <Share2 className="h-4 w-4 mr-2" />
            Share List
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ShoppingListPage;
