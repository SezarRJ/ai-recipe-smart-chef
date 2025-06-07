
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const BasicSearch = () => {
  const { t } = useRTL();
  const [searchTerm, setSearchTerm] = useState('');

  const mockDrinks = [
    {
      id: 1,
      name: t('Mojito', 'موهيتو'),
      category: 'Cocktail',
      alcohol: 'Rum',
      difficulty: 'Easy'
    },
    {
      id: 2,
      name: t('Margarita', 'مارغاريتا'),
      category: 'Cocktail',
      alcohol: 'Tequila',
      difficulty: 'Medium'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('Search Drinks', 'البحث عن المشروبات')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('Search for drinks...', 'ابحث عن المشروبات...')}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {t('Filters', 'المرشحات')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockDrinks.map((drink) => (
          <Card key={drink.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{drink.name}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{drink.category}</Badge>
                <Badge variant="outline">{drink.alcohol}</Badge>
                <Badge>{drink.difficulty}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BasicSearch;
