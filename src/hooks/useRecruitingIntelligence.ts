
import { useState, useEffect } from 'react';
import { realTimeOSINTService } from '@/services/analytics/realTimeOSINTService';
import { predictiveAnalyticsEngine } from '@/services/analytics/predictiveAnalyticsEngine';
import { dynamicAssessmentGenerator } from '@/services/analytics/dynamicAssessmentGenerator';
import { riskAlertSystem, RiskAlert } from '@/services/analytics/riskAlertSystem';
import { automatedCommunicationService } from '@/services/analytics/automatedCommunicationService';
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useToast } from '@/hooks/use-toast';

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
      const candidateRisks = riskAlertSystem.analyzeCandidate(candidate);
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
    
    return await predictiveAnalyticsEngine.predictJobSuccess(candidate, jobRequirements);
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
    
    return await automatedCommunicationService.generatePersonalizedMessage(
      candidate, 
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
