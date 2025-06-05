
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Image, Upload, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const mockIcons = [
  {
    id: 'ICON-001',
    name: 'Home Icon',
    category: 'navigation',
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=64&h=64&fit=crop&crop=center',
    usage: 'Bottom toolbar, main navigation',
    lastModified: '2024-01-15'
  },
  {
    id: 'ICON-002',
    name: 'Recipes Icon',
    category: 'features',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=64&h=64&fit=crop&crop=center',
    usage: 'Recipe pages, category cards',
    lastModified: '2024-01-14'
  },
  {
    id: 'ICON-003',
    name: 'Global Cuisine Icon',
    category: 'features',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=64&h=64&fit=crop&crop=center',
    usage: 'Cuisine selection, home page features',
    lastModified: '2024-01-13'
  },
  {
    id: 'ICON-004',
    name: 'AI Features Icon',
    category: 'features',
    url: 'https://images.unsplash.com/photo-1556909114-4e5c0b6ae52d?w=64&h=64&fit=crop&crop=center',
    usage: 'AI features page, smart recommendations',
    lastModified: '2024-01-12'
  }
];

const AdminIconsManagerPage = () => {
  const { toast } = useToast();
  const [icons, setIcons] = useState(mockIcons);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<any>(null);

  const handleCreateIcon = () => {
    setSelectedIcon(null);
    setDialogOpen(true);
  };

  const handleEditIcon = (icon: any) => {
    setSelectedIcon(icon);
    setDialogOpen(true);
  };

  const handleDeleteIcon = (id: string) => {
    setIcons(prev => prev.filter(icon => icon.id !== id));
    toast({
      title: "Icon Deleted",
      description: "Icon has been deleted successfully.",
    });
  };

  const filteredIcons = icons.filter(icon =>
    icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    icon.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryBadge = (category: string) => {
    const variants = {
      navigation: 'bg-blue-100 text-blue-800',
      features: 'bg-green-100 text-green-800',
      ui: 'bg-purple-100 text-purple-800',
      social: 'bg-orange-100 text-orange-800'
    };
    return <Badge className={variants[category as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>{category}</Badge>;
  };

  return (
    <AdminPageWrapper title="Icons Manager">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Icons Manager</h1>
            <p className="text-muted-foreground">Manage all icons and images used throughout the application.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button onClick={handleCreateIcon}>
              <Plus className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{icons.length}</div>
                <div className="text-sm text-gray-600">Total Icons</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{icons.filter(i => i.category === 'navigation').length}</div>
            <div className="text-sm text-gray-600">Navigation</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{icons.filter(i => i.category === 'features').length}</div>
            <div className="text-sm text-gray-600">Features</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">{icons.filter(i => i.category === 'ui').length}</div>
            <div className="text-sm text-gray-600">UI Elements</div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search icons..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIcons.map((icon) => (
            <div key={icon.id} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={icon.url} 
                    alt={icon.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditIcon(icon)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteIcon(icon.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">{icon.name}</h3>
                {getCategoryBadge(icon.category)}
                <p className="text-xs text-gray-600">{icon.usage}</p>
                <p className="text-xs text-gray-400">Modified: {icon.lastModified}</p>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedIcon ? 'Edit Icon' : 'Add New Icon'}
              </DialogTitle>
              <DialogDescription>
                {selectedIcon ? 'Update the icon details and image.' : 'Upload a new icon and set its properties.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="iconName">Icon Name</Label>
                <Input
                  id="iconName"
                  placeholder="e.g. Home Icon"
                  defaultValue={selectedIcon?.name || ''}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g. navigation, features, ui"
                  defaultValue={selectedIcon?.category || ''}
                />
              </div>
              <div>
                <Label htmlFor="usage">Usage Description</Label>
                <Input
                  id="usage"
                  placeholder="Where this icon is used"
                  defaultValue={selectedIcon?.usage || ''}
                />
              </div>
              <div>
                <Label htmlFor="iconFile">Icon File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG, SVG up to 2MB</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                {selectedIcon ? 'Update Icon' : 'Add Icon'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminIconsManagerPage;
