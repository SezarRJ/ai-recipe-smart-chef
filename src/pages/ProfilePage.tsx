
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, Settings, Crown, Award, BookOpen, 
  ChefHat, Heart, Star, TrendingUp, Clock,
  Edit, Share2, Calendar
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// Mock user data with safe defaults
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder-avatar.jpg',
  memberSince: '2024-01-15',
  subscription: 'Premium',
  level: 8,
  experiencePoints: 2340,
  nextLevelXP: 3000,
  totalRecipes: 47,
  favoritesCount: 23,
  recipesShared: 12,
  cookingStreak: 7,
  achievements: [
    { id: 1, name: 'First Recipe', icon: '🏆', unlocked: true },
    { id: 2, name: 'Cooking Streak', icon: '🔥', unlocked: true },
    { id: 3, name: 'Recipe Master', icon: '👨‍🍳', unlocked: false },
    { id: 4, name: 'Community Chef', icon: '🌟', unlocked: true }
  ],
  dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
  cuisinePreferences: ['Italian', 'Mediterranean', 'Asian'],
  allergies: ['Nuts', 'Dairy'],
  chefAvatar: 'The Grill Master',
  nutritionalGoals: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  },
  recentActivity: [
    { id: 1, type: 'cooked', recipe: 'Mediterranean Salad', date: '2024-01-20' },
    { id: 2, type: 'favorited', recipe: 'Pasta Primavera', date: '2024-01-19' },
    { id: 3, type: 'shared', recipe: 'Chocolate Cake', date: '2024-01-18' }
  ]
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <PageContainer header={{ title: 'Profile', showBackButton: true }}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wasfah-bright-teal"></div>
        </div>
      </PageContainer>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <PageContainer header={{ title: 'Profile', showBackButton: true }}>
        <div className="flex flex-col items-center justify-center h-96 space-y-6">
          <User className="h-24 w-24 text-gray-400" />
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign in to view your profile
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Create an account to track your recipes, cooking progress, and achievements.
            </p>
            <Link to="/auth">
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-deep-teal">
                Sign In / Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Chef';
  const userEmail = user.email || mockUser.email;
  
  const progressToNextLevel = (mockUser.experiencePoints / mockUser.nextLevelXP) * 100;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'cooked': return <ChefHat className="h-4 w-4 text-green-600" />;
      case 'favorited': return <Heart className="h-4 w-4 text-red-600" />;
      case 'shared': return <Share2 className="h-4 w-4 text-blue-600" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <PageContainer 
      header={{ 
        title: 'My Profile', 
        showBackButton: true,
        actions: (
          <Link to="/edit-profile">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        )
      }}
    >
      <div className="container px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <Badge className="absolute -bottom-1 -right-1 bg-yellow-500">
                  <Crown className="h-3 w-3 mr-1" />
                  {mockUser.subscription}
                </Badge>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{displayName}</h1>
                <p className="text-gray-600">{userEmail}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Member since {new Date(mockUser.memberSince).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-wasfah-cream">
                    Level {mockUser.level}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Experience Progress</span>
                <span>{mockUser.experiencePoints} / {mockUser.nextLevelXP} XP</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto text-wasfah-bright-teal mb-2" />
              <div className="text-2xl font-bold">{mockUser.totalRecipes}</div>
              <div className="text-sm text-gray-600">Recipes Tried</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
              <div className="text-2xl font-bold">{mockUser.favoritesCount}</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Share2 className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{mockUser.recipesShared}</div>
              <div className="text-sm text-gray-600">Shared</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{mockUser.cookingStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockUser.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    achievement.unlocked
                      ? 'border-wasfah-bright-teal bg-wasfah-cream'
                      : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <div className="text-sm font-medium">{achievement.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Cooking Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Dietary Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {mockUser.dietaryPreferences.map((pref, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Favorite Cuisines</h4>
              <div className="flex flex-wrap gap-2">
                {mockUser.cuisinePreferences.map((cuisine, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50">
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>

            {mockUser.allergies.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {mockUser.allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockUser.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="capitalize font-medium">{activity.type}</span> {activity.recipe}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/edit-profile" className="flex-1">
            <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
          <Link to="/settings" className="flex-1">
            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
