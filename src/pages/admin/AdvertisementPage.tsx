
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Megaphone, 
  Eye, 
  Plus,
  Edit,
  BarChart,
  Target,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  type: 'banner' | 'popup' | 'sponsored';
  status: 'active' | 'paused' | 'scheduled';
  budget: number;
  impressions: number;
  clicks: number;
  start_date: string;
  end_date: string;
}

export default function AdvertisementPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [ads] = useState<Advertisement[]>([
    {
      id: '1',
      title: 'Premium Recipe Collection',
      description: 'Discover exclusive premium recipes',
      type: 'banner',
      status: 'active',
      budget: 500,
      impressions: 12500,
      clicks: 235,
      start_date: '2024-01-01',
      end_date: '2024-01-31'
    },
    {
      id: '2',
      title: 'Kitchen Equipment Sale',
      description: '30% off on all kitchen equipment',
      type: 'popup',
      status: 'active',
      budget: 300,
      impressions: 8400,
      clicks: 156,
      start_date: '2024-01-10',
      end_date: '2024-01-25'
    },
    {
      id: '3',
      title: 'New Year Special Offers',
      description: 'Special offers for the new year',
      type: 'sponsored',
      status: 'scheduled',
      budget: 750,
      impressions: 0,
      clicks: 0,
      start_date: '2024-02-01',
      end_date: '2024-02-14'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'paused': 'secondary',
      'scheduled': 'outline'
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'banner': 'bg-blue-100 text-blue-800',
      'popup': 'bg-green-100 text-green-800',
      'sponsored': 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[type]}>{type}</Badge>;
  };

  const stats = {
    totalAds: ads.length,
    activeAds: ads.filter(ad => ad.status === 'active').length,
    totalBudget: ads.reduce((sum, ad) => sum + ad.budget, 0),
    totalImpressions: ads.reduce((sum, ad) => sum + ad.impressions, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Advertisement Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Ad
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
                      <SelectItem value="sponsored">Sponsored Content</SelectItem>
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
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input id="budget" type="number" placeholder="0" />
                </div>
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
                <Button className="flex-1">Create & Launch</Button>
                <Button variant="outline" className="flex-1">Save as Draft</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Megaphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Ads</p>
                <p className="text-2xl font-bold">{stats.totalAds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Ads</p>
                <p className="text-2xl font-bold">{stats.activeAds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">${stats.totalBudget}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Eye className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalImpressions.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advertisements Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Advertisements</CardTitle>
          <div className="flex gap-4">
            <Input placeholder="Search advertisements..." className="max-w-md" />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Advertisement</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{ad.title}</p>
                      <p className="text-sm text-gray-500">{ad.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(ad.type)}</TableCell>
                  <TableCell>{getStatusBadge(ad.status)}</TableCell>
                  <TableCell>${ad.budget}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{ad.impressions.toLocaleString()} views</p>
                      <p>{ad.clicks} clicks</p>
                      <p className="text-green-600">
                        {ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : 0}% CTR
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(ad.start_date).toLocaleDateString()}</p>
                      <p className="text-gray-500">to {new Date(ad.end_date).toLocaleDateString()}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <BarChart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
