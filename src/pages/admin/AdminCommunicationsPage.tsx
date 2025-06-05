
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  Send, 
  Mail,
  Bell,
  Users,
  Calendar,
  BarChart3,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface Communication {
  id: string;
  title: string;
  message: string;
  type: 'email' | 'push' | 'in_app' | 'sms';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  target_audience: 'all' | 'premium' | 'free' | 'inactive';
  scheduled_date?: string;
  sent_date?: string;
  recipients_count: number;
  open_rate?: number;
  click_rate?: number;
  created_at: string;
}

export default function AdminCommunicationsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [communications, setCommunications] = useState<Communication[]>([
    {
      id: '1',
      title: 'Welcome to WasfahAI Premium',
      message: 'Thank you for upgrading to premium!',
      type: 'email',
      status: 'sent',
      target_audience: 'premium',
      sent_date: '2024-01-15',
      recipients_count: 1250,
      open_rate: 85,
      click_rate: 23,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      title: 'New Recipe Collection Available',
      message: 'Check out our new Mediterranean collection',
      type: 'push',
      status: 'sent',
      target_audience: 'all',
      sent_date: '2024-01-20',
      recipients_count: 5400,
      open_rate: 72,
      click_rate: 15,
      created_at: '2024-01-20'
    },
    {
      id: '3',
      title: 'Weekly Recipe Digest',
      message: 'Your personalized recipe recommendations',
      type: 'email',
      status: 'scheduled',
      target_audience: 'all',
      scheduled_date: '2024-06-10',
      recipients_count: 6200,
      created_at: '2024-06-05'
    }
  ]);

  const getTypeBadge = (type: string) => {
    const colors = {
      'email': 'bg-blue-100 text-blue-800',
      'push': 'bg-green-100 text-green-800',
      'in_app': 'bg-purple-100 text-purple-800',
      'sms': 'bg-orange-100 text-orange-800'
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'scheduled': 'bg-yellow-100 text-yellow-800',
      'sent': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  const stats = {
    totalCommunications: communications.length,
    sentCommunications: communications.filter(c => c.status === 'sent').length,
    scheduledCommunications: communications.filter(c => c.status === 'scheduled').length,
    avgOpenRate: Math.round(communications.reduce((sum, c) => sum + (c.open_rate || 0), 0) / communications.length)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Communications Management</h1>
          <p className="text-gray-600">Manage email campaigns, push notifications, and user communications</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Create Communication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Communication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Communication title" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                      <SelectItem value="in_app">In-App Message</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="premium">Premium Users</SelectItem>
                      <SelectItem value="free">Free Users</SelectItem>
                      <SelectItem value="inactive">Inactive Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="schedule">Schedule (Optional)</Label>
                  <Input id="schedule" type="datetime-local" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Create & Send</Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Communications</p>
                <p className="text-2xl font-bold">{stats.totalCommunications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Sent</p>
                <p className="text-2xl font-bold">{stats.sentCommunications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Scheduled</p>
                <p className="text-2xl font-bold">{stats.scheduledCommunications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Avg Open Rate</p>
                <p className="text-2xl font-bold">{stats.avgOpenRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Communications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {communications.map((comm) => (
                    <TableRow key={comm.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{comm.title}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{comm.message}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(comm.type)}</TableCell>
                      <TableCell>{getStatusBadge(comm.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{comm.target_audience}</Badge>
                      </TableCell>
                      <TableCell>{comm.recipients_count.toLocaleString()}</TableCell>
                      <TableCell>
                        {comm.open_rate ? `${comm.open_rate}%` : '-'}
                      </TableCell>
                      <TableCell>
                        {comm.sent_date || comm.scheduled_date || comm.created_at}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
