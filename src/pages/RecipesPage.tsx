
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { SearchBar } from '@/components/recipe/SearchBar';
import { CategoryFilters } from '@/components/recipe/CategoryFilters';
import { mockRecipes } from '@/data/mockData';
import { Recipe } from '@/types/index';

const categories = ['All', 'Italian', 'Mediterranean', 'Asian', 'Mexican', 'American', 'Vegetarian', 'Healthy'];

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recipes] = useState<Recipe[]>(mockRecipes);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           recipe.categories.includes(selectedCategory) ||
                           recipe.cuisine_type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    console.log('Recipe clicked:', recipe);
  };

  return (
    <PageContainer 
      header={{ 
        title: 'Recipes', 
        showBackButton: true 
      }}
    >
      <div className="space-y-6 pb-20">
        <SearchBar onSearch={handleSearch} />
        
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          </p>
          <div className="text-sm text-gray-500">
            Avg cooking time: {Math.round(filteredRecipes.reduce((acc, recipe) => acc + recipe.prep_time + recipe.cooking_time, 0) / filteredRecipes.length || 0)} min
          </div>
        </div>

        <RecipeGrid 
          recipes={filteredRecipes}
          onRecipeClick={handleRecipeClick}
          columns={2}
          cardSize="medium"
        />
      </div>
    </PageContainer>
  );
}
