
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, CheckCircle, X, Clock, Eye, MessageSquare, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';

interface PendingRecipe {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cookingTime: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image?: string;
  tags: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const mockPendingRecipes: PendingRecipe[] = [
  {
    id: 'recipe1',
    title: 'Homemade Pizza Margherita',
    author: 'John Smith',
    authorAvatar: '/placeholder.svg',
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'pending',
    category: 'Italian',
    difficulty: 'Easy',
    cookingTime: '45 min',
    description: 'Classic Italian pizza with fresh basil, mozzarella, and tomato sauce',
    ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
    instructions: ['Prepare the dough', 'Add sauce', 'Add cheese', 'Bake at 450°F'],
    image: '/placeholder.svg',
    tags: ['vegetarian', 'italian', 'comfort-food'],
    nutritionInfo: {
      calories: 280,
      protein: 12,
      carbs: 35,
      fat: 10
    }
  },
  {
    id: 'recipe2',
    title: 'Chocolate Lava Cake',
    author: 'Sarah Johnson',
    authorAvatar: '/placeholder.svg',
    submittedAt: '2024-01-14T15:20:00Z',
    status: 'pending',
    category: 'Dessert',
    difficulty: 'Hard',
    cookingTime: '60 min',
    description: 'Decadent chocolate cake with molten center',
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour'],
    instructions: ['Melt chocolate', 'Mix ingredients', 'Bake in ramekins'],
    image: '/placeholder.svg',
    tags: ['dessert', 'chocolate', 'indulgent'],
    nutritionInfo: {
      calories: 450,
      protein: 6,
      carbs: 55,
      fat: 22
    }
  },
  {
    id: 'recipe3',
    title: 'Thai Green Curry',
    author: 'Mike Chen',
    authorAvatar: '/placeholder.svg',
    submittedAt: '2024-01-13T09:15:00Z',
    status: 'pending',
    category: 'Thai',
    difficulty: 'Medium',
    cookingTime: '40 min',
    description: 'Authentic Thai curry with coconut milk and fresh herbs',
    ingredients: ['Green curry paste', 'Coconut milk', 'Chicken', 'Thai basil', 'Fish sauce'],
    instructions: ['Heat curry paste', 'Add coconut milk', 'Add protein', 'Simmer and serve'],
    image: '/placeholder.svg',
    tags: ['thai', 'curry', 'spicy', 'asian'],
    nutritionInfo: {
      calories: 320,
      protein: 25,
      carbs: 15,
      fat: 18
    }
  }
];

export default function AdminRecipeApproval() {
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<PendingRecipe[]>(mockPendingRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState<PendingRecipe[]>(mockPendingRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<PendingRecipe | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  useEffect(() => {
    let filtered = [...recipes];

    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(recipe => recipe.status === statusFilter);
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchQuery, statusFilter]);

  const handleApprove = (recipeId: string) => {
    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, status: 'approved' as const }
          : recipe
      )
    );

    const recipe = recipes.find(r => r.id === recipeId);
    toast({
      title: "Recipe Approved",
      description: `"${recipe?.title}" has been approved and published to the community.`,
    });
  };

  const handleReject = () => {
    if (!selectedRecipe) return;

    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === selectedRecipe.id 
          ? { ...recipe, status: 'rejected' as const }
          : recipe
      )
    );

    toast({
      title: "Recipe Rejected",
      description: `"${selectedRecipe.title}" has been rejected.`,
      variant: "destructive",
    });

    setIsRejectDialogOpen(false);
    setRejectionReason('');
    setSelectedRecipe(null);
  };

  const handleBulkApprove = () => {
    const pendingRecipes = filteredRecipes.filter(r => r.status === 'pending');
    if (pendingRecipes.length === 0) {
      toast({
        title: "No Pending Recipes",
        description: "There are no pending recipes to approve.",
      });
      return;
    }

    setRecipes(prev => 
      prev.map(recipe => 
        recipe.status === 'pending' 
          ? { ...recipe, status: 'approved' as const }
          : recipe
      )
    );

    toast({
      title: "Bulk Approval Complete",
      description: `${pendingRecipes.length} recipes have been approved.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout title="Recipe Approval">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Recipe Approval</h1>
            <p className="text-muted-foreground">Review and approve recipes submitted by community members</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve All Pending
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Recipe Submissions</CardTitle>
            <CardDescription>
              Review recipes submitted by users and approve or reject them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
              <div className="flex w-full md:max-w-sm items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search recipes..."
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select onValueChange={setStatusFilter} value={statusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipe</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{recipe.title}</p>
                            <p className="text-sm text-muted-foreground">{recipe.cookingTime}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={recipe.authorAvatar} />
                            <AvatarFallback>{recipe.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{recipe.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>{recipe.category}</TableCell>
                      <TableCell>
                        <Badge variant={recipe.difficulty === 'Easy' ? 'default' : recipe.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {recipe.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(recipe.submittedAt)}</TableCell>
                      <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedRecipe(recipe);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {recipe.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => handleApprove(recipe.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedRecipe(recipe);
                                setIsRejectDialogOpen(true);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Recipe Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedRecipe?.title}</DialogTitle>
              <DialogDescription>
                Recipe details for review
              </DialogDescription>
            </DialogHeader>
            {selectedRecipe && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.title}
                      className="w-full h-48 rounded-lg object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <p><strong>Author:</strong> {selectedRecipe.author}</p>
                    <p><strong>Category:</strong> {selectedRecipe.category}</p>
                    <p><strong>Difficulty:</strong> {selectedRecipe.difficulty}</p>
                    <p><strong>Cooking Time:</strong> {selectedRecipe.cookingTime}</p>
                    <p><strong>Submitted:</strong> {formatDate(selectedRecipe.submittedAt)}</p>
                    <div>
                      <strong>Tags:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedRecipe.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm">{selectedRecipe.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {selectedRecipe.nutritionInfo && (
                  <div>
                    <h4 className="font-semibold mb-2">Nutrition Information</h4>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{selectedRecipe.nutritionInfo.calories}</p>
                        <p className="text-muted-foreground">Calories</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{selectedRecipe.nutritionInfo.protein}g</p>
                        <p className="text-muted-foreground">Protein</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{selectedRecipe.nutritionInfo.carbs}g</p>
                        <p className="text-muted-foreground">Carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{selectedRecipe.nutritionInfo.fat}g</p>
                        <p className="text-muted-foreground">Fat</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reject Recipe Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Recipe</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting "{selectedRecipe?.title}"
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Provide feedback for the user..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject Recipe
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
