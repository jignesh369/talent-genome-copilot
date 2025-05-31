
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Mail, 
  MessageSquare, 
  Phone,
  Users,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'opted_out': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'linkedin': return MessageSquare;
      case 'phone': return Phone;
      default: return Mail;
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Outreach</p>
                <p className="text-2xl font-bold text-gray-900">{totalMetrics.total_candidates}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% vs last period
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Responses</p>
                <p className="text-2xl font-bold text-gray-900">{totalMetrics.responses_received}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% response rate
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{totalMetrics.interviews_scheduled}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {Math.round((totalMetrics.interviews_scheduled / totalMetrics.responses_received) * 100)}% conversion
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hires</p>
                <p className="text-2xl font-bold text-gray-900">{totalMetrics.hires_made}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {Math.round((totalMetrics.hires_made / totalMetrics.interviews_scheduled) * 100)}% hire rate
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sequences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sequences">Sequence Performance</TabsTrigger>
          <TabsTrigger value="steps">Step Analysis</TabsTrigger>
          <TabsTrigger value="journeys">Candidate Journeys</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="sequences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sequence Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sequenceMetrics.map((sequence) => (
                  <div key={sequence.sequence_id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{sequence.sequence_name}</h3>
                        <p className="text-sm text-gray-600">
                          {sequence.total_candidates} candidates • {sequence.active_candidates} active
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {sequence.open_rate}% open rate
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {sequence.response_rate}% response rate
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{sequence.responses_received}</div>
                        <div className="text-xs text-gray-600">Responses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{sequence.interviews_scheduled}</div>
                        <div className="text-xs text-gray-600">Interviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{sequence.hires_made}</div>
                        <div className="text-xs text-gray-600">Hires</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{sequence.avg_response_time}d</div>
                        <div className="text-xs text-gray-600">Avg Response</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Conversion Rate</span>
                        <span>{sequence.conversion_rate}%</span>
                      </div>
                      <Progress value={sequence.conversion_rate} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {sequenceMetrics.map((sequence) => (
                <div key={sequence.sequence_id} className="mb-6">
                  <h3 className="font-semibold mb-4">{sequence.sequence_name}</h3>
                  <div className="space-y-3">
                    {sequence.step_performance.map((step) => {
                      const IconComponent = getStepIcon(step.step_type);
                      return (
                        <div key={step.step_number} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">Step {step.step_number} - {step.step_type}</div>
                              <div className="text-sm text-gray-600">
                                {step.sent_count} sent • {step.opened_count} opened • {step.responded_count} responded
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex space-x-4">
                              <div className="text-center">
                                <div className="font-semibold text-blue-600">{step.open_rate}%</div>
                                <div className="text-xs text-gray-600">Open Rate</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-green-600">{step.response_rate}%</div>
                                <div className="text-xs text-gray-600">Response Rate</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journeys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Candidate Journeys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {candidateJourneys.map((journey) => (
                  <div key={journey.candidate_id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {journey.candidate_name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{journey.candidate_name}</div>
                        <div className="text-sm text-gray-600">
                          Step {journey.current_step} of {journey.total_steps} • 
                          Last interaction: {new Date(journey.last_interaction).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24">
                        <Progress value={(journey.current_step / journey.total_steps) * 100} className="h-2" />
                      </div>
                      <Badge className={getStatusColor(journey.status)}>
                        {journey.status}
                      </Badge>
                      {journey.response_received && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Optimize Email Subject Lines</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      Your email open rates are 15% below industry average. Consider A/B testing different subject line approaches.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Timing Optimization</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Send LinkedIn messages on Tuesday-Thursday between 10-11 AM for 23% higher response rates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">High-Performing Template</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Your "Senior Developer Outreach" sequence has a 28% response rate. Consider adapting this approach for other roles.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SequenceAnalyticsDashboard;
