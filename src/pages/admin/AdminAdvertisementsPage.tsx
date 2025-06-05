
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
import { Textarea } from '@/components/ui/textarea';
import { 
  Megaphone, 
  Plus, 
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  type: 'banner' | 'popup' | 'native' | 'video';
  status: 'active' | 'paused' | 'completed' | 'draft';
  placement: 'home' | 'recipe_detail' | 'search_results' | 'profile';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  start_date: string;
  end_date: string;
  target_audience: string;
  created_at: string;
}

export default function AdminAdvertisementsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: '1',
      title: 'Premium Recipe Collection',
      description: 'Promote premium recipe collections to free users',
      type: 'banner',
      status: 'active',
      placement: 'home',
      budget: 1000,
      spent: 654,
      impressions: 25600,
      clicks: 512,
      ctr: 2.0,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      target_audience: 'Free Users',
      created_at: '2024-01-01'
    },
    {
      id: '2',
      title: 'Kitchen Equipment Sale',
      description: 'Partner promotion for kitchen equipment',
      type: 'native',
      status: 'active',
      placement: 'recipe_detail',
      budget: 500,
      spent: 320,
      impressions: 15400,
      clicks: 231,
      ctr: 1.5,
      start_date: '2024-03-01',
      end_date: '2024-06-30',
      target_audience: 'Premium Users',
      created_at: '2024-02-28'
    },
    {
      id: '3',
      title: 'Healthy Cooking Course',
      description: 'Online cooking course advertisement',
      type: 'popup',
      status: 'paused',
      placement: 'search_results',
      budget: 750,
      spent: 425,
      impressions: 12800,
      clicks: 128,
      ctr: 1.0,
      start_date: '2024-02-15',
      end_date: '2024-05-15',
      target_audience: 'Health Conscious',
      created_at: '2024-02-10'
    }
  ]);

  const getTypeBadge = (type: string) => {
    const colors = {
      'banner': 'bg-blue-100 text-blue-800',
      'popup': 'bg-orange-100 text-orange-800',
      'native': 'bg-green-100 text-green-800',
      'video': 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'paused': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-blue-100 text-blue-800',
      'draft': 'bg-gray-100 text-gray-800'
    };
    return <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  const stats = {
    totalAds: advertisements.length,
    activeAds: advertisements.filter(ad => ad.status === 'active').length,
    totalBudget: advertisements.reduce((sum, ad) => sum + ad.budget, 0),
    totalSpent: advertisements.reduce((sum, ad) => sum + ad.spent, 0),
    avgCTR: advertisements.reduce((sum, ad) => sum + ad.ctr, 0) / advertisements.length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Advertisement Management</h1>
          <p className="text-gray-600">Manage promotional content and advertising campaigns</p>
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
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Advertisement title" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="popup">Popup</SelectItem>
                      <SelectItem value="native">Native</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Advertisement description" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="placement">Placement</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select placement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Page</SelectItem>
                      <SelectItem value="recipe_detail">Recipe Detail</SelectItem>
                      <SelectItem value="search_results">Search Results</SelectItem>
                      <SelectItem value="profile">Profile Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input id="budget" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input id="audience" placeholder="Target audience" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input id="start_date" type="date" />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input id="end_date" type="date" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Create Advertisement</Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Ads</p>
                <p className="text-2xl font-bold">{stats.totalAds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">{stats.activeAds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Total Budget</p>
                <p className="text-2xl font-bold">${stats.totalBudget}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Spent</p>
                <p className="text-2xl font-bold">${stats.totalSpent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium">Avg CTR</p>
                <p className="text-2xl font-bold">{stats.avgCTR.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Advertisements</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Ads</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Advertisement</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Placement</TableHead>
                    <TableHead>Budget/Spent</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {advertisements.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ad.title}</p>
                          <p className="text-sm text-gray-500">{ad.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(ad.type)}</TableCell>
                      <TableCell>{getStatusBadge(ad.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ad.placement}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>${ad.budget} / ${ad.spent}</div>
                          <div className="text-gray-500">
                            {Math.round((ad.spent / ad.budget) * 100)}% used
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{ad.impressions.toLocaleString()} imp</div>
                          <div>{ad.clicks} clicks ({ad.ctr}% CTR)</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{ad.start_date}</div>
                          <div className="text-gray-500">to {ad.end_date}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
