
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Share2, Users, TrendingUp, Star } from 'lucide-react';
import { mockRecipes } from '@/data/mockData';

const SharedRecipesPage = () => {
  const [activeTab, setActiveTab] = useState('shared-by-me');

  const sharedStats = {
    totalShared: 24,
    totalViews: 1248,
    totalLikes: 186,
    totalComments: 43
  };

  return (
    <PageContainer
      header={{
        title: 'Shared Recipes',
        showBackButton: true,
        showSearch: true
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Share2 className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
              <div className="text-2xl font-bold">{sharedStats.totalShared}</div>
              <div className="text-sm text-gray-600">Shared</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{sharedStats.totalViews}</div>
              <div className="text-sm text-gray-600">Views</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{sharedStats.totalLikes}</div>
              <div className="text-sm text-gray-600">Likes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{sharedStats.totalComments}</div>
              <div className="text-sm text-gray-600">Comments</div>
            </CardContent>
          </Card>
        </div>

        {/* Share New Recipe Button */}
        <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
          <Share2 className="h-4 w-4 mr-2" />
          Share New Recipe
        </Button>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shared-by-me">My Shared</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="shared-by-me" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recipes I've Shared</h3>
              <Badge variant="outline">24 recipes</Badge>
            </div>
            <RecipeGrid recipes={mockRecipes} columns={2} cardSize="medium" />
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Community Recipes</h3>
              <Badge variant="outline">1.2k recipes</Badge>
            </div>
            <RecipeGrid recipes={mockRecipes} columns={2} cardSize="medium" />
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Trending This Week</h3>
              <Badge variant="outline">Hot 🔥</Badge>
            </div>
            <RecipeGrid recipes={mockRecipes} columns={2} cardSize="medium" />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default SharedRecipesPage;
