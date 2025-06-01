import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface CommunicationLog {
  id: string;
  candidate_id: string;
  message_type: 'initial_outreach' | 'follow_up' | 'assessment_request' | 'reminder' | 'update';
  message_content: string;
  timestamp: string;
  sender: string;
  recipient: string;
  status: 'sent' | 'delivered' | 'opened' | 'replied' | 'failed';
  feedback?: string;
  cost?: number;
  channel: 'email' | 'linkedin' | 'sms' | 'phone';
  ai_score?: number;
  template_id?: string;
  campaign_id?: string;
  metadata?: Record<string, any>;
}

interface MessageTemplate {
  id: string;
  name: string;
  type: 'initial_outreach' | 'follow_up' | 'assessment_request' | 'reminder' | 'update';
  content: string;
  created_at: string;
  updated_at: string;
  usage_count: number;
  ai_quality_score: number;
  tags: string[];
  metadata?: Record<string, any>;
}

interface CommunicationMetrics {
  total_messages_sent: number;
  delivery_rate: number;
  open_rate: number;
  reply_rate: number;
  average_response_time_hours: number;
  positive_feedback_rate: number;
  cost_per_message: number;
  channel_performance: Record<string, number>;
  template_performance: Record<string, number>;
  campaign_performance: Record<string, number>;
}

export const automatedCommunicationService = {
  async generatePersonalizedMessage(
    candidate: EnhancedCandidate,
    template: MessageTemplate,
    context: Record<string, any> = {}
  ): Promise<string> {
    let message = template.content;
    
    message = message.replace(/{{candidate\.name}}/g, candidate.name);
    message = message.replace(/{{candidate\.title}}/g, candidate.current_title || 'professional');
    message = message.replace(/{{candidate\.company}}/g, candidate.current_company || 'their field');
    message = message.replace(/{{candidate\.skills}}/g, candidate.skills.join(', '));
    message = message.replace(/{{candidate\.location}}/g, candidate.location);
    
    Object.entries(context).forEach(([key, value]) => {
      const regex = new RegExp(`{{context\\.${key}}}`, 'g');
      message = message.replace(regex, value);
    });
    
    const candidateInsights = await this.generateCandidateInsights(candidate);
    message += `\n\n${candidateInsights}`;
    
    return message;
  },

  async generateCandidateInsights(candidate: EnhancedCandidate): Promise<string> {
    const insights = [];
    
    if (candidate.osint_profile?.github?.username) {
      const github = candidate.osint_profile.github;
      if (github.repos > 10) {
        insights.push(`Active GitHub contributor with ${github.repos} repositories`);
      }
      if (github.stars > 50) {
        insights.push(`Well-regarded developer with ${github.stars} GitHub stars`);
      }
    }
    
    if (candidate.career_trajectory_analysis) {
      const trajectory = candidate.career_trajectory_analysis;
      if (trajectory.progression_type === 'ascending') {
        insights.push('Demonstrates strong career progression');
      }
      if (trajectory.growth_rate > 0.8) {
        insights.push('Shows rapid professional growth');
      }
    }
    
    if (candidate.technical_depth_score > 8) {
      insights.push('Exceptional technical expertise');
    } else if (candidate.technical_depth_score > 6) {
      insights.push('Strong technical background');
    }
    
    if (candidate.community_influence_score > 7) {
      insights.push('Active in professional community');
    }
    
    return insights.join('. ') + '.';
  },

  async logCommunication(log: Omit<CommunicationLog, 'id' | 'timestamp' | 'status'>): Promise<CommunicationLog> {
    const newLog: CommunicationLog = {
      id: `comm_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'sent',
      ...log
    };
    
    console.log('Communication Logged:', newLog);
    return newLog;
  },

  async sendMessage(messageId: string): Promise<boolean> {
    console.log(`Sending message with ID: ${messageId}`);
    
    const success = Math.random() > 0.1;
    
    if (success) {
      console.log(`Message ${messageId} sent successfully`);
    } else {
      console.warn(`Failed to send message ${messageId}`);
    }
    
    return success;
  },

  async getCommunicationMetrics(): Promise<CommunicationMetrics> {
    return {
      total_messages_sent: 1250,
      delivery_rate: 0.98,
      open_rate: 0.62,
      reply_rate: 0.15,
      average_response_time_hours: 4.5,
      positive_feedback_rate: 0.85,
      cost_per_message: 0.05,
      channel_performance: {
        email: 0.7,
        linkedin: 0.2,
        sms: 0.1
      },
      template_performance: {
        'Initial Outreach v1': 0.6,
        'Follow Up v2': 0.3,
        'Assessment Request': 0.1
      },
      campaign_performance: {
        'Summer 2024 Campaign': 0.8,
        'AI Talent Drive': 0.2
      }
    };
  },

  async getPerformanceMetrics(): Promise<CommunicationMetrics> {
    return this.getCommunicationMetrics();
  },

  async getMessageTemplates(): Promise<MessageTemplate[]> {
    return [
      {
        id: 'template_1',
        name: 'Initial Outreach v1',
        type: 'initial_outreach',
        content: "Hi {{candidate.name}}, I came across your profile and was impressed by your background in {{candidate.skills}}. I think you'd be a great fit for our team at {{context.company_name}}.",
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
        usage_count: 320,
        ai_quality_score: 0.85,
        tags: ['initial', 'outreach', 'general'],
        metadata: {
          tone: 'friendly',
          length: 'short'
        }
      },
      {
        id: 'template_2',
        name: 'Follow Up v2',
        type: 'follow_up',
        content: "Hi {{candidate.name}}, just wanted to follow up on my previous message. Are you available for a quick chat about opportunities at {{context.company_name}}?",
        created_at: '2024-01-05T00:00:00Z',
        updated_at: '2024-01-20T00:00:00Z',
        usage_count: 210,
        ai_quality_score: 0.78,
        tags: ['follow_up', 'reminder'],
        metadata: {
          tone: 'assertive',
          length: 'very short'
        }
      }
    ];
  }
};
