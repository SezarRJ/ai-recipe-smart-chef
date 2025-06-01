import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WasfahLogo } from "@/components/WasfahLogo"; // Make sure this is your logo component
import { ChevronRight } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex flex-col items-center justify-end p-0">
      <div className="flex flex-col items-center w-full mb-12">
        <div className="mb-8">
          <WasfahLogo className="h-20 w-20 mx-auto" />
        </div>
        <div className="w-full text-center space-y-2 px-6">
          <h1 className="text-base font-bold text-wasfah-deep-teal mb-1">Welcome to Wasfah AI</h1>
          <p className="text-xs text-gray-700">
            Explore thousands of recipes, plan meals effortlessly, and join a vibrant community of food lovers.
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={onComplete}
          className="mt-8 text-wasfah-bright-teal text-xs flex items-center"
        >
          Get Started
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};
