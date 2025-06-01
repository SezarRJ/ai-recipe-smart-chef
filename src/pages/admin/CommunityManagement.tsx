import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Search, Filter, MoreHorizontal, Check, X, Eye } from 'lucide-react';
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
import { AdminLayout } from '@/components/layout/AdminLayout';

const mockPendingRecipes = [
  {
    id: 'RCP-001',
    title: 'Homemade Pizza Margherita',
    author: 'John Smith',
    authorId: 'user123',
    submittedAt: '2023-09-20',
    status: 'pending',
    description: 'A classic Italian pizza with fresh basil and mozzarella',
    cookTime: 25,
    difficulty: 'Medium',
    image: '/placeholder.svg'
  },
  {
    id: 'RCP-002',
    title: 'Spicy Thai Curry',
    author: 'Lisa Chen',
    authorId: 'user456',
    submittedAt: '2023-09-19',
    status: 'pending',
    description: 'Authentic Thai green curry with coconut milk and vegetables',
    cookTime: 35,
    difficulty: 'Hard',
    image: '/placeholder.svg'
  },
  {
    id: 'RCP-003',
    title: 'Chocolate Chip Cookies',
    author: 'Sarah Johnson',
    authorId: 'user789',
    submittedAt: '2023-09-18',
    status: 'pending',
    description: 'Soft and chewy chocolate chip cookies perfect for any occasion',
    cookTime: 15,
    difficulty: 'Easy',
    image: '/placeholder.svg'
  }
];

const CommunityManagement = () => {
  const { toast } = useToast();
  const [recipes, setRecipes] = useState(mockPendingRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [recipeDialog, setRecipeDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const handleViewRecipe = (recipe: any) => {
    setSelectedRecipe(recipe);
    setRecipeDialog(true);
  };

  const handleApproveRecipe = (recipeId: string) => {
    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, status: 'approved' }
          : recipe
      )
    );
    
    toast({
      title: "Recipe Approved",
      description: "The recipe has been approved and published to the community.",
    });
    
    setRecipeDialog(false);
  };

  const handleRejectRecipe = () => {
    if (!selectedRecipe) return;

    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting this recipe.",
        variant: "destructive",
      });
      return;
    }

    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === selectedRecipe.id 
          ? { ...recipe, status: 'rejected', rejectionReason }
          : recipe
      )
    );

    toast({
      title: "Recipe Rejected",
      description: `Recipe rejected and author has been notified.`,
    });

    setRecipeDialog(false);
    setRejectionReason('');
    setSelectedRecipe(null);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>,
      approved: <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>,
      rejected: <Badge variant="destructive">Rejected</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const badges = {
      Easy: <Badge variant="outline" className="bg-green-50 text-green-700">Easy</Badge>,
      Medium: <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Medium</Badge>,
      Hard: <Badge variant="destructive">Hard</Badge>
    };
    return badges[difficulty as keyof typeof badges] || <Badge variant="outline">{difficulty}</Badge>;
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageWrapper title="Community Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Community Recipe Management</h1>
            <p className="text-muted-foreground">Review and moderate user-submitted recipes.</p>
          </div>
        </div>

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
                <TableHead>Recipe ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipes.map((recipe) => (
                <TableRow key={recipe.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleViewRecipe(recipe)}>
                  <TableCell className="font-medium">{recipe.id}</TableCell>
                  <TableCell className="max-w-xs">
                    <span className="truncate" title={recipe.title}>{recipe.title}</span>
                  </TableCell>
                  <TableCell>{recipe.author}</TableCell>
                  <TableCell>{getDifficultyBadge(recipe.difficulty)}</TableCell>
                  <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                  <TableCell>{recipe.submittedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewRecipe(recipe)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleApproveRecipe(recipe.id); }}>
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewRecipe(recipe); }}>
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={recipeDialog} onOpenChange={setRecipeDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedRecipe?.title}
                {selectedRecipe && getDifficultyBadge(selectedRecipe.difficulty)}
              </DialogTitle>
              <DialogDescription>
                Submitted by {selectedRecipe?.author} on {selectedRecipe?.submittedAt}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-700">{selectedRecipe?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Cook Time:</span> {selectedRecipe?.cookTime} minutes
                </div>
                <div>
                  <span className="font-medium">Status:</span> {selectedRecipe && getStatusBadge(selectedRecipe.status)}
                </div>
              </div>

              {selectedRecipe?.status === 'pending' && (
                <div>
                  <label className="text-sm font-medium">Rejection Reason (if rejecting)</label>
                  <Textarea
                    placeholder="Provide a reason for rejection (optional for approval)..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setRecipeDialog(false)}>
                Cancel
              </Button>
              {selectedRecipe?.status === 'pending' && (
                <>
                  <Button variant="destructive" onClick={handleRejectRecipe}>
                    Reject Recipe
                  </Button>
                  <Button onClick={() => handleApproveRecipe(selectedRecipe.id)}>
                    Approve Recipe
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageWrapper>
  );
};

export default CommunityManagement;
