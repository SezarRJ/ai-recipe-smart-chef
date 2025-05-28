// src/components/layout/PageContainer.tsx
import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have this button component
import { ArrowLeft } from 'lucide-react'; // For the back button icon
import { useNavigate } from 'react-router-dom'; // For navigation

interface PageContainerHeaderProps {
  title: string;
  showBackButton?: boolean;
  // You can add more header-related props here if needed, e.g., actions, search, etc.
}

interface PageContainerProps {
  children: React.ReactNode;
  header?: PageContainerHeaderProps; // Making header optional
  className?: string;
}

export function PageContainer({ children, header, className }: PageContainerProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back one step in browser history
  };

  return (
    <div className="min-h-screen bg-background">
      {header && (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container flex h-14 items-center">
            {header.showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-lg font-semibold">{header.title}</h1>
            {/* Add more header elements here if needed, e.g., search or other actions */}
          </div>
        </div>
      )}
      <div className={`container mx-auto px-4 py-6 ${className || ''}`}>
        {children}
      </div>
    </div>
  );
}
