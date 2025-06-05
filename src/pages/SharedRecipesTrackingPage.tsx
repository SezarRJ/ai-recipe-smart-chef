
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Users, ChefHat, Clock, Filter, Eye, MessageSquare } from 'lucide-react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';

interface SharedRecipe {
  id: string;
  title: string;
  author_name: string;
  views: number;
  shares: number;
  likes: number;
  comments: number;
  rating: number;
  created_at: string;
  category: string;
  status: 'approved' | 'pending' | 'rejected';
  trending_score: number;
}

export default function SharedRecipesTrackingPage() {
  const [recipes, setRecipes] = useState<SharedRecipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for demonstration
  const mockRecipes: SharedRecipe[] = [
    {
      id: '1',
      title: 'Grandmother\'s Secret Hummus',
      author_name: 'Sarah Ahmed',
      views: 1250,
      shares: 89,
      likes: 342,
      comments: 67,
      rating: 4.8,
      created_at: '2024-01-20',
      category: 'Middle Eastern',
      status: 'approved',
      trending_score: 0.85
    },
    {
      id: '2',
      title: 'Spicy Korean Kimchi Fried Rice',
      author_name: 'Min Jung',
      views: 890,
      shares: 45,
      likes: 234,
      comments: 34,
      rating: 4.6,
      created_at: '2024-01-18',
      category: 'Korean',
      status: 'approved',
      trending_score: 0.72
    },
    {
      id: '3',
      title: 'Classic Italian Carbonara',
      author_name: 'Giuseppe Romano',
      views: 2100,
      shares: 156,
      likes: 567,
      comments: 89,
      rating: 4.9,
      created_at: '2024-01-15',
      category: 'Italian',
      status: 'approved',
      trending_score: 0.93
    }
  ];

  useEffect(() => {
    setRecipes(mockRecipes);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTrendingBadge = (score: number) => {
    if (score >= 0.8) {
      return <Badge className="bg-red-100 text-red-800">🔥 Hot</Badge>;
    } else if (score >= 0.6) {
      return <Badge className="bg-orange-100 text-orange-800">📈 Trending</Badge>;
    } else {
      return <Badge variant="outline">📊 Normal</Badge>;
    }
  };

  const totalViews = mockRecipes.reduce((sum, recipe) => sum + recipe.views, 0);
  const totalShares = mockRecipes.reduce((sum, recipe) => sum + recipe.shares, 0);
  const totalLikes = mockRecipes.reduce((sum, recipe) => sum + recipe.likes, 0);
  const averageRating = mockRecipes.reduce((sum, recipe) => sum + recipe.rating, 0) / mockRecipes.length;

  return (
    <AdminPageWrapper title="Shared Recipes Tracking">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Shared Recipes Tracking</h1>
            <p className="text-muted-foreground">Monitor community recipe engagement and performance.</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShares.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Across all recipes</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Recipes Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipe</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{recipe.title}</div>
                      <div className="text-sm text-gray-500">{recipe.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>{recipe.author_name}</TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {recipe.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {recipe.shares}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          ❤️ {recipe.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {recipe.comments}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">{recipe.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getTrendingBadge(recipe.trending_score)}</TableCell>
                  <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {new Date(recipe.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{recipes.length}</strong> recipes
          </p>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
