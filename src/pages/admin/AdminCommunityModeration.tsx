
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, RefreshCw, Eye, Trash2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
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
import { toast } from 'sonner';

const mockComments = [
  {
    id: '1',
    content: 'This recipe is amazing! I tried it last night and my family loved it.',
    userName: 'Sarah Johnson',
    userId: 'user123',
    postTitle: 'Mediterranean Chicken Bowl',
    status: 'approved',
    reportCount: 0,
    createdAt: '2023-09-20'
  },
  {
    id: '2',
    content: 'This is terrible. Complete waste of time and ingredients.',
    userName: 'Anonymous User',
    userId: 'user456',
    postTitle: 'Vegan Pasta Salad',
    status: 'pending',
    reportCount: 3,
    createdAt: '2023-09-19'
  },
  {
    id: '3',
    content: 'Great recipe! Could you share the nutritional information?',
    userName: 'Michael Chen',
    userId: 'user789',
    postTitle: 'Quinoa Power Bowl',
    status: 'approved',
    reportCount: 0,
    createdAt: '2023-09-18'
  },
  {
    id: '4',
    content: 'This looks disgusting and unhealthy. Why would anyone eat this?',
    userName: 'TrollUser123',
    userId: 'user999',
    postTitle: 'Chocolate Avocado Mousse',
    status: 'pending',
    reportCount: 5,
    createdAt: '2023-09-17'
  }
];

const AdminCommunityModeration = () => {
  const [comments, setComments] = useState(mockComments);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [moderationDialog, setModerationDialog] = useState(false);
  const [moderationAction, setModerationAction] = useState<'approve' | 'reject' | 'delete'>('approve');
  const [moderationReason, setModerationReason] = useState('');

  const handleModerateComment = (comment: any, action: 'approve' | 'reject' | 'delete') => {
    setSelectedComment(comment);
    setModerationAction(action);
    setModerationDialog(true);
  };

  const handleSubmitModeration = () => {
    if (!selectedComment) return;

    setComments(prev => 
      prev.map(comment => 
        comment.id === selectedComment.id 
          ? { 
              ...comment, 
              status: moderationAction === 'delete' ? 'deleted' : moderationAction === 'approve' ? 'approved' : 'rejected'
            }
          : comment
      )
    );

    const actionText = {
      approve: 'approved',
      reject: 'rejected',
      delete: 'deleted'
    }[moderationAction];

    toast.success(`Comment ${actionText} successfully!`);

    setModerationDialog(false);
    setModerationReason('');
    setSelectedComment(null);
  };

  const getStatusBadge = (status: string, reportCount: number = 0) => {
    if (reportCount > 2) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Reported ({reportCount})
      </Badge>;
    }

    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Rejected</Badge>;
      case 'deleted':
        return <Badge variant="destructive">Deleted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredComments = comments.filter(comment => comment.status !== 'deleted');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Community Moderation</h1>
          <p className="text-muted-foreground">Manage and moderate community comments and discussions.</p>
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
          <div className="text-2xl font-bold text-blue-600">{comments.filter(c => c.status === 'pending').length}</div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{comments.filter(c => c.status === 'approved').length}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-red-600">{comments.filter(c => c.reportCount > 0).length}</div>
          <div className="text-sm text-gray-600">Reported</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-600">{comments.filter(c => c.status === 'deleted').length}</div>
          <div className="text-sm text-gray-600">Deleted</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search comments..."
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
              <TableHead>Comment</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="max-w-xs">
                  <div className="truncate" title={comment.content}>
                    {comment.content}
                  </div>
                </TableCell>
                <TableCell>{comment.userName}</TableCell>
                <TableCell>{comment.postTitle}</TableCell>
                <TableCell>{getStatusBadge(comment.status, comment.reportCount)}</TableCell>
                <TableCell>{comment.createdAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleModerateComment(comment, 'approve')}
                      disabled={comment.status === 'approved'}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleModerateComment(comment, 'reject')}
                      disabled={comment.status === 'rejected'}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleModerateComment(comment, 'delete')}
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

      <Dialog open={moderationDialog} onOpenChange={setModerationDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {moderationAction === 'approve' ? 'Approve' : moderationAction === 'reject' ? 'Reject' : 'Delete'} Comment
            </DialogTitle>
            <DialogDescription>
              {moderationAction === 'approve' && 'This comment will be approved and visible to all users.'}
              {moderationAction === 'reject' && 'This comment will be hidden from public view.'}
              {moderationAction === 'delete' && 'This comment will be permanently deleted.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedComment && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium mb-1">Comment by {selectedComment.userName}</div>
                <div className="text-sm text-gray-600 mb-2">On: {selectedComment.postTitle}</div>
                <div className="text-sm">{selectedComment.content}</div>
                {selectedComment.reportCount > 0 && (
                  <div className="mt-2">
                    <Badge variant="destructive" className="text-xs">
                      {selectedComment.reportCount} reports
                    </Badge>
                  </div>
                )}
              </div>
            )}
            <div>
              <label className="text-sm font-medium">
                {moderationAction === 'approve' ? 'Approval Notes' : 'Reason'}
              </label>
              <Textarea
                placeholder={
                  moderationAction === 'approve' 
                    ? 'Add any notes (optional)...'
                    : 'Please provide a reason...'
                }
                value={moderationReason}
                onChange={(e) => setModerationReason(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModerationDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitModeration}
              className={
                moderationAction === 'approve' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : moderationAction === 'reject'
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-red-600 hover:bg-red-700'
              }
            >
              {moderationAction === 'approve' ? 'Approve' : moderationAction === 'reject' ? 'Reject' : 'Delete'} Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{filteredComments.length}</strong> comments
        </p>
      </div>
    </div>
  );
};

export default AdminCommunityModeration;
