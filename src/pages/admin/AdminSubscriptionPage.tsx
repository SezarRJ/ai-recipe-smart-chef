import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Crown, Users, DollarSign, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const mockSubscriptions = [
  {
    id: 'SUB-001',
    name: 'Free Plan',
    description: 'Basic access to recipes and features',
    price: 0,
    duration: 'lifetime',
    features: ['Basic recipes', 'Simple search', 'Limited favorites'],
    userCount: 15420,
    isActive: true,
    color: 'bg-gray-100 text-gray-800'
  },
  {
    id: 'SUB-002',
    name: 'Premium Monthly',
    description: 'Full access with monthly billing',
    price: 9.99,
    duration: 'monthly',
    features: ['Unlimited recipes', 'Advanced search', 'Meal planning', 'AI features'],
    userCount: 2340,
    isActive: true,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'SUB-003',
    name: 'Premium Yearly',
    description: 'Full access with yearly billing (20% off)',
    price: 95.99,
    duration: 'yearly',
    features: ['Unlimited recipes', 'Advanced search', 'Meal planning', 'AI features', 'Priority support'],
    userCount: 1890,
    isActive: true,
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'SUB-004',
    name: 'Chef Pro',
    description: 'Professional features for culinary experts',
    price: 29.99,
    duration: 'monthly',
    features: ['All Premium features', 'Recipe monetization', 'Analytics dashboard', 'Custom branding'],
    userCount: 156,
    isActive: false,
    color: 'bg-orange-100 text-orange-800'
  }
];

const AdminSubscriptionPage = () => {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

  const handleCreateSubscription = () => {
    setSelectedSubscription(null);
    setDialogOpen(true);
  };

  const handleEditSubscription = (subscription: any) => {
    setSelectedSubscription(subscription);
    setDialogOpen(true);
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    toast({
      title: "Subscription Deleted",
      description: "Subscription plan has been deleted successfully.",
    });
  };

  const handleToggleStatus = (id: string) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
    ));
    toast({
      title: "Status Updated",
      description: "Subscription status has been updated.",
    });
  };

  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subscription.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsers = subscriptions.reduce((sum, sub) => sum + sub.userCount, 0);
  const totalRevenue = subscriptions.reduce((sum, sub) => {
    if (sub.duration === 'monthly') return sum + (sub.price * sub.userCount * 12);
    if (sub.duration === 'yearly') return sum + (sub.price * sub.userCount);
    return sum;
  }, 0);

  return (
    <AdminPageWrapper title="Subscription Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Subscription Management</h1>
            <p className="text-muted-foreground">Manage subscription plans, pricing, and user access levels.</p>
          </div>
          <Button onClick={handleCreateSubscription}>
            <Plus className="h-4 w-4 mr-2" />
            Add Subscription Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-purple-600">{subscriptions.length}</div>
                <div className="text-sm text-gray-600">Plans</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{totalUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Subscribers</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Annual Revenue</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">{subscriptions.filter(s => s.isActive).length}</div>
            <div className="text-sm text-gray-600">Active Plans</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subscription plans..."
              className="pl-8 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Details</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{subscription.name}</div>
                        <Badge className={subscription.color}>{subscription.name}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 max-w-xs">{subscription.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {subscription.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {subscription.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{subscription.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">
                      {subscription.price === 0 ? 'Free' : `$${subscription.price}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {subscription.duration}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{subscription.userCount.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={subscription.isActive}
                      onCheckedChange={() => handleToggleStatus(subscription.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditSubscription(subscription)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteSubscription(subscription.id)}
                        disabled={subscription.name === 'Free Plan'}
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

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedSubscription ? 'Edit Subscription Plan' : 'Add New Subscription Plan'}
              </DialogTitle>
              <DialogDescription>
                {selectedSubscription ? 'Update the subscription plan details.' : 'Create a new subscription plan with pricing and features.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Premium Monthly"
                    defaultValue={selectedSubscription?.name || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    defaultValue={selectedSubscription?.price || ''}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the plan"
                  defaultValue={selectedSubscription?.description || ''}
                />
              </div>
              <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea
                  id="features"
                  placeholder="e.g. Unlimited recipes, Advanced search, Meal planning"
                  defaultValue={selectedSubscription?.features.join(', ') || ''}
                />
              </div>
              <div>
                <Label htmlFor="duration">Billing Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g. monthly, yearly, lifetime"
                  defaultValue={selectedSubscription?.duration || ''}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                {selectedSubscription ? 'Update Plan' : 'Add Plan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSubscriptionPage;
