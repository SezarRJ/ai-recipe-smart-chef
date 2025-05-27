
import React from 'react';
import { Search, Filter, MoreHorizontal, RefreshCw, Plus, Star, Clock, Utensils } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

const mockRecipes = [
  {
    id: '1',
    title: 'Mediterranean Grilled Chicken',
    cuisine: 'Mediterranean',
    createdBy: 'Chef System',
    difficulty: 'Medium',
    rating: 4.7,
    featured: true,
    premium: true,
    createdAt: '2023-09-15',
  },
  {
    id: '2',
    title: 'Classic Margherita Pizza',
    cuisine: 'Italian',
    createdBy: 'Sarah Johnson',
    difficulty: 'Easy',
    rating: 4.9,
    featured: true,
    premium: false,
    createdAt: '2023-08-10',
  },
  {
    id: '3',
    title: 'Japanese Miso Ramen',
    cuisine: 'Japanese',
    createdBy: 'Chef System',
    difficulty: 'Hard',
    rating: 4.5,
    featured: false,
    premium: true,
    createdAt: '2023-09-01',
  },
  {
    id: '4',
    title: 'Indian Butter Chicken',
    cuisine: 'Indian',
    createdBy: 'David Kim',
    difficulty: 'Medium',
    rating: 4.8,
    featured: true,
    premium: true,
    createdAt: '2023-09-12',
  },
  {
    id: '5',
    title: 'Mexican Street Tacos',
    cuisine: 'Mexican',
    createdBy: 'System',
    difficulty: 'Easy',
    rating: 4.6,
    featured: false,
    premium: false,
    createdAt: '2023-09-18',
  },
];

const AdminRecipes = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Recipe Management</h1>
          <p className="text-muted-foreground">View and manage all recipes in the system.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Recipe
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
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
              <TableHead>Title</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRecipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {recipe.title}
                    {recipe.featured && (
                      <Star className="h-3 w-3 text-yellow-500 ml-1 fill-yellow-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{recipe.cuisine}</TableCell>
                <TableCell>{recipe.createdBy}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    recipe.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800' 
                      : recipe.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {recipe.rating}
                    <Star className="h-3 w-3 text-yellow-500 ml-1 fill-yellow-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    recipe.premium ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {recipe.premium ? 'Premium' : 'Free'}
                  </span>
                </TableCell>
                <TableCell>{recipe.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Recipe</DropdownMenuItem>
                      <DropdownMenuItem>View Recipe</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {recipe.featured ? 'Unfeature' : 'Feature'}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {recipe.premium ? 'Make Free' : 'Make Premium'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Archive Recipe</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>5</strong> of <strong>234</strong> recipes
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminRecipes;
