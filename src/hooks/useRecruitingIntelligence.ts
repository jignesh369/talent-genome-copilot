
import { useOSINTAnalytics } from './useOSINTAnalytics';
import { useCandidatePredictions } from './useCandidatePredictions';
import { useCommunicationAutomation } from './useCommunicationAutomation';

export const useRecruitingIntelligence = () => {
  const osintAnalytics = useOSINTAnalytics();
  const candidatePredictions = useCandidatePredictions();
  const communicationAutomation = useCommunicationAutomation();

  return {
    ...osintAnalytics,
    ...candidatePredictions,
    ...communicationAutomation
  };
};
