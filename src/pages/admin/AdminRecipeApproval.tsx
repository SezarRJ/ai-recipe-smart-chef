
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, RefreshCw, Check, X, Eye, MessageSquare } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const mockPendingRecipes = [
  {
    id: '1',
    title: 'Traditional Hummus with Tahini',
    createdBy: 'Sarah Johnson',
    submittedAt: '2023-09-20',
    status: 'pending',
    cuisine: 'Middle Eastern',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1571197119204-7d4b57726ba5?w=400'
  },
  {
    id: '2',
    title: 'Spicy Korean Kimchi Fried Rice',
    createdBy: 'Michael Chen',
    submittedAt: '2023-09-19',
    status: 'pending',
    cuisine: 'Korean',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091774-5d2d2bd2d815?w=400'
  },
  {
    id: '3',
    title: 'Authentic Italian Carbonara',
    createdBy: 'Emily Rodriguez',
    submittedAt: '2023-09-18',
    status: 'pending',
    cuisine: 'Italian',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400'
  }
];

const AdminRecipeApproval = () => {
  const [recipes, setRecipes] = useState(mockPendingRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');

  const handleReviewRecipe = (recipe: any, action: 'approve' | 'reject') => {
    setSelectedRecipe(recipe);
    setReviewAction(action);
    setReviewDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (!selectedRecipe) return;

    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === selectedRecipe.id 
          ? { ...recipe, status: reviewAction === 'approve' ? 'approved' : 'rejected' }
          : recipe
      )
    );

    toast.success(
      `Recipe ${reviewAction === 'approve' ? 'approved' : 'rejected'} successfully!`
    );

    setReviewDialogOpen(false);
    setReviewNotes('');
    setSelectedRecipe(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800'
    };
    return (
      <Badge variant="outline" className={colors[difficulty as keyof typeof colors] || ''}>
        {difficulty}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Recipe Approval</h1>
          <p className="text-muted-foreground">Review and approve user-submitted recipes.</p>
        </div>
        <div className="flex items-center gap-2">
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
              <TableHead>Recipe</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{recipe.title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{recipe.createdBy}</TableCell>
                <TableCell>{recipe.cuisine}</TableCell>
                <TableCell>{getDifficultyBadge(recipe.difficulty)}</TableCell>
                <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                <TableCell>{recipe.submittedAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReviewRecipe(recipe, 'approve')}
                      disabled={recipe.status !== 'pending'}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReviewRecipe(recipe, 'reject')}
                      disabled={recipe.status !== 'pending'}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === 'approve' ? 'Approve' : 'Reject'} Recipe
            </DialogTitle>
            <DialogDescription>
              {reviewAction === 'approve' 
                ? 'This recipe will be published and visible to all users.'
                : 'This recipe will be rejected and the user will be notified.'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRecipe && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="font-medium">{selectedRecipe.title}</div>
                  <div className="text-sm text-gray-500">by {selectedRecipe.createdBy}</div>
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium">
                {reviewAction === 'approve' ? 'Approval Notes' : 'Rejection Reason'}
              </label>
              <Textarea
                placeholder={
                  reviewAction === 'approve' 
                    ? 'Add any notes for approval (optional)...'
                    : 'Please provide a reason for rejection...'
                }
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              className={reviewAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {reviewAction === 'approve' ? 'Approve Recipe' : 'Reject Recipe'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{recipes.length}</strong> pending recipes
        </p>
      </div>
    </div>
  );
};

export default AdminRecipeApproval;
