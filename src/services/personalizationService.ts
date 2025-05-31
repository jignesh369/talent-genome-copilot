
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { OutreachTemplate, PersonalizedSequence, PersonalizedStep } from '@/types/outreach-sequence';
import { 
  generatePersonalizationVariables,
  generatePersonalizationHighlights,
  calculateQualityScore,
  calculateOverallConfidence,
  estimateSuccessRate,
  generateRecommendationReason
} from '@/utils/personalizationScoring';

export class PersonalizationService {
  private static instance: PersonalizationService;

  static getInstance(): PersonalizationService {
    if (!PersonalizationService.instance) {
      PersonalizationService.instance = new PersonalizationService();
    }
    return PersonalizationService.instance;
  }

  async generatePersonalizedSequence(
    candidate: EnhancedCandidate,
    template: OutreachTemplate
  ): Promise<PersonalizedSequence> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const personalizedSteps: PersonalizedStep[] = template.sequence_steps.map((step) => {
      const personalized = this.personalizeStep(candidate, step);
      return {
        ...step,
        ...personalized
      };
    });

    const confidenceScore = calculateOverallConfidence(personalizedSteps);
    const successRate = estimateSuccessRate(candidate, template, confidenceScore);

    return {
      template_id: template.id,
      candidate_id: candidate.id,
      personalized_steps: personalizedSteps,
      confidence_score: confidenceScore,
      recommendation_reason: generateRecommendationReason(candidate, template),
      estimated_success_rate: successRate
    };
  }

  private personalizeStep(candidate: EnhancedCandidate, step: any) {
    const personalizations = generatePersonalizationVariables(candidate);

    let personalizedContent = step.content_template;
    let personalizedSubject = step.subject_template;

    // Replace template variables
    Object.entries(personalizations).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      personalizedContent = personalizedContent.replace(regex, value);
      if (personalizedSubject) {
        personalizedSubject = personalizedSubject.replace(regex, value);
      }
    });

    const highlights = generatePersonalizationHighlights(candidate, personalizations);
    const qualityScore = calculateQualityScore(personalizedContent, highlights, candidate);

    return {
      personalized_content: personalizedContent,
      personalized_subject: personalizedSubject,
      personalization_highlights: highlights,
      quality_score: qualityScore
    };
  }
}

export const personalizationService = PersonalizationService.getInstance();
