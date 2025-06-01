
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/auth';

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

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { organizationId } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (organizationId) {
      fetchTeamMembers();
    }
  }, [organizationId]);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);

      // Get organization members
      const { data: members, error: membersError } = await supabase
        .from('organization_members')
        .select('*')
        .eq('organization_id', organizationId);

      if (membersError) throw membersError;

      // Get profiles for these members
      const userIds = members?.map(m => m.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .in('id', userIds);

      // Get user roles
      const { data: userRoles } = await supabase
        .from('user_roles')
        .select('*')
        .eq('organization_id', organizationId)
        .in('user_id', userIds);

      // Get job counts for each user
      const { data: jobs } = await supabase
        .from('jobs')
        .select('created_by')
        .eq('organization_id', organizationId)
        .eq('status', 'active');

      const jobCountMap = jobs?.reduce((acc, job) => {
        acc[job.created_by] = (acc[job.created_by] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const transformedMembers: TeamMember[] = members?.map(member => {
        const profile = profiles?.find(p => p.id === member.user_id);
        const userRole = userRoles?.find(r => r.user_id === member.user_id);
        
        return {
          id: member.user_id,
          name: profile ? `${profile.first_name} ${profile.last_name}` : 'Unknown User',
          email: 'user@example.com', // We don't have access to auth.users emails
          role: mapRole(userRole?.role || 'candidate'),
          status: member.status as TeamMember['status'],
          jobs: jobCountMap[member.user_id] || 0,
          department: profile?.department || 'Unassigned',
          lastActive: formatLastActive(member.joined_at),
          avatar_url: profile?.avatar_url || undefined
        };
      }) || [];

      setTeamMembers(transformedMembers);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: 'Error loading team members',
        description: 'Failed to load team member data',
        variant: 'destructive',
      });
      
      // Set some fallback data
      setTeamMembers([
        {
          id: '1',
          name: 'John Smith',
          email: 'john@example.com',
          role: 'customer_admin',
          status: 'active',
          jobs: 5,
          department: 'Engineering',
          lastActive: '2 hours ago',
        },
        {
          id: '2', 
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          role: 'recruiter',
          status: 'active',
          jobs: 3,
          department: 'HR',
          lastActive: '1 day ago',
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const mapRole = (role: string): UserRole => {
    switch (role) {
      case 'customer_admin':
      case 'startup_admin':
        return role as UserRole;
      case 'recruiter':
        return 'recruiter';
      case 'hiring_manager':
        return 'hiring_manager';
      default:
        return 'candidate';
    }
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  const updateMemberRole = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId)
        .eq('organization_id', organizationId);

      if (error) throw error;

      setTeamMembers(prev =>
        prev.map(member =>
          member.id === userId ? { ...member, role: newRole } : member
        )
      );

      toast({
        title: 'Role updated',
        description: 'User role has been updated successfully',
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Error updating role',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    }
  };

  const removeMember = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ status: 'inactive' })
        .eq('user_id', userId)
        .eq('organization_id', organizationId);

      if (error) throw error;

      setTeamMembers(prev => prev.filter(member => member.id !== userId));

      toast({
        title: 'Member removed',
        description: 'Team member has been removed successfully',
      });
    } catch (error) {
      console.error('Error removing member:', error);
      toast({
        title: 'Error removing member',
        description: 'Failed to remove team member',
        variant: 'destructive',
      });
    }
  };

  return {
    teamMembers,
    loading,
    updateMemberRole,
    removeMember,
    refetch: fetchTeamMembers
  };
};
