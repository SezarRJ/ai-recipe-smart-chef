
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from 'lucide-react';

interface Alternative {
  name: string;
  benefits: string;
  ratio: string;
}

interface Swap {
  original: string;
  alternatives: Alternative[];
}

interface IngredientSwapCardProps {
  swap: Swap;
  t: (english: string, arabic?: string) => string;
}

export const IngredientSwapCard: React.FC<IngredientSwapCardProps> = ({ swap, t }) => (
  <Card className="border border-gray-200 dark:border-gray-700">
    <CardContent className="p-4">
      <h4 className="font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal flex items-center mb-3">
        <Tag className="h-4 w-4 mr-2" />
        {t('Instead of', 'بدلاً من')} <span className="text-wasfah-bright-teal ml-1">{swap.original}</span>, {t('try', 'جرب')}:
      </h4>
      <div className="space-y-3">
        {swap.alternatives.map((alt, altIdx) => (
          <div key={altIdx} className="bg-wasfah-light-gray dark:bg-gray-800 p-3 rounded-md">
            <div className="flex justify-between">
              <h5 className="font-medium">{alt.name}</h5>
              <span className="text-xs bg-wasfah-bright-teal text-white px-2 py-0.5 rounded-full">{alt.ratio}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alt.benefits}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
