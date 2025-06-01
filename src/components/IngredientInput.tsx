
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, ChefHat, Clock, Users } from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

const IngredientInput = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [currentUnit, setCurrentUnit] = useState("piece");

  const units = ["piece", "cup", "tbsp", "tsp", "lb", "oz", "gram", "kg", "ml", "liter"];
  
  const cuisineTypes = ["Italian", "Mexican", "Asian", "Mediterranean", "Indian", "French"];
  const difficultyLevels = ["Easy", "Medium", "Hard"];
  const cookingTimes = ["Under 15 min", "15-30 min", "30-60 min", "Over 1 hour"];

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      const newIngredient: Ingredient = {
        id: Date.now().toString(),
        name: currentIngredient.trim(),
        quantity: currentQuantity,
        unit: currentUnit
      };
      setIngredients([...ingredients, newIngredient]);
      setCurrentIngredient("");
      setCurrentQuantity("");
    }
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const pantryIngredients = [
    "Chicken Breast", "Rice", "Onions", "Garlic", "Tomatoes", "Olive Oil",
    "Salt", "Black Pepper", "Cheese", "Eggs", "Milk", "Butter"
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Recipe from Ingredients</h1>
        <p className="text-muted-foreground">Add your available ingredients and discover amazing recipes</p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="pantry">From Pantry</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="ingredient">Ingredient</Label>
                  <Input
                    id="ingredient"
                    placeholder="e.g., Chicken breast"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder="2"
                    value={currentQuantity}
                    onChange={(e) => setCurrentQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={currentUnit} onValueChange={setCurrentUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={addIngredient} className="w-full md:w-auto">
                Add Ingredient
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pantry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select from Smart Pantry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {pantryIngredients.map((ingredient) => (
                  <Button
                    key={ingredient}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newIngredient: Ingredient = {
                        id: Date.now().toString() + Math.random(),
                        name: ingredient,
                        quantity: "1",
                        unit: "piece"
                      };
                      setIngredients([...ingredients, newIngredient]);
                    }}
                    className="text-left justify-start"
                  >
                    {ingredient}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Added Ingredients */}
      {ingredients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Ingredients ({ingredients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <Badge
                  key={ingredient.id}
                  variant="secondary"
                  className="px-3 py-1 bg-orange-100 text-orange-800 border border-orange-200"
                >
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIngredient(ingredient.id)}
                    className="ml-2 h-4 w-4 p-0 hover:bg-orange-200"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Cuisine Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any cuisine" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {cuisineTypes.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Difficulty</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cooking Time</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {cookingTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Find Recipes Button */}
      <Button 
        size="lg" 
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
        disabled={ingredients.length === 0}
      >
        <ChefHat className="mr-2 h-5 w-5" />
        Find Recipes ({ingredients.length} ingredients)
      </Button>

      {/* Sample Recipe Results */}
      {ingredients.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="card-hover cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 rounded-t-lg"></div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Recipe Suggestion {i}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  A delicious recipe using {Math.min(ingredients.length, 3)} of your ingredients
                </p>
                <div className="flex gap-2 mb-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    25 min
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    4 servings
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-emerald-600 font-medium">
                    {Math.floor(Math.random() * 3) + 2} missing ingredients
                  </span>
                  <Button size="sm">View Recipe</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
