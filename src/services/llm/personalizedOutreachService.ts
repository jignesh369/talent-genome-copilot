import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { supabase } from '@/integrations/supabase/client';

export interface PersonalizedMessage {
  subject_line: string;
  message_body: string;
  personalization_elements: string[];
  follow_up_suggestions: string[];
  optimal_send_time: string;
}

export class PersonalizedOutreachService {
  async generatePersonalizedMessage(
    candidate: EnhancedCandidate,
    messageType: 'initial_outreach' | 'follow_up' | 'assessment_request',
    context: {
      role_title?: string;
      company_name?: string;
      recruiter_name?: string;
      tone?: 'professional' | 'casual' | 'technical';
    } = {}
  ): Promise<PersonalizedMessage> {
    console.log('Generating AI-powered personalized outreach for:', candidate.name);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'generate_outreach',
          data: { candidate, messageType, context }
        }
      });

      if (error) {
        console.error('Error calling AI function:', error);
        return this.getFallbackMessage(candidate, messageType, context);
      }

      return data;
    } catch (error) {
      console.error('Failed to generate personalized outreach:', error);
      return this.getFallbackMessage(candidate, messageType, context);
    }
  }

  private getFallbackMessage(
    candidate: EnhancedCandidate,
    messageType: string,
    context: any
  ): PersonalizedMessage {
    const personalizationElements = this.identifyPersonalizationElements(candidate);
    
    return {
      subject_line: this.generateSubjectLine(candidate, messageType, context),
      message_body: this.generateMessageBody(candidate, messageType, context, personalizationElements),
      personalization_elements: personalizationElements,
      follow_up_suggestions: this.generateFollowUpSuggestions(messageType),
      optimal_send_time: this.calculateOptimalSendTime(candidate)
    };
  }

  private identifyPersonalizationElements(candidate: EnhancedCandidate): string[] {
    const elements = [];
    
    // GitHub activity personalization
    if (candidate.osint_profile?.github) {
      const github = candidate.osint_profile.github;
      if (github.repos && github.repos > 20) {
        elements.push(`Impressive ${github.repos} repositories on GitHub`);
      }
      if (github.stars && github.stars > 100) {
        elements.push(`${github.stars} stars earned for open source contributions`);
      }
    }
    
    // Technical expertise
    if (candidate.skills && candidate.skills.length > 0) {
      elements.push(`Expertise in ${candidate.skills.slice(0, 3).join(', ')}`);
    }
    
    // Career progression
    if (candidate.experience_years > 5) {
      elements.push(`${candidate.experience_years} years of professional experience`);
    }
    
    // Current role
    if (candidate.current_title && candidate.current_company) {
      elements.push(`Current ${candidate.current_title} role at ${candidate.current_company}`);
    }
    
    // Community engagement
    if ((candidate.community_influence_score || 0) > 7) {
      elements.push('Strong community engagement and thought leadership');
    }
    
    return elements;
  }

  private determineTone(candidate: EnhancedCandidate): 'professional' | 'casual' | 'technical' {
    if (candidate.current_title?.toLowerCase().includes('senior') || candidate.experience_years > 8) {
      return 'professional';
    }
    
    if ((candidate.community_influence_score || 0) > 8) {
      return 'technical';
    }
    
    return 'casual';
  }

  private generateSubjectLine(
    candidate: EnhancedCandidate,
    messageType: string,
    context: any
  ): string {
    const firstName = candidate.name.split(' ')[0];
    const roleName = context.role_title || 'Senior Developer';
    const companyName = context.company_name || 'our company';
    
    switch (messageType) {
      case 'initial_outreach':
        if (candidate.skills && candidate.skills.length > 0) {
          return `${firstName}, ${candidate.skills[0]} opportunity at ${companyName}`;
        }
        return `${firstName}, exciting ${roleName} role you might find interesting`;
        
      case 'follow_up':
        return `Following up on ${roleName} opportunity - ${firstName}`;
        
      case 'assessment_request':
        return `Next steps for ${roleName} position - ${firstName}`;
        
      default:
        return `${firstName}, opportunity at ${companyName}`;
    }
  }

  private generateMessageBody(
    candidate: EnhancedCandidate,
    messageType: string,
    context: any,
    personalizationElements: string[]
  ): string {
    const firstName = candidate.name.split(' ')[0];
    const recruiterName = context.recruiter_name || 'Sarah';
    const companyName = context.company_name || 'TechCorp';
    const roleName = context.role_title || 'Senior Developer';
    
    let opening = `Hi ${firstName},`;
    let coreMessage = '';
    let closing = `Best regards,\n${recruiterName}`;
    
    // Generate personalized core message based on available elements
    if (personalizationElements.length > 0) {
      const primaryPersonalization = personalizationElements[0];
      coreMessage = `I came across your profile and was impressed by your ${primaryPersonalization.toLowerCase()}. `;
      
      if (personalizationElements.length > 1) {
        coreMessage += `Your ${personalizationElements[1].toLowerCase()} particularly caught my attention. `;
      }
    } else {
      coreMessage = `I came across your profile and was impressed by your background in ${candidate.skills?.[0] || 'software development'}. `;
    }
    
    // Add role-specific content
    switch (messageType) {
      case 'initial_outreach':
        coreMessage += `We have an exciting ${roleName} opportunity at ${companyName} that aligns perfectly with your expertise. `;
        coreMessage += `I'd love to share more details about how this role could be a great next step in your career.`;
        break;
        
      case 'follow_up':
        coreMessage += `I wanted to follow up on the ${roleName} opportunity I mentioned earlier. `;
        coreMessage += `I believe this role offers excellent growth potential and would be a perfect match for your skills.`;
        break;
        
      case 'assessment_request':
        coreMessage += `Thank you for your interest in the ${roleName} position at ${companyName}. `;
        coreMessage += `I'd like to invite you to complete a brief technical assessment as the next step in our process.`;
        break;
    }
    
    return `${opening}\n\n${coreMessage}\n\n${closing}`;
  }

  private generateFollowUpSuggestions(messageType: string): string[] {
    switch (messageType) {
      case 'initial_outreach':
        return [
          'Schedule a 15-minute introductory call',
          'Send additional role details if interested',
          'Connect on LinkedIn for future opportunities'
        ];
        
      case 'follow_up':
        return [
          'Provide more specific role requirements',
          'Schedule technical discussion',
          'Share team information and culture'
        ];
        
      case 'assessment_request':
        return [
          'Send assessment link and instructions',
          'Schedule time for questions about the assessment',
          'Provide timeline for next steps'
        ];
        
      default:
        return ['Schedule a call to discuss further'];
    }
  }

  private calculateOptimalSendTime(candidate: EnhancedCandidate): string {
    // Mock optimal timing based on candidate profile
    // In production, this would analyze their activity patterns
    
    const timezone = this.inferTimezone(candidate.location);
    
    // Generally good times: Tuesday-Thursday, 10 AM - 2 PM in their timezone
    const optimalTimes = [
      'Tuesday 10:00 AM',
      'Tuesday 2:00 PM',
      'Wednesday 10:00 AM',
      'Wednesday 1:00 PM',
      'Thursday 10:00 AM',
      'Thursday 11:00 AM'
    ];
    
    const randomTime = optimalTimes[Math.floor(Math.random() * optimalTimes.length)];
    return `${randomTime} ${timezone}`;
  }

  private inferTimezone(location?: string): string {
    if (!location) return 'EST';
    
    const lowercaseLocation = location.toLowerCase();
    
    if (lowercaseLocation.includes('san francisco') || lowercaseLocation.includes('seattle')) {
      return 'PST';
    }
    if (lowercaseLocation.includes('new york') || lowercaseLocation.includes('boston')) {
      return 'EST';
    }
    if (lowercaseLocation.includes('chicago') || lowercaseLocation.includes('austin')) {
      return 'CST';
    }
    
    return 'EST';
  }
}

export const personalizedOutreachService = new PersonalizedOutreachService();
