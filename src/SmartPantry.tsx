
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, Calendar, AlertTriangle, Package, Search, Filter, ShoppingCart } from "lucide-react";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate?: string;
  isLow?: boolean;
}

const SmartPantry = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { id: "1", name: "Chicken Breast", quantity: 2, unit: "lbs", category: "Protein", expiryDate: "2024-01-15" },
    { id: "2", name: "Rice", quantity: 5, unit: "cups", category: "Grains", expiryDate: "2024-06-30" },
    { id: "3", name: "Milk", quantity: 1, unit: "gallon", category: "Dairy", expiryDate: "2024-01-10", isLow: true },
    { id: "4", name: "Eggs", quantity: 12, unit: "pieces", category: "Protein", expiryDate: "2024-01-20" },
    { id: "5", name: "Tomatoes", quantity: 3, unit: "pieces", category: "Vegetables", expiryDate: "2024-01-08" },
    { id: "6", name: "Olive Oil", quantity: 1, unit: "bottle", category: "Pantry", expiryDate: "2024-12-31" }
  ]);

  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Protein", "Vegetables", "Fruits", "Dairy", "Grains", "Pantry"];
  const units = ["pieces", "lbs", "kg", "cups", "bottle", "gallon", "oz"];

  const addNewItem = () => {
    if (newItem && newQuantity && newUnit && newCategory) {
      const item: PantryItem = {
        id: Date.now().toString(),
        name: newItem,
        quantity: parseFloat(newQuantity),
        unit: newUnit,
        category: newCategory,
        expiryDate: newExpiryDate || undefined,
        isLow: parseFloat(newQuantity) < 2
      };
      setPantryItems([...pantryItems, item]);
      setNewItem("");
      setNewQuantity("");
      setNewUnit("");
      setNewCategory("");
      setNewExpiryDate("");
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setPantryItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity, isLow: newQuantity < 2 };
        }
        return item;
      })
    );
  };

  const deleteItem = (id: string) => {
    setPantryItems(items => items.filter(item => item.id !== id));
  };

  const filteredItems = pantryItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const lowStockItems = pantryItems.filter(item => item.isLow || item.quantity < 2);
  const expiringItems = pantryItems.filter(item => {
    if (!item.expiryDate) return false;
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const daysDiff = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 3;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Protein': 'bg-red-100 text-red-800 border-red-200',
      'Vegetables': 'bg-green-100 text-green-800 border-green-200',
      'Fruits': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Dairy': 'bg-blue-100 text-blue-800 border-blue-200',
      'Grains': 'bg-orange-100 text-orange-800 border-orange-200',
      'Pantry': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal bg-clip-text text-transparent">
          Smart Pantry Management
        </h1>
        <p className="text-gray-600 text-lg">Keep track of your ingredients and never run out</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-white shadow-sm"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 h-12 bg-white shadow-sm">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Alerts */}
      {(lowStockItems.length > 0 || expiringItems.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lowStockItems.length > 0 && (
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="h-5 w-5" />
                  Low Stock ({lowStockItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {lowStockItems.slice(0, 3).map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                      <span className="font-medium text-orange-700">{item.name}</span>
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        {item.quantity} {item.unit}
                      </Badge>
                    </div>
                  ))}
                  {lowStockItems.length > 3 && (
                    <p className="text-sm text-orange-600 text-center">
                      +{lowStockItems.length - 3} more items
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {expiringItems.length > 0 && (
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-red-700">
                  <Calendar className="h-5 w-5" />
                  Expiring Soon ({expiringItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {expiringItems.slice(0, 3).map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                      <span className="font-medium text-red-700">{item.name}</span>
                      <Badge variant="outline" className="text-red-600 border-red-300">
                        {item.expiryDate}
                      </Badge>
                    </div>
                  ))}
                  {expiringItems.length > 3 && (
                    <p className="text-sm text-red-600 text-center">
                      +{expiringItems.length - 3} more items
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Tabs defaultValue="pantry" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="pantry" className="data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white">
            Pantry Items
          </TabsTrigger>
          <TabsTrigger value="shopping" className="data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white">
            Shopping List
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white">
            Usage History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pantry" className="space-y-6">
          {/* Add New Item */}
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-wasfah-deep-teal">
                <Plus className="h-5 w-5" />
                Add New Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <Input
                  placeholder="Item name..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="lg:col-span-2"
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                />
                <Select value={newUnit} onValueChange={setNewUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== "All").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={newExpiryDate}
                    onChange={(e) => setNewExpiryDate(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addNewItem} className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pantry Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="relative shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                      <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                    </div>
                    {item.isLow && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        Low
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-wasfah-deep-teal">
                      {item.quantity} {item.unit}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 p-0 border-gray-300 hover:border-wasfah-bright-teal"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 p-0 border-gray-300 hover:border-wasfah-bright-teal"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {item.expiryDate && (
                    <div className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4" />
                      Expires: {item.expiryDate}
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Remove Item
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No items found</p>
              <p className="text-gray-400">Try adjusting your search or filter</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shopping" className="space-y-6">
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-wasfah-deep-teal">
                <ShoppingCart className="h-5 w-5" />
                Shopping List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-wasfah-bright-teal rounded-full"></div>
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="ml-2">{item.category}</Badge>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                      Need more
                    </Badge>
                  </div>
                ))}
                {lowStockItems.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">Your pantry is well stocked! 🎉</p>
                    <p className="text-gray-400">No items need restocking</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-wasfah-deep-teal">
                <Package className="h-5 w-5" />
                Recent Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Chicken Breast used in Pasta Recipe", "Tomatoes used in Salad", "Milk used in Smoothie", "Rice used in Stir Fry"].map((usage, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
                    <Package className="h-5 w-5 text-wasfah-bright-teal" />
                    <span className="flex-1 font-medium">{usage}</span>
                    <span className="text-sm text-gray-500">{2 + index} hours ago</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartPantry;
