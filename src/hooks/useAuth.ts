
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'user' | 'admin' | 'super_admin';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
    role: null,
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const role = await getUserRole(session.user.id);
        setAuthState({
          user: session.user,
          loading: false,
          isAuthenticated: true,
          role,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false,
          role: null,
        });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const role = await getUserRole(session.user.id);
          setAuthState({
            user: session.user,
            loading: false,
            isAuthenticated: true,
            role,
          });
        } else {
          setAuthState({
            user: null,
            loading: false,
            isAuthenticated: false,
            role: null,
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getUserRole = async (userId: string): Promise<UserRole> => {
    try {
      const { data, error } = await supabase.rpc('get_user_role', {
        user_id: userId
      });

      if (error) throw error;
      return (data as UserRole) || 'user';
    } catch (error) {
      console.error('Error getting user role:', error);
      return 'user';
    }
  };

  return authState;
};
