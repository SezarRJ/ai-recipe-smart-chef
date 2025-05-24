
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Mic, Camera, X, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  id: string;
}

interface IngredientSelectorProps {
  onIngredientsChange: (ingredients: Ingredient[]) => void;
  existingIngredients?: Ingredient[];
}

export const IngredientSelector = ({ onIngredientsChange, existingIngredients = [] }: IngredientSelectorProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(existingIngredients);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: 1,
    unit: "cup"
  });
  const [showReviewScreen, setShowReviewScreen] = useState(false);

  const units = [
    "cup", "tbsp", "tsp", "oz", "lb", "g", "kg", "ml", "l", 
    "piece", "slice", "clove", "bunch", "can", "package"
  ];

  const commonIngredients = [
    "Chicken breast", "Ground beef", "Salmon", "Eggs", "Milk", "Butter",
    "Olive oil", "Onion", "Garlic", "Tomatoes", "Bell peppers", "Carrots",
    "Potatoes", "Rice", "Pasta", "Flour", "Sugar", "Salt", "Black pepper"
  ];

  const handleAddIngredient = () => {
    if (!newIngredient.name.trim()) {
      toast({
        title: "Please enter an ingredient name",
        variant: "destructive"
      });
      return;
    }

    const ingredient: Ingredient = {
      ...newIngredient,
      id: Date.now().toString()
    };

    const updatedIngredients = [...ingredients, ingredient];
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
    
    setNewIngredient({ name: "", quantity: 1, unit: "cup" });
    toast({
      title: "Ingredient added",
      description: `${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`
    });
  };

  const handleRemoveIngredient = (id: string) => {
    const updatedIngredients = ingredients.filter(ing => ing.id !== id);
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  const handleQuickAdd = (name: string) => {
    const ingredient: Ingredient = {
      name,
      quantity: 1,
      unit: "cup",
      id: Date.now().toString()
    };

    const updatedIngredients = [...ingredients, ingredient];
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice recognition feature coming soon!"
    });
  };

  const handleImageInput = () => {
    toast({
      title: "Image Recognition",
      description: "Image recognition feature coming soon!"
    });
  };

  const handleLoadFromPantry = () => {
    // Simulate loading from smart pantry
    const pantryItems: Ingredient[] = [
      { name: "Chicken breast", quantity: 2, unit: "piece", id: "pantry1" },
      { name: "Rice", quantity: 2, unit: "cup", id: "pantry2" },
      { name: "Onion", quantity: 1, unit: "piece", id: "pantry3" }
    ];

    const updatedIngredients = [...ingredients, ...pantryItems];
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
    
    toast({
      title: "Loaded from pantry",
      description: `Added ${pantryItems.length} ingredients from your smart pantry`
    });
  };

  if (showReviewScreen) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Review Ingredients
            <Button variant="ghost" size="sm" onClick={() => setShowReviewScreen(false)}>
              <X size={16} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-gray-600 ml-2">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button 
            className="w-full mt-4 bg-gradient-to-r from-wasfah-orange to-wasfah-green"
            onClick={() => setShowReviewScreen(false)}
          >
            Approve Ingredients
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Ingredient */}
      <Card>
        <CardHeader>
          <CardTitle>Add Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ingredient Name */}
          <div className="relative">
            <Input
              placeholder="Enter ingredient name..."
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <button
                onClick={handleVoiceInput}
                className="p-1 text-gray-400 hover:text-wasfah-orange transition-colors"
                title="Voice input"
              >
                <Mic size={16} />
              </button>
              <button
                onClick={handleImageInput}
                className="p-1 text-gray-400 hover:text-wasfah-orange transition-colors"
                title="Image recognition"
              >
                <Camera size={16} />
              </button>
            </div>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Quantity"
              value={newIngredient.quantity}
              onChange={(e) => setNewIngredient({ ...newIngredient, quantity: Number(e.target.value) })}
              min="0.1"
              step="0.1"
            />
            <select
              value={newIngredient.unit}
              onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-wasfah-orange"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <Button onClick={handleAddIngredient} className="w-full flex items-center gap-2">
            <Plus size={16} />
            Add Ingredient
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={handleLoadFromPantry}>
              Load from Smart Pantry
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowReviewScreen(true)}>
              Review & Modify
            </Button>
          </div>

          <h4 className="font-semibold mb-3">Common Ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {commonIngredients.map((ingredient) => (
              <Button
                key={ingredient}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdd(ingredient)}
                className="text-xs"
              >
                + {ingredient}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Ingredients */}
      {ingredients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Ingredients ({ingredients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <Badge key={ingredient.id} variant="secondary" className="gap-1 py-1 px-3">
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  <button onClick={() => handleRemoveIngredient(ingredient.id)}>
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
