
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockRecipes } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Heart, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CookingMode } from '@/components/recipe/CookingMode';
import { RecipeDetail } from '@/components/recipe/RecipeDetail';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCookingMode, setIsCookingMode] = useState(false);
  
  const recipe = mockRecipes.find(r => r.id === id);
  
  if (!recipe) {
    return (
      <PageContainer
        header={{
          title: 'Recipe Not Found',
          showBackButton: true,
        }}
      >
        <div className="container px-4 py-8 text-center">
          <p>The recipe you're looking for doesn't exist.</p>
          <Button 
            className="mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
            onClick={() => navigate('/recipes')}
          >
            Browse Recipes
          </Button>
        </div>
      </PageContainer>
    );
  }

  const handleAddToShoppingList = () => {
    toast({
      title: "Added to Shopping List",
      description: "Missing ingredients have been added to your shopping list.",
    });
  };

  const handleStartCookingMode = () => {
    setIsCookingMode(true);
  };

  if (isCookingMode) {
    return <CookingMode recipe={recipe} onClose={() => setIsCookingMode(false)} />;
  }

  return (
    <PageContainer
      header={{
        showBackButton: true,
        actions: (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
              <Heart 
                size={20} 
                className={recipe.isFavorite ? 'fill-wasfah-coral-red text-wasfah-coral-red' : ''}
              />
            </Button>
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
              <Share size={20} />
            </Button>
          </div>
        ),
      }}
      fullWidth
      noPadding
    >
      <RecipeDetail 
        recipe={recipe}
        onAddToShoppingList={handleAddToShoppingList}
        onStartCookingMode={handleStartCookingMode}
      />
    </PageContainer>
  );
}
