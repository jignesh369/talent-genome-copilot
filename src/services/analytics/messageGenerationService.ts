import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { enhancedPersonalizationEngine } from './enhancedPersonalizationEngine';
import { automatedCommunicationService } from './automatedCommunicationService';

interface OutreachMessage {
  subject: string;
  body: string;
  quality_score: number;
  recommendations: string[];
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

export const messageGenerationService = {
  async generatePersonalizedMessage(
    candidate: EnhancedCandidate,
    context: Record<string, any> = {}
  ): Promise<OutreachMessage> {
    console.log('Generating personalized message for:', candidate.name);
    
    return await enhancedPersonalizationEngine.generatePersonalizedOutreach(candidate, context);
  },

  async generateMultiChannelMessages(
    candidate: EnhancedCandidate,
    channels: string[] = ['email', 'linkedin']
  ): Promise<Record<string, OutreachMessage>> {
    const messages: Record<string, OutreachMessage> = {};
    
    for (const channel of channels) {
      const context = { channel, tone: this.getChannelTone(channel) };
      messages[channel] = await this.generatePersonalizedMessage(candidate, context);
    }
    
    return messages;
  },

  async generateTemplateBasedMessage(
    candidate: EnhancedCandidate,
    templateContent: string,
    context: Record<string, any> = {}
  ): Promise<string> {
    const template: MessageTemplate = {
      id: 'temp_template',
      name: 'Temporary Template',
      type: 'initial_outreach',
      content: templateContent,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      usage_count: 0,
      ai_quality_score: 0.8,
      tags: ['generated']
    };
    
    return await automatedCommunicationService.generatePersonalizedMessage(
      candidate,
      template,
      context
    );
  },

  getChannelTone(channel: string): string {
    const tones = {
      email: 'professional',
      linkedin: 'networking',
      sms: 'casual',
      phone: 'conversational'
    };
    return tones[channel as keyof typeof tones] || 'professional';
  },

  async optimizeMessageForChannel(
    message: OutreachMessage,
    channel: string
  ): Promise<OutreachMessage> {
    let optimizedBody = message.body;
    
    switch (channel) {
      case 'linkedin':
        optimizedBody = this.optimizeForLinkedIn(message.body);
        break;
      case 'sms':
        optimizedBody = this.optimizeForSMS(message.body);
        break;
      case 'email':
        optimizedBody = this.optimizeForEmail(message.body);
        break;
    }
    
    return {
      ...message,
      body: optimizedBody,
      quality_score: this.recalculateQualityScore(optimizedBody)
    };
  },

  optimizeForLinkedIn(message: string): string {
    // Keep it shorter and more casual for LinkedIn
    return message.length > 200 ? message.substring(0, 197) + '...' : message;
  },

  optimizeForSMS(message: string): string {
    // Much shorter for SMS
    return message.length > 160 ? message.substring(0, 157) + '...' : message;
  },

  optimizeForEmail(message: string): string {
    // Can be longer for email, add professional formatting
    return message;
  },

  recalculateQualityScore(message: string): number {
    let score = 0.5; // Base score
    
    if (message.includes('GitHub') || message.includes('experience')) score += 0.2;
    if (message.length > 50 && message.length < 300) score += 0.2;
    if (message.includes('skill') || message.includes('background')) score += 0.1;
    
    return Math.min(score, 1.0);
  }
};
