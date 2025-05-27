
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Meal } from '@/types';
import { Link } from 'react-router-dom';

interface MealCardProps {
  meal: Meal;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  // Check if meal and recipe exist before accessing their properties
  if (!meal || !meal.recipe) {
    return (
      <Card className="mb-3">
        <CardContent className="p-3">
          <p className="text-sm text-gray-500">Meal information unavailable</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to={`/recipe/${meal.recipe.id}`}>
      <Card className="mb-3 hover:scale-105 transition-transform duration-300">
        <CardContent className="p-0">
          <div className="flex">
            <div
              className="w-24 h-24 bg-cover bg-center"
              style={{ backgroundImage: `url(${meal.recipe.image})` }}
            />
            <div className="p-3 flex-1">
              <h4 className="text-sm font-medium text-wasfah-bright-teal">{meal.type}</h4>
              <h3 className="font-bold text-wasfah-deep-teal">{meal.recipe.title}</h3>
              <p className="text-sm text-gray-500">{meal.recipe.calories} calories</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
