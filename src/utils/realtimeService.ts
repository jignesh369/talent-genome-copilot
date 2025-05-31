
import { supabase } from '@/integrations/supabase/client';
import { BackendService } from '@/services/backendService';

export class RealtimeService {
  private static subscriptions = new Map<string, any>();

  static setupRealtimeSubscriptions(organizationId: string, callbacks: {
    onApplicationUpdate?: (payload: any) => void;
    onRiskAlert?: (payload: any) => void;
    onTeamMessage?: (payload: any) => void;
    onCandidateUpdate?: (payload: any) => void;
  }) {
    // Clean up existing subscriptions
    this.cleanup();

    // Application updates
    if (callbacks.onApplicationUpdate) {
      const appSub = BackendService.subscribeToApplicationUpdates(
        organizationId,
        callbacks.onApplicationUpdate
      );
      this.subscriptions.set('applications', appSub);
    }

    // Risk alerts
    if (callbacks.onRiskAlert) {
      const alertSub = BackendService.subscribeToRiskAlerts(
        organizationId,
        callbacks.onRiskAlert
      );
      this.subscriptions.set('risk-alerts', alertSub);
    }

    // Team messages
    if (callbacks.onTeamMessage) {
      const messageSub = BackendService.subscribeToTeamMessages(
        organizationId,
        callbacks.onTeamMessage
      );
      this.subscriptions.set('team-messages', messageSub);
    }

    // Candidate updates
    if (callbacks.onCandidateUpdate) {
      const candidateSub = supabase
        .channel('candidate-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'candidates'
          },
          callbacks.onCandidateUpdate
        )
        .subscribe();
      this.subscriptions.set('candidates', candidateSub);
    }
  }

  static cleanup() {
    this.subscriptions.forEach((subscription, key) => {
      supabase.removeChannel(subscription);
    });
    this.subscriptions.clear();
  }

  static async sendTeamMessage(organizationId: string, message: {
    channel_id: string;
    message_type: 'text' | 'file' | 'candidate_share' | 'job_share';
    content: string;
    metadata?: any;
  }) {
    const { data, error } = await supabase
      .from('team_messages')
      .insert({
        organization_id: organizationId,
        sender_id: (await supabase.auth.getUser()).data.user?.id,
        ...message,
        sent_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createNotification(userId: string, notification: {
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    entity_type?: string;
    entity_id?: string;
  }) {
    const { data, error } = await supabase
      .from('user_notifications')
      .insert({
        user_id: userId,
        ...notification
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
