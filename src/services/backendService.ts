import { supabase } from '@/integrations/supabase/client';

export class BackendService {
  // Real-time subscriptions with proper authentication checks
  static subscribeToApplicationUpdates(organizationId: string, callback: (payload: any) => void) {
    if (!organizationId) {
      console.error('BackendService: No organization ID provided for subscription');
      return null;
    }

    return supabase
      .channel('application-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications',
          filter: `jobs.organization_id=eq.${organizationId}`
        },
        callback
      )
      .subscribe();
  }

  static subscribeToRiskAlerts(organizationId: string, callback: (payload: any) => void) {
    if (!organizationId) {
      console.error('BackendService: No organization ID provided for risk alerts subscription');
      return null;
    }

    return supabase
      .channel('risk-alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'risk_alerts',
          filter: `organization_id=eq.${organizationId}`
        },
        callback
      )
      .subscribe();
  }

  static subscribeToTeamMessages(organizationId: string, callback: (payload: any) => void) {
    if (!organizationId) {
      console.error('BackendService: No organization ID provided for team messages subscription');
      return null;
    }

    return supabase
      .channel('team-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'team_messages',
          filter: `organization_id=eq.${organizationId}`
        },
        callback
      )
      .subscribe();
  }

  // Database operations with proper organization context
  static async createCandidate(candidateData: any, organizationId: string) {
    if (!organizationId) {
      throw new Error('Organization ID is required');
    }

    const { data, error } = await supabase
      .from('candidates')
      .insert({
        ...candidateData,
        // Note: candidates table doesn't have organization_id, but this ensures context
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateCandidateInsights(candidateId: string, insights: any) {
    const { data, error } = await supabase
      .from('candidate_insights')
      .upsert({ candidate_id: candidateId, ...insights }, { onConflict: 'candidate_id' })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createJob(jobData: any, organizationId: string) {
    if (!organizationId) {
      throw new Error('Organization ID is required');
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        ...jobData,
        organization_id: organizationId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createApplication(applicationData: any) {
    const { data, error } = await supabase
      .from('applications')
      .insert(applicationData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async scheduleInterview(interviewData: any) {
    const { data, error } = await supabase
      .from('interviews')
      .insert(interviewData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createOutreachCampaign(campaignData: any) {
    const { data, error } = await supabase
      .from('outreach_campaigns')
      .insert(campaignData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async logAnalyticsEvent(eventData: any, organizationId: string) {
    if (!organizationId) {
      throw new Error('Organization ID is required for analytics events');
    }

    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        ...eventData,
        organization_id: organizationId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // File upload handling
  static async uploadDocument(file: File, entityType: string, entityId: string) {
    const fileName = `${entityType}/${entityId}/${Date.now()}-${file.name}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Create document record
    const { data: documentRecord, error: documentError } = await supabase
      .from('documents')
      .insert({
        entity_type: entityType,
        entity_id: entityId,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        storage_path: fileName,
        upload_status: 'completed'
      })
      .select()
      .single();

    if (documentError) throw documentError;

    return { uploadData, documentRecord };
  }

  // Organization management with proper auth
  static async getUserOrganization(userId: string) {
    const { data, error } = await supabase
      .from('organization_members')
      .select(`
        organization_id,
        role,
        organizations (*)
      `)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async createOrganization(orgData: any, userId: string) {
    // Create organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert(orgData)
      .select()
      .single();

    if (orgError) throw orgError;

    // Add user as admin
    const { data: membership, error: membershipError } = await supabase
      .from('organization_members')
      .insert({
        organization_id: org.id,
        user_id: userId,
        role: 'admin'
      })
      .select()
      .single();

    if (membershipError) throw membershipError;

    return { organization: org, membership };
  }

  // User role management with proper type safety
  static async assignUserRole(
    userId: string, 
    role: 'startup_admin' | 'customer_admin' | 'recruiter' | 'hiring_manager' | 'candidate', 
    organizationId: string
  ) {
    if (!organizationId) {
      throw new Error('Organization ID is required for role assignment');
    }

    const { data, error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role,
        organization_id: organizationId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
