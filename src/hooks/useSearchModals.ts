
import { useState } from 'react';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const useSearchModals = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [footprintCandidate, setFootprintCandidate] = useState<EnhancedCandidate | null>(null);
  const [outreachCandidate, setOutreachCandidate] = useState<EnhancedCandidate | null>(null);

  const openCandidateDetails = (candidate: EnhancedCandidate) => {
    setSelectedCandidate(candidate);
  };

  const openDigitalFootprint = (candidate: EnhancedCandidate) => {
    setFootprintCandidate(candidate);
  };

  const openOutreachSequence = (candidate: EnhancedCandidate) => {
    setOutreachCandidate(candidate);
  };

  const closeAllModals = () => {
    setSelectedCandidate(null);
    setFootprintCandidate(null);
    setOutreachCandidate(null);
  };

  return {
    selectedCandidate,
    footprintCandidate,
    outreachCandidate,
    openCandidateDetails,
    openDigitalFootprint,
    openOutreachSequence,
    closeAllModals,
    setSelectedCandidate,
    setFootprintCandidate,
    setOutreachCandidate
  };
};
