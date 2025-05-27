// src/pages/EditProfilePage.tsx
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer'; // Ensure this path is correct for your PageContainer
import { Button } from '@/components/ui/button'; // Ensure this path is correct for your Button component
import { Input } from '@/components/ui/input';   // Ensure this path is correct for your Input component
import { Label } from '@/components/ui/label';   // Ensure this path is correct for your Label component
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/data/mockData'; // Import mock user for initial data

export default function EditProfilePage() {
  const navigate = useNavigate();

  // State to manage editable profile fields
  // Initialize with mockUser data for demonstration
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [dietaryPreferences, setDietaryPreferences] = useState(mockUser.dietaryPreferences?.join(', ') || '');
  const [cuisinePreferences, setCuisinePreferences] = useState(mockUser.cuisinePreferences?.join(', ') || '');
  const [allergies, setAllergies] = useState(mockUser.allergies?.join(', ') || '');
  const [chefAvatar, setChefAvatar] = useState(mockUser.chefAvatar || '');
  // Add more states for other editable fields from mockUser as needed (e.g., nutritionalGoals, etc.)
  // For nutritional goals, you might need a more complex state or nested state.
  // const [nutritionalGoals, setNutritionalGoals] = useState(mockUser.nutritionalGoals || { protein: 0, calories: 0 });

  const handleSaveChanges = () => {
    // In a real application, you would gather all state values and send them
    // to your backend API to update the user's profile.
    // Example: axios.put('/api/user/profile', { name, email, ... });

    // For now, we'll just simulate a save and show a toast.
    // You would typically update a global state (like Redux, Context API, or Zustand)
    // or re-fetch the user data in ProfilePage after a successful save.

    const updatedUser = {
      ...mockUser, // Keep existing mock data, and only update edited fields
      name,
      email,
      dietaryPreferences: dietaryPreferences.split(',').map(s => s.trim()).filter(Boolean),
      cuisinePreferences: cuisinePreferences.split(',').map(s => s.trim()).filter(Boolean),
      allergies: allergies.split(',').map(s => s.trim()).filter(Boolean),
      chefAvatar,
      // ... other updated fields
    };

    console.log("Simulating saving updated user data:", updatedUser); // Log to console for verification
    toast.success("Profile updated successfully!");
    navigate('/profile'); // Navigate back to the profile view page after saving
  };

  const handleCancel = () => {
    navigate('/profile'); // Go back to the profile view page without saving changes
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
          <div>
            <Label htmlFor="chefAvatar">Chef Personality</Label>
            <Input
              id="chefAvatar"
              value={chefAvatar}
              onChange={(e) => setChefAvatar(e.target.value)}
              placeholder="e.g., The Grill Master"
            />
          </div>
          {/* Add more input fields for other editable data from mockUser */}
          {/* For nutritional goals, you might render separate inputs for protein and calories, e.g.:
          <div>
            <Label htmlFor="protein">Protein Goal (g)</Label>
            <Input
              id="protein"
              type="number"
              value={nutritionalGoals.protein}
              onChange={(e) => setNutritionalGoals({...nutritionalGoals, protein: parseInt(e.target.value) || 0})}
            />
          </div>
          <div>
            <Label htmlFor="calories">Calories Goal</Label>
            <Input
              id="calories"
              type="number"
              value={nutritionalGoals.calories}
              onChange={(e) => setNutritionalGoals({...nutritionalGoals, calories: parseInt(e.target.value) || 0})}
            />
          </div>
          */}

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleCancel} type="button"> {/* type="button" to prevent form submission */}
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