
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Filter, MoreHorizontal, Check, X, Eye, MessageSquare, AlertTriangle } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

const mockCommunityPosts = [
  {
    id: 'POST-001',
    type: 'comment',
    content: 'This recipe is amazing! I tried it last night and my family loved it.',
    author: 'Sarah Johnson',
    authorId: 'user123',
    postTitle: 'Mediterranean Chicken Bowl',
    status: 'approved',
    reportCount: 0,
    createdAt: '2023-09-20'
  },
  {
    id: 'POST-002',
    type: 'review',
    content: 'Terrible recipe, complete waste of ingredients and time.',
    author: 'Anonymous User',
    authorId: 'user456',
    postTitle: 'Vegan Pasta Salad',
    status: 'pending',
    reportCount: 3,
    createdAt: '2023-09-19'
  },
  {
    id: 'POST-003',
    type: 'question',
    content: 'Can I substitute almond flour for regular flour in this recipe?',
    author: 'Michael Chen',
    authorId: 'user789',
    postTitle: 'Chocolate Chip Cookies',
    status: 'approved',
    reportCount: 0,
    createdAt: '2023-09-18'
  }
];

const CommunityManagement = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState(mockCommunityPosts);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [postDialog, setPostDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moderationReason, setModerationReason] = useState('');
  const [moderationAction, setModerationAction] = useState<'approve' | 'reject' | 'remove'>('approve');

  const handleViewPost = (post: any) => {
    setSelectedPost(post);
    setPostDialog(true);
  };

  const handleModeratePost = (action: 'approve' | 'reject' | 'remove') => {
    setModerationAction(action);
  };

  const handleSubmitModeration = () => {
    if (!selectedPost) return;

    setPosts(prev => 
      prev.map(post => 
        post.id === selectedPost.id 
          ? { ...post, status: moderationAction === 'remove' ? 'removed' : moderationAction === 'approve' ? 'approved' : 'rejected' }
          : post
      )
    );

    const actionText = {
      approve: 'approved',
      reject: 'rejected', 
      remove: 'removed'
    }[moderationAction];

    toast({
      title: "Post Moderated",
      description: `The post has been ${actionText}.`,
    });

    setPostDialog(false);
    setModerationReason('');
    setSelectedPost(null);
  };

  const getStatusBadge = (status: string, reportCount: number = 0) => {
    if (reportCount > 2) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Reported ({reportCount})
      </Badge>;
    }

    const badges = {
      pending: <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>,
      approved: <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>,
      rejected: <Badge variant="destructive">Rejected</Badge>,
      removed: <Badge variant="destructive">Removed</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      comment: <Badge variant="outline" className="bg-blue-50 text-blue-700">Comment</Badge>,
      review: <Badge variant="outline" className="bg-purple-50 text-purple-700">Review</Badge>,
      question: <Badge variant="outline" className="bg-green-50 text-green-700">Question</Badge>
    };
    return badges[type as keyof typeof badges] || <Badge variant="outline">{type}</Badge>;
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Community Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Community Content Moderation</h1>
            <p className="text-muted-foreground">Manage user comments, reviews, and community posts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">{posts.filter(p => p.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{posts.filter(p => p.status === 'approved').length}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">{posts.filter(p => p.reportCount > 0).length}</div>
            <div className="text-sm text-gray-600">Reported</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-600">{posts.filter(p => p.status === 'removed').length}</div>
            <div className="text-sm text-gray-600">Removed</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
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
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Recipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.filter(post => post.status !== 'removed').map((post) => (
                <TableRow key={post.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleViewPost(post)}>
                  <TableCell className="max-w-xs">
                    <span className="truncate" title={post.content}>{post.content}</span>
                  </TableCell>
                  <TableCell>{getTypeBadge(post.type)}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell className="max-w-xs">
                    <span className="truncate" title={post.postTitle}>{post.postTitle}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(post.status, post.reportCount)}</TableCell>
                  <TableCell>{post.createdAt}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleViewPost(post)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewPost(post); handleModeratePost('approve'); }}>
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewPost(post); handleModeratePost('reject'); }}>
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewPost(post); handleModeratePost('remove'); }}>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={postDialog} onOpenChange={setPostDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Community Post Moderation
                {selectedPost && getTypeBadge(selectedPost.type)}
              </DialogTitle>
              <DialogDescription>
                Review and moderate community content
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Content</h4>
                <p className="text-sm text-gray-700">{selectedPost?.content}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Author:</span> {selectedPost?.author}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {selectedPost?.type}
                </div>
                <div>
                  <span className="font-medium">Recipe:</span> {selectedPost?.postTitle}
                </div>
                <div>
                  <span className="font-medium">Reports:</span> {selectedPost?.reportCount || 0}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Moderation Notes</label>
                <Textarea
                  placeholder="Add notes about your moderation decision..."
                  value={moderationReason}
                  onChange={(e) => setModerationReason(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setPostDialog(false)}>
                Cancel
              </Button>
              <Button 
                variant="outline" 
                className="text-green-600 hover:text-green-700"
                onClick={() => { handleModeratePost('approve'); handleSubmitModeration(); }}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button 
                variant="outline" 
                className="text-yellow-600 hover:text-yellow-700"
                onClick={() => { handleModeratePost('reject'); handleSubmitModeration(); }}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button 
                variant="destructive"
                onClick={() => { handleModeratePost('remove'); handleSubmitModeration(); }}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default CommunityManagement;
