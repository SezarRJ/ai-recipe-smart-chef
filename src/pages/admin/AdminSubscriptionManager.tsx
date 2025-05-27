
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus, Edit2, Trash2, CreditCard, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface PlanFeature {
  id: string;
  name: string;
  description: string;
  isIncluded: { [key: string]: boolean };
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  isPopular: boolean;
}

const AdminSubscriptionManager = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<PlanFeature[]>([
    { 
      id: '1', 
      name: 'Unlimited Recipes',
      description: 'Access to all recipes without limits',
      isIncluded: { free: true, standard: true, premium: true }
    },
    { 
      id: '2', 
      name: 'Personal Chef Avatar',
      description: 'Personalized AI chef assistant',
      isIncluded: { free: false, standard: true, premium: true }
    },
    { 
      id: '3', 
      name: 'Meal Planning',
      description: 'Advanced meal planning features',
      isIncluded: { free: false, standard: true, premium: true }
    },
    { 
      id: '4', 
      name: 'Recipe Creation',
      description: 'Create and share your own recipes',
      isIncluded: { free: true, standard: true, premium: true }
    },
    { 
      id: '5', 
      name: 'Nutritional Analysis',
      description: 'Detailed nutritional information',
      isIncluded: { free: false, standard: false, premium: true }
    },
    { 
      id: '6', 
      name: 'Team Collaboration',
      description: 'Share and collaborate on recipes with team',
      isIncluded: { free: false, standard: false, premium: true }
    }
  ]);
  
  const [plans, setPlans] = useState<PricingPlan[]>([
    { id: '1', name: 'Free', price: 0, billingPeriod: 'monthly', isPopular: false },
    { id: '2', name: 'Standard', price: 9.99, billingPeriod: 'monthly', isPopular: true },
    { id: '3', name: 'Premium', price: 19.99, billingPeriod: 'monthly', isPopular: false },
    { id: '4', name: 'Standard Annual', price: 99.99, billingPeriod: 'yearly', isPopular: false },
    { id: '5', name: 'Premium Annual', price: 199.99, billingPeriod: 'yearly', isPopular: false }
  ]);

  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    isIncluded: { free: false, standard: false, premium: false }
  });
  
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddFeature = () => {
    if (newFeature.name.trim() === '') {
      toast({
        title: "Error",
        description: "Feature name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    setFeatures([
      ...features,
      {
        id: Date.now().toString(),
        name: newFeature.name,
        description: newFeature.description,
        isIncluded: { ...newFeature.isIncluded }
      }
    ]);
    
    setNewFeature({
      name: '',
      description: '',
      isIncluded: { free: false, standard: false, premium: false }
    });
    
    setDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Feature added successfully"
    });
  };
  
  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
    toast({
      title: "Success",
      description: "Feature removed successfully"
    });
  };
  
  const handleFeatureToggle = (featureId: string, plan: string) => {
    setFeatures(
      features.map(feature => 
        feature.id === featureId 
          ? {
              ...feature,
              isIncluded: {
                ...feature.isIncluded,
                [plan]: !feature.isIncluded[plan]
              }
            }
          : feature
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <CreditCard className="mr-2 h-6 w-6" /> Subscription Management
          </h1>
          <p className="text-muted-foreground">Manage subscription plans and features</p>
        </div>
      </div>

      <Tabs defaultValue="features">
        <TabsList className="mb-4">
          <TabsTrigger value="features">Plan Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Available Features</CardTitle>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Feature
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Feature</DialogTitle>
                    <DialogDescription>
                      Add a new feature to the subscription plans.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Feature Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter feature name" 
                        value={newFeature.name}
                        onChange={(e) => setNewFeature({...newFeature, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input 
                        id="description" 
                        placeholder="Enter feature description" 
                        value={newFeature.description}
                        onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Available in Plans</Label>
                      <div className="flex items-center justify-between">
                        <span>Free Plan</span>
                        <Switch 
                          checked={newFeature.isIncluded.free} 
                          onCheckedChange={(checked) => 
                            setNewFeature({
                              ...newFeature, 
                              isIncluded: {...newFeature.isIncluded, free: checked}
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Standard Plan</span>
                        <Switch 
                          checked={newFeature.isIncluded.standard} 
                          onCheckedChange={(checked) => 
                            setNewFeature({
                              ...newFeature, 
                              isIncluded: {...newFeature.isIncluded, standard: checked}
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Premium Plan</span>
                        <Switch 
                          checked={newFeature.isIncluded.premium} 
                          onCheckedChange={(checked) => 
                            setNewFeature({
                              ...newFeature, 
                              isIncluded: {...newFeature.isIncluded, premium: checked}
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddFeature}>Add Feature</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Free Plan</TableHead>
                    <TableHead>Standard Plan</TableHead>
                    <TableHead>Premium Plan</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow key={feature.id}>
                      <TableCell className="font-medium">{feature.name}</TableCell>
                      <TableCell>{feature.description}</TableCell>
                      <TableCell>
                        <Switch 
                          checked={feature.isIncluded.free}
                          onCheckedChange={() => handleFeatureToggle(feature.id, 'free')}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={feature.isIncluded.standard}
                          onCheckedChange={() => handleFeatureToggle(feature.id, 'standard')}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={feature.isIncluded.premium}
                          onCheckedChange={() => handleFeatureToggle(feature.id, 'premium')}
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveFeature(feature.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`${plan.isPopular ? 'border-wasfah-bright-teal' : ''}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{plan.name}</span>
                        {plan.isPopular && (
                          <span className="bg-wasfah-bright-teal text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">
                          /{plan.billingPeriod === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {features.map((feature) => (
                          <li key={feature.id} className="flex items-center">
                            {feature.isIncluded[plan.name.toLowerCase()] ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                            )}
                            <span className={feature.isIncluded[plan.name.toLowerCase()] ? '' : 'text-gray-400'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSubscriptionManager;
