
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface CommunicationTemplate {
  id: string;
  name: string;
  type: 'initial_outreach' | 'follow_up' | 'interview_invitation' | 'assessment_request' | 'offer_discussion';
  subject_template: string;
  body_template: string;
  personalization_fields: string[];
  platform: 'email' | 'linkedin' | 'twitter' | 'phone';
  success_rate: number;
  ai_optimized: boolean;
}

interface OutreachMessage {
  id: string;
  candidate_id: string;
  template_id: string;
  platform: string;
  subject: string;
  content: string;
  personalized_content: Record<string, string>;
  sent_at: string;
  status: 'draft' | 'sent' | 'delivered' | 'opened' | 'replied';
  response_received: boolean;
}

class AutomatedCommunicationService {
  private templates: CommunicationTemplate[] = [];
  private sentMessages: OutreachMessage[] = [];

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'initial_outreach_001',
        name: 'AI-Personalized Initial Outreach',
        type: 'initial_outreach',
        subject_template: 'Exciting {role_level} {role_title} opportunity at {company_name}',
        body_template: `Hi {candidate_name},

I came across your impressive work in {specific_skill} and was particularly drawn to your {achievement_highlight}. 

We're building an exceptional team at {company_name} and have a {role_level} {role_title} role that seems perfectly aligned with your background in {relevant_experience}.

What caught my attention:
• {technical_highlight}
• {community_involvement}
• {career_progression}

The role offers:
• {role_benefit_1}
• {role_benefit_2}
• {role_benefit_3}

Would you be open to a brief conversation about this opportunity? I'd love to learn more about your current goals and share how this role could be the next step in your career journey.

Best regards,
{recruiter_name}
{company_name} Talent Team`,
        personalization_fields: [
          'candidate_name', 'specific_skill', 'achievement_highlight', 
          'company_name', 'role_level', 'role_title', 'relevant_experience',
          'technical_highlight', 'community_involvement', 'career_progression',
          'role_benefit_1', 'role_benefit_2', 'role_benefit_3', 'recruiter_name'
        ],
        platform: 'email',
        success_rate: 0.35,
        ai_optimized: true
      },
      {
        id: 'follow_up_001',
        name: 'Smart Follow-up with Value Add',
        type: 'follow_up',
        subject_template: 'Quick follow-up + {value_add_topic}',
        body_template: `Hi {candidate_name},

I wanted to follow up on my previous message about the {role_title} position, but also share something I thought you'd find interesting.

I noticed your recent work in {recent_activity} - that's exactly the kind of innovative thinking we value at {company_name}.

{value_add_content}

If the timing isn't right for a career move, I'd still love to connect and perhaps discuss the exciting developments in {industry_topic}.

Let me know if you'd like to chat!

{recruiter_name}`,
        personalization_fields: [
          'candidate_name', 'role_title', 'recent_activity', 'company_name',
          'value_add_content', 'industry_topic', 'recruiter_name'
        ],
        platform: 'email',
        success_rate: 0.28,
        ai_optimized: true
      },
      {
        id: 'assessment_request_001',
        name: 'Personalized Assessment Invitation',
        type: 'assessment_request',
        subject_template: 'Next step: Custom assessment designed for your background',
        body_template: `Hi {candidate_name},

Thanks for our great conversation about the {role_title} position! I'm excited to move forward with the next step.

I've prepared a customized assessment that focuses on your strengths in {key_skills}. Based on our discussion about {conversation_topic}, I've tailored the questions to be relevant and engaging.

Assessment details:
• Estimated time: {estimated_duration} minutes
• Focus areas: {assessment_focus}
• Format: {assessment_format}

The assessment is designed to showcase your expertise rather than test basic knowledge. You'll have {timeframe} to complete it at your convenience.

Ready to get started? {assessment_link}

Looking forward to seeing your approach to these challenges!

{recruiter_name}`,
        personalization_fields: [
          'candidate_name', 'role_title', 'key_skills', 'conversation_topic',
          'estimated_duration', 'assessment_focus', 'assessment_format',
          'timeframe', 'assessment_link', 'recruiter_name'
        ],
        platform: 'email',
        success_rate: 0.78,
        ai_optimized: true
      }
    ];
  }

  async generatePersonalizedMessage(
    candidate: EnhancedCandidate,
    templateType: CommunicationTemplate['type'],
    customData: Record<string, string> = {}
  ): Promise<OutreachMessage> {
    const template = this.templates.find(t => t.type === templateType);
    if (!template) {
      throw new Error(`Template not found for type: ${templateType}`);
    }

    const personalizationData = await this.generatePersonalizationData(candidate, customData);
    
    const personalizedSubject = this.replaceTemplateVariables(
      template.subject_template, 
      personalizationData
    );
    
    const personalizedContent = this.replaceTemplateVariables(
      template.body_template, 
      personalizationData
    );

    const message: OutreachMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      candidate_id: candidate.id,
      template_id: template.id,
      platform: candidate.preferred_contact_method || template.platform,
      subject: personalizedSubject,
      content: personalizedContent,
      personalized_content: personalizationData,
      sent_at: new Date().toISOString(),
      status: 'draft',
      response_received: false
    };

    return message;
  }

  private async generatePersonalizationData(
    candidate: EnhancedCandidate, 
    customData: Record<string, string>
  ): Promise<Record<string, string>> {
    const osint = candidate.osint_profile;
    
    return {
      candidate_name: candidate.first_name || candidate.name?.split(' ')[0] || 'there',
      specific_skill: candidate.skills[0] || 'technical expertise',
      achievement_highlight: this.extractAchievement(candidate),
      technical_highlight: this.extractTechnicalHighlight(candidate),
      community_involvement: this.extractCommunityInvolvement(candidate),
      career_progression: this.extractCareerProgression(candidate),
      recent_activity: this.extractRecentActivity(candidate),
      value_add_content: this.generateValueAddContent(candidate),
      industry_topic: this.extractIndustryTopic(candidate),
      role_level: this.inferRoleLevel(candidate),
      conversation_topic: 'your innovative approach to problem-solving',
      key_skills: candidate.skills.slice(0, 3).join(', '),
      estimated_duration: '25',
      assessment_focus: candidate.skills.slice(0, 2).join(' and '),
      assessment_format: 'Interactive scenarios and technical questions',
      timeframe: '3 days',
      assessment_link: '[Custom Assessment Portal]',
      recruiter_name: 'Sarah',
      company_name: 'TechCorp',
      role_title: 'Senior Software Engineer',
      role_benefit_1: 'Work on cutting-edge AI/ML projects',
      role_benefit_2: 'Competitive salary + equity package',
      role_benefit_3: 'Flexible remote work options',
      ...customData
    };
  }

  private extractAchievement(candidate: EnhancedCandidate): string {
    if (candidate.osint_profile?.github?.public_repos > 20) {
      return `${candidate.osint_profile.github.public_repos}+ open source projects`;
    }
    if (candidate.technical_depth_score > 8) {
      return 'exceptional technical depth';
    }
    return 'strong technical background';
  }

  private extractTechnicalHighlight(candidate: EnhancedCandidate): string {
    const github = candidate.osint_profile?.github;
    if (github?.contribution_streak > 100) {
      return `${github.contribution_streak}-day contribution streak on GitHub`;
    }
    return `Expertise in ${candidate.skills.slice(0, 2).join(' and ')}`;
  }

  private extractCommunityInvolvement(candidate: EnhancedCandidate): string {
    if (candidate.community_influence_score > 7) {
      return 'Active community leadership and mentoring';
    }
    return 'Engaged in developer communities';
  }

  private extractCareerProgression(candidate: EnhancedCandidate): string {
    return `${candidate.experience_years} years of progressive experience in tech`;
  }

  private extractRecentActivity(candidate: EnhancedCandidate): string {
    return candidate.skills[0] || 'latest technical projects';
  }

  private generateValueAddContent(candidate: EnhancedCandidate): string {
    const topics = [
      'I came across an interesting article about the future of AI development that aligns with your work.',
      'There\'s a fascinating development in the tech space that I thought you\'d appreciate.',
      'I saw some exciting industry news that relates to your area of expertise.'
    ];
    return topics[Math.floor(Math.random() * topics.length)];
  }

  private extractIndustryTopic(candidate: EnhancedCandidate): string {
    const skillBasedTopics = {
      'react': 'modern frontend development',
      'python': 'AI and machine learning',
      'javascript': 'web technology evolution',
      'kubernetes': 'cloud-native development'
    };
    
    const skill = candidate.skills.find(s => 
      Object.keys(skillBasedTopics).some(key => s.toLowerCase().includes(key))
    );
    
    if (skill) {
      const topicKey = Object.keys(skillBasedTopics).find(key => 
        skill.toLowerCase().includes(key)
      );
      return skillBasedTopics[topicKey];
    }
    
    return 'emerging technologies';
  }

  private inferRoleLevel(candidate: EnhancedCandidate): string {
    if (candidate.experience_years >= 7) return 'Senior';
    if (candidate.experience_years >= 3) return 'Mid-level';
    return 'Junior';
  }

  private replaceTemplateVariables(template: string, data: Record<string, string>): string {
    let result = template;
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result.replace(regex, value);
    });
    return result;
  }

  async sendMessage(messageId: string): Promise<boolean> {
    const message = this.sentMessages.find(m => m.id === messageId);
    if (!message) return false;

    // Simulate sending logic
    console.log(`Sending ${message.platform} message to candidate ${message.candidate_id}`);
    console.log(`Subject: ${message.subject}`);
    
    message.status = 'sent';
    
    // Simulate delivery and response
    setTimeout(() => {
      message.status = 'delivered';
      
      // Simulate response with some probability
      if (Math.random() < 0.4) {
        setTimeout(() => {
          message.status = 'replied';
          message.response_received = true;
          console.log(`✅ Candidate ${message.candidate_id} responded to message`);
        }, Math.random() * 2000 + 1000);
      }
    }, 500);

    return true;
  }

  getMessageHistory(candidateId: string): OutreachMessage[] {
    return this.sentMessages.filter(m => m.candidate_id === candidateId);
  }

  getPerformanceMetrics(): {
    total_sent: number;
    response_rate: number;
    platform_performance: Record<string, { sent: number; responses: number; rate: number }>;
  } {
    const totalSent = this.sentMessages.filter(m => m.status === 'sent').length;
    const totalResponses = this.sentMessages.filter(m => m.response_received).length;
    
    const platformStats = this.sentMessages.reduce((acc, message) => {
      if (!acc[message.platform]) {
        acc[message.platform] = { sent: 0, responses: 0, rate: 0 };
      }
      if (message.status === 'sent') {
        acc[message.platform].sent++;
        if (message.response_received) {
          acc[message.platform].responses++;
        }
      }
      return acc;
    }, {} as Record<string, { sent: number; responses: number; rate: number }>);

    // Calculate rates
    Object.keys(platformStats).forEach(platform => {
      const stats = platformStats[platform];
      stats.rate = stats.sent > 0 ? stats.responses / stats.sent : 0;
    });

    return {
      total_sent: totalSent,
      response_rate: totalSent > 0 ? totalResponses / totalSent : 0,
      platform_performance: platformStats
    };
  }
}

export const automatedCommunicationService = new AutomatedCommunicationService();
export type { CommunicationTemplate, OutreachMessage };
