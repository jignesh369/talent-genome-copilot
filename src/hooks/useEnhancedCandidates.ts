
import { useState, useEffect } from 'react';
import { EnhancedCandidate, CandidateInteraction, AvailabilitySignal } from '@/types/enhanced-recruiting';
import { enhancedCandidateService } from '@/services/enhancedCandidateService';
import { useCandidates } from './useCandidates';

export const useEnhancedCandidates = () => {
  const { candidates: basicCandidates, loading: basicLoading } = useCandidates();
  const [enhancedCandidates, setEnhancedCandidates] = useState<EnhancedCandidate[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Get candidates by engagement score
  const getHighEngagementCandidates = (minScore: number = 70) => {
    return enhancedCandidates.filter(candidate => candidate.engagement_score >= minScore);
  };

  // Get candidates with active availability signals
  const getActivelySeeking = () => {
    return enhancedCandidates.filter(candidate => 
      candidate.availability_signals.some(signal => 
        signal.signal_type === 'active_job_search' || signal.signal_type === 'career_change'
      )
    );
  };

  // Get candidates by pipeline stage
  const getCandidatesByStage = (stage: string) => {
    return enhancedCandidates.filter(candidate => candidate.pipeline_stage === stage);
  };

  // Get top candidates by placement probability
  const getTopCandidates = (limit: number = 10) => {
    return enhancedCandidates
      .sort((a, b) => b.placement_probability_score - a.placement_probability_score)
      .slice(0, limit);
  };

  // Search candidates with enhanced filters
  const searchEnhancedCandidates = (filters: {
    query?: string;
    skills?: string[];
    minEngagementScore?: number;
    stages?: string[];
    availabilitySignals?: string[];
    sources?: string[];
  }) => {
    let filtered = [...enhancedCandidates];

    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.first_name.toLowerCase().includes(query) ||
        candidate.last_name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.current_title?.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query)) ||
        candidate.ai_summary?.toLowerCase().includes(query)
      );
    }

    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.skills!.some(skill =>
          candidate.skills.some(cSkill => 
            cSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (filters.minEngagementScore) {
      filtered = filtered.filter(candidate => 
        candidate.engagement_score >= filters.minEngagementScore!
      );
    }

    if (filters.stages && filters.stages.length > 0) {
      filtered = filtered.filter(candidate => 
        filters.stages!.includes(candidate.pipeline_stage)
      );
    }

    if (filters.availabilitySignals && filters.availabilitySignals.length > 0) {
      filtered = filtered.filter(candidate =>
        candidate.availability_signals.some(signal =>
          filters.availabilitySignals!.includes(signal.signal_type)
        )
      );
    }

    if (filters.sources && filters.sources.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.sources!.includes(candidate.source_details.type)
      );
    }

    return filtered;
  };

  return {
    enhancedCandidates,
    loading,
    addInteraction,
    addAvailabilitySignal,
    moveToStage,
    getHighEngagementCandidates,
    getActivelySeeking,
    getCandidatesByStage,
    getTopCandidates,
    searchEnhancedCandidates
  };
};
