
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Gift, Star, Trophy } from 'lucide-react';
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

const mockRewards = [
  {
    id: 'RWD-001',
    title: 'Recipe Master',
    description: 'Create 10 recipes',
    type: 'achievement',
    points: 100,
    status: 'active',
    earned: 45,
    requirements: 'Create 10 approved recipes'
  },
  {
    id: 'RWD-002',
    title: 'Community Helper',
    description: 'Help other users with comments',
    type: 'badge',
    points: 50,
    status: 'active',
    earned: 23,
    requirements: 'Get 25 helpful comment votes'
  },
  {
    id: 'RWD-003',
    title: 'Early Bird Discount',
    description: '20% off premium subscription',
    type: 'discount',
    points: 0,
    status: 'expired',
    earned: 12,
    requirements: 'Sign up within first month'
  }
];

const AdminRewardsPage = () => {
  const [rewards] = useState(mockRewards);
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'badge': return <Star className="h-4 w-4 text-blue-500" />;
      case 'discount': return <Gift className="h-4 w-4 text-green-500" />;
      default: return <Gift className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      achievement: 'bg-yellow-100 text-yellow-800',
      badge: 'bg-blue-100 text-blue-800',
      discount: 'bg-green-100 text-green-800'
    };
    return <Badge className={variants[type as keyof typeof variants]}>{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      expired: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const filteredRewards = rewards.filter(reward =>
    reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Rewards Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Rewards Management</h1>
            <p className="text-muted-foreground">Manage achievements, badges, and reward programs.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Reward
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{rewards.filter(r => r.type === 'achievement').length}</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{rewards.filter(r => r.type === 'badge').length}</div>
                <div className="text-sm text-gray-600">Badges</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">{rewards.filter(r => r.type === 'discount').length}</div>
                <div className="text-sm text-gray-600">Discounts</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{rewards.reduce((sum, r) => sum + r.earned, 0)}</div>
            <div className="text-sm text-gray-600">Total Earned</div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rewards..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reward</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Earned</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(reward.type)}
                      <div>
                        <div className="font-medium">{reward.title}</div>
                        <div className="text-sm text-gray-500">{reward.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(reward.type)}</TableCell>
                  <TableCell>{reward.points > 0 ? `${reward.points} pts` : 'N/A'}</TableCell>
                  <TableCell>{getStatusBadge(reward.status)}</TableCell>
                  <TableCell>{reward.earned} users</TableCell>
                  <TableCell className="max-w-xs truncate">{reward.requirements}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminRewardsPage;
