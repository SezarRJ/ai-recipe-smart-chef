
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MealCard } from '@/components/meal-plan/MealCard';
import { MealPlan } from '@/types';
import { ChevronRight } from 'lucide-react';

interface TodayMealPlanProps {
  mealPlan: MealPlan | undefined;
}

export const TodayMealPlan: React.FC<TodayMealPlanProps> = ({ mealPlan }) => {
  if (!mealPlan) return null;
  
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-wasfah-deep-teal">Your meal plan today</h2>
        <Link to="/meal-plan">
          <Button 
            variant="link" 
            className="text-wasfah-bright-teal p-0 group transition-all duration-300 hover:translate-x-1"
          >
            View Week
            <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <div className="space-y-2">
        {mealPlan.meals.map((meal, index) => (
          <div 
            key={meal.id} 
            className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <MealCard meal={meal} />
          </div>
        ))}
      </div>
    </div>
  );
};
