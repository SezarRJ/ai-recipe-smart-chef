import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
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

export const profileService = {
  async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return {
      id: data.id,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      dietary_preferences: data.dietary_preferences,
      cuisine_preferences: data.cuisine_preferences,
      allergies: data.allergies,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: updates.full_name,
        avatar_url: updates.avatar_url,
        bio: updates.bio,
        dietary_preferences: updates.dietary_preferences,
        cuisine_preferences: updates.cuisine_preferences,
        allergies: updates.allergies
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

    return {
      id: data.id,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      dietary_preferences: data.dietary_preferences,
      cuisine_preferences: data.cuisine_preferences,
      allergies: data.allergies,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  },

  async createProfile(profile: Omit<UserProfile, 'created_at' | 'updated_at'>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        user_id: profile.id, // Use id as user_id
        full_name: profile.full_name,
        avatar_url: profile.avatar_url
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }

    return {
      id: data.id,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      dietary_preferences: data.dietary_preferences,
      cuisine_preferences: data.cuisine_preferences,
      allergies: data.allergies,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  }
};