
import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/AdminPageWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  MessageSquare,
  ChefHat
} from 'lucide-react';
import { toast } from 'sonner';
import { SharedRecipe } from '@/types/index';

// Mock data for shared recipes
const mockSharedRecipes: SharedRecipe[] = [
  {
    id: '1',
    title: 'Authentic Italian Carbonara',
    description: 'Traditional Roman pasta dish with eggs, cheese, and pancetta',
    image: '/placeholder.svg',
    prep_time: 15,
    cooking_time: 20,
    servings: 4,
    difficulty: 'Medium',
    calories: 580,
    protein: 25,
    carbs: 65,
    fat: 22,
    rating: 0,
    rating_count: 0,
    ingredients: [],
    instructions: ['Boil pasta', 'Cook pancetta', 'Mix eggs and cheese', 'Combine all ingredients'],
    categories: ['Italian', 'Pasta'],
    tags: ['traditional', 'comfort-food'],
    isFavorite: false,
    status: 'pending',
    submitted_by: 'user123',
    submitted_at: '2023-09-20T10:30:00Z'
  },
  {
    id: '2',
    title: 'Vegan Buddha Bowl',
    description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
    image: '/placeholder.svg',
    prep_time: 20,
    cooking_time: 25,
    servings: 2,
    difficulty: 'Easy',
    calories: 420,
    protein: 15,
    carbs: 58,
    fat: 18,
    rating: 0,
    rating_count: 0,
    ingredients: [],
    instructions: ['Cook quinoa', 'Roast vegetables', 'Prepare dressing', 'Assemble bowl'],
    categories: ['Vegan', 'Healthy'],
    tags: ['plant-based', 'nutritious'],
    isFavorite: false,
    status: 'approved',
    submitted_by: 'healthyfoodie',
    submitted_at: '2023-09-19T14:20:00Z',
    moderated_by: 'admin',
    moderated_at: '2023-09-19T16:45:00Z'
  },
  {
    id: '3',
    title: 'Spicy Korean Kimchi Ramen',
    description: 'Instant ramen elevated with kimchi, vegetables, and a soft-boiled egg',
    image: '/placeholder.svg',
    prep_time: 10,
    cooking_time: 15,
    servings: 1,
    difficulty: 'Easy',
    calories: 380,
    protein: 18,
    carbs: 45,
    fat: 12,
    rating: 0,
    rating_count: 0,
    ingredients: [],
    instructions: ['Boil water', 'Add ramen and kimchi', 'Cook egg', 'Serve hot'],
    categories: ['Korean', 'Quick'],
    tags: ['spicy', 'comfort-food'],
    isFavorite: false,
    status: 'rejected',
    submitted_by: 'spicylover',
    submitted_at: '2023-09-18T09:15:00Z',
    moderated_by: 'admin',
    moderated_at: '2023-09-18T11:30:00Z',
    moderation_notes: 'Recipe lacks detailed instructions and nutritional information'
  }
];

const AdminSharedRecipeModeration = () => {
  const [recipes, setRecipes] = useState<SharedRecipe[]>(mockSharedRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<SharedRecipe | null>(null);
  const [moderationNotes, setModerationNotes] = useState('');

  const pendingRecipes = recipes.filter(r => r.status === 'pending');
  const approvedRecipes = recipes.filter(r => r.status === 'approved');
  const rejectedRecipes = recipes.filter(r => r.status === 'rejected');

  const handleModerate = (recipeId: string, action: 'approved' | 'rejected') => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === recipeId 
        ? {
            ...recipe,
            status: action,
            moderated_by: 'admin',
            moderated_at: new Date().toISOString(),
            moderation_notes: moderationNotes
          }
        : recipe
    ));

    toast.success(`Recipe ${action} successfully!`);
    setSelectedRecipe(null);
    setModerationNotes('');
  };

  const getStatusBadge = (status: SharedRecipe['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
    }
  };

  const RecipeCard = ({ recipe }: { recipe: SharedRecipe }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedRecipe(recipe)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-1">{recipe.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
          </div>
          <div className="ml-4">
            {getStatusBadge(recipe.status)}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              {recipe.submitted_by}
            </span>
            <span>{recipe.prep_time + recipe.cooking_time} min</span>
            <span>{recipe.difficulty}</span>
          </div>
          <span>{new Date(recipe.submitted_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminPageWrapper title="Recipe Moderation">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{pendingRecipes.length}</div>
                  <div className="text-sm text-gray-600">Pending Review</div>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{approvedRecipes.length}</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{rejectedRecipes.length}</div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Lists */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({pendingRecipes.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedRecipes.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedRecipes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingRecipes.length > 0 ? (
              pendingRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No pending recipes to review.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4 mt-6">
            {approvedRecipes.length > 0 ? (
              approvedRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No approved recipes yet.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {rejectedRecipes.length > 0 ? (
              rejectedRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No rejected recipes.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{selectedRecipe.title}</h2>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedRecipe.status)}
                    <Button onClick={() => setSelectedRecipe(null)} variant="outline">
                      Close
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700">{selectedRecipe.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Prep Time:</strong> {selectedRecipe.prep_time} min
                      </div>
                      <div>
                        <strong>Cook Time:</strong> {selectedRecipe.cooking_time} min
                      </div>
                      <div>
                        <strong>Servings:</strong> {selectedRecipe.servings}
                      </div>
                      <div>
                        <strong>Difficulty:</strong> {selectedRecipe.difficulty}
                      </div>
                      <div>
                        <strong>Calories:</strong> {selectedRecipe.calories}
                      </div>
                      <div>
                        <strong>Submitted by:</strong> {selectedRecipe.submitted_by}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-700">{instruction}</li>
                    ))}
                  </ol>
                </div>

                {selectedRecipe.status === 'pending' && (
                  <div className="space-y-4 border-t pt-6">
                    <div>
                      <label htmlFor="moderation-notes" className="block text-sm font-medium mb-2">
                        Moderation Notes (optional)
                      </label>
                      <Textarea
                        id="moderation-notes"
                        value={moderationNotes}
                        onChange={(e) => setModerationNotes(e.target.value)}
                        placeholder="Add any notes about your decision..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleModerate(selectedRecipe.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Recipe
                      </Button>
                      <Button
                        onClick={() => handleModerate(selectedRecipe.id, 'rejected')}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Recipe
                      </Button>
                    </div>
                  </div>
                )}

                {selectedRecipe.moderation_notes && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Moderation Notes:</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedRecipe.moderation_notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPageWrapper>
  );
};

export default AdminSharedRecipeModeration;
