
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, ShoppingCart, Trash2, Share2, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ShoppingLists = () => {
  const { t } = useLanguage();
  const [lists, setLists] = useState([
    {
      id: 1,
      name: "Weekly Groceries",
      items: [
        { id: 1, name: "Milk", quantity: "1L", checked: false, category: "Dairy" },
        { id: 2, name: "Bread", quantity: "2 loaves", checked: true, category: "Bakery" },
        { id: 3, name: "Eggs", quantity: "12", checked: false, category: "Dairy" },
        { id: 4, name: "Chicken breast", quantity: "1kg", checked: false, category: "Meat" },
        { id: 5, name: "Tomatoes", quantity: "500g", checked: false, category: "Produce" }
      ],
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Mediterranean Recipe",
      items: [
        { id: 6, name: "Chickpeas", quantity: "2 cans", checked: false, category: "Canned Goods" },
        { id: 7, name: "Feta cheese", quantity: "200g", checked: false, category: "Dairy" },
        { id: 8, name: "Olive oil", quantity: "1 bottle", checked: true, category: "Oils" },
        { id: 9, name: "Cucumber", quantity: "2", checked: false, category: "Produce" }
      ],
      createdAt: "2024-01-14"
    }
  ]);
  
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [activeList, setActiveList] = useState(0);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListName, setNewListName] = useState("");

  const toggleItem = (listIndex: number, itemId: number) => {
    setLists(prevLists => {
      const updatedLists = [...prevLists];
      const item = updatedLists[listIndex].items.find(item => item.id === itemId);
      if (item) {
        item.checked = !item.checked;
      }
      return updatedLists;
    });
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    
    const newItem = {
      id: Date.now(),
      name: newItemName,
      quantity: newItemQuantity || "1",
      checked: false,
      category: "Other"
    };

    setLists(prevLists => {
      const updatedLists = [...prevLists];
      updatedLists[activeList].items.push(newItem);
      return updatedLists;
    });

    setNewItemName("");
    setNewItemQuantity("");
    
    toast({
      title: "Item added",
      description: `${newItemName} has been added to your shopping list`,
    });
  };

  const removeItem = (listIndex: number, itemId: number) => {
    setLists(prevLists => {
      const updatedLists = [...prevLists];
      updatedLists[listIndex].items = updatedLists[listIndex].items.filter(item => item.id !== itemId);
      return updatedLists;
    });
  };

  const createNewList = () => {
    if (!newListName.trim()) return;

    const newList = {
      id: Date.now(),
      name: newListName,
      items: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLists(prevLists => [...prevLists, newList]);
    setActiveList(lists.length);
    setNewListName("");
    setShowNewListForm(false);
    
    toast({
      title: "List created",
      description: `${newListName} has been created`,
    });
  };

  const shareList = (listIndex: number) => {
    const list = lists[listIndex];
    const shareText = `Shopping List: ${list.name}\n\n${list.items.map(item => 
      `${item.checked ? '✓' : '○'} ${item.name} - ${item.quantity}`
    ).join('\n')}`;

    if (navigator.share) {
      navigator.share({
        title: `Shopping List: ${list.name}`,
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "List copied!",
        description: "Shopping list copied to clipboard",
      });
    }
  };

  const getItemsByCategory = (items: any[]) => {
    const categories: { [key: string]: any[] } = {};
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    return categories;
  };

  const completedItems = lists[activeList]?.items.filter(item => item.checked).length || 0;
  const totalItems = lists[activeList]?.items.length || 0;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Smart Shopping Lists
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Organize your grocery shopping efficiently
          </p>
        </div>

        {/* List Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {lists.map((list, index) => (
            <Button
              key={list.id}
              variant={activeList === index ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveList(index)}
              className="whitespace-nowrap"
            >
              {list.name}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNewListForm(true)}
            className="whitespace-nowrap"
          >
            <Plus size={16} className="mr-1" />
            New List
          </Button>
        </div>

        {/* New List Form */}
        {showNewListForm && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="space-y-3">
                <Input
                  placeholder="List name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button onClick={createNewList} size="sm">
                    Create List
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowNewListForm(false);
                      setNewListName("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {lists.length > 0 && (
          <>
            {/* Progress */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{lists[activeList].name}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareList(activeList)}
                    >
                      <Share2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{completedItems} of {totalItems} items completed</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-wasfah-orange to-wasfah-green h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Item */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Item name"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Qty"
                      value={newItemQuantity}
                      onChange={(e) => setNewItemQuantity(e.target.value)}
                      className="w-20"
                    />
                  </div>
                  <Button onClick={addItem} className="w-full">
                    <Plus size={16} className="mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Shopping List Items */}
            <div className="space-y-4">
              {Object.entries(getItemsByCategory(lists[activeList].items)).map(([category, items]) => (
                <Card key={category}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {category}
                      <Badge variant="secondary">{items.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 p-2 rounded ${
                            item.checked ? 'bg-green-50 text-green-800' : 'bg-white'
                          }`}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(activeList, item.id)}
                          />
                          <div className="flex-1">
                            <span className={item.checked ? 'line-through' : ''}>
                              {item.name}
                            </span>
                            <span className="text-gray-500 ml-2">
                              {item.quantity}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(activeList, item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {lists[activeList].items.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingCart size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Your list is empty</h3>
                  <p className="text-gray-600">Add some items to get started!</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default ShoppingLists;
