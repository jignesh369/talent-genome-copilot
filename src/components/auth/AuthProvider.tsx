
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext, AuthContextType } from '@/hooks/useAuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserOrganization = async (userId: string) => {
    try {
      console.log('AuthProvider: Fetching organization for user:', userId);
      
      // First try to get organization from organization_members table
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select(`
          organization_id,
          role,
          organizations (*)
        `)
        .eq('user_id', userId)
        .single();

      if (memberError) {
        console.log('AuthProvider: No organization membership found, checking user_roles');
        
        // Fallback to user_roles table
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role, organization_id')
          .eq('user_id', userId)
          .single();

        if (roleError) {
          console.log('AuthProvider: No user role found, using defaults');
          setUserRole('candidate');
          setOrganizationId(null);
        } else {
          console.log('AuthProvider: User role found:', roleData);
          setUserRole(roleData.role);
          setOrganizationId(roleData.organization_id);
        }
      } else {
        console.log('AuthProvider: Organization membership found:', memberData);
        setUserRole(memberData.role);
        setOrganizationId(memberData.organization_id);
      }
    } catch (error) {
      console.error('AuthProvider: Error fetching user organization:', error);
      setUserRole('candidate');
      setOrganizationId(null);
    }
  };

  const refreshAuth = async () => {
    if (user) {
      await fetchUserOrganization(user.id);
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state changed:', event, !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserOrganization(session.user.id);
        } else {
          setUserRole(null);
          setOrganizationId(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('AuthProvider: Initial session check:', !!session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserOrganization(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserRole(null);
      setOrganizationId(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    userRole,
    organizationId,
    loading,
    signOut,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
