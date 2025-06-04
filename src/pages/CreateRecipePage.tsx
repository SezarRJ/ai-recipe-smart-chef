
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChefHat, Plus, Camera, X, Upload } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface Instruction {
  id: string;
  text: string;
}

interface FormValues {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  category: string;
  subcategory: string;
  tags: string[];
}

const CreateRecipePage = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>();
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: '' });
  const [newInstruction, setNewInstruction] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Main categories and their subcategories
  const categories = {
    'Foods': ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'],
    'Desserts': ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'],
    'Drinks': ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others']
  };

  // List of cuisine countries
  const cuisines = [
    'Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Thai', 
    'Turkish', 'Syrian', 'Iraqi', 'Yemeni', 'American', 'Moroccan', 'Lebanese', 'German'
  ];

  // Difficulty levels
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  const handleAddIngredient = () => {
    if (newIngredient.name.trim()) {
      setIngredients([
        ...ingredients,
        { 
          id: Date.now().toString(), 
          name: newIngredient.name,
          quantity: newIngredient.quantity,
          unit: newIngredient.unit
        }
      ]);
      setNewIngredient({ name: '', quantity: '', unit: '' });
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([
        ...instructions,
        { id: Date.now().toString(), text: newInstruction }
      ]);
      setNewInstruction('');
    }
  };

  const handleRemoveInstruction = (id: string) => {
    setInstructions(instructions.filter(inst => inst.id !== id));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    // Check if all required fields are filled
    if (!form.getValues('title') || !form.getValues('description') || 
        ingredients.length === 0 || instructions.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill all the required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate submitting the form
    toast({
      title: "Recipe submitted",
      description: "Your recipe has been submitted for approval.",
    });
  };

  return (
    <PageContainer
      header={{
        title: 'Create Recipe',
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-20">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ChefHat size={24} className="text-wasfah-bright-teal" />
              <h2 className="text-xl font-bold text-wasfah-deep-teal">Share Your Recipe</h2>
            </div>
            <p className="text-gray-500 mt-1 mb-4">
              Share your culinary creations with the community
            </p>

            <Form {...form}>
              <form className="space-y-6">
                {/* Recipe Basic Info */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipe Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter recipe title" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your recipe" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Recipe Photo Upload */}
                <div>
                  <h3 className="font-semibold mb-2">Recipe Photo*</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-4">Upload photos of your recipe</p>
                    <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                      <Upload size={16} className="mr-2" /> Choose Photo
                    </Button>
                  </div>
                </div>

                {/* Ingredients Section */}
                <div>
                  <h3 className="font-semibold mb-2">Ingredients*</h3>
                  
                  <div className="flex space-x-2 mb-2">
                    <Input 
                      placeholder="Ingredient name" 
                      value={newIngredient.name}
                      onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                      className="flex-1"
                    />
                    <Input 
                      placeholder="Qty" 
                      type="text" 
                      value={newIngredient.quantity}
                      onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                      className="w-20"
                    />
                    <Select 
                      value={newIngredient.unit} 
                      onValueChange={(value) => setNewIngredient({...newIngredient, unit: value})}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {['g', 'kg', 'ml', 'L', 'tsp', 'tbsp', 'cup', 'oz', 'lb', 'piece'].map(u => (
                          <SelectItem key={u} value={u}>{u}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button"
                      onClick={handleAddIngredient} 
                      className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    {ingredients.map((ingredient) => (
                      <div 
                        key={ingredient.id} 
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                      >
                        <div>
                          <span className="font-medium">{ingredient.name}</span>
                          <span className="text-gray-500 ml-2">
                            {ingredient.quantity} {ingredient.unit}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveIngredient(ingredient.id)}
                        >
                          <X size={16} className="text-gray-400" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions Section */}
                <div>
                  <h3 className="font-semibold mb-2">Instructions*</h3>
                  
                  <div className="flex space-x-2 mb-2">
                    <Textarea 
                      placeholder="Add a step..." 
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="button"
                      onClick={handleAddInstruction} 
                      className="bg-wasfah-bright-teal hover:bg-wasfah-teal h-auto"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    {instructions.map((instruction, index) => (
                      <div 
                        key={instruction.id} 
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                      >
                        <div className="flex space-x-3">
                          <span className="font-bold text-wasfah-bright-teal">{index + 1}.</span>
                          <span>{instruction.text}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveInstruction(instruction.id)}
                        >
                          <X size={16} className="text-gray-400" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipe Details */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prep Time (minutes)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="15" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cookTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cook Time (minutes)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="30" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servings</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="4" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {difficultyLevels.map((level) => (
                              <SelectItem key={level} value={level.toLowerCase()}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cuisine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuisine</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cuisine" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cuisines.map((cuisine) => (
                              <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                                {cuisine}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys(categories).map((category) => (
                              <SelectItem key={category} value={category.toLowerCase()}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tags Section */}
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  
                  <div className="flex space-x-2 mb-2">
                    <Input 
                      placeholder="Add tag (e.g. spicy, quick)" 
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="button"
                      onClick={handleAddTag} 
                      className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <div 
                        key={tag} 
                        className="flex items-center space-x-1 px-3 py-1 bg-wasfah-light-gray rounded-full text-wasfah-deep-teal text-sm"
                      >
                        <span>{tag}</span>
                        <button 
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-wasfah-deep-teal hover:bg-wasfah-deep-teal/90 text-lg py-6"
                >
                  Submit Recipe for Approval
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CreateRecipePage;
