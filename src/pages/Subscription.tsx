
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Check, Crown, Zap } from "lucide-react";

const Subscription = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic recipe search",
        "Simple meal planning",
        "Limited AI recommendations",
        "Basic pantry management"
      ],
      current: true
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "month",
      features: [
        "Unlimited AI recipe suggestions",
        "Advanced meal planning",
        "Smart shopping lists",
        "Nutritional analysis",
        "Voice recipe reading",
        "Priority customer support"
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Subscription Plans
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Upgrade for premium cooking features
          </p>
        </div>

        <div className="space-y-4">
          {plans.map((plan, index) => (
            <Card key={index} className={plan.popular ? "ring-2 ring-wasfah-orange" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {plan.name === "Premium" && <Crown className="text-wasfah-orange" size={20} />}
                    {plan.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    {plan.popular && <Badge className="bg-wasfah-orange">Popular</Badge>}
                    {plan.current && <Badge variant="secondary">Current</Badge>}
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.current ? "outline" : "default"}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default Subscription;
