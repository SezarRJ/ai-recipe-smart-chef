import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, Star, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { MobileNavigation } from '@/components/MobileNavigation'; // Assuming this component exists

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  current?: boolean;
}

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      interval: 'monthly',
      features: [
        '5 recipes per day',
        'Basic meal planning',
        'Community recipes',
        'Basic nutrition info'
      ],
      current: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      interval: 'monthly',
      features: [
        'Unlimited recipes',
        'Advanced meal planning',
        'Personalized recommendations',
        'Detailed nutrition tracking',
        'Recipe collections',
        'Priority support'
      ],
      popular: true
    },
    {
      id: 'premium-yearly',
      name: 'Premium Yearly',
      price: 99.99,
      interval: 'yearly',
      features: [
        'All Premium features',
        '2 months free',
        'Exclusive recipes',
        'Early access to new features',
        'Personal chef consultations'
      ]
    }
  ];

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    setSelectedPlan(planId);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Subscription updated",
        description: "Your subscription has been successfully updated!",
        variant: "default",
      });
      
      navigate('/payment-methods');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  const handleManageBilling = () => {
    toast({
      title: "Redirecting",
      description: "Opening billing portal...",
      variant: "default",
    });
  };

  // --- Nested Components ---

  const SubscriptionHeader = ({ title, description }: { title: string; description: string }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </motion.div>
    );
  };

  const CurrentSubscriptionCard = ({ currentPlanName, activeSince }: { currentPlanName: string; activeSince: string }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="text-wasfah-orange" size={20} />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{currentPlanName} Plan</p>
                <p className="text-gray-600">Active since {activeSince}</p>
              </div>
              <Button variant="outline" onClick={handleManageBilling}>
                Manage Billing
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const SubscriptionPlanCard = ({ plan, loading, selectedPlan, onSubscribe, index }: { plan: SubscriptionPlan; loading: boolean; selectedPlan: string | null; onSubscribe: (planId: string) => void; index: number; }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
      >
        <Card className={`relative h-full ${plan.popular ? 'ring-2 ring-wasfah-orange' : ''} ${plan.current ? 'bg-orange-50' : ''}`}>
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-wasfah-orange text-white">
                <Star size={12} className="mr-1" />
                Most Popular
              </Badge>
            </div>
          )}
          
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-gray-600">/{plan.interval}</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <Check size={16} className="text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              {plan.current ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => onSubscribe(plan.id)}
                  disabled={loading && selectedPlan === plan.id}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {loading && selectedPlan === plan.id ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </div>
                  ) : (
                    plan.id === 'free' ? 'Downgrade' : 'Upgrade'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const FAQSection = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and bank transfers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">Yes! Premium plans come with a 7-day free trial. No credit card required.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // --- Main Component Render ---

  const currentActivePlan = plans.find(p => p.current);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4 max-w-6xl">
        <SubscriptionHeader
          title="Subscription Plans"
          description="Choose the perfect plan for your culinary journey"
        />

        {currentActivePlan && (
          <CurrentSubscriptionCard
            currentPlanName={currentActivePlan.name}
            activeSince="January 2024" // This would ideally come from user data
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              loading={loading}
              selectedPlan={selectedPlan}
              onSubscribe={handleSubscribe}
              index={index}
            />
          ))}
        </div>

        <FAQSection />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Subscription;
