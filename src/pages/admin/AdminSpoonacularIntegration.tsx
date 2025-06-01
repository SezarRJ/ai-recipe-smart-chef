
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Database, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw,
  ExternalLink 
} from 'lucide-react';
import { toast } from 'sonner';

const AdminSpoonacularIntegration = () => {
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [autoImport, setAutoImport] = useState(false);
  const [dailyQuota, setDailyQuota] = useState(150);
  const [usedQuota, setUsedQuota] = useState(42);
  const [lastSync, setLastSync] = useState('2023-09-20 14:30:00');

  const handleTestConnection = () => {
    if (!apiKey) {
      toast.error('Please enter your Spoonacular API key first');
      return;
    }
    
    // Simulate API test
    setTimeout(() => {
      setIsConnected(true);
      toast.success('Connection successful! Spoonacular API is working.');
    }, 2000);
  };

  const handleSaveSettings = () => {
    toast.success('Integration settings saved successfully!');
  };

  const handleImportRecipes = () => {
    toast.success('Recipe import started! This may take a few minutes.');
  };

  return (
    <AdminPageWrapper title="Spoonacular Integration">
      <div className="space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{isConnected ? 'Connected' : 'Disconnected'}</div>
                  <div className="text-sm text-gray-600">API Status</div>
                </div>
                {isConnected ? <CheckCircle className="h-8 w-8 text-green-600" /> : <AlertCircle className="h-8 w-8 text-red-600" />}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{usedQuota}</div>
                  <div className="text-sm text-gray-600">API Calls Today</div>
                </div>
                <Database className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{dailyQuota}</div>
                  <div className="text-sm text-gray-600">Daily Quota</div>
                </div>
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">1,247</div>
                  <div className="text-sm text-gray-600">Imported Recipes</div>
                </div>
                <RefreshCw className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Configure your Spoonacular API integration settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apiKey">Spoonacular API Key</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your Spoonacular API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleTestConnection} variant="outline">
                  Test Connection
                </Button>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Get your API key from{' '}
                <a 
                  href="https://spoonacular.com/food-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  Spoonacular Food API <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoImport">Auto Import New Recipes</Label>
                <div className="text-sm text-gray-500">Automatically import trending recipes daily</div>
              </div>
              <Switch
                id="autoImport"
                checked={autoImport}
                onCheckedChange={setAutoImport}
              />
            </div>

            <div>
              <Label htmlFor="dailyQuota">Daily API Quota</Label>
              <Input
                id="dailyQuota"
                type="number"
                value={dailyQuota}
                onChange={(e) => setDailyQuota(parseInt(e.target.value))}
                className="w-32 mt-1"
              />
              <div className="text-sm text-gray-500 mt-1">
                Maximum API calls per day
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveSettings}>
                Save Settings
              </Button>
              <Button onClick={handleImportRecipes} variant="outline">
                Import Recipes Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Import History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Imports</CardTitle>
            <CardDescription>
              History of recipe imports from Spoonacular API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Daily Trending Recipes</div>
                  <div className="text-sm text-gray-500">Imported 25 recipes</div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                  <div className="text-sm text-gray-500 mt-1">{lastSync}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Vegetarian Collection</div>
                  <div className="text-sm text-gray-500">Imported 150 recipes</div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                  <div className="text-sm text-gray-500 mt-1">2023-09-19 10:15:00</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Quick Meals Under 30 Min</div>
                  <div className="text-sm text-gray-500">Imported 80 recipes</div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                  <div className="text-sm text-gray-500 mt-1">2023-09-18 16:45:00</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSpoonacularIntegration;
