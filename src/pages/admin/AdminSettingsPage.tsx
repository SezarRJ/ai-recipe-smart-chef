
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Users, Shield, Mail, Database, Wrench,
  Globe, Clock, Key, UserCheck, AlertTriangle, 
  Server, TestTube, Calendar, HardDrive, Lock
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);

  const [settings, setSettings] = useState({
    // General settings
    siteName: 'WasfahAI',
    siteDescription: 'AI-powered recipe and cooking platform',
    defaultLanguage: 'en',
    defaultUnits: 'metric',
    timezone: 'UTC',
    
    // User settings
    allowRegistration: true,
    requireEmailVerification: true,
    enableSocialLogin: false,
    autoDeleteInactiveUsers: false,
    inactiveUserDays: 90,
    
    // Security settings
    require2FA: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    enableIPBlocking: true,
    autoBlockSuspiciousIPs: true,
    
    // Email settings
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    smtpSecure: true,
    fromEmail: '',
    fromName: 'WasfahAI',
    
    // Backup settings
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    backupLocation: 'local',
    
    // Advanced settings
    apiRateLimit: 1000,
    debugMode: false,
    maintenanceMode: false,
    enableCaching: true,
    cacheTimeout: 3600,
    logLevel: 'info'
  });

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings Saved",
        description: `${section} settings have been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const testEmailConnection = async () => {
    setTestingEmail(true);
    try {
      // Simulate email test
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Email Test Successful",
        description: "SMTP connection is working correctly.",
      });
    } catch (error) {
      toast({
        title: "Email Test Failed",
        description: "Could not connect to SMTP server.",
        variant: "destructive",
      });
    } finally {
      setTestingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Super Admin Only
        </Badge>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Configure basic site settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select value={settings.defaultLanguage} onValueChange={(value) => setSettings({...settings, defaultLanguage: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="tr">Türkçe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultUnits">Default Units</Label>
                  <Select value={settings.defaultUnits} onValueChange={(value) => setSettings({...settings, defaultUnits: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric</SelectItem>
                      <SelectItem value="imperial">Imperial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Asia/Dubai">Dubai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => handleSave('General')} disabled={loading}>
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Settings */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Configure user registration and account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow User Registration</Label>
                    <p className="text-sm text-gray-500">Enable new users to create accounts</p>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => setSettings({...settings, allowRegistration: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-gray-500">Users must verify their email before accessing the platform</p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => setSettings({...settings, requireEmailVerification: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Social Login</Label>
                    <p className="text-sm text-gray-500">Allow login with Google, Facebook, etc.</p>
                  </div>
                  <Switch
                    checked={settings.enableSocialLogin}
                    onCheckedChange={(checked) => setSettings({...settings, enableSocialLogin: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Delete Inactive Users</Label>
                    <p className="text-sm text-gray-500">Automatically remove users who haven't logged in</p>
                  </div>
                  <Switch
                    checked={settings.autoDeleteInactiveUsers}
                    onCheckedChange={(checked) => setSettings({...settings, autoDeleteInactiveUsers: checked})}
                  />
                </div>

                {settings.autoDeleteInactiveUsers && (
                  <div className="space-y-2">
                    <Label htmlFor="inactiveUserDays">Days before deletion</Label>
                    <Input
                      id="inactiveUserDays"
                      type="number"
                      value={settings.inactiveUserDays}
                      onChange={(e) => setSettings({...settings, inactiveUserDays: parseInt(e.target.value)})}
                      className="w-32"
                    />
                  </div>
                )}
              </div>

              <Button onClick={() => handleSave('User')} disabled={loading}>
                Save User Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure authentication and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Force all users to enable 2FA</p>
                  </div>
                  <Switch
                    checked={settings.require2FA}
                    onCheckedChange={(checked) => setSettings({...settings, require2FA: checked})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={settings.lockoutDuration}
                    onChange={(e) => setSettings({...settings, lockoutDuration: parseInt(e.target.value)})}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable IP Blocking</Label>
                    <p className="text-sm text-gray-500">Block suspicious IP addresses</p>
                  </div>
                  <Switch
                    checked={settings.enableIPBlocking}
                    onCheckedChange={(checked) => setSettings({...settings, enableIPBlocking: checked})}
                  />
                </div>

                {settings.enableIPBlocking && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Block Suspicious IPs</Label>
                      <p className="text-sm text-gray-500">Automatically block IPs with suspicious activity</p>
                    </div>
                    <Switch
                      checked={settings.autoBlockSuspiciousIPs}
                      onCheckedChange={(checked) => setSettings({...settings, autoBlockSuspiciousIPs: checked})}
                    />
                  </div>
                )}
              </div>

              <Button onClick={() => handleSave('Security')} disabled={loading}>
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>Configure SMTP settings for email delivery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings({...settings, smtpPort: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) => setSettings({...settings, smtpUsername: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Use Secure Connection (TLS/SSL)</Label>
                  <p className="text-sm text-gray-500">Enable encrypted email transmission</p>
                </div>
                <Switch
                  checked={settings.smtpSecure}
                  onCheckedChange={(checked) => setSettings({...settings, smtpSecure: checked})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.fromEmail}
                    onChange={(e) => setSettings({...settings, fromEmail: e.target.value})}
                    placeholder="noreply@wasfahai.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.fromName}
                    onChange={(e) => setSettings({...settings, fromName: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave('Email')} disabled={loading}>
                  Save Email Settings
                </Button>
                <Button 
                  variant="outline" 
                  onClick={testEmailConnection} 
                  disabled={testingEmail}
                  className="flex items-center gap-2"
                >
                  <TestTube className="h-4 w-4" />
                  {testingEmail ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Backup Settings
              </CardTitle>
              <CardDescription>Configure automatic backups and data retention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Auto-Backup</Label>
                  <p className="text-sm text-gray-500">Automatically backup system data</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
                />
              </div>

              {settings.autoBackup && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backupRetention">Retention (days)</Label>
                      <Input
                        id="backupRetention"
                        type="number"
                        value={settings.backupRetention}
                        onChange={(e) => setSettings({...settings, backupRetention: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backupLocation">Backup Location</Label>
                    <Select value={settings.backupLocation} onValueChange={(value) => setSettings({...settings, backupLocation: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="aws">Amazon S3</SelectItem>
                        <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                        <SelectItem value="azure">Azure Blob Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button onClick={() => handleSave('Backup')} disabled={loading}>
                Save Backup Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>Configure advanced system options and performance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                <Input
                  id="apiRateLimit"
                  type="number"
                  value={settings.apiRateLimit}
                  onChange={(e) => setSettings({...settings, apiRateLimit: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-gray-500">Enable detailed error logging</p>
                  </div>
                  <Switch
                    checked={settings.debugMode}
                    onCheckedChange={(checked) => setSettings({...settings, debugMode: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Temporarily disable user access
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Caching</Label>
                    <p className="text-sm text-gray-500">Improve performance with caching</p>
                  </div>
                  <Switch
                    checked={settings.enableCaching}
                    onCheckedChange={(checked) => setSettings({...settings, enableCaching: checked})}
                  />
                </div>

                {settings.enableCaching && (
                  <div className="space-y-2">
                    <Label htmlFor="cacheTimeout">Cache Timeout (seconds)</Label>
                    <Input
                      id="cacheTimeout"
                      type="number"
                      value={settings.cacheTimeout}
                      onChange={(e) => setSettings({...settings, cacheTimeout: parseInt(e.target.value)})}
                      className="w-32"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logLevel">Log Level</Label>
                <Select value={settings.logLevel} onValueChange={(value) => setSettings({...settings, logLevel: value})}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => handleSave('Advanced')} disabled={loading}>
                Save Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
