
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Eye, CheckCircle } from 'lucide-react';
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

const mockRecipes = [
  {
    id: 'REC-001',
    title: 'Chicken Tikka Masala',
    author: 'Chef Sarah',
    category: 'Indian',
    status: 'published',
    rating: 4.8,
    cookTime: 45,
    difficulty: 'medium',
    createdAt: '2024-01-15'
  },
  {
    id: 'REC-002',
    title: 'Mediterranean Pasta',
    author: 'Chef Ahmed',
    category: 'Italian',
    status: 'pending',
    rating: 4.5,
    cookTime: 30,
    difficulty: 'easy',
    createdAt: '2024-01-14'
  },
  {
    id: 'REC-003',
    title: 'Beef Stir Fry',
    author: 'Chef Maria',
    category: 'Asian',
    status: 'published',
    rating: 4.7,
    cookTime: 25,
    difficulty: 'medium',
    createdAt: '2024-01-13'
  }
];

const AdminRecipesPage = () => {
  const [recipes] = useState(mockRecipes);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[difficulty as keyof typeof variants]}>{difficulty}</Badge>;
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Recipes Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Recipes Management</h1>
            <p className="text-muted-foreground">Manage recipe content, approvals, and categories.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Recipe
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{recipes.length}</div>
            <div className="text-sm text-gray-600">Total Recipes</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{recipes.filter(r => r.status === 'published').length}</div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">{recipes.filter(r => r.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(recipes.reduce((sum, r) => sum + r.rating, 0) / recipes.length * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Cook Time</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">{recipe.title}</TableCell>
                  <TableCell>{recipe.author}</TableCell>
                  <TableCell>{recipe.category}</TableCell>
                  <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                  <TableCell>★ {recipe.rating}</TableCell>
                  <TableCell>{recipe.cookTime}m</TableCell>
                  <TableCell>{getDifficultyBadge(recipe.difficulty)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <CheckCircle className="h-4 w-4" />
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

export default AdminRecipesPage;
