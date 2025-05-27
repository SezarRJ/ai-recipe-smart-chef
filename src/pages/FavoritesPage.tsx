import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { mockRecipes } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, History, Filter, Calendar, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Recipe } from '@/types';

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [sortBy, setSortBy] = useState('newest');
  const [filterCuisine, setFilterCuisine] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - in a real app this would come from an API
  const favoriteRecipes = mockRecipes.filter(recipe => recipe.isFavorite);
  
  // Mock history data with dates
  const historyData = mockRecipes.map((recipe, index) => {
    const daysAgo = index % 7; // 0-6 days ago
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    return {
      recipe,
      viewedAt: date.toISOString(),
      completed: Math.random() > 0.5
    };
  });

  // Sort and filter recipes
  const getSortedAndFilteredRecipes = (recipes: Recipe[]) => {
    // Apply filters
    let filtered = recipes;
    if (filterCuisine) {
      filtered = filtered.filter(recipe => recipe.cuisineType?.toLowerCase() === filterCuisine.toLowerCase());
    }
    if (filterDifficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty?.toLowerCase() === filterDifficulty.toLowerCase());
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return b.id.localeCompare(a.id); // Using ID as proxy for date in mock data
      } else if (sortBy === 'oldest') {
        return a.id.localeCompare(b.id);
      } else if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  };
  
  // Format date for history items
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };

  // Group history items by date
  const groupedHistory = historyData.reduce<Record<string, typeof historyData>>((acc, item) => {
    const dateKey = formatDate(item.viewedAt);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {});

  return (
    <PageContainer header={{ title: 'My Collection', showBackButton: true, showSearch: true }}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="pb-20">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="favorites">
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-wasfah-deep-teal">
            {activeTab === 'favorites' ? 'Saved Recipes' : 'Recently Viewed'}
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-wasfah-deep-teal"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
        
        {showFilters && (
          <Card className="mb-4">
            <CardContent className="p-3 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium mb-1 block">Cuisine</label>
                <Select value={filterCuisine} onValueChange={setFilterCuisine}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="All cuisines" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All cuisines</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium mb-1 block">Difficulty</label>
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
        
        <TabsContent value="favorites" className="space-y-4">
          {getSortedAndFilteredRecipes(favoriteRecipes).length > 0 ? (
            <RecipeGrid recipes={getSortedAndFilteredRecipes(favoriteRecipes)} columns={2} cardSize="medium" />
          ) : (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <h3 className="font-medium text-lg">No favorite recipes yet</h3>
              <p className="text-gray-500 mb-4">Save recipes you love to find them here</p>
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                Find Recipes
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          {Object.keys(groupedHistory).length > 0 ? (
            Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date}>
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-wasfah-deep-teal mr-1" />
                  <h3 className="text-sm font-medium text-wasfah-deep-teal">{date}</h3>
                </div>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex items-center p-2">
                          <div className="w-16 h-16 overflow-hidden rounded-md shrink-0">
                            <img src={item.recipe.image} alt={item.recipe.title} className="h-full w-full object-cover" />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm">{item.recipe.title}</h4>
                              {item.recipe.isFavorite && <Heart className="h-3 w-3 text-red-500" fill="currentColor" />}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{item.recipe.prepTime + item.recipe.cookTime} min</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-wasfah-deep-teal font-medium">
                                {item.completed ? 'Cooked' : 'Viewed'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(item.viewedAt).toLocaleTimeString(undefined, {
                                  hour: 'numeric', 
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <History className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <h3 className="font-medium text-lg">No history yet</h3>
              <p className="text-gray-500 mb-4">Your recently viewed recipes will appear here</p>
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                Browse Recipes
              </Button>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full border-gray-300 text-gray-500 hover:bg-gray-100"
          >
            Clear History
          </Button>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
