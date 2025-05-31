
import { useState } from 'react';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { OutreachTemplate, PersonalizedSequence } from '@/types/outreach-sequence';
import { personalizationService } from '@/services/personalizationService';

export const usePersonalizationEngine = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePersonalizedSequence = async (
    candidate: EnhancedCandidate,
    template: OutreachTemplate
  ): Promise<PersonalizedSequence> => {
    setIsGenerating(true);
    
    try {
      return await personalizationService.generatePersonalizedSequence(candidate, template);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePersonalizedSequence,
    isGenerating
  };
};
