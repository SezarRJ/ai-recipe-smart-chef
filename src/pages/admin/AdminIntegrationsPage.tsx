
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Plug, CheckCircle, AlertCircle, Settings, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const mockIntegrations = [
  {
    id: 'spoonacular',
    name: 'Spoonacular API',
    description: 'Recipe and nutrition data',
    status: 'connected',
    enabled: true,
    lastSync: '2 hours ago'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing',
    status: 'connected',
    enabled: true,
    lastSync: '5 minutes ago'
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Email delivery service',
    status: 'disconnected',
    enabled: false,
    lastSync: 'Never'
  },
  {
    id: 'firebase',
    name: 'Firebase Analytics',
    description: 'App analytics and insights',
    status: 'connected',
    enabled: false,
    lastSync: '1 day ago'
  }
];

const AdminIntegrationsPage = () => {
  const [integrations, setIntegrations] = useState(mockIntegrations);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: 'bg-green-100 text-green-800',
      disconnected: 'bg-red-100 text-red-800',
      error: 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <AdminPageWrapper title="Integrations">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Integrations</h1>
            <p className="text-muted-foreground">Manage third-party service integrations and API connections.</p>
          </div>
          <Button>
            <Plug className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {integrations.filter(i => i.status === 'connected').length}
                  </div>
                  <div className="text-sm text-gray-600">Connected</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {integrations.filter(i => i.enabled).length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">
                {integrations.filter(i => i.status === 'disconnected').length}
              </div>
              <div className="text-sm text-gray-600">Disconnected</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(integration.status)}
                    <div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(integration.status)}
                        <span className="text-xs text-muted-foreground">
                          Last sync: {integration.lastSync}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                      disabled={integration.status === 'disconnected'}
                    />
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
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
