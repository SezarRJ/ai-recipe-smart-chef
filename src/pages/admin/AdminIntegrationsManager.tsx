
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Key, AlertTriangle, CheckCircle2, RefreshCw, ExternalLink, LogIn, Cpu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  status: 'active' | 'inactive' | 'error';
  lastSync?: string;
}

const mockIntegrations: Integration[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing integration',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8.5C14 8.5 14 4 9.5 4C5 4 5 8.5 5 8.5C5 8.5 5 13 9.5 13C14 13 14 8.5 14 8.5Z" stroke="#7A73FF" strokeWidth="2" />
      <path d="M19 15.5C19 15.5 19 11 14.5 11C10 11 10 15.5 10 15.5C10 15.5 10 20 14.5 20C19 20 19 15.5 19 15.5Z" stroke="#7A73FF" strokeWidth="2" />
    </svg>,
    isConnected: true,
    status: 'active',
    lastSync: '15 minutes ago'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing platform',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20V16H4V4Z" stroke="#FFD43B" strokeWidth="2" />
      <path d="M4 16L12 20L20 16" stroke="#FFD43B" strokeWidth="2" />
    </svg>,
    isConnected: true,
    status: 'active',
    lastSync: '2 days ago'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Web analytics service',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="4" height="10" rx="1" stroke="#4285F4" strokeWidth="2" />
      <rect x="11" y="4" width="4" height="14" rx="1" stroke="#4285F4" strokeWidth="2" />
      <rect x="17" y="12" width="4" height="6" rx="1" stroke="#4285F4" strokeWidth="2" />
    </svg>,
    isConnected: false,
    status: 'inactive'
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'Customer messaging API',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 7.5C6.5 8.5 7.5 9.5 8.5 9.5C9.5 9.5 10.5 8.5 10.5 7.5C10.5 6.5 9.5 5.5 8.5 5.5C7.5 5.5 6.5 6.5 6.5 7.5Z" stroke="#F22F46" strokeWidth="2" />
      <path d="M13.5 7.5C13.5 8.5 14.5 9.5 15.5 9.5C16.5 9.5 17.5 8.5 17.5 7.5C17.5 6.5 16.5 5.5 15.5 5.5C14.5 5.5 13.5 6.5 13.5 7.5Z" stroke="#F22F46" strokeWidth="2" />
      <path d="M6.5 15.5C6.5 16.5 7.5 17.5 8.5 17.5C9.5 17.5 10.5 16.5 10.5 15.5C10.5 14.5 9.5 13.5 8.5 13.5C7.5 13.5 6.5 14.5 6.5 15.5Z" stroke="#F22F46" strokeWidth="2" />
      <path d="M13.5 15.5C13.5 16.5 14.5 17.5 15.5 17.5C16.5 17.5 17.5 16.5 17.5 15.5C17.5 14.5 16.5 13.5 15.5 13.5C14.5 13.5 13.5 14.5 13.5 15.5Z" stroke="#F22F46" strokeWidth="2" />
    </svg>,
    isConnected: true,
    status: 'error'
  },
];

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API',
    key: 'pk_live_*****************FGHI',
    createdAt: '2025-03-15',
    lastUsed: '5 minutes ago'
  },
  {
    id: '2',
    name: 'Test API',
    key: 'pk_test_*****************ABCD',
    createdAt: '2025-04-10',
    lastUsed: '2 days ago'
  },
];

const AdminIntegrationsManager: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const { toast } = useToast();
  
  const handleToggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { 
            ...integration, 
            isConnected: !integration.isConnected,
            status: !integration.isConnected ? 'active' : 'inactive'
          }
        : integration
    ));
    
    const integration = integrations.find(int => int.id === id);
    if (integration) {
      toast({
        title: integration.isConnected ? 'Integration Disabled' : 'Integration Enabled',
        description: `${integration.name} has been ${integration.isConnected ? 'disconnected' : 'connected'} successfully.`,
      });
    }
  };
  
  const handleSyncIntegration = (id: string) => {
    const integration = integrations.find(int => int.id === id);
    if (integration) {
      toast({
        title: 'Syncing Integration',
        description: `Synchronizing data with ${integration.name}...`,
      });
      
      // This would actually trigger a sync in a real application
      setTimeout(() => {
        setIntegrations(integrations.map(int => 
          int.id === id ? { ...int, lastSync: 'Just now' } : int
        ));
        
        toast({
          title: 'Sync Complete',
          description: `${integration.name} data has been synchronized.`,
        });
      }, 2000);
    }
  };
  
  const handleCreateApiKey = () => {
    toast({
      title: 'Feature Coming Soon',
      description: 'API key generation will be available in the next update.',
    });
  };
  
  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast({
      title: 'API Key Deleted',
      description: 'The API key has been permanently revoked.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Settings className="mr-2 h-6 w-6" /> Integrations & API Settings
          </h1>
          <p className="text-muted-foreground">Manage external integrations and API keys</p>
        </div>
      </div>

      <Tabs defaultValue="integrations">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">Service Integrations</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="oauth">OAuth Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="integrations">
          <div className="grid gap-6 md:grid-cols-2">
            {integrations.map((integration) => (
              <Card key={integration.id} className={integration.status === 'error' ? 'border-red-300' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-md">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`toggle-${integration.id}`} className="mr-2">
                        {integration.isConnected ? 'Enabled' : 'Disabled'}
                      </Label>
                      <Switch 
                        id={`toggle-${integration.id}`}
                        checked={integration.isConnected}
                        onCheckedChange={() => handleToggleIntegration(integration.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {integration.status === 'active' && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Active
                        </div>
                      )}
                      {integration.status === 'inactive' && (
                        <div className="flex items-center text-gray-600">
                          <div className="h-2 w-2 rounded-full bg-gray-600 mr-2" /> Inactive
                        </div>
                      )}
                      {integration.status === 'error' && (
                        <div className="flex items-center text-red-600">
                          <AlertTriangle className="h-4 w-4 mr-1" /> Error
                        </div>
                      )}
                      {integration.lastSync && (
                        <span className="text-xs text-gray-500">Last sync: {integration.lastSync}</span>
                      )}
                    </div>
                    
                    {integration.isConnected && (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                          onClick={() => handleSyncIntegration(integration.id)}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" /> Sync Now
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Settings className="h-3 w-3 mr-1" /> Configure
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                {integration.status === 'error' && (
                  <CardFooter className="bg-red-50 text-red-700 text-sm p-4">
                    <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                    There was an error connecting to this service. Please check your API credentials.
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="api-keys">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API keys for external service access</CardDescription>
              </div>
              <Button onClick={handleCreateApiKey}>
                <Key className="mr-2 h-4 w-4" /> Generate New Key
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-medium">{apiKey.name}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-4">
                        <span>{apiKey.key}</span>
                        <span>Created: {apiKey.createdAt}</span>
                        {apiKey.lastUsed && <span>Last used: {apiKey.lastUsed}</span>}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Show</Button>
                      <Button variant="outline" size="sm">Copy</Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteApiKey(apiKey.id)}
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-amber-50 text-amber-800 text-sm border-t">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Keep your API keys secure. Never share them in public repositories or client-side code.
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>Configure endpoints for real-time event notifications</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-64 text-muted-foreground">
              <div className="text-center">
                <ExternalLink className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Webhook Configuration Coming Soon</p>
                <p className="mt-2">Set up webhook endpoints to receive event notifications in real-time.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="oauth">
          <Card>
            <CardHeader>
              <CardTitle>OAuth Settings</CardTitle>
              <CardDescription>Configure OAuth providers for authentication</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-64 text-muted-foreground">
              <div className="text-center">
                <LogIn className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">OAuth Configuration Coming Soon</p>
                <p className="mt-2">Set up OAuth providers such as Google, Facebook, and Twitter.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminIntegrationsManager;
