
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useBackendIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const invokeFunction = async (functionName: string, payload: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: payload
      });
      
      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // AI-powered candidate search
  const searchCandidates = async (searchParams: {
    query: string;
    skills?: string[];
    location?: string;
    experience_range?: [number, number];
    job_requirements?: string[];
    organization_id: string;
  }) => {
    return invokeFunction('ai-candidate-search', searchParams);
  };

  // OSINT data collection
  const collectOSINTData = async (params: {
    candidate_id: string;
    platforms?: string[];
    linkedin_url?: string;
    github_username?: string;
    twitter_handle?: string;
  }) => {
    return invokeFunction('osint-data-collector', params);
  };

  // Generate dynamic assessments
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

  // Create personalized outreach
  const generatePersonalizedOutreach = async (params: {
    candidate_id: string;
    job_id?: string;
    message_type: 'initial_outreach' | 'follow_up' | 'interview_invitation' | 'assessment_request';
    channel: 'email' | 'linkedin' | 'phone_script';
    custom_context?: Record<string, string>;
  }) => {
    return invokeFunction('outreach-personalization', params);
  };

  // Get predictive analytics
  const getPredictiveAnalytics = async (params: {
    candidate_id: string;
    job_id: string;
    analysis_type: 'job_success' | 'cultural_fit' | 'retention_risk' | 'performance_forecast';
  }) => {
    return invokeFunction('predictive-analytics', params);
  };

  // Send emails
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

  // Process documents
  const processDocument = async (params: {
    file_path: string;
    entity_type: 'candidate' | 'job' | 'application';
    entity_id: string;
    processing_type: 'resume_parse' | 'text_extraction' | 'ai_analysis';
  }) => {
    return invokeFunction('document-processor', params);
  };

  // Generate analytics reports
  const generateAnalyticsReport = async (params: {
    organization_id: string;
    report_type: 'hiring_pipeline' | 'recruiter_performance' | 'source_effectiveness' | 'candidate_insights';
    date_range: {
      start: string;
      end: string;
    };
    filters?: Record<string, any>;
  }) => {
    return invokeFunction('analytics-processor', params);
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
