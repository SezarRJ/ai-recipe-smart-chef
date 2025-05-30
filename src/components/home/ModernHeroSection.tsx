
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, TrendingUp, Clock, Users, ChefHat, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    title: 'Delicious Burgers',
    subtitle: 'Crafted with love'
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    title: 'Fresh Pasta',
    subtitle: 'Italian perfection'
  },
  {
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
    title: 'Healthy Bowls',
    subtitle: 'Nutrition meets taste'
  }
];

export const ModernHeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-3xl mx-4 md:mx-6 shadow-2xl">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={heroImages[currentImageIndex].url}
            alt={heroImages[currentImageIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-food-gradient bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Discover
            </span>
            <br />
            <span className="text-white">Culinary Magic</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed">
            From global cuisines to personalized meal plans, explore thousands of recipes 
            crafted by passionate chefs worldwide
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/find-by-ingredients">
              <Button className="btn-food px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px]">
                <Search className="mr-2 h-5 w-5" />
                Start Cooking
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/global-cuisine">
              <Button 
                variant="outline" 
                className="glass-card border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px]"
              >
                <ChefHat className="mr-2 h-5 w-5" />
                Explore Cuisines
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: <TrendingUp className="h-5 w-5" />, label: "50K+ Recipes", color: "from-yellow-400 to-orange-400" },
              { icon: <Users className="h-5 w-5" />, label: "2M+ Cooks", color: "from-green-400 to-teal-400" },
              { icon: <Clock className="h-5 w-5" />, label: "Quick & Easy", color: "from-blue-400 to-purple-400" },
              { icon: <Star className="h-5 w-5" />, label: "Top Rated", color: "from-pink-400 to-red-400" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className="glass-card p-4 text-center">
                  <div className={`inline-flex p-2 rounded-full bg-gradient-to-r ${stat.color} mb-2`}>
                    {stat.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
