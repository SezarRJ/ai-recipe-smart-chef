
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Minus, Search, Filter, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  status: 'fresh' | 'expiring' | 'expired';
  addedDate: string;
}

const Pantry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: "1",
      name: "Tomatoes",
      category: "Vegetables",
      quantity: 5,
      unit: "pieces",
      expiryDate: "2024-02-15",
      status: "fresh",
      addedDate: "2024-01-28"
    },
    {
      id: "2",
      name: "Milk",
      category: "Dairy",
      quantity: 1,
      unit: "liter",
      expiryDate: "2024-02-05",
      status: "expiring",
      addedDate: "2024-01-30"
    },
    {
      id: "3",
      name: "Bread",
      category: "Grains",
      quantity: 1,
      unit: "loaf",
      expiryDate: "2024-01-30",
      status: "expired",
      addedDate: "2024-01-25"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Vegetables",
    quantity: 1,
    unit: "pieces",
    expiryDate: ""
  });

  const categories = ["all", "Vegetables", "Fruits", "Dairy", "Meat", "Grains", "Spices"];

  const filteredItems = pantryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addItem = () => {
    if (!newItem.name || !newItem.expiryDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const today = new Date();
    const expiry = new Date(newItem.expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    let status: 'fresh' | 'expiring' | 'expired' = 'fresh';
    if (daysUntilExpiry < 0) status = 'expired';
    else if (daysUntilExpiry <= 3) status = 'expiring';

    const item: PantryItem = {
      id: Date.now().toString(),
      ...newItem,
      status,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setPantryItems(prev => [...prev, item]);
    setNewItem({
      name: "",
      category: "Vegetables",
      quantity: 1,
      unit: "pieces",
      expiryDate: ""
    });
    setShowAddForm(false);
    toast({
      title: "Item added",
      description: "Successfully added to pantry",
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setPantryItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        if (newQuantity === 0) {
          toast({
            title: "Item removed",
            description: "Item quantity reached zero and was removed",
          });
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as PantryItem[]);
  };

  const removeItem = (id: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Successfully removed from pantry",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">My Pantry</h1>
          <p className="text-gray-600">Track your ingredients and expiry dates</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search pantry items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus size={16} className="mr-2" />
            Add Item
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 text-wasfah-orange mx-auto mb-2" />
              <div className="text-2xl font-bold">{pantryItems.length}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{pantryItems.filter(item => item.status === 'expiring').length}</div>
              <div className="text-sm text-gray-600">Expiring Soon</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{pantryItems.filter(item => item.status === 'expired').length}</div>
              <div className="text-sm text-gray-600">Expired</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Item Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add New Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Item name"
                      value={newItem.name}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      className="px-3 py-2 border rounded-md bg-white"
                    >
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                        min="1"
                      />
                      <select
                        value={newItem.unit}
                        onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                        className="px-3 py-2 border rounded-md bg-white"
                      >
                        <option value="pieces">pieces</option>
                        <option value="kg">kg</option>
                        <option value="grams">grams</option>
                        <option value="liter">liter</option>
                        <option value="ml">ml</option>
                        <option value="cups">cups</option>
                      </select>
                    </div>
                    <Input
                      type="date"
                      value={newItem.expiryDate}
                      onChange={(e) => setNewItem(prev => ({ ...prev, expiryDate: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addItem} className="flex-1">Add Item</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pantry Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="font-medium">{item.quantity} {item.unit}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Expires:</span>
                        <span className={item.status === 'expired' ? 'text-red-600' : 'text-gray-800'}>
                          {item.expiryDate}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="w-full"
                    >
                      Remove Item
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filters" 
                : "Start by adding items to your pantry"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pantry;
