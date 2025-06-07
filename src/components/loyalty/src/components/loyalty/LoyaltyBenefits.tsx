
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, Zap, Crown, Trophy, Sparkles } from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  icon: React.ElementType;
  isUnlocked: boolean;
}

interface LoyaltyBenefitsProps {
  userPoints: number;
  userTier: string;
}

export const LoyaltyBenefits: React.FC<LoyaltyBenefitsProps> = ({
  userPoints,
  userTier
}) => {
  const benefits: Benefit[] = [
    {
      id: 'recipe-favorites',
      title: 'Unlimited Recipe Favorites',
      description: 'Save as many recipes as you want to your favorites collection',
      pointsRequired: 0,
      tier: 'bronze',
      icon: Star,
      isUnlocked: true
    },
    {
      id: 'weekly-meal-plans',
      title: 'Weekly Meal Plans',
      description: 'Get personalized weekly meal plans based on your preferences',
      pointsRequired: 100,
      tier: 'bronze',
      icon: Gift,
      isUnlocked: userPoints >= 100
    },
    {
      id: 'priority-support',
      title: 'Priority Customer Support',
      description: 'Get faster response times from our support team',
      pointsRequired: 250,
      tier: 'silver',
      icon: Zap,
      isUnlocked: userPoints >= 250
    },
    {
      id: 'exclusive-recipes',
      title: 'Exclusive Chef Recipes',
      description: 'Access to premium recipes from professional chefs',
      pointsRequired: 500,
      tier: 'gold',
      icon: Crown,
      isUnlocked: userPoints >= 500
    },
    {
      id: 'cooking-masterclass',
      title: 'Cooking Masterclass Access',
      description: 'Free access to online cooking masterclasses',
      pointsRequired: 1000,
      tier: 'platinum',
      icon: Trophy,
      isUnlocked: userPoints >= 1000
    },
    {
      id: 'personal-chef-consultation',
      title: 'Personal Chef Consultation',
      description: '1-on-1 consultation with a professional chef',
      pointsRequired: 2000,
      tier: 'platinum',
      icon: Sparkles,
      isUnlocked: userPoints >= 2000
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconColor = (tier: string, isUnlocked: boolean) => {
    if (!isUnlocked) return 'text-gray-400';
    
    switch (tier) {
      case 'bronze': return 'text-amber-600';
      case 'silver': return 'text-gray-600';
      case 'gold': return 'text-yellow-600';
      case 'platinum': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-wasfah-deep-teal mb-4">Your Benefits</h3>
      
      <div className="grid gap-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <Card key={benefit.id} className={`transition-all ${benefit.isUnlocked ? 'border-wasfah-bright-teal shadow-md' : 'border-gray-200 opacity-60'}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${benefit.isUnlocked ? 'bg-wasfah-light-gray' : 'bg-gray-100'}`}>
                    <Icon className={`h-5 w-5 ${getIconColor(benefit.tier, benefit.isUnlocked)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${benefit.isUnlocked ? 'text-wasfah-deep-teal' : 'text-gray-500'}`}>
                        {benefit.title}
                      </h4>
                      <Badge variant="outline" className={getTierColor(benefit.tier)}>
                        {benefit.tier}
                      </Badge>
                    </div>
                    
                    <p className={`text-sm ${benefit.isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {benefit.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${benefit.isUnlocked ? 'text-wasfah-bright-teal' : 'text-gray-400'}`}>
                        {benefit.pointsRequired} points required
                      </span>
                      
                      {benefit.isUnlocked ? (
                        <Badge className="bg-green-100 text-green-800">
                          Unlocked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          {benefit.pointsRequired - userPoints} points needed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
