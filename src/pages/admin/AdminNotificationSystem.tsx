
import React, { useState } from 'react';
import { Search, Filter, Plus, Send, Calendar, Users, Bell, Trash2, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const mockNotifications = [
  {
    id: '1',
    title: 'New Recipe Collection Available',
    message: 'Check out our latest Mediterranean recipe collection featuring 20 new dishes!',
    type: 'info',
    targetUsers: 'all',
    scheduled: false,
    status: 'sent',
    createdAt: '2023-09-20',
    sentCount: 1250
  },
  {
    id: '2',
    title: 'Premium Feature Update',
    message: 'We have added new meal planning features for premium subscribers.',
    type: 'success',
    targetUsers: 'premium',
    scheduled: false,
    status: 'sent',
    createdAt: '2023-09-19',
    sentCount: 150
  },
  {
    id: '3',
    title: 'Maintenance Notice',
    message: 'The app will be under maintenance from 2 AM to 4 AM UTC tomorrow.',
    type: 'warning',
    targetUsers: 'all',
    scheduled: true,
    scheduledDate: '2023-09-21',
    status: 'draft',
    createdAt: '2023-09-20',
    sentCount: 0
  }
];

const AdminNotificationSystem = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [createDialog, setCreateDialog] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    targetUsers: 'all',
    scheduled: false,
    scheduledDate: ''
  });

  const handleCreateNotification = () => {
    const notification = {
      id: Date.now().toString(),
      ...newNotification,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      sentCount: 0
    };

    setNotifications(prev => [notification, ...prev]);
    
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      targetUsers: 'all',
      scheduled: false,
      scheduledDate: ''
    });

    setCreateDialog(false);
    toast.success('Notification created successfully!');
  };

  const handleSendNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { 
              ...notification, 
              status: 'sent',
              sentCount: notification.targetUsers === 'all' ? 1250 : notification.targetUsers === 'premium' ? 150 : 50
            }
          : notification
      )
    );
    toast.success('Notification sent successfully!');
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.success('Notification deleted successfully!');
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      info: <Badge variant="outline" className="bg-blue-50 text-blue-700">Info</Badge>,
      success: <Badge variant="outline" className="bg-green-50 text-green-700">Success</Badge>,
      warning: <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Warning</Badge>,
      error: <Badge variant="destructive">Error</Badge>
    };
    return badges[type as keyof typeof badges] || <Badge variant="outline">{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: <Badge variant="outline" className="bg-gray-50 text-gray-700">Draft</Badge>,
      sent: <Badge variant="outline" className="bg-green-50 text-green-700">Sent</Badge>,
      scheduled: <Badge variant="outline" className="bg-blue-50 text-blue-700">Scheduled</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getTargetBadge = (target: string) => {
    const badges = {
      all: <Badge variant="outline">All Users</Badge>,
      premium: <Badge variant="outline" className="bg-purple-50 text-purple-700">Premium</Badge>,
      specific: <Badge variant="outline" className="bg-orange-50 text-orange-700">Specific</Badge>
    };
    return badges[target as keyof typeof badges] || <Badge variant="outline">{target}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Notification System</h1>
          <p className="text-muted-foreground">Send notifications and announcements to users.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={createDialog} onOpenChange={setCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
                <DialogDescription>
                  Send a notification to your users.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Notification title..."
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Notification message..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select 
                      value={newNotification.type} 
                      onValueChange={(value) => setNewNotification(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="target">Target Users</Label>
                    <Select 
                      value={newNotification.targetUsers} 
                      onValueChange={(value) => setNewNotification(prev => ({ ...prev, targetUsers: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="premium">Premium Users</SelectItem>
                        <SelectItem value="specific">Specific Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="scheduled"
                    checked={newNotification.scheduled}
                    onCheckedChange={(checked) => setNewNotification(prev => ({ ...prev, scheduled: checked }))}
                  />
                  <Label htmlFor="scheduled">Schedule for later</Label>
                </div>
                {newNotification.scheduled && (
                  <div>
                    <Label htmlFor="scheduledDate">Scheduled Date</Label>
                    <Input
                      id="scheduledDate"
                      type="datetime-local"
                      value={newNotification.scheduledDate}
                      onChange={(e) => setNewNotification(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNotification}>
                  Create Notification
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{notifications.filter(n => n.status === 'draft').length}</div>
          <div className="text-sm text-gray-600">Draft</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{notifications.filter(n => n.status === 'sent').length}</div>
          <div className="text-sm text-gray-600">Sent</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">{notifications.filter(n => n.scheduled).length}</div>
          <div className="text-sm text-gray-600">Scheduled</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">{notifications.reduce((sum, n) => sum + n.sentCount, 0)}</div>
          <div className="text-sm text-gray-600">Total Sent</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-8 w-full md:w-80"
          />
        </div>
        <div className="flex items-center gap-2 self-end">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent Count</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {notification.message}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getTypeBadge(notification.type)}</TableCell>
                <TableCell>{getTargetBadge(notification.targetUsers)}</TableCell>
                <TableCell>{getStatusBadge(notification.status)}</TableCell>
                <TableCell>{notification.sentCount.toLocaleString()}</TableCell>
                <TableCell>{notification.createdAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {notification.status === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendNotification(notification.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{notifications.length}</strong> notifications
        </p>
      </div>
    </div>
  );
};

export default AdminNotificationSystem;
