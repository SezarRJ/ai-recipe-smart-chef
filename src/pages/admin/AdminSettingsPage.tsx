
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Shield, 
  Users, 
  Mail, 
  Database, 
  Globe,
  Lock,
  Key,
  Bell,
  Palette,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Server,
  Cloud
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
  // General Settings
  const [siteName, setSiteName] = useState('WasfahAI Kitchen Pal');
  const [siteDescription, setSiteDescription] = useState('Your AI-powered cooking companion');
  const [siteUrl, setSiteUrl] = useState('https://wasfahai.com');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Authentication Settings
  const [emailAuth, setEmailAuth] = useState(true);
  const [phoneAuth, setPhoneAuth] = useState(true);
  const [googleAuth, setGoogleAuth] = useState(false);
  const [facebookAuth, setFacebookAuth] = useState(false);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('24');

  // Email Settings
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUsername, setSmtpUsername] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [emailSender, setEmailSender] = useState('noreply@wasfahai.com');

  // Security Settings
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5');
  const [lockoutDuration, setLockoutDuration] = useState('30');
  const [passwordMinLength, setPasswordMinLength] = useState('8');
  const [requireSpecialChars, setRequireSpecialChars] = useState(true);
  const [enableTwoFactor, setEnableTwoFactor] = useState(false);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [adminAlerts, setAdminAlerts] = useState(true);

  // API Settings
  const [apiRateLimit, setApiRateLimit] = useState('1000');
  const [enableApiLogging, setEnableApiLogging] = useState(true);
  const [apiVersioning, setApiVersioning] = useState(true);

  // Performance Settings
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [cacheTtl, setCacheTtl] = useState('3600');
  const [compressionEnabled, setCompressionEnabled] = useState(true);
  const [cdnEnabled, setCdnEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = async (section: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
    
    setIsLoading(false);
  };

  const handleTestConnection = async (type: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Connection Test",
      description: `${type} connection test completed successfully.`,
    });
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-1">Configure system settings and preferences</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
            <Server className="h-4 w-4 text-green-500" />
            System Online
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Enter site name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  placeholder="Enter site description"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Enable to show maintenance page to users</p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>

              <Button 
                onClick={() => handleSaveSettings('General')}
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Authentication Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Authentication</Label>
                      <p className="text-sm text-gray-600">Allow users to sign in with email</p>
                    </div>
                    <Switch
                      checked={emailAuth}
                      onCheckedChange={setEmailAuth}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Phone Authentication</Label>
                      <p className="text-sm text-gray-600">Allow users to sign in with phone number</p>
                    </div>
                    <Switch
                      checked={phoneAuth}
                      onCheckedChange={setPhoneAuth}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Google Authentication</Label>
                      <p className="text-sm text-gray-600">Enable Google OAuth login</p>
                    </div>
                    <Switch
                      checked={googleAuth}
                      onCheckedChange={setGoogleAuth}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Facebook Authentication</Label>
                      <p className="text-sm text-gray-600">Enable Facebook OAuth login</p>
                    </div>
                    <Switch
                      checked={facebookAuth}
                      onCheckedChange={setFacebookAuth}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Verification Required</Label>
                      <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      checked={requireEmailVerification}
                      onCheckedChange={setRequireEmailVerification}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      placeholder="24"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('Authentication')}
                  disabled={isLoading}
                  className="w-full md:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Authentication Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={smtpUsername}
                    onChange={(e) => setSmtpUsername(e.target.value)}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={smtpPassword}
                    onChange={(e) => setSmtpPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailSender">Default Sender Email</Label>
                <Input
                  id="emailSender"
                  value={emailSender}
                  onChange={(e) => setEmailSender(e.target.value)}
                  placeholder="noreply@wasfahai.com"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => handleSaveSettings('Email')}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Settings
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleTestConnection('Email')}
                  disabled={isLoading}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={maxLoginAttempts}
                    onChange={(e) => setMaxLoginAttempts(e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={lockoutDuration}
                    onChange={(e) => setLockoutDuration(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Min Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={passwordMinLength}
                    onChange={(e) => setPasswordMinLength(e.target.value)}
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Special Characters</Label>
                    <p className="text-sm text-gray-600">Passwords must contain special characters</p>
                  </div>
                  <Switch
                    checked={requireSpecialChars}
                    onCheckedChange={setRequireSpecialChars}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    checked={enableTwoFactor}
                    onCheckedChange={setEnableTwoFactor}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSaveSettings('Security')}
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Send browser push notifications</p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Admin Alerts</Label>
                    <p className="text-sm text-gray-600">Send critical alerts to admins</p>
                  </div>
                  <Switch
                    checked={adminAlerts}
                    onCheckedChange={setAdminAlerts}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSaveSettings('Notifications')}
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Performance & Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cache Enabled</Label>
                    <p className="text-sm text-gray-600">Enable application caching</p>
                  </div>
                  <Switch
                    checked={cacheEnabled}
                    onCheckedChange={setCacheEnabled}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cacheTtl">Cache TTL (seconds)</Label>
                  <Input
                    id="cacheTtl"
                    type="number"
                    value={cacheTtl}
                    onChange={(e) => setCacheTtl(e.target.value)}
                    placeholder="3600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compression Enabled</Label>
                    <p className="text-sm text-gray-600">Enable gzip compression</p>
                  </div>
                  <Switch
                    checked={compressionEnabled}
                    onCheckedChange={setCompressionEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>CDN Enabled</Label>
                    <p className="text-sm text-gray-600">Use content delivery network</p>
                  </div>
                  <Switch
                    checked={cdnEnabled}
                    onCheckedChange={setCdnEnabled}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                <Input
                  id="apiRateLimit"
                  type="number"
                  value={apiRateLimit}
                  onChange={(e) => setApiRateLimit(e.target.value)}
                  placeholder="1000"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Logging</Label>
                    <p className="text-sm text-gray-600">Log API requests for debugging</p>
                  </div>
                  <Switch
                    checked={enableApiLogging}
                    onCheckedChange={setEnableApiLogging}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Versioning</Label>
                    <p className="text-sm text-gray-600">Enable API version control</p>
                  </div>
                  <Switch
                    checked={apiVersioning}
                    onCheckedChange={setApiVersioning}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSaveSettings('Performance')}
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Performance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-green-800">Database</p>
                <p className="text-sm text-green-600">Connected</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-green-800">Cache</p>
                <p className="text-sm text-green-600">Active</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium text-yellow-800">Email Service</p>
                <p className="text-sm text-yellow-600">Testing</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
