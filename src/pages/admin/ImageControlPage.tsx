
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Image, 
  Upload, 
  Edit,
  Trash2,
  Eye,
  Download,
  Plus,
  Search,
  Filter,
  Palette,
  Grid,
  Settings
} from 'lucide-react';

interface AppImage {
  id: string;
  name: string;
  category: string;
  type: 'icon' | 'image' | 'background' | 'logo' | 'ui-element';
  url: string;
  size: string;
  format: string;
  usage: string[];
  last_updated: string;
  isSystemImage: boolean;
}

export default function ImageControlPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const [images] = useState<AppImage[]>([
    // App Icons
    {
      id: '1',
      name: 'wasfah-logo-main',
      category: 'Branding',
      type: 'logo',
      url: '/images/logo-main.png',
      size: '24KB',
      format: 'PNG',
      usage: ['Header', 'Footer', 'Splash Screen', 'App Icon'],
      last_updated: '2024-01-15T10:30:00Z',
      isSystemImage: true
    },
    {
      id: '2',
      name: 'chef-hat-icon',
      category: 'Navigation',
      type: 'icon',
      url: '/icons/chef-hat.svg',
      size: '3KB',
      format: 'SVG',
      usage: ['Navigation Menu', 'Recipe Creation', 'Profile Page'],
      last_updated: '2024-01-15T09:15:00Z',
      isSystemImage: true
    },
    {
      id: '3',
      name: 'recipe-card-placeholder',
      category: 'Recipes',
      type: 'image',
      url: '/images/recipe-placeholder.jpg',
      size: '156KB',
      format: 'JPG',
      usage: ['Recipe Cards', 'Recipe Details', 'Recipe Grid'],
      last_updated: '2024-01-14T14:20:00Z',
      isSystemImage: true
    },
    {
      id: '4',
      name: 'pantry-icon',
      category: 'Features',
      type: 'icon',
      url: '/icons/pantry.svg',
      size: '2KB',
      format: 'SVG',
      usage: ['Pantry Page', 'Navigation', 'Feature Cards'],
      last_updated: '2024-01-13T16:45:00Z',
      isSystemImage: true
    },
    {
      id: '5',
      name: 'app-background-gradient',
      category: 'UI',
      type: 'background',
      url: '/images/gradient-bg.png',
      size: '89KB',
      format: 'PNG',
      usage: ['Login Page', 'Onboarding', 'Welcome Screen'],
      last_updated: '2024-01-12T09:15:00Z',
      isSystemImage: true
    },
    {
      id: '6',
      name: 'meal-plan-icon',
      category: 'Features',
      type: 'icon',
      url: '/icons/meal-plan.svg',
      size: '2KB',
      format: 'SVG',
      usage: ['Meal Planning', 'Navigation', 'Quick Actions'],
      last_updated: '2024-01-11T11:30:00Z',
      isSystemImage: true
    },
    {
      id: '7',
      name: 'ai-chef-avatar',
      category: 'AI',
      type: 'image',
      url: '/images/ai-chef-avatar.png',
      size: '45KB',
      format: 'PNG',
      usage: ['AI Chat', 'Welcome Messages', 'Help Section'],
      last_updated: '2024-01-10T08:45:00Z',
      isSystemImage: true
    },
    {
      id: '8',
      name: 'settings-gear-icon',
      category: 'UI',
      type: 'icon',
      url: '/icons/settings.svg',
      size: '1KB',
      format: 'SVG',
      usage: ['Settings Page', 'Admin Panel', 'Configuration'],
      last_updated: '2024-01-09T15:20:00Z',
      isSystemImage: true
    },
    {
      id: '9',
      name: 'notification-bell-icon',
      category: 'UI',
      type: 'icon',
      url: '/icons/bell.svg',
      size: '1KB',
      format: 'SVG',
      usage: ['Notifications', 'Header', 'Settings'],
      last_updated: '2024-01-08T12:10:00Z',
      isSystemImage: true
    },
    {
      id: '10',
      name: 'wasfah-favicon',
      category: 'Branding',
      type: 'icon',
      url: '/favicon.ico',
      size: '4KB',
      format: 'ICO',
      usage: ['Browser Tab', 'Bookmarks', 'App Shortcuts'],
      last_updated: '2024-01-07T14:30:00Z',
      isSystemImage: true
    }
  ]);

  const getTypeBadge = (type: string) => {
    const colors = {
      'icon': 'bg-blue-100 text-blue-800',
      'image': 'bg-green-100 text-green-800',
      'background': 'bg-purple-100 text-purple-800',
      'logo': 'bg-orange-100 text-orange-800',
      'ui-element': 'bg-cyan-100 text-cyan-800'
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || image.type === filterType;
    const matchesCategory = filterCategory === 'all' || image.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'system' && image.isSystemImage) ||
                      (selectedTab === 'custom' && !image.isSystemImage);
    
    return matchesSearch && matchesType && matchesCategory && matchesTab;
  });

  const stats = {
    totalImages: images.length,
    icons: images.filter(img => img.type === 'icon').length,
    backgrounds: images.filter(img => img.type === 'background').length,
    logos: images.filter(img => img.type === 'logo').length,
    systemImages: images.filter(img => img.isSystemImage).length,
    customImages: images.filter(img => !img.isSystemImage).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">App Image & Icon Control</h1>
          <p className="text-gray-600">Manage all images and icons used throughout the WasfahAI application</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Image or Icon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Image Name</Label>
                  <Input id="name" placeholder="Enter image name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="navigation">Navigation</SelectItem>
                      <SelectItem value="features">Features</SelectItem>
                      <SelectItem value="recipes">Recipes</SelectItem>
                      <SelectItem value="ui">UI Elements</SelectItem>
                      <SelectItem value="ai">AI Components</SelectItem>
                      <SelectItem value="backgrounds">Backgrounds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="icon">Icon</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="background">Background</SelectItem>
                      <SelectItem value="logo">Logo</SelectItem>
                      <SelectItem value="ui-element">UI Element</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="usage">Usage Context</Label>
                  <Input id="usage" placeholder="Where will this be used?" />
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium">Drop your image here</p>
                <p className="text-sm text-gray-500">or click to browse</p>
                <p className="text-xs text-gray-400 mt-2">Supports: PNG, JPG, SVG, ICO (max 5MB)</p>
                <Button variant="outline" className="mt-4">Choose File</Button>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Upload & Save</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-xl font-bold">{stats.totalImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Icons</p>
                <p className="text-xl font-bold">{stats.icons}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Backgrounds</p>
                <p className="text-xl font-bold">{stats.backgrounds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Grid className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Logos</p>
                <p className="text-xl font-bold">{stats.logos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm font-medium">System</p>
                <p className="text-xl font-bold">{stats.systemImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-cyan-600" />
              <div>
                <p className="text-sm font-medium">Custom</p>
                <p className="text-xl font-bold">{stats.customImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>App Images & Icons Management</CardTitle>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search images and icons..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="icon">Icons</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="background">Backgrounds</SelectItem>
                <SelectItem value="logo">Logos</SelectItem>
                <SelectItem value="ui-element">UI Elements</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="branding">Branding</SelectItem>
                <SelectItem value="navigation">Navigation</SelectItem>
                <SelectItem value="features">Features</SelectItem>
                <SelectItem value="recipes">Recipes</SelectItem>
                <SelectItem value="ui">UI Elements</SelectItem>
                <SelectItem value="ai">AI Components</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Images ({stats.totalImages})</TabsTrigger>
              <TabsTrigger value="system">System Images ({stats.systemImages})</TabsTrigger>
              <TabsTrigger value="custom">Custom Images ({stats.customImages})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredImages.map((image) => (
                    <TableRow key={image.id}>
                      <TableCell>
                        <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{image.name}</p>
                          <p className="text-sm text-gray-500">{image.format}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{image.category}</Badge>
                      </TableCell>
                      <TableCell>{getTypeBadge(image.type)}</TableCell>
                      <TableCell>{image.size}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {image.usage.slice(0, 2).map((use, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {use}
                            </Badge>
                          ))}
                          {image.usage.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{image.usage.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(image.last_updated).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!image.isSystemImage && (
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
