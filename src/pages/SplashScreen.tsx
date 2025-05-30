import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { WasfahLogo } from '@/components/icons/WasfahLogo';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80', // Main dish
    alt: 'Main dish',
  },
  {
    url: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=1920&q=80', // Dessert
    alt: 'Desserts',
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-teal-500 via-emerald-400 to-red-400">
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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <WasfahLogo className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">WasfahAI</h1>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
            ))}
          </div>
          <p className="text-white/90 text-lg">Intelligent Cooking Assistant</p>
        </div>

        {/* Discover, Create, Connect Bar */}
        <div className="flex justify-center">
          <div className="px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white font-semibold shadow-sm">
            Discover, Create, Connect
          </div>
        </div>

        {/* Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 shadow-lg mb-6">
              <Sparkles size={40} strokeWidth={1.5} />
            </div>
            {/* Description removed */}
            <div className="flex justify-center space-x-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-teal-500 w-8' : 'bg-gray-300 w-2'}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={handleGetStarted}
            className="w-full bg-white text-teal-500 hover:bg-gray-50 font-semibold py-4 text-lg shadow-lg rounded-lg transition-all duration-200 flex items-center justify-center group"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={handleSignIn}
            className="w-full border-2 border-white text-white hover:bg-white/10 font-semibold py-4 text-lg rounded-lg transition-all duration-200"
          >
            Sign In
          </Button>
        </div>
        <div className="text-center">
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
