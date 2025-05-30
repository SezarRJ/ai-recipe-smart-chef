import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Mail, Send, Bell, Settings, Users, BarChart3, Eye, Edit, Trash2, Plus, Calendar, Clock, Target, TrendingUp, MessageSquare, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminCommunicationsPage = () => {
  const { toast } = useToast();

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Welcome Series',
      status: 'active',
      type: 'email',
      recipients: 1250,
      openRate: '24.5%',
      clickRate: '3.2%',
      scheduled: '2024-01-15',
      created: '2024-01-10'
    },
    {
      id: 2,
      name: 'Recipe of the Week',
      status: 'draft',
      type: 'push',
      recipients: 890,
      openRate: '18.7%',
      clickRate: '2.8%',
      scheduled: '2024-01-20',
      created: '2024-01-12'
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Welcome Email',
      type: 'email',
      category: 'onboarding',
      usage: 45,
      lastModified: '2024-01-10'
    },
    {
      id: 2,
      name: 'Recipe Notification',
      type: 'push',
      category: 'content',
      usage: 23,
      lastModified: '2024-01-08'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Recipe Added',
      message: 'Check out our latest Mediterranean recipe!',
      type: 'info' as const,
      status: 'sent',
      recipients: 1200,
      sent: '2024-01-15 10:30'
    },
    {
      id: 2,
      title: 'Weekly Challenge',
      message: 'Join this week\'s cooking challenge and win prizes!',
      type: 'info' as const,
      status: 'scheduled',
      recipients: 950,
      sent: '2024-01-16 09:00'
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email',
    subject: '',
    content: '',
    audience: 'all',
    schedule: 'now'
  });

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'email',
    category: 'general',
    subject: '',
    content: ''
  });

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as const,
    audience: 'all',
    schedule: 'now'
  });

  const analyticsData = {
    totalCampaigns: 24,
    activeCampaigns: 8,
    totalRecipients: 15420,
    avgOpenRate: '22.3%',
    avgClickRate: '3.1%',
    totalNotifications: 156,
    deliveryRate: '98.7%',
    unsubscribeRate: '0.8%'
  };

  const recentActivity = [
    { action: 'Campaign "Holiday Recipes" sent', timestamp: '2 hours ago', type: 'email' },
    { action: 'Push notification delivered to 1,200 users', timestamp: '4 hours ago', type: 'push' },
    { action: 'Email template "Welcome Series" updated', timestamp: '1 day ago', type: 'template' },
    { action: 'Campaign "Weekly Newsletter" scheduled', timestamp: '2 days ago', type: 'email' }
  ];

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const campaign = {
      id: campaigns.length + 1,
      ...newCampaign,
      status: 'draft',
      recipients: 0,
      openRate: '0%',
      clickRate: '0%',
      scheduled: new Date().toISOString().split('T')[0],
      created: new Date().toISOString().split('T')[0]
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({
      name: '',
      type: 'email',
      subject: '',
      content: '',
      audience: 'all',
      schedule: 'now'
    });

    toast({
      title: "Campaign Created",
      description: "Your campaign has been created successfully.",
    });
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const template = {
      id: templates.length + 1,
      ...newTemplate,
      usage: 0,
      lastModified: new Date().toISOString().split('T')[0]
    };

    setTemplates([...templates, template]);
    setNewTemplate({
      name: '',
      type: 'email',
      category: 'general',
      subject: '',
      content: ''
    });

    toast({
      title: "Template Created",
      description: "Your template has been created successfully.",
    });
  };

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const notification = {
      id: notifications.length + 1,
      ...newNotification,
      status: 'draft',
      recipients: 0,
      sent: ''
    };

    setNotifications([...notifications, notification]);
    setNewNotification({
      title: '',
      message: '',
      type: 'info' as const,
      audience: 'all',
      schedule: 'now'
    });

    toast({
      title: "Notification Created",
      description: "Your notification has been created successfully.",
    });
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast({
      title: "Campaign Deleted",
      description: "The campaign has been deleted successfully.",
    });
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: "Template Deleted",
      description: "The template has been deleted successfully.",
    });
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Notification Deleted",
      description: "The notification has been deleted successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: 'default',
      draft: 'secondary',
      sent: 'default',
      scheduled: 'outline'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      email: 'default',
      push: 'secondary',
      sms: 'outline'
    };
    return <Badge variant={variants[type] || 'secondary'}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
          <p className="text-gray-600 mt-1">Manage email campaigns, push notifications, and user communications</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Quick Message
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCampaigns}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">{analyticsData.activeCampaigns} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recipients</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalRecipients.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Delivery rate: {analyticsData.deliveryRate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.avgOpenRate}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Click rate: {analyticsData.avgClickRate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalNotifications}</p>
              </div>
              <Bell className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Unsubscribe: {analyticsData.unsubscribeRate}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="campaigns">Email Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="notifications">Push Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Email Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Email Campaigns</span>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Campaign
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                            {getStatusBadge(campaign.status)}
                            {getTypeBadge(campaign.type)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteCampaign(campaign.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Recipients</p>
                            <p className="font-medium">{campaign.recipients.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Open Rate</p>
                            <p className="font-medium">{campaign.openRate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Click Rate</p>
                            <p className="font-medium">{campaign.clickRate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Scheduled</p>
                            <p className="font-medium">{campaign.scheduled}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Campaign</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input
                      id="campaign-name"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      placeholder="Enter campaign name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaign-type">Type</Label>
                    <Select value={newCampaign.type} onValueChange={(value) => setNewCampaign({...newCampaign, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="campaign-subject">Subject</Label>
                    <Input
                      id="campaign-subject"
                      value={newCampaign.subject}
                      onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                      placeholder="Enter subject line"
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaign-content">Content</Label>
                    <Textarea
                      id="campaign-content"
                      value={newCampaign.content}
                      onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                      placeholder="Enter campaign content"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaign-audience">Audience</Label>
                    <Select value={newCampaign.audience} onValueChange={(value) => setNewCampaign({...newCampaign, audience: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active Users</SelectItem>
                        <SelectItem value="premium">Premium Users</SelectItem>
                        <SelectItem value="new">New Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateCampaign} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Email Templates</span>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Template
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <div key={template.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            {getTypeBadge(template.type)}
                            <Badge variant="outline">{template.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Usage Count</p>
                            <p className="font-medium">{template.usage}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Last Modified</p>
                            <p className="font-medium">{template.lastModified}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-type">Type</Label>
                    <Select value={newTemplate.type} onValueChange={(value) => setNewTemplate({...newTemplate, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="template-category">Category</Label>
                    <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="template-subject">Subject (Email only)</Label>
                    <Input
                      id="template-subject"
                      value={newTemplate.subject}
                      onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                      placeholder="Enter subject line"
                      disabled={newTemplate.type !== 'email'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-content">Content</Label>
                    <Textarea
                      id="template-content"
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                      placeholder="Enter template content"
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleCreateTemplate} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Push Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Push Notifications</span>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Notification
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                            {getStatusBadge(notification.status)}
                            <Badge variant={notification.type === 'info' ? 'default' : 'secondary'}>
                              {notification.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteNotification(notification.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{notification.message}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Recipients</p>
                            <p className="font-medium">{notification.recipients.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Status</p>
                            <p className="font-medium">{notification.status}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Sent</p>
                            <p className="font-medium">{notification.sent || 'Not sent'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send Notification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="notification-title">Title</Label>
                    <Input
                      id="notification-title"
                      value={newNotification.title}
                      onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                      placeholder="Enter notification title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notification-message">Message</Label>
                    <Textarea
                      id="notification-message"
                      value={newNotification.message}
                      onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                      placeholder="Enter notification message"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notification-audience">Audience</Label>
                    <Select value={newNotification.audience} onValueChange={(value) => setNewNotification({...newNotification, audience: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active Users</SelectItem>
                        <SelectItem value="premium">Premium Users</SelectItem>
                        <SelectItem value="new">New Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notification-schedule">Schedule</Label>
                    <Select value={newNotification.schedule} onValueChange={(value) => setNewNotification({...newNotification, schedule: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send Now</SelectItem>
                        <SelectItem value="schedule">Schedule for Later</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateNotification} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Enable email notifications for users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Allow marketing and promotional emails</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Double Opt-in</Label>
                    <p className="text-sm text-gray-500">Require email confirmation for subscriptions</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Enable push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Recipe Updates</Label>
                    <p className="text-sm text-gray-500">Notify about new recipes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Challenge Reminders</Label>
                    <p className="text-sm text-gray-500">Send cooking challenge reminders</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Open Rate</span>
                    <span className="font-semibold">22.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Click Rate</span>
                    <span className="font-semibold">3.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bounce Rate</span>
                    <span className="font-semibold">1.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Unsubscribe Rate</span>
                    <span className="font-semibold">0.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                      {getTypeBadge(activity.type)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCommunicationsPage;
