
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  organizationId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Fetch user organization and role
        const { data: orgMember } = await supabase
          .from('organization_members')
          .select(`
            organization_id,
            role,
            organizations (*)
          `)
          .eq('user_id', session.user.id)
          .single();

        if (orgMember) {
          setOrganizationId(orgMember.organization_id);
          setUserRole(orgMember.role);
        }
      } else {
        setOrganizationId(null);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Clean up state first
      setUser(null);
      setSession(null);
      setUserRole(null);
      setOrganizationId(null);
      
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      
      // Redirect to auth page
      window.location.href = '/auth';
    } catch (error) {
      console.error('Sign out error:', error);
      // Force redirect even if sign out fails
      window.location.href = '/auth';
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN' && session?.user) {
          // Defer organization data fetching
          setTimeout(async () => {
            try {
              const { data: orgMember } = await supabase
                .from('organization_members')
                .select(`
                  organization_id,
                  role,
                  organizations (*)
                `)
                .eq('user_id', session.user.id)
                .single();

              if (orgMember) {
                setOrganizationId(orgMember.organization_id);
                setUserRole(orgMember.role);
              }
            } catch (error) {
              console.error('Error fetching organization:', error);
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setOrganizationId(null);
          setUserRole(null);
        }

        if (event !== 'TOKEN_REFRESHED') {
          setLoading(false);
        }
      }
    );

    // Check for existing session
    refreshAuth();

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    userRole,
    organizationId,
    loading,
    signOut,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
