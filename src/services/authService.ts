
import { UserRole } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';

export class AuthService {
  static async getUserRole(userId: string): Promise<UserRole | null> {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data.role as UserRole;
    } catch (error) {
      console.error('Error in getUserRole:', error);
      return null;
    }
  }

  static async getUserOrganization(userId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user organization:', error);
        return null;
      }

      return data.organization_id;
    } catch (error) {
      console.error('Error in getUserOrganization:', error);
      return null;
    }
  }

  static canAccessAdminFeatures(role: UserRole): boolean {
    return ['customer_admin', 'startup_admin'].includes(role);
  }

  static canManageOrganization(role: UserRole): boolean {
    return role === 'customer_admin' || role === 'startup_admin';
  }

  static canManageBilling(role: UserRole): boolean {
    return role === 'customer_admin' || role === 'startup_admin';
  }

  static getAccessibleTabs(role: UserRole): string[] {
    const baseTabs = ['profile', 'notifications', 'security'];
    
    if (this.canManageOrganization(role)) {
      return ['profile', 'organization', 'notifications', 'security', 'billing'];
    }
    
    return baseTabs;
  }

  static getDefaultRedirect(role: UserRole): string {
    switch (role) {
      case 'startup_admin':
        return '/startup-admin';
      case 'customer_admin':
        return '/customer-admin';
      case 'recruiter':
      case 'hiring_manager':
        return '/recruiter-dashboard';
      case 'candidate':
        return '/candidate-dashboard';
      default:
        return '/';
    }
  }
}
