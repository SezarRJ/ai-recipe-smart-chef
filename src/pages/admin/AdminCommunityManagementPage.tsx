
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Users, MessageCircle, Flag, Shield, Star } from 'lucide-react';
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

const mockCommunityData = [
  {
    id: 'COM-001',
    type: 'post',
    title: 'Amazing Italian Pasta Recipe',
    author: 'Chef Sarah',
    status: 'approved',
    reports: 0,
    likes: 24,
    comments: 8,
    createdAt: '2024-01-15'
  },
  {
    id: 'COM-002',
    type: 'comment',
    title: 'This recipe is terrible!',
    author: 'User123',
    status: 'reported',
    reports: 3,
    likes: 0,
    comments: 0,
    createdAt: '2024-01-14'
  },
  {
    id: 'COM-003',
    type: 'review',
    title: '5-star review for Chocolate Cake',
    author: 'Maria Garcia',
    status: 'approved',
    reports: 0,
    likes: 15,
    comments: 2,
    createdAt: '2024-01-13'
  }
];

const AdminCommunityManagementPage = () => {
  const [content] = useState(mockCommunityData);
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeBadge = (type: string) => {
    const variants = {
      post: 'bg-blue-100 text-blue-800',
      comment: 'bg-green-100 text-green-800',
      review: 'bg-purple-100 text-purple-800'
    };
    return <Badge className={variants[type as keyof typeof variants]}>{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      reported: 'bg-red-100 text-red-800',
      blocked: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const filteredContent = content.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Community Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Community Management</h1>
            <p className="text-muted-foreground">Moderate user-generated content and manage community interactions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{content.length}</div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">{content.filter(c => c.status === 'reported').length}</div>
                <div className="text-sm text-gray-600">Reported</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">{content.filter(c => c.status === 'approved').length}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-purple-600">1,247</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                  <TableCell>{getTypeBadge(item.type)}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <Badge variant={item.reports > 0 ? "destructive" : "secondary"}>
                      {item.reports}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-3 w-3" /> {item.likes}
                      <MessageCircle className="h-3 w-3" /> {item.comments}
                    </div>
                  </TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Moderate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminCommunityManagementPage;
