
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/PageContainer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageContainer hideNavbar>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4 text-wasfah-deep-teal">404</h1>
          <p className="text-xl text-gray-600 mb-6">Oops! Recipe not found</p>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default NotFound;
