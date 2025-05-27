
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, BarChart3, Award, Plus, Edit2, Trash2, Eye, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RewardTier {
  id: string;
  name: string;
  pointsRequired: number;
  benefits: string[];
  color: string;
}

interface RewardActivity {
  id: string;
  userId: string;
  userName: string;
  activityType: string;
  pointsEarned: number;
  date: string;
}

const mockRewardTiers: RewardTier[] = [
  {
    id: '1',
    name: 'Bronze',
    pointsRequired: 0,
    benefits: ['Recipe bookmarks', 'Basic meal planning'],
    color: '#CD7F32',
  },
  {
    id: '2',
    name: 'Silver',
    pointsRequired: 1000,
    benefits: ['Recipe sharing', 'Advanced meal planning', '5% discount on premium'],
    color: '#C0C0C0',
  },
  {
    id: '3',
    name: 'Gold',
    pointsRequired: 5000,
    benefits: ['Chef avatar customization', 'Ad-free experience', '15% discount on premium'],
    color: '#FFD700',
  },
  {
    id: '4',
    name: 'Platinum',
    pointsRequired: 10000,
    benefits: ['Early access to features', 'Priority support', '25% discount on premium'],
    color: '#E5E4E2',
  },
];

const mockRewardActivities: RewardActivity[] = [
  {
    id: '1',
    userId: 'user123',
    userName: 'John Smith',
    activityType: 'Recipe Created',
    pointsEarned: 50,
    date: '2025-05-15',
  },
  {
    id: '2',
    userId: 'user456',
    userName: 'Emma Johnson',
    activityType: 'Recipe Shared',
    pointsEarned: 30,
    date: '2025-05-14',
  },
  {
    id: '3',
    userId: 'user789',
    userName: 'Michael Brown',
    activityType: 'Meal Plan Created',
    pointsEarned: 100,
    date: '2025-05-13',
  },
];

const AdminRewardsManager: React.FC = () => {
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>(mockRewardTiers);
  const [rewardActivities, setRewardActivities] = useState<RewardActivity[]>(mockRewardActivities);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleDeleteTier = (id: string) => {
    setRewardTiers(rewardTiers.filter(tier => tier.id !== id));
    toast({
      title: 'Reward Tier Deleted',
      description: 'The reward tier has been successfully removed.',
    });
  };
  
  const topEarners = [
    { name: 'Emma Johnson', points: 8750 },
    { name: 'John Smith', points: 7540 },
    { name: 'Michael Brown', points: 6320 },
    { name: 'Sarah Wilson', points: 5430 },
    { name: 'David Lee', points: 4870 },
  ];
  
  const activityDistribution = [
    { type: 'Recipe Created', percentage: 35 },
    { type: 'Recipe Shared', percentage: 25 },
    { type: 'Meal Plan Created', percentage: 15 },
    { type: 'Comments Posted', percentage: 10 },
    { type: 'Recipe Cooked', percentage: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Award className="mr-2 h-6 w-6" /> Rewards & Loyalty Program
          </h1>
          <p className="text-muted-foreground">Manage reward tiers, points, and customer loyalty</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Tier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users in Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,351</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 font-medium">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Points Per User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 font-medium">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Points Awarded Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,872</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 font-medium">+15.6%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Premium Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 font-medium">+8.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tiers">
        <TabsList className="mb-4">
          <TabsTrigger value="tiers">Reward Tiers</TabsTrigger>
          <TabsTrigger value="activities">Point Activities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tiers">
          <Card>
            <CardHeader>
              <CardTitle>Manage Reward Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tier</TableHead>
                      <TableHead>Points Required</TableHead>
                      <TableHead>Benefits</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewardTiers.map((tier) => (
                      <TableRow key={tier.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: tier.color }}
                            ></div>
                            <span className="font-medium">{tier.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{tier.pointsRequired.toLocaleString()}</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-4 text-sm">
                            {tier.benefits.map((benefit, idx) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: tier.color }}
                            ></div>
                            <span className="text-sm">{tier.color}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteTier(tier.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activities">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Point Activities</CardTitle>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search activities..."
                  className="w-60"
                />
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewardActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.userName}</TableCell>
                        <TableCell>{activity.activityType}</TableCell>
                        <TableCell>+{activity.pointsEarned}</TableCell>
                        <TableCell>{activity.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" /> Top Earners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEarners.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                        <span>{user.name}</span>
                      </div>
                      <span className="font-medium">{user.points.toLocaleString()} points</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" /> Activity Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityDistribution.map((activity, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{activity.type}</span>
                        <span className="text-sm font-medium">{activity.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-wasfah-bright-teal h-2 rounded-full"
                          style={{ width: `${activity.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRewardsManager;
