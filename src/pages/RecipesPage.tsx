
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Clock, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecipesPage = () => {
  const navigate = useNavigate();

  const mockRecipes = [
    {
      id: '1',
      title: 'Chicken Biryani',
      description: 'Aromatic rice dish with tender chicken and spices',
      cookTime: '45 min',
      servings: 4,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1563379091339-03246962d633?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '2',
      title: 'Margherita Pizza',
      description: 'Classic Italian pizza with fresh basil and mozzarella',
      cookTime: '30 min',
      servings: 2,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '3',
      title: 'Caesar Salad',
      description: 'Fresh romaine lettuce with parmesan and croutons',
      cookTime: '15 min',
      servings: 2,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <PageContainer header={{ title: 'Recipes', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Recipes</h1>
          <Button onClick={() => navigate('/create-recipe')}>
            <ChefHat className="h-4 w-4 mr-2" />
            Create Recipe
          </Button>
        </div>

        <div className="grid gap-4">
          {mockRecipes.map((recipe) => (
            <Card key={recipe.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/recipe/${recipe.id}`)}>
              <div className="flex">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-24 h-24 object-cover rounded-l-lg"
                />
                <div className="flex-1 p-4">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{recipe.description}</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {recipe.cookTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {recipe.servings} servings
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {recipe.rating}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default RecipesPage;
