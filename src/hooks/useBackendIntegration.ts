
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from './useAuthContext';

export const useBackendIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, organizationId } = useAuthContext();

  const invokeFunction = async (functionName: string, payload: any) => {
    console.log(`useBackendIntegration: Invoking function ${functionName} with payload:`, payload);
    
    if (!user) {
      const errorMessage = 'User not authenticated';
      console.error('useBackendIntegration: User not authenticated');
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    setLoading(true);
    setError(null);
    
    try {
      const finalPayload = organizationId ? {
        ...payload,
        organization_id: organizationId
      } : payload;

      const { data, error } = await supabase.functions.invoke(functionName, {
        body: finalPayload
      });
      
      console.log(`useBackendIntegration: Function ${functionName} response:`, { data, error });
      
      if (error) {
        console.error(`useBackendIntegration: Function ${functionName} error:`, error);
        throw error;
      }
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error(`useBackendIntegration: Error in ${functionName}:`, err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchCandidates = async (searchParams: {
    query: string;
    skills?: string[];
    location?: string;
    experience_range?: [number, number];
    job_requirements?: string[];
  }) => {
    console.log('useBackendIntegration: searchCandidates called with params:', searchParams);
    return invokeFunction('ai-candidate-search', searchParams);
  };

  const collectOSINTData = async (params: {
    candidate_id: string;
    platforms?: string[];
    linkedin_url?: string;
    github_username?: string;
    twitter_handle?: string;
  }) => {
    return invokeFunction('osint-data-collector', params);
  };

  const generateAssessment = async (params: {
    job_id: string;
    candidate_id?: string;
    job_requirements: string[];
    skills_required: string[];
    experience_level: string;
    assessment_type: 'technical' | 'behavioral' | 'comprehensive';
  }) => {
    return invokeFunction('assessment-generator', params);
  };

  const generatePersonalizedOutreach = async (params: {
    candidate_id: string;
    job_id?: string;
    message_type: 'initial_outreach' | 'follow_up' | 'interview_invitation' | 'assessment_request';
    channel: 'email' | 'linkedin' | 'phone_script';
    custom_context?: Record<string, string>;
  }) => {
    return invokeFunction('outreach-personalization', params);
  };

  const getPredictiveAnalytics = async (params: {
    candidate_id: string;
    job_id: string;
    analysis_type: 'job_success' | 'cultural_fit' | 'retention_risk' | 'performance_forecast';
  }) => {
    return invokeFunction('predictive-analytics', params);
  };

  const sendEmail = async (params: {
    to: string;
    subject: string;
    html: string;
    from?: string;
    reply_to?: string;
    template_id?: string;
    template_data?: Record<string, any>;
  }) => {
    return invokeFunction('email-service', params);
  };

  const processDocument = async (params: {
    file_path: string;
    entity_type: 'candidate' | 'job' | 'application';
    entity_id: string;
    processing_type: 'resume_parse' | 'text_extraction' | 'ai_analysis';
  }) => {
    return invokeFunction('document-processor', params);
  };

  const generateAnalyticsReport = async (params: {
    organization_id?: string;
    report_type: 'hiring_pipeline' | 'recruiter_performance' | 'source_effectiveness' | 'candidate_insights';
    date_range: {
      start: string;
      end: string;
    };
    filters?: Record<string, any>;
  }) => {
    const finalParams = organizationId ? {
      ...params,
      organization_id: organizationId
    } : params;
    return invokeFunction('analytics-processor', finalParams);
  };

  return {
    loading,
    error,
    searchCandidates,
    collectOSINTData,
    generateAssessment,
    generatePersonalizedOutreach,
    getPredictiveAnalytics,
    sendEmail,
    processDocument,
    generateAnalyticsReport
  };
};
