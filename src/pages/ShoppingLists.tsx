import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingCart, Trash2, Edit, Check, X, Copy, SortAsc, Search, ListEnd, GripVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MobileNavigation } from '@/components/MobileNavigation'; // Assuming this component exists

// --- Interfaces ---
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

type SortBy = 'name' | 'category' | 'checked' | 'addedDate';

const categories = ["All", "Vegetables", "Fruits", "Meat", "Dairy", "Pantry", "Snacks", "Beverages", "Baking", "Frozen", "Paper Goods", "Other"];

const ShoppingLists = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // --- State Management ---
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([
    { id: "1", name: "Weekly Groceries", createdDate: "2024-01-28", totalItems: 8, completedItems: 3, items: [
      { id: "item-1", name: "Chicken breast", quantity: "2 lbs", category: "Meat", checked: true, addedDate: "2024-01-28" },
      { id: "item-2", name: "Broccoli", quantity: "1 head", category: "Vegetables", checked: false, addedDate: "2024-01-28" },
      { id: "item-3", name: "Greek yogurt", quantity: "2 cups", category: "Dairy", checked: true, addedDate: "2024-01-28" },
      { id: "item-4", name: "Salmon fillet", quantity: "1 lb", category: "Meat", checked: false, addedDate: "2024-01-29" },
      { id: "item-5", name: "Sweet potatoes", quantity: "3 lbs", category: "Vegetables", checked: false, addedDate: "2024-01-28" },
      { id: "item-6", name: "Olive oil", quantity: "1 bottle", category: "Pantry", checked: true, addedDate: "2024-01-30" },
      { id: "item-7", name: "Eggs", quantity: "1 dozen", category: "Dairy", checked: false, addedDate: "2024-01-28" },
      { id: "item-8", name: "Spinach", quantity: "1 bag", category: "Vegetables", checked: false, addedDate: "2024-01-29" },
    ]},
    { id: "2", name: "Party Supplies", createdDate: "2024-01-25", totalItems: 5, completedItems: 1, items: [
      { id: "item-9", name: "Chips", quantity: "3 bags", category: "Snacks", checked: true, addedDate: "2024-01-25" },
      { id: "item-10", name: "Soda", quantity: "2 liters", category: "Beverages", checked: false, addedDate: "2024-01-25" },
      { id: "item-11", name: "Cake mix", quantity: "2 boxes", category: "Baking", checked: false, addedDate: "2024-01-26" },
      { id: "item-12", name: "Ice cream", quantity: "1 tub", category: "Frozen", checked: false, addedDate: "2024-01-25" },
      { id: "item-13", name: "Napkins", quantity: "1 pack", category: "Paper Goods", checked: false, addedDate: "2024-01-27" },
    ]}
  ]);

  const [activeListId, setActiveListId] = useState<string | null>(shoppingLists.length > 0 ? shoppingLists[0].id : null);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Pantry");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemName, setEditingItemName] = useState("");
  const [editingItemQuantity, setEditingItemQuantity] = useState("");
  const [editingItemCategory, setEditingItemCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>('addedDate');
  const [searchTerm, setSearchTerm] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  // --- Effects ---
  useEffect(() => {
    if (editingItemId) {
      nameInputRef.current?.focus();
    }
  }, [editingItemId]);

  // --- Helper Functions ---
  const updateList = (listId: string, updateFn: (list: ShoppingList) => ShoppingList) => {
    setShoppingLists(prev => prev.map(list => (list.id === listId ? updateFn(list) : list)));
  };

  const getUpdatedListStats = (items: ShoppingItem[]) => ({
    totalItems: items.length,
    completedItems: items.filter(item => item.checked).length
  });

  // --- List Actions ---
  const createNewList = () => {
    if (!newListName.trim()) { toast({ title: "Error", description: "Please enter a list name.", variant: "destructive" }); return; }
    const newList: ShoppingList = { id: Date.now().toString(), name: newListName.trim(), items: [], createdDate: new Date().toISOString().split('T')[0], totalItems: 0, completedItems: 0 };
    setShoppingLists(prev => [...prev, newList]);
    setActiveListId(newList.id);
    setNewListName("");
    setShowNewListForm(false);
    toast({ title: "List created", description: `"${newList.name}" has been created.` });
  };

  const removeList = (listId: string) => {
    setShoppingLists(prev => {
      const updatedLists = prev.filter(list => list.id !== listId);
      if (activeListId === listId) setActiveListId(updatedLists.length > 0 ? updatedLists[0].id : null);
      return updatedLists;
    });
    toast({ title: "List deleted", description: "Shopping list has been deleted." });
  };

  const duplicateList = (listToDuplicate: ShoppingList) => {
    const newId = Date.now().toString();
    const duplicatedList: ShoppingList = { ...listToDuplicate, id: newId, name: `${listToDuplicate.name} (Copy)`, createdDate: new Date().toISOString().split('T')[0], items: listToDuplicate.items.map(item => ({ ...item, id: `${item.id}-${newId}` })) };
    setShoppingLists(prev => [...prev, duplicatedList]);
    setActiveListId(newId);
    toast({ title: "List duplicated", description: `"${duplicatedList.name}" has been created.` });
  };

  // --- Item Actions ---
  const addItemToList = () => {
    if (!activeListId || !newItemName.trim() || !newItemQuantity.trim()) { toast({ title: "Error", description: "Please enter item name and quantity.", variant: "destructive" }); return; }
    const newItem: ShoppingItem = { id: Date.now().toString(), name: newItemName.trim(), quantity: newItemQuantity.trim(), category: newItemCategory, checked: false, addedDate: new Date().toISOString().split('T')[0] };
    updateList(activeListId, list => {
      const updatedItems = [...list.items, newItem];
      return { ...list, items: updatedItems, ...getUpdatedListStats(updatedItems) };
    });
    setNewItemName(""); setNewItemQuantity(""); setNewItemCategory("Pantry");
    toast({ title: "Item added", description: `${newItem.name} added to your shopping list.` });
  };

  const toggleItemCheck = (listId: string, itemId: string) => {
    updateList(listId, list => {
      const updatedItems = list.items.map(item => (item.id === itemId ? { ...item, checked: !item.checked } : item));
      return { ...list, items: updatedItems, ...getUpdatedListStats(updatedItems) };
    });
  };

  const removeItem = (listId: string, itemId: string) => {
    updateList(listId, list => {
      const updatedItems = list.items.filter(item => item.id !== itemId);
      return { ...list, items: updatedItems, ...getUpdatedListStats(updatedItems) };
    });
    toast({ title: "Item removed", description: "Item has been removed from the list." });
  };

  const clearAllItems = (listId: string) => {
    updateList(listId, list => ({ ...list, items: [], totalItems: 0, completedItems: 0 }));
    toast({ title: "List cleared", description: "All items have been removed from the list." });
  };

  const clearCompletedItems = (listId: string) => {
    updateList(listId, list => {
      const updatedItems = list.items.filter(item => !item.checked);
      return { ...list, items: updatedItems, ...getUpdatedListStats(updatedItems) };
    });
    toast({ title: "Completed items cleared", description: "All completed items have been removed." });
  };

  // --- Editing Item Logic ---
  const startEditingItem = (item: ShoppingItem) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
    setEditingItemQuantity(item.quantity);
    setEditingItemCategory(item.category);
  };

  const saveEditingItem = (listId: string, itemId: string) => {
    if (!editingItemName.trim() || !editingItemQuantity.trim()) { toast({ title: "Error", description: "Item name and quantity cannot be empty.", variant: "destructive" }); return; }
    updateList(listId, list => ({ ...list, items: list.items.map(item => item.id === itemId ? { ...item, name: editingItemName.trim(), quantity: editingItemQuantity.trim(), category: editingItemCategory } : item) }));
    setEditingItemId(null); setEditingItemName(""); setEditingItemQuantity(""); setEditingItemCategory("");
    toast({ title: "Item updated", description: "Shopping item has been updated." });
  };

  const cancelEditingItem = () => {
    setEditingItemId(null); setEditingItemName(""); setEditingItemQuantity(""); setEditingItemCategory("");
  };

  // --- Derived State (Memoized for performance) ---
  const activeListData = useMemo(() => shoppingLists.find(list => list.id === activeListId), [shoppingLists, activeListId]);

  const sortedAndFilteredItems = useMemo(() => {
    if (!activeListData) return [];
    let filteredItems = activeListData.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filteredItems].sort((a, b) => {
      if (sortBy === 'checked') { if (a.checked && !b.checked) return 1; if (!a.checked && b.checked) return -1; }
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'addedDate') return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      return 0;
    });
  }, [activeListData, sortBy, searchTerm]);

  // --- Render Functions (Inline Components) ---
  const ListSidebar = () => (
    <div className="lg:col-span-1">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Lists</span>
            <Button size="sm" onClick={() => setShowNewListForm(true)} className="flex items-center gap-1">
              <Plus size={16} /> <span className="hidden sm:inline">New</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar pr-2">
          <AnimatePresence>
            {showNewListForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 border rounded-lg bg-gray-50">
                <Input placeholder="New list name" value={newListName} onChange={(e) => setNewListName(e.target.value)} className="mb-2" onKeyPress={(e) => e.key === 'Enter' && createNewList()} />
                <div className="flex gap-2">
                  <Button size="sm" onClick={createNewList} className="flex-1"> <Check size={16} className="mr-1" /> Create </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowNewListForm(false)} className="flex-1"> <X size={16} className="mr-1" /> Cancel </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {shoppingLists.length === 0 && !showNewListForm ? (
            <div className="text-center py-8 text-gray-500"> <ListEnd size={48} className="mx-auto mb-3" /> <p>No lists created yet.</p> <p className="text-sm">Click '+' to add one!</p> </div>
          ) : (
            <AnimatePresence>
              {shoppingLists.map((list) => (
                <motion.div key={list.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} layout className={`p-3 border rounded-lg transition-colors duration-200 relative group ${activeListId === list.id ? 'border-wasfah-orange bg-orange-50 shadow-md' : 'hover:bg-gray-50'}`}>
                  <button className="absolute inset-0 w-full h-full z-10 focus:outline-none rounded-lg" onClick={() => setActiveListId(list.id)} aria-label={`Select ${list.name}`}></button>
                  <div className="relative z-20 flex justify-between items-start gap-2">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-gray-800 line-clamp-1">{list.name}</h3>
                      <p className="text-sm text-gray-600"> {list.completedItems}/{list.totalItems} completed </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-wasfah-green h-2 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${list.totalItems > 0 ? (list.completedItems / list.totalItems) * 100 : 0}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                      <Button size="icon" variant="ghost" className="w-7 h-7" onClick={(e) => { e.stopPropagation(); duplicateList(list); }} title="Duplicate List"> <Copy size={14} /> </Button>
                      <Button size="icon" variant="ghost" className="w-7 h-7 text-red-500 hover:text-red-600" onClick={(e) => { e.stopPropagation(); removeList(list.id); }} title="Delete List"> <Trash2 size={14} /> </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const ActiveListContent = () => (
    <div className="lg:col-span-3">
      {activeListData ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center flex-wrap gap-2">
              <CardTitle className="flex items-center gap-2 text-gray-800"> <ShoppingCart className="text-wasfah-orange" size={24} /> {activeListData.name} </CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => clearCompletedItems(activeListData.id)} disabled={activeListData.completedItems === 0} className="text-sm"> Clear Completed ({activeListData.completedItems}) </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm text-red-500 hover:text-red-600"> Clear All </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3">
                    <p className="text-sm mb-2">Are you sure you want to clear all items?</p>
                    <Button variant="destructive" size="sm" onClick={() => clearAllItems(activeListData.id)} className="w-full"> Confirm Clear All </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add Item Form */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50 flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full"> <label htmlFor="newItemName" className="text-xs text-gray-600 mb-1 block">Item Name</label> <Input id="newItemName" placeholder="e.g., Apples" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addItemToList()} /> </div>
              <div className="w-full sm:w-32"> <label htmlFor="newItemQuantity" className="text-xs text-gray-600 mb-1 block">Quantity</label> <Input id="newItemQuantity" placeholder="e.g., 5 pcs / 1 kg" value={newItemQuantity} onChange={(e) => setNewItemQuantity(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addItemToList()} /> </div>
              <div className="w-full sm:w-40"> <label htmlFor="newItemCategory" className="text-xs text-gray-600 mb-1 block">Category</label> <Select value={newItemCategory} onValueChange={setNewItemCategory}> <SelectTrigger id="newItemCategory"> <SelectValue placeholder="Select Category" /> </SelectTrigger> <SelectContent> {categories.filter(cat => cat !== "All").map(cat => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))} </SelectContent> </Select> </div>
              <Button onClick={addItemToList} className="w-full sm:w-auto h-10 mt-auto"> <Plus size={18} className="mr-1" /> Add </Button>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
              <div className="relative flex-1"> <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> <Input placeholder="Search items..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> </div>
              <div className="flex items-center gap-2"> <SortAsc size={18} className="text-gray-600" /> <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}> <SelectTrigger className="w-[180px]"> <SelectValue placeholder="Sort by" /> </SelectTrigger> <SelectContent> <SelectItem value="addedDate">Recently Added</SelectItem> <SelectItem value="name">Name (A-Z)</SelectItem> <SelectItem value="category">Category</SelectItem> <SelectItem value="checked">Status</SelectItem> </SelectContent> </Select> </div>
            </div>

            {/* Shopping Items */}
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {sortedAndFilteredItems.map((item) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.15 } }} transition={{ duration: 0.2 }} layout className={`flex items-center gap-3 p-3 border rounded-lg shadow-sm group relative ${item.checked ? 'bg-green-50 opacity-70 border-green-200' : 'bg-white border-gray-200'}`}>
                    <Checkbox checked={item.checked} onCheckedChange={() => toggleItemCheck(activeListData.id, item.id)} className="flex-shrink-0" />
                    {editingItemId === item.id ? (
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 pr-2">
                        <Input ref={nameInputRef} value={editingItemName} onChange={(e) => setEditingItemName(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && saveEditingItem(activeListData.id, item.id)} onBlur={() => saveEditingItem(activeListData.id, item.id)} className="col-span-1 sm:col-span-1" />
                        <Input value={editingItemQuantity} onChange={(e) => setEditingItemQuantity(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && saveEditingItem(activeListData.id, item.id)} onBlur={() => saveEditingItem(activeListData.id, item.id)} className="col-span-1 sm:col-span-1" />
                        <Select value={editingItemCategory} onValueChange={setEditingItemCategory}> <SelectTrigger className="w-full"> <SelectValue placeholder="Select Category" /> </SelectTrigger> <SelectContent> {categories.filter(cat => cat !== "All").map(cat => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))} </SelectContent> </Select>
                      </div>
                    ) : (
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-1 cursor-pointer" onClick={() => startEditingItem(item)}>
                        <div className={`font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}> {item.name} </div>
                        <div className={`text-sm text-gray-600 ${item.checked ? 'line-through' : ''}`}> {item.quantity} </div>
                        <div className={`text-sm text-gray-500 ${item.checked ? 'line-through' : ''}`}> {item.category} <span className="ml-2 text-xs text-gray-400 hidden sm:inline">({item.addedDate})</span> </div>
                      </div>
                    )}
                    <div className="flex gap-1 flex-shrink-0">
                      {editingItemId === item.id ? ( <> <Button size="icon" variant="ghost" onClick={() => saveEditingItem(activeListData.id, item.id)} className="w-8 h-8"> <Check size={18} className="text-green-500" /> </Button> <Button size="icon" variant="ghost" onClick={cancelEditingItem} className="w-8 h-8"> <X size={18} className="text-red-500" /> </Button> </> ) : ( <> <Button size="icon" variant="ghost" onClick={() => startEditingItem(item)} className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"> <Edit size={16} /> </Button> <Button size="icon" variant="ghost" onClick={() => removeItem(activeListData.id, item.id)} className="w-8 h-8 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"> <Trash2 size={16} /> </Button> </> )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {sortedAndFilteredItems.length === 0 && (
                <div className="text-center py-12 text-gray-500"> <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" /> <h3 className="text-lg font-semibold mb-2">No items found</h3> <p className="text-sm"> {searchTerm ? `No items match "${searchTerm}" in this list.` : "This list is empty. Add some items above!"} </p> </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="h-full flex items-center justify-center">
          <CardContent className="text-center py-12"> <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" /> <h3 className="text-lg font-semibold text-gray-600 mb-2">No lists selected</h3> <p className="text-gray-500 mb-4">Select a list from the left or create a new one to get started.</p> <Button onClick={() => setShowNewListForm(true)}> <Plus size={16} className="mr-2" /> Create New List </Button> </CardContent>
        </Card>
      )}
    </div>
  );

  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Shopping Lists</h1>
          <p className="text-gray-600">Organize your shopping and track your purchases with ease.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ListSidebar />
          <ActiveListContent />
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default ShoppingLists;
