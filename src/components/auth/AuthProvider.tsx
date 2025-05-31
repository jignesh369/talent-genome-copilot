
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  organizationId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // For now, set default role based on email or user metadata
          // This will be replaced with database lookup once tables are created
          setDefaultUserRole(session.user);
        } else {
          setUserRole(null);
          setOrganizationId(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setDefaultUserRole(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setDefaultUserRole = (user: User) => {
    // Temporary role assignment logic until database is set up
    // You can customize this based on email domains or user metadata
    const email = user.email || '';
    
    if (email.includes('admin@') || user.user_metadata?.role === 'startup_admin') {
      setUserRole('startup_admin');
    } else if (email.includes('customer@') || user.user_metadata?.role === 'customer_admin') {
      setUserRole('customer_admin');
    } else if (email.includes('recruiter@') || user.user_metadata?.role === 'recruiter') {
      setUserRole('recruiter');
    } else if (email.includes('hiring@') || user.user_metadata?.role === 'hiring_manager') {
      setUserRole('hiring_manager');
    } else {
      setUserRole('candidate'); // Default role
    }
    
    setOrganizationId('default-org'); // Temporary organization ID
    setLoading(false);
  };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userRole,
        organizationId,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
