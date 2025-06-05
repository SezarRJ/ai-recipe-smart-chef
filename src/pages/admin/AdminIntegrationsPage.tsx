import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Plug, Settings, CheckCircle, XCircle, Plus, RefreshCw, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  enabled: boolean;
  lastSync?: string;
  category: string;
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
  apiEnvironmentVariable?: string;
}

const AdminIntegrationsPage = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing and subscription management',
      status: 'connected',
      enabled: true,
      lastSync: '2024-01-15 10:30:00',
      category: 'payments'
    },
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'AI Chef Assistant functionality',
      status: 'connected',
      enabled: true,
      lastSync: '2024-01-15 09:15:00',
      category: 'ai'
    },
    {
      id: 'resend',
      name: 'Resend',
      description: 'Email delivery service',
      status: 'connected',
      enabled: true,
      lastSync: '2024-01-15 08:45:00',
      category: 'notifications'
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      description: 'Web analytics and user tracking',
      status: 'disconnected',
      enabled: false,
      category: 'analytics'
    },
    {
      id: 'cloudinary',
      name: 'Cloudinary',
      description: 'Image optimization and CDN delivery',
      status: 'connected',
      enabled: true,
      category: 'media',
      cloudName: 'dftedcc6o',
      apiKey: 'Q5SAGi2b4-xH1bAHmhfBbG_Ta5M',
      apiSecret: 'Q5SAGi2b4-xH1bAHmhfBbG_Ta5M',
      apiEnvironmentVariable: 'CLOUDINARY_URL=cloudinary://878259499524876:Q5SAGi2b4-xH1bAHmhfBbG_Ta5M@dftedcc6o',
      lastSync: '2024-01-15 11:00:00'
    }
  ]);

  const [configDialog, setConfigDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    description: '',
    category: '',
    cloudName: '',
    apiKey: '',
    apiSecret: '',
    apiEnvironmentVariable: ''
  });

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: `Integration ${integration?.enabled ? 'Disabled' : 'Enabled'}`,
      description: `${integration?.name} has been ${integration?.enabled ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConfigDialog(true);
  };

  const handleSyncIntegration = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      setIntegrations(prev =>
        prev.map(i =>
          i.id === id ? { ...i, lastSync: new Date().toLocaleString() } : i
        )
      );
      toast({
        title: 'Sync Complete',
        description: `${integration.name} has been synchronized successfully.`,
      });
    }
  };

  const handleAddIntegration = () => {
    if (!newIntegration.name || !newIntegration.description) {
      toast({
        title: 'Error',
        description: 'Please fill in the required fields (name and description).',
        variant: 'destructive',
      });
      return;
    }

    const integration: Integration = {
      id: newIntegration.name.toLowerCase().replace(/\s+/g, '-'),
      name: newIntegration.name,
      description: newIntegration.description,
      status: 'disconnected',
      enabled: false,
      category: newIntegration.category || 'custom',
      cloudName: newIntegration.cloudName || undefined,
      apiKey: newIntegration.apiKey || undefined,
      apiSecret: newIntegration.apiSecret || undefined,
      apiEnvironmentVariable: newIntegration.apiEnvironmentVariable || undefined,
    };

    setIntegrations(prev => [...prev, integration]);
    setNewIntegration({
      name: '',
      description: '',
      category: '',
      cloudName: '',
      apiKey: '',
      apiSecret: '',
      apiEnvironmentVariable: ''
    });
    setAddDialog(false);
    
    toast({
      title: 'Integration Added',
      description: `${integration.name} has been added successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <XCircle className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
        );
    }
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const enabledCount = integrations.filter(i => i.enabled).length;
  const errorCount = integrations.filter(i => i.status === 'error').length;

  return (
    <AdminPageWrapper title="Integrations">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Integrations</h1>
            <p className="text-muted-foreground">Manage third-party service integrations.</p>
          </div>
          <Button onClick={() => setAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
              <Plug className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{integrations.length}</div>
              <p className="text-xs text-muted-foreground">Available services</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{connectedCount}</div>
              <p className="text-xs text-muted-foreground">Active connections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enabled</CardTitle>
              <Settings className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{enabledCount}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enable Integration</span>
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={() => handleToggleIntegration(integration.id)}
                    disabled={integration.status === 'disconnected'}
                  />
                </div>
                
                {integration.lastSync && (
                  <p className="text-xs text-gray-500">
                    Last sync: {integration.lastSync}
                  </p>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigureIntegration(integration)}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  {integration.status === 'connected' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSyncIntegration(integration.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Sync
                    </Button>
                  )}
                  {integration.status === 'disconnected' ? (
                    <Button size="sm">Connect</Button>
                  ) : (
                    <Button variant="outline" size="sm">Disconnect</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Integration Dialog */}
        <Dialog open={addDialog} onOpenChange={setAddDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
              <DialogDescription>
                Add a new third-party service integration with optional API configuration.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Integration Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter integration name"
                    value={newIntegration.name}
                    onChange={(e) => setNewIntegration(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., media, payments, ai"
                    value={newIntegration.category}
                    onChange={(e) => setNewIntegration(prev => ({ ...prev, category: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the integration"
                  value={newIntegration.description}
                  onChange={(e) => setNewIntegration(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">API Configuration (Optional)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cloudName">Cloud Name</Label>
                    <Input
                      id="cloudName"
                      placeholder="Enter cloud name"
                      value={newIntegration.cloudName}
                      onChange={(e) => setNewIntegration(prev => ({ ...prev, cloudName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      placeholder="Enter API key"
                      type="password"
                      value={newIntegration.apiKey}
                      onChange={(e) => setNewIntegration(prev => ({ ...prev, apiKey: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <Label htmlFor="apiSecret">API Secret</Label>
                    <Input
                      id="apiSecret"
                      placeholder="Enter API secret"
                      type="password"
                      value={newIntegration.apiSecret}
                      onChange={(e) => setNewIntegration(prev => ({ ...prev, apiSecret: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="apiEnvironmentVariable">API Environment Variable</Label>
                    <Input
                      id="apiEnvironmentVariable"
                      placeholder="e.g., CLOUDINARY_URL=cloudinary://..."
                      value={newIntegration.apiEnvironmentVariable}
                      onChange={(e) => setNewIntegration(prev => ({ ...prev, apiEnvironmentVariable: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddIntegration}>
                Add Integration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Configure Integration Dialog */}
        <Dialog open={configDialog} onOpenChange={setConfigDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
              <DialogDescription>
                Update the configuration settings for this integration.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="configCloudName">Cloud Name</Label>
                  <Input
                    id="configCloudName"
                    placeholder="Enter cloud name"
                    defaultValue={selectedIntegration?.cloudName || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="configApiKey">API Key</Label>
                  <Input
                    id="configApiKey"
                    placeholder="Enter API key"
                    type="password"
                    defaultValue={selectedIntegration?.apiKey || ''}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="configApiSecret">API Secret</Label>
                <Input
                  id="configApiSecret"
                  placeholder="Enter API secret"
                  type="password"
                  defaultValue={selectedIntegration?.apiSecret || ''}
                />
              </div>
              <div>
                <Label htmlFor="configApiEnvironmentVariable">API Environment Variable</Label>
                <Input
                  id="configApiEnvironmentVariable"
                  placeholder="e.g., CLOUDINARY_URL=cloudinary://..."
                  defaultValue={selectedIntegration?.apiEnvironmentVariable || ''}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setConfigDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setConfigDialog(false)}>
                Save Configuration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminIntegrationsPage;
