
import { useState, useEffect } from 'react';
import { EnhancedCandidate, CandidateInteraction, AvailabilitySignal } from '@/types/enhanced-recruiting';
import { enhancedCandidateService } from '@/services/enhancedCandidateService';
import { useCandidates } from './useCandidates';
import { useToast } from '@/hooks/use-toast';

export const useCandidateStore = () => {
  const { candidates: basicCandidates, loading: basicLoading } = useCandidates();
  const [enhancedCandidates, setEnhancedCandidates] = useState<EnhancedCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const { toast } = useToast();

  // Convert basic candidates to enhanced candidates
  useEffect(() => {
    if (!basicLoading && basicCandidates.length > 0) {
      const enhanced = basicCandidates.map(candidate => 
        enhancedCandidateService.enhanceCandidate(candidate)
      );
      setEnhancedCandidates(enhanced);
      setLoading(false);
    }
  }, [basicCandidates, basicLoading]);

  const addInteraction = (candidateId: string, interaction: Omit<CandidateInteraction, 'id'>) => {
    try {
      enhancedCandidateService.addInteraction(candidateId, interaction);
      
      setEnhancedCandidates(prev => prev.map(candidate => {
        if (candidate.id === candidateId) {
          const updatedCandidate = { ...candidate };
          enhancedCandidateService.addInteraction(candidateId, interaction);
          return updatedCandidate;
        }
        return candidate;
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add interaction.",
        variant: "destructive"
      });
    }
  };

  const addAvailabilitySignal = (candidateId: string, signal: AvailabilitySignal) => {
    try {
      setEnhancedCandidates(prev => prev.map(candidate => {
        if (candidate.id === candidateId) {
          const updatedCandidate = { ...candidate };
          updatedCandidate.availability_signals.push(signal);
          enhancedCandidateService.updatePlacementProbability(updatedCandidate);
          return updatedCandidate;
        }
        return candidate;
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add availability signal.",
        variant: "destructive"
      });
    }
  };

  const moveToStage = (candidateId: string, newStage: string, movedBy: string, reason?: string) => {
    try {
      enhancedCandidateService.moveToStage(candidateId, newStage, movedBy, reason);
      
      setEnhancedCandidates(prev => prev.map(candidate => {
        if (candidate.id === candidateId) {
          return { ...candidate, pipeline_stage: newStage };
        }
        return candidate;
      }));

      toast({
        title: "Stage Updated",
        description: `Candidate moved to ${newStage} stage successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update candidate stage.",
        variant: "destructive"
      });
    }
  };

  const handleStageChange = (candidateId: string, newStage: string, reason?: string) => {
    moveToStage(candidateId, newStage, 'recruiter', reason);
    
    const interaction = {
      type: 'portal_visit' as const,
      direction: 'outbound' as const,
      content_summary: `Candidate moved to ${newStage} stage`,
      timestamp: new Date().toISOString(),
      recruiter_id: 'current-user',
      response_received: false,
      follow_up_required: false
    };
    
    addInteraction(candidateId, interaction);
  };

  const handleAddNote = (candidateId: string, note: string) => {
    const interaction = {
      type: 'email' as const,
      direction: 'outbound' as const,
      content_summary: note,
      timestamp: new Date().toISOString(),
      recruiter_id: 'current-user',
      response_received: false,
      follow_up_required: false
    };
    
    addInteraction(candidateId, interaction);
    
    toast({
      title: "Note Added",
      description: "Note has been added to candidate profile.",
    });
  };

  const handleScheduleInterview = (candidateId: string, interviewData?: any) => {
    const interaction = {
      type: 'interview' as const,
      direction: 'outbound' as const,
      content_summary: 'Interview scheduled with candidate',
      timestamp: new Date().toISOString(),
      recruiter_id: 'current-user',
      response_received: false,
      follow_up_required: true
    };
    
    addInteraction(candidateId, interaction);
    
    toast({
      title: "Interview Scheduled",
      description: "Interview has been scheduled successfully.",
    });
  };

  return {
    enhancedCandidates,
    loading,
    selectedCandidate,
    setSelectedCandidate,
    addInteraction,
    addAvailabilitySignal,
    moveToStage,
    handleStageChange,
    handleAddNote,
    handleScheduleInterview
  };
};
