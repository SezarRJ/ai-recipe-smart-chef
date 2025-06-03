
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Camera, Bot, Calendar, Utensils, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: 'AI Recipe Generator',
      description: 'Get personalized recipes based on your preferences and dietary needs',
      path: '/ai-chef',
      color: 'bg-blue-500'
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'Dish Scanner',
      description: 'Scan any dish to get its recipe and nutritional information',
      path: '/scan-dish',
      color: 'bg-purple-500'
    },
    {
      icon: <ChefHat className="h-8 w-8" />,
      title: 'Find by Ingredients',
      description: 'Enter ingredients you have and discover what you can cook',
      path: '/ai-find-by-ingredients',
      color: 'bg-green-500'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Meal Planning',
      description: 'Plan your weekly meals with smart suggestions',
      path: '/meal-plan',
      color: 'bg-orange-500'
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: 'Smart Pantry',
      description: 'Manage your ingredients and get expiration reminders',
      path: '/smart-pantry',
      color: 'bg-teal-500'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Health Tracking',
      description: 'Track your nutrition and health goals',
      path: '/health-tracking-home',
      color: 'bg-red-500'
    }
  ];

  return (
    <PageContainer header={{ title: 'Services', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Our Services</h1>
          <p className="text-gray-600">Discover all the amazing features WasfahAI has to offer</p>
        </div>

        <div className="grid gap-4">
          {services.map((service, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(service.path)}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`${service.color} text-white p-3 rounded-lg`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Have questions about our services? Our support team is here to help you get the most out of WasfahAI.
            </p>
            <Button onClick={() => navigate('/help')} variant="outline" className="w-full">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ServicesPage;
