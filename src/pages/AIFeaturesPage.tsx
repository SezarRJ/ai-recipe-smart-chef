
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Bot, 
  Camera, 
  Mic, 
  Brain, 
  Heart, 
  Zap,
  ChefHat,
  Lightbulb,
  Target,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIFeaturesPage = () => {
  const navigate = useNavigate();

  const aiFeatures = [
    {
      id: 'ai-chef',
      icon: <Bot className="h-8 w-8" />,
      title: 'AI Chef Assistant',
      description: 'Get personalized cooking guidance and recipe suggestions from your AI kitchen companion',
      features: ['Recipe recommendations', 'Cooking tips', 'Ingredient substitutions', 'Nutrition advice'],
      path: '/ai-chef',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-purple-600',
      badge: 'Popular'
    },
    {
      id: 'voice-assistant',
      icon: <Mic className="h-8 w-8" />,
      title: 'Voice Recipe Assistant',
      description: 'Hands-free cooking with voice commands and audio step-by-step instructions',
      features: ['Voice navigation', 'Audio instructions', 'Hands-free control', 'Progress tracking'],
      path: '/recipe/1', // Will show voice assistant in recipe detail
      color: 'bg-green-500',
      gradient: 'from-green-500 to-teal-600',
      badge: 'New'
    },
    {
      id: 'dish-scanner',
      icon: <Camera className="h-8 w-8" />,
      title: 'Smart Dish Scanner',
      description: 'Scan any dish to identify ingredients, get recipes, and nutritional information',
      features: ['Image recognition', 'Recipe matching', 'Ingredient detection', 'Nutrition analysis'],
      path: '/scan-dish',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-600',
      badge: 'AI Powered'
    },
    {
      id: 'mood-recipes',
      icon: <Heart className="h-8 w-8" />,
      title: 'Mood-Based Recipes',
      description: 'Get recipe suggestions based on your current mood, weather, and preferences',
      features: ['Emotion analysis', 'Weather integration', 'Comfort food matching', 'Seasonal suggestions'],
      path: '/mood-recipes',
      color: 'bg-pink-500',
      gradient: 'from-pink-500 to-rose-600',
      badge: 'Smart'
    },
    {
      id: 'smart-adaptation',
      icon: <Brain className="h-8 w-8" />,
      title: 'Smart Recipe Adaptation',
      description: 'Automatically adapt recipes for dietary restrictions, skill level, and time constraints',
      features: ['Dietary adaptations', 'Skill adjustments', 'Time optimization', 'Equipment substitution'],
      path: '/recipe-adaptation',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-red-600',
      badge: 'Adaptive'
    },
    {
      id: 'nutrition-tracker',
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Micronutrient Tracker',
      description: 'Track vitamins, minerals, and get personalized nutrition recommendations',
      features: ['Deficiency alerts', 'Health insights', 'Food recommendations', 'Progress tracking'],
      path: '/health-tracking',
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-cyan-600',
      badge: 'Health'
    }
  ];

  const quickActions = [
    {
      title: 'Start Cooking with AI',
      description: 'Get personalized recipe recommendations',
      icon: <ChefHat className="h-6 w-6" />,
      action: () => navigate('/ai-chef')
    },
    {
      title: 'Scan Your Ingredients',
      description: 'Find recipes with what you have',
      icon: <Camera className="h-6 w-6" />,
      action: () => navigate('/scan-ingredients')
    },
    {
      title: 'Voice Cooking Mode',
      description: 'Cook hands-free with voice commands',
      icon: <Mic className="h-6 w-6" />,
      action: () => navigate('/recipes')
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'Popular': return 'default';
      case 'New': return 'secondary';
      case 'AI Powered': return 'outline';
      case 'Smart': return 'destructive';
      case 'Adaptive': return 'secondary';
      case 'Health': return 'default';
      default: return 'outline';
    }
  };

  return (
    <PageContainer header={{ title: 'AI Features', showBackButton: true }}>
      <div className="space-y-8 pb-20">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Kitchen</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the future of cooking with our advanced AI features designed to make your culinary journey smarter, easier, and more enjoyable.
          </p>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-wasfah-bright-teal" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-dashed"
                  onClick={action.action}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-wasfah-bright-teal/10 rounded-full mb-3">
                      <div className="text-wasfah-bright-teal">
                        {action.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiFeatures.map((feature) => (
            <Card 
              key={feature.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 group overflow-hidden"
              onClick={() => navigate(feature.path)}
            >
              <div className={`h-2 bg-gradient-to-r ${feature.gradient}`} />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${feature.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-wasfah-bright-teal transition-colors">
                        {feature.title}
                      </CardTitle>
                      <Badge variant={getBadgeVariant(feature.badge)} className="mt-1">
                        {feature.badge}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-wasfah-bright-teal group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features.map((feat, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-wasfah-bright-teal rounded-full" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-bright-teal transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(feature.path);
                  }}
                >
                  Try {feature.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal text-white">
          <CardContent className="pt-6 text-center">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Ready to Cook Smarter?</h3>
            <p className="mb-4 opacity-90">
              Combine multiple AI features for the ultimate cooking experience
            </p>
            <Button 
              variant="secondary" 
              className="bg-white text-wasfah-bright-teal hover:bg-gray-100"
              onClick={() => navigate('/ai-chef')}
            >
              <Target className="mr-2 h-4 w-4" />
              Start Your AI Kitchen Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AIFeaturesPage;
