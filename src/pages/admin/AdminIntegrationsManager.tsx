import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Key, AlertTriangle, CheckCircle2, RefreshCw, ExternalLink, LogIn, Cpu, BarChart3, Shield, MessageSquare, Camera, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  status: 'active' | 'inactive' | 'error';
  lastSync?: string;
  category: 'analytics' | 'monitoring' | 'ai' | 'media' | 'notifications' | 'social' | 'payments';
}

const mockIntegrations: Integration[] = [
  // Analytics & Monitoring
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'User behavior tracking and insights',
    icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
    isConnected: false,
    status: 'inactive',
    category: 'analytics'
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Error monitoring and debugging',
    icon: <Shield className="w-6 h-6 text-purple-600" />,
    isConnected: false,
    status: 'inactive',
    category: 'monitoring'
  },
  
  // AI/ML Services
  {
    id: 'openai',
    name: 'OpenAI API',
    description: 'AI Chef Assistant functionality',
    icon: <Cpu className="w-6 h-6 text-green-600" />,
    isConnected: true,
    status: 'active',
    lastSync: '2 minutes ago',
    category: 'ai'
  },
  {
    id: 'perplexity',
    name: 'Perplexity API',
    description: 'Alternative cooking advice and recipe suggestions',
    icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
    isConnected: false,
    status: 'inactive',
    category: 'ai'
  },
  
  // Image Processing
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    description: 'Image optimization and CDN delivery',
    icon: <Camera className="w-6 h-6 text-yellow-600" />,
    isConnected: false,
    status: 'inactive',
    category: 'media'
  },
  
  // Notifications
  {
    id: 'resend',
    name: 'Resend',
    description: 'Email delivery service',
    icon: <MessageSquare className="w-6 h-6 text-green-600" />,
    isConnected: true,
    status: 'active',
    lastSync: '1 minute ago',
    category: 'notifications'
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'SMS notifications',
    icon: <MessageSquare className="w-6 h-6 text-red-600" />,
    isConnected: false,
    status: 'inactive',
    category: 'notifications'
  },
  {
    id: 'firebase-messaging',
    name: 'Firebase Cloud Messaging',
    description: 'Push notifications',
    icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
    isConnected: false,
    status: 'inactive',
    category: 'notifications'
  },
  
  // Social Media
  {
    id: 'facebook-api',
    name: 'Facebook API',
    description: 'Recipe sharing on Facebook',
    icon: <Share2 className="w-6 h-6 text-blue-700" />,
    isConnected: false,
    status: 'inactive',
    category: 'social'
  },
  {
    id: 'instagram-api',
    name: 'Instagram API',
    description: 'Recipe sharing on Instagram',
    icon: <Share2 className="w-6 h-6 text-pink-600" />,
    isConnected: false,
    status: 'inactive',
    category: 'social'
  },
  
  // Payments
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing integration',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8.5C14 8.5 14 4 9.5 4C5 4 5 8.5 5 8.5C5 8.5 5 13 9.5 13C14 13 14 8.5 14 8.5Z" stroke="#7A73FF" strokeWidth="2" />
      <path d="M19 15.5C19 15.5 19 11 14.5 11C10 11 10 15.5 10 15.5C10 15.5 10 20 14.5 20C19 20 19 15.5 19 15.5Z" stroke="#7A73FF" strokeWidth="2" />
    </svg>,
    isConnected: false,
    status: 'inactive',
    category: 'payments'
  },
];

interface ApiKey {
  id: string;
  name: string;
  service: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'OpenAI Production',
    service: 'OpenAI',
    key: 'sk-proj-***********************************',
    createdAt: '2025-01-30',
    lastUsed: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Resend API Key',
    service: 'Resend',
    key: 're_***********',
    createdAt: '2025-01-30',
    lastUsed: '1 minute ago'
  },
];

const AdminIntegrationsManager: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();
  
  const categories = [
    { id: 'all', name: 'All Services', count: integrations.length },
    { id: 'analytics', name: 'Analytics', count: integrations.filter(i => i.category === 'analytics').length },
    { id: 'monitoring', name: 'Monitoring', count: integrations.filter(i => i.category === 'monitoring').length },
    { id: 'ai', name: 'AI/ML', count: integrations.filter(i => i.category === 'ai').length },
    { id: 'media', name: 'Media', count: integrations.filter(i => i.category === 'media').length },
    { id: 'notifications', name: 'Notifications', count: integrations.filter(i => i.category === 'notifications').length },
    { id: 'social', name: 'Social', count: integrations.filter(i => i.category === 'social').length },
    { id: 'payments', name: 'Payments', count: integrations.filter(i => i.category === 'payments').length },
  ];
  
  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === selectedCategory);
  
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
            <Settings className="mr-2 h-6 w-6" /> Analytics & Integrations Manager
          </h1>
          <p className="text-muted-foreground">Manage analytics, monitoring, AI services, and third-party integrations</p>
        </div>
      </div>

      <Tabs defaultValue="integrations">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">Service Integrations</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="analytics-setup">Analytics Setup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="integrations">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {filteredIntegrations.map((integration) => (
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
        
        <TabsContent value="analytics-setup">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Configuration</CardTitle>
              <CardDescription>Set up tracking and monitoring for your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="ga-id">Google Analytics Measurement ID</Label>
                  <Input 
                    id="ga-id"
                    placeholder="G-XXXXXXXXXX"
                    defaultValue="G-XXXXXXXXXX"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Get this from your Google Analytics dashboard
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="sentry-dsn">Sentry DSN</Label>
                  <Input 
                    id="sentry-dsn"
                    placeholder="https://xxxx@sentry.io/xxxx"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your Sentry Data Source Name for error monitoring
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="track-user-interactions" defaultChecked />
                  <Label htmlFor="track-user-interactions">Track user interactions</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="track-recipe-views" defaultChecked />
                  <Label htmlFor="track-recipe-views">Track recipe views</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="track-ai-interactions" defaultChecked />
                  <Label htmlFor="track-ai-interactions">Track AI Chef interactions</Label>
                </div>
              </div>
              
              <Button className="w-full">
                Save Analytics Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminIntegrationsManager;
