
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, AlertTriangle, Trash2 } from 'lucide-react';
import { PantryItem } from '@/types/index';

interface PantryItemCardProps {
  item: PantryItem;
  onDelete?: (id: string) => void;
}

export const PantryItemCard: React.FC<PantryItemCardProps> = ({ item, onDelete }) => {
  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(item.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {item.quantity} {item.unit}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {item.expiryDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className={`text-sm ${
              isExpired(item.expiryDate) ? 'text-red-600' :
              isExpiringSoon(item.expiryDate) ? 'text-orange-600' : 'text-gray-600'
            }`}>
              {isExpired(item.expiryDate) ? 'Expired' :
               isExpiringSoon(item.expiryDate) ? 'Expiring soon' : 'Fresh'}
            </span>
            {(isExpired(item.expiryDate) || isExpiringSoon(item.expiryDate)) && (
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            )}
          </div>
        )}

        <Badge variant="secondary">{item.category}</Badge>
      </CardContent>
    </Card>
  );
};
