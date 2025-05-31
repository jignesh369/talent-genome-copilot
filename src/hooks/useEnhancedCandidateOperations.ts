
import { useState } from 'react';
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useToast } from '@/hooks/use-toast';
import { CandidateInteraction } from '@/types/enhanced-recruiting';

export const useEnhancedCandidateOperations = () => {
  const { 
    enhancedCandidates, 
    addInteraction, 
    moveToStage,
    addAvailabilitySignal 
  } = useEnhancedCandidates();
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const handleStageChange = (candidateId: string, newStage: string, reason?: string) => {
    try {
      moveToStage(candidateId, newStage, 'recruiter', reason);
      
      // Add interaction record
      const interaction: Omit<CandidateInteraction, 'id'> = {
        candidate_id: candidateId,
        interaction_type: 'stage_change',
        interaction_date: new Date().toISOString(),
        recruiter_id: 'current-user', // In real app, get from auth
        outcome: `moved_to_${newStage}`,
        notes: reason || `Candidate moved to ${newStage} stage`,
        channel: 'platform'
      };
      
      addInteraction(candidateId, interaction);
      
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

  const handleAddNote = (candidateId: string, note: string) => {
    try {
      const interaction: Omit<CandidateInteraction, 'id'> = {
        candidate_id: candidateId,
        interaction_type: 'note',
        interaction_date: new Date().toISOString(),
        recruiter_id: 'current-user',
        outcome: 'note_added',
        notes: note,
        channel: 'platform'
      };
      
      addInteraction(candidateId, interaction);
      
      toast({
        title: "Note Added",
        description: "Note has been added to candidate profile.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add note.",
        variant: "destructive"
      });
    }
  };

  const handleScheduleInterview = (candidateId: string, interviewData?: any) => {
    try {
      const interaction: Omit<CandidateInteraction, 'id'> = {
        candidate_id: candidateId,
        interaction_type: 'interview_scheduled',
        interaction_date: new Date().toISOString(),
        recruiter_id: 'current-user',
        outcome: 'scheduled',
        notes: 'Interview scheduled with candidate',
        channel: 'platform'
      };
      
      addInteraction(candidateId, interaction);
      
      toast({
        title: "Interview Scheduled",
        description: "Interview has been scheduled successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule interview.",
        variant: "destructive"
      });
    }
  };

  const getCandidateMetrics = () => {
    const total = enhancedCandidates.length;
    const highEngagement = enhancedCandidates.filter(c => c.engagement_score >= 70).length;
    const activelySeeking = enhancedCandidates.filter(c => 
      c.availability_signals.some(signal => 
        signal.signal_type === 'active_job_search' || signal.signal_type === 'career_change'
      )
    ).length;

    return {
      total,
      highEngagement,
      activelySeeking,
      averageEngagement: Math.round(
        enhancedCandidates.reduce((sum, c) => sum + c.engagement_score, 0) / total
      ),
      averagePlacementProbability: Math.round(
        enhancedCandidates.reduce((sum, c) => sum + c.placement_probability_score, 0) / total
      )
    };
  };

  return {
    enhancedCandidates,
    selectedCandidate,
    setSelectedCandidate,
    handleStageChange,
    handleAddNote,
    handleScheduleInterview,
    getCandidateMetrics
  };
};
