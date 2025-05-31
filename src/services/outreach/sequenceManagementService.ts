
import { OutreachSequence, SequenceMetrics } from '@/types/outreach-service';

export class SequenceManagementService {
  private sequences: OutreachSequence[] = [];

  createSequence(sequenceData: Omit<OutreachSequence, 'id' | 'created_at' | 'updated_at' | 'success_metrics'>): string {
    const sequence: OutreachSequence = {
      ...sequenceData,
      id: Date.now().toString(),
      success_metrics: this.initializeMetrics(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.sequences.push(sequence);
    return sequence.id;
  }

  updateSequence(sequenceId: string, updates: Partial<OutreachSequence>): void {
    const index = this.sequences.findIndex(s => s.id === sequenceId);
    if (index !== -1) {
      this.sequences[index] = {
        ...this.sequences[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
    }
  }

  getSequence(sequenceId: string): OutreachSequence | null {
    return this.sequences.find(s => s.id === sequenceId) || null;
  }

  getAllSequences(): OutreachSequence[] {
    return this.sequences;
  }

  private initializeMetrics(): SequenceMetrics {
    return {
      total_candidates: 0,
      active_candidates: 0,
      completed_candidates: 0,
      responses_received: 0,
      interviews_scheduled: 0,
      hires_made: 0,
      open_rate: 0,
      response_rate: 0,
      conversion_rate: 0,
      avg_response_time_hours: 0
    };
  }
}

export const sequenceManagementService = new SequenceManagementService();
