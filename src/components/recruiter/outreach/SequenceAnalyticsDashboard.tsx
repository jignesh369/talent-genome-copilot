
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticsSummaryCards from './analytics/AnalyticsSummaryCards';
import SequencePerformanceTab from './analytics/SequencePerformanceTab';
import StepAnalysisTab from './analytics/StepAnalysisTab';
import CandidateJourneysTab from './analytics/CandidateJourneysTab';
import OptimizationTab from './analytics/OptimizationTab';

interface SequenceMetrics {
  sequence_id: string;
  sequence_name: string;
  total_candidates: number;
  active_candidates: number;
  completed_candidates: number;
  responses_received: number;
  interviews_scheduled: number;
  hires_made: number;
  open_rate: number;
  response_rate: number;
  conversion_rate: number;
  avg_response_time: number;
  step_performance: StepMetrics[];
}

interface StepMetrics {
  step_number: number;
  step_type: string;
  sent_count: number;
  opened_count: number;
  responded_count: number;
  open_rate: number;
  response_rate: number;
}

interface CandidateJourney {
  candidate_id: string;
  candidate_name: string;
  current_step: number;
  status: 'active' | 'responded' | 'completed' | 'opted_out';
  last_interaction: string;
  total_steps: number;
  response_received: boolean;
}

const SequenceAnalyticsDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  
  // Mock data - in real implementation, this would come from API
  const [sequenceMetrics] = useState<SequenceMetrics[]>([
    {
      sequence_id: '1',
      sequence_name: 'Senior Developer Outreach',
      total_candidates: 150,
      active_candidates: 45,
      completed_candidates: 85,
      responses_received: 42,
      interviews_scheduled: 18,
      hires_made: 3,
      open_rate: 68,
      response_rate: 28,
      conversion_rate: 12,
      avg_response_time: 2.5,
      step_performance: [
        { step_number: 1, step_type: 'email', sent_count: 150, opened_count: 102, responded_count: 25, open_rate: 68, response_rate: 17 },
        { step_number: 2, step_type: 'linkedin', sent_count: 125, opened_count: 89, responded_count: 12, open_rate: 71, response_rate: 10 },
        { step_number: 3, step_type: 'email', sent_count: 113, opened_count: 75, responded_count: 5, open_rate: 66, response_rate: 4 }
      ]
    },
    {
      sequence_id: '2',
      sequence_name: 'Product Manager Pipeline',
      total_candidates: 89,
      active_candidates: 23,
      completed_candidates: 54,
      responses_received: 27,
      interviews_scheduled: 12,
      hires_made: 2,
      open_rate: 72,
      response_rate: 30,
      conversion_rate: 13,
      avg_response_time: 1.8,
      step_performance: [
        { step_number: 1, step_type: 'email', sent_count: 89, opened_count: 64, responded_count: 18, open_rate: 72, response_rate: 20 },
        { step_number: 2, step_type: 'phone', sent_count: 71, opened_count: 71, responded_count: 9, open_rate: 100, response_rate: 13 }
      ]
    }
  ]);

  const [candidateJourneys] = useState<CandidateJourney[]>([
    {
      candidate_id: '1',
      candidate_name: 'Sarah Johnson',
      current_step: 2,
      status: 'active',
      last_interaction: '2025-01-15T10:30:00Z',
      total_steps: 3,
      response_received: false
    },
    {
      candidate_id: '2',
      candidate_name: 'Mike Chen',
      current_step: 3,
      status: 'responded',
      last_interaction: '2025-01-14T14:20:00Z',
      total_steps: 3,
      response_received: true
    }
  ]);

  const totalMetrics = sequenceMetrics.reduce((acc, seq) => ({
    total_candidates: acc.total_candidates + seq.total_candidates,
    responses_received: acc.responses_received + seq.responses_received,
    interviews_scheduled: acc.interviews_scheduled + seq.interviews_scheduled,
    hires_made: acc.hires_made + seq.hires_made
  }), { total_candidates: 0, responses_received: 0, interviews_scheduled: 0, hires_made: 0 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sequence Analytics</h2>
          <p className="text-gray-600">Track performance and optimize your outreach sequences</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Overview Metrics */}
      <AnalyticsSummaryCards totalMetrics={totalMetrics} />

      <Tabs defaultValue="sequences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sequences">Sequence Performance</TabsTrigger>
          <TabsTrigger value="steps">Step Analysis</TabsTrigger>
          <TabsTrigger value="journeys">Candidate Journeys</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="sequences" className="space-y-4">
          <SequencePerformanceTab sequenceMetrics={sequenceMetrics} />
        </TabsContent>

        <TabsContent value="steps" className="space-y-4">
          <StepAnalysisTab sequenceMetrics={sequenceMetrics} />
        </TabsContent>

        <TabsContent value="journeys" className="space-y-4">
          <CandidateJourneysTab candidateJourneys={candidateJourneys} />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <OptimizationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SequenceAnalyticsDashboard;
