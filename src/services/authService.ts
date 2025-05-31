
import { UserRole } from '@/types/auth';

export class AuthService {
  static determineUserRole(user: any): UserRole {
    // This would typically come from user metadata or database
    if (user?.user_metadata?.role) {
      return user.user_metadata.role as UserRole;
    }
    
    // Default role determination logic
    if (user?.email?.includes('admin@')) {
      return 'startup_admin';
    }
    
    return 'candidate';
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
}
