
import { useState } from 'react';
import { mindReaderService, MindReaderResponse } from '@/services/llm/mindReaderService';

export const useMindReader = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastInterpretation, setLastInterpretation] = useState<MindReaderResponse | null>(null);

  const interpretHiringQuery = async (query: string): Promise<MindReaderResponse> => {
    setIsProcessing(true);
    try {
      const result = await mindReaderService.interpretHiringQuery(query);
      setLastInterpretation(result);
      return result;
    } catch (error) {
      console.error('Mind Reader interpretation failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    lastInterpretation,
    interpretHiringQuery,
    clearInterpretation: () => setLastInterpretation(null)
  };
};
