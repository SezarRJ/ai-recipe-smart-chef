
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan }) => {
  return (
    <Card className={`border-2 ${plan.popular ? plan.color + ' shadow-lg' : 'border-gray-200 dark:border-gray-700'} relative overflow-hidden`}>
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className={`${plan.color.replace('border', 'bg')} text-white px-3 py-1 rounded-bl-lg text-xs font-medium flex items-center`}>
            <Star className="h-3 w-3 mr-1" fill="white" strokeWidth={0} />
            Popular
          </div>
        </div>
      )}
      
      <CardHeader className={`pb-2 ${plan.popular ? 'bg-gradient-to-r from-' + plan.color.split('-')[1] + '-50 to-' + plan.color.split('-')[1] + '-50/10 dark:from-gray-800 dark:to-gray-800/80' : ''}`}>
        <CardTitle className={`text-lg ${plan.popular ? plan.color.replace('border', 'text').replace('-300', '-600') : ''}`}>{plan.name}</CardTitle>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{plan.price}</span>
          <span className="text-sm text-gray-500 ml-1">/{plan.interval}</span>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-4 w-4 mr-2 mt-0.5 ${plan.color.replace('border', 'text').replace('-300', '-500')}`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Link to="/subscription" className="w-full">
          <Button 
            className={`w-full ${
              plan.popular 
                ? plan.color.replace('border', 'bg').replace('-300', '-500') + ' hover:' + plan.color.replace('border', 'bg').replace('-300', '-600') + ' text-white' 
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            variant={plan.popular ? "default" : "outline"}
          >
            {plan.popular ? 'Get Started' : 'Subscribe'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
