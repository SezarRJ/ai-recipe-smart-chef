
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface IngredientImage {
  id: string;
  ingredient_name: string;
  image_url: string;
  alt_text: string;
  created_at: string;
  updated_at: string;
}

export const AdminIngredientImagesManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<IngredientImage | null>(null);
  const [formData, setFormData] = useState({
    ingredient_name: '',
    image_url: '',
    alt_text: ''
  });

  const queryClient = useQueryClient();

  const { data: images, isLoading } = useQuery({
    queryKey: ['admin-ingredient-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredient_images')
        .select('*')
        .order('ingredient_name');
      
      if (error) throw error;
      return data as IngredientImage[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('ingredient_images')
        .insert(data);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-ingredient-images'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success!",
        description: "Ingredient image created successfully."
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from('ingredient_images')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-ingredient-images'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success!",
        description: "Ingredient image updated successfully."
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ingredient_images')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-ingredient-images'] });
      toast({
        title: "Success!",
        description: "Ingredient image deleted successfully."
      });
    }
  });

  const resetForm = () => {
    setFormData({
      ingredient_name: '',
      image_url: '',
      alt_text: ''
    });
    setEditingImage(null);
  };

  const handleEdit = (image: IngredientImage) => {
    setEditingImage(image);
    setFormData({
      ingredient_name: image.ingredient_name,
      image_url: image.image_url,
      alt_text: image.alt_text || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingImage) {
      updateMutation.mutate({ id: editingImage.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ingredient Images Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingImage ? 'Edit Ingredient Image' : 'Add New Ingredient Image'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="ingredient_name">Ingredient Name</Label>
                <Input
                  id="ingredient_name"
                  value={formData.ingredient_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, ingredient_name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="alt_text">Alt Text</Label>
                <Textarea
                  id="alt_text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
                  placeholder="Description of the image for accessibility"
                />
              </div>
              <Button 
                type="submit" 
                disabled={createMutation.isPending || updateMutation.isPending}
                className="w-full"
              >
                {editingImage ? 'Update Image' : 'Create Image'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="w-full h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          images?.map((image) => (
            <Card key={image.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg capitalize">{image.ingredient_name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.alt_text || image.ingredient_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(image)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(image.id)}
                    disabled={deleteMutation.isPending}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
