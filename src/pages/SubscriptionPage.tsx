import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, Crown, Star, ArrowLeft, Gift, Shield, Clock, Users, ChefHat, Sparkles, CreditCard, X, ChevronDown, ChevronUp, Percent } from "lucide-react";
import { AnimationWrapper, ResponsiveButton } from "@/components/ui/animation";
import { PaymentModal } from "@/components/payment/PaymentModal";

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState("free");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [showComparison, setShowComparison] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Countdown timer for limited offer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
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
      ],
      icon: <ChefHat className="text-gray-500" size={32} />
    },
    {
      id: "premium",
      name: "Premium",
      price: { monthly: 9.99, yearly: 89.99 },
      period: billingCycle === "monthly" ? "month" : "year",
      description: "For serious home cooks",
      popular: true,
      features: [
        "Unlimited recipe saving",
        "Advanced AI recipe suggestions",
        "Smart meal planning with AI",
        "Advanced pantry management",
        "Nutritional analysis & tracking",
        "Shopping list optimization",
        "Voice recipe reading",
        "Export recipes to PDF",
        "Priority customer support",
        "Ad-free experience",
        "Weekly meal prep guides",
        "Exclusive chef recipes"
      ],
      savings: "Most Popular",
      yearlyDiscount: "Save 25%",
      icon: <Crown className="text-wasfah-orange" size={32} />
    },
    {
      id: "family",
      name: "Family",
      price: { monthly: 19.99, yearly: 179.99 },
      period: billingCycle === "monthly" ? "month" : "year",
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
        "Monthly cooking challenges",
        "Family recipe book creator",
        "Meal budget tracking",
        "Personalized cooking lessons"
      ],
      savings: "Best Value",
      yearlyDiscount: "Save 25%",
      icon: <Users className="text-purple-500" size={32} />
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes! You can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, PayPal, Apple Pay, and Google Pay for your convenience."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All premium plans come with a 7-day free trial. You can cancel anytime during the trial period without being charged."
    },
    {
      question: "Can I switch between plans?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! Students get 20% off all premium plans. Simply verify your student status during checkout."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Home Cook",
      content: "The AI meal planning has saved me hours every week. Worth every penny!",
      rating: 5
    },
    {
      name: "Mike D.",
      role: "Busy Parent",
      content: "Family plan is perfect for managing everyone's dietary needs. Kids love the recipes!",
      rating: 5
    },
    {
      name: "Emily R.",
      role: "Fitness Enthusiast",
      content: "The nutritional tracking helps me stay on top of my macros. Game changer!",
      rating: 5
    }
  ];

  const handleSubscribe = (planId) => {
    if (planId === currentPlan) {
      showNotification("You're already on this plan");
      return;
    }

    const plan = plans.find(p => p.id === planId);
    if (plan && plan.id !== 'free') {
      setSelectedPlan(plan);
      setShowPaymentModal(true);
    } else {
      // Handle free plan
      setCurrentPlan(planId);
      showNotification("Switched to free plan");
    }
  };

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setPromoApplied(true);
      showNotification("Promo code applied! 20% discount added");
    } else {
      showNotification("Invalid promo code");
    }
  };

  const getPriceDisplay = (plan) => {
    const price = billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
    const displayPrice = promoApplied ? price * 0.8 : price;

    if (price === 0) return "$0";

    return `$${displayPrice.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <Check size={16} />
            {toastMessage}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              Unlock Premium Features
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Choose the perfect plan for your cooking journey
            </p>
          </div>
        </div>

        {/* Limited Time Offer Banner */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Gift className="animate-bounce" size={24} />
                <div>
                  <p className="font-bold text-lg">Limited Time Offer - 20% OFF!</p>
                  <p className="text-sm opacity-90">Use code SAVE20 at checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs">Seconds</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg flex items-center">
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              onClick={() => setBillingCycle("monthly")}
              className="px-6"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              onClick={() => setBillingCycle("yearly")}
              className="px-6 flex items-center gap-2"
            >
              Yearly
              <Badge className="bg-green-500 text-white">Save 25%</Badge>
            </Button>
          </div>
        </div>

        {/* Current Plan Status */}
        {currentPlan !== "free" && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="text-green-600" size={24} />
                  <div>
                    <p className="font-semibold text-green-800">
                      Current Plan: {plans.find(p => p.id === currentPlan)?.name}
                    </p>
                    <p className="text-sm text-green-600">Your subscription is active</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => showNotification("Opening billing portal...")}>
                  Manage Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Promo Code Input */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePromoCode} disabled={promoApplied}>
                {promoApplied ? (
                  <>
                    <Check size={16} className="mr-2" />
                    Applied
                  </>
                ) : (
                  <>
                    <Percent size={16} className="mr-2" />
                    Apply Code
                  </>
                )}
              </Button>
            </div>
            {promoApplied && (
              <p className="text-sm text-green-600 mt-2">20% discount applied to all plans!</p>
            )}
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <AnimationWrapper
              key={plan.id}
              type="scale"
              delay={index * 200}
              className={`relative transform transition-all duration-300 hover:scale-105 ${
                plan.popular ? "ring-2 ring-wasfah-orange shadow-xl" : ""
              } ${
                currentPlan === plan.id ? "border-green-500 bg-green-50" : ""
              }`}
            >
              <Card>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-wasfah-orange px-4 py-1">
                      <Sparkles size={12} className="mr-1" />
                      {plan.savings}
                    </Badge>
                  </div>
                )}

                {plan.yearlyDiscount && billingCycle === "yearly" && (
                  <div className="absolute -top-4 right-4">
                    <Badge className="bg-green-500">{plan.yearlyDiscount}</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4">{plan.icon}</div>

                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>

                  {currentPlan === plan.id && (
                    <Badge className="bg-green-500 mb-2">Current Plan</Badge>
                  )}

                  <div className="mb-2">
                    <span className="text-4xl font-bold">{getPriceDisplay(plan)}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>

                  {billingCycle === "yearly" && plan.price.yearly > 0 && (
                    <p className="text-sm text-gray-500 line-through">
                      ${(plan.price.monthly * 12).toFixed(2)}/year
                    </p>
                  )}

                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 6 && (
                      <li className="text-sm text-gray-600 font-medium">
                        + {plan.features.length - 6} more features
                      </li>
                    )}
                  </ul>

                  {plan.limitations && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-600 mb-2">Limitations:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="text-xs text-gray-500 flex items-start gap-1">
                            <X size={12} className="text-red-400 mt-0.5" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <ResponsiveButton
                    variant={plan.popular && currentPlan !== plan.id ? "primary" : "secondary"}
                    disabled={currentPlan === plan.id}
                    onClick={() => handleSubscribe(plan.id)}
                    className="w-full"
                  >
                    {currentPlan === plan.id
                      ? "Current Plan"
                      : plan.id === "free"
                      ? "Downgrade to Free"
                      : "Start Free Trial"}
                  </ResponsiveButton>

                  {plan.id !== "free" && currentPlan !== plan.id && (
                    <p className="text-xs text-center text-gray-500 mt-2">
                      7-day free trial • Cancel anytime
                    </p>
                  )}
                </CardContent>
              </Card>
            </AnimationWrapper>
          ))}
        </div>

        {/* Comparison Table Toggle */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center gap-2 mx-auto"
          >
            {showComparison ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showComparison ? "Hide" : "Show"} Detailed Comparison
          </Button>
        </div>

        {/* Detailed Comparison Table */}
        {showComparison && (
          <Card className="mb-12 overflow-hidden">
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4">Features</th>
                      <th className="text-center p-4">Free</th>
                      <th className="text-center p-4">Premium</th>
                      <th className="text-center p-4">Family</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Saved Recipes", free: "5", premium: "Unlimited", family: "Unlimited" },
                      { feature: "AI Recommendations", free: "Basic", premium: "Advanced", family: "Advanced" },
                      { feature: "Family Accounts", free: "1", premium: "1", family: "6" },
                      { feature: "Meal Planning", free: "Basic", premium: "Smart AI", family: "Smart AI" },
                      { feature: "Shopping Lists", free: "✓", premium: "✓ Optimized", family: "✓ Shared" },
                      { feature: "Nutrition Tracking", free: "✗", premium: "✓", family: "✓ Family" },
                      { feature: "Recipe Export", free: "✗", premium: "✓ PDF", family: "✓ PDF" },
                      { feature: "Support", free: "Community", premium: "Priority", family: "24/7 Premium" },
                    ].map((row, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">{row.free}</td>
                        <td className="p-4 text-center">{row.premium}</td>
                        <td className="p-4 text-center">{row.family}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Testimonials */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">What Our Users Say</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 italic">"{testimonial.content}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <button
                    className="w-full text-left flex items-center justify-between py-2"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedFAQ === index && (
                    <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trust Badges */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="text-green-600" size={24} />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-600" size={24} />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="text-purple-600" size={24} />
              <span className="text-sm font-medium">No Hidden Fees</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="bg-gradient-to-r from-wasfah-orange to-orange-500 text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Cooking?</h3>
            <p className="mb-4">Join thousands of home cooks who've upgraded their kitchen experience</p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleSubscribe("premium")}
              className="bg-white text-wasfah-orange hover:bg-gray-100"
            >
              Start Your Free Trial Today
            </Button>
          </CardContent>
        </Card>
      </div>

      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          planName={selectedPlan.name}
          amount={billingCycle === 'monthly' ? selectedPlan.price.monthly : selectedPlan.price.yearly}
          features={selectedPlan.features}
        />
      )}
    </div>
  );
};

export default Subscription;
