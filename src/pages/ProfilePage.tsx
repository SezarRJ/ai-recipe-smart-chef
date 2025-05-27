
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Mail, User, Heart, ChefHat, Globe, Award, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/data/mockData';

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <PageContainer
      header={{
        title: 'Profile',
        showBackButton: true,
        actions: (
          <Button onClick={handleEditProfile} className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
            <Edit size={16} className="mr-2" />
            Edit Profile
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-wasfah-bright-teal rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {mockUser.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-wasfah-deep-teal">{mockUser.name}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <Mail size={16} className="mr-2" />
                  {mockUser.email}
                </div>
                {mockUser.chefAvatar && (
                  <div className="flex items-center mt-2">
                    <ChefHat size={16} className="mr-2 text-wasfah-bright-teal" />
                    <Badge variant="secondary">{mockUser.chefAvatar}</Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart size={20} className="mr-2 text-wasfah-coral-red" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUser.dietaryPreferences && mockUser.dietaryPreferences.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.dietaryPreferences.map((pref, index) => (
                    <Badge key={index} variant="outline">{pref}</Badge>
                  ))}
                </div>
              </div>
            )}

            {mockUser.cuisinePreferences && mockUser.cuisinePreferences.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Cuisine Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.cuisinePreferences.map((cuisine, index) => (
                    <Badge key={index} variant="outline" className="flex items-center">
                      <Globe size={12} className="mr-1" />
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {mockUser.allergies && mockUser.allergies.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive">{allergy}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nutritional Goals */}
        {mockUser.nutritionalGoals && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target size={20} className="mr-2 text-wasfah-bright-teal" />
                Nutritional Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-wasfah-deep-teal">
                    {mockUser.nutritionalGoals.calories}
                  </div>
                  <div className="text-sm text-gray-600">Daily Calories</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-wasfah-deep-teal">
                    {mockUser.nutritionalGoals.protein}g
                  </div>
                  <div className="text-sm text-gray-600">Daily Protein</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award size={20} className="mr-2 text-wasfah-mint" />
              Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-wasfah-deep-teal">24</div>
                <div className="text-sm text-gray-600">Recipes Cooked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wasfah-deep-teal">12</div>
                <div className="text-sm text-gray-600">Favorites</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wasfah-deep-teal">7</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
