
import { useState } from "react";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ShoppingBag, ArrowLeft, Search, Package, Calendar, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  expiry: string;
  location: string;
}

const Pantry = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    unit: "piece",
    category: "fridge",
    expiry: ""
  });

  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { id: "1", name: "Milk", quantity: "1", unit: "L", category: "fridge", expiry: "2025-05-30", location: "Fridge" },
    { id: "2", name: "Eggs", quantity: "6", unit: "pieces", category: "fridge", expiry: "2025-05-28", location: "Fridge" },
    { id: "3", name: "Cheese", quantity: "200", unit: "g", category: "fridge", expiry: "2025-06-05", location: "Fridge" },
    { id: "4", name: "Rice", quantity: "2", unit: "kg", category: "cupboard", expiry: "2025-12-31", location: "Cupboard" },
    { id: "5", name: "Pasta", quantity: "500", unit: "g", category: "cupboard", expiry: "2025-11-15", location: "Cupboard" },
    { id: "6", name: "Flour", quantity: "1", unit: "kg", category: "cupboard", expiry: "2025-10-20", location: "Cupboard" },
    { id: "7", name: "Salt", quantity: "500", unit: "g", category: "spices", expiry: "2026-05-30", location: "Spice Rack" },
    { id: "8", name: "Pepper", quantity: "100", unit: "g", category: "spices", expiry: "2026-04-15", location: "Spice Rack" },
    { id: "9", name: "Cumin", quantity: "50", unit: "g", category: "spices", expiry: "2026-03-20", location: "Spice Rack" }
  ]);

  const categories = [
    { value: "all", label: "All Items", icon: "📦" },
    { value: "fridge", label: "Fridge", icon: "❄️" },
    { value: "cupboard", label: "Cupboard", icon: "🗄️" },
    { value: "spices", label: "Spices", icon: "🌶️" },
    { value: "freezer", label: "Freezer", icon: "🧊" },
    { value: "pantry", label: "Pantry", icon: "🏪" }
  ];

  const units = ["g", "kg", "ml", "L", "pieces", "cup", "tbsp", "tsp", "can", "bottle"];

  const filteredItems = pantryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getExpiryStatus = (expiry: string) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiry < 0) return { status: "expired", color: "text-red-600", bg: "bg-red-50" };
    if (daysUntilExpiry <= 3) return { status: "expiring", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (daysUntilExpiry <= 7) return { status: "soon", color: "text-orange-600", bg: "bg-orange-50" };
    return { status: "fresh", color: "text-green-600", bg: "bg-green-50" };
  };

  const addItem = () => {
    if (!newItem.name.trim()) {
      toast({
        title: "Please enter item name",
        variant: "destructive"
      });
      return;
    }

    const item: PantryItem = {
      id: Date.now().toString(),
      ...newItem,
      location: categories.find(c => c.value === newItem.category)?.label || "Other"
    };

    setPantryItems(prev => [...prev, item]);
    setNewItem({ name: "", quantity: "", unit: "piece", category: "fridge", expiry: "" });
    setShowAddForm(false);
    
    toast({
      title: "Item added!",
      description: `${item.name} has been added to your pantry`
    });
  };

  const removeItem = (id: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your pantry"
    });
  };

  const generateShoppingList = () => {
    // Filter items that are expiring soon or expired
    const lowItems = pantryItems.filter(item => {
      const status = getExpiryStatus(item.expiry);
      return status.status === "expired" || status.status === "expiring";
    });

    if (lowItems.length === 0) {
      toast({
        title: "Pantry is well stocked!",
        description: "No items need immediate replacement"
      });
    } else {
      toast({
        title: "Shopping list generated!",
        description: `${lowItems.length} items added to your shopping list`
      });
      navigate("/shopping-lists");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2 flex items-center gap-2">
              <Package className="text-wasfah-orange" size={28} />
              {t("nav.pantry")}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your ingredients and reduce waste
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search pantry items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    {category.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Item
          </Button>
          <Button
            onClick={generateShoppingList}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            Generate Shopping List
          </Button>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className="flex-1"
                  />
                  <Select value={newItem.unit} onValueChange={(value) => setNewItem({ ...newItem, unit: value })}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.value !== "all").map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={newItem.expiry}
                  onChange={(e) => setNewItem({ ...newItem, expiry: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addItem} className="flex-1">Add Item</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pantry Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-gray-600">
                  {searchQuery ? "Try adjusting your search" : "Add some items to your pantry"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredItems.map((item) => {
              const expiryStatus = getExpiryStatus(item.expiry);
              return (
                <Card key={item.id} className={`${expiryStatus.bg} border-l-4 ${
                  expiryStatus.status === "expired" ? "border-l-red-500" :
                  expiryStatus.status === "expiring" ? "border-l-yellow-500" :
                  expiryStatus.status === "soon" ? "border-l-orange-500" :
                  "border-l-green-500"
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <h4 className="font-semibold text-lg">{item.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Package size={14} />
                                {item.quantity} {item.unit}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                Expires: {item.expiry}
                              </span>
                              <Badge variant="outline">{item.location}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {(expiryStatus.status === "expired" || expiryStatus.status === "expiring") && (
                          <AlertTriangle size={20} className={expiryStatus.color} />
                        )}
                        <Badge className={`${expiryStatus.color} bg-white border`}>
                          {expiryStatus.status === "expired" ? "Expired" :
                           expiryStatus.status === "expiring" ? "Expiring Soon" :
                           expiryStatus.status === "soon" ? "Use Soon" : "Fresh"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default Pantry;
