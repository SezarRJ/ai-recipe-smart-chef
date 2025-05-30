
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: 'user' | 'admin' | 'super_admin';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const checkUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // Get user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authUser.id)
          .single();

        // Get profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', authUser.id)
          .single();

        setUser({
          id: authUser.id,
          email: authUser.email!,
          full_name: profileData?.full_name || undefined,
          avatar_url: profileData?.avatar_url || undefined,
          role: roleData?.role || 'user'
        });
      } else {
        setUser(null);
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error checking user:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.'
      });
    } catch (err: any) {
      toast({
        title: 'Sign in failed',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) throw error;

      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.'
      });
    } catch (err: any) {
      toast({
        title: 'Sign up failed',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.'
      });
    } catch (err: any) {
      toast({
        title: 'Sign out failed',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const hasRole = (role: 'admin' | 'super_admin') => {
    if (!user) return false;
    if (role === 'admin') {
      return user.role === 'admin' || user.role === 'super_admin';
    }
    return user.role === role;
  };

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          checkUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    hasRole,
    isAuthenticated: !!user
  };
};
