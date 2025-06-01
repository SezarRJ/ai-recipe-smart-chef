
import React, { useState, useEffect } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Eye, Edit, Trash2, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Define the ContentItem type
interface ContentItem {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'PDF' | string;
  status: 'Published' | 'Draft' | 'Review' | string;
  author: string;
  date: string;
  views: number;
}

// Mock content data
const initialContentItems: ContentItem[] = [
  {
    id: 'c1',
    title: 'Getting Started with Wasfah',
    type: 'Article',
    status: 'Published',
    author: 'Admin',
    date: '2023-09-10',
    views: 1245
  },
  {
    id: 'c2',
    title: 'How to Cook Perfect Rice',
    type: 'Video',
    status: 'Published',
    author: 'Chef Ali',
    date: '2023-09-15',
    views: 3782
  },
  {
    id: 'c3',
    title: 'Healthy Breakfast Ideas',
    type: 'Article',
    status: 'Draft',
    author: 'Nutritionist Sara',
    date: '2023-09-18',
    views: 0
  },
  {
    id: 'c4',
    title: 'Seasonal Cooking Tips',
    type: 'Article',
    status: 'Published',
    author: 'Admin',
    date: '2023-09-20',
    views: 856
  },
  {
    id: 'c5',
    title: 'Kitchen Safety Guide',
    type: 'PDF',
    status: 'Review',
    author: 'Safety Team',
    date: '2023-09-22',
    views: 421
  }
];

export default function AdminContentLibrary() {
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({ status: 'all', type: 'all' });
  const [isLoading, setIsLoading] = useState(true);
  const [isAddContentDialogOpen, setIsAddContentDialogOpen] = useState(false);
  const [newContentForm, setNewContentForm] = useState({
    title: '',
    type: 'Article',
    status: 'Draft',
    author: '',
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAllContent(initialContentItems);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let content = [...allContent];

    if (searchQuery) {
      content = content.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCriteria.status !== 'all') {
      content = content.filter(item => item.status === filterCriteria.status);
    }
    if (filterCriteria.type !== 'all') {
      content = content.filter(item => item.type === filterCriteria.type);
    }

    setFilteredContent(content);
  }, [allContent, searchQuery, filterCriteria]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filterName: keyof typeof filterCriteria, value: string) => {
    setFilterCriteria(prev => ({ ...prev, [filterName]: value }));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setSearchQuery('');
    setFilterCriteria({ status: 'all', type: 'all' });

    const timer = setTimeout(() => {
      setAllContent(initialContentItems);
      setIsLoading(false);
      toast.success('Content list updated.');
    }, 800);

    return () => clearTimeout(timer);
  };

  const handleNewContentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setNewContentForm(prev => ({ ...prev, [id]: value }));
  };

  const handleNewContentSelectChange = (id: 'type' | 'status', value: string) => {
    setNewContentForm(prev => ({ ...prev, [id]: value }));
  };

  const handleAddNewContent = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newContentForm.title || !newContentForm.type || !newContentForm.status) {
      toast.error('Title, Type, and Status are required.');
      return;
    }

    const newContent: ContentItem = {
      id: `c${Date.now()}`,
      ...newContentForm,
      author: newContentForm.author || 'Admin',
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };

    setAllContent(prevContent => [newContent, ...prevContent]);

    setNewContentForm({
      title: '',
      type: 'Article',
      status: 'Draft',
      author: '',
    });
    setIsAddContentDialogOpen(false);

    toast.success(`"${newContent.title}" has been added to the library.`);
  };

  const handleContentAction = (action: string, item: ContentItem) => {
    console.log(`${action} action triggered for content:`, item);
    switch (action) {
      case 'View':
        toast.success(`Viewing "${item.title}" (Placeholder)`);
        break;
      case 'Edit':
        toast.success(`Editing "${item.title}" (Placeholder)`);
        break;
      case 'Delete':
        if (window.confirm(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`)) {
          setAllContent(prevContent => prevContent.filter(content => content.id !== item.id));
          toast.success(`"${item.title}" has been deleted.`);
        }
        break;
      default:
        break;
    }
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  return (
    <AdminPageWrapper title="Content Library">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-muted-foreground">Manage articles, videos, and other content available in the app.</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isAddContentDialogOpen} onOpenChange={setIsAddContentDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Content
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Content</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new content item.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddNewContent}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newContentForm.title}
                        onChange={handleNewContentInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select onValueChange={(value) => handleNewContentSelectChange('type', value)} value={newContentForm.type}>
                        <SelectTrigger id="type" className="col-span-3">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Article">Article</SelectItem>
                          <SelectItem value="Video">Video</SelectItem>
                          <SelectItem value="PDF">PDF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select onValueChange={(value) => handleNewContentSelectChange('status', value)} value={newContentForm.status}>
                        <SelectTrigger id="status" className="col-span-3">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Review">Review</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="author" className="text-right">
                        Author
                      </Label>
                      <Input
                        id="author"
                        value={newContentForm.author}
                        onChange={handleNewContentInputChange}
                        className="col-span-3"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Content</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>
              Manage articles, videos, and other content available in the app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
              <div className="flex w-full md:max-w-sm items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="w-full md:w-[300px]"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center space-x-2 self-end md:self-center">
                <Select onValueChange={(value) => handleFilterChange('status', value)} value={filterCriteria.status}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleFilterChange('type', value)} value={filterCriteria.type}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin" />
                  Loading content...
                </div>
              ) : filteredContent.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No content found matching your criteria.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClasses(item.status)}`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleContentAction('View', item)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleContentAction('Edit', item)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleContentAction('Delete', item)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageWrapper>
  );
}
