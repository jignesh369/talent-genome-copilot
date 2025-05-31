
import { UserRole } from './auth';

export interface Organization {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'suspended' | 'inactive';
  contactEmail: string;
  contactName: string;
  userLimit: number;
  jobLimit: number;
  currentUsers: number;
  currentJobs: number;
  website?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  jobs: number;
  department: string;
  lastActive: string;
  avatar_url?: string;
}

export interface OrganizationSettings {
  name: string;
  website: string;
  industry: string;
  size: string;
  description: string;
}
