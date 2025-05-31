
import { CandidateInteraction, AvailabilitySignal } from '@/types/enhanced-recruiting';
import { enhancedCandidateService } from '@/services/enhancedCandidateService';
import { useCandidateData } from './useCandidateData';

export const useCandidateActions = () => {
  const { enhancedCandidates, setEnhancedCandidates } = useCandidateData();

  // Add interaction to candidate
  const addInteraction = (candidateId: string, interaction: Omit<CandidateInteraction, 'id'>) => {
    enhancedCandidateService.addInteraction(candidateId, interaction);
    
    // Update local state
    setEnhancedCandidates(prev => prev.map(candidate => {
      if (candidate.id === candidateId) {
        const updatedCandidate = { ...candidate };
        enhancedCandidateService.addInteraction(candidateId, interaction);
        return updatedCandidate;
      }
      return candidate;
    }));
  };

  // Add availability signal
  const addAvailabilitySignal = (candidateId: string, signal: AvailabilitySignal) => {
    setEnhancedCandidates(prev => prev.map(candidate => {
      if (candidate.id === candidateId) {
        const updatedCandidate = { ...candidate };
        updatedCandidate.availability_signals.push(signal);
        enhancedCandidateService.updatePlacementProbability(updatedCandidate);
        return updatedCandidate;
      }
      return candidate;
    }));
  };

  // Move candidate to different pipeline stage
  const moveToStage = (candidateId: string, newStage: string, movedBy: string, reason?: string) => {
    enhancedCandidateService.moveToStage(candidateId, newStage, movedBy, reason);
    
    setEnhancedCandidates(prev => prev.map(candidate => {
      if (candidate.id === candidateId) {
        return { ...candidate, pipeline_stage: newStage };
      }
      return candidate;
    }));
  };

  return {
    addInteraction,
    addAvailabilitySignal,
    moveToStage
  };
};
