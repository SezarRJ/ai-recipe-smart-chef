
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useRTL } from '@/contexts/RTLContext';

interface CategorySelectorProps {
  selectedCategory?: string;
  selectedSubcategory?: string;
  onCategoryChange?: (category: string, subcategory: string) => void;
  className?: string;
}

interface Category {
  category: string;
  subcategories: string[];
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  className
}) => {
  const { t } = useRTL();
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('recipe_categories')
        .select('category, subcategory, display_order')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;

      // Group subcategories by category
      const groupedCategories: { [key: string]: string[] } = {};
      data?.forEach(item => {
        if (!groupedCategories[item.category]) {
          groupedCategories[item.category] = [];
        }
        groupedCategories[item.category].push(item.subcategory);
      });

      const formattedCategories = Object.entries(groupedCategories).map(([category, subcategories]) => ({
        category,
        subcategories
      }));

      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSubcategorySelect = (category: string, subcategory: string) => {
    onCategoryChange?.(category, subcategory);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food':
        return '🍽️';
      case 'Desserts':
        return '🍰';
      case 'Drinks':
        return '🥤';
      default:
        return '📝';
    }
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-200 rounded-lg" />;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">
          {t('Recipe Categories', 'فئات الوصفات')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {categories.map((categoryData) => (
          <div key={categoryData.category} className="border rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              className="w-full justify-between p-3 h-auto"
              onClick={() => toggleCategory(categoryData.category)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{getCategoryIcon(categoryData.category)}</span>
                <span className="font-medium">{categoryData.category}</span>
                <Badge variant="secondary" className="text-xs">
                  {categoryData.subcategories.length}
                </Badge>
              </div>
              {expandedCategories.has(categoryData.category) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            
            {expandedCategories.has(categoryData.category) && (
              <div className="p-2 bg-gray-50 border-t">
                <div className="grid grid-cols-1 gap-1">
                  {categoryData.subcategories.map((subcategory) => (
                    <Button
                      key={subcategory}
                      variant={
                        selectedCategory === categoryData.category && selectedSubcategory === subcategory
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      className="justify-start text-sm"
                      onClick={() => handleSubcategorySelect(categoryData.category, subcategory)}
                    >
                      {subcategory}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
