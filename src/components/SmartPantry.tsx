
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Calendar, AlertTriangle, Package } from "lucide-react";

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
  const categories = ["All", "Protein", "Vegetables", "Fruits", "Dairy", "Grains", "Pantry"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const updateQuantity = (id: string, change: number) => {
    setPantryItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const filteredItems = pantryItems.filter(item =>
    selectedCategory === "All" || item.category === selectedCategory
  );

  const lowStockItems = pantryItems.filter(item => item.isLow || item.quantity < 2);
  const expiringItems = pantryItems.filter(item => {
    if (!item.expiryDate) return false;
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const daysDiff = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 3;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Smart Pantry Management</h1>
        <p className="text-muted-foreground">Keep track of your ingredients and never run out</p>
      </div>

      {/* Alerts */}
      {(lowStockItems.length > 0 || expiringItems.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lowStockItems.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="h-4 w-4" />
                  Low Stock ({lowStockItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {lowStockItems.slice(0, 3).map(item => (
                    <div key={item.id} className="text-sm text-orange-600">
                      {item.name} - {item.quantity} {item.unit}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {expiringItems.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 text-red-700">
                  <Calendar className="h-4 w-4" />
                  Expiring Soon ({expiringItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {expiringItems.slice(0, 3).map(item => (
                    <div key={item.id} className="text-sm text-red-600">
                      {item.name} - {item.expiryDate}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Tabs defaultValue="pantry" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pantry">Pantry Items</TabsTrigger>
          <TabsTrigger value="shopping">Shopping List</TabsTrigger>
          <TabsTrigger value="history">Usage History</TabsTrigger>
        </TabsList>

        <TabsContent value="pantry" className="space-y-4">
          {/* Add New Item */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter item name..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => setNewItem("")}>Add Item</Button>
              </div>
            </CardContent>
          </Card>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Pantry Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold">
                      {item.quantity} {item.unit}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {item.expiryDate && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Expires: {item.expiryDate}
                    </div>
                  )}

                  {item.isLow && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-xs">
                      Low
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shopping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shopping List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>{item.name}</span>
                    <Badge variant="outline">Need more</Badge>
                  </div>
                ))}
                {lowStockItems.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Your pantry is well stocked! 🎉
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Chicken Breast used in Pasta Recipe", "Tomatoes used in Salad", "Milk used in Smoothie"].map((usage, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{usage}</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
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
