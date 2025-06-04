
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
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

const mockTickets = [
  {
    id: 'TKT-001',
    subject: 'Cannot access premium recipes',
    user: 'Sarah Johnson',
    priority: 'high',
    status: 'open',
    category: 'subscription',
    createdAt: '2024-01-15 10:30',
    lastUpdate: '2024-01-15 14:20'
  },
  {
    id: 'TKT-002',
    subject: 'Recipe upload failing',
    user: 'Ahmed Hassan',
    priority: 'medium',
    status: 'in_progress',
    category: 'technical',
    createdAt: '2024-01-14 16:45',
    lastUpdate: '2024-01-15 09:15'
  },
  {
    id: 'TKT-003',
    subject: 'Request for recipe deletion',
    user: 'Maria Garcia',
    priority: 'low',
    status: 'resolved',
    category: 'content',
    createdAt: '2024-01-13 11:20',
    lastUpdate: '2024-01-14 13:30'
  }
];

const AdminSupportTicketsPage = () => {
  const [tickets] = useState(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    return <Badge className={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-red-100 text-red-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status.replace('_', ' ')}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      technical: 'bg-purple-100 text-purple-800',
      subscription: 'bg-blue-100 text-blue-800',
      content: 'bg-green-100 text-green-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[category as keyof typeof variants]}>{category}</Badge>;
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Support Tickets">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Support Tickets</h1>
            <p className="text-muted-foreground">Manage customer support requests and issues.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{tickets.length}</div>
                <div className="text-sm text-gray-600">Total Tickets</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">{tickets.filter(t => t.status === 'open').length}</div>
                <div className="text-sm text-gray-600">Open</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'in_progress').length}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'resolved').length}</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.user}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getCategoryBadge(ticket.category)}</TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
                  <TableCell>{ticket.lastUpdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSupportTicketsPage;
