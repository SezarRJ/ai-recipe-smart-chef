import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Filter, MoreHorizontal, RefreshCw, MessageSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';

const mockTickets = [
  {
    id: 'TKT-001',
    subject: 'Recipe not loading properly',
    description: 'When I try to open the Mediterranean Chicken recipe, the page keeps loading but never shows the content.',
    userName: 'Sarah Johnson',
    userId: 'user123',
    priority: 'medium',
    status: 'open',
    createdAt: '2023-09-20',
    updatedAt: '2023-09-20',
    assignedTo: null
  },
  {
    id: 'TKT-002',
    subject: 'Payment issue with subscription',
    description: 'I was charged twice for my premium subscription this month. Please help resolve this billing issue.',
    userName: 'Michael Chen',
    userId: 'user456',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2023-09-19',
    updatedAt: '2023-09-20',
    assignedTo: 'Admin User'
  },
  {
    id: 'TKT-003',
    subject: 'Feature request: Meal planning',
    description: 'It would be great if you could add a weekly meal planning feature to help organize recipes.',
    userName: 'Emily Rodriguez',
    userId: 'user789',
    priority: 'low',
    status: 'open',
    createdAt: '2023-09-18',
    updatedAt: '2023-09-18',
    assignedTo: null
  },
  {
    id: 'TKT-004',
    subject: 'App crashes when scanning ingredients',
    description: 'The app crashes every time I try to use the ingredient scanning feature on my iPhone.',
    userName: 'David Kim',
    userId: 'user999',
    priority: 'urgent',
    status: 'open',
    createdAt: '2023-09-17',
    updatedAt: '2023-09-17',
    assignedTo: null
  }
];

export default function AdminTicketSystem() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [ticketDialog, setTicketDialog] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setTicketDialog(true);
  };

  const handleUpdateTicket = () => {
    if (!selectedTicket) return;

    // Validate required fields
    if (!newStatus) {
      toast({
        title: "Validation Error",
        description: "Please select a status for the ticket.",
        variant: "destructive",
      });
      return;
    }

    if (responseText.trim()) {
      toast({
        title: "Response Sent",
        description: `Response sent to ${selectedTicket.userName}`,
      });
    }

    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === selectedTicket.id 
          ? { 
              ...ticket, 
              status: newStatus,
              updatedAt: new Date().toISOString().split('T')[0],
              assignedTo: newStatus === 'in-progress' ? 'Admin User' : newStatus === 'resolved' || newStatus === 'closed' ? ticket.assignedTo : 'Admin User'
            }
          : ticket
      )
    );

    toast({
      title: "Ticket Updated",
      description: `Ticket ${newStatus} successfully!`,
    });

    setTicketDialog(false);
    setResponseText('');
    setSelectedTicket(null);
  };

  const handleAssignToMe = (ticket: any) => {
    setTickets(prev => 
      prev.map(t => 
        t.id === ticket.id 
          ? { ...t, assignedTo: 'Admin User', status: 'in-progress' }
          : t
      )
    );
    toast({
      title: "Ticket Assigned",
      description: "Ticket assigned to you",
    });
  };

  const handleMarkUrgent = (ticket: any) => {
    setTickets(prev => 
      prev.map(t => 
        t.id === ticket.id 
          ? { ...t, priority: 'urgent' }
          : t
      )
    );
    toast({
      title: "Priority Updated",
      description: "Ticket marked as urgent",
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      open: <Badge variant="outline" className="bg-blue-50 text-blue-700">Open</Badge>,
      'in-progress': <Badge variant="outline" className="bg-yellow-50 text-yellow-700">In Progress</Badge>,
      resolved: <Badge variant="outline" className="bg-green-50 text-green-700">Resolved</Badge>,
      closed: <Badge variant="outline" className="bg-gray-50 text-gray-700">Closed</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      low: <Badge variant="outline" className="bg-gray-50 text-gray-700">Low</Badge>,
      medium: <Badge variant="outline" className="bg-blue-50 text-blue-700">Medium</Badge>,
      high: <Badge variant="outline" className="bg-orange-50 text-orange-700">High</Badge>,
      urgent: <Badge variant="destructive">Urgent</Badge>
    };
    return badges[priority as keyof typeof badges] || <Badge variant="outline">{priority}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Support Tickets">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Support Tickets</h1>
            <p className="text-muted-foreground">Manage and resolve user support requests.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{tickets.filter(t => t.status === 'open').length}</div>
            <div className="text-sm text-gray-600">Open Tickets</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'in-progress').length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">{tickets.filter(t => t.priority === 'urgent').length}</div>
            <div className="text-sm text-gray-600">Urgent</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'resolved').length}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              className="pl-8 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleOpenTicket(ticket)}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(ticket.priority)}
                      <span className="truncate" title={ticket.subject}>{ticket.subject}</span>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.userName}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenTicket(ticket)}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleAssignToMe(ticket); }}>
                          Assign to Me
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleMarkUrgent(ticket); }}>
                          Mark as Urgent
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={ticketDialog} onOpenChange={setTicketDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedTicket?.id} - {selectedTicket?.subject}
                {selectedTicket && getPriorityIcon(selectedTicket.priority)}
              </DialogTitle>
              <DialogDescription>
                Submitted by {selectedTicket?.userName} on {selectedTicket?.createdAt}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-700">{selectedTicket?.description}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Ticket Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">User ID:</span> {selectedTicket?.userId}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {selectedTicket?.createdAt}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span> {selectedTicket?.updatedAt}
                  </div>
                  <div>
                    <span className="font-medium">Assigned To:</span> {selectedTicket?.assignedTo || 'Unassigned'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Priority</label>
                  <div className="mt-1">
                    {selectedTicket && getPriorityBadge(selectedTicket.priority)}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Response</label>
                <Textarea
                  placeholder="Type your response to the user..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTicketDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTicket}>
                Update Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{filteredTickets.length}</strong> of <strong>{tickets.length}</strong> tickets
          </p>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
