
import React from 'react';
import { recruiterStats } from '@/config/recruiterStats';
import EnhancedWelcomeSection from '@/components/recruiter/EnhancedWelcomeSection';
import SmartRecommendationsCard from '@/components/recruiter/SmartRecommendationsCard';
import GoalTrackingCard from '@/components/recruiter/GoalTrackingCard';
import RecruitingHealthScore from '@/components/recruiter/RecruitingHealthScore';
import RecentActivityCard from '@/components/recruiter/RecentActivityCard';
import InteractiveAnalyticsCharts from '@/components/recruiter/InteractiveAnalyticsCharts';
import PipelineOverview from '@/components/recruiter/PipelineOverview';
import ConsistentStatsCard from '@/components/recruiter/ConsistentStatsCard';

interface OverviewTabProps {
  userName?: string;
  onCreateJob: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ userName, onCreateJob }) => {
  return (
    <div className="space-y-6">
      <EnhancedWelcomeSection 
        userName={userName} 
        onCreateJob={onCreateJob} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recruiterStats.map((stat) => (
          <ConsistentStatsCard key={stat.title} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SmartRecommendationsCard />
        </div>
        <GoalTrackingCard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecruitingHealthScore />
        <RecentActivityCard />
      </div>
      
      <InteractiveAnalyticsCharts />
      
      <PipelineOverview />
    </div>
  );
};

export default OverviewTab;
