
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock content data
const contentItems = [
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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Content Library</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Content
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>
            Manage articles, videos, and other content available in the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Search content..." className="w-[300px]" />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="border rounded-md">
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
                {contentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : item.status === 'Draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
