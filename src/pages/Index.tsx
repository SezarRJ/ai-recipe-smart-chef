
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, Utensils, Search, User } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-light-gray to-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-wasfah-bright-teal" />
          <h1 className="text-2xl font-bold text-gray-800">WasfahAI</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/auth')}
          className="flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Discover Amazing
            <span className="text-wasfah-bright-teal"> Recipes</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find recipes by ingredients, discover global cuisines, and let AI help you cook delicious meals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/splash')}
              className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/recipes')}
            >
              Browse Recipes
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <Search className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Find by Ingredients</h3>
            <p className="text-gray-600">
              Enter ingredients you have and discover recipes you can make right now
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <Utensils className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Chef Assistant</h3>
            <p className="text-gray-600">
              Get personalized recipe recommendations powered by artificial intelligence
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <ChefHat className="h-12 w-12 text-wasfah-bright-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Cuisines</h3>
            <p className="text-gray-600">
              Explore recipes from around the world and learn new cooking techniques
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
