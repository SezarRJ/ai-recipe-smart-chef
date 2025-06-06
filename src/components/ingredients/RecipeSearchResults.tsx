
import React from 'react';
import { ChefHat } from 'lucide-react';
import { Recipe } from '@/types/index';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { PageContainer } from '@/components/layout/PageContainer';
import { useRTL } from '@/contexts/RTLContext';

interface RecipeSearchResultsProps {
  searchResults: Recipe[];
  onBack: () => void;
}

export const RecipeSearchResults: React.FC<RecipeSearchResultsProps> = ({
  searchResults,
  onBack
}) => {
  const { t } = useRTL();

  return (
    <PageContainer
      header={{
        title: t('Search Results', 'نتائج البحث'),
        showBackButton: true
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center">
          <button 
            onClick={onBack}
            className="mb-4 px-4 py-2 text-wasfah-deep-teal hover:underline flex items-center justify-center"
          >
            <span>← {t('Back to Search', 'العودة للبحث')}</span>
          </button>
          <h2 className="text-2xl font-bold mb-2">
            {t(`Found ${searchResults.length} recipes`, `تم العثور على ${searchResults.length} وصفة`)}
          </h2>
          <p className="text-gray-600">
            {t('Recipes using your selected ingredients', 'وصفات باستخدام المكونات المختارة')}
          </p>
        </div>
        <RecipeGrid recipes={searchResults} />
        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ChefHat className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {t('No recipes found', 'لم يتم العثور على وصفات')}
            </h3>
            <p className="text-gray-500 mb-4">
              {t('Try different ingredients or adjust your filters', 'جرب مكونات مختلفة أو عدل المرشحات')}
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
