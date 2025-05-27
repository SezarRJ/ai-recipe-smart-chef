
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap pb-2">
      <div className="flex space-x-2 px-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            className={cn(
              'rounded-full border transition-all',
              selectedCategory === category
                ? 'bg-wasfah-bright-teal text-white border-wasfah-bright-teal'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            )}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
