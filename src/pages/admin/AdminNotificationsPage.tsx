
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Bell, Send, Users, Settings, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockNotifications = [
  {
    id: 'NOTIF-001',
    title: 'New Recipe Weekly Digest',
    type: 'promotional',
    status: 'sent',
    recipients: 1250,
    sentDate: '2024-01-15 10:00:00',
    openRate: '24.5%'
  },
  {
    id: 'NOTIF-002',
    title: 'System Maintenance Alert',
    type: 'system',
    status: 'scheduled',
    recipients: 2340,
    sentDate: '2024-01-16 09:00:00',
    openRate: 'N/A'
  },
  {
    id: 'NOTIF-003',
    title: 'Welcome to Premium',
    type: 'transactional',
    status: 'sent',
    recipients: 45,
    sentDate: '2024-01-14 15:30:00',
    openRate: '67.8%'
  }
];

const AdminNotificationsPage = () => {
  const [notifications] = useState(mockNotifications);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'promotional'
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800',
      failed: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      promotional: 'bg-purple-100 text-purple-800',
      system: 'bg-orange-100 text-orange-800',
      transactional: 'bg-blue-100 text-blue-800'
    };
    return <Badge variant="outline" className={variants[type as keyof typeof variants]}>{type}</Badge>;
  };

  return (
    <AdminPageWrapper title="Notifications">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <p className="text-muted-foreground">Manage push notifications, emails, and system alerts.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Notification
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.reduce((sum, n) => sum + (n.status === 'sent' ? n.recipients : 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28.4%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,340</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+5.4%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter(n => n.status === 'scheduled').length}
              </div>
              <p className="text-xs text-muted-foreground">Next: Tomorrow 9 AM</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="notifications">
          <TabsList>
            <TabsTrigger value="notifications">All Notifications</TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Sent Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.title}</TableCell>
                        <TableCell>{getTypeBadge(notification.type)}</TableCell>
                        <TableCell>{getStatusBadge(notification.status)}</TableCell>
                        <TableCell>{notification.recipients.toLocaleString()}</TableCell>
                        <TableCell>{notification.openRate}</TableCell>
                        <TableCell className="text-sm text-gray-500">{notification.sentDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compose">
            <Card>
              <CardHeader>
                <CardTitle>Create New Notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Notification title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Notification message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button>Send Now</Button>
                  <Button variant="outline">Schedule</Button>
                  <Button variant="outline">Save Draft</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Notification settings and preferences coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminNotificationsPage;
