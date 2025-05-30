import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { WasfahLogo } from '@/components/icons/WasfahLogo';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1604908554200-87c618f4bfc9?auto=format&fit=crop&w=1920&q=80',
    alt: 'Fresh Vegetables',
  },
  {
    url: 'https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=1920&q=80',
    alt: 'Colorful Fruits',
  },
  {
    url: 'https://images.unsplash.com/photo-1571077493571-5c3fdd73f27c?auto=format&fit=crop&w=1920&q=80',
    alt: 'Refreshing Drinks',
  },
];

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-wasfah-bright-teal via-wasfah-mint to-wasfah-coral-red relative overflow-hidden">
      {/* Static Image Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-4xl z-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt}
            className="w-full h-64 object-cover rounded-2xl shadow-lg"
          />
        ))}
      </div>

      {/* Foreground Content */}
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
       
