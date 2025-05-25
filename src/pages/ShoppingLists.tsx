
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingCart, Trash2, Edit, Check, X } from 'lucide-react';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  addedDate: string;
}

interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdDate: string;
  totalItems: number;
  completedItems: number;
}

const ShoppingLists = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([
    {
      id: "1",
      name: "Weekly Groceries",
      createdDate: "2024-01-28",
      totalItems: 8,
      completedItems: 3,
      items: [
        { id: "1", name: "Chicken breast", quantity: "2 lbs", category: "Meat", checked: true, addedDate: "2024-01-28" },
        { id: "2", name: "Broccoli", quantity: "1 head", category: "Vegetables", checked: false, addedDate: "2024-01-28" },
        { id: "3", name: "Greek yogurt", quantity: "2 cups", category: "Dairy", checked: true, addedDate: "2024-01-28" },
        { id: "4", name: "Salmon fillet", quantity: "1 lb", category: "Meat", checked: false, addedDate: "2024-01-28" },
        { id: "5", name: "Sweet potatoes", quantity: "3 lbs", category: "Vegetables", checked: false, addedDate: "2024-01-28" },
        { id: "6", name: "Olive oil", quantity: "1 bottle", category: "Pantry", checked: true, addedDate: "2024-01-28" },
        { id: "7", name: "Eggs", quantity: "1 dozen", category: "Dairy", checked: false, addedDate: "2024-01-28" },
        { id: "8", name: "Spinach", quantity: "1 bag", category: "Vegetables", checked: false, addedDate: "2024-01-28" },
      ]
    },
    {
      id: "2", 
      name: "Party Supplies",
      createdDate: "2024-01-25",
      totalItems: 5,
      completedItems: 1,
      items: [
        { id: "9", name: "Chips", quantity: "3 bags", category: "Snacks", checked: true, addedDate: "2024-01-25" },
        { id: "10", name: "Soda", quantity: "2 liters", category: "Beverages", checked: false, addedDate: "2024-01-25" },
        { id: "11", name: "Cake mix", quantity: "2 boxes", category: "Baking", checked: false, addedDate: "2024-01-25" },
        { id: "12", name: "Ice cream", quantity: "1 tub", category: "Frozen", checked: false, addedDate: "2024-01-25" },
        { id: "13", name: "Napkins", quantity: "1 pack", category: "Paper goods", checked: false, addedDate: "2024-01-25" },
      ]
    }
  ]);

  const [activeList, setActiveList] = useState<string | null>("1");
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const categories = ["Vegetables", "Fruits", "Meat", "Dairy", "Pantry", "Snacks", "Beverages", "Baking", "Frozen", "Paper goods"];

  const createNewList = () => {
    if (!newListName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a list name",
        variant: "destructive",
      });
      return;
    }

    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: newListName,
      items: [],
      createdDate: new Date().toISOString().split('T')[0],
      totalItems: 0,
      completedItems: 0
    };

    setShoppingLists(prev => [...prev, newList]);
    setActiveList(newList.id);
    setNewListName("");
    setShowNewListForm(false);
    
    toast({
      title: "List created",
      description: `"${newListName}" has been created`,
    });
  };

  const addItemToList = (listId: string) => {
    if (!newItemName.trim() || !newItemQuantity.trim()) {
      toast({
        title: "Error", 
        description: "Please enter item name and quantity",
        variant: "destructive",
      });
      return;
    }

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: newItemQuantity,
      category: "Pantry",
      checked: false,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setShoppingLists(prev => prev.map(list => {
      if (list.id === listId) {
        const updatedItems = [...list.items, newItem];
        return {
          ...list,
          items: updatedItems,
          totalItems: updatedItems.length,
          completedItems: updatedItems.filter(item => item.checked).length
        };
      }
      return list;
    }));

    setNewItemName("");
    setNewItemQuantity("");
    
    toast({
      title: "Item added",
      description: `${newItemName} added to shopping list`,
    });
  };

  const toggleItemCheck = (listId: string, itemId: string) => {
    setShoppingLists(prev => prev.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        );
        return {
          ...list,
          items: updatedItems,
          completedItems: updatedItems.filter(item => item.checked).length
        };
      }
      return list;
    }));
  };

  const removeItem = (listId: string, itemId: string) => {
    setShoppingLists(prev => prev.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.filter(item => item.id !== itemId);
        return {
          ...list,
          items: updatedItems,
          totalItems: updatedItems.length,
          completedItems: updatedItems.filter(item => item.checked).length
        };
      }
      return list;
    }));
    
    toast({
      title: "Item removed",
      description: "Item removed from shopping list",
    });
  };

  const removeList = (listId: string) => {
    setShoppingLists(prev => prev.filter(list => list.id !== listId));
    if (activeList === listId) {
      setActiveList(shoppingLists.length > 1 ? shoppingLists[0].id : null);
    }
    
    toast({
      title: "List deleted",
      description: "Shopping list has been deleted",
    });
  };

  const clearCompletedItems = (listId: string) => {
    setShoppingLists(prev => prev.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.filter(item => !item.checked);
        return {
          ...list,
          items: updatedItems,
          totalItems: updatedItems.length,
          completedItems: 0
        };
      }
      return list;
    }));
    
    toast({
      title: "Completed items cleared",
      description: "All completed items have been removed",
    });
  };

  const activeListData = shoppingLists.find(list => list.id === activeList);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Shopping Lists</h1>
          <p className="text-gray-600">Organize your shopping and track your purchases</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lists Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>My Lists</span>
                  <Button size="sm" onClick={() => setShowNewListForm(true)}>
                    <Plus size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* New List Form */}
                <AnimatePresence>
                  {showNewListForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 p-3 border rounded-lg"
                    >
                      <Input
                        placeholder="List name"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        className="mb-2"
                        onKeyPress={(e) => e.key === 'Enter' && createNewList()}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={createNewList}>
                          <Check size={14} />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setShowNewListForm(false)}>
                          <X size={14} />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Lists */}
                {shoppingLists.map((list) => (
                  <div
                    key={list.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      activeList === list.id ? 'border-wasfah-orange bg-orange-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveList(list.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{list.name}</h3>
                        <p className="text-sm text-gray-600">
                          {list.completedItems}/{list.totalItems} completed
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-wasfah-green h-2 rounded-full transition-all"
                            style={{ width: `${list.totalItems > 0 ? (list.completedItems / list.totalItems) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeList(list.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Active List */}
          <div className="lg:col-span-3">
            {activeListData ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="text-wasfah-orange" size={20} />
                      {activeListData.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => clearCompletedItems(activeListData.id)}
                        disabled={activeListData.completedItems === 0}
                      >
                        Clear Completed
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Add Item Form */}
                  <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Item name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Quantity"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(e.target.value)}
                        className="w-32"
                      />
                      <Button onClick={() => addItemToList(activeListData.id)}>
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Shopping Items */}
                  <div className="space-y-2">
                    <AnimatePresence>
                      {activeListData.items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`flex items-center gap-3 p-3 border rounded-lg ${
                            item.checked ? 'bg-green-50 opacity-60' : 'bg-white'
                          }`}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => toggleItemCheck(activeListData.id, item.id)}
                          />
                          
                          <div className="flex-1">
                            <div className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.quantity} • {item.category}
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(activeListData.id, item.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {activeListData.items.length === 0 && (
                      <div className="text-center py-12">
                        <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No items yet</h3>
                        <p className="text-gray-500">Add items to start your shopping list</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No lists yet</h3>
                  <p className="text-gray-500 mb-4">Create your first shopping list to get started</p>
                  <Button onClick={() => setShowNewListForm(true)}>
                    <Plus size={16} className="mr-2" />
                    Create List
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingLists;
