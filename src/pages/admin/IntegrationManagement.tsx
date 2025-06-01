import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Settings, Key, Database, Zap, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';

const integrations = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI-powered recipe generation and cooking assistance',
    status: 'connected',
    icon: <Zap className="h-5 w-5" />,
    configurable: true,
    settings: ['API Key', 'Model Selection', 'Response Format']
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database and authentication services',
    status: 'connected',
    icon: <Database className="h-5 w-5" />,
    configurable: false,
    settings: ['Database URL', 'Anon Key', 'Service Role Key']
  },
  {
    id: 'spoonacular',
    name: 'Spoonacular API',
    description: 'Global cuisine and nutrition data',
    status: 'disconnected',
    icon: <ExternalLink className="h-5 w-5" />,
    configurable: true,
    settings: ['API Key', 'Rate Limits', 'Cache Settings']
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'AI image generation for recipes',
    status: 'disconnected',
    icon: <Zap className="h-5 w-5" />,
    configurable: true,
    settings: ['Access Token', 'Model Selection']
  }
];

const IntegrationManagement = () => {
  const { toast } = useToast();
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [notes, setNotes] = useState('');

  const getStatusBadge = (status: string) => {
    const badges = {
      connected: (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          <CheckCircle className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      ),
      disconnected: (
        <Badge variant="outline" className="bg-red-50 text-red-700">
          <AlertCircle className="h-3 w-3 mr-1" />
          Disconnected
        </Badge>
      ),
      error: (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Error
        </Badge>
      )
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const handleConfigureIntegration = (integration: any) => {
    setSelectedIntegration(integration);
  };

  const handleSaveConfiguration = () => {
    if (!selectedIntegration) return;

    toast({
      title: "Configuration Saved",
      description: `${selectedIntegration.name} integration has been updated.`,
    });

    setSelectedIntegration(null);
    setApiKey('');
    setNotes('');
  };

  const handleTestConnection = (integrationId: string) => {
    toast({
      title: "Testing Connection",
      description: "Testing integration connection...",
    });

    // Simulate test
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: "Integration is working correctly!",
      });
    }, 2000);
  };

  return (
    <AdminPageWrapper title="Integration Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Integration Management</h1>
            <p className="text-muted-foreground">Manage external service integrations and API configurations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{integrations.filter(i => i.status === 'connected').length}</div>
            <div className="text-sm text-gray-600">Active Integrations</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">{integrations.filter(i => i.status === 'disconnected').length}</div>
            <div className="text-sm text-gray-600">Inactive Integrations</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {integration.icon}
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Configuration Settings:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {integration.settings.map((setting, index) => (
                        <li key={index}>• {setting}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    {integration.configurable && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureIntegration(integration)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    )}
                    {integration.status === 'connected' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTestConnection(integration.id)}
                      >
                        Test Connection
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedIntegration && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Configure {selectedIntegration.name}</CardTitle>
              <CardDescription>Update integration settings and API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="apiKey">API Key / Access Token</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter API key or access token"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Configuration Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any configuration notes or instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveConfiguration}>
                  Save Configuration
                </Button>
                <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Integration Health Status</CardTitle>
            <CardDescription>Monitor the health and performance of your integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800">API Requests (24h)</div>
                  <div className="text-2xl font-bold text-green-900">1,247</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800">Success Rate</div>
                  <div className="text-2xl font-bold text-blue-900">99.8%</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="font-medium text-orange-800">Avg Response Time</div>
                  <div className="text-2xl font-bold text-orange-900">230ms</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageWrapper>
  );
};

export default IntegrationManagement;
