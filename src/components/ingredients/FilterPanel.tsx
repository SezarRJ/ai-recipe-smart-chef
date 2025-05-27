
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, X } from 'lucide-react';

interface FilterOptions {
  dietary: string[];
  cookingTime: string[];
  difficulty: string[];
  cuisine: string[];
}

interface Filters {
  dietary: string;
  cookingTime: string;
  difficulty: string;
  cuisine: string;
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
  onCloseFilters
}) => {
  return (
    <>
      {/* Filter Summary Card */}
      <Card className="border-wasfah-mint/20 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-wasfah-deep-teal">Preference Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFilters}
              className="text-wasfah-bright-teal text-sm p-2"
            >
              <Settings className="h-4 w-4 mr-1" />
              {Object.values(filters).filter(v => v).length > 0 ?
                `${Object.values(filters).filter(v => v).length} Applied` :
                'Set Preferences'
              }
            </Button>
          </div>
          {Object.values(filters).filter(v => v).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(filters).filter(([_, v]) => v).map(([key, value]) => (
                <span key={key} className="bg-wasfah-mint/20 text-wasfah-deep-teal text-xs px-2 py-1 rounded-full">
                  {`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Screen Filter Panel */}
      <div className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${
        showFilters ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-wasfah-deep-teal">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onCloseFilters}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 space-y-6 overflow-y-auto h-full pb-24">
          {Object.entries(filterOptions).map(([filterType, options]) => (
            <div key={filterType} className="space-y-2">
              <label className="block text-sm font-medium text-wasfah-deep-teal capitalize">
                {filterType.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <select
                value={filters[filterType as keyof Filters]}
                onChange={(e) => onFilterChange(filterType as keyof Filters, e.target.value)}
                className="w-full p-3 border border-wasfah-mint/30 rounded-lg focus:border-wasfah-bright-teal focus:outline-none"
              >
                <option value="">Any {filterType.replace(/([A-Z])/g, ' $1').trim()}</option>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-wasfah-light-gray">
          <Button
            onClick={onCloseFilters}
            className="w-full h-12 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};
