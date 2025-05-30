
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Star, Heart, Users, TrendingUp, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const featuredRecipes = [
  {
    id: '1',
    title: 'Spicy Chicken Stir-fry',
    chef: 'Chef Maria',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    description: 'Quick and flavorful weeknight meal with fresh vegetables and aromatic spices.',
    cookTime: 25,
    rating: 4.8,
    difficulty: 'Easy',
    category: 'Asian Fusion',
    trending: true,
  },
  {
    id: '2',
    title: 'Mediterranean Quinoa Bowl',
    chef: 'Chef Andreas',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e9dc99da21?auto=format&fit=crop&w=800&q=80',
    description: 'Healthy and colorful bowl packed with Mediterranean flavors and nutrients.',
    cookTime: 20,
    rating: 4.9,
    difficulty: 'Easy',
    category: 'Healthy',
    trending: false,
  },
  {
    id: '3',
    title: 'Classic Beef Lasagna',
    chef: 'Chef Giuseppe',
    imageUrl: 'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?auto=format&fit=crop&w=800&q=80',
    description: 'Rich, layered comfort food that brings the family together around the table.',
    cookTime: 90,
    rating: 4.7,
    difficulty: 'Medium',
    category: 'Italian',
    trending: false,
  },
  {
    id: '4',
    title: 'Chocolate Lava Cake',
    chef: 'Chef Sophie',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'Decadent molten chocolate dessert that melts in your mouth.',
    cookTime: 35,
    rating: 4.9,
    difficulty: 'Hard',
    category: 'Dessert',
    trending: true,
  },
];

export const ModernFeaturedRecipes: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Featured Recipes
          </h2>
          <p className="text-lg text-gray-600">
            Handpicked by our culinary experts
          </p>
        </div>
        
        <Link to="/recipes">
          <Button variant="outline" className="hidden sm:flex items-center hover:bg-orange-50 border-orange-200 text-orange-600">
            View All Recipes
            <TrendingUp className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link to={`/recipe/${recipe.id}`}>
              <Card className="overflow-hidden glass-card border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Trending Badge */}
                  {recipe.trending && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        TRENDING
                      </div>
                    </div>
                  )}
                  
                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors group">
                    <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                  </button>
                  
                  {/* Overlay */}
                  <div className="food-card-overlay" />
                  
                  {/* Quick Stats */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {recipe.cookTime}m
                        </div>
                        <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {recipe.rating}
                        </div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                        {recipe.difficulty}
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                      {recipe.category}
                    </span>
                  </div>
                  
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {recipe.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <ChefHat className="h-4 w-4 mr-1" />
                      by {recipe.chef}
                    </div>
                    
                    <Button size="sm" className="btn-food opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Cook Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Mobile View All Button */}
      <div className="sm:hidden text-center">
        <Link to="/recipes">
          <Button className="btn-food px-8 py-3">
            View All Recipes
          </Button>
        </Link>
      </div>
    </div>
  );
};
