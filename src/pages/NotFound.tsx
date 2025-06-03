
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-wasfah-light-gray to-white p-6">
      <div className="text-center max-w-md">
        <ChefHat className="h-24 w-24 text-wasfah-bright-teal mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! It seems like this recipe page doesn't exist in our kitchen. 
          Let's get you back to cooking!
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/home')}
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
