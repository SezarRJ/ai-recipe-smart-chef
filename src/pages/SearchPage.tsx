
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { mockRecipes } from '@/data/mockData';
import { Recipe } from '@/types';
import { Clock, Filter, X, Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'chicken curry',
    'pasta',
    'vegan desserts',
    'quick lunch'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Perform search
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = mockRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsLoading(false);
      
      // Save to recent searches if it's a new search
      if (query.trim() && !recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      }
    }, 500);
  };
  
  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };
  
  // Handle recent search click
  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };
  
  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };
  
  return (
    <PageContainer
      header={{
        showBackButton: true,
      }}
    >
      <div className="space-y-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, ingredients..."
            className="pr-16"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <X size={16} />
            </button>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-wasfah-deep-teal"
          >
            <SearchIcon size={20} />
          </Button>
        </form>
        
        {!searchResults.length && !isLoading && !searchQuery && (
          <div className="space-y-6">
            {recentSearches.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Recent searches</h3>
                  <Button
                    variant="ghost"
                    className="text-xs text-wasfah-bright-teal"
                    onClick={clearRecentSearches}
                  >
                    Clear all
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {recentSearches.map((query, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                      onClick={() => handleRecentSearchClick(query)}
                    >
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        <span>{query}</span>
                      </div>
                      <X size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Popular searches</h3>
              <div className="flex flex-wrap gap-2">
                {['Quick dinner', 'Healthy lunch', 'Vegetarian', 'Dessert', 'Breakfast'].map((term, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(term);
                      performSearch(term);
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-wasfah-bright-teal mx-auto"></div>
            <p className="mt-4 text-gray-500">Searching for recipes...</p>
          </div>
        )}
        
        {!isLoading && searchResults.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                Found {searchResults.length} results for "{searchQuery}"
              </p>
              <Button variant="ghost" size="sm" className="flex items-center">
                <Filter size={16} className="mr-1" />
                Filter
              </Button>
            </div>
            
            <RecipeGrid recipes={searchResults} columns={2} cardSize="medium" />
          </div>
        )}
        
        {!isLoading && searchQuery && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <SearchIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any recipes matching "{searchQuery}"
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/recipes')}
              className="border-wasfah-bright-teal text-wasfah-bright-teal"
            >
              Browse all recipes
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
