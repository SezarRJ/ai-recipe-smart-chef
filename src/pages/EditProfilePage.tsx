
// src/pages/EditProfilePage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/data/mockData';

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [dietaryPreferences, setDietaryPreferences] = useState(mockUser.preferences?.dietary?.join(', ') || '');
  const [cuisinePreferences, setCuisinePreferences] = useState(mockUser.preferences?.cuisines?.join(', ') || '');
  const [allergies, setAllergies] = useState(mockUser.preferences?.allergies?.join(', ') || '');
  const [bio, setBio] = useState(mockUser.bio || '');

  const handleSaveChanges = () => {
    const updatedUser = {
      ...mockUser,
      name,
      email,
      bio,
      preferences: {
        dietary: dietaryPreferences.split(',').map(s => s.trim()).filter(Boolean),
        cuisines: cuisinePreferences.split(',').map(s => s.trim()).filter(Boolean),
        allergies: allergies.split(',').map(s => s.trim()).filter(Boolean),
      },
    };

    console.log("Simulating saving updated user data:", updatedUser);
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
        actions: (
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-6 space-y-6">
        <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
            />
          </div>
          <div>
            <Label htmlFor="dietaryPreferences">Dietary Preferences (comma-separated)</Label>
            <Input
              id="dietaryPreferences"
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
              placeholder="e.g., Vegetarian, Gluten-Free"
            />
          </div>
          <div>
            <Label htmlFor="cuisinePreferences">Cuisine Preferences (comma-separated)</Label>
            <Input
              id="cuisinePreferences"
              value={cuisinePreferences}
              onChange={(e) => setCuisinePreferences(e.target.value)}
              placeholder="e.g., Italian, Mexican"
            />
          </div>
          <div>
            <Label htmlFor="allergies">Allergies (comma-separated)</Label>
            <Input
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="e.g., Peanuts, Dairy"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleCancel} type="button">
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
