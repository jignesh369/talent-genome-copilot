
import { useState } from 'react';
import { EnhancedCandidate } from './useEnhancedCandidates';

export const useSearchModals = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [footprintCandidate, setFootprintCandidate] = useState<EnhancedCandidate | null>(null);
  const [outreachCandidate, setOutreachCandidate] = useState<EnhancedCandidate | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDigitalFootprintModalOpen, setIsDigitalFootprintModalOpen] = useState(false);

  const openCandidateDetails = (candidate: EnhancedCandidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsModalOpen(true);
  };

  const openDigitalFootprint = (candidate: EnhancedCandidate) => {
    setFootprintCandidate(candidate);
    setIsDigitalFootprintModalOpen(true);
  };

  const openOutreachSequence = (candidate: EnhancedCandidate) => {
    setOutreachCandidate(candidate);
  };

  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsDigitalFootprintModalOpen(false);
    setSelectedCandidate(null);
    setFootprintCandidate(null);
    setOutreachCandidate(null);
  };

  return {
    selectedCandidate,
    footprintCandidate,
    outreachCandidate,
    isDetailsModalOpen,
    isDigitalFootprintModalOpen,
    openCandidateDetails,
    openDigitalFootprint,
    openOutreachSequence,
    closeModals,
    setSelectedCandidate,
    setFootprintCandidate,
    setOutreachCandidate,
  };
};
