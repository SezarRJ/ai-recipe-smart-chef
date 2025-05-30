import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, Utensils } from 'lucide-react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=1920&q=80',
    alt: 'Fresh vegetables',
  },
  {
    url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1920&q=80',
    alt: 'Fresh fruits',
  },
  {
    url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1920&q=80',
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
            style={{ filter: 'none' }} // No blur
          />
        ))}
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Utensils className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">WasfahAI</h1>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/95 shadow-2xl border-0 rounded-lg">
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 shadow-lg mb-6">
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
                  className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-teal-500 w-8' : 'bg-gray-300 w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleGetStarted}
            className="w-full bg-white text-teal-500 hover:bg-gray-50 font-semibold py-4 text-lg shadow-lg rounded-lg transition-all duration-200 flex items-center justify-center group"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={handleSignIn}
            className="w-full border-2 border-white text-white hover:bg-white/10 font-semibold py-4 text-lg rounded-lg transition-all duration-200"
          >
            Sign In
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handleSkip}
            className="text-white/80 hover:text-white hover:bg-white/10 text-base px-4 py-2 rounded transition-all duration-200"
          >
            Skip for now
          </button>
        </div>
      </div>

      {/* Footer - Small Text Under the Page */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full flex flex-col items-center">
        <p className="text-xs text-white/80 mb-2">Your Smart Culinary Companion</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-xs">
          Powered by AI • Made with ❤️
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
