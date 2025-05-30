import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { WasfahLogo } from '@/components/icons/WasfahLogo';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1540189549336-e6e9dc99517b?auto=format&fit=crop&w=1920&q=80',
    alt: 'Delicious food spread',
  },
  {
    url: 'https://images.unsplash.com/photo-1563729781174-b440682dce7e?auto=format&fit=crop&w=1920&q=80',
    alt: 'Assortment of desserts',
  },
  {
    url: 'https://images.unsplash.com/photo-1504471786931-c0ff11b99743?auto=format&fit=crop&w=1920&q=80',
    alt: 'Refreshing drinks',
  },
];

const SplashScreen = () => {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-wasfah-bright-teal via-wasfah-mint to-wasfah-coral-red">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
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
          <p className="text-white/90 text-lg">Your Smart Culinary Companion</p>
        </div>

        {/* Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-wasfah-bright-teal/10 flex items-center justify-center text-wasfah-bright-teal shadow-lg mb-6">
              <Sparkles size={40} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Discover, Create, Connect</h2>
            <p className="text-gray-600 mb-4">Browse recipes, plan meals, and join a vibrant food community.</p>
            {/* Image Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-wasfah-bright-teal w-8' : 'bg-gray-300 w-2'}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/home')}
            className="w-full bg-white text-wasfah-bright-teal hover:bg-gray-50 font-semibold py-4 text-lg shadow-lg group"
            size="lg"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => navigate('/auth')}
            variant="outline"
            className="w-full border-2 border-white text-white hover:bg-white/10 font-semibold py-4 text-lg backdrop-blur-sm"
            size="lg"
          >
            Sign In
          </Button>
        </div>
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/home')}
            className="text-white/80 hover:text-white hover:bg-white/10 text-base"
          >
            Skip for now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm">
          Powered by AI • Made with ❤️
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
