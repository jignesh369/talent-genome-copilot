
import { useCandidateStore } from './useCandidateStore';

interface SearchFilters {
  query?: string;
  skills?: string[];
  minEngagementScore?: number;
  stages?: string[];
  availabilitySignals?: string[];
  sources?: string[];
}

export const useCandidateSearch = () => {
  const { enhancedCandidates } = useCandidateStore();

  const searchEnhancedCandidates = (filters: SearchFilters) => {
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
    searchEnhancedCandidates
  };
};
