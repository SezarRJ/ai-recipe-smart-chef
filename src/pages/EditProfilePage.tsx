
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Heart, ChefHat } from 'lucide-react';

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    dietaryPreferences: mockUser.dietaryPreferences?.join(', ') || '',
    cuisinePreferences: mockUser.cuisinePreferences?.join(', ') || '',
    allergies: mockUser.allergies?.join(', ') || '',
    chefAvatar: mockUser.chefAvatar || '',
    calories: mockUser.nutritionalGoals?.calories || 2000,
    protein: mockUser.nutritionalGoals?.protein || 150
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser = {
      ...mockUser,
      name: formData.name,
      email: formData.email,
      dietaryPreferences: formData.dietaryPreferences.split(',').map(s => s.trim()).filter(Boolean),
      cuisinePreferences: formData.cuisinePreferences.split(',').map(s => s.trim()).filter(Boolean),
      allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean),
      chefAvatar: formData.chefAvatar,
      nutritionalGoals: {
        ...mockUser.nutritionalGoals,
        calories: formData.calories,
        protein: formData.protein
      }
    };

    console.log("Saving updated user data:", updatedUser);
    toast.success("Profile updated successfully!");
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <PageContainer
      header={{
        title: 'Edit Profile',
        showBackButton: true,
        actions: (
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-6 space-y-6">
        <form onSubmit={handleSaveChanges} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User size={20} className="mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="chefAvatar">Chef Personality</Label>
                <Input
                  id="chefAvatar"
                  value={formData.chefAvatar}
                  onChange={(e) => handleInputChange('chefAvatar', e.target.value)}
                  placeholder="e.g., The Grill Master"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart size={20} className="mr-2" />
                Food Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                <Input
                  id="dietaryPreferences"
                  value={formData.dietaryPreferences}
                  onChange={(e) => handleInputChange('dietaryPreferences', e.target.value)}
                  placeholder="e.g., Vegetarian, Gluten-Free"
                />
                <p className="text-sm text-gray-500 mt-1">Separate multiple preferences with commas</p>
              </div>
              <div>
                <Label htmlFor="cuisinePreferences">Cuisine Preferences</Label>
                <Input
                  id="cuisinePreferences"
                  value={formData.cuisinePreferences}
                  onChange={(e) => handleInputChange('cuisinePreferences', e.target.value)}
                  placeholder="e.g., Italian, Mexican"
                />
                <p className="text-sm text-gray-500 mt-1">Separate multiple cuisines with commas</p>
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="e.g., Peanuts, Dairy"
                />
                <p className="text-sm text-gray-500 mt-1">Separate multiple allergies with commas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ChefHat size={20} className="mr-2" />
                Nutritional Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="calories">Daily Calories Goal</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={formData.calories}
                    onChange={(e) => handleInputChange('calories', parseInt(e.target.value) || 0)}
                    placeholder="2000"
                  />
                </div>
                <div>
                  <Label htmlFor="protein">Daily Protein Goal (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={formData.protein}
                    onChange={(e) => handleInputChange('protein', parseInt(e.target.value) || 0)}
                    placeholder="150"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel} type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
