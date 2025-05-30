import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { WasfahLogo } from '@/components/icons/WasfahLogo';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80', // Main dish
    alt: 'Main dish',
  },
  {
    url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1920&q=80', // Dessert/sweets
    alt: 'Dessert dish',
  },
  {
    url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1920&q=80', // Drink
    alt: 'Refreshing drinks',
  },
];

const SplashScreen = () => {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/home');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col justify-end items-center p-0 relative overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ filter: 'none' }}
          />
        ))}
      </div>

      {/* All content at the bottom */}
      <div className="w-full max-w-md relative z-10 flex flex-col items-center space-y-4 pb-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
            <WasfahLogo className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">WasfahAI</h1>
          <div className="flex items-center justify-center space-x-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
            ))}
          </div>
        </div>

        {/* Discover, Create, Connect Bar */}
        <div className="px-4 py-1 rounded-full bg-white/20 text-xs text-white font-semibold shadow-sm mb-2">
          Discover, Create, Connect
        </div>

        {/* Image Indicators */}
        <div className="flex justify-center space-x-2 mb-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-teal-500 w-8' : 'bg-gray-300 w-2'}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="w-full space-y-3">
          <Button
            onClick={handleGetStarted}
            className="w-full bg-white text-teal-500 hover:bg-gray-50 font-semibold py-3 text-lg shadow-lg rounded-lg transition-all duration-200 flex items-center justify-center group"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={handleSignIn}
            className="w-full border-2 border-white text-white hover:bg-white/10 font-semibold py-3 text-lg rounded-lg transition-all duration-200"
          >
            Sign In
          </Button>
        </div>
        <div className="text-center mt-2">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-white/80 hover:text-white hover:bg-white/10 text-base px-4 py-2 rounded transition-all duration-200"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
