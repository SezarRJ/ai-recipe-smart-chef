
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Users, Zap, Shield } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            About Wasfah AI
          </h1>
        </div>

        <div className="space-y-6">
          {/* Hero Section */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">W</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Wasfah AI</h2>
              <p className="text-gray-600 mb-4">
                Your AI-powered cooking companion that makes meal planning, recipe discovery, and cooking effortless and enjoyable.
              </p>
              <p className="text-sm text-gray-500">Version 1.0.0</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Zap className="text-wasfah-orange mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">AI-Powered Recipe Discovery</h4>
                  <p className="text-gray-600 text-sm">Find perfect recipes based on your ingredients, preferences, and dietary needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-wasfah-orange mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Smart Meal Planning</h4>
                  <p className="text-gray-600 text-sm">Plan your weekly meals with intelligent suggestions and automated shopping lists.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="text-wasfah-orange mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Personalized Experience</h4>
                  <p className="text-gray-600 text-sm">Tailored recommendations based on your taste preferences and health goals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="text-wasfah-orange mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Safe & Secure</h4>
                  <p className="text-gray-600 text-sm">Your data is protected with enterprise-grade security and privacy measures.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                At Wasfah AI, we believe cooking should be a joyful and accessible experience for everyone. 
                Our mission is to democratize cooking knowledge through artificial intelligence, making it easy 
                for anyone to discover, plan, and prepare delicious, healthy meals that fit their lifestyle and preferences.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">
                Have questions, feedback, or suggestions? We'd love to hear from you!
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> support@wasfah-ai.com</p>
                <p><strong>Website:</strong> www.wasfah-ai.com</p>
                <p><strong>Follow us:</strong> @wasfah_ai</p>
              </div>
            </CardContent>
          </Card>

          {/* Legal Links */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/terms-of-service")}
              className="w-full"
            >
              Terms of Service
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/privacy-policy")}
              className="w-full"
            >
              Privacy Policy
            </Button>
          </div>
        </div>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default About;
