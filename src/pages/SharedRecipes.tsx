
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Share2, Eye, Heart, MessageCircle, ArrowLeft, TrendingUp, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SharedRecipes = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Sample data for shared recipes
  const sharedRecipes = [
    {
      id: "1",
      title: "Mediterranean Quinoa Bowl",
      image: "/placeholder.svg",
      sharedDate: "2024-01-15",
      metrics: {
        views: 234,
        used: 45,
        likes: 89,
        shares: 23
      },
      trending: true
    },
    {
      id: "2",
      title: "Chocolate Avocado Smoothie",
      image: "/placeholder.svg",
      sharedDate: "2024-01-10",
      metrics: {
        views: 156,
        used: 32,
        likes: 67,
        shares: 18
      },
      trending: false
    },
    {
      id: "3",
      title: "Spicy Thai Curry",
      image: "/placeholder.svg",
      sharedDate: "2024-01-08",
      metrics: {
        views: 189,
        used: 28,
        likes: 54,
        shares: 15
      },
      trending: false
    }
  ];

  const totalMetrics = sharedRecipes.reduce((acc, recipe) => ({
    views: acc.views + recipe.metrics.views,
    used: acc.used + recipe.metrics.used,
    likes: acc.likes + recipe.metrics.likes,
    shares: acc.shares + recipe.metrics.shares
  }), { views: 0, used: 0, likes: 0, shares: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2 flex items-center gap-2">
              <Share2 className="text-wasfah-orange" size={28} />
              Shared Recipes Tracking
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Monitor the performance of your shared recipes
            </p>
          </div>
        </div>

        {/* Period Filter */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium">Time Period:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {["week", "month", "all"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                {period === "all" ? "All Time" : `This ${period}`}
              </Button>
            ))}
          </div>
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="mx-auto mb-2 text-blue-500" size={24} />
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">{totalMetrics.views.toLocaleString()}</p>
              <p className="text-xs text-green-600">+15% this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="mx-auto mb-2 text-wasfah-orange" size={24} />
              <p className="text-sm text-gray-600">Times Used</p>
              <p className="text-2xl font-bold">{totalMetrics.used}</p>
              <p className="text-xs text-green-600">+8% this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="mx-auto mb-2 text-red-500" size={24} />
              <p className="text-sm text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold">{totalMetrics.likes}</p>
              <p className="text-xs text-green-600">+12% this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Share2 className="mx-auto mb-2 text-purple-500" size={24} />
              <p className="text-sm text-gray-600">External Shares</p>
              <p className="text-2xl font-bold">{totalMetrics.shares}</p>
              <p className="text-xs text-green-600">+20% this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Shared Recipes List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-wasfah-orange" size={20} />
              Your Shared Recipes ({sharedRecipes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sharedRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Recipe Image */}
                      <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        {recipe.trending && (
                          <div className="absolute top-1 right-1">
                            <Badge className="bg-wasfah-orange text-white text-xs px-1 py-0.5">
                              🔥
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Recipe Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg truncate">{recipe.title}</h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={12} />
                            {new Date(recipe.sharedDate).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Eye size={14} className="text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">{recipe.metrics.views}</p>
                              <p className="text-xs text-gray-500">Views</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-wasfah-orange" />
                            <div>
                              <p className="text-sm font-medium">{recipe.metrics.used}</p>
                              <p className="text-xs text-gray-500">Used</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart size={14} className="text-red-500" />
                            <div>
                              <p className="text-sm font-medium">{recipe.metrics.likes}</p>
                              <p className="text-xs text-gray-500">Likes</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Share2 size={14} className="text-purple-500" />
                            <div>
                              <p className="text-sm font-medium">{recipe.metrics.shares}</p>
                              <p className="text-xs text-gray-500">Shares</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Share Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sharedRecipes.length === 0 && (
              <div className="text-center py-8">
                <Share2 size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No shared recipes yet</p>
                <p className="text-gray-600 mb-4">Share your first recipe to see analytics here!</p>
                <Button className="bg-gradient-to-r from-wasfah-orange to-wasfah-green">
                  Share a Recipe
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default SharedRecipes;
