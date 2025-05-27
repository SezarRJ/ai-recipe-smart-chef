
import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '@/types';

interface RecipeGridProps {
  recipes: Recipe[];
  columns?: 1 | 2 | 3;
  cardSize?: 'small' | 'medium' | 'large';
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  columns = 2,
  cardSize = 'medium',
}) => {
  // Determine the grid columns based on the columns prop
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  }[columns];

  return (
    <div className={`grid ${gridColsClass} gap-4`}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} size={cardSize} />
      ))}
    </div>
  );
};
