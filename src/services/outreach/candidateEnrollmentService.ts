
import { CandidateSequenceStatus } from '@/types/outreach-service';
import { sequenceManagementService } from './sequenceManagementService';

export class CandidateEnrollmentService {
  private candidateStatuses: CandidateSequenceStatus[] = [];

  enrollCandidateInSequence(candidateId: string, sequenceId: string): void {
    const existing = this.candidateStatuses.find(
      status => status.candidate_id === candidateId && status.sequence_id === sequenceId
    );

    if (!existing) {
      const status: CandidateSequenceStatus = {
        candidate_id: candidateId,
        sequence_id: sequenceId,
        current_step: 1,
        status: 'active',
        started_at: new Date().toISOString(),
        responses_received: 0
      };

      this.candidateStatuses.push(status);
      this.scheduleNextStep(candidateId, sequenceId);
    }
  }

  getCandidateStatus(candidateId: string, sequenceId: string): CandidateSequenceStatus | null {
    return this.candidateStatuses.find(
      status => status.candidate_id === candidateId && status.sequence_id === sequenceId
    ) || null;
  }

  moveToNextStep(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    const sequence = sequenceManagementService.getSequence(sequenceId);

    if (!status || !sequence) return;

    const nextStepNumber = status.current_step + 1;
    const nextStep = sequence.steps.find(step => step.step_number === nextStepNumber);

    if (nextStep) {
      status.current_step = nextStepNumber;
      this.scheduleNextStep(candidateId, sequenceId);
    } else {
      status.status = 'completed';
      status.scheduled_next_step = undefined;
    }
  }

  pauseSequenceForCandidate(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    if (status && status.status === 'active') {
      status.status = 'paused';
    }
  }

  resumeSequenceForCandidate(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    if (status && status.status === 'paused') {
      status.status = 'active';
      this.scheduleNextStep(candidateId, sequenceId);
    }
  }

  recordCandidateResponse(candidateId: string, sequenceId: string, responseType: 'positive' | 'negative' | 'neutral'): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    if (status) {
      status.responses_received += 1;
      status.last_interaction = new Date().toISOString();
      
      if (responseType === 'positive') {
        status.status = 'completed';
      } else if (responseType === 'negative') {
        status.status = 'opted_out';
      }
    }
  }

  enrollMultipleCandidates(candidateIds: string[], sequenceId: string): void {
    candidateIds.forEach(candidateId => {
      this.enrollCandidateInSequence(candidateId, sequenceId);
    });
  }

  private scheduleNextStep(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    const sequence = sequenceManagementService.getSequence(sequenceId);

    if (!status || !sequence || status.status !== 'active') return;

    const currentStep = sequence.steps.find(step => step.step_number === status.current_step);
    if (!currentStep) return;

    const nextStepTime = new Date();
    nextStepTime.setDate(nextStepTime.getDate() + currentStep.delay_days);

    status.scheduled_next_step = nextStepTime.toISOString();

    console.log(`Scheduled step ${status.current_step} for candidate ${candidateId} at ${nextStepTime}`);
  }
}

export const candidateEnrollmentService = new CandidateEnrollmentService();
