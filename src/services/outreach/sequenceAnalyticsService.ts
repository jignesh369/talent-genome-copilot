
import { SequenceMetrics } from '@/types/outreach-service';
import { sequenceManagementService } from './sequenceManagementService';
import { candidateEnrollmentService } from './candidateEnrollmentService';

export class SequenceAnalyticsService {
  getSequenceMetrics(sequenceId: string): SequenceMetrics | null {
    const sequence = sequenceManagementService.getSequence(sequenceId);
    if (!sequence) return null;

    // In real implementation, this would aggregate from candidateEnrollmentService
    // For now, returning mock data structure
    return {
      total_candidates: 0,
      active_candidates: 0,
      completed_candidates: 0,
      responses_received: 0,
      interviews_scheduled: 0,
      hires_made: 0,
      open_rate: Math.random() * 20 + 60,
      response_rate: Math.random() * 15 + 20,
      conversion_rate: Math.random() * 10 + 10,
      avg_response_time_hours: Math.random() * 48 + 24
    };
  }
}

export const sequenceAnalyticsService = new SequenceAnalyticsService();
