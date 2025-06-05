
import React, { useState, useEffect } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Filter, MoreHorizontal, Check, X, Eye, MessageSquare } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminRecipeApproval = () => {
  const { toast } = useToast();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingRecipes();
  }, []);

  const fetchPendingRecipes = async () => {
    try {
      const { data: pendingRecipes, error } = await supabase
        .from('recipe_approvals')
        .select(`
          *,
          recipes (
            id,
            title,
            description,
            image_url,
            difficulty,
            category_id,
            author_id
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(pendingRecipes || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching recipes',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewRecipe = (recipe: any, action: 'approve' | 'reject') => {
    setSelectedRecipe(recipe);
    setReviewAction(action);
    setReviewDialogOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedRecipe) return;

    try {
      const updates = {
        status: reviewAction,
        review_notes: reviewNotes,
        reviewed_at: new Date().toISOString(),
        reviewed_by: (await supabase.auth.getUser()).data.user?.id
      };

      const { error } = await supabase
        .from('recipe_approvals')
        .update(updates)
        .eq('id', selectedRecipe.id);

      if (error) throw error;

      // Update recipe is_published status
      const { error: recipeError } = await supabase
        .from('recipes')
        .update({
          is_published: reviewAction === 'approve'
        })
        .eq('id', selectedRecipe.recipe_id);

      if (recipeError) throw recipeError;

      toast({
        title: `Recipe ${reviewAction}d successfully`,
        description: `The recipe has been ${reviewAction}d and the author will be notified.`
      });

      setReviewDialogOpen(false);
      setReviewNotes('');
      setSelectedRecipe(null);
      fetchPendingRecipes();
    } catch (error: any) {
      toast({
        title: 'Error reviewing recipe',
        description: error.message,
        variant: 'destructive'
      });
    }
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

  if (loading) {
    return (
      <AdminPageWrapper title="Recipe Approval">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading recipes...</div>
        </div>
      </AdminPageWrapper>
    );
  }

  return (
    <AdminPageWrapper title="Recipe Approval">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Recipe Approval</h1>
            <p className="text-muted-foreground">Review and approve user-submitted recipes.</p>
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
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipe</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.map((recipe: any) => (
                <TableRow key={recipe.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={recipe.recipes?.image_url || '/placeholder.svg'}
                        alt={recipe.recipes?.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{recipe.recipes?.title}</div>
                        <div className="text-sm text-gray-500">{recipe.recipes?.description?.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{recipe.recipes?.category_id || 'N/A'}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getDifficultyBadge(recipe.recipes?.difficulty || 'Medium')}</TableCell>
                  <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                  <TableCell>{new Date(recipe.created_at).toLocaleDateString()}</TableCell>
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
                            Contact Author
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
                  : 'This recipe will be rejected and the author will be notified.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedRecipe && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={selectedRecipe.recipes?.image_url || '/placeholder.svg'}
                    alt={selectedRecipe.recipes?.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{selectedRecipe.recipes?.title}</div>
                    <div className="text-sm text-gray-500">{selectedRecipe.recipes?.category_id}</div>
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
    </AdminPageWrapper>
  );
};

export default AdminRecipeApproval;
