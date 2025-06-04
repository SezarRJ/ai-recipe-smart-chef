
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  dietary_preferences: string[] | null;
  cuisine_preferences: string[] | null;
  allergies: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching profile:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      toast({
        title: 'Profile updated successfully'
      });

      return data;
    } catch (err: any) {
      toast({
        title: 'Error updating profile',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile
  };
};
