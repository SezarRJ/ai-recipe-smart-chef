
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
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

const mockIngredients = [
  {
    id: 'ING-001',
    name: 'Tomatoes',
    category: 'Vegetables',
    unit: 'piece',
    averagePrice: 0.5,
    availability: 'high',
    nutritionScore: 85
  },
  {
    id: 'ING-002',
    name: 'Olive Oil',
    category: 'Oils',
    unit: 'ml',
    averagePrice: 0.02,
    availability: 'medium',
    nutritionScore: 70
  },
  {
    id: 'ING-003',
    name: 'Chicken Breast',
    category: 'Protein',
    unit: 'g',
    averagePrice: 0.01,
    availability: 'high',
    nutritionScore: 95
  }
];

const AdminIngredientsPage = () => {
  const [ingredients] = useState(mockIngredients);
  const [searchQuery, setSearchQuery] = useState('');

  const getAvailabilityBadge = (availability: string) => {
    const variants = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[availability as keyof typeof variants]}>{availability}</Badge>;
  };

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Ingredients Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Ingredients Management</h1>
            <p className="text-muted-foreground">Manage ingredient database, pricing, and availability.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{ingredients.length}</div>
                <div className="text-sm text-gray-600">Total Ingredients</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{ingredients.filter(i => i.availability === 'high').length}</div>
            <div className="text-sm text-gray-600">High Availability</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(ingredients.map(i => i.category)).size}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(ingredients.reduce((sum, i) => sum + i.nutritionScore, 0) / ingredients.length)}
            </div>
            <div className="text-sm text-gray-600">Avg Nutrition Score</div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
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
                <TableHead>Unit</TableHead>
                <TableHead>Avg Price</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Nutrition Score</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>{ingredient.category}</TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
                  <TableCell>${ingredient.averagePrice}</TableCell>
                  <TableCell>{getAvailabilityBadge(ingredient.availability)}</TableCell>
                  <TableCell>{ingredient.nutritionScore}/100</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
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

export default AdminIngredientsPage;
