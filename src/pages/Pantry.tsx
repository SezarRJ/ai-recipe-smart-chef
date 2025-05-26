import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Check, X, Camera, Barcode, Flame, AlertCircle, ShoppingCart, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
}

// --- Mock Data & Constants ---
const mockSmartPantrySuggestions = [
    "Chicken Breast", "Broccoli", "Greek Yogurt", "Salmon", "Sweet Potatoes",
    "Olive Oil", "Eggs", "Spinach", "Rice", "Pasta", "Tomatoes", "Onions",
    "Garlic", "Cheese", "Milk", "Flour", "Bread", "Apples", "Bananas"
];
const itemCategories = ["Produce", "Dairy", "Meat", "Seafood", "Pantry", "Grains", "Baking", "Frozen", "Beverages", "Spices", "Other"];
const itemUnits = ["g", "kg", "ml", "l", "piece", "can", "bag", "box", "bottle", "cup", "tbsp", "tsp", "pack", "dozen"];

const Pantry = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    // --- State Management ---
    const [pantryItems, setPantryItems] = useState<PantryItem[]>([
        { id: "p1", name: "Chicken Breast", quantity: 500, unit: "g", category: "Meat", addedDate: "2024-05-20", expiryDate: "2024-05-28" },
        { id: "p2", name: "Broccoli", quantity: 1, unit: "head", category: "Produce", addedDate: "2024-05-18", expiryDate: "2024-06-01" },
        { id: "p3", name: "Greek Yogurt", quantity: 500, unit: "g", category: "Dairy", addedDate: "2024-05-22", expiryDate: "2024-06-05" },
        { id: "p4", name: "Olive Oil", quantity: 1, unit: "bottle", category: "Pantry", addedDate: "2024-04-10" },
        { id: "p5", name: "Eggs", quantity: 6, unit: "piece", category: "Dairy", addedDate: "2024-05-20", expiryDate: "2024-06-10" },
        { id: "p6", name: "Spinach", quantity: 1, unit: "bag", category: "Produce", addedDate: "2024-05-23", expiryDate: "2024-05-26" }, // Expiring soon
    ]);

    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState<number | ''>('');
    const [newItemUnit, setNewItemUnit] = useState('piece');
    const [newItemCategory, setNewItemCategory] = useState('Other');
    const [newItemExpiry, setNewItemExpiry] = useState<string>('');

    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editItemName, setEditItemName] = useState('');
    const [editItemQuantity, setEditItemQuantity] = useState<number | ''>('');
    const [editItemUnit, setEditItemUnit] = useState('');
    const [editItemCategory, setEditItemCategory] = useState('');
    const [editItemExpiry, setEditItemExpiry] = useState<string>('');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
    const [showLowStock, setShowLowStock] = useState(false);
    const [showExpiringSoon, setShowExpiringSoon] = useState(false);

    const editNameRef = useRef<HTMLInputElement>(null);

    // --- Helper Functions ---
    const updatePantryItem = (id: string, updates: Partial<PantryItem>) => {
        setPantryItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    };

    const isExpiringSoon = (expiryDate?: string) => {
        if (!expiryDate) return false;
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7; // Expiring within 7 days
    };

    // --- Pantry Actions ---
    const addItem = () => {
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
        setNewItemName('');
        setNewItemQuantity('');
        setNewItemExpiry('');
        toast({ title: "Item Added", description: `${newItem.name} added to your pantry.` });
    };

    const startEditing = (item: PantryItem) => {
        setEditingItemId(item.id);
        setEditItemName(item.name);
        setEditItemQuantity(item.quantity);
        setEditItemUnit(item.unit);
        setEditItemCategory(item.category);
        setEditItemExpiry(item.expiryDate || '');
        setTimeout(() => editNameRef.current?.focus(), 0); // Focus after render
    };

    const saveEditing = (id: string) => {
        if (!editItemName.trim() || editItemQuantity === '') {
            toast({ title: "Error", description: "Name and Quantity cannot be empty.", variant: "destructive" });
            return;
        }
        updatePantryItem(id, {
            name: editItemName.trim(),
            quantity: Number(editItemQuantity),
            unit: editItemUnit,
            category: editItemCategory,
            expiryDate: editItemExpiry || undefined,
        });
        setEditingItemId(null);
        toast({ title: "Item Updated", description: "Pantry item saved successfully." });
    };

    const cancelEditing = () => {
        setEditingItemId(null);
    };

    const removeItem = (id: string) => {
        setPantryItems(prev => prev.filter(item => item.id !== id));
        toast({ title: "Item Removed", description: "Item deleted from pantry." });
    };

    const addToShoppingList = (item: PantryItem) => {
        // In a real app, this would dispatch an action to add to shopping list context/store
        toast({ title: "Added to Shopping List", description: `${item.name} added to your shopping list.` });
    };

    // --- Filtered & Sorted Items (Memoized) ---
    const filteredItems = useMemo(() => {
        let items = pantryItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter)
        );

        if (showLowStock) {
            // Mock low stock items (e.g., quantity < 2 or specific units for counts)
            items = items.filter(item => item.quantity < 2 && (item.unit === 'piece' || item.unit === 'pack'));
        }
        if (showExpiringSoon) {
            items = items.filter(item => isExpiringSoon(item.expiryDate));
        }

        // Sort by expiry date (expiring soonest first)
        return items.sort((a, b) => {
            if (!a.expiryDate && !b.expiryDate) return 0;
            if (!a.expiryDate) return 1; // Non-expiring items last
            if (!b.expiryDate) return -1; // Non-expiring items last
            return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        });
    }, [pantryItems, searchTerm, selectedCategoryFilter, showLowStock, showExpiringSoon]);

    // --- Render Helpers (for cleaner JSX) ---
    const renderAddEditForm = (isEditing: boolean, item?: PantryItem) => (
        <div className="flex flex-col sm:flex-row gap-3 items-end p-4 bg-gray-50 rounded-lg mb-6">
            <div className="flex-1 w-full">
                <label htmlFor="itemName" className="text-xs text-gray-600 mb-1 block">Item Name</label>
                <Input
                    id="itemName"
                    ref={isEditing ? editNameRef : null}
                    placeholder="e.g., Apples"
                    value={isEditing ? editItemName : newItemName}
                    onChange={(e) => isEditing ? setEditItemName(e.target.value) : setNewItemName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (isEditing ? saveEditing(item!.id) : addItem())}
                    list="smart-pantry-suggestions" // For auto-suggestions
                />
                <datalist id="smart-pantry-suggestions">
                    {mockSmartPantrySuggestions.map(s => <option key={s} value={s} />)}
                </datalist>
            </div>
            <div className="w-full sm:w-24">
                <label htmlFor="itemQuantity" className="text-xs text-gray-600 mb-1 block">Qty</label>
                <Input
                    id="itemQuantity"
                    type="number"
                    placeholder="1"
                    value={isEditing ? editItemQuantity : newItemQuantity}
                    onChange={(e) => isEditing ? setEditItemQuantity(Number(e.target.value)) : setNewItemQuantity(Number(e.target.value))}
                    onKeyPress={(e) => e.key === 'Enter' && (isEditing ? saveEditing(item!.id) : addItem())}
                />
            </div>
            <div className="w-full sm:w-24">
                <label htmlFor="itemUnit" className="text-xs text-gray-600 mb-1 block">Unit</label>
                <Select value={isEditing ? editItemUnit : newItemUnit} onValueChange={(val) => isEditing ? setEditItemUnit(val) : setNewItemUnit(val)}>
                    <SelectTrigger id="itemUnit"> <SelectValue placeholder="Unit" /> </SelectTrigger>
                    <SelectContent>
                        {itemUnits.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full sm:w-36">
                <label htmlFor="itemCategory" className="text-xs text-gray-600 mb-1 block">Category</label>
                <Select value={isEditing ? editItemCategory : newItemCategory} onValueChange={(val) => isEditing ? setEditItemCategory(val) : setNewItemCategory(val)}>
                    <SelectTrigger id="itemCategory"> <SelectValue placeholder="Category" /> </SelectTrigger>
                    <SelectContent>
                        {itemCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full sm:w-36">
                <label htmlFor="itemExpiry" className="text-xs text-gray-600 mb-1 block">Expiry Date</label>
                <Input
                    id="itemExpiry"
                    type="date"
                    value={isEditing ? editItemExpiry : newItemExpiry}
                    onChange={(e) => isEditing ? setEditItemExpiry(e.target.value) : setNewItemExpiry(e.target.value)}
                />
            </div>
            {isEditing ? (
                <>
                    <Button onClick={() => saveEditing(item!.id)} className="w-full sm:w-auto h-10 mt-auto"><Check size={18} className="mr-1" /> Save</Button>
                    <Button variant="outline" onClick={cancelEditing} className="w-full sm:w-auto h-10 mt-auto"><X size={18} className="mr-1" /> Cancel</Button>
                </>
            ) : (
                <Button onClick={addItem} className="w-full sm:w-auto h-10 mt-auto"><Plus size={18} className="mr-1" /> Add Item</Button>
            )}
        </div>
    );

    const renderPantryItemCard = (item: PantryItem) => (
        <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-sm p-4 relative border border-gray-200 hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <div className="flex items-center gap-2">
                    {isExpiringSoon(item.expiryDate) && (
                        <AlertCircle size={18} className="text-red-500" />
                    )}
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

    // --- Main Render ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">My Smart Pantry</h1>
                    <p className="text-gray-600">Track your ingredients, minimize waste, and streamline meal prep.</p>
                </motion.div>

                {/* Barcode/Image Scan Section */}
                <Card className="mb-6">
                    <CardHeader><CardTitle>Quick Add</CardTitle></CardHeader>
                    <CardContent className="flex flex-wrap gap-4 justify-center">
                        <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
                            <Camera size={20} /> Scan Item (Image Recognition)
                        </Button>
                        <Button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white">
                            <Barcode size={20} /> Scan Barcode
                        </Button>
                        <Button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white">
                            <Flame size={20} /> AI Pantry Assistant (Voice/Text Input)
                        </Button>
                        <p className="text-sm text-gray-600 w-full text-center mt-2">
                            (These features are simulated for demonstration)
                        </p>
                    </CardContent>
                </Card>

                {/* Add/Edit Item Form */}
                <Card className="mb-6">
                    <CardHeader><CardTitle>{editingItemId ? 'Edit Pantry Item' : 'Add New Item'}</CardTitle></CardHeader>
                    <CardContent>
                        {renderAddEditForm(editingItemId !== null, pantryItems.find(i => i.id === editingItemId))}
                    </CardContent>
                </Card>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardHeader><CardTitle>Pantry Overview</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="relative flex-1">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Search items..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Categories</SelectItem>
                                    {itemCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Button
                                variant={showLowStock ? "default" : "outline"}
                                onClick={() => setShowLowStock(prev => !prev)}
                                className="flex items-center gap-2"
                            >
                                <AlertCircle size={16} /> Low Stock
                            </Button>
                            <Button
                                variant={showExpiringSoon ? "default" : "outline"}
                                onClick={() => setShowExpiringSoon(prev => !prev)}
                                className="flex items-center gap-2"
                            >
                                <Flame size={16} /> Expiring Soon
                            </Button>
                        </div>

                        {/* Pantry Item List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map(renderPantryItemCard)
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full text-center py-8 text-gray-500"
                                    >
                                        <img src="/empty-pantry.png" alt="Empty Pantry" className="mx-auto h-24 mb-4" />
                                        <p>No items found matching your filters.</p>
                                        <p className="text-sm">Try adjusting your search or filters.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <MobileNavigation />
        </div>
    );
};

export default Pantry;
