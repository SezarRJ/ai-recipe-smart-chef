
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ingredient {
  id: string;
  name: string;
  category: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  created_at: string;
}

const AdminIngredients = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: '1',
      name: 'Chicken Breast',
      category: 'Meat',
      calories_per_100g: 165,
      protein_per_100g: 31,
      carbs_per_100g: 0,
      fat_per_100g: 3.6,
      created_at: '2024-01-01'
    },
    {
      id: '2',
      name: 'Rice',
      category: 'Grains',
      calories_per_100g: 130,
      protein_per_100g: 2.7,
      carbs_per_100g: 28,
      fat_per_100g: 0.3,
      created_at: '2024-01-01'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['All', 'Meat', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Spices'];

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
    toast({
      title: 'Ingredient deleted',
      description: 'Ingredient has been removed from the database'
    });
  };

  return (
    <PageContainer
      header={{
        title: 'Ingredient Management',
        showBackButton: true,
      }}
    >
      <div className="space-y-6">
        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIngredients.map((ingredient) => (
            <Card key={ingredient.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{ingredient.name}</CardTitle>
                  <Badge variant="secondary">{ingredient.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Calories: {ingredient.calories_per_100g}g</div>
                  <div>Protein: {ingredient.protein_per_100g}g</div>
                  <div>Carbs: {ingredient.carbs_per_100g}g</div>
                  <div>Fat: {ingredient.fat_per_100g}g</div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteIngredient(ingredient.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No ingredients found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default AdminIngredients;
