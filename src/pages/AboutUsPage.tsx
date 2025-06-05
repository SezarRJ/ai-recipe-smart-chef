
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Heart, Sparkles } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-light-gray to-white p-4">
      <div className="container mx-auto max-w-4xl py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">About WasfahAI</h1>
          <p className="text-xl text-gray-600">
            Revolutionizing cooking with artificial intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="card-3d">
            <CardContent className="p-6 text-center">
              <ChefHat className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To make cooking accessible, enjoyable, and personalized for everyone through AI technology.
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Cutting-edge AI algorithms that understand your preferences and dietary needs.
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Building a global community of food lovers and cooking enthusiasts.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-3d">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              WasfahAI was born from a simple idea: cooking should be enjoyable, not stressful. 
              Our team of culinary experts and AI engineers came together to create an intelligent 
              cooking companion that understands your unique tastes and dietary requirements.
            </p>
            <p className="text-gray-700">
              Whether you're a beginner cook or a seasoned chef, WasfahAI adapts to your skill level 
              and helps you discover new flavors while respecting your preferences and restrictions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUsPage;
