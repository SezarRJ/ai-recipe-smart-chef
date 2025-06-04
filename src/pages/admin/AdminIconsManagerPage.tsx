
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Upload, Edit, Trash2, Eye, Download, Folder } from 'lucide-react';
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

const mockIcons = [
  {
    id: 'ICN-001',
    name: 'cooking-pot.svg',
    category: 'cooking',
    size: '2.1 KB',
    format: 'SVG',
    dimensions: '24x24',
    usage: 15,
    lastModified: '2024-01-15',
    status: 'active'
  },
  {
    id: 'ICN-002',
    name: 'recipe-book.png',
    category: 'recipes',
    size: '4.8 KB',
    format: 'PNG',
    dimensions: '32x32',
    usage: 23,
    lastModified: '2024-01-14',
    status: 'active'
  },
  {
    id: 'ICN-003',
    name: 'ingredient-apple.jpg',
    category: 'ingredients',
    size: '12.5 KB',
    format: 'JPG',
    dimensions: '64x64',
    usage: 8,
    lastModified: '2024-01-13',
    status: 'inactive'
  }
];

const AdminIconsManagerPage = () => {
  const [icons] = useState(mockIcons);
  const [searchQuery, setSearchQuery] = useState('');

  const getFormatBadge = (format: string) => {
    const variants = {
      SVG: 'bg-green-100 text-green-800',
      PNG: 'bg-blue-100 text-blue-800',
      JPG: 'bg-orange-100 text-orange-800',
      GIF: 'bg-purple-100 text-purple-800'
    };
    return <Badge className={variants[format as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>{format}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      cooking: 'bg-orange-100 text-orange-800',
      recipes: 'bg-purple-100 text-purple-800',
      ingredients: 'bg-green-100 text-green-800',
      ui: 'bg-blue-100 text-blue-800'
    };
    return <Badge className={variants[category as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>{category}</Badge>;
  };

  const filteredIcons = icons.filter(icon =>
    icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    icon.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Icons Manager">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Icons & Images Manager</h1>
            <p className="text-muted-foreground">Manage all icons, images, and visual assets used throughout the application.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Folder className="h-4 w-4 mr-2" />
              Organize
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Icons
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{icons.length}</div>
            <div className="text-sm text-gray-600">Total Icons</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{icons.filter(i => i.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active Icons</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">{icons.filter(i => i.format === 'SVG').length}</div>
            <div className="text-sm text-gray-600">SVG Icons</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(icons.reduce((sum, i) => sum + parseFloat(i.size), 0) * 10) / 10} KB
            </div>
            <div className="text-sm text-gray-600">Total Size</div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search icons..."
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
                <TableHead>Category</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIcons.map((icon) => (
                <TableRow key={icon.id}>
                  <TableCell className="font-medium">{icon.name}</TableCell>
                  <TableCell>{getCategoryBadge(icon.category)}</TableCell>
                  <TableCell>{getFormatBadge(icon.format)}</TableCell>
                  <TableCell>{icon.dimensions}</TableCell>
                  <TableCell>{icon.size}</TableCell>
                  <TableCell>{icon.usage} times</TableCell>
                  <TableCell>{getStatusBadge(icon.status)}</TableCell>
                  <TableCell>{icon.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
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

export default AdminIconsManagerPage;
