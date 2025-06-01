
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Plus, X, Clock, Users, ChefHat, Camera, Save, Upload, Image } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

interface Recipe {
  title: string;
  description: string;
  cookTime: string;
  prepTime: string;
  servings: string;
  difficulty: string;
  cuisine: string;
  category: string;
  ingredients: Ingredient[];
  instructions: string[];
  tips: string;
  image: string;
}

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    description: "",
    cookTime: "",
    prepTime: "",
    servings: "",
    difficulty: "easy",
    cuisine: "International",
    category: "Main Dish",
    ingredients: [{ id: "1", name: "", amount: "", unit: "cups" }],
    instructions: [""],
    tips: "",
    image: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const difficulties = ["easy", "medium", "hard"];
  const cuisines = ["International", "Italian", "Asian", "Mexican", "Mediterranean", "Indian", "Middle Eastern", "American"];
  const categories = ["Main Dish", "Appetizer", "Dessert", "Breakfast", "Snack", "Soup", "Salad", "Beverage"];
  const units = ["cups", "tbsp", "tsp", "oz", "lbs", "g", "kg", "ml", "l", "pieces", "cloves"];

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: "",
      amount: "",
      unit: "cups"
    };
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
  };

  const removeIngredient = (id: string) => {
    if (recipe.ingredients.length > 1) {
      setRecipe(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter(ing => ing.id !== id)
      }));
    }
  };

  const updateIngredient = (id: string, field: string, value: string) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ing =>
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const addInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, ""]
    }));
  };

  const removeInstruction = (index: number) => {
    if (recipe.instructions.length > 1) {
      setRecipe(prev => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index)
      }));
    }
  };

  const updateInstruction = (index: number, value: string) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => i === index ? value : inst)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setRecipe(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setRecipe(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const saveRecipe = () => {
    // Validate required fields
    if (!recipe.title || !recipe.description || recipe.ingredients.some(ing => !ing.name) || recipe.instructions.some(inst => !inst.trim())) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage for demo
    const savedRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      author: "Current User"
    };
    savedRecipes.push(newRecipe);
    localStorage.setItem('userRecipes', JSON.stringify(savedRecipes));

    toast({
      title: "Recipe saved!",
      description: "Your recipe has been created successfully",
    });

    navigate('/shared-recipes');
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Create Recipe</h1>
          <p className="text-gray-600">Share your culinary creation with the community</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-wasfah-orange text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-wasfah-orange h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Basic Info</span>
            <span>Ingredients</span>
            <span>Instructions</span>
            <span>Review</span>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="text-wasfah-orange" size={20} />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Recipe Title *</label>
                  <Input
                    value={recipe.title}
                    onChange={(e) => setRecipe(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter recipe title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <Textarea
                    value={recipe.description}
                    onChange={(e) => setRecipe(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your recipe..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Prep Time (minutes)</label>
                    <Input
                      type="number"
                      value={recipe.prepTime}
                      onChange={(e) => setRecipe(prev => ({ ...prev, prepTime: e.target.value }))}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cook Time (minutes)</label>
                    <Input
                      type="number"
                      value={recipe.cookTime}
                      onChange={(e) => setRecipe(prev => ({ ...prev, cookTime: e.target.value }))}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Servings</label>
                    <Input
                      type="number"
                      value={recipe.servings}
                      onChange={(e) => setRecipe(prev => ({ ...prev, servings: e.target.value }))}
                      placeholder="4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <select
                      value={recipe.difficulty}
                      onChange={(e) => setRecipe(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {difficulties.map(diff => (
                        <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cuisine</label>
                    <select
                      value={recipe.cuisine}
                      onChange={(e) => setRecipe(prev => ({ ...prev, cuisine: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {cuisines.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={recipe.category}
                      onChange={(e) => setRecipe(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div>
                  <label className="block text-sm font-medium mb-2">Recipe Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Recipe preview" className="w-full h-48 object-cover rounded-lg" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview("");
                            setRecipe(prev => ({ ...prev, image: "" }));
                          }}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <div>
                          <p className="text-gray-600 mb-4">Add a photo of your recipe</p>
                          <div className="flex justify-center gap-3">
                            <Button type="button" onClick={triggerFileUpload} variant="outline">
                              <Upload size={16} className="mr-2" />
                              Upload Photo
                            </Button>
                            <Button type="button" onClick={triggerCameraCapture} variant="outline">
                              <Camera size={16} className="mr-2" />
                              Take Photo
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCameraCapture}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex gap-2 items-center">
                    <div className="flex-1">
                      <Input
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                        placeholder="Ingredient name"
                      />
                    </div>
                    <div className="w-24">
                      <Input
                        value={ingredient.amount}
                        onChange={(e) => updateIngredient(ingredient.id, 'amount', e.target.value)}
                        placeholder="Amount"
                      />
                    </div>
                    <div className="w-24">
                      <select
                        value={ingredient.unit}
                        onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                        className="w-full px-2 py-2 border rounded-md bg-white text-sm"
                      >
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeIngredient(ingredient.id)}
                      disabled={recipe.ingredients.length === 1}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button onClick={addIngredient} variant="outline">
                  <Plus size={16} className="mr-2" />
                  Add Ingredient
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="w-8 h-8 bg-wasfah-orange text-white rounded-full flex items-center justify-center text-sm font-medium mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Textarea
                        value={instruction}
                        onChange={(e) => updateInstruction(index, e.target.value)}
                        placeholder={`Step ${index + 1} instructions...`}
                        rows={2}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeInstruction(index)}
                      disabled={recipe.instructions.length === 1}
                      className="mt-1"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button onClick={addInstruction} variant="outline">
                  <Plus size={16} className="mr-2" />
                  Add Step
                </Button>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-1">Tips & Notes (Optional)</label>
                  <Textarea
                    value={recipe.tips}
                    onChange={(e) => setRecipe(prev => ({ ...prev, tips: e.target.value }))}
                    placeholder="Any helpful tips or additional notes..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Recipe Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <Clock size={20} className="text-wasfah-orange mx-auto mb-1" />
                      <div className="text-sm text-gray-600">Prep: {recipe.prepTime}m</div>
                    </div>
                    <div className="text-center">
                      <Clock size={20} className="text-wasfah-orange mx-auto mb-1" />
                      <div className="text-sm text-gray-600">Cook: {recipe.cookTime}m</div>
                    </div>
                    <div className="text-center">
                      <Users size={20} className="text-wasfah-orange mx-auto mb-1" />
                      <div className="text-sm text-gray-600">Serves: {recipe.servings}</div>
                    </div>
                    <div className="text-center">
                      <ChefHat size={20} className="text-wasfah-orange mx-auto mb-1" />
                      <div className="text-sm text-gray-600 capitalize">{recipe.difficulty}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Cuisine:</span> {recipe.cuisine} | 
                    <span className="font-medium ml-2">Category:</span> {recipe.category}
                  </div>
                </div>

                {/* Ingredients Preview */}
                <div>
                  <h4 className="font-medium mb-2">Ingredients ({recipe.ingredients.length})</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {recipe.ingredients.map((ing, index) => (
                      <li key={index}>{ing.amount} {ing.unit} {ing.name}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructions Preview */}
                <div>
                  <h4 className="font-medium mb-2">Instructions ({recipe.instructions.length} steps)</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {recipe.instructions.map((inst, index) => (
                      <li key={index}>{inst}</li>
                    ))}
                  </ol>
                </div>

                {recipe.tips && (
                  <div>
                    <h4 className="font-medium mb-2">Tips & Notes</h4>
                    <p className="text-sm text-gray-600">{recipe.tips}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            variant="outline"
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button onClick={saveRecipe} className="bg-wasfah-orange hover:bg-wasfah-orange-dark">
              <Save size={16} className="mr-2" />
              Publish Recipe
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
