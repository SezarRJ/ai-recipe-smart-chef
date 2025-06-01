
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Filter, Clock, Users, ChefHat } from 'lucide-react';
import { mockRecipes } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  // Filter only favorite recipes
  const favoriteRecipes = mockRecipes.filter(recipe => recipe.isFavorite);

  const filteredRecipes = favoriteRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           recipe.categories.some(cat => cat.toLowerCase() === selectedCategory) ||
                           recipe.cuisine_type?.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating - a.rating;
      case 'time':
        return (a.prep_time + a.cooking_time) - (b.prep_time + b.cooking_time);
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      default:
        return 0;
    }
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'italian', label: 'Italian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'asian', label: 'Asian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'american', label: 'American' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'healthy', label: 'Healthy' }
  ];

  const sortOptions = [
    { value: 'title', label: 'Name (A-Z)' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'time', label: 'Cooking Time (Low to High)' },
    { value: 'difficulty', label: 'Difficulty (Easy to Hard)' }
  ];

  return (
    <PageContainer 
      header={{ 
        title: 'My Favorites', 
        showBackButton: true 
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Search and Filter Section */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search your favorite recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex space-x-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {sortedRecipes.length} favorite recipe{sortedRecipes.length !== 1 ? 's' : ''} found
          </p>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            <Heart className="mr-1 h-3 w-3 fill-current" />
            Favorites
          </Badge>
        </div>

        {/* Recipe Grid */}
        {sortedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                  <div className="relative">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${recipe.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Heart 
                        className="h-6 w-6 text-red-500 fill-current drop-shadow-sm" 
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-wasfah-mint transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-sm opacity-90 line-clamp-2 mb-2">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{recipe.prep_time + recipe.cooking_time}m</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{recipe.servings}</span>
                        </div>
                        <div className="flex items-center">
                          <ChefHat className="h-4 w-4 mr-1" />
                          <span>{recipe.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{recipe.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {recipe.categories.slice(0, 2).map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {recipe.categories.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {favoriteRecipes.length === 0 ? 'No favorites yet' : 'No recipes found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {favoriteRecipes.length === 0
                  ? 'Start exploring recipes and add your favorites by tapping the heart icon!'
                  : 'Try adjusting your search or filter criteria to find your favorite recipes.'}
              </p>
              <Link to="/recipes">
                <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                  {favoriteRecipes.length === 0 ? 'Browse Recipes' : 'Clear Filters'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
