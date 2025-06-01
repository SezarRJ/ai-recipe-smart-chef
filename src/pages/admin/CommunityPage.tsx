
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Eye, 
  Check, 
  X, 
  Shield, 
  MessageSquare,
  ChefHat,
  Users,
  Flag,
  Clock
} from 'lucide-react';

interface SharedRecipe {
  id: string;
  title: string;
  description: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  ingredients: string[];
}

interface Comment {
  id: string;
  content: string;
  author: string;
  recipe: string;
  status: 'pending' | 'approved' | 'flagged';
  created_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'banned';
  recipes_count: number;
  comments_count: number;
  joined_at: string;
}

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const pendingRecipes: SharedRecipe[] = [
    {
      id: '1',
      title: 'Mediterranean Pasta Salad',
      description: 'Fresh and healthy pasta salad with Mediterranean flavors',
      author: 'John Doe',
      status: 'pending',
      created_at: '2024-01-15T10:30:00Z',
      ingredients: ['pasta', 'tomatoes', 'olives', 'feta cheese']
    },
    {
      id: '2',
      title: 'Spicy Chicken Curry',
      description: 'Traditional Indian curry with aromatic spices',
      author: 'Sarah Smith',
      status: 'pending',
      created_at: '2024-01-14T14:20:00Z',
      ingredients: ['chicken', 'curry powder', 'coconut milk', 'onions']
    }
  ];

  const flaggedComments: Comment[] = [
    {
      id: '1',
      content: 'This recipe is terrible and the author clearly has no idea what they are doing.',
      author: 'AngryUser123',
      recipe: 'Mediterranean Pasta Salad',
      status: 'flagged',
      created_at: '2024-01-15T12:00:00Z'
    }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      recipes_count: 15,
      comments_count: 32,
      joined_at: '2023-06-15T00:00:00Z'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      status: 'active',
      recipes_count: 8,
      comments_count: 24,
      joined_at: '2023-08-20T00:00:00Z'
    },
    {
      id: '3',
      name: 'AngryUser123',
      email: 'angry@example.com',
      status: 'suspended',
      recipes_count: 2,
      comments_count: 15,
      joined_at: '2023-12-01T00:00:00Z'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'pending': 'default',
      'approved': 'secondary',
      'rejected': 'destructive',
      'flagged': 'destructive',
      'active': 'secondary',
      'suspended': 'default',
      'banned': 'destructive'
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ChefHat className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Recipes</p>
                <p className="text-2xl font-bold">{pendingRecipes.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Flagged Content</p>
                <p className="text-2xl font-bold">{flaggedComments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold">{users.reduce((sum, u) => sum + u.comments_count, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recipes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recipes">Pending Recipes</TabsTrigger>
          <TabsTrigger value="comments">Flagged Comments</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="recipes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Approval Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipe</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRecipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{recipe.title}</p>
                          <p className="text-sm text-gray-500">{recipe.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{recipe.author}</TableCell>
                      <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                      <TableCell>{new Date(recipe.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{recipe.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p>{recipe.description}</p>
                                <div>
                                  <h4 className="font-medium">Ingredients:</h4>
                                  <ul className="list-disc list-inside text-sm">
                                    {recipe.ingredients.map((ingredient, i) => (
                                      <li key={i}>{ingredient}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm">
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button variant="destructive" size="sm">
                                    <X className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Comment</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Recipe</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedComments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{comment.content}</p>
                      </TableCell>
                      <TableCell>{comment.author}</TableCell>
                      <TableCell>{comment.recipe}</TableCell>
                      <TableCell>{getStatusBadge(comment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipes</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.recipes_count}</TableCell>
                      <TableCell>{user.comments_count}</TableCell>
                      <TableCell>{new Date(user.joined_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            Block
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
