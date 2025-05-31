
import { useState, useEffect } from 'react';
import { realTimeOSINTService } from '@/services/analytics/realTimeOSINTService';
import { predictiveAnalyticsEngine } from '@/services/analytics/predictiveAnalyticsEngine';
import { dynamicAssessmentGenerator } from '@/services/analytics/dynamicAssessmentGenerator';
import { riskAlertSystem, RiskAlert } from '@/services/analytics/riskAlertSystem';
import { automatedCommunicationService } from '@/services/analytics/automatedCommunicationService';
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useToast } from '@/hooks/use-toast';
import { EnhancedCandidate as RecruitingCandidate } from '@/types/enhanced-recruiting';
import { EnhancedCandidate as AnalyticsCandidate } from '@/types/enhanced-candidate';

export const useRecruitingIntelligence = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const { toast } = useToast();
  
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [osintMonitoring, setOSINTMonitoring] = useState({ total: 0, active: [] });
  const [communicationMetrics, setCommunicationMetrics] = useState({
    total_sent: 0,
    response_rate: 0,
    platform_performance: {}
  });

  // Helper function to convert RecruitingCandidate to AnalyticsCandidate
  const convertToAnalyticsCandidate = (candidate: RecruitingCandidate): AnalyticsCandidate => {
    return {
      id: candidate.id,
      name: `${candidate.first_name} ${candidate.last_name}`,
      handle: `${candidate.first_name} ${candidate.last_name}`,
      email: candidate.email,
      location: candidate.location || '',
      current_title: candidate.current_title,
      current_company: candidate.current_company,
      experience_years: candidate.experience_years,
      skills: candidate.skills,
      bio: candidate.ai_summary || '',
      avatar_url: candidate.avatar_url,
      ai_summary: candidate.ai_summary || '',
      career_trajectory_analysis: {
        progression_type: 'ascending' as const,
        growth_rate: 0.8,
        stability_score: 0.75,
        next_likely_move: 'Senior role',
        timeline_events: []
      },
      technical_depth_score: candidate.placement_probability_score || 75,
      community_influence_score: 70,
      cultural_fit_indicators: candidate.cultural_fit_score ? [{
        aspect: 'communication_style' as const,
        score: candidate.cultural_fit_score,
        evidence: [],
        confidence: 0.8
      }] : [],
      learning_velocity_score: 75,
      osint_profile: {
        candidate_id: candidate.id,
        overall_score: 8,
        influence_score: 7,
        technical_depth: 8,
        community_engagement: 7,
        learning_velocity: 8,
        last_updated: new Date().toISOString(),
        availability_signals: candidate.availability_signals.map(signal => ({
          signal_type: signal.signal_type as any,
          confidence: signal.confidence,
          detected_date: signal.detected_date,
          description: signal.details,
          platform_source: signal.source
        }))
      },
      match_score: candidate.placement_probability_score || 75,
      relevance_factors: [],
      availability_status: 'passive' as const,
      best_contact_method: {
        platform: candidate.preferred_contact_method as any || 'email',
        confidence: 0.8,
        best_time: '9-17',
        approach_style: 'professional' as const
      },
      profile_last_updated: new Date().toISOString(),
      osint_last_fetched: new Date().toISOString()
    };
  };

  useEffect(() => {
    // Initialize real-time monitoring for all candidates
    if (enhancedCandidates.length > 0) {
      const candidateIds = enhancedCandidates.map(c => c.id);
      realTimeOSINTService.startMonitoring(candidateIds);
      
      // Set up monitoring status updates
      const updateMonitoringStatus = () => {
        setOSINTMonitoring(realTimeOSINTService.getMonitoringStatus());
      };
      
      updateMonitoringStatus();
      const interval = setInterval(updateMonitoringStatus, 30000); // Update every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [enhancedCandidates]);

  useEffect(() => {
    // Set up risk alert monitoring
    const handleNewAlert = (alert: RiskAlert) => {
      setAlerts(prev => [alert, ...prev]);
      
      // Show toast notification for high/critical alerts
      if (alert.severity === 'high' || alert.severity === 'critical') {
        toast({
          title: `🚨 ${alert.severity.toUpperCase()} Alert`,
          description: alert.title,
          variant: alert.severity === 'critical' ? 'destructive' : 'default'
        });
      }
    };

    riskAlertSystem.onAlert(handleNewAlert);
    
    // Analyze existing candidates for risks
    enhancedCandidates.forEach(candidate => {
      const convertedCandidate = convertToAnalyticsCandidate(candidate);
      const candidateRisks = riskAlertSystem.analyzeCandidate(convertedCandidate);
      if (candidateRisks.length > 0) {
        setAlerts(prev => [...candidateRisks, ...prev]);
      }
    });
  }, [enhancedCandidates, toast]);

  useEffect(() => {
    // Update communication metrics periodically
    const updateMetrics = () => {
      setCommunicationMetrics(automatedCommunicationService.getPerformanceMetrics());
    };
    
    updateMetrics();
    const interval = setInterval(updateMetrics, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const predictJobSuccess = async (candidateId: string, jobRequirements: string[] = []) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    const analyticsCandidate = convertToAnalyticsCandidate(candidate);
    return await predictiveAnalyticsEngine.predictJobSuccess(analyticsCandidate, jobRequirements);
  };

  const generateAssessment = async (roleTitle: string, requirements: string[], seniorityLevel: string) => {
    return await dynamicAssessmentGenerator.generateAssessment(roleTitle, requirements, seniorityLevel);
  };

  const generatePersonalizedOutreach = async (
    candidateId: string, 
    messageType: 'initial_outreach' | 'follow_up' | 'assessment_request',
    customData: Record<string, string> = {}
  ) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    const communicationCandidate = convertToAnalyticsCandidate(candidate);
    
    return await automatedCommunicationService.generatePersonalizedMessage(
      communicationCandidate, 
      messageType, 
      customData
    );
  };

  const sendMessage = async (messageId: string) => {
    const success = await automatedCommunicationService.sendMessage(messageId);
    if (success) {
      toast({
        title: "Message Sent",
        description: "Personalized outreach message has been sent successfully"
      });
    }
    return success;
  };

  const resolveAlert = (alertId: string) => {
    riskAlertSystem.resolveAlert(alertId, 'recruiter');
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Resolved",
      description: "Risk alert has been marked as resolved"
    });
  };

  const getAlertStats = () => {
    return riskAlertSystem.getAlertStats();
  };

  const getCandidateAlerts = (candidateId: string) => {
    return alerts.filter(alert => alert.candidate_id === candidateId);
  };

  return {
    // Real-time monitoring
    osintMonitoring,
    
    // Risk management
    alerts,
    resolveAlert,
    getAlertStats,
    getCandidateAlerts,
    
    // Predictive analytics
    predictJobSuccess,
    
    // Assessment generation
    generateAssessment,
    
    // Communication automation
    generatePersonalizedOutreach,
    sendMessage,
    communicationMetrics,
    
    // Utility
    enhancedCandidates
  };
};
