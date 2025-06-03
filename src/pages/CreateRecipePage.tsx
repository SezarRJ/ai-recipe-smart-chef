
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Upload, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const CreateRecipePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    prep_time: '',
    cooking_time: '',
    servings: '',
    difficulty: '',
    cuisine_type: '',
    image_url: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
    instructions: [''],
    categories: [] as string[],
    tags: [] as string[]
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setRecipe(prev => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: '' }]
    }));
  };

  const removeIngredient = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => 
        i === index ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const addInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => 
        i === index ? value : inst
      )
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !recipe.tags.includes(newTag.trim())) {
      setRecipe(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setRecipe(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!recipe.title || !recipe.description || recipe.ingredients.length === 0 || recipe.instructions.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    // Save recipe logic would go here
    toast({
      title: 'Recipe Created!',
      description: 'Your recipe has been saved successfully'
    });
    
    navigate('/recipes');
  };

  return (
    <PageContainer header={{ title: 'Create Recipe', showBackButton: true }}>
      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Recipe Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Recipe Title *</Label>
              <Input
                id="title"
                value={recipe.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter recipe title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={recipe.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your recipe"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="prep_time">Prep Time (min)</Label>
                <Input
                  id="prep_time"
                  type="number"
                  value={recipe.prep_time}
                  onChange={(e) => handleInputChange('prep_time', e.target.value)}
                  placeholder="30"
                />
              </div>
              <div>
                <Label htmlFor="cooking_time">Cook Time (min)</Label>
                <Input
                  id="cooking_time"
                  type="number"
                  value={recipe.cooking_time}
                  onChange={(e) => handleInputChange('cooking_time', e.target.value)}
                  placeholder="45"
                />
              </div>
              <div>
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  value={recipe.servings}
                  onChange={(e) => handleInputChange('servings', e.target.value)}
                  placeholder="4"
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={recipe.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="cuisine_type">Cuisine Type</Label>
              <Input
                id="cuisine_type"
                value={recipe.cuisine_type}
                onChange={(e) => handleInputChange('cuisine_type', e.target.value)}
                placeholder="e.g., Italian, Chinese, Mexican"
              />
            </div>

            <div>
              <Label htmlFor="image_url">Recipe Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image_url"
                  value={recipe.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <Button type="button" variant="outline">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle>Ingredients *</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-6">
                  <Label>Ingredient</Label>
                  <Input
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                    placeholder="e.g., Chicken breast"
                  />
                </div>
                <div className="col-span-3">
                  <Label>Quantity</Label>
                  <Input
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                    placeholder="2"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Unit</Label>
                  <Input
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                    placeholder="cups"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    disabled={recipe.ingredients.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addIngredient}>
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions *</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-wasfah-bright-teal text-white rounded-full flex items-center justify-center text-sm font-bold mt-2">
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
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeInstruction(index)}
                  disabled={recipe.instructions.length === 1}
                  className="mt-2"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addInstruction}>
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} ×
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal">
            <Save className="h-4 w-4 mr-2" />
            Save Recipe
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </PageContainer>
  );
};

export default CreateRecipePage;
