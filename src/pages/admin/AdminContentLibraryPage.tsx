
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Filter, Plus, Edit, Trash2, Eye, FileText, Image, Video } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const mockContentItems = [
  {
    id: 'CNT-001',
    title: 'Getting Started with Wasfah',
    type: 'article',
    category: 'Tutorial',
    status: 'published',
    author: 'Admin',
    createdAt: '2023-09-20',
    updatedAt: '2023-09-20',
    views: 1250
  },
  {
    id: 'CNT-002',
    title: 'Mediterranean Cooking Basics',
    type: 'video',
    category: 'Educational',
    status: 'draft',
    author: 'Chef Maria',
    createdAt: '2023-09-19',
    updatedAt: '2023-09-20',
    views: 0
  },
  {
    id: 'CNT-003',
    title: 'Spice Guide Infographic',
    type: 'image',
    category: 'Reference',
    status: 'published',
    author: 'Design Team',
    createdAt: '2023-09-18',
    updatedAt: '2023-09-18',
    views: 890
  }
];

const AdminContentLibraryPage = () => {
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState(mockContentItems);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [contentDialog, setContentDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleViewContent = (item: any) => {
    setSelectedItem(item);
    setNewTitle(item.title);
    setContentDialog(true);
  };

  const handleCreateContent = () => {
    setSelectedItem(null);
    setNewTitle('');
    setNewContent('');
    setContentDialog(true);
  };

  const handleSaveContent = () => {
    if (!newTitle.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for the content.",
        variant: "destructive",
      });
      return;
    }

    if (selectedItem) {
      // Update existing content
      setContentItems(prev => 
        prev.map(item => 
          item.id === selectedItem.id 
            ? { ...item, title: newTitle, updatedAt: new Date().toISOString().split('T')[0] }
            : item
        )
      );
      toast({
        title: "Content Updated",
        description: "Content has been updated successfully.",
      });
    } else {
      // Create new content
      const newItem = {
        id: `CNT-${String(contentItems.length + 1).padStart(3, '0')}`,
        title: newTitle,
        type: 'article',
        category: 'General',
        status: 'draft',
        author: 'Admin',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        views: 0
      };
      
      setContentItems(prev => [newItem, ...prev]);
      toast({
        title: "Content Created",
        description: "New content has been created successfully.",
      });
    }

    setContentDialog(false);
    setNewTitle('');
    setNewContent('');
    setSelectedItem(null);
  };

  const handleDeleteContent = (itemId: string) => {
    setContentItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Content Deleted",
      description: "Content has been deleted successfully.",
    });
  };

  const handlePublishContent = (itemId: string) => {
    setContentItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'published', updatedAt: new Date().toISOString().split('T')[0] }
          : item
      )
    );
    toast({
      title: "Content Published",
      description: "Content has been published successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      published: <Badge variant="outline" className="bg-green-50 text-green-700">Published</Badge>,
      draft: <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Draft</Badge>,
      archived: <Badge variant="outline" className="bg-gray-50 text-gray-700">Archived</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      article: <FileText className="h-4 w-4 text-blue-500" />,
      video: <Video className="h-4 w-4 text-purple-500" />,
      image: <Image className="h-4 w-4 text-green-500" />
    };
    return icons[type as keyof typeof icons] || <FileText className="h-4 w-4" />;
  };

  const filteredItems = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Content Library">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Content Library</h1>
            <p className="text-muted-foreground">Manage articles, tutorials, and educational content.</p>
          </div>
          <Button onClick={handleCreateContent}>
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{contentItems.length}</div>
            <div className="text-sm text-gray-600">Total Content</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{contentItems.filter(i => i.status === 'published').length}</div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">{contentItems.filter(i => i.status === 'draft').length}</div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{contentItems.reduce((sum, item) => sum + item.views, 0)}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
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
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleViewContent(item)}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <span className="truncate" title={item.title}>{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.views.toLocaleString()}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleViewContent(item); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDeleteContent(item.id); }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={contentDialog} onOpenChange={setContentDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedItem ? 'Edit Content' : 'Create New Content'}
              </DialogTitle>
              <DialogDescription>
                {selectedItem ? 'Update the content details.' : 'Create new educational content for users.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="contentTitle">Title</Label>
                <Input
                  id="contentTitle"
                  placeholder="Content title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contentBody">Content</Label>
                <Textarea
                  id="contentBody"
                  placeholder="Write your content here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={6}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setContentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveContent}>
                {selectedItem ? 'Update Content' : 'Create Content'}
              </Button>
              {selectedItem && selectedItem.status === 'draft' && (
                <Button onClick={() => handlePublishContent(selectedItem.id)}>
                  Publish
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminContentLibraryPage;
