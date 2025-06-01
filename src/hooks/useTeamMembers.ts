
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'recruiter' | 'hiring_manager' | 'admin' | 'member';
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

      // Get team members with their profiles and roles
      const { data: members, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          profiles!inner(
            id,
            first_name,
            last_name,
            avatar_url,
            department,
            title
          ),
          user_roles!inner(
            role
          )
        `)
        .eq('organization_id', organizationId);

      if (error) throw error;

      // Get user activity for last active times
      const { data: activities } = await supabase
        .from('user_activity_logs')
        .select('user_id, created_at')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      // Get job counts for each user
      const { data: jobCounts } = await supabase
        .from('jobs')
        .select('created_by')
        .eq('organization_id', organizationId)
        .eq('status', 'active');

      const jobCountMap = jobCounts?.reduce((acc, job) => {
        acc[job.created_by] = (acc[job.created_by] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const activityMap = activities?.reduce((acc, activity) => {
        if (!acc[activity.user_id]) {
          acc[activity.user_id] = activity.created_at;
        }
        return acc;
      }, {} as Record<string, string>) || {};

      const transformedMembers: TeamMember[] = members?.map(member => {
        const profile = member.profiles;
        const role = member.user_roles?.role || 'member';
        const lastActivity = activityMap[profile.id];
        
        return {
          id: profile.id,
          name: `${profile.first_name} ${profile.last_name}`,
          email: '', // We'll need to get this from auth if needed
          role: role as TeamMember['role'],
          status: member.status as TeamMember['status'],
          jobs: jobCountMap[profile.id] || 0,
          department: profile.department || 'Unassigned',
          lastActive: lastActivity ? formatLastActive(lastActivity) : 'Never',
          avatar_url: profile.avatar_url || undefined
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
    } finally {
      setLoading(false);
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

  const updateMemberRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId)
        .eq('organization_id', organizationId);

      if (error) throw error;

      setTeamMembers(prev =>
        prev.map(member =>
          member.id === userId ? { ...member, role: newRole as TeamMember['role'] } : member
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
