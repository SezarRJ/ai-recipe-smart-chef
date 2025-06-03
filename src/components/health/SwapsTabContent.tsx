
import React from 'react';
import { IngredientSwapCard } from './IngredientSwapCard';
import { ActionButton } from './ActionButton';
import { ArrowLeftRight } from 'lucide-react';

interface SwapsTabContentProps {
  ingredientSwaps: any[];
  t: (english: string, arabic?: string) => string;
}

export const SwapsTabContent: React.FC<SwapsTabContentProps> = ({ ingredientSwaps, t }) => (
  <div className="space-y-4 mt-4">
    <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
      {t('Healthier Ingredient Alternatives', 'بدائل المكونات الصحية')}
    </h3>
    <div className="space-y-4">
      {ingredientSwaps.map((swap, index) => (
        <IngredientSwapCard key={index} swap={swap} t={t} />
      ))}
    </div>
    <ActionButton to="/ingredient-swap" icon={<ArrowLeftRight className="h-4 w-4" />}>
      {t('View All Ingredient Swaps', 'عرض جميع بدائل المكونات')}
    </ActionButton>
  </div>
);
