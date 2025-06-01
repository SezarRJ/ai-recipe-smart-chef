
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Bot, MessageSquare, Settings, Database, 
  TrendingUp, Users, Clock, Zap, Brain, 
  RefreshCw, Save, AlertTriangle
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';

interface AIChefStats {
  totalQueries: number;
  activeUsers: number;
  averageResponseTime: number;
  successRate: number;
  topQueries: Array<{ query: string; count: number }>;
}

const mockStats: AIChefStats = {
  totalQueries: 1247,
  activeUsers: 89,
  averageResponseTime: 1.2,
  successRate: 98.5,
  topQueries: [
    { query: "Recipe suggestions", count: 156 },
    { query: "Ingredient substitutions", count: 134 },
    { query: "Cooking techniques", count: 98 },
    { query: "Nutrition information", count: 87 },
    { query: "Meal planning", count: 72 }
  ]
};

export default function AdminAIChef() {
  const { toast } = useToast();
  const [aiSettings, setAiSettings] = useState({
    enabled: true,
    model: 'gpt-4o-mini',
    maxTokens: 1000,
    temperature: 0.7,
    systemPrompt: `You are Wasfah AI Chef, a helpful cooking assistant. You provide personalized recipe suggestions, cooking tips, and culinary guidance. Always be friendly, encouraging, and focus on practical cooking advice.`,
    rateLimitPerUser: 50,
    rateLimitWindow: 3600,
    enableAnalytics: true,
    enableFeedback: true
  });

  const [testQuery, setTestQuery] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTestLoading, setIsTestLoading] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "AI Chef configuration has been updated successfully.",
    });
  };

  const handleTestAI = async () => {
    if (!testQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a test query",
        variant: "destructive"
      });
      return;
    }

    setIsTestLoading(true);
    setTestResponse('');

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setTestResponse(`Based on your query "${testQuery}", here's what I would suggest: This is a test response from the AI Chef system. The actual response would be generated using the configured AI model with the current settings.`);
      
      toast({
        title: "Test Successful",
        description: "AI Chef responded successfully",
      });
    } catch (error) {
      toast({
        title: "Test Failed",
        description: "Failed to get response from AI Chef",
        variant: "destructive"
      });
    } finally {
      setIsTestLoading(false);
    }
  };

  const resetToDefaults = () => {
    setAiSettings({
      enabled: true,
      model: 'gpt-4o-mini',
      maxTokens: 1000,
      temperature: 0.7,
      systemPrompt: `You are Wasfah AI Chef, a helpful cooking assistant. You provide personalized recipe suggestions, cooking tips, and culinary guidance. Always be friendly, encouraging, and focus on practical cooking advice.`,
      rateLimitPerUser: 50,
      rateLimitWindow: 3600,
      enableAnalytics: true,
      enableFeedback: true
    });

    toast({
      title: "Settings Reset",
      description: "AI Chef settings have been reset to defaults.",
    });
  };

  return (
    <AdminLayout title="AI Chef Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Chef Management</h1>
            <p className="text-muted-foreground">Configure and monitor the AI cooking assistant</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetToDefaults}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalQueries.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.averageResponseTime}s</div>
              <p className="text-xs text-muted-foreground">-0.3s from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.successRate}%</div>
              <p className="text-xs text-muted-foreground">+0.5% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              AI Configuration
            </CardTitle>
            <CardDescription>Configure the AI model and behavior settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ai-enabled">Enable AI Chef</Label>
                <p className="text-sm text-muted-foreground">Toggle AI Chef functionality on/off</p>
              </div>
              <Switch
                id="ai-enabled"
                checked={aiSettings.enabled}
                onCheckedChange={(checked) => setAiSettings({...aiSettings, enabled: checked})}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="model">AI Model</Label>
                <select
                  id="model"
                  value={aiSettings.model}
                  onChange={(e) => setAiSettings({...aiSettings, model: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="gpt-4o-mini">GPT-4O Mini (Fast & Cost-effective)</option>
                  <option value="gpt-4o">GPT-4O (Advanced)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  value={aiSettings.maxTokens}
                  onChange={(e) => setAiSettings({...aiSettings, maxTokens: parseInt(e.target.value)})}
                  min="100"
                  max="4000"
                />
              </div>
              <div>
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  value={aiSettings.temperature}
                  onChange={(e) => setAiSettings({...aiSettings, temperature: parseFloat(e.target.value)})}
                  min="0"
                  max="2"
                />
              </div>
              <div>
                <Label htmlFor="rateLimitPerUser">Rate Limit (per user)</Label>
                <Input
                  id="rateLimitPerUser"
                  type="number"
                  value={aiSettings.rateLimitPerUser}
                  onChange={(e) => setAiSettings({...aiSettings, rateLimitPerUser: parseInt(e.target.value)})}
                  min="1"
                  max="1000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                id="systemPrompt"
                value={aiSettings.systemPrompt}
                onChange={(e) => setAiSettings({...aiSettings, systemPrompt: e.target.value})}
                rows={4}
                placeholder="Enter the system prompt that defines the AI's personality and behavior..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics">Enable Analytics</Label>
                <p className="text-sm text-muted-foreground">Track usage and performance metrics</p>
              </div>
              <Switch
                id="analytics"
                checked={aiSettings.enableAnalytics}
                onCheckedChange={(checked) => setAiSettings({...aiSettings, enableAnalytics: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="feedback">Enable User Feedback</Label>
                <p className="text-sm text-muted-foreground">Allow users to rate AI responses</p>
              </div>
              <Switch
                id="feedback"
                checked={aiSettings.enableFeedback}
                onCheckedChange={(checked) => setAiSettings({...aiSettings, enableFeedback: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Test AI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Test AI Chef
            </CardTitle>
            <CardDescription>Test the AI Chef with custom queries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="testQuery">Test Query</Label>
              <Textarea
                id="testQuery"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                placeholder="Enter a cooking question to test the AI..."
                rows={3}
              />
            </div>
            
            <Button onClick={handleTestAI} disabled={isTestLoading}>
              {isTestLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Test AI Chef
                </>
              )}
            </Button>

            {testResponse && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Label>AI Response:</Label>
                <p className="mt-2 text-sm">{testResponse}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Queries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Popular Queries
            </CardTitle>
            <CardDescription>Most frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockStats.topQueries.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{query.query}</span>
                  <Badge variant="outline">{query.count} queries</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>OpenAI API Status</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Database Connection</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Rate Limiting</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
