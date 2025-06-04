
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80',
    alt: 'Delicious main dish',
    title: 'Discover Amazing Recipes',
    subtitle: 'From traditional to modern cuisine'
  },
  {
    url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1920&q=80',
    alt: 'Sweet dessert',
    title: 'AI-Powered Kitchen Assistant',
    subtitle: 'Smart cooking guidance at your fingertips'
  },
  {
    url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1920&q=80',
    alt: 'Refreshing beverages',
    title: 'Global Cuisine Explorer',
    subtitle: 'Taste the world from your kitchen'
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
    navigate('/en/home');
  };

  const handleSkip = () => {
    navigate('/en/home');
  };

  const currentImage = images[currentImageIndex];

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content at the bottom */}
      <div className="w-full max-w-md relative z-10 flex flex-col items-center space-y-4 pb-12 px-6">
        {/* App Title */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-wasfah-bright-teal" />
            <h1 className="text-4xl font-bold text-white tracking-tight">WasfahAI</h1>
          </div>
          <p className="text-white/90 text-center text-lg font-medium">Your AI-Powered Recipe Companion</p>
        </div>

        {/* Dynamic Feature Description */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">{currentImage.title}</h2>
          <p className="text-white/80 text-sm">{currentImage.subtitle}</p>
        </div>

        {/* Feature tagline */}
        <div className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium shadow-lg mb-6 border border-white/30">
          <div className="flex items-center gap-2">
            <span className="text-sm">Discover</span>
            <span className="text-white/60">•</span>
            <span className="text-sm">Create</span>
            <span className="text-white/60">•</span>
            <span className="text-sm">Connect</span>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
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
            className="w-full bg-white text-wasfah-deep-teal hover:bg-gray-100 font-semibold py-4 text-lg shadow-xl rounded-xl transition-all duration-300 flex items-center justify-center group border-2 border-white/20"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full text-white/90 hover:text-white hover:bg-white/10 text-base py-3 rounded-xl transition-all duration-200 border border-white/20"
          >
            Skip for now
          </Button>
        </div>

        {/* Footer info */}
        <div className="text-center mt-4">
          <p className="text-white/60 text-xs">Join thousands of home cooks worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
