import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ExternalLink, Settings, Key, Database, 
  Globe, Zap, Shield, CheckCircle, X,
  Cpu, Link, Code, Webhook, Plus, Save
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  status: 'connected' | 'disconnected' | 'error';
  category: 'api' | 'payment' | 'analytics' | 'social';
  version?: string;
  lastSync?: string;
  apiKey?: string;
  config?: Record<string, any>;
}

const integrations: Integration[] = [
  {
    id: 'spoonacular',
    name: 'Spoonacular API',
    description: 'Recipe and nutrition data provider',
    icon: Database,
    enabled: true,
    status: 'connected',
    category: 'api',
    version: 'v1.2',
    lastSync: '2024-01-20T10:30:00Z',
    apiKey: '437914c63f4748c49a8236e93c3758eb'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and subscriptions',
    icon: Shield,
    enabled: true,
    status: 'connected',
    category: 'payment',
    version: 'v2023-10-16',
    lastSync: '2024-01-20T09:15:00Z'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Website analytics and user tracking',
    icon: Globe,
    enabled: false,
    status: 'disconnected',
    category: 'analytics'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI-powered recipe generation and assistance',
    icon: Zap,
    enabled: false,
    status: 'disconnected',
    category: 'api'
  }
];

export default function AdminIntegrationsManager() {
  const { toast } = useToast();
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [integrationList, setIntegrationList] = useState(integrations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [configData, setConfigData] = useState({
    apiKey: '',
    webhookUrl: '',
    settings: ''
  });
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    description: '',
    category: 'api' as const,
    apiKey: '',
    webhookUrl: ''
  });

  const handleToggleIntegration = (id: string) => {
    setIntegrationList(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    );

    const integration = integrationList.find(i => i.id === id);
    toast({
      title: integration?.enabled ? "Integration Disabled" : "Integration Enabled",
      description: `${integration?.name} has been ${integration?.enabled ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConfigData({
      apiKey: integration.apiKey || '',
      webhookUrl: integration.config?.webhookUrl || '',
      settings: JSON.stringify(integration.config || {}, null, 2)
    });
    setIsConfigDialogOpen(true);
  };

  const handleSaveConfiguration = () => {
    if (!selectedIntegration) return;

    setIntegrationList(prev => 
      prev.map(integration => 
        integration.id === selectedIntegration.id 
          ? { 
              ...integration, 
              apiKey: configData.apiKey,
              config: {
                ...integration.config,
                webhookUrl: configData.webhookUrl,
                ...(configData.settings ? JSON.parse(configData.settings) : {})
              },
              status: configData.apiKey ? 'connected' : 'disconnected',
              enabled: configData.apiKey ? true : integration.enabled
            }
          : integration
      )
    );

    toast({
      title: "Configuration Saved",
      description: `${selectedIntegration.name} integration has been updated.`,
    });

    setIsConfigDialogOpen(false);
    setSelectedIntegration(null);
  };

  const handleAddIntegration = () => {
    if (!newIntegration.name || !newIntegration.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const integration: Integration = {
      id: newIntegration.name.toLowerCase().replace(/\s+/g, '-'),
      name: newIntegration.name,
      description: newIntegration.description,
      icon: Code,
      enabled: false,
      status: 'disconnected',
      category: newIntegration.category,
      apiKey: newIntegration.apiKey
    };

    setIntegrationList(prev => [...prev, integration]);
    setIsAddDialogOpen(false);
    setNewIntegration({
      name: '',
      description: '',
      category: 'api',
      apiKey: '',
      webhookUrl: ''
    });

    toast({
      title: "Integration Added",
      description: `${newIntegration.name} has been added successfully.`,
    });
  };

  const handleTestConnection = async (integration: Integration) => {
    toast({
      title: "Testing Connection",
      description: "Testing integration connection...",
    });

    // Simulate API test
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIntegrationList(prev => 
        prev.map(int => 
          int.id === integration.id 
            ? { ...int, status: 'connected' as const }
            : int
        )
      );

      toast({
        title: "Connection Successful",
        description: `${integration.name} is working correctly!`,
      });
    } catch (error) {
      setIntegrationList(prev => 
        prev.map(int => 
          int.id === integration.id 
            ? { ...int, status: 'error' as const }
            : int
        )
      );

      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${integration.name}`,
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Disconnected</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'api': return <Database className="h-4 w-4" />;
      case 'payment': return <Shield className="h-4 w-4" />;
      case 'analytics': return <Globe className="h-4 w-4" />;
      case 'social': return <Link className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout title="Integrations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
            <p className="text-muted-foreground">Manage third-party integrations and API connections</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Integration</DialogTitle>
                <DialogDescription>
                  Configure a new third-party integration for your application.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Integration Name</Label>
                  <Input
                    id="name"
                    value={newIntegration.name}
                    onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                    placeholder="e.g., Google Maps API"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newIntegration.description}
                    onChange={(e) => setNewIntegration({...newIntegration, description: e.target.value})}
                    placeholder="Brief description of the integration"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newIntegration.category}
                    onChange={(e) => setNewIntegration({...newIntegration, category: e.target.value as any})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="api">API</option>
                    <option value="payment">Payment</option>
                    <option value="analytics">Analytics</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="apiKey">API Key (Optional)</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={newIntegration.apiKey}
                    onChange={(e) => setNewIntegration({...newIntegration, apiKey: e.target.value})}
                    placeholder="Enter API key"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddIntegration}>
                  Add Integration
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Configuration Dialog */}
        <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
              <DialogDescription>
                Update integration settings and API credentials
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="configApiKey">API Key</Label>
                <Input
                  id="configApiKey"
                  type="password"
                  placeholder="Enter API key"
                  value={configData.apiKey}
                  onChange={(e) => setConfigData({...configData, apiKey: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-app.com/webhooks"
                  value={configData.webhookUrl}
                  onChange={(e) => setConfigData({...configData, webhookUrl: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="settings">Additional Settings (JSON)</Label>
                <Textarea
                  id="settings"
                  placeholder='{"timeout": 30, "retries": 3}'
                  value={configData.settings}
                  onChange={(e) => setConfigData({...configData, settings: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveConfiguration}>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Integrations</TabsTrigger>
            <TabsTrigger value="api">APIs</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {integrationList.map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <integration.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          {integration.version && (
                            <p className="text-xs text-muted-foreground">v{integration.version}</p>
                          )}
                        </div>
                      </div>
                      <Switch
                        checked={integration.enabled}
                        onCheckedChange={() => handleToggleIntegration(integration.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{integration.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(integration.category)}
                        <span className="text-sm capitalize">{integration.category}</span>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>

                    {integration.lastSync && (
                      <p className="text-xs text-muted-foreground">
                        Last sync: {new Date(integration.lastSync).toLocaleString()}
                      </p>
                    )}

                    <div className="flex space-x-2">
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
                          onClick={() => handleTestConnection(integration)}
                        >
                          Test
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {['api', 'payment', 'analytics', 'social'].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {integrationList
                  .filter(integration => integration.category === category)
                  .map((integration) => (
                    <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <integration.icon className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                          </div>
                          <Switch
                            checked={integration.enabled}
                            onCheckedChange={() => handleToggleIntegration(integration.id)}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        {getStatusBadge(integration.status)}
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleConfigureIntegration(integration)}
                          >
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Global Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Global Integration Settings</CardTitle>
            <CardDescription>Configure global integration settings and defaults</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="global-webhook-url">Default Webhook URL</Label>
                <Input id="global-webhook-url" placeholder="https://your-app.com/webhooks" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                <Input id="timeout" type="number" placeholder="30" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-retry" />
              <Label htmlFor="auto-retry">Auto-retry failed requests</Label>
            </div>
            <Button>Save Global Settings</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
