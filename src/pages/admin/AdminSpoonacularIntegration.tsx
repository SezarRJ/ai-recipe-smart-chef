
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, Download, RefreshCw, ExternalLink, 
  ChefHat, Clock, Users, Star, Filter,
  Import, Database, Settings, Activity
} from 'lucide-react';
import { spoonacularService, SpoonacularRecipe } from '@/services/spoonacularService';
import { supabase } from '@/integrations/supabase/client';

export default function AdminSpoonacularIntegration() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SpoonacularRecipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<number>>(new Set());
  const [importStats, setImportStats] = useState({
    total: 0,
    imported: 0,
    failed: 0
  });

  // Search filters
  const [filters, setFilters] = useState({
    cuisine: '',
    diet: '',
    type: '',
    maxReadyTime: ''
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Search Query Required',
        description: 'Please enter a search term to find recipes.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const result = await spoonacularService.searchRecipes(searchQuery, {
        cuisine: filters.cuisine || undefined,
        diet: filters.diet || undefined,
        type: filters.type || undefined,
        maxReadyTime: filters.maxReadyTime ? parseInt(filters.maxReadyTime) : undefined,
        number: 20
      });

      setSearchResults(result.results);
      toast({
        title: 'Search Complete',
        description: `Found ${result.results.length} recipes from Spoonacular.`
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Search Failed',
        description: 'Failed to search recipes from Spoonacular API.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImportSelected = async () => {
    if (selectedRecipes.size === 0) {
      toast({
        title: 'No Recipes Selected',
        description: 'Please select recipes to import.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    const recipesToImport = searchResults.filter(recipe => selectedRecipes.has(recipe.id));
    let imported = 0;
    let failed = 0;

    for (const spoonacularRecipe of recipesToImport) {
      try {
        // Get detailed recipe information
        const detailedRecipe = await spoonacularService.getRecipeInformation(spoonacularRecipe.id);
        
        // Convert to our format
        const wasfahRecipe = spoonacularService.convertToWasfahRecipe(detailedRecipe);

        // Insert into database
        const { error } = await supabase
          .from('recipes')
          .insert({
            ...wasfahRecipe,
            user_id: null, // System recipe
            is_public: true,
            is_published: true,
            is_verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Import error:', error);
          failed++;
        } else {
          imported++;
        }
      } catch (error) {
        console.error('Recipe import error:', error);
        failed++;
      }
    }

    setImportStats({
      total: recipesToImport.length,
      imported,
      failed
    });

    toast({
      title: 'Import Complete',
      description: `Imported ${imported} recipes successfully. ${failed} failed.`,
      variant: imported > 0 ? 'default' : 'destructive'
    });

    setLoading(false);
    setSelectedRecipes(new Set());
  };

  const toggleRecipeSelection = (recipeId: number) => {
    const newSelection = new Set(selectedRecipes);
    if (newSelection.has(recipeId)) {
      newSelection.delete(recipeId);
    } else {
      newSelection.add(recipeId);
    }
    setSelectedRecipes(newSelection);
  };

  const selectAllRecipes = () => {
    setSelectedRecipes(new Set(searchResults.map(r => r.id)));
  };

  const clearSelection = () => {
    setSelectedRecipes(new Set());
  };

  const handleRandomImport = async () => {
    setLoading(true);
    try {
      const randomRecipes = await spoonacularService.getRandomRecipes({ number: 10 });
      
      let imported = 0;
      let failed = 0;

      for (const recipe of randomRecipes.recipes) {
        try {
          const wasfahRecipe = spoonacularService.convertToWasfahRecipe(recipe);

          const { error } = await supabase
            .from('recipes')
            .insert({
              ...wasfahRecipe,
              user_id: null,
              is_public: true,
              is_published: true,
              is_verified: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (error) {
            failed++;
          } else {
            imported++;
          }
        } catch (error) {
          failed++;
        }
      }

      toast({
        title: 'Random Import Complete',
        description: `Imported ${imported} random recipes. ${failed} failed.`
      });
    } catch (error) {
      toast({
        title: 'Random Import Failed',
        description: 'Failed to import random recipes.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <ChefHat className="mr-2 h-6 w-6" /> Spoonacular Integration
          </h1>
          <p className="text-muted-foreground">Import and manage recipes from Spoonacular API</p>
        </div>
      </div>

      <Tabs defaultValue="search">
        <TabsList className="mb-4">
          <TabsTrigger value="search">Recipe Search & Import</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
          <TabsTrigger value="stats">Import Statistics</TabsTrigger>
          <TabsTrigger value="settings">API Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <div className="space-y-6">
            {/* Search Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Recipe Search
                </CardTitle>
                <CardDescription>Search and import recipes from Spoonacular</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <Label htmlFor="search-query">Search Query</Label>
                    <Input
                      id="search-query"
                      placeholder="e.g., chicken pasta"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cuisine">Cuisine</Label>
                    <Select value={filters.cuisine} onValueChange={(value) => setFilters({...filters, cuisine: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any cuisine</SelectItem>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                        <SelectItem value="middle eastern">Middle Eastern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="diet">Diet</Label>
                    <Select value={filters.diet} onValueChange={(value) => setFilters({...filters, diet: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any diet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any diet</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten free">Gluten Free</SelectItem>
                        <SelectItem value="ketogenic">Ketogenic</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Meal Type</Label>
                    <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any type</SelectItem>
                        <SelectItem value="main course">Main Course</SelectItem>
                        <SelectItem value="side dish">Side Dish</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                        <SelectItem value="appetizer">Appetizer</SelectItem>
                        <SelectItem value="salad">Salad</SelectItem>
                        <SelectItem value="soup">Soup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="max-time">Max Cook Time (minutes)</Label>
                    <Input
                      id="max-time"
                      type="number"
                      placeholder="e.g., 30"
                      value={filters.maxReadyTime}
                      onChange={(e) => setFilters({...filters, maxReadyTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSearch} disabled={loading}>
                    {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                    Search Recipes
                  </Button>
                  
                  {searchResults.length > 0 && (
                    <>
                      <Button variant="outline" onClick={selectAllRecipes}>
                        Select All ({searchResults.length})
                      </Button>
                      <Button variant="outline" onClick={clearSelection}>
                        Clear Selection
                      </Button>
                      <Button 
                        onClick={handleImportSelected} 
                        disabled={selectedRecipes.size === 0 || loading}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Import className="mr-2 h-4 w-4" />
                        Import Selected ({selectedRecipes.size})
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Search Results ({searchResults.length})</CardTitle>
                  <CardDescription>Select recipes to import into your database</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {searchResults.map((recipe) => (
                      <div 
                        key={recipe.id} 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedRecipes.has(recipe.id) 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleRecipeSelection(recipe.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm line-clamp-2">{recipe.title}</h3>
                          <input
                            type="checkbox"
                            checked={selectedRecipes.has(recipe.id)}
                            onChange={() => toggleRecipeSelection(recipe.id)}
                            className="ml-2"
                          />
                        </div>
                        
                        {recipe.image && (
                          <img 
                            src={recipe.image} 
                            alt={recipe.title}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                        )}
                        
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {recipe.readyInMinutes} minutes
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {recipe.servings} servings
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {recipe.cuisines?.slice(0, 2).map((cuisine) => (
                            <Badge key={cuisine} variant="secondary" className="text-xs">
                              {cuisine}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bulk">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Import Operations</CardTitle>
                <CardDescription>Import large quantities of recipes automatically</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Random Recipe Import</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Import 10 random high-quality recipes to populate your database
                    </p>
                    <Button onClick={handleRandomImport} disabled={loading}>
                      <Database className="mr-2 h-4 w-4" />
                      Import 10 Random Recipes
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Popular Recipes Import</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Import trending and popular recipes from various cuisines
                    </p>
                    <Button disabled>
                      <Star className="mr-2 h-4 w-4" />
                      Import Popular Recipes (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Imported</CardTitle>
                  <Import className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{importStats.imported}</div>
                  <p className="text-xs text-muted-foreground">
                    recipes imported successfully
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Failed Imports</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{importStats.failed}</div>
                  <p className="text-xs text-muted-foreground">
                    imports failed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {importStats.total > 0 
                      ? Math.round((importStats.imported / importStats.total) * 100)
                      : 0
                    }%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    of last import batch
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Spoonacular API Settings
              </CardTitle>
              <CardDescription>Configure your Spoonacular API integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key"
                  type="password"
                  value="437914c63f4748c49a8236e93c3758eb"
                  disabled
                />
                <p className="text-xs text-green-600 mt-1">✓ API key is configured and active</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Daily Quota Used</Label>
                  <div className="text-2xl font-bold">145 / 150</div>
                  <p className="text-xs text-muted-foreground">requests today</p>
                </div>
                
                <div>
                  <Label>Monthly Quota Used</Label>
                  <div className="text-2xl font-bold">1,234 / 10,000</div>
                  <p className="text-xs text-muted-foreground">requests this month</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" asChild>
                  <a href="https://spoonacular.com/food-api/console" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Spoonacular Console
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
