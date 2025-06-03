
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import AIChefAssistant from '@/components/ai/AIChefAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Sparkles, Utensils, Clock, Heart, BookOpen } from 'lucide-react';

export default function AiChefPage() {
  return (
    <PageContainer
      header={{
        title: 'AI Chef Assistant',
        showBackButton: true
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-teal rounded-full mb-6 shadow-lg">
            <ChefHat className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal bg-clip-text text-transparent">
            AI Chef Assistant
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get personalized cooking advice, recipe suggestions, and culinary tips from our intelligent AI Chef Assistant. 
            Available to all users - no login required!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-wasfah-mint/20 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-wasfah-light-gray rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="h-6 w-6 text-wasfah-bright-teal" />
              </div>
              <CardTitle className="text-lg text-wasfah-deep-teal">Recipe Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Get personalized recipe recommendations based on your preferences and available ingredients.</p>
            </CardContent>
          </Card>

          <Card className="border-wasfah-mint/20 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-wasfah-light-gray rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-wasfah-bright-teal" />
              </div>
              <CardTitle className="text-lg text-wasfah-deep-teal">Cooking Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Learn professional cooking techniques and tips to improve your culinary skills.</p>
            </CardContent>
          </Card>

          <Card className="border-wasfah-mint/20 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-wasfah-light-gray rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-wasfah-bright-teal" />
              </div>
              <CardTitle className="text-lg text-wasfah-deep-teal">Quick Help</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Get instant answers to your cooking questions and troubleshoot kitchen problems.</p>
            </CardContent>
          </Card>

          <Card className="border-wasfah-mint/20 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-wasfah-light-gray rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-wasfah-bright-teal" />
              </div>
              <CardTitle className="text-lg text-wasfah-deep-teal">Dietary Guidance</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Receive advice on special diets, allergies, and nutritional requirements.</p>
            </CardContent>
          </Card>

          <Card className="border-wasfah-mint/20 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-wasfah-light-gray rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-wasfah-bright-teal" />
              </div>
              <CardTitle className="text-lg text-wasfah-deep-teal">Ingredient Info</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Learn about ingredients, substitutions, and how to use them effectively in your cooking.</p>
            </CardContent>
          </Card>

          <Card className="border-wasfah-mint/20 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-wasfah-light-gray rounded-full flex items-center justify-center mx-auto mb-3">
                <ChefHat className="h-6 w-6 text-wasfah-bright-teal" />
              </div>
              <CardTitle className="text-lg text-wasfah-deep-teal">Meal Planning</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Get help planning balanced meals and creating shopping lists for your weekly menu.</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Chef Assistant Component */}
        <Card className="shadow-xl border-wasfah-mint/20">
          <CardContent className="p-0">
            <AIChefAssistant />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
