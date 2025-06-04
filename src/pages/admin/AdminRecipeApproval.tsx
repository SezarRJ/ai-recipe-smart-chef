import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat, CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PendingRecipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  prep_time: number;
  cooking_time: number;
  servings: number;
  difficulty: string;
  calories: number;
  cuisine_type: string;
  created_at: string;
  user_id: string;
  is_published: boolean;
}

export default function AdminRecipeApproval() {
  const [selectedRecipe, setSelectedRecipe] = useState<PendingRecipe | null>(null);

  const { data: pendingRecipes, isLoading, refetch } = useQuery({
    queryKey: ['pending-recipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('is_published', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        image_url: recipe.image_url,
        prep_time: recipe.prep_time || 0,
        cooking_time: recipe.cooking_time || 0,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        calories: recipe.calories,
        cuisine_type: recipe.cuisine_type,
        created_at: recipe.created_at,
        user_id: recipe.user_id,
        is_published: recipe.is_published,
      })) || [];
    }
  });

  const handleApprove = async (recipeId: string) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .update({ 
          is_published: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', recipeId);

      if (error) throw error;

      toast({
        title: "Recipe Approved",
        description: "The recipe has been published successfully."
      });

      refetch();
    } catch (error) {
      console.error('Error approving recipe:', error);
      toast({
        title: "Error",
        description: "Failed to approve recipe. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReject = async (recipeId: string) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId);

      if (error) throw error;

      toast({
        title: "Recipe Rejected",
        description: "The recipe has been removed."
      });

      refetch();
      setSelectedRecipe(null);
    } catch (error) {
      console.error('Error rejecting recipe:', error);
      toast({
        title: "Error",
        description: "Failed to reject recipe. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wasfah-bright-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Recipe Approval</h1>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {pendingRecipes?.length || 0} Pending
        </Badge>
      </div>

      {!pendingRecipes || pendingRecipes.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
            <p className="text-gray-600">No recipes pending approval at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recipe List */}
          <div className="space-y-4">
            {pendingRecipes.map((recipe) => (
              <Card 
                key={recipe.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRecipe?.id === recipe.id ? 'ring-2 ring-wasfah-bright-teal' : ''
                }`}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {recipe.image_url && (
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{recipe.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{recipe.prep_time + recipe.cooking_time}m</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{recipe.servings}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChefHat size={14} />
                          <span>{recipe.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recipe Details */}
          <div className="sticky top-6">
            {selectedRecipe ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recipe Details</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRecipe(null)}
                    >
                      <XCircle size={16} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedRecipe.image_url && (
                    <img
                      src={selectedRecipe.image_url}
                      alt={selectedRecipe.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">{selectedRecipe.title}</h3>
                    <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Prep Time:</strong> {selectedRecipe.prep_time}m
                    </div>
                    <div>
                      <strong>Cook Time:</strong> {selectedRecipe.cooking_time}m
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
                      <strong>Cuisine:</strong> {selectedRecipe.cuisine_type}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => handleApprove(selectedRecipe.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(selectedRecipe.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Eye className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Recipe</h3>
                  <p className="text-gray-600">Click on a recipe from the list to view details and take action.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
