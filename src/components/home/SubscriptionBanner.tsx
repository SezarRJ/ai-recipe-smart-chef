
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export const SubscriptionBanner: React.FC = () => {
  return (
    <Card className="overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-lg animate-scale-in">
      <div className="bg-gradient-to-r from-wasfah-deep-teal to-wasfah-bright-teal p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Unlock Premium Features</h3>
            <p className="text-xs opacity-90">Get personalized AI recommendations</p>
          </div>
          <Link to="/subscription">
            <Button 
              size="sm" 
              variant="secondary" 
              className="text-wasfah-deep-teal bg-white hover:bg-gray-100 transition-all duration-300 hover:shadow-md"
            >
              Upgrade <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
