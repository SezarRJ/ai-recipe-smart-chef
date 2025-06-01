
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
import { Search, Eye, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { SharedRecipe } from '@/types/index';

// Mock data for shared recipes
const mockSharedRecipes: SharedRecipe[] = [
  {
    id: '1',
    title: 'Homemade Pizza Margherita',
    description: 'Classic Italian pizza with fresh tomatoes and mozzarella',
    image: '/lovable-uploads/fe3b59a8-1853-4e9f-90d0-2c00d1a21d78.png',
    prep_time: 30,
    cooking_time: 15,
    servings: 4,
    difficulty: 'Medium' as const,
    calories: 280,
    protein: 12,
    carbs: 35,
    fat: 10,
    rating: 0,
    rating_count: 0,
    ingredients: [
      { name: 'Pizza dough', quantity: 1, unit: 'piece' },
      { name: 'Tomato sauce', quantity: 200, unit: 'ml' },
      { name: 'Mozzarella cheese', quantity: 150, unit: 'g' }
    ],
    instructions: ['Prepare dough', 'Add sauce', 'Add cheese', 'Bake for 15 minutes'],
    categories: ['Italian'],
    tags: ['pizza', 'vegetarian'],
    isFavorite: false,
    status: 'pending',
    submitted_by: 'user123',
    submitted_at: '2023-09-20T10:00:00Z',
    user_id: 'user123'
  },
  {
    id: '2',
    title: 'Spicy Thai Curry',
    description: 'Authentic Thai green curry with vegetables',
    image: '/lovable-uploads/3d48f7fe-a194-4102-a10d-a942ddfb054c.png',
    prep_time: 20,
    cooking_time: 25,
    servings: 3,
    difficulty: 'Hard' as const,
    calories: 320,
    protein: 8,
    carbs: 25,
    fat: 18,
    rating: 0,
    rating_count: 0,
    ingredients: [
      { name: 'Green curry paste', quantity: 2, unit: 'tbsp' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Mixed vegetables', quantity: 300, unit: 'g' }
    ],
    instructions: ['Heat curry paste', 'Add coconut milk', 'Add vegetables', 'Simmer for 20 minutes'],
    categories: ['Thai'],
    tags: ['curry', 'spicy', 'vegan'],
    isFavorite: false,
    status: 'approved',
    submitted_by: 'user456',
    submitted_at: '2023-09-19T14:30:00Z',
    user_id: 'user456'
  }
];

const AdminSharedRecipeModeration = () => {
  const [recipes, setRecipes] = useState<SharedRecipe[]>(mockSharedRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<SharedRecipe | null>(null);
  const [moderationDialog, setModerationDialog] = useState(false);
  const [moderationAction, setModerationAction] = useState<'approve' | 'reject'>('approve');
  const [moderationNotes, setModerationNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleModerate = (recipe: SharedRecipe, action: 'approve' | 'reject') => {
    setSelectedRecipe(recipe);
    setModerationAction(action);
    setModerationDialog(true);
  };

  const handleSubmitModeration = () => {
    if (!selectedRecipe) return;

    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === selectedRecipe.id 
          ? { 
              ...recipe, 
              status: moderationAction,
              moderated_at: new Date().toISOString(),
              moderation_notes: moderationNotes
            }
          : recipe
      )
    );

    toast.success(`Recipe ${moderationAction}d successfully!`);
    setModerationDialog(false);
    setModerationNotes('');
    setSelectedRecipe(null);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>,
      approved: <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>,
      rejected: <Badge variant="outline" className="bg-red-50 text-red-700">Rejected</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.submitted_by.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Shared Recipe Moderation">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">{recipes.filter(r => r.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{recipes.filter(r => r.status === 'approved').length}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">{recipes.filter(r => r.status === 'rejected').length}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipe</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{recipe.title}</div>
                        <div className="text-sm text-gray-500">{recipe.difficulty} • {recipe.prep_time + recipe.cooking_time}min</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{recipe.submitted_by}</TableCell>
                  <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                  <TableCell>{new Date(recipe.submitted_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {recipe.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModerate(recipe, 'approve')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModerate(recipe, 'reject')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={moderationDialog} onOpenChange={setModerationDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {moderationAction === 'approve' ? 'Approve' : 'Reject'} Recipe
              </DialogTitle>
              <DialogDescription>
                {moderationAction === 'approve' 
                  ? 'This recipe will be approved and made public.' 
                  : 'This recipe will be rejected and hidden from users.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedRecipe && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{selectedRecipe.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{selectedRecipe.description}</div>
                </div>
              )}
              <div>
                <label className="text-sm font-medium">
                  {moderationAction === 'approve' ? 'Approval Notes' : 'Rejection Reason'}
                </label>
                <Textarea
                  placeholder={
                    moderationAction === 'approve' 
                      ? 'Add any notes (optional)...'
                      : 'Please provide a reason for rejection...'
                  }
                  value={moderationNotes}
                  onChange={(e) => setModerationNotes(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setModerationDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitModeration}
                className={
                  moderationAction === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }
              >
                {moderationAction === 'approve' ? 'Approve' : 'Reject'} Recipe
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSharedRecipeModeration;
