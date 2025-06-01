import { EnhancedCandidate } from '@/types/enhanced-candidate';

export class MessageGenerationService {
  async generatePersonalizedMessage(request: any): Promise<{
    body: string;
    quality_score: number;
    recommendations: string[];
  }> {
    const candidate = request.candidate || request;
    const messageType = request.message_type || 'initial_outreach';
    const context = request.context || {};

    const variables = {
      candidate_name: candidate.name,
      current_title: candidate.current_title || 'Professional',
      current_company: candidate.current_company || 'their current role',
      top_skills: candidate.skills?.slice(0, 3).join(', ') || 'technical skills',
      company_name: context.company_name || 'TechCorp',
      role_title: context.role_title || 'Senior Software Engineer',
      recruiter_name: context.recruiter_name || 'Sarah'
    };

    let messageBody = '';
    
    if (messageType === 'initial_outreach') {
      messageBody = `Hi ${variables.candidate_name},

I hope this message finds you well. I'm ${variables.recruiter_name} from ${variables.company_name}, and I came across your profile while looking for talented professionals.

Your experience as a ${variables.current_title} at ${variables.current_company}, particularly your expertise in ${variables.top_skills}, caught my attention. We have an exciting ${variables.role_title} opportunity that I believe could be a great fit for your background.

Would you be open to a brief conversation about this role? I'd love to share more details about how your skills could contribute to our team's success.

Best regards,
${variables.recruiter_name}`;
    } else if (messageType === 'follow_up') {
      messageBody = `Hi ${variables.candidate_name},

I wanted to follow up on my previous message about the ${variables.role_title} position at ${variables.company_name}. 

Given your strong background in ${variables.top_skills}, I believe this opportunity could be an excellent next step in your career.

Are you available for a quick 15-minute call this week to discuss?

Best,
${variables.recruiter_name}`;
    } else {
      messageBody = `Hi ${variables.candidate_name},

Thank you for your interest in the ${variables.role_title} position. I'd like to invite you to complete a brief assessment that will help us better understand your technical background.

The assessment should take about 30 minutes and covers areas related to ${variables.top_skills}.

Please let me know if you have any questions.

Best regards,
${variables.recruiter_name}`;
    }

    return {
      body: messageBody,
      quality_score: 0.8,
      recommendations: [
        'Consider personalizing further based on recent activity',
        'Add specific project examples if available'
      ]
    };
  }

  async generateBulkMessages(candidates: any[], templateType: string, context: any): Promise<any[]> {
    return Promise.all(
      candidates.map(candidate => 
        this.generatePersonalizedMessage({
          candidate,
          message_type: templateType,
          context
        })
      )
    );
  }
}

export const messageGenerationService = new MessageGenerationService();
