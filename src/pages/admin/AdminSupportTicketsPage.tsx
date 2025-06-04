
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
    id: 'TICK-001',
    subject: 'Cannot access premium features',
    user: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    status: 'open',
    priority: 'high',
    created: '2024-01-15 14:30:00',
    category: 'billing'
  },
  {
    id: 'TICK-002',
    subject: 'Recipe not loading properly',
    user: 'Fatima Ali',
    email: 'fatima@example.com',
    status: 'in_progress',
    priority: 'medium',
    created: '2024-01-15 13:15:00',
    category: 'technical'
  },
  {
    id: 'TICK-003',
    subject: 'Feature request: Dark mode',
    user: 'Omar Khaled',
    email: 'omar@example.com',
    status: 'resolved',
    priority: 'low',
    created: '2024-01-14 16:45:00',
    category: 'feature'
  }
];

const AdminSupportTicketsPage = () => {
  const [tickets] = useState(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-red-100 text-red-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status.replace('_', ' ')}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return <Badge variant="outline" className={variants[priority as keyof typeof variants]}>{priority}</Badge>;
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
            <div className="text-2xl font-bold text-red-600">{tickets.filter(t => t.status === 'open').length}</div>
            <div className="text-sm text-gray-600">Open</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'in_progress').length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'resolved').length}</div>
            <div className="text-sm text-gray-600">Resolved</div>
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
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.user}</div>
                      <div className="text-sm text-gray-500">{ticket.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell className="text-sm text-gray-500">{ticket.created}</TableCell>
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
