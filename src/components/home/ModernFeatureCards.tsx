
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Globe, Calendar, Activity, ShoppingCart, Users, Heart, Plus, Camera, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const mainFeatures = [
  {
    icon: <Camera className="h-8 w-8 text-white" />,
    label: "AI Recipe Scanner",
    description: "Scan any dish and get instant recipes",
    path: "/scan-dish",
    gradient: "from-purple-500 to-pink-500",
    isNew: true,
  },
  {
    icon: <Search className="h-8 w-8 text-white" />,
    label: "Find by Ingredients",
    description: "Cook with what you have at home",
    path: "/find-by-ingredients",
    gradient: "from-wasfah-bright-teal to-wasfah-teal",
  },
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    label: "Global Cuisine",
    description: "Explore flavors from around the world",
    path: "/global-cuisine",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <Calendar className="h-8 w-8 text-white" />,
    label: "Meal Planning",
    description: "Plan your week with smart suggestions",
    path: "/meal-plan",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <Activity className="h-8 w-8 text-white" />,
    label: "Health Tracking",
    description: "Monitor nutrition and fitness goals",
    path: "/health-tracking-home",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-white" />,
    label: "Smart Pantry",
    description: "Manage ingredients and shopping lists",
    path: "/pantry",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    label: "Community",
    description: "Share recipes and cooking tips",
    path: "/community",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Heart className="h-8 w-8 text-white" />,
    label: "Favorites",
    description: "Save and organize your best recipes",
    path: "/favorites",
    gradient: "from-pink-500 to-rose-500",
  },
];

export const ModernFeatureCards: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Everything You Need to Cook
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover powerful tools designed to make cooking enjoyable, efficient, and delicious
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainFeatures.map((feature, index) => (
          <motion.div
            key={feature.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <Link to={feature.path} className="block h-full">
              <Card className="relative h-full overflow-hidden glass-card card-hover border-0 shadow-lg group-hover:shadow-food">
                <CardContent className="p-6 h-full flex flex-col">
                  {/* New Badge */}
                  {feature.isNew && (
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        <Sparkles className="h-3 w-3 mr-1" />
                        NEW
                      </div>
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {feature.label}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Hover Arrow */}
                  <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Plus className="h-4 w-4 text-gray-600 rotate-45" />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
