
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
      console.log('Fetching team members for organization:', organizationId);

      // Get organization members with their profiles and roles
      const { data: members, error: membersError } = await supabase
        .from('organization_members')
        .select(`
          user_id,
          status,
          joined_at,
          profiles!inner(
            id,
            first_name,
            last_name,
            avatar_url,
            department
          ),
          user_roles!inner(
            role
          )
        `)
        .eq('organization_id', organizationId);

      if (membersError) {
        console.error('Error fetching members:', membersError);
        throw membersError;
      }

      console.log('Raw members data:', members);

      if (!members || members.length === 0) {
        console.log('No members found');
        setTeamMembers([]);
        setLoading(false);
        return;
      }

      // Get job counts for each user
      const userIds = members.map(m => m.user_id);
      const { data: jobs } = await supabase
        .from('jobs')
        .select('created_by')
        .eq('organization_id', organizationId)
        .in('created_by', userIds);

      const jobCountMap = jobs?.reduce((acc, job) => {
        acc[job.created_by] = (acc[job.created_by] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      // Get emails for each user using the new function
      const emailPromises = members.map(async (member) => {
        const { data: emailData } = await supabase.rpc('get_user_email', {
          user_uuid: member.user_id
        });
        return { userId: member.user_id, email: emailData || 'N/A' };
      });

      const emailResults = await Promise.all(emailPromises);
      const emailMap = emailResults.reduce((acc, result) => {
        acc[result.userId] = result.email;
        return acc;
      }, {} as Record<string, string>);

      const transformedMembers: TeamMember[] = members.map(member => {
        const profile = member.profiles;
        const userRole = member.user_roles;
        
        return {
          id: member.user_id,
          name: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unknown User' : 'Unknown User',
          email: emailMap[member.user_id] || 'N/A',
          role: mapRole(userRole?.role || 'candidate'),
          status: member.status as TeamMember['status'],
          jobs: jobCountMap[member.user_id] || 0,
          department: profile?.department || 'Unassigned',
          lastActive: formatLastActive(member.joined_at),
          avatar_url: profile?.avatar_url || undefined
        };
      });

      console.log('Transformed members:', transformedMembers);
      setTeamMembers(transformedMembers);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: 'Error loading team members',
        description: 'Failed to load team member data',
        variant: 'destructive',
      });
      
      // Set empty array instead of fallback data so we can see the real issue
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const mapRole = (role: string): UserRole => {
    switch (role) {
      case 'customer_admin':
      case 'startup_admin':
      case 'recruiter':
      case 'hiring_manager':
      case 'candidate':
        return role as UserRole;
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
