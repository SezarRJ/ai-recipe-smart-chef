
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, Upload, ChefHat } from 'lucide-react';

const CreateRecipePage = () => {
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
  const [instructions, setInstructions] = useState(['']);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  return (
    <PageContainer
      header={{
        title: 'Create Recipe',
        showBackButton: true
      }}
    >
      <div className="space-y-6 pb-20">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-wasfah-bright-teal" />
              Recipe Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Recipe Title</Label>
              <Input id="title" placeholder="Enter recipe title" />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Brief description of your recipe" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prep-time">Prep Time (minutes)</Label>
                <Input id="prep-time" type="number" placeholder="30" />
              </div>
              <div>
                <Label htmlFor="cook-time">Cook Time (minutes)</Label>
                <Input id="cook-time" type="number" placeholder="45" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="servings">Servings</Label>
                <Input id="servings" type="number" placeholder="4" />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Recipe Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Click to upload recipe image</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <Label>Ingredient</Label>
                  <Input placeholder="e.g., Flour" />
                </div>
                <div className="col-span-3">
                  <Label>Amount</Label>
                  <Input placeholder="2" />
                </div>
                <div className="col-span-3">
                  <Label>Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cups">Cups</SelectItem>
                      <SelectItem value="tbsp">Tablespoons</SelectItem>
                      <SelectItem value="tsp">Teaspoons</SelectItem>
                      <SelectItem value="grams">Grams</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="pieces">Pieces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addIngredient} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Label>Step {index + 1}</Label>
                  <Textarea placeholder="Describe this cooking step..." />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeInstruction(index)}
                  disabled={instructions.length === 1}
                  className="mt-6"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addInstruction} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            Save as Draft
          </Button>
          <Button className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal">
            Publish Recipe
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateRecipePage;
