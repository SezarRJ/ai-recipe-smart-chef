
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { CategoryFilters } from '@/components/recipe/CategoryFilters';
import { mockRecipes, categories, cuisines, difficulties, dietaryOptions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  Filter, 
  X, 
  Clock, 
  AlertCircle, 
  GraduationCap,
  Globe 
} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Recipe } from '@/types';

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(mockRecipes);
  const [filters, setFilters] = useState({
    cuisines: [] as string[],
    difficulties: [] as string[],
    dietary: [] as string[],
    time: 0, // in minutes, 0 means no limit
  });
  
  // Apply filters to recipes
  useEffect(() => {
    let result = [...mockRecipes];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(recipe => recipe.tags.includes(selectedCategory));
    }
    
    // Apply cuisine filter
    if (filters.cuisines.length > 0) {
      result = result.filter(recipe => 
        filters.cuisines.includes(recipe.cuisineType)
      );
    }
    
    // Apply difficulty filter
    if (filters.difficulties.length > 0) {
      result = result.filter(recipe => 
        filters.difficulties.includes(recipe.difficulty)
      );
    }
    
    // Apply time filter
    if (filters.time > 0) {
      result = result.filter(recipe => 
        recipe.prepTime + recipe.cookTime <= filters.time
      );
    }
    
    // Apply dietary filter (this would need proper recipe tags in real implementation)
    if (filters.dietary.length > 0) {
      result = result.filter(recipe => 
        filters.dietary.some(diet => recipe.tags.includes(diet))
      );
    }
    
    setFilteredRecipes(result);
  }, [selectedCategory, filters]);

  const toggleCuisine = (cuisine: string) => {
    setFilters(prev => {
      const newCuisines = prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine];
      return { ...prev, cuisines: newCuisines };
    });
  };

  const toggleDifficulty = (difficulty: string) => {
    setFilters(prev => {
      const newDifficulties = prev.difficulties.includes(difficulty)
        ? prev.difficulties.filter(d => d !== difficulty)
        : [...prev.difficulties, difficulty];
      return { ...prev, difficulties: newDifficulties };
    });
  };

  const toggleDietary = (diet: string) => {
    setFilters(prev => {
      const newDietary = prev.dietary.includes(diet)
        ? prev.dietary.filter(d => d !== diet)
        : [...prev.dietary, diet];
      return { ...prev, dietary: newDietary };
    });
  };

  const setTimeFilter = (time: number) => {
    setFilters(prev => ({ ...prev, time }));
  };

  const clearFilters = () => {
    setFilters({
      cuisines: [],
      difficulties: [],
      dietary: [],
      time: 0,
    });
  };

  const activeFilterCount = 
    filters.cuisines.length + 
    filters.difficulties.length + 
    filters.dietary.length + 
    (filters.time > 0 ? 1 : 0);

  return (
    <PageContainer
      header={{
        title: 'Recipes',
        showSearch: true,
        actions: (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-wasfah-deep-teal">
                <Filter size={20} />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-wasfah-coral-red text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[85vw]">
              <SheetHeader>
                <SheetTitle className="flex justify-between">
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="text-wasfah-coral-red hover:text-wasfah-coral-red hover:bg-red-50"
                    >
                      <X size={16} className="mr-1" />
                      Clear All
                    </Button>
                  )}
                </SheetTitle>
                <SheetDescription>
                  Refine your recipe search with filters
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-4">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="cooking-time">
                    <AccordionTrigger className="py-3">
                      <div className="flex items-center">
                        <Clock size={18} className="mr-2 text-wasfah-bright-teal" />
                        <span>Cooking Time</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {[30, 45, 60, 90].map(time => (
                          <Button
                            key={time}
                            variant="outline"
                            size="sm"
                            className={filters.time === time 
                              ? 'bg-wasfah-bright-teal text-white border-wasfah-bright-teal' 
                              : ''
                            }
                            onClick={() => setTimeFilter(filters.time === time ? 0 : time)}
                          >
                            Under {time} mins
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="difficulty">
                    <AccordionTrigger className="py-3">
                      <div className="flex items-center">
                        <GraduationCap size={18} className="mr-2 text-wasfah-bright-teal" />
                        <span>Difficulty Level</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {difficulties.map(difficulty => (
                          <div key={difficulty} className="flex items-center space-x-2">
                            <Checkbox
                              id={`difficulty-${difficulty}`}
                              checked={filters.difficulties.includes(difficulty)}
                              onCheckedChange={() => toggleDifficulty(difficulty)}
                            />
                            <Label htmlFor={`difficulty-${difficulty}`}>{difficulty}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="cuisine">
                    <AccordionTrigger className="py-3">
                      <div className="flex items-center">
                        <Globe size={18} className="mr-2 text-wasfah-bright-teal" />
                        <span>Cuisine</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {cuisines.map(cuisine => (
                          <div key={cuisine} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cuisine-${cuisine}`}
                              checked={filters.cuisines.includes(cuisine)}
                              onCheckedChange={() => toggleCuisine(cuisine)}
                            />
                            <Label htmlFor={`cuisine-${cuisine}`}>{cuisine}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="dietary">
                    <AccordionTrigger className="py-3">
                      <div className="flex items-center">
                        <AlertCircle size={18} className="mr-2 text-wasfah-bright-teal" />
                        <span>Dietary Restrictions</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {dietaryOptions.map(diet => (
                          <div key={diet} className="flex items-center space-x-2">
                            <Checkbox
                              id={`diet-${diet}`}
                              checked={filters.dietary.includes(diet)}
                              onCheckedChange={() => toggleDietary(diet)}
                            />
                            <Label htmlFor={`diet-${diet}`}>{diet}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <SheetFooter>
                <SheetClose asChild>
                  <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ),
      }}
    >
      <div className="container px-4 py-4">
        <CategoryFilters
          categories={['All', ...categories]}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="mt-5">
          {filteredRecipes.length > 0 ? (
            <RecipeGrid recipes={filteredRecipes} columns={2} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No recipes match your filters.</p>
              <Button 
                variant="link" 
                className="text-wasfah-bright-teal mt-2"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
