
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Flag,
  Eye,
  Ban,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  status: 'active' | 'flagged' | 'banned';
  created_at: string;
}

export default function CommunityPage() {
  const [posts] = useState<CommunityPost[]>([
    {
      id: '1',
      title: 'Amazing pasta recipe!',
      content: 'Just tried this new pasta recipe and it was incredible...',
      author: 'ChefMaria',
      likes: 45,
      comments: 12,
      status: 'active',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Healthy breakfast ideas',
      content: 'Looking for some healthy breakfast options...',
      author: 'HealthyEater',
      likes: 23,
      comments: 8,
      status: 'active',
      created_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      title: 'Inappropriate content example',
      content: 'This post contains inappropriate content...',
      author: 'BadUser',
      likes: 2,
      comments: 15,
      status: 'flagged',
      created_at: '2024-01-13T16:45:00Z'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'flagged': 'destructive',
      'banned': 'secondary'
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  const stats = {
    totalPosts: posts.length,
    activePosts: posts.filter(p => p.status === 'active').length,
    flaggedPosts: posts.filter(p => p.status === 'flagged').length,
    totalUsers: 1547
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Management</h1>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Create Announcement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{stats.totalPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Posts</p>
                <p className="text-2xl font-bold">{stats.activePosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Flag className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Flagged Posts</p>
                <p className="text-2xl font-bold">{stats.flaggedPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Community Posts</CardTitle>
          <div className="flex gap-4">
            <Input placeholder="Search posts..." className="max-w-md" />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {post.content}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>
                    {new Date(post.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {post.status === 'flagged' && (
                        <>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
