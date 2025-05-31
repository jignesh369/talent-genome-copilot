
import React from 'react';
import CandidateDetailsModal from './CandidateDetailsModal';
import DigitalFootprintModal from './DigitalFootprintModal';
import OutreachSequenceModal from '../outreach/OutreachSequenceModal';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { PersonalizedSequence } from '@/types/outreach-sequence';

interface SearchModalsContainerProps {
  selectedCandidate: EnhancedCandidate | null;
  footprintCandidate: EnhancedCandidate | null;
  outreachCandidate: EnhancedCandidate | null;
  onCloseCandidate: () => void;
  onCloseFootprint: () => void;
  onCloseOutreach: () => void;
  onContactCandidate: (candidate: EnhancedCandidate) => void;
  onFeedback: (candidateId: string, feedback: 'positive' | 'negative', reason?: string) => void;
  onSequenceStart: (sequence: PersonalizedSequence) => void;
}

const SearchModalsContainer: React.FC<SearchModalsContainerProps> = ({
  selectedCandidate,
  footprintCandidate,
  outreachCandidate,
  onCloseCandidate,
  onCloseFootprint,
  onCloseOutreach,
  onContactCandidate,
  onFeedback,
  onSequenceStart
}) => {
  return (
    <>
      {selectedCandidate && (
        <CandidateDetailsModal 
          candidate={selectedCandidate}
          onClose={onCloseCandidate}
          onFeedback={onFeedback}
          onContactCandidate={onContactCandidate}
        />
      )}

      <DigitalFootprintModal
        candidate={footprintCandidate}
        isOpen={!!footprintCandidate}
        onClose={onCloseFootprint}
      />

      {outreachCandidate && (
        <OutreachSequenceModal
          isOpen={!!outreachCandidate}
          onClose={onCloseOutreach}
          candidate={outreachCandidate}
          onSequenceStart={onSequenceStart}
        />
      )}
    </>
  );
};

export default SearchModalsContainer;
