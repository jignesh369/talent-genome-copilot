
import { useState } from 'react';
import { EnhancedCandidate } from './useEnhancedCandidates';

export interface CandidateWithOSINT extends EnhancedCandidate {
  digitalFootprint?: {
    github?: {
      username: string;
      stars: number;
      commits: number;
      repos: number;
    };
    linkedin?: {
      url: string;
      connections: number;
    };
    stackoverflow?: {
      reputation: number;
    };
    twitter?: {
      followers: number;
    };
  };
  osintScore?: number;
  availability?: string;
  lastActivity?: string;
}

export const useSearchModals = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateWithOSINT | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDigitalFootprintModalOpen, setIsDigitalFootprintModalOpen] = useState(false);

  const openCandidateDetails = (candidate: CandidateWithOSINT) => {
    setSelectedCandidate(candidate);
    setIsDetailsModalOpen(true);
  };

  const openDigitalFootprint = (candidate: CandidateWithOSINT) => {
    setSelectedCandidate(candidate);
    setIsDigitalFootprintModalOpen(true);
  };

  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsDigitalFootprintModalOpen(false);
    setSelectedCandidate(null);
  };

  return {
    selectedCandidate,
    isDetailsModalOpen,
    isDigitalFootprintModalOpen,
    openCandidateDetails,
    openDigitalFootprint,
    closeModals,
  };
};
