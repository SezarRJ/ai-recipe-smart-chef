
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
  Award, 
  Plus, 
  Edit,
  Trash2,
  Star,
  Gift,
  Crown,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'points' | 'badge' | 'discount' | 'free_item';
  value: number;
  cost_points: number;
  availability: 'active' | 'inactive' | 'limited';
  category: string;
  image_url?: string;
  usage_count: number;
  max_usage?: number;
  expiry_date?: string;
  created_at: string;
}

export default function AdminRewardsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      title: '10% Discount',
      description: 'Get 10% off your next subscription',
      type: 'discount',
      value: 10,
      cost_points: 500,
      availability: 'active',
      category: 'Subscription',
      usage_count: 45,
      max_usage: 100,
      expiry_date: '2024-12-31',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      title: 'Recipe Master Badge',
      description: 'Earned for creating 10 recipes',
      type: 'badge',
      value: 1,
      cost_points: 0,
      availability: 'active',
      category: 'Achievement',
      usage_count: 23,
      created_at: '2024-01-10'
    },
    {
      id: '3',
      title: 'Premium Feature Access',
      description: '30 days of premium features',
      type: 'free_item',
      value: 30,
      cost_points: 1000,
      availability: 'active',
      category: 'Premium',
      usage_count: 12,
      max_usage: 50,
      created_at: '2024-01-20'
    }
  ]);

  const getTypeBadge = (type: string) => {
    const colors = {
      'points': 'bg-blue-100 text-blue-800',
      'badge': 'bg-purple-100 text-purple-800',
      'discount': 'bg-green-100 text-green-800',
      'free_item': 'bg-orange-100 text-orange-800'
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const getAvailabilityBadge = (availability: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-red-100 text-red-800',
      'limited': 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={colors[availability] || 'bg-gray-100 text-gray-800'}>{availability}</Badge>;
  };

  const stats = {
    totalRewards: rewards.length,
    activeRewards: rewards.filter(r => r.availability === 'active').length,
    totalClaimed: rewards.reduce((sum, r) => sum + r.usage_count, 0),
    averagePoints: Math.round(rewards.reduce((sum, r) => sum + r.cost_points, 0) / rewards.length)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rewards Management</h1>
          <p className="text-gray-600">Manage loyalty program rewards and achievements</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Reward
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Reward</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Reward Title</Label>
                  <Input id="title" placeholder="Enter reward title" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="points">Points</SelectItem>
                      <SelectItem value="badge">Badge</SelectItem>
                      <SelectItem value="discount">Discount</SelectItem>
                      <SelectItem value="free_item">Free Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the reward" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="cost">Point Cost</Label>
                  <Input id="cost" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="Category" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Create Reward</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Rewards</p>
                <p className="text-2xl font-bold">{stats.totalRewards}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">{stats.activeRewards}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Total Claimed</p>
                <p className="text-2xl font-bold">{stats.totalClaimed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Avg Points</p>
                <p className="text-2xl font-bold">{stats.averagePoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Rewards Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Rewards</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reward</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Point Cost</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reward.title}</p>
                          <p className="text-sm text-gray-500">{reward.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(reward.type)}</TableCell>
                      <TableCell>
                        {reward.type === 'discount' ? `${reward.value}%` : reward.value}
                      </TableCell>
                      <TableCell>{reward.cost_points} pts</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{reward.usage_count}</span>
                          {reward.max_usage && (
                            <span className="text-gray-500">/ {reward.max_usage}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getAvailabilityBadge(reward.availability)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
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
