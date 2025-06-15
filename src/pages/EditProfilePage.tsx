
import React, { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserRound, ChefHat, Heart, Mail, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

export default function EditProfilePage() {
  const { profile, updateProfile, fetchProfile, loading } = useProfile();
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    avatar_url: "",
    chef_avatar: "",
    dietary_preferences: "",
    cuisine_preferences: "",
    allergies: "",
    calories: "",
    protein: "",
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load the profile into the form
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || "",
        chef_avatar: (profile as any).chef_avatar || "",
        dietary_preferences: profile.dietary_preferences?.join(", ") || "",
        cuisine_preferences: profile.cuisine_preferences?.join(", ") || "",
        allergies: profile.allergies?.join(", ") || "",
        calories: (profile as any).nutritional_goals?.calories?.toString() || "",
        protein: (profile as any).nutritional_goals?.protein?.toString() || "",
      });
    }
  }, [profile]);

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${profile?.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, avatar_url: data.publicUrl || "" }));

      // Optionally update immediately in the DB
      await updateProfile({ avatar_url: data.publicUrl });

      toast({
        title: "Avatar updated",
        description: "Your profile picture was updated successfully."
      });
    } catch (err: any) {
      toast({
        title: "Avatar Upload Error",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updates = {
        full_name: formData.full_name,
        bio: formData.bio,
        avatar_url: formData.avatar_url,
        chef_avatar: formData.chef_avatar,
        dietary_preferences: formData.dietary_preferences.split(',').map(s => s.trim()).filter(Boolean),
        cuisine_preferences: formData.cuisine_preferences.split(',').map(s => s.trim()).filter(Boolean),
        allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean),
        nutritional_goals: {
          calories: Number(formData.calories) || undefined,
          protein: Number(formData.protein) || undefined,
        }
      };
      await updateProfile(updates);
      await fetchProfile();
      toast({
        title: "Profile updated successfully!"
      });
      navigate("/profile");
    } catch (err: any) {
      toast({
        title: "Failed to update profile",
        description: err.message,
        variant: "destructive"
      });
    }
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
      <div className="max-w-xl mx-auto px-4 py-6 space-y-7">
        <form onSubmit={handleSaveChanges} className="space-y-6">
          {/* Avatar, Name, Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound size={22} className="text-wasfah-bright-teal" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="relative">
                  <Avatar className="h-20 w-20 shadow border border-wasfah-bright-teal">
                    {formData.avatar_url
                      ? <AvatarImage src={formData.avatar_url} alt="User Avatar" />
                      : <AvatarFallback><UserRound size={36} /></AvatarFallback>
                    }
                  </Avatar>
                  <button
                    type="button"
                    className="absolute bottom-1 right-1 bg-white rounded-full p-1 border shadow hover:bg-gray-50"
                    aria-label="Change avatar"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Camera size={18} className="text-wasfah-bright-teal" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
                <div className="flex-1 w-full space-y-3">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={e => handleInputChange('full_name', e.target.value)}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={profile?.id || ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={e => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="resize-none"
                  maxLength={180}
                />
                <div className="text-xs text-gray-500 text-end">{formData.bio.length}/180</div>
              </div>
              <div>
                <Label htmlFor="chef_avatar">Chef Persona</Label>
                <Input
                  id="chef_avatar"
                  value={formData.chef_avatar}
                  onChange={e => handleInputChange('chef_avatar', e.target.value)}
                  placeholder="e.g., The Grill Master, Vegan Queen"
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart size={20} className="text-wasfah-orange" />
                Food & Cuisine Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Dietary Preferences</Label>
                <Input
                  value={formData.dietary_preferences}
                  onChange={e => handleInputChange("dietary_preferences", e.target.value)}
                  placeholder="e.g., Vegetarian, Gluten-Free"
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>
              <div>
                <Label>Cuisine Preferences</Label>
                <Input
                  value={formData.cuisine_preferences}
                  onChange={e => handleInputChange("cuisine_preferences", e.target.value)}
                  placeholder="e.g., Italian, Mexican"
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>
              <div>
                <Label>Allergies</Label>
                <Input
                  value={formData.allergies}
                  onChange={e => handleInputChange("allergies", e.target.value)}
                  placeholder="e.g., Peanuts, Dairy"
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat size={20} className="text-wasfah-bright-teal" />
                Nutrition Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="calories">Calories Goal</Label>
                  <Input
                    id="calories"
                    type="number"
                    min={0}
                    value={formData.calories}
                    onChange={e => handleInputChange("calories", e.target.value)}
                    placeholder="2000"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="protein">Protein Goal (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    min={0}
                    value={formData.protein}
                    onChange={e => handleInputChange("protein", e.target.value)}
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
            <Button
              type="submit"
              className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
              disabled={loading || uploading}
            >
              {loading || uploading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

