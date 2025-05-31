
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { OutreachSequence, CandidateSequenceStatus, SequenceMetrics, PersonalizationData } from '@/types/outreach-service';
import { sequenceManagementService } from './outreach/sequenceManagementService';
import { candidateEnrollmentService } from './outreach/candidateEnrollmentService';
import { outreachPersonalizationService } from './outreach/outreachPersonalizationService';
import { sequenceExecutionService } from './outreach/sequenceExecutionService';
import { sequenceAnalyticsService } from './outreach/sequenceAnalyticsService';

class OutreachSequenceService {
  // Sequence Management
  createSequence(sequenceData: Omit<OutreachSequence, 'id' | 'created_at' | 'updated_at' | 'success_metrics'>): string {
    return sequenceManagementService.createSequence(sequenceData);
  }

  updateSequence(sequenceId: string, updates: Partial<OutreachSequence>): void {
    sequenceManagementService.updateSequence(sequenceId, updates);
  }

  getSequence(sequenceId: string): OutreachSequence | null {
    return sequenceManagementService.getSequence(sequenceId);
  }

  getAllSequences(): OutreachSequence[] {
    return sequenceManagementService.getAllSequences();
  }

  // Candidate Enrollment
  enrollCandidateInSequence(candidateId: string, sequenceId: string): void {
    candidateEnrollmentService.enrollCandidateInSequence(candidateId, sequenceId);
  }

  enrollMultipleCandidates(candidateIds: string[], sequenceId: string): void {
    candidateEnrollmentService.enrollMultipleCandidates(candidateIds, sequenceId);
  }

  pauseSequenceForCandidate(candidateId: string, sequenceId: string): void {
    candidateEnrollmentService.pauseSequenceForCandidate(candidateId, sequenceId);
  }

  resumeSequenceForCandidate(candidateId: string, sequenceId: string): void {
    candidateEnrollmentService.resumeSequenceForCandidate(candidateId, sequenceId);
  }

  getCandidateStatus(candidateId: string, sequenceId: string): CandidateSequenceStatus | null {
    return candidateEnrollmentService.getCandidateStatus(candidateId, sequenceId);
  }

  recordCandidateResponse(candidateId: string, sequenceId: string, responseType: 'positive' | 'negative' | 'neutral'): void {
    candidateEnrollmentService.recordCandidateResponse(candidateId, sequenceId, responseType);
  }

  // Sequence Execution
  executeSequenceStep(candidateId: string, sequenceId: string): void {
    sequenceExecutionService.executeSequenceStep(candidateId, sequenceId);
  }

  // Personalization Engine
  async generatePersonalizationData(candidate: EnhancedCandidate): Promise<PersonalizationData> {
    return outreachPersonalizationService.generatePersonalizationData(candidate);
  }

  // Analytics and Reporting
  getSequenceMetrics(sequenceId: string): SequenceMetrics | null {
    return sequenceAnalyticsService.getSequenceMetrics(sequenceId);
  }
}

export const outreachSequenceService = new OutreachSequenceService();
