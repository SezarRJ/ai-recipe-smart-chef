import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Check, X, ShoppingCart, CalendarDays, BarChart, UtensilsCrossed, Wheat, Droplet, Clock, Gauge, Target, Sparkles, SlidersHorizontal, Settings2, Scale, AlertCircle, Flame, Camera, Barcode, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MobileNavigation } from "@/components/MobileNavigation";

// --- Interfaces ---
interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  addedDate: string;
  expiryDate?: string;
  lowStockThreshold?: number;
}

interface MealPlan {
  id: string;
  day: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  recipeName: string;
  ingredients: { name: string; quantity: number; unit: string; }[];
}

// --- Mock Data & Constants ---
const itemCategories = ["Produce", "Dairy", "Meat", "Seafood", "Pantry", "Grains", "Baking", "Frozen", "Beverages", "Spices", "Other"];
const itemUnits = ["g", "kg", "ml", "l", "piece", "can", "bag", "box", "bottle", "cup", "tbsp", "tsp", "pack", "dozen"];
const mockRecipes = [
  { name: "Chicken Stir-fry", ingredients: [{ name: "Chicken Breast", quantity: 200, unit: "g" }, { name: "Broccoli", quantity: 1, unit: "cup" }, { name: "Soy Sauce", quantity: 2, unit: "tbsp" }] },
  { name: "Lentil Soup", ingredients: [{ name: "Lentils", quantity: 1, unit: "cup" }, { name: "Carrot", quantity: 1, unit: "piece" }, { name: "Onion", quantity: 1, unit: "piece" }] },
  { name: "Greek Yogurt Parfait", ingredients: [{ name: "Greek Yogurt", quantity: 1, unit: "cup" }, { name: "Berries", quantity: 1, unit: "cup" }] },
];

const nutritionalTargets = { calories: 2000, protein: 100, carbs: 250, fat: 70 }; // Example daily targets

const Pantry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // --- State Management ---
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { id: "p1", name: "Chicken Breast", quantity: 500, unit: "g", category: "Meat", addedDate: "2024-05-20", expiryDate: "2024-05-28", lowStockThreshold: 100 },
    { id: "p2", name: "Broccoli", quantity: 1, unit: "head", category: "Produce", addedDate: "2024-05-18", expiryDate: "2024-06-01", lowStockThreshold: 0.5 },
    { id: "p3", name: "Greek Yogurt", quantity: 500, unit: "g", category: "Dairy", addedDate: "2024-05-22", expiryDate: "2024-06-05", lowStockThreshold: 150 },
    { id: "p4", name: "Olive Oil", quantity: 1, unit: "bottle", category: "Pantry", addedDate: "2024-04-10", lowStockThreshold: 0.2 },
    { id: "p5", name: "Eggs", quantity: 6, unit: "piece", category: "Dairy", addedDate: "2024-05-20", expiryDate: "2024-06-10", lowStockThreshold: 3 },
    { id: "p6", name: "Spinach", quantity: 1, unit: "bag", category: "Produce", addedDate: "2024-05-23", expiryDate: "2024-05-26", lowStockThreshold: 0.5 }, // Expiring soon, low stock
  ]);

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    { id: "m1", day: "Monday", mealType: "Lunch", recipeName: "Chicken Stir-fry", ingredients: mockRecipes[0].ingredients },
    { id: "m2", day: "Tuesday", mealType: "Dinner", recipeName: "Lentil Soup", ingredients: mockRecipes[1].ingredients },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState<number | ''>('');
  const [newItemUnit, setNewItemUnit] = useState('piece');
  const [newItemCategory, setNewItemCategory] = useState('Other');
  const [newItemExpiry, setNewItemExpiry] = useState<string>('');

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemDetails, setEditItemDetails] = useState<Partial<PantryItem>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [showLowStock, setShowLowStock] = useState(false);
  const [showExpiringSoon, setShowExpiringSoon] = useState(false);

  // --- Helper Functions ---
  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  const isLowStock = (item: PantryItem) => {
    if (item.lowStockThreshold === undefined) return false;
    return item.quantity <= item.lowStockThreshold;
  };

  // --- Pantry Item Actions ---
  const handleAddItem = () => {
    if (!newItemName.trim() || newItemQuantity === '') {
      toast({ title: "Error", description: "Name and Quantity are required.", variant: "destructive" });
      return;
    }
    const newItem: PantryItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: Number(newItemQuantity),
      unit: newItemUnit,
      category: newItemCategory,
      addedDate: new Date().toISOString().split('T')[0],
      expiryDate: newItemExpiry || undefined,
    };
    setPantryItems(prev => [...prev, newItem]);
    setNewItemName(''); setNewItemQuantity(''); setNewItemExpiry('');
    toast({ title: "Item Added", description: `${newItem.name} added to your pantry.` });
  };

  const startEditing = (item: PantryItem) => {
    setEditingItemId(item.id);
    setEditItemDetails({ ...item });
  };

  const saveEditing = (id: string) => {
    if (!editItemDetails.name?.trim() || editItemDetails.quantity === undefined) {
      toast({ title: "Error", description: "Name and Quantity cannot be empty.", variant: "destructive" });
      return;
    }
    setPantryItems(prev => prev.map(item => item.id === id ? { ...item, ...editItemDetails } : item));
    setEditingItemId(null);
    toast({ title: "Item Updated", description: "Pantry item saved successfully." });
  };

  const removeItem = (id: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
    toast({ title: "Item Removed", description: "Item deleted from pantry." });
  };

  const addToShoppingList = (item: PantryItem) => {
    toast({ title: "Added to Shopping List", description: `${item.name} added to your shopping list.` });
  };

  // --- Meal Plan Actions ---
  const generateMealPlanSuggestion = () => {
    const availableItems = pantryItems.filter(item => !isLowStock(item) && !isExpiringSoon(item.expiryDate));
    const randomRecipe = mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
    const newPlan: MealPlan = {
      id: Date.now().toString(),
      day: "Today",
      mealType: "Dinner",
      recipeName: randomRecipe.name,
      ingredients: randomRecipe.ingredients,
    };
    setMealPlans(prev => [...prev, newPlan]);
    toast({ title: "Meal Suggestion", description: `Try "${randomRecipe.name}" for dinner!` });
  };

  const generateShoppingListFromMeals = () => {
    const requiredForMeals = new Map<string, { quantity: number, unit: string }>();
    mealPlans.forEach(plan => {
      plan.ingredients.forEach(ing => {
        const key = `${ing.name.toLowerCase()}-${ing.unit}`;
        requiredForMeals.set(key, {
          quantity: (requiredForMeals.get(key)?.quantity || 0) + ing.quantity,
          unit: ing.unit
        });
      });
    });

    const itemsToBuy: { name: string; quantity: number; unit: string; }[] = [];
    requiredForMeals.forEach((details, key) => {
      const [name, unit] = key.split('-');
      const pantryStock = pantryItems.find(p => p.name.toLowerCase() === name && p.unit === unit);
      if (!pantryStock || pantryStock.quantity < details.quantity) {
        itemsToBuy.push({
          name: name,
          quantity: details.quantity - (pantryStock?.quantity || 0),
          unit: unit
        });
      }
    });

    if (itemsToBuy.length > 0) {
      toast({ title: "Shopping List Generated", description: `Added ${itemsToBuy.length} items to your shopping list.` });
      console.log("Items to buy:", itemsToBuy);
    } else {
      toast({ title: "Shopping List", description: "You have all ingredients for your current meal plans!" });
    }
  };

  // --- Derived State (Memoized for performance) ---
  const filteredItems = useMemo(() => {
    let items = pantryItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter)
    );
    if (showLowStock) items = items.filter(isLowStock);
    if (showExpiringSoon) items = items.filter(item => isExpiringSoon(item.expiryDate));
    return items.sort((a, b) => {
      if (!a.expiryDate && !b.expiryDate) return 0;
      if (!a.expiryDate) return 1;
      if (!b.expiryDate) return -1;
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    });
  }, [pantryItems, searchTerm, selectedCategoryFilter, showLowStock, showExpiringSoon]);

  const currentNutritionalIntake = useMemo(() => {
    // This would be complex in a real app (nutrition DB lookup)
    // Mocking based on current meal plan for demo
    let calories = 0, protein = 0, carbs = 0, fat = 0;
    mealPlans.forEach(plan => {
      // Mocking some values per meal for demonstration
      calories += 500;
      protein += 30;
      carbs += 60;
      fat += 20;
    });
    return { calories, protein, carbs, fat };
  }, [mealPlans]);


  // --- Render Helpers (for cleaner JSX) ---
  const renderItemForm = (isEditing: boolean, item?: PantryItem) => (
    <div className="flex flex-col sm:flex-row gap-3 items-end p-4 bg-gray-50 rounded-lg mb-6">
      <div className="flex-1 w-full">
        <label htmlFor="itemName" className="text-xs text-gray-600 mb-1 block">Item Name</label>
        <Input id="itemName" placeholder="e.g., Apples"
          value={isEditing ? (editItemDetails.name || '') : newItemName}
          onChange={(e) => isEditing ? setEditItemDetails(prev => ({ ...prev, name: e.target.value })) : setNewItemName(e.target.value)}
          list="smart-pantry-suggestions" />
        <datalist id="smart-pantry-suggestions">
          {mockRecipes.flatMap(r => r.ingredients.map(i => i.name)).filter((v, i, a) => a.indexOf(v) === i).map(s => <option key={s} value={s} />)}
        </datalist>
      </div>
      <div className="w-full sm:w-24">
        <label htmlFor="itemQuantity" className="text-xs text-gray-600 mb-1 block">Qty</label>
        <Input id="itemQuantity" type="number" placeholder="1"
          value={isEditing ? (editItemDetails.quantity || '') : newItemQuantity}
          onChange={(e) => isEditing ? setEditItemDetails(prev => ({ ...prev, quantity: Number(e.target.value) })) : setNewItemQuantity(Number(e.target.value))} />
      </div>
      <div className="w-full sm:w-24">
        <label htmlFor="itemUnit" className="text-xs text-gray-600 mb-1 block">Unit</label>
        <Select value={isEditing ? (editItemDetails.unit || '') : newItemUnit} onValueChange={(val) => isEditing ? setEditItemDetails(prev => ({ ...prev, unit: val })) : setNewItemUnit(val)}>
          <SelectTrigger id="itemUnit"> <SelectValue placeholder="Unit" /> </SelectTrigger>
          <SelectContent> {itemUnits.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)} </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-36">
        <label htmlFor="itemCategory" className="text-xs text-gray-600 mb-1 block">Category</label>
        <Select value={isEditing ? (editItemDetails.category || '') : newItemCategory} onValueChange={(val) => isEditing ? setEditItemDetails(prev => ({ ...prev, category: val })) : setNewItemCategory(val)}>
          <SelectTrigger id="itemCategory"> <SelectValue placeholder="Category" /> </SelectTrigger>
          <SelectContent> {itemCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)} </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-36">
        <label htmlFor="itemExpiry" className="text-xs text-gray-600 mb-1 block">Expiry Date</label>
        <Input id="itemExpiry" type="date"
          value={isEditing ? (editItemDetails.expiryDate || '') : newItemExpiry}
          onChange={(e) => isEditing ? setEditItemDetails(prev => ({ ...prev, expiryDate: e.target.value })) : setNewItemExpiry(e.target.value)} />
      </div>
      {isEditing ? (
        <>
          <Button onClick={() => saveEditing(item!.id)} className="w-full sm:w-auto h-10 mt-auto"><Check size={18} className="mr-1" /> Save</Button>
          <Button variant="outline" onClick={() => setEditingItemId(null)} className="w-full sm:w-auto h-10 mt-auto"><X size={18} className="mr-1" /> Cancel</Button>
        </>
      ) : (
        <Button onClick={handleAddItem} className="w-full sm:w-auto h-10 mt-auto"><Plus size={18} className="mr-1" /> Add Item</Button>
      )}
    </div>
  );

  const renderPantryItemCard = (item: PantryItem) => (
    <motion.div
      key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm p-4 relative border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
        <div className="flex items-center gap-2">
          {isLowStock(item) && <AlertCircle size={18} className="text-orange-500" />}
          {isExpiringSoon(item.expiryDate) && <Flame size={18} className="text-red-500" />}
          <Badge variant="secondary">{item.category}</Badge>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-2">{item.quantity} {item.unit}</p>
      <div className="text-xs text-gray-500 mb-4">
        Added: {item.addedDate}
        {item.expiryDate && ` • Expires: ${item.expiryDate}`}
      </div>
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={() => addToShoppingList(item)}>
          <ShoppingCart size={16} className="mr-1" /> Add to List
        </Button>
        <Button size="sm" variant="outline" onClick={() => startEditing(item)}>
          <Edit size={16} />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => removeItem(item.id)}>
          <Trash2 size={16} />
        </Button>
      </div>
    </motion.div>
  );

  const renderMealPlanCard = (plan: MealPlan) => (
    <Card key={plan.id} className="relative group hover:shadow-lg transition-shadow bg-blue-50">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-semibold">{plan.day} - {plan.mealType}</h4>
            <p className="text-lg font-bold text-blue-700">{plan.recipeName}</p>
          </div>
          {/* Drag handle placeholder */}
          <div className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
            <SlidersHorizontal size={18} />
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p className="font-medium">Ingredients:</p>
          <ul className="list-disc list-inside">
            {plan.ingredients.map((ing, i) => <li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>)}
          </ul>
        </div>
        {/* Actions for editing/removing meal plan */}
        <div className="flex justify-end gap-2 mt-3">
          <Button size="sm" variant="outline"><Edit size={14}/></Button>
          <Button size="sm" variant="destructive"><Trash2 size={14}/></Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderWeeklySummary = () => (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Weekly Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="font-semibold text-gray-700">Nutritional Progress Today (Mock)</h3>
        {Object.entries(nutritionalTargets).map(([key, target]) => (
          <div key={key}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span>{currentNutritionalIntake[key as keyof typeof currentNutritionalIntake]} / {target}</span>
            </div>
            <Progress value={(currentNutritionalIntake[key as keyof typeof currentNutritionalIntake] / target) * 100} className="h-2" />
          </div>
        ))}
        <Button className="w-full flex items-center gap-2 bg-purple-500 hover:bg-purple-600">
          <Target size={16} /> Set Nutritional Targets
        </Button>
      </CardContent>
    </Card>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">My Smart Pantry & Meal Planner</h1>
          <p className="text-gray-600">Manage ingredients, plan meals, and track your nutrition goals.</p>
        </motion.div>

        {/* Quick Actions / AI Integration */}
        <Card className="mb-6">
          <CardHeader><CardTitle>AI-Powered Tools & Quick Actions</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-4 justify-center">
            <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white" onClick={generateMealPlanSuggestion}>
              <Sparkles size={20} /> Smart Meal Suggestion
            </Button>
            <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
              <Camera size={20} /> Scan Item (Image Rec.)
            </Button>
            <Button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white">
              <Barcode size={20} /> Scan Barcode
            </Button>
          </CardContent>
        </Card>

        {/* Add/Edit Pantry Item Form */}
        <Card className="mb-6">
          <CardHeader><CardTitle>{editingItemId ? 'Edit Pantry Item' : 'Add New Item to Pantry'}</CardTitle></CardHeader>
          <CardContent>
            {renderItemForm(editingItemId !== null, pantryItems.find(i => i.id === editingItemId))}
          </CardContent>
        </Card>

        {/* Pantry Overview & Filters */}
        <Card className="mb-6">
          <CardHeader><CardTitle>Pantry Inventory</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search items..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Categories" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {itemCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant={showLowStock ? "default" : "outline"} onClick={() => setShowLowStock(prev => !prev)} className="flex items-center gap-2">
                <AlertCircle size={16} /> Low Stock ({pantryItems.filter(isLowStock).length})
              </Button>
              <Button variant={showExpiringSoon ? "default" : "outline"} onClick={() => setShowExpiringSoon(prev => !prev)} className="flex items-center gap-2">
                <Flame size={16} /> Expiring Soon ({pantryItems.filter(item => isExpiringSoon(item.expiryDate)).length})
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredItems.length > 0 ? (
                  filteredItems.map(renderPantryItemCard)
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-8 text-gray-500">
                    <img src="/empty-pantry.png" alt="Empty Pantry" className="mx-auto h-24 mb-4" />
                    <p>No items found matching your filters.</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Meal Planning Section */}
        <Card className="mb-6">
          <CardHeader><CardTitle>Weekly Meal Plan</CardTitle></CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="planner">Meal Planner</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                {renderWeeklySummary()}
                <Button className="w-full mt-4 flex items-center gap-2 bg-orange-500 hover:bg-orange-600" onClick={generateShoppingListFromMeals}>
                  <ShoppingCart size={18} /> Generate Shopping List
                </Button>
              </TabsContent>
              <TabsContent value="planner" className="mt-4">
                <p className="text-gray-600 mb-4 flex items-center gap-2"><Settings2 size={16}/> Drag and drop functionality for rescheduling meals would go here.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {mealPlans.map(renderMealPlanCard)}
                  {mealPlans.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      <UtensilsCrossed size={48} className="mx-auto mb-3" />
                      <p>No meals planned yet.</p>
                      <Button onClick={generateMealPlanSuggestion} className="mt-3 flex items-center gap-2">
                        <Sparkles size={16} /> Get a Smart Suggestion
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Pantry;
