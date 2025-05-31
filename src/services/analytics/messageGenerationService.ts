
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { enhancedPersonalizationEngine } from './enhancedPersonalizationEngine';
import { automatedCommunicationService, OutreachMessage } from './automatedCommunicationService';

interface MessageGenerationRequest {
  candidate: EnhancedCandidate;
  message_type: 'initial_outreach' | 'follow_up' | 'assessment_request';
  context: {
    company_name: string;
    role_title: string;
    recruiter_name: string;
    role_benefits?: string[];
    urgency_level?: 'low' | 'medium' | 'high';
  };
}

interface GeneratedMessage {
  message: OutreachMessage;
  personalization_data: any;
  quality_score: number;
  recommendations: string[];
}

export class MessageGenerationService {
  async generatePersonalizedMessage(request: MessageGenerationRequest): Promise<GeneratedMessage> {
    console.log('Generating personalized message for:', request.candidate.name);

    // Generate enhanced personalization
    const personalizationData = await enhancedPersonalizationEngine.generateEnhancedPersonalization(
      request.candidate,
      request.context
    );

    // Prepare custom data for message generation
    const customData: Record<string, string> = {
      company_name: request.context.company_name,
      role_title: request.context.role_title,
      recruiter_name: request.context.recruiter_name,
      candidate_name: personalizationData.candidate_name,
      personalized_greeting: personalizationData.personalized_greeting,
      technical_highlight: personalizationData.technical_highlights.join(', '),
      career_story_hook: personalizationData.career_story_hook,
      value_add_content: personalizationData.value_propositions.join('\n• '),
      call_to_action: personalizationData.call_to_action,
      optimal_channel: personalizationData.preferred_channel,
      role_benefits: request.context.role_benefits ? request.context.role_benefits.join(', ') : '',
      urgency_level: request.context.urgency_level || 'medium'
    };

    // Generate the message
    const message = await automatedCommunicationService.generatePersonalizedMessage(
      request.candidate,
      request.message_type,
      customData
    );

    // Calculate quality score
    const qualityScore = this.calculateMessageQuality(personalizationData, message);

    // Generate recommendations
    const recommendations = this.generateOptimizationRecommendations(
      personalizationData,
      qualityScore
    );

    return {
      message,
      personalization_data: personalizationData,
      quality_score: qualityScore,
      recommendations
    };
  }

  private calculateMessageQuality(personalizationData: any, message: OutreachMessage): number {
    let score = 0;

    // Personalization depth (40%)
    const personalizationScore = personalizationData.personalization_score.overall_score;
    score += personalizationScore * 0.4;

    // Message length appropriateness (20%)
    const messageLength = message.content.length;
    const lengthScore = messageLength >= 200 && messageLength <= 800 ? 1 : 0.7;
    score += lengthScore * 0.2;

    // Technical relevance (20%)
    const technicalScore = personalizationData.personalization_score.technical_relevance;
    score += technicalScore * 0.2;

    // Call-to-action clarity (20%)
    const ctaScore = message.content.includes('?') ? 1 : 0.8;
    score += ctaScore * 0.2;

    return Math.min(score, 1);
  }

  private generateOptimizationRecommendations(
    personalizationData: any,
    qualityScore: number
  ): string[] {
    const recommendations = [];

    if (qualityScore < 0.7) {
      recommendations.push('Consider adding more specific technical achievements');
    }

    if (personalizationData.personalization_score.technical_relevance < 0.6) {
      recommendations.push('Highlight more relevant technical skills match');
    }

    if (personalizationData.personalization_score.cultural_fit < 0.7) {
      recommendations.push('Emphasize company culture alignment');
    }

    if (personalizationData.preferred_channel !== 'email') {
      recommendations.push(`Consider reaching out via ${personalizationData.preferred_channel} for better response rates`);
    }

    return recommendations;
  }
}

export const messageGenerationService = new MessageGenerationService();
