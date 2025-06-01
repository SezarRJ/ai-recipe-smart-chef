
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Check, X, Eye, Clock, User, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SharedRecipe {
  id: string;
  title: string;
  description: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  ingredients: string[];
  instructions: string[];
  cooking_time: number;
  difficulty: string;
  cuisine_type: string;
  image_url?: string;
}

export default function AdminSharedRecipeModeration() {
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<SharedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [selectedRecipe, setSelectedRecipe] = useState<SharedRecipe | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock data for demonstration
  const mockRecipes: SharedRecipe[] = [
    {
      id: '1',
      title: 'Grandmother\'s Secret Hummus',
      description: 'A family recipe passed down through generations',
      author: 'Sarah Ahmed',
      status: 'pending',
      submitted_at: '2024-01-20T10:30:00Z',
      ingredients: ['2 cups chickpeas', '1/4 cup tahini', '2 cloves garlic', 'Lemon juice', 'Olive oil'],
      instructions: ['Soak chickpeas overnight', 'Cook until tender', 'Blend with tahini and garlic', 'Add lemon juice and olive oil'],
      cooking_time: 30,
      difficulty: 'Easy',
      cuisine_type: 'Middle Eastern'
    },
    {
      id: '2',
      title: 'Spicy Korean Kimchi Fried Rice',
      description: 'Perfect way to use leftover kimchi',
      author: 'Min Jung',
      status: 'pending',
      submitted_at: '2024-01-19T14:15:00Z',
      ingredients: ['2 cups cooked rice', '1 cup kimchi', '2 eggs', 'Sesame oil', 'Green onions'],
      instructions: ['Heat oil in pan', 'Add kimchi and rice', 'Stir fry for 5 minutes', 'Top with fried egg'],
      cooking_time: 15,
      difficulty: 'Medium',
      cuisine_type: 'Korean'
    },
    {
      id: '3',
      title: 'Classic Italian Carbonara',
      description: 'Authentic Roman pasta dish',
      author: 'Giuseppe Romano',
      status: 'approved',
      submitted_at: '2024-01-18T09:45:00Z',
      ingredients: ['400g spaghetti', '200g pancetta', '3 eggs', 'Parmesan cheese', 'Black pepper'],
      instructions: ['Cook pasta al dente', 'Fry pancetta until crispy', 'Mix eggs with cheese', 'Combine everything off heat'],
      cooking_time: 20,
      difficulty: 'Medium',
      cuisine_type: 'Italian'
    },
    {
      id: '4',
      title: 'Questionable Fish Curry',
      description: 'Fish curry with unusual ingredients',
      author: 'Anonymous User',
      status: 'rejected',
      submitted_at: '2024-01-17T16:20:00Z',
      ingredients: ['Fish', 'Curry powder', 'Strange ingredient'],
      instructions: ['Cook fish', 'Add curry', 'Mix everything'],
      cooking_time: 25,
      difficulty: 'Hard',
      cuisine_type: 'Indian'
    }
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setRecipes(mockRecipes);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast({
        title: "Error",
        description: "Failed to load shared recipes",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleRecipeAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return;

      // Update recipe status
      setRecipes(prev => 
        prev.map(r => 
          r.id === id 
            ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' }
            : r
        )
      );

      toast({
        title: "Success",
        description: `Recipe "${recipe.title}" has been ${action}d`,
      });

      // Here you would make the actual API call to update the recipe status
      // await supabase.from('shared_recipes').update({ status: action === 'approve' ? 'approved' : 'rejected' }).eq('id', id);
      
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast({
        title: "Error",
        description: "Failed to update recipe status",
        variant: "destructive",
      });
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || recipe.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const viewRecipeDetails = (recipe: SharedRecipe) => {
    setSelectedRecipe(recipe);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Shared Recipe Moderation</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{filteredRecipes.length} recipes</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recipe Submissions</CardTitle>
          <CardDescription>
            Review and moderate user-submitted recipes. Approve quality recipes or reject inappropriate content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search recipes or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipe</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Cuisine</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading recipes...
                    </TableCell>
                  </TableRow>
                ) : filteredRecipes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No recipes found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{recipe.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {recipe.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {recipe.author}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                      <TableCell>
                        {new Date(recipe.submitted_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{recipe.cuisine_type}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => viewRecipeDetails(recipe)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {recipe.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600"
                              onClick={() => handleRecipeAction(recipe.id, 'approve')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600"
                              onClick={() => handleRecipeAction(recipe.id, 'reject')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recipe Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ChefHat className="h-5 w-5 mr-2" />
              {selectedRecipe?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedRecipe && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600">{selectedRecipe.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Details</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Author:</strong> {selectedRecipe.author}</li>
                    <li><strong>Cooking Time:</strong> {selectedRecipe.cooking_time} mins</li>
                    <li><strong>Difficulty:</strong> {selectedRecipe.difficulty}</li>
                    <li><strong>Cuisine:</strong> {selectedRecipe.cuisine_type}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Status</h4>
                  {getStatusBadge(selectedRecipe.status)}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Instructions</h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              {selectedRecipe.status === 'pending' && (
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => {
                      handleRecipeAction(selectedRecipe.id, 'approve');
                      setIsViewDialogOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Recipe
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleRecipeAction(selectedRecipe.id, 'reject');
                      setIsViewDialogOpen(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Recipe
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
