
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Users, MessageSquare, Flag, TrendingUp } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const mockCommunityPosts = [
  {
    id: 'POST-001',
    title: 'Amazing Mediterranean Recipe Collection',
    author: 'Chef Maria',
    content: 'Just shared my collection of authentic Mediterranean recipes...',
    likes: 245,
    comments: 38,
    shares: 15,
    status: 'published',
    createdAt: '2024-01-15',
    reported: false
  },
  {
    id: 'POST-002',
    title: 'Tips for Perfect Pasta',
    author: 'CookingEnthusiast',
    content: 'Here are my top 10 tips for making perfect pasta every time...',
    likes: 89,
    comments: 12,
    shares: 8,
    status: 'published',
    createdAt: '2024-01-14',
    reported: false
  },
  {
    id: 'POST-003',
    title: 'Inappropriate Content Report',
    author: 'RandomUser',
    content: 'This post contains inappropriate content...',
    likes: 2,
    comments: 1,
    shares: 0,
    status: 'flagged',
    createdAt: '2024-01-13',
    reported: true
  }
];

const AdminCommunityManagementPage = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState(mockCommunityPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewPost = (post: any) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  const handleModeratePost = (id: string, action: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === id 
          ? { ...post, status: action === 'approve' ? 'published' : 'removed' }
          : post
      )
    );
    toast({
      title: "Post Moderated",
      description: `Post has been ${action === 'approve' ? 'approved' : 'removed'} successfully.`,
    });
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-100 text-green-800',
      flagged: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      removed: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  const totalEngagement = posts.reduce((sum, post) => sum + post.likes + post.comments + post.shares, 0);
  const flaggedPosts = posts.filter(post => post.reported).length;

  return (
    <AdminPageWrapper title="Community Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Community Management</h1>
            <p className="text-muted-foreground">Manage community posts, moderation, and user interactions.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Announcement
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">{totalEngagement}</div>
                <div className="text-sm text-gray-600">Total Engagement</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">{flaggedPosts}</div>
                <div className="text-sm text-gray-600">Flagged Posts</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-purple-600">{posts.filter(p => p.status === 'published').length}</div>
                <div className="text-sm text-gray-600">Published Posts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search community posts..."
              className="pl-8 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Posts Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id} className={post.reported ? 'bg-red-50' : ''}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {post.content}
                      </div>
                      {post.reported && (
                        <Badge className="bg-red-100 text-red-800 mt-1">
                          <Flag className="h-3 w-3 mr-1" />
                          Reported
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div>❤️ {post.likes}</div>
                      <div>💬 {post.comments}</div>
                      <div>📤 {post.shares}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>{post.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewPost(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {post.status === 'flagged' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleModeratePost(post.id, 'approve')}
                            className="text-green-600"
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleModeratePost(post.id, 'remove')}
                            className="text-red-600"
                          >
                            Remove
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Post Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Post Details</DialogTitle>
              <DialogDescription>
                Review and moderate community post content.
              </DialogDescription>
            </DialogHeader>
            
            {selectedPost && (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <div className="font-medium">{selectedPost.title}</div>
                </div>
                <div>
                  <Label>Author</Label>
                  <div>{selectedPost.author}</div>
                </div>
                <div>
                  <Label>Content</Label>
                  <div className="bg-gray-50 p-3 rounded border">
                    {selectedPost.content}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Likes</Label>
                    <div className="text-lg font-semibold">{selectedPost.likes}</div>
                  </div>
                  <div>
                    <Label>Comments</Label>
                    <div className="text-lg font-semibold">{selectedPost.comments}</div>
                  </div>
                  <div>
                    <Label>Shares</Label>
                    <div className="text-lg font-semibold">{selectedPost.shares}</div>
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div>{getStatusBadge(selectedPost.status)}</div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              {selectedPost?.status === 'flagged' && (
                <>
                  <Button 
                    onClick={() => {
                      handleModeratePost(selectedPost.id, 'approve');
                      setDialogOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve Post
                  </Button>
                  <Button 
                    onClick={() => {
                      handleModeratePost(selectedPost.id, 'remove');
                      setDialogOpen(false);
                    }}
                    variant="destructive"
                  >
                    Remove Post
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminCommunityManagementPage;
