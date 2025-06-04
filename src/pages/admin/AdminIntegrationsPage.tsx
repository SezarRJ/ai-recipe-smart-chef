
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Settings, Zap, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const mockIntegrations = [
  {
    id: 'INT-001',
    name: 'Stripe Payment Gateway',
    description: 'Process payments and subscriptions',
    category: 'payment',
    status: 'connected',
    lastSync: '2024-01-15 10:30',
    isEnabled: true
  },
  {
    id: 'INT-002',
    name: 'SendGrid Email Service',
    description: 'Send transactional emails',
    category: 'communication',
    status: 'connected',
    lastSync: '2024-01-15 09:45',
    isEnabled: true
  },
  {
    id: 'INT-003',
    name: 'Google Analytics',
    description: 'Track user behavior and analytics',
    category: 'analytics',
    status: 'error',
    lastSync: '2024-01-14 16:20',
    isEnabled: false
  },
  {
    id: 'INT-004',
    name: 'AWS S3 Storage',
    description: 'Store and manage files',
    category: 'storage',
    status: 'disconnected',
    lastSync: 'Never',
    isEnabled: false
  }
];

const AdminIntegrationsPage = () => {
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'disconnected': return <XCircle className="h-5 w-5 text-gray-500" />;
      default: return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      disconnected: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      payment: 'bg-blue-100 text-blue-800',
      communication: 'bg-purple-100 text-purple-800',
      analytics: 'bg-orange-100 text-orange-800',
      storage: 'bg-green-100 text-green-800'
    };
    return <Badge className={variants[category as keyof typeof variants]}>{category}</Badge>;
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, isEnabled: !integration.isEnabled }
        : integration
    ));
  };

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Integrations">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Integrations</h1>
            <p className="text-muted-foreground">Manage third-party service integrations and API connections.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{integrations.length}</div>
                <div className="text-sm text-gray-600">Total Integrations</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">{integrations.filter(i => i.status === 'connected').length}</div>
                <div className="text-sm text-gray-600">Connected</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">{integrations.filter(i => i.status === 'error').length}</div>
                <div className="text-sm text-gray-600">Errors</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{integrations.filter(i => i.isEnabled).length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                  </div>
                  <Switch
                    checked={integration.isEnabled}
                    onCheckedChange={() => toggleIntegration(integration.id)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                
                <div className="flex items-center gap-2">
                  {getCategoryBadge(integration.category)}
                  {getStatusBadge(integration.status)}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Last sync: {integration.lastSync}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminIntegrationsPage;
