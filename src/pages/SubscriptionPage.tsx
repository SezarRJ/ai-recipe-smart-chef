
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, CreditCard, Shield, Users } from 'lucide-react';
import { PaymentModal } from '@/components/ui/payment-modal';

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 4.99,
    period: 'month',
    description: 'Perfect for casual cooking',
    features: [
      'Access to 1000+ recipes',
      'Basic meal planning',
      'Recipe bookmarks',
      'Community access',
      'Email support'
    ],
    icon: Star,
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    period: 'month',
    description: 'Best for cooking enthusiasts',
    features: [
      'Access to 5000+ premium recipes',
      'Advanced meal planning',
      'Nutrition tracking',
      'Shopping list generation',
      'Video tutorials',
      'Priority support',
      'Ad-free experience'
    ],
    icon: Crown,
    popular: true
  },
  {
    id: 'family',
    name: 'Family',
    price: 14.99,
    period: 'month',
    description: 'Perfect for families',
    features: [
      'Everything in Premium',
      'Up to 6 family accounts',
      'Kid-friendly recipes',
      'Family meal planning',
      'Bulk shopping lists',
      'Family nutrition tracking',
      'Custom dietary profiles'
    ],
    icon: Users,
    popular: false
  }
];

export default function SubscriptionPage() {
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    planName: string;
    amount: number;
    features: string[];
  }>({
    isOpen: false,
    planName: '',
    amount: 0,
    features: []
  });

  const handleSubscribe = (plan: typeof subscriptionPlans[0]) => {
    setPaymentModal({
      isOpen: true,
      planName: plan.name,
      amount: plan.price,
      features: plan.features
    });
  };

  const closePaymentModal = () => {
    setPaymentModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <PageContainer 
      header={{ 
        title: 'Subscription Plans', 
        showBackButton: true 
      }}
    >
      <div className="container px-4 py-6 pb-32 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Choose Your Plan</h1>
          <p className="text-gray-600 text-sm md:text-base">Unlock premium features and enhance your cooking journey</p>
        </div>

        {/* Current Subscription Status */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Free Plan</h3>
                  <p className="text-sm text-green-600">Currently active</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-2 border-wasfah-bright-teal' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-wasfah-bright-teal text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <plan.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold">
                    ${plan.price}
                    <span className="text-base md:text-lg font-normal text-gray-500">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan)}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Why Subscribe?</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <Zap className="h-8 w-8 text-wasfah-bright-teal mx-auto" />
              <h3 className="font-semibold">Premium Recipes</h3>
              <p className="text-sm text-gray-600">Access thousands of exclusive recipes from top chefs</p>
            </div>
            <div className="text-center space-y-2">
              <Shield className="h-8 w-8 text-green-500 mx-auto" />
              <h3 className="font-semibold">Ad-Free Experience</h3>
              <p className="text-sm text-gray-600">Enjoy cooking without interruptions</p>
            </div>
            <div className="text-center space-y-2">
              <CreditCard className="h-8 w-8 text-purple-500 mx-auto" />
              <h3 className="font-semibold">Advanced Planning</h3>
              <p className="text-sm text-gray-600">Smart meal planning and shopping lists</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50 safe-area-bottom">
        <div className="max-w-md mx-auto flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">Start your premium journey</p>
            <p className="text-xs text-gray-600">7-day free trial • Cancel anytime</p>
          </div>
          <Button 
            onClick={() => handleSubscribe(subscriptionPlans[1])}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal w-full md:w-auto"
          >
            Try Premium
          </Button>
        </div>
      </div>

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        planName={paymentModal.planName}
        amount={paymentModal.amount}
        features={paymentModal.features}
      />
    </PageContainer>
  );
}
