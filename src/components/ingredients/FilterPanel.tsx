
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Filter } from 'lucide-react';

interface Filters {
  dietary: string;
  cookTime: string;
  difficulty: string;
  cuisine: string;
}

interface FilterOptions {
  dietary: string[];
  cookTime: string[];
  difficulty: string[];
  cuisine: string[];
}

interface FilterPanelProps {
  filters: Filters;
  filterOptions: FilterOptions;
  showFilters: boolean;
  onFilterChange: (filterType: keyof Filters, value: string) => void;
  onToggleFilters: () => void;
  onCloseFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  filterOptions,
  showFilters,
  onFilterChange,
  onToggleFilters,
  onCloseFilters,
}) => {
  return (
    <>
      <Button
        variant="outline"
        onClick={onToggleFilters}
        className="mb-4"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>

      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={onCloseFilters}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Dietary</label>
                <Select value={filters.dietary} onValueChange={(value) => onFilterChange('dietary', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dietary preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.dietary.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Cook Time</label>
                <Select value={filters.cookTime} onValueChange={(value) => onFilterChange('cookTime', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cook time" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.cookTime.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty</label>
                <Select value={filters.difficulty} onValueChange={(value) => onFilterChange('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.difficulty.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Cuisine</label>
                <Select value={filters.cuisine} onValueChange={(value) => onFilterChange('cuisine', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.cuisine.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
