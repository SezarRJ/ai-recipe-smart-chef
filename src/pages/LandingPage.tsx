
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Sparkles, Heart } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-light-gray to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-wasfah-bright-teal rounded-full flex items-center justify-center">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-6">
            Welcome to WasfahAI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your intelligent cooking companion. Discover recipes, plan meals, and cook with confidence using AI-powered assistance.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="btn-wasfah">
              <Link to="/home">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="card-3d">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Recipes</h3>
              <p className="text-gray-600">
                Get personalized recipe recommendations based on your preferences and dietary needs.
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="p-6 text-center">
              <ChefHat className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Cooking</h3>
              <p className="text-gray-600">
                Step-by-step cooking guidance with timers and techniques to perfect every dish.
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Health Focused</h3>
              <p className="text-gray-600">
                Track nutrition, manage dietary restrictions, and maintain a healthy lifestyle.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
