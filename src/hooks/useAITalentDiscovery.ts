
import { useState } from 'react';
import { 
  aiTalentDiscoveryAPI, 
  NaturalLanguageSearchRequest, 
  NaturalLanguageSearchResponse,
  OSINTEnrichmentRequest,
  OSINTEnrichmentResponse,
  PersonalizedOutreachRequest,
  JobSuccessPredictionRequest
} from '@/services/backend/aiTalentDiscoveryAPI';
import { JobMatchScore } from '@/services/llm/candidateAnalysisService';
import { PersonalizedMessage } from '@/services/llm/personalizedOutreachService';

export const useAITalentDiscovery = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState<NaturalLanguageSearchResponse | null>(null);

  const processNaturalLanguageSearch = async (request: NaturalLanguageSearchRequest) => {
    setIsProcessing(true);
    try {
      const response = await aiTalentDiscoveryAPI.processNaturalLanguageSearch(request);
      setSearchResults(response);
      return response;
    } catch (error) {
      console.error('Natural language search failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const enrichCandidateWithOSINT = async (request: OSINTEnrichmentRequest): Promise<OSINTEnrichmentResponse> => {
    setIsProcessing(true);
    try {
      return await aiTalentDiscoveryAPI.enrichCandidateWithOSINT(request);
    } catch (error) {
      console.error('OSINT enrichment failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePersonalizedOutreach = async (request: PersonalizedOutreachRequest): Promise<PersonalizedMessage> => {
    setIsProcessing(true);
    try {
      return await aiTalentDiscoveryAPI.generatePersonalizedOutreach(request);
    } catch (error) {
      console.error('Personalized outreach generation failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const predictJobSuccess = async (request: JobSuccessPredictionRequest): Promise<JobMatchScore> => {
    setIsProcessing(true);
    try {
      return await aiTalentDiscoveryAPI.predictJobSuccess(request);
    } catch (error) {
      console.error('Job success prediction failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const generateDynamicAssessment = async (role: string, seniority: string, skills: string[]) => {
    setIsProcessing(true);
    try {
      return await aiTalentDiscoveryAPI.generateDynamicAssessment(role, seniority, skills);
    } catch (error) {
      console.error('Dynamic assessment generation failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    // State
    isProcessing,
    searchResults,
    
    // Methods
    processNaturalLanguageSearch,
    enrichCandidateWithOSINT,
    generatePersonalizedOutreach,
    predictJobSuccess,
    generateDynamicAssessment,
    
    // Reset
    clearSearchResults: () => setSearchResults(null)
  };
};
