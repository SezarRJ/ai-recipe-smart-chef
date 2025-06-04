
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, FileText, Image, Video, Download } from 'lucide-react';
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

const mockContent = [
  {
    id: 'CNT-001',
    name: 'Recipe Hero Images',
    type: 'image',
    category: 'recipes',
    size: '2.5 MB',
    items: 24,
    lastModified: '2024-01-15',
    status: 'active'
  },
  {
    id: 'CNT-002',
    name: 'Cooking Tutorial Videos',
    type: 'video',
    category: 'tutorials',
    size: '150 MB',
    items: 8,
    lastModified: '2024-01-14',
    status: 'active'
  },
  {
    id: 'CNT-003',
    name: 'App Documentation',
    type: 'document',
    category: 'help',
    size: '1.2 MB',
    items: 12,
    lastModified: '2024-01-13',
    status: 'draft'
  }
];

const AdminContentLibraryPage = () => {
  const [content] = useState(mockContent);
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4 text-blue-500" />;
      case 'video': return <Video className="h-4 w-4 text-red-500" />;
      case 'document': return <FileText className="h-4 w-4 text-green-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      recipes: 'bg-orange-100 text-orange-800',
      tutorials: 'bg-purple-100 text-purple-800',
      help: 'bg-blue-100 text-blue-800',
      marketing: 'bg-pink-100 text-pink-800'
    };
    return <Badge className={variants[category as keyof typeof variants]}>{category}</Badge>;
  };

  const filteredContent = content.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Content Library">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Content Library</h1>
            <p className="text-muted-foreground">Manage all media files, documents, and content assets.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Content
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{content.length}</div>
            <div className="text-sm text-gray-600">Content Collections</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{content.reduce((sum, c) => sum + c.items, 0)}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{content.filter(c => c.type === 'image').length}</div>
            <div className="text-sm text-gray-600">Image Collections</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">{content.filter(c => c.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active Collections</div>
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
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{item.type}</TableCell>
                  <TableCell>{getCategoryBadge(item.category)}</TableCell>
                  <TableCell>{item.items}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
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

export default AdminContentLibraryPage;
