
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PantryItem } from '@/types/index';
import { isAfter, parseISO, format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface PantryItemCardProps {
  item: PantryItem;
  onDelete: () => Promise<boolean>;
}

export const PantryItemCard: React.FC<PantryItemCardProps> = ({ item, onDelete }) => {
  const getExpiryText = () => {
    if (!item.expiryDate) return 'No expiry date';
    
    const expiryDate = parseISO(item.expiryDate);
    const today = new Date();
    
    if (isAfter(today, expiryDate)) {
      return 'Expired';
    }
    
    const daysLeft = differenceInDays(expiryDate, today);
    
    if (daysLeft === 0) {
      return 'Expires today';
    } else if (daysLeft === 1) {
      return 'Expires tomorrow';
    } else {
      return `Expires in ${daysLeft} days`;
    }
  };
  
  const expiryText = getExpiryText();
  const isExpired = expiryText === 'Expired';
  const isExpiringSoon = expiryText === 'Expires today' || expiryText === 'Expires tomorrow';
  
  return (
    <Card className={cn(
      'mb-2',
      isExpired && 'border-wasfah-coral-red',
      isExpiringSoon && 'border-amber-400'
    )}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-wasfah-deep-teal">{item.name}</h3>
            <p className={cn(
              'text-sm',
              isExpired ? 'text-wasfah-coral-red' : isExpiringSoon ? 'text-amber-500' : 'text-gray-500'
            )}>
              {expiryText}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="font-medium">{item.quantity} {item.unit}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-wasfah-coral-red hover:text-wasfah-coral-red hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
