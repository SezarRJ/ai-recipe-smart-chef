
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Eye, Heart, Share2, Calendar, ArrowLeft, TrendingUp, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SharedRecipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  views: number;
  likes: number;
  shares: number;
  used: number;
  category: string;
  difficulty: string;
  cookingTime: number;
}

const SharedRecipes = () => {
  const navigate = useNavigate();
  
  const [sharedRecipes] = useState<SharedRecipe[]>([
    {
      id: "1",
      title: "Mediterranean Chickpea Salad",
      description: "A healthy and refreshing salad perfect for summer",
      imageUrl: "/placeholder.svg",
      createdAt: "2024-01-15",
      views: 1247,
      likes: 89,
      shares: 23,
      used: 156,
      category: "Salads",
      difficulty: "Easy",
      cookingTime: 15
    },
    {
      id: "2",
      title: "Homemade Pasta with Marinara",
      description: "Traditional Italian pasta recipe with fresh marinara sauce",
      imageUrl: "/placeholder.svg",
      createdAt: "2024-01-10",
      views: 892,
      likes: 67,
      shares: 18,
      used: 98,
      category: "Main Dishes",
      difficulty: "Intermediate",
      cookingTime: 45
    },
    {
      id: "3",
      title: "Chocolate Chip Cookies",
      description: "Classic chocolate chip cookies that everyone loves",
      imageUrl: "/placeholder.svg",
      createdAt: "2024-01-05",
      views: 2156,
      likes: 198,
      shares: 45,
      used: 289,
      category: "Desserts",
      difficulty: "Easy",
      cookingTime: 25
    }
  ]);

  const totalStats = {
    totalViews: sharedRecipes.reduce((sum, recipe) => sum + recipe.views, 0),
    totalLikes: sharedRecipes.reduce((sum, recipe) => sum + recipe.likes, 0),
    totalShares: sharedRecipes.reduce((sum, recipe) => sum + recipe.shares, 0),
    totalUsed: sharedRecipes.reduce((sum, recipe) => sum + recipe.used, 0),
    totalRecipes: sharedRecipes.length
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

        {/* Overall Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="mx-auto mb-2 text-blue-500" size={24} />
              <p className="text-sm text-gray-600">Total Recipes</p>
              <p className="text-2xl font-bold">{totalStats.totalRecipes}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="mx-auto mb-2 text-green-500" size={24} />
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">{totalStats.totalViews.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="mx-auto mb-2 text-red-500" size={24} />
              <p className="text-sm text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold">{totalStats.totalLikes}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="mx-auto mb-2 text-purple-500" size={24} />
              <p className="text-sm text-gray-600">Times Used</p>
              <p className="text-2xl font-bold">{totalStats.totalUsed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Share2 className="mx-auto mb-2 text-wasfah-orange" size={24} />
              <p className="text-sm text-gray-600">Total Shares</p>
              <p className="text-2xl font-bold">{totalStats.totalShares}</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-wasfah-orange" size={20} />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Most Popular Recipe</p>
                <p className="font-bold">Chocolate Chip Cookies</p>
                <p className="text-sm text-gray-600">2,156 views</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Most Used Recipe</p>
                <p className="font-bold">Chocolate Chip Cookies</p>
                <p className="text-sm text-gray-600">289 times used</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Most Shared Recipe</p>
                <p className="font-bold">Chocolate Chip Cookies</p>
                <p className="text-sm text-gray-600">45 shares</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shared Recipes List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Shared Recipes</h2>
          {sharedRecipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center">
                      <span className="text-4xl">🍽️</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{recipe.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{recipe.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{recipe.category}</Badge>
                          <Badge className={getDifficultyColor(recipe.difficulty)}>
                            {recipe.difficulty}
                          </Badge>
                          <Badge variant="outline">{recipe.cookingTime} min</Badge>
                        </div>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="text-sm text-gray-500">
                          <Calendar size={14} className="inline mr-1" />
                          {formatDate(recipe.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-green-500" />
                        <div>
                          <p className="font-semibold">{recipe.views.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">Views</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart size={16} className="text-red-500" />
                        <div>
                          <p className="font-semibold">{recipe.likes}</p>
                          <p className="text-xs text-gray-600">Likes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-purple-500" />
                        <div>
                          <p className="font-semibold">{recipe.used}</p>
                          <p className="text-xs text-gray-600">Used</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Share2 size={16} className="text-wasfah-orange" />
                        <div>
                          <p className="font-semibold">{recipe.shares}</p>
                          <p className="text-xs text-gray-600">Shares</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sharedRecipes.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Share2 size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No Shared Recipes Yet</h3>
              <p className="text-gray-600 mb-4">Share your first recipe to start tracking its performance</p>
              <Button onClick={() => navigate("/create-recipe")}>
                Create Your First Recipe
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <MobileNavigation />
    </div>
  );
};

export default SharedRecipes;
