
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Check, Crown, Zap, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Subscription = () => {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState("free");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic recipe search",
        "Simple meal planning",
        "Limited AI recommendations",
        "Basic pantry management",
        "5 saved recipes",
        "Community recipes access"
      ],
      limitations: [
        "Limited to 5 saved recipes",
        "Basic AI features only",
        "No priority support"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99",
      period: "month",
      description: "For serious home cooks",
      popular: true,
      features: [
        "Unlimited recipe saving",
        "Advanced AI recipe suggestions",
        "Smart meal planning",
        "Advanced pantry management",
        "Nutritional analysis",
        "Shopping list optimization",
        "Voice recipe reading",
        "Export recipes to PDF",
        "Priority customer support",
        "Ad-free experience"
      ],
      savings: "Most Popular"
    },
    {
      id: "family",
      name: "Family",
      price: "$19.99",
      period: "month",
      description: "Perfect for families",
      features: [
        "Everything in Premium",
        "Up to 6 family accounts",
        "Family meal planning",
        "Shared shopping lists",
        "Kids-friendly recipes",
        "Allergen management for family",
        "Bulk recipe scaling",
        "Family nutrition tracking",
        "Custom dietary profiles",
        "24/7 premium support"
      ],
      savings: "Best for Families"
    }
  ];

  const handleSubscribe = (planId: string) => {
    if (planId === currentPlan) {
      toast({
        title: "Already subscribed",
        description: "You're already on this plan"
      });
      return;
    }

    toast({
      title: "Redirecting to payment",
      description: "Taking you to secure checkout..."
    });
    
    // Simulate subscription process
    setTimeout(() => {
      setCurrentPlan(planId);
      toast({
        title: "Subscription updated!",
        description: `Successfully subscribed to ${plans.find(p => p.id === planId)?.name} plan`
      });
    }, 2000);
  };

  const handleManageSubscription = () => {
    toast({
      title: "Opening billing portal",
      description: "Redirecting to manage your subscription..."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              Subscription Plans
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Choose the perfect plan for your cooking journey
            </p>
          </div>
        </div>

        {/* Current Plan Status */}
        {currentPlan !== "free" && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-800">
                    Current Plan: {plans.find(p => p.id === currentPlan)?.name}
                  </p>
                  <p className="text-sm text-green-600">Your subscription is active</p>
                </div>
                <Button variant="outline" onClick={handleManageSubscription}>
                  Manage Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.popular ? "ring-2 ring-wasfah-orange" : ""
              } ${
                currentPlan === plan.id ? "border-green-500 bg-green-50" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-wasfah-orange">
                    <Star size={12} className="mr-1" />
                    {plan.savings}
                  </Badge>
                </div>
              )}
              
              {plan.savings && !plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary">{plan.savings}</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {plan.name === "Premium" && <Crown className="text-wasfah-orange mr-2" size={24} />}
                  {plan.name === "Family" && <Zap className="text-purple-500 mr-2" size={24} />}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                
                {currentPlan === plan.id && (
                  <Badge className="bg-green-500 mb-2">Current Plan</Badge>
                )}
                
                <div className="mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={16} className="text-green-500 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Limitations:</p>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="text-xs text-gray-500">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  variant={currentPlan === plan.id ? "outline" : "default"}
                  disabled={currentPlan === plan.id}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {currentPlan === plan.id 
                    ? "Current Plan" 
                    : plan.id === "free" 
                      ? "Downgrade to Free" 
                      : `Upgrade to ${plan.name}`
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Why Upgrade?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Unlimited Access</h3>
                <p className="text-sm text-gray-600">Save unlimited recipes and create comprehensive meal plans</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="text-green-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-600">Get personalized recipe recommendations and smart meal planning</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="text-purple-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Premium Support</h3>
                <p className="text-sm text-gray-600">Get priority customer support and exclusive features</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default Subscription;
