
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80',
    alt: 'Delicious main dish',
  },
  {
    url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1920&q=80',
    alt: 'Sweet dessert',
  },
  {
    url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1920&q=80',
    alt: 'Refreshing beverages',
  },
];

const SplashScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/home');
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col justify-end items-center p-0 relative overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content at the bottom */}
      <div className="w-full max-w-md relative z-10 flex flex-col items-center space-y-4 pb-12 px-6">
        {/* App Title */}
        <div className="flex flex-col items-center mb-2">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">WasfahAI</h1>
          <p className="text-white/90 text-center text-sm">Your AI-Powered Recipe Companion</p>
        </div>

        {/* Feature tagline */}
        <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm text-white font-medium shadow-lg mb-4">
          Discover • Create • Connect
        </div>

        {/* Image Indicators */}
        <div className="flex justify-center space-x-2 mb-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button
            onClick={handleGetStarted}
            className="w-full bg-white text-wasfah-deep-teal hover:bg-gray-100 font-semibold py-3 text-lg shadow-xl rounded-lg transition-all duration-300 flex items-center justify-center group"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full text-white/90 hover:text-white hover:bg-white/10 text-base py-2 rounded-lg transition-all duration-200"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
