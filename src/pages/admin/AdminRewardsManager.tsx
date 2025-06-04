
import React, { useState } from 'react';
import { Gift, Plus, Edit, Trash2, Users, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const mockRewards = [
  {
    id: 'RWD-001',
    name: 'Recipe Master',
    description: 'Complete 10 recipes',
    type: 'achievement',
    points: 100,
    icon: '🏆',
    active: true,
    claimed: 45
  },
  {
    id: 'RWD-002',
    name: 'Daily Cook',
    description: 'Cook for 7 consecutive days',
    type: 'challenge',
    points: 150,
    icon: '🔥',
    active: true,
    claimed: 23
  },
  {
    id: 'RWD-003',
    name: 'Healthy Choice',
    description: 'Try 5 healthy recipes',
    type: 'achievement',
    points: 75,
    icon: '🥗',
    active: false,
    claimed: 67
  }
];

const AdminRewardsManager = () => {
  const [rewards, setRewards] = useState(mockRewards);
  const [newReward, setNewReward] = useState({
    name: '',
    description: '',
    type: 'achievement',
    points: 0,
    icon: ''
  });

  const getTypeBadge = (type: string) => {
    const variants = {
      achievement: 'bg-blue-100 text-blue-800',
      challenge: 'bg-purple-100 text-purple-800',
      milestone: 'bg-green-100 text-green-800'
    };
    return <Badge className={variants[type as keyof typeof variants]}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Rewards Management</h2>
          <p className="text-muted-foreground">Create and manage user rewards and achievements.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Reward
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Reward</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Reward name"
                value={newReward.name}
                onChange={(e) => setNewReward(prev => ({ ...prev, name: e.target.value }))}
              />
              <Textarea
                placeholder="Reward description"
                value={newReward.description}
                onChange={(e) => setNewReward(prev => ({ ...prev, description: e.target.value }))}
              />
              <Input
                placeholder="Icon (emoji)"
                value={newReward.icon}
                onChange={(e) => setNewReward(prev => ({ ...prev, icon: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Points"
                value={newReward.points}
                onChange={(e) => setNewReward(prev => ({ ...prev, points: parseInt(e.target.value) }))}
              />
              <Button className="w-full">Create Reward</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rewards.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{rewards.filter(r => r.active).length}</span> active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rewards.reduce((sum, r) => sum + r.claimed, 0)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Points</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(rewards.reduce((sum, r) => sum + r.points, 0) / rewards.length)}
            </div>
            <p className="text-xs text-muted-foreground">Per reward</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reward</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Claims</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{reward.icon}</span>
                      <div>
                        <div className="font-medium">{reward.name}</div>
                        <div className="text-sm text-muted-foreground">{reward.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(reward.type)}</TableCell>
                  <TableCell>{reward.points}</TableCell>
                  <TableCell>{reward.claimed}</TableCell>
                  <TableCell>
                    <Badge variant={reward.active ? "default" : "secondary"}>
                      {reward.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
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
};

export default AdminRewardsManager;
