
import { useState, useEffect } from 'react';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';
import { enhancedCandidateService } from '@/services/enhancedCandidateService';
import { useCandidates } from './useCandidates';

export const useCandidateData = () => {
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

  return {
    enhancedCandidates,
    setEnhancedCandidates,
    loading
  };
};
