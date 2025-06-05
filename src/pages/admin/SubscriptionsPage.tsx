
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Plus, 
  Edit,
  Eye,
  Search,
  Users,
  DollarSign,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface Subscription {
  id: string;
  user_name: string;
  user_email: string;
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  amount: number;
  currency: string;
  start_date: string;
  end_date: string;
  payment_method: string;
}

export default function SubscriptionsPage() {
  const [subscriptions] = useState<Subscription[]>([
    {
      id: '1',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      plan: 'premium',
      status: 'active',
      amount: 9.99,
      currency: 'USD',
      start_date: '2024-01-01',
      end_date: '2024-02-01',
      payment_method: 'Credit Card'
    },
    {
      id: '2',
      user_name: 'Jane Smith',
      user_email: 'jane@example.com',
      plan: 'pro',
      status: 'active',
      amount: 19.99,
      currency: 'USD',
      start_date: '2024-01-15',
      end_date: '2024-02-15',
      payment_method: 'PayPal'
    },
    {
      id: '3',
      user_name: 'Mike Johnson',
      user_email: 'mike@example.com',
      plan: 'premium',
      status: 'cancelled',
      amount: 9.99,
      currency: 'USD',
      start_date: '2023-12-01',
      end_date: '2024-01-01',
      payment_method: 'Credit Card'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'cancelled': 'secondary',
      'expired': 'destructive',
      'trial': 'outline'
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  const getPlanBadge = (plan: string) => {
    const colors = {
      'free': 'bg-gray-100 text-gray-800',
      'premium': 'bg-blue-100 text-blue-800',
      'pro': 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[plan]}>{plan}</Badge>;
  };

  const stats = {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
    monthlyRevenue: subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.amount, 0),
    trialUsers: subscriptions.filter(s => s.status === 'trial').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Subscription
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
                <p className="text-2xl font-bold">{stats.totalSubscriptions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
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
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">${stats.monthlyRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Trial Users</p>
                <p className="text-2xl font-bold">{stats.trialUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search subscriptions..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{subscription.user_name}</p>
                      <p className="text-sm text-gray-500">{subscription.user_email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                  <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${subscription.amount} {subscription.currency}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      {subscription.payment_method}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(subscription.start_date).toLocaleDateString()}</p>
                      <p className="text-gray-500">to {new Date(subscription.end_date).toLocaleDateString()}</p>
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
