
import { OutreachTemplate, SequenceRecommendation } from '@/types/outreach-sequence';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const PRESET_TEMPLATES: OutreachTemplate[] = [
  {
    id: 'quick_connect',
    name: 'Quick Connect',
    description: 'Fast-track engagement for high-intent candidates',
    steps: 2,
    duration_days: 3,
    target_audience: ['Active job seekers', 'Referrals', 'Warm leads'],
    success_rate: 78,
    recommended_for: ['active_candidates', 'high_match_score', 'referrals'],
    sequence_steps: [
      {
        step_number: 1,
        channel: 'email',
        delay_days: 0,
        subject_template: 'Quick opportunity at {{company_name}} - {{role_title}}',
        content_template: 'Hi {{candidate_name}},\n\nI noticed your impressive background in {{top_skills}} and thought you\'d be interested in an exciting {{role_title}} opportunity at {{company_name}}.\n\nWe\'re looking for someone with your expertise to {{role_description}}. The role offers {{key_benefits}}.\n\nWould you be open to a quick 15-minute conversation this week?\n\nBest regards,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'top_skills', 'company_name', 'role_title', 'role_description', 'key_benefits', 'recruiter_name'],
        tone: 'professional'
      },
      {
        step_number: 2,
        channel: 'email',
        delay_days: 3,
        subject_template: 'Following up on {{company_name}} opportunity',
        content_template: 'Hi {{candidate_name}},\n\nI wanted to follow up on the {{role_title}} opportunity I mentioned. I noticed your work on {{recent_project}} - it aligns perfectly with what we\'re building.\n\nI\'d love to share more details about how your {{expertise_area}} experience could make a real impact here.\n\nAre you available for a brief chat?\n\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'role_title', 'recent_project', 'expertise_area', 'recruiter_name'],
        tone: 'casual'
      }
    ]
  },
  {
    id: 'professional_nurture',
    name: 'Professional Nurture',
    description: 'Strategic engagement for passive, high-value candidates',
    steps: 4,
    duration_days: 14,
    target_audience: ['Passive candidates', 'Senior professionals', 'Strategic hires'],
    success_rate: 65,
    recommended_for: ['passive_candidates', 'senior_roles', 'high_technical_score'],
    sequence_steps: [
      {
        step_number: 1,
        channel: 'linkedin',
        delay_days: 0,
        content_template: 'Hi {{candidate_name}},\n\nI\'ve been following your work in {{industry_area}} and was particularly impressed by {{recent_achievement}}. Your expertise in {{technical_skills}} is exactly what innovative companies are looking for.\n\nI work with {{company_name}}, and we\'re building something exciting in the {{domain_area}} space. Would love to share some insights about where the industry is heading.\n\nWorth a conversation?',
        personalization_variables: ['candidate_name', 'industry_area', 'recent_achievement', 'technical_skills', 'company_name', 'domain_area'],
        tone: 'professional'
      },
      {
        step_number: 2,
        channel: 'email',
        delay_days: 3,
        subject_template: 'Industry insights + opportunity at {{company_name}}',
        content_template: 'Hi {{candidate_name}},\n\nFollowing up on my LinkedIn message. I thought you might find this industry report interesting: {{industry_insight}}.\n\nIt ties directly to what we\'re building at {{company_name}} - a {{product_description}} that could benefit from your {{expertise_area}} background.\n\nI\'d love to share more about the technical challenges we\'re solving.\n\nBest,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'industry_insight', 'company_name', 'product_description', 'expertise_area', 'recruiter_name'],
        tone: 'professional'
      },
      {
        step_number: 3,
        channel: 'email',
        delay_days: 7,
        subject_template: 'Question about {{technical_area}}',
        content_template: 'Hi {{candidate_name}},\n\nI have a technical question that I thought you might have insights on: {{technical_question}}\n\nGiven your experience with {{technical_background}}, I\'d value your perspective.\n\nAlso, I\'d love to tell you about the {{role_title}} role we have open - it involves solving exactly these kinds of challenges.\n\nThanks,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'technical_area', 'technical_question', 'technical_background', 'role_title', 'recruiter_name'],
        tone: 'technical'
      },
      {
        step_number: 4,
        channel: 'email',
        delay_days: 14,
        subject_template: 'Final thoughts on {{company_name}} opportunity',
        content_template: 'Hi {{candidate_name}},\n\nI wanted to reach out one last time about the opportunity at {{company_name}}. We\'re specifically looking for someone with your {{unique_qualification}} to lead {{key_responsibility}}.\n\nThe role offers:\n• {{benefit_1}}\n• {{benefit_2}}\n• {{benefit_3}}\n\nIf you\'re not interested now, I completely understand. But if you ever want to explore new challenges, I\'d love to stay in touch.\n\nBest regards,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'company_name', 'unique_qualification', 'key_responsibility', 'benefit_1', 'benefit_2', 'benefit_3', 'recruiter_name'],
        tone: 'professional'
      }
    ]
  },
  {
    id: 'technical_deep_dive',
    name: 'Technical Deep Dive',
    description: 'Engineering-focused sequence for technical roles',
    steps: 5,
    duration_days: 21,
    target_audience: ['Senior engineers', 'Tech leads', 'Specialized roles'],
    success_rate: 72,
    recommended_for: ['technical_roles', 'high_technical_depth', 'github_activity'],
    sequence_steps: [
      {
        step_number: 1,
        channel: 'email',
        delay_days: 0,
        subject_template: 'Impressive work on {{project_name}}',
        content_template: 'Hi {{candidate_name}},\n\nI came across your {{project_name}} project and was blown away by {{technical_highlight}}. The way you handled {{technical_challenge}} shows real engineering excellence.\n\nI\'m {{recruiter_name}} from {{company_name}}, and we\'re working on similar challenges in {{technical_domain}}. I think you\'d find our technical stack interesting: {{tech_stack}}.\n\nWould you be open to a technical discussion?\n\nBest,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'project_name', 'technical_highlight', 'technical_challenge', 'recruiter_name', 'company_name', 'technical_domain', 'tech_stack'],
        tone: 'technical'
      },
      {
        step_number: 2,
        channel: 'email',
        delay_days: 4,
        subject_template: 'Technical challenge discussion',
        content_template: 'Hi {{candidate_name}},\n\nI wanted to share a technical challenge we\'re currently solving: {{current_challenge}}. Given your experience with {{relevant_experience}}, I\'d love your thoughts.\n\nWe\'re also exploring {{new_technology}} - have you had any experience with it?\n\nThe {{role_title}} position involves exactly these kinds of architectural decisions.\n\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'current_challenge', 'relevant_experience', 'new_technology', 'role_title', 'recruiter_name'],
        tone: 'technical'
      },
      {
        step_number: 3,
        channel: 'email',
        delay_days: 8,
        subject_template: 'Architecture walkthrough invitation',
        content_template: 'Hi {{candidate_name}},\n\nWould you be interested in a technical walkthrough of our architecture? We\'re building {{system_description}} using {{architecture_approach}}.\n\nI think you\'d appreciate the engineering challenges we\'re solving, especially around {{specific_challenge}}.\n\nNo pressure - just thought you might find it interesting from a technical perspective.\n\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'system_description', 'architecture_approach', 'specific_challenge', 'recruiter_name'],
        tone: 'technical'
      },
      {
        step_number: 4,
        channel: 'email',
        delay_days: 14,
        subject_template: 'Meet the engineering team',
        content_template: 'Hi {{candidate_name}},\n\nI\'d love to introduce you to {{tech_lead_name}}, our tech lead. They\'ve been following your work on {{technical_area}} and would enjoy a technical conversation.\n\nOur team culture is very much about {{team_culture}} and {{engineering_values}}.\n\nWould you be interested in a casual coffee chat?\n\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'tech_lead_name', 'technical_area', 'team_culture', 'engineering_values', 'recruiter_name'],
        tone: 'casual'
      },
      {
        step_number: 5,
        channel: 'email',
        delay_days: 21,
        subject_template: 'Comprehensive opportunity discussion',
        content_template: 'Hi {{candidate_name}},\n\nI wanted to reach out one final time with a comprehensive overview of what we\'re building at {{company_name}}.\n\nThe {{role_title}} role would involve:\n• {{responsibility_1}}\n• {{responsibility_2}}\n• {{responsibility_3}}\n\nTechnical growth opportunities:\n• {{growth_1}}\n• {{growth_2}}\n\nIf you\'re ever interested in exploring new technical challenges, I\'d love to continue our conversation.\n\nBest regards,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'company_name', 'role_title', 'responsibility_1', 'responsibility_2', 'responsibility_3', 'growth_1', 'growth_2', 'recruiter_name'],
        tone: 'professional'
      }
    ]
  },
  {
    id: 'executive_engagement',
    name: 'Executive Engagement',
    description: 'High-level approach for senior leadership roles',
    steps: 3,
    duration_days: 10,
    target_audience: ['C-level executives', 'VPs', 'Senior directors'],
    success_rate: 58,
    recommended_for: ['executive_roles', 'senior_experience', 'leadership_background'],
    sequence_steps: [
      {
        step_number: 1,
        channel: 'email',
        delay_days: 0,
        subject_template: 'Strategic leadership opportunity at {{company_name}}',
        content_template: 'Dear {{candidate_name}},\n\nI hope this message finds you well. I\'m reaching out regarding a strategic {{role_title}} opportunity at {{company_name}}.\n\nGiven your impressive track record in {{leadership_area}}, particularly your success with {{notable_achievement}}, I believe you\'d be interested in our vision for {{strategic_initiative}}.\n\nWe\'re at an inflection point where strong leadership in {{domain_expertise}} could drive significant impact.\n\nWould you be open to a strategic conversation?\n\nBest regards,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'role_title', 'company_name', 'leadership_area', 'notable_achievement', 'strategic_initiative', 'domain_expertise', 'recruiter_name'],
        tone: 'executive'
      },
      {
        step_number: 2,
        channel: 'email',
        delay_days: 5,
        subject_template: 'Strategic vision alignment - {{company_name}}',
        content_template: 'Dear {{candidate_name}},\n\nFollowing up on our opportunity discussion. I wanted to share more about our strategic direction and how the {{role_title}} position fits into our growth plans.\n\nKey strategic priorities:\n• {{priority_1}}\n• {{priority_2}}\n• {{priority_3}}\n\nYour experience with {{relevant_experience}} aligns perfectly with our needs.\n\nI\'d value your perspective on these challenges.\n\nRegards,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'role_title', 'company_name', 'priority_1', 'priority_2', 'priority_3', 'relevant_experience', 'recruiter_name'],
        tone: 'executive'
      },
      {
        step_number: 3,
        channel: 'email',
        delay_days: 10,
        subject_template: 'Direct meeting invitation',
        content_template: 'Dear {{candidate_name}},\n\nI\'d like to extend a direct invitation to meet with our {{executive_title}} to discuss the {{role_title}} opportunity in detail.\n\nThis role offers:\n• {{strategic_impact}}\n• {{growth_opportunity}}\n• {{executive_benefits}}\n\nGiven your background and our strategic needs, I believe this could be a transformative opportunity for both parties.\n\nWould you be available for a meeting in the coming weeks?\n\nBest regards,\n{{recruiter_name}}',
        personalization_variables: ['candidate_name', 'executive_title', 'role_title', 'strategic_impact', 'growth_opportunity', 'executive_benefits', 'recruiter_name'],
        tone: 'executive'
      }
    ]
  }
];

export class OutreachTemplateService {
  static getRecommendedTemplates(candidate: EnhancedCandidate): SequenceRecommendation[] {
    const recommendations: SequenceRecommendation[] = [];

    PRESET_TEMPLATES.forEach(template => {
      const confidence = this.calculateTemplateConfidence(candidate, template);
      const reasoning = this.generateReasoning(candidate, template);
      const predictedSuccessRate = this.predictSuccessRate(candidate, template);

      if (confidence > 0.3) { // Only recommend if confidence is above threshold
        recommendations.push({
          template,
          confidence,
          reasoning,
          predicted_success_rate: predictedSuccessRate
        });
      }
    });

    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  }

  private static calculateTemplateConfidence(candidate: EnhancedCandidate, template: OutreachTemplate): number {
    let confidence = 0;

    // Check availability status
    if (candidate.availability_status === 'active' && template.recommended_for.includes('active_candidates')) {
      confidence += 0.3;
    }
    if (candidate.availability_status === 'passive' && template.recommended_for.includes('passive_candidates')) {
      confidence += 0.3;
    }

    // Check match score
    if (candidate.match_score >= 90 && template.recommended_for.includes('high_match_score')) {
      confidence += 0.2;
    }

    // Check technical depth
    if (candidate.technical_depth_score >= 8 && template.recommended_for.includes('high_technical_depth')) {
      confidence += 0.2;
    }

    // Check experience level
    if (candidate.experience_years >= 8 && template.recommended_for.includes('senior_roles')) {
      confidence += 0.2;
    }

    // Check for technical roles
    if (candidate.current_title?.toLowerCase().includes('engineer') && template.recommended_for.includes('technical_roles')) {
      confidence += 0.2;
    }

    // Check for executive roles
    if ((candidate.current_title?.toLowerCase().includes('director') || 
         candidate.current_title?.toLowerCase().includes('vp') ||
         candidate.current_title?.toLowerCase().includes('cto')) && 
        template.recommended_for.includes('executive_roles')) {
      confidence += 0.3;
    }

    return Math.min(confidence, 1);
  }

  private static generateReasoning(candidate: EnhancedCandidate, template: OutreachTemplate): string[] {
    const reasons = [];

    if (candidate.availability_status === 'active') {
      reasons.push(`Candidate is actively job searching - ${template.name} approach is effective for engaged candidates`);
    }

    if (candidate.match_score >= 85) {
      reasons.push(`High match score (${candidate.match_score}%) indicates strong role alignment`);
    }

    if (candidate.technical_depth_score >= 8) {
      reasons.push(`Strong technical background suits ${template.name} messaging`);
    }

    if (candidate.experience_years >= 10) {
      reasons.push(`Senior experience level aligns with ${template.name} tone and approach`);
    }

    return reasons;
  }

  private static predictSuccessRate(candidate: EnhancedCandidate, template: OutreachTemplate): number {
    let baseRate = template.success_rate;
    
    // Adjust based on candidate factors
    if (candidate.availability_status === 'active') baseRate += 10;
    if (candidate.match_score >= 90) baseRate += 5;
    if (candidate.community_influence_score >= 8) baseRate -= 3; // High-influence candidates get more outreach
    
    return Math.min(Math.max(baseRate, 20), 95);
  }
}
