
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface IngredientImage {
  id: string;
  name: string;
  image_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export default function AdminIngredientImagesManager() {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<IngredientImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<IngredientImage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    category: ''
  });

  const categories = ['vegetables', 'fruits', 'meat', 'grains', 'dairy', 'oils', 'spices', 'other'];

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const { data, error } = await supabase
        .from('ingredient_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIngredients(data || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      toast({
        title: "Error",
        description: "Failed to load ingredient images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.image_url) {
      toast({
        title: "Validation Error",
        description: "Name and image URL are required",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingIngredient) {
        const { error } = await supabase
          .from('ingredient_images')
          .update({
            name: formData.name,
            image_url: formData.image_url,
            category: formData.category || 'other',
            updated_at: new Date().toISOString()
          })
          .eq('id', editingIngredient.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Ingredient image updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('ingredient_images')
          .insert({
            name: formData.name,
            image_url: formData.image_url,
            category: formData.category || 'other'
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Ingredient image added successfully",
        });
      }

      setFormData({ name: '', image_url: '', category: '' });
      setEditingIngredient(null);
      setIsAddDialogOpen(false);
      fetchIngredients();
    } catch (error) {
      console.error('Error saving ingredient:', error);
      toast({
        title: "Error",
        description: "Failed to save ingredient image",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (ingredient: IngredientImage) => {
    setEditingIngredient(ingredient);
    setFormData({
      name: ingredient.name,
      image_url: ingredient.image_url,
      category: ingredient.category
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ingredient image?')) return;

    try {
      const { error } = await supabase
        .from('ingredient_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Ingredient image deleted successfully",
      });

      fetchIngredients();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      toast({
        title: "Error",
        description: "Failed to delete ingredient image",
        variant: "destructive",
      });
    }
  };

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Ingredient Images Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingIngredient(null);
              setFormData({ name: '', image_url: '', category: '' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingIngredient ? 'Edit Ingredient Image' : 'Add New Ingredient Image'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter ingredient name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingIngredient ? 'Update' : 'Add'} Ingredient
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ingredient Images</CardTitle>
          <CardDescription>
            Manage ingredient images that appear in the "Find by Ingredients" feature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={ingredient.image_url}
                          alt={ingredient.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{ingredient.name}</TableCell>
                    <TableCell>
                      <span className="capitalize">{ingredient.category}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(ingredient.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(ingredient)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(ingredient.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredIngredients.length === 0 && !loading && (
            <div className="text-center py-8">
              <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No ingredient images found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
