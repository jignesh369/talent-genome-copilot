
import { SequenceStep } from '@/types/outreach-service';
import { sequenceManagementService } from './sequenceManagementService';
import { candidateEnrollmentService } from './candidateEnrollmentService';
import { outreachPersonalizationService } from './outreachPersonalizationService';

export class SequenceExecutionService {
  executeSequenceStep(candidateId: string, sequenceId: string): void {
    const status = candidateEnrollmentService.getCandidateStatus(candidateId, sequenceId);
    const sequence = sequenceManagementService.getSequence(sequenceId);

    if (!status || !sequence || status.status !== 'active') return;

    const currentStep = sequence.steps.find(step => step.step_number === status.current_step);
    if (!currentStep) return;

    const personalizedContent = this.generatePersonalizedMessage(candidateId, currentStep);

    this.sendMessage(candidateId, currentStep.type, personalizedContent);

    status.last_interaction = new Date().toISOString();
    
    candidateEnrollmentService.moveToNextStep(candidateId, sequenceId);
  }

  private generatePersonalizedMessage(candidateId: string, step: SequenceStep): string {
    // Simple template replacement - in real implementation would use personalization data
    let content = step.content_template;
    const replacements = {
      '{{candidate_name}}': 'John',
      '{{current_title}}': 'Senior Developer',
      '{{skills}}': 'React, TypeScript, Node.js',
      '{{company_name}}': 'TechCorp'
    };

    Object.entries(replacements).forEach(([key, value]) => {
      content = content.replace(new RegExp(key, 'g'), value);
    });

    return content;
  }

  private sendMessage(candidateId: string, type: string, content: string): void {
    console.log(`Sending ${type} message to candidate ${candidateId}:`, content);
    // In real implementation, this would integrate with email/LinkedIn APIs
  }
}

export const sequenceExecutionService = new SequenceExecutionService();
