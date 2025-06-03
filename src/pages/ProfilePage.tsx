
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Heart, 
  BookOpen, 
  Calendar, 
  Award,
  Edit,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    recipesCreated: 0,
    favoriteRecipes: 0,
    mealPlansCreated: 0,
    achievementsUnlocked: 0
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, [user]);

  const fetchProfile = async () => {
    try {
      if (!user) {
        setError('Please sign in to view your profile');
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // If no profile exists, create a default one
      if (!data) {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            user_id: user.id,
            full_name: user.email?.split('@')[0] || 'User',
            avatar_url: null
          }])
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      if (!user) return;

      // Fetch user stats from various tables
      const [recipesResult, favoritesResult, mealPlansResult] = await Promise.all([
        supabase.from('recipes').select('id').eq('user_id', user.id),
        supabase.from('favorites').select('id').eq('user_id', user.id),
        supabase.from('meal_plans').select('id').eq('user_id', user.id)
      ]);

      setStats({
        recipesCreated: recipesResult.data?.length || 0,
        favoriteRecipes: favoritesResult.data?.length || 0,
        mealPlansCreated: mealPlansResult.data?.length || 0,
        achievementsUnlocked: 3 // Mock value
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast({
        title: 'Signed out successfully',
        description: 'You have been signed out of your account'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <PageContainer
        header={{
          title: 'Profile',
          showBackButton: true,
        }}
      >
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wasfah-bright-teal"></div>
        </div>
      </PageContainer>
    );
  }

  if (error || !user) {
    return (
      <PageContainer
        header={{
          title: 'Profile',
          showBackButton: true,
        }}
      >
        <Card>
          <CardContent className="py-12 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Error</h3>
            <p className="text-gray-500 mb-4">{error || 'Please sign in to view your profile'}</p>
            <div className="space-x-2">
              <Button onClick={() => navigate('/auth')} className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                Sign In
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: 'Profile',
        showBackButton: true,
      }}
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                <AvatarFallback className="bg-wasfah-bright-teal text-white text-xl">
                  {(profile?.full_name || user.email)?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.full_name || 'User'}
                </h1>
                <p className="text-gray-500">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">
                    <User className="h-3 w-3 mr-1" />
                    Member since {new Date(user.created_at || '').getFullYear()}
                  </Badge>
                </div>
              </div>
              <Link to="/profile/edit">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.recipesCreated}</div>
                <p className="text-sm text-gray-500">Recipes Created</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Heart className="h-8 w-8 text-wasfah-coral-red mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.favoriteRecipes}</div>
                <p className="text-sm text-gray-500">Favorites</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-wasfah-mint mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.mealPlansCreated}</div>
                <p className="text-sm text-gray-500">Meal Plans</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Award className="h-8 w-8 text-wasfah-gold mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.achievementsUnlocked}</div>
                <p className="text-sm text-gray-500">Achievements</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/profile/edit" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
            <Link to="/profile/dietary-preferences" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Dietary Preferences
              </Button>
            </Link>
            <Link to="/settings" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/delete-account">
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
