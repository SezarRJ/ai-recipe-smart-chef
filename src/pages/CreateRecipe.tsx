
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Plus, Minus, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    cookingTime: "",
    servings: "",
    difficulty: "Easy",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [""]
  });

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }]
    }));
  };

  const removeIngredient = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, ""]
    }));
  };

  const removeInstruction = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const saveRecipe = () => {
    if (!recipe.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a recipe title",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Recipe saved!",
      description: "Your recipe has been created successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Create Recipe
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Share your culinary creation
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Recipe title"
                value={recipe.title}
                onChange={(e) => setRecipe(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Recipe description"
                value={recipe.description}
                onChange={(e) => setRecipe(prev => ({ ...prev, description: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Cooking time (minutes)"
                  type="number"
                  value={recipe.cookingTime}
                  onChange={(e) => setRecipe(prev => ({ ...prev, cookingTime: e.target.value }))}
                />
                <Input
                  placeholder="Servings"
                  type="number"
                  value={recipe.servings}
                  onChange={(e) => setRecipe(prev => ({ ...prev, servings: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ingredients</CardTitle>
                <Button size="sm" onClick={addIngredient}>
                  <Plus size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Ingredient name"
                    value={ingredient.name}
                    onChange={(e) => {
                      const newIngredients = [...recipe.ingredients];
                      newIngredients[index].name = e.target.value;
                      setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
                    }}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Qty"
                    value={ingredient.quantity}
                    onChange={(e) => {
                      const newIngredients = [...recipe.ingredients];
                      newIngredients[index].quantity = e.target.value;
                      setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
                    }}
                    className="w-20"
                  />
                  <Input
                    placeholder="Unit"
                    value={ingredient.unit}
                    onChange={(e) => {
                      const newIngredients = [...recipe.ingredients];
                      newIngredients[index].unit = e.target.value;
                      setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
                    }}
                    className="w-20"
                  />
                  {recipe.ingredients.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeIngredient(index)}
                    >
                      <Minus size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Instructions</CardTitle>
                <Button size="sm" onClick={addInstruction}>
                  <Plus size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-wasfah-orange text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <Textarea
                    placeholder={`Step ${index + 1} instructions`}
                    value={instruction}
                    onChange={(e) => {
                      const newInstructions = [...recipe.instructions];
                      newInstructions[index] = e.target.value;
                      setRecipe(prev => ({ ...prev, instructions: newInstructions }));
                    }}
                    className="flex-1"
                  />
                  {recipe.instructions.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeInstruction(index)}
                    >
                      <Minus size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={saveRecipe} className="w-full bg-gradient-to-r from-wasfah-orange to-wasfah-green">
            <Save className="mr-2" size={16} />
            Save Recipe
          </Button>
        </div>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default CreateRecipe;
