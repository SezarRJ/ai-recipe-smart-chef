import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, Edit, Trash2, Eye, EyeOff, 
  Image, Video, FileText, ExternalLink,
  Calendar, DollarSign, Target, BarChart3
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  type: 'banner' | 'video' | 'native' | 'popup';
  placement: 'header' | 'sidebar' | 'footer' | 'content' | 'modal';
  imageUrl?: string;
  videoUrl?: string;
  targetUrl: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  budget: number;
  clicks: number;
  impressions: number;
  ctr: number;
  targetAudience: string[];
  createdAt: string;
}

const mockAds: Advertisement[] = [
  {
    id: '1',
    title: 'Premium Kitchen Tools',
    description: 'Discover professional-grade kitchen equipment',
    type: 'banner',
    placement: 'header',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300',
    targetUrl: 'https://example.com/kitchen-tools',
    isActive: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 5000,
    clicks: 1250,
    impressions: 45000,
    ctr: 2.78,
    targetAudience: ['cooking-enthusiasts', 'premium-users'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Healthy Recipe Book',
    description: 'Download our latest healthy recipe collection',
    type: 'native',
    placement: 'content',
    imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=300',
    targetUrl: 'https://example.com/recipe-book',
    isActive: false,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    budget: 3000,
    clicks: 890,
    impressions: 32000,
    ctr: 2.78,
    targetAudience: ['health-conscious', 'beginners'],
    createdAt: '2024-05-15T00:00:00Z'
  }
];

export default function AdminAdvertisementManager() {
  const { toast } = useToast();
  const [ads, setAds] = useState<Advertisement[]>(mockAds);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    type: 'banner' as const,
    placement: 'header' as const,
    imageUrl: '',
    targetUrl: '',
    startDate: '',
    endDate: '',
    budget: 0,
    targetAudience: ''
  });

  const handleToggleActive = (id: string) => {
    setAds(prev => 
      prev.map(ad => 
        ad.id === id 
          ? { ...ad, isActive: !ad.isActive }
          : ad
      )
    );

    const ad = ads.find(a => a.id === id);
    toast({
      title: ad?.isActive ? "Advertisement Deactivated" : "Advertisement Activated",
      description: `${ad?.title} has been ${ad?.isActive ? 'deactivated' : 'activated'}.`,
    });
  };

  const handleCreateAd = () => {
    if (!newAd.title || !newAd.targetUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const ad: Advertisement = {
      id: Date.now().toString(),
      title: newAd.title,
      description: newAd.description,
      type: newAd.type,
      placement: newAd.placement,
      imageUrl: newAd.imageUrl,
      targetUrl: newAd.targetUrl,
      isActive: false,
      startDate: newAd.startDate,
      endDate: newAd.endDate,
      budget: newAd.budget,
      clicks: 0,
      impressions: 0,
      ctr: 0,
      targetAudience: newAd.targetAudience.split(',').map(t => t.trim()),
      createdAt: new Date().toISOString()
    };

    setAds(prev => [...prev, ad]);
    setIsCreateDialogOpen(false);
    setNewAd({
      title: '',
      description: '',
      type: 'banner',
      placement: 'header',
      imageUrl: '',
      targetUrl: '',
      startDate: '',
      endDate: '',
      budget: 0,
      targetAudience: ''
    });

    toast({
      title: "Advertisement Created",
      description: `${newAd.title} has been created successfully.`,
    });
  };

  const handleDeleteAd = (id: string) => {
    const ad = ads.find(a => a.id === id);
    setAds(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Advertisement Deleted",
      description: `${ad?.title} has been deleted.`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'banner': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'native': return <FileText className="h-4 w-4" />;
      case 'popup': return <ExternalLink className="h-4 w-4" />;
      default: return <Image className="h-4 w-4" />;
    }
  };

  const getPlacementBadge = (placement: string) => {
    const colors = {
      header: 'bg-blue-100 text-blue-800',
      sidebar: 'bg-green-100 text-green-800',
      footer: 'bg-purple-100 text-purple-800',
      content: 'bg-orange-100 text-orange-800',
      modal: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[placement] || 'bg-gray-100 text-gray-800'}>{placement}</Badge>;
  };

  return (
    <AdminLayout title="Advertisement Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Advertisement Management</h1>
            <p className="text-muted-foreground">Manage and monitor your advertising campaigns</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Advertisement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Advertisement</DialogTitle>
                <DialogDescription>
                  Configure a new advertisement campaign for your application.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newAd.title}
                      onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                      placeholder="Advertisement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      value={newAd.type}
                      onChange={(e) => setNewAd({...newAd, type: e.target.value as any})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="banner">Banner</option>
                      <option value="video">Video</option>
                      <option value="native">Native</option>
                      <option value="popup">Popup</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newAd.description}
                    onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                    placeholder="Brief description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="placement">Placement</Label>
                    <select
                      id="placement"
                      value={newAd.placement}
                      onChange={(e) => setNewAd({...newAd, placement: e.target.value as any})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="header">Header</option>
                      <option value="sidebar">Sidebar</option>
                      <option value="footer">Footer</option>
                      <option value="content">Content</option>
                      <option value="modal">Modal</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newAd.budget}
                      onChange={(e) => setNewAd({...newAd, budget: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={newAd.imageUrl}
                    onChange={(e) => setNewAd({...newAd, imageUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="targetUrl">Target URL *</Label>
                  <Input
                    id="targetUrl"
                    value={newAd.targetUrl}
                    onChange={(e) => setNewAd({...newAd, targetUrl: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newAd.startDate}
                      onChange={(e) => setNewAd({...newAd, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newAd.endDate}
                      onChange={(e) => setNewAd({...newAd, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="targetAudience">Target Audience (comma-separated)</Label>
                  <Input
                    id="targetAudience"
                    value={newAd.targetAudience}
                    onChange={(e) => setNewAd({...newAd, targetAudience: e.target.value})}
                    placeholder="cooking-enthusiasts, premium-users"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAd}>
                  Create Advertisement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Analytics Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ads.reduce((sum, ad) => sum + ad.impressions, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ads.reduce((sum, ad) => sum + ad.clicks, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(ads.reduce((sum, ad) => sum + ad.ctr, 0) / ads.length).toFixed(2)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${ads.reduce((sum, ad) => sum + ad.budget, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Ads</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {ads.map((ad) => (
                <Card key={ad.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {ad.imageUrl && (
                          <img src={ad.imageUrl} alt={ad.title} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {getTypeIcon(ad.type)}
                            {ad.title}
                          </CardTitle>
                          <CardDescription>{ad.description}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            {getPlacementBadge(ad.placement)}
                            <Badge variant={ad.isActive ? "default" : "secondary"}>
                              {ad.isActive ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                              {ad.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={ad.isActive}
                          onCheckedChange={() => handleToggleActive(ad.id)}
                        />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteAd(ad.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Impressions</p>
                        <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-medium">{ad.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-medium">{ad.ctr}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">${ad.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{ad.startDate} - {ad.endDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4">
              {ads.filter(ad => ad.isActive).map((ad) => (
                <Card key={ad.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {ad.imageUrl && (
                          <img src={ad.imageUrl} alt={ad.title} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {getTypeIcon(ad.type)}
                            {ad.title}
                          </CardTitle>
                          <CardDescription>{ad.description}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            {getPlacementBadge(ad.placement)}
                            <Badge variant={ad.isActive ? "default" : "secondary"}>
                              {ad.isActive ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                              {ad.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={ad.isActive}
                          onCheckedChange={() => handleToggleActive(ad.id)}
                        />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteAd(ad.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Impressions</p>
                        <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-medium">{ad.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-medium">{ad.ctr}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">${ad.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{ad.startDate} - {ad.endDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inactive" className="space-y-4">
            <div className="grid gap-4">
              {ads.filter(ad => !ad.isActive).map((ad) => (
                <Card key={ad.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {ad.imageUrl && (
                          <img src={ad.imageUrl} alt={ad.title} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {getTypeIcon(ad.type)}
                            {ad.title}
                          </CardTitle>
                          <CardDescription>{ad.description}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            {getPlacementBadge(ad.placement)}
                            <Badge variant={ad.isActive ? "default" : "secondary"}>
                              {ad.isActive ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                              {ad.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={ad.isActive}
                          onCheckedChange={() => handleToggleActive(ad.id)}
                        />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteAd(ad.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Impressions</p>
                        <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-medium">{ad.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-medium">{ad.ctr}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">${ad.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{ad.startDate} - {ad.endDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Detailed performance metrics for all advertisements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ads.map((ad) => (
                    <div key={ad.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{ad.title}</h4>
                        <p className="text-sm text-muted-foreground">{ad.type} • {ad.placement}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Impressions</p>
                          <p className="font-bold">{ad.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Clicks</p>
                          <p className="font-bold">{ad.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">CTR</p>
                          <p className="font-bold">{ad.ctr}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
