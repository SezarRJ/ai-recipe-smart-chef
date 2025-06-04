
import React, { useState, useMemo } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Upload, MoreHorizontal, RefreshCw, Plus, Edit, Trash2, Eye, Image, Folder } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ImageAsset {
  id: string;
  name: string;
  url: string;
  type: 'recipe' | 'ingredient' | 'icon' | 'logo' | 'background' | 'avatar';
  category: string;
  size: string;
  uploadedAt: string;
  usedIn: string[];
}

const mockImages: ImageAsset[] = [
  {
    id: '1',
    name: 'wasfah-logo.png',
    url: '/api/placeholder/200/100',
    type: 'logo',
    category: 'branding',
    size: '25 KB',
    uploadedAt: '2024-01-15',
    usedIn: ['Navigation', 'Footer', 'Login Page']
  },
  {
    id: '2',
    name: 'tomato-fresh.jpg',
    url: '/api/placeholder/150/150',
    type: 'ingredient',
    category: 'vegetables',
    size: '87 KB',
    uploadedAt: '2024-01-14',
    usedIn: ['Recipe Cards', 'Ingredient List']
  },
  {
    id: '3',
    name: 'pasta-carbonara.jpg',
    url: '/api/placeholder/300/200',
    type: 'recipe',
    category: 'italian',
    size: '156 KB',
    uploadedAt: '2024-01-13',
    usedIn: ['Recipe Detail', 'Featured Recipes']
  },
  {
    id: '4',
    name: 'chef-icon.svg',
    url: '/api/placeholder/64/64',
    type: 'icon',
    category: 'ui',
    size: '12 KB',
    uploadedAt: '2024-01-12',
    usedIn: ['Navigation', 'Profile Page']
  },
  {
    id: '5',
    name: 'kitchen-bg.jpg',
    url: '/api/placeholder/1920/1080',
    type: 'background',
    category: 'layouts',
    size: '245 KB',
    uploadedAt: '2024-01-11',
    usedIn: ['Home Page', 'Landing Page']
  }
];

const AdminImageControlPage = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<ImageAsset[]>(mockImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    type: 'recipe' as ImageAsset['type'],
    category: '',
    file: null as File | null
  });

  const filteredImages = useMemo(() => {
    return images.filter(image => {
      const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          image.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || image.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [images, searchQuery, selectedType]);

  const imageStats = useMemo(() => {
    return {
      total: images.length,
      recipes: images.filter(img => img.type === 'recipe').length,
      ingredients: images.filter(img => img.type === 'ingredient').length,
      icons: images.filter(img => img.type === 'icon').length,
      logos: images.filter(img => img.type === 'logo').length,
      backgrounds: images.filter(img => img.type === 'background').length,
      avatars: images.filter(img => img.type === 'avatar').length,
    };
  }, [images]);

  const handleUpload = () => {
    if (!uploadForm.name || !uploadForm.file) {
      toast({
        title: "Error",
        description: "Please provide a name and select a file.",
        variant: "destructive",
      });
      return;
    }

    const newImage: ImageAsset = {
      id: Date.now().toString(),
      name: uploadForm.name,
      url: URL.createObjectURL(uploadForm.file),
      type: uploadForm.type,
      category: uploadForm.category,
      size: `${Math.round(uploadForm.file.size / 1024)} KB`,
      uploadedAt: new Date().toISOString().split('T')[0],
      usedIn: []
    };

    setImages(prev => [newImage, ...prev]);
    setUploadForm({ name: '', type: 'recipe', category: '', file: null });
    setIsUploadDialogOpen(false);

    toast({
      title: "Image Uploaded",
      description: `${newImage.name} has been uploaded successfully.`,
    });
  };

  const handleImageAction = (action: string, image: ImageAsset) => {
    switch (action) {
      case 'view':
        window.open(image.url, '_blank');
        break;
      case 'edit':
        toast({
          title: "Edit Image",
          description: `Editing ${image.name} (Feature coming soon)`,
        });
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete "${image.name}"?`)) {
          setImages(prev => prev.filter(img => img.id !== image.id));
          toast({
            title: "Image Deleted",
            description: `${image.name} has been deleted.`,
            variant: "destructive",
          });
        }
        break;
    }
  };

  const getTypeBadge = (type: ImageAsset['type']) => {
    const colors = {
      recipe: 'bg-green-100 text-green-800',
      ingredient: 'bg-blue-100 text-blue-800',
      icon: 'bg-purple-100 text-purple-800',
      logo: 'bg-yellow-100 text-yellow-800',
      background: 'bg-gray-100 text-gray-800',
      avatar: 'bg-pink-100 text-pink-800',
    };
    return <Badge className={colors[type]}>{type}</Badge>;
  };

  return (
    <AdminPageWrapper title="Image Control Center">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{imageStats.total}</div>
            <div className="text-sm text-gray-600">Total Images</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{imageStats.recipes}</div>
            <div className="text-sm text-gray-600">Recipes</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{imageStats.ingredients}</div>
            <div className="text-sm text-gray-600">Ingredients</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{imageStats.icons}</div>
            <div className="text-sm text-gray-600">Icons</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">{imageStats.logos}</div>
            <div className="text-sm text-gray-600">Logos</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-600">{imageStats.backgrounds}</div>
            <div className="text-sm text-gray-600">Backgrounds</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-pink-600">{imageStats.avatars}</div>
            <div className="text-sm text-gray-600">Avatars</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="recipe">Recipes</SelectItem>
                <SelectItem value="ingredient">Ingredients</SelectItem>
                <SelectItem value="icon">Icons</SelectItem>
                <SelectItem value="logo">Logos</SelectItem>
                <SelectItem value="background">Backgrounds</SelectItem>
                <SelectItem value="avatar">Avatars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload New Image</DialogTitle>
                  <DialogDescription>
                    Add a new image asset to your collection.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Image Name</Label>
                    <Input
                      id="name"
                      value={uploadForm.name}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter image name..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select 
                      value={uploadForm.type} 
                      onValueChange={(value) => setUploadForm(prev => ({ ...prev, type: value as ImageAsset['type'] }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recipe">Recipe</SelectItem>
                        <SelectItem value="ingredient">Ingredient</SelectItem>
                        <SelectItem value="icon">Icon</SelectItem>
                        <SelectItem value="logo">Logo</SelectItem>
                        <SelectItem value="background">Background</SelectItem>
                        <SelectItem value="avatar">Avatar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g., italian, vegetables, ui..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="file">Image File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpload}>Upload Image</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Images Table */}
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Used In</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{image.name}</TableCell>
                  <TableCell>{getTypeBadge(image.type)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{image.category}</Badge>
                  </TableCell>
                  <TableCell>{image.size}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {image.usedIn.slice(0, 2).map((usage, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {usage}
                        </Badge>
                      ))}
                      {image.usedIn.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{image.usedIn.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{image.uploadedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleImageAction('view', image)}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleImageAction('edit', image)}>
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleImageAction('delete', image)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{filteredImages.length}</strong> of <strong>{images.length}</strong> images
          </p>
        </div>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminImageControlPage;
