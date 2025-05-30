
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import AIChefAssistant from '@/components/ai/AIChefAssistant';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bot, LogIn } from 'lucide-react';

export default function AiChefPage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <PageContainer header={{ title: 'AI Chef Assistant', showBackButton: true }}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wasfah-bright-teal"></div>
        </div>
      </PageContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageContainer header={{ title: 'AI Chef Assistant', showBackButton: true }}>
        <div className="flex flex-col items-center justify-center h-96 space-y-6">
          <Bot className="h-24 w-24 text-wasfah-bright-teal opacity-50" />
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign in to access AI Chef
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Get personalized cooking advice, recipe suggestions, and culinary tips from our AI Chef Assistant.
            </p>
            <Link to="/auth">
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-deep-teal">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: 'AI Chef Assistant', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center">
          <Bot className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">AI Chef Assistant</h1>
          <p className="opacity-90">
            Ask me anything about cooking, recipes, ingredients, or culinary techniques!
          </p>
        </div>

        <AIChefAssistant />
      </div>
    </PageContainer>
  );
}
