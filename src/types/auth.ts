
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  department?: string;
  title?: string;
}

export type UserRole = 'candidate' | 'recruiter' | 'hiring_manager' | 'customer_admin' | 'startup_admin';

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  error: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
