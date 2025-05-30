
import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, EyeOff, Edit, Trash2, Calendar } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const mockAds = [
  {
    id: '1',
    title: 'Premium Subscription Offer',
    content: 'Get 50% off your first month of premium subscription! Unlock exclusive recipes and meal planning features.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    targetUrl: '/subscription',
    isActive: true,
    displayDuration: 5000,
    targetUsers: 'all',
    createdAt: '2023-09-20',
    scheduledStart: null,
    scheduledEnd: null,
    impressions: 1250,
    clicks: 85
  },
  {
    id: '2',
    title: 'New Recipe Collection',
    content: 'Discover our latest Mediterranean recipe collection featuring 30 delicious and healthy recipes!',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    targetUrl: '/recipes',
    isActive: false,
    displayDuration: 7000,
    targetUsers: 'premium',
    createdAt: '2023-09-19',
    scheduledStart: '2023-09-25',
    scheduledEnd: '2023-10-15',
    impressions: 0,
    clicks: 0
  },
  {
    id: '3',
    title: 'Kitchen Essentials Sale',
    content: 'Partner offer: Get 20% off premium kitchen tools and appliances. Limited time offer!',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    targetUrl: 'https://partner-store.com',
    isActive: true,
    displayDuration: 6000,
    targetUsers: 'free',
    createdAt: '2023-09-18',
    scheduledStart: null,
    scheduledEnd: '2023-09-30',
    impressions: 890,
    clicks: 45
  }
];

const AdminAdvertisementManager = () => {
  const [ads, setAds] = useState(mockAds);
  const [createDialog, setCreateDialog] = useState(false);
  const [newAd, setNewAd] = useState({
    title: '',
    content: '',
    imageUrl: '',
    targetUrl: '',
    isActive: true,
    displayDuration: 5000,
    targetUsers: 'all',
    scheduledStart: '',
    scheduledEnd: ''
  });

  const handleCreateAd = () => {
    const ad = {
      id: Date.now().toString(),
      ...newAd,
      createdAt: new Date().toISOString().split('T')[0],
      impressions: 0,
      clicks: 0
    };

    setAds(prev => [ad, ...prev]);
    
    setNewAd({
      title: '',
      content: '',
      imageUrl: '',
      targetUrl: '',
      isActive: true,
      displayDuration: 5000,
      targetUsers: 'all',
      scheduledStart: '',
      scheduledEnd: ''
    });

    setCreateDialog(false);
    toast.success('Advertisement created successfully!');
  };

  const handleToggleAd = (adId: string) => {
    setAds(prev => 
      prev.map(ad => 
        ad.id === adId 
          ? { ...ad, isActive: !ad.isActive }
          : ad
      )
    );
    toast.success('Advertisement status updated!');
  };

  const handleDeleteAd = (adId: string) => {
    setAds(prev => prev.filter(ad => ad.id !== adId));
    toast.success('Advertisement deleted successfully!');
  };

  const getStatusBadge = (isActive: boolean, scheduledStart: string | null) => {
    if (!isActive) {
      return <Badge variant="outline" className="bg-red-50 text-red-700">Inactive</Badge>;
    }
    if (scheduledStart && new Date(scheduledStart) > new Date()) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">Scheduled</Badge>;
    }
    return <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>;
  };

  const getTargetBadge = (target: string) => {
    const badges = {
      all: <Badge variant="outline">All Users</Badge>,
      premium: <Badge variant="outline" className="bg-purple-50 text-purple-700">Premium</Badge>,
      free: <Badge variant="outline" className="bg-blue-50 text-blue-700">Free Users</Badge>
    };
    return badges[target as keyof typeof badges] || <Badge variant="outline">{target}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Advertisement Manager</h1>
          <p className="text-muted-foreground">Create and manage popup advertisements and promotional content.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={createDialog} onOpenChange={setCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Advertisement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Advertisement</DialogTitle>
                <DialogDescription>
                  Create a popup advertisement for your users.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newAd.title}
                    onChange={(e) => setNewAd(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Advertisement title..."
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newAd.content}
                    onChange={(e) => setNewAd(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Advertisement content..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={newAd.imageUrl}
                    onChange={(e) => setNewAd(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="targetUrl">Target URL</Label>
                  <Input
                    id="targetUrl"
                    value={newAd.targetUrl}
                    onChange={(e) => setNewAd(prev => ({ ...prev, targetUrl: e.target.value }))}
                    placeholder="/subscription or https://external-site.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetUsers">Target Users</Label>
                    <Select 
                      value={newAd.targetUsers} 
                      onValueChange={(value) => setNewAd(prev => ({ ...prev, targetUsers: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="premium">Premium Users</SelectItem>
                        <SelectItem value="free">Free Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="displayDuration">Display Duration (ms)</Label>
                    <Input
                      id="displayDuration"
                      type="number"
                      value={newAd.displayDuration}
                      onChange={(e) => setNewAd(prev => ({ ...prev, displayDuration: parseInt(e.target.value) }))}
                      placeholder="5000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduledStart">Start Date (Optional)</Label>
                    <Input
                      id="scheduledStart"
                      type="date"
                      value={newAd.scheduledStart}
                      onChange={(e) => setNewAd(prev => ({ ...prev, scheduledStart: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduledEnd">End Date (Optional)</Label>
                    <Input
                      id="scheduledEnd"
                      type="date"
                      value={newAd.scheduledEnd}
                      onChange={(e) => setNewAd(prev => ({ ...prev, scheduledEnd: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={newAd.isActive}
                    onCheckedChange={(checked) => setNewAd(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAd}>
                  Create Advertisement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{ads.filter(ad => ad.isActive).length}</div>
          <div className="text-sm text-gray-600">Active Ads</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{ads.filter(ad => ad.scheduledStart && new Date(ad.scheduledStart) > new Date()).length}</div>
          <div className="text-sm text-gray-600">Scheduled</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">{ads.reduce((sum, ad) => sum + ad.impressions, 0)}</div>
          <div className="text-sm text-gray-600">Total Impressions</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">{ads.reduce((sum, ad) => sum + ad.clicks, 0)}</div>
          <div className="text-sm text-gray-600">Total Clicks</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search advertisements..."
            className="pl-8 w-full md:w-80"
          />
        </div>
        <div className="flex items-center gap-2 self-end">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Advertisement</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Impressions</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {ad.imageUrl && (
                      <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{ad.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {ad.content}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getTargetBadge(ad.targetUsers)}</TableCell>
                <TableCell>{getStatusBadge(ad.isActive, ad.scheduledStart)}</TableCell>
                <TableCell>{ad.impressions.toLocaleString()}</TableCell>
                <TableCell>{ad.clicks.toLocaleString()}</TableCell>
                <TableCell>
                  {ad.impressions > 0 ? `${((ad.clicks / ad.impressions) * 100).toFixed(1)}%` : '0%'}
                </TableCell>
                <TableCell>{ad.createdAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleAd(ad.id)}
                      className={ad.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                    >
                      {ad.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAd(ad.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{ads.length}</strong> advertisements
        </p>
      </div>
    </div>
  );
};

export default AdminAdvertisementManager;
