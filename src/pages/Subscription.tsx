import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Check, Crown, Zap, Star, ArrowLeft, Percent, ShieldCheck, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

const Subscription = () => {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState("free");
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'yearly'
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showCountdown, setShowCountdown] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const countdownRef = useRef<number | null>(null);

  const calculateTimeLeft = () => {
    const difference = +new Date("2025-06-01T00:00:00") - +new Date(); // Example: Offer ends June 1st, 2025
    let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      setShowCountdown(false);
      if (countdownRef.current) clearInterval(countdownRef.current);
    }
    return timeLeft;
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    countdownRef.current = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const plans = [
    {
      id: "free",
      name: "Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic recipe search",
        "Simple meal planning",
        "Limited AI recommendations",
        "Basic pantry management",
        "5 saved recipes",
        "Community recipes access",
      ],
      limitations: [
        "Limited to 5 saved recipes",
        "Basic AI features only",
        "No priority support",
      ],
      icon: null,
    },
    {
      id: "premium",
      name: "Premium",
      monthlyPrice: 9.99,
      yearlyPrice: 9.99 * 12 * 0.75, // 25% savings on annual
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
        "Ad-free experience",
      ],
      savings: "Most Popular",
      icon: <Crown className="text-wasfah-orange" size={24} />,
    },
    {
      id: "family",
      name: "Family",
      monthlyPrice: 19.99,
      yearlyPrice: 19.99 * 12 * 0.75, // 25% savings on annual
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
        "24/7 premium support",
      ],
      savings: "Best for Families",
      icon: <Zap className="text-purple-500" size={24} />,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.id === "free") return "$0";
    const basePrice = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    const discountedPrice = basePrice * (1 - promoDiscount);
    return `$${discountedPrice.toFixed(2)}`;
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setPromoDiscount(0.20);
      toast({
        title: "Promo Applied!",
        description: "You got 20% off your subscription!",
        variant: "success",
      });
    } else {
      setPromoDiscount(0);
      toast({
        title: "Invalid Promo Code",
        description: "Please try again with a valid code.",
        variant: "destructive",
      });
    }
  };

  const handleSubscribe = (planId: string) => {
    if (planId === currentPlan) {
      toast({
        title: "Already subscribed",
        description: "You're already on this plan",
        variant: "default",
      });
      return;
    }

    toast({
      title: "Redirecting to payment",
      description: "Taking you to secure checkout...",
      variant: "default",
    });

    // Simulate subscription process
    setTimeout(() => {
      setCurrentPlan(planId);
      toast({
        title: "Subscription updated!",
        description: `Successfully subscribed to ${plans.find((p) => p.id === planId)?.name} plan. Your new plan details will be reflected shortly.`,
        variant: "success",
      });
    }, 2000);
  };

  const handleManageSubscription = () => {
    toast({
      title: "Opening billing portal",
      description: "Redirecting to manage your subscription...",
      variant: "default",
    });
  };

  const allFeatures = [
    "Basic recipe search", "Unlimited recipe saving", "Simple meal planning",
    "Smart meal planning", "Limited AI recommendations", "Advanced AI recipe suggestions",
    "Basic pantry management", "Advanced pantry management", "Nutritional analysis",
    "Shopping list optimization", "Voice recipe reading", "Export recipes to PDF",
    "Priority customer support", "Ad-free experience", "Up to 6 family accounts",
    "Family meal planning", "Shared shopping lists", "Kids-friendly recipes",
    "Allergen management for family", "Bulk recipe scaling", "Family nutrition tracking",
    "Custom dietary profiles", "24/7 premium support", "Community recipes access"
  ];

  const featureSupport = (feature: string, planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return false;

    if (planId === "free") {
      return plan.features.includes(feature);
    } else if (planId === "premium") {
      return plan.features.includes(feature) || plans.find(p => p.id === "free")?.features.includes(feature);
    } else if (planId === "family") {
      return plan.features.includes(feature) || plans.find(p => p.id === "premium")?.features.includes(feature) || plans.find(p => p.id === "free")?.features.includes(feature);
    }
    return false;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-wasfah-orange transition-colors"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-2 text-gray-800">
              Choose Your Culinary Journey
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Unlock a world of flavors and smart cooking with Wasfah
            </p>
          </div>
        </div>

        {/* Limited Time Offer Banner */}
        {showCountdown && (
          <div className="bg-gradient-to-r from-wasfah-orange to-red-500 text-white p-3 rounded-lg shadow-lg mb-6 text-center animate-pulse">
            <p className="font-bold text-lg mb-1">Limited Time Offer! 🔥</p>
            <p className="text-sm">
              Get 25% off annual plans for a limited time! Ends in:{" "}
              <span className="font-mono text-lg">
                {timeLeft.hours.toString().padStart(2, "0")}:
                {timeLeft.minutes.toString().padStart(2, "0")}:
                {timeLeft.seconds.toString().padStart(2, "0")}
              </span>
            </p>
          </div>
        )}

        {/* Current Plan Status */}
        {currentPlan !== "free" && (
          <Card className="mb-6 border-green-300 bg-green-50 shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-800 text-lg">
                  Current Plan: <span className="font-bold">{plans.find((p) => p.id === currentPlan)?.name}</span>
                </p>
                <p className="text-sm text-green-700">Your subscription is active. Cook on!</p>
              </div>
              <Button variant="outline" onClick={handleManageSubscription} className="hover:bg-green-100 transition-colors">
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className="text-gray-700 font-medium">Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={billingCycle === "yearly"}
              onChange={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-wasfah-orange-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-wasfah-orange"></div>
          </label>
          <span className="text-gray-700 font-medium flex items-center">
            Yearly <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-white text-xs py-0.5 px-2 rounded-full">Save 25%</Badge>
          </span>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col justify-between p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                ${plan.popular ? "ring-4 ring-wasfah-orange-dark shadow-wasfah-orange/30" : ""}
                ${currentPlan === plan.id ? "border-green-500 bg-green-50 shadow-inner" : "border-gray-200 bg-white"}
                ${plan.id === "free" ? "bg-gradient-to-br from-gray-50 to-gray-100" : ""}
                ${plan.id === "premium" ? "bg-gradient-to-br from-orange-50 to-orange-100" : ""}
                ${plan.id === "family" ? "bg-gradient-to-br from-purple-50 to-purple-100" : ""}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <Badge className="bg-wasfah-orange text-white text-sm px-3 py-1 rounded-full shadow-md">
                    <Star size={14} className="mr-1 fill-white" />
                    {plan.savings}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-2">
                  {plan.icon && <span className="mr-2">{plan.icon}</span>}
                  <CardTitle className="text-2xl font-bold text-gray-800">{plan.name}</CardTitle>
                </div>

                {currentPlan === plan.id && (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-full mx-auto mb-2 animate-fade-in">Current Plan</Badge>
                )}

                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {getPrice(plan)}
                  </span>
                  {plan.id !== "free" && (
                    <span className="text-gray-600 text-lg">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  )}
                  {billingCycle === "yearly" && plan.id !== "free" && (
                    <p className="text-xs text-green-700 font-semibold mt-1">
                      (Save 25% annually!)
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
                {plan.id !== "free" && <p className="text-xs text-gray-500 mt-1">First 7 days free!</p>}
              </CardHeader>

              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-semibold text-red-600 mb-2 flex items-center"><Zap size={16} className="mr-1 text-red-500" /> Limitations:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Button
                  className={`w-full text-lg py-6 font-semibold transition-all duration-300
                    ${currentPlan === plan.id
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed border border-gray-400 hover:bg-gray-300"
                      : "bg-wasfah-orange hover:bg-wasfah-orange-dark text-white shadow-md hover:shadow-lg"
                    }
                  `}
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
                {plan.id !== "free" && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Cancel anytime. No long-term commitments.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Promo Code Input */}
        <Card className="mt-8 p-6 shadow-lg border border-orange-100 bg-orange-50">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
              <Percent size={24} className="mr-2 text-wasfah-orange" /> Have a promo code?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder='Enter promo code (e.g., "SAVE20")'
              className="flex-grow p-3 border border-orange-200 rounded-md focus:ring-2 focus:ring-wasfah-orange"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button onClick={handleApplyPromo} className="bg-wasfah-orange hover:bg-wasfah-orange-dark text-white px-6 py-3 rounded-md shadow-sm">
              Apply Code
            </Button>
          </CardContent>
        </Card>

        {/* Feature Comparison Table */}
        <Card className="mt-8 p-6 shadow-lg bg-white">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Detailed Feature Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-center text-wasfah-orange hover:text-wasfah-orange-dark">
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {({ open }) => (open ? "Hide Comparison" : "Show Full Comparison")}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      {plans.map((plan) => (
                        <th
                          key={plan.id}
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allFeatures.map((feature, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {feature}
                        </td>
                        {plans.map((plan) => (
                          <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {featureSupport(feature, plan.id) ? (
                              <Check size={20} className="text-green-500 mx-auto" />
                            ) : (
                              <span className="text-gray-300 text-xl">–</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Customer Testimonials */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 shadow-md border-t-4 border-wasfah-orange bg-white transition-transform transform hover:scale-105">
              <p className="text-lg italic text-gray-700 mb-4">
                "Wasfah has transformed my kitchen! The AI suggestions are spot on, and meal planning is a breeze. Highly recommended!"
              </p>
              <p className="font-semibold text-gray-800">– Sarah L., Home Cook</p>
            </Card>
            <Card className="p-6 shadow-md border-t-4 border-wasfah-orange bg-white transition-transform transform hover:scale-105">
              <p className="text-lg italic text-gray-700 mb-4">
                "The Family plan is a game-changer for our busy household. Shared lists and allergen tracking make cooking so much easier!"
              </p>
              <p className="font-semibold text-gray-800">– The Al-Mousawi Family</p>
            </Card>
            <Card className="p-6 shadow-md border-t-4 border-wasfah-orange bg-white transition-transform transform hover:scale-105">
              <p className="text-lg italic text-gray-700 mb-4">
                "I love the ad-free experience and priority support. Wasfah truly makes my cooking journey enjoyable and efficient."
              </p>
              <p className="font-semibold text-gray-800">– Omar K., Food Blogger</p>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <Collapsible className="border rounded-lg p-4 bg-white shadow-sm">
              <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold text-lg text-gray-800">
                What's the difference between Free, Premium, and Family plans?
                <ArrowLeft size={20} className="transform rotate-90 data-[state=open]:rotate-[-90deg] transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-gray-700">
                The Free plan offers basic features. Premium unlocks unlimited recipes, advanced AI, nutritional analysis, and priority support. The Family plan includes all Premium features plus support for up to 6 family accounts and shared features like meal planning and shopping lists. See the comparison table above for full details!
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border rounded-lg p-4 bg-white shadow-sm">
              <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold text-lg text-gray-800">
                Can I really cancel anytime?
                <ArrowLeft size={20} className="transform rotate-90 data-[state=open]:rotate-[-90deg] transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-gray-700">
                Yes, absolutely! You can cancel your Premium or Family subscription at any time directly from your account settings. There are no hidden fees or long-term contracts.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border rounded-lg p-4 bg-white shadow-sm">
              <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold text-lg text-gray-800">
                Do you offer student discounts?
                <ArrowLeft size={20} className="transform rotate-90 data-[state=open]:rotate-[-90deg] transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-gray-700">
                Yes, we do! We believe in supporting students. Please contact our support team with your student ID for information on special student pricing.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border rounded-lg p-4 bg-white shadow-sm">
              <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold text-lg text-gray-800">
                What payment methods do you accept?
                <ArrowLeft size={20} className="transform rotate-90 data-[state=open]:rotate-[-90deg] transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-gray-700">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for secure transactions. More options may be added in the future!
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Secure & Trusted</h2>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex flex-col items-center text-gray-600">
              <ShieldCheck size={48} className="text-green-500 mb-2 animate-bounce-in" />
              <p className="font-semibold text-sm">SSL Secured</p>
            </div>
            <div className="flex flex-col items-center text-gray-600">
              <CreditCard size={48} className="text-blue-500 mb-2 animate-bounce-in delay-100" />
              <p className="font-semibold text-sm">Secure Payments</p>
            </div>
            <div className="flex flex-col items-center text-gray-600">
              <Star size={48} className="text-yellow-500 mb-2 animate-bounce-in delay-200" />
              <p className="font-semibold text-sm">100k+ Happy Users</p>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Wasfah is Your Perfect Cooking Companion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Effortless Meal Planning</h3>
              <p className="text-gray-700">Automate your weekly meals with smart suggestions tailored to your preferences and pantry.</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Unleash Culinary Creativity</h3>
              <p className="text-gray-700">Discover endless recipes, experiment with new ingredients, and become a kitchen pro.</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-xl font-bold text-green-800 mb-3">Save Time & Money</h3>
              <p className="text-gray-700">Optimize shopping lists, minimize food waste, and enjoy significant savings every month.</p>
            </Card>
          </div>
        </div>

      </div>

      <MobileNavigation />
    </div>
  );
};

export default Subscription;
