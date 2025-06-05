
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Scan, AlertTriangle, Calendar, Search } from 'lucide-react';

const SmartPantryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const pantryItems = [
    { id: 1, name: 'Chicken Breast', quantity: '2 lbs', category: 'Protein', expiryDate: '2024-01-20', status: 'fresh' },
    { id: 2, name: 'Milk', quantity: '1 gallon', category: 'Dairy', expiryDate: '2024-01-18', status: 'expiring' },
    { id: 3, name: 'Tomatoes', quantity: '6 pieces', category: 'Vegetables', expiryDate: '2024-01-15', status: 'expired' },
    { id: 4, name: 'Rice', quantity: '5 lbs', category: 'Grains', expiryDate: '2024-06-15', status: 'fresh' },
    { id: 5, name: 'Eggs', quantity: '12 pieces', category: 'Protein', expiryDate: '2024-01-25', status: 'fresh' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'expiring': return <AlertTriangle className="h-4 w-4" />;
      case 'expired': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  const expiringItems = pantryItems.filter(item => item.status === 'expiring' || item.status === 'expired');

  return (
    <PageContainer
      header={{
        title: 'Smart Pantry',
        showBackButton: true
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-20 bg-wasfah-bright-teal hover:bg-wasfah-teal">
            <div className="flex flex-col items-center">
              <Plus className="h-6 w-6 mb-1" />
              <span>Add Item</span>
            </div>
          </Button>
          <Button variant="outline" className="h-20">
            <div className="flex flex-col items-center">
              <Scan className="h-6 w-6 mb-1" />
              <span>Scan Barcode</span>
            </div>
          </Button>
        </div>

        {/* Expiring Items Alert */}
        {expiringItems.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                Items Need Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expiringItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search pantry items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Pantry Items Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="protein">Protein</TabsTrigger>
            <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
            <TabsTrigger value="dairy">Dairy</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {pantryItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Expires: {item.expiryDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="protein">
            {pantryItems.filter(item => item.category === 'Protein').map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Expires: {item.expiryDate}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="vegetables">
            {pantryItems.filter(item => item.category === 'Vegetables').map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Expires: {item.expiryDate}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="dairy">
            {pantryItems.filter(item => item.category === 'Dairy').map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Expires: {item.expiryDate}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default SmartPantryPage;
