
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

    // Transform the data to match our interface
    return {
      id: data.id,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      bio: null, // Not in current schema
      dietary_preferences: null, // Not in current schema
      cuisine_preferences: null, // Not in current schema
      allergies: null, // Not in current schema
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: updates.full_name,
        avatar_url: updates.avatar_url
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
      bio: null,
      dietary_preferences: null,
      cuisine_preferences: null,
      allergies: null,
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
      bio: null,
      dietary_preferences: null,
      cuisine_preferences: null,
      allergies: null,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  }
};
