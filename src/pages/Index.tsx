import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "../Header";
import { Search, Utensils, Coffee, Cookie, ShoppingCart, Scan, Clock } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "food",
      title: "Food",
      description: "Delicious meals and savory dishes",
      icon: Utensils,
      gradient: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      delay: "0ms"
    },
    {
      id: "desserts",
      title: "Desserts",
      description: "Sweet treats and delightful desserts",
      icon: Cookie,
      gradient: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      delay: "100ms"
    },
    {
      id: "drinks",
      title: "Drinks",
      description: "Refreshing beverages and cocktails",
      icon: Coffee,
      gradient: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-50",
      delay: "200ms"
    }
  ];

  const quickActions = [
    { icon: Search, label: "Find Recipe", color: "text-orange-600", bg: "bg-orange-100" },
    { icon: ShoppingCart, label: "Shopping List", color: "text-emerald-600", bg: "bg-emerald-100" },
    { icon: Scan, label: "Scan Dish", color: "text-purple-600", bg: "bg-purple-100" },
    { icon: Clock, label: "Meal Plan", color: "text-blue-600", bg: "bg-blue-100" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "ingredients":
        return null;
      case "pantry":
        return null;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-8 px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="gradient-text">Wasfah AI</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover personalized recipes, plan meals, and cook with AI-powered assistance
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search recipes, ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base rounded-full border-2 border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
              {quickActions.map((action, index) => (
                <Card key={action.label} className="card-hover cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center mx-auto mb-2`}>
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <p className="text-sm font-medium">{action.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Categories */}
            <div className="px-4">
              <h2 className="text-2xl font-bold mb-6 text-center">Explore Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className="card-hover cursor-pointer overflow-hidden"
                    style={{ animationDelay: `${category.delay}` }}
                  >
                    <div className={`h-48 ${category.bgColor} bg-gradient-to-br ${category.gradient}`}></div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <Button>Explore {category.title}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Featured Recipes */}
            <div className="px-4">
              <h2 className="text-2xl font-bold mb-6 text-center">Featured Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="card-hover cursor-pointer overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300"></div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Delicious Recipe {i}</h3>
                      <p className="text-sm text-muted-foreground mb-3">A wonderful dish that brings flavors together...</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">30 min</Badge>
                        <Badge variant="secondary">Easy</Badge>
                        <Badge variant="secondary">4 servings</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-20 pb-8">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
