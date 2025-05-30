
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Filter,
  Calendar
} from 'lucide-react';

interface CandidatePipelineProps {
  showCandidates?: boolean;
}

const CandidatePipeline: React.FC<CandidatePipelineProps> = ({ showCandidates = true }) => {
  const [selectedJob, setSelectedJob] = useState('all');

  const pipelineStats = [
    { stage: 'Applied', count: 156, percentage: 100, color: 'bg-blue-500' },
    { stage: 'Screening', count: 89, percentage: 57, color: 'bg-yellow-500' },
    { stage: 'Interview', count: 34, percentage: 22, color: 'bg-orange-500' },
    { stage: 'Final', count: 12, percentage: 8, color: 'bg-purple-500' },
    { stage: 'Offer', count: 5, percentage: 3, color: 'bg-green-500' }
  ];

  const candidates = [
    {
      id: 1,
      name: 'Alex Kumar',
      role: 'Senior Frontend Developer',
      stage: 'Interview',
      score: 85,
      avatar: 'AK',
      status: 'scheduled',
      nextAction: 'Technical Interview - Tomorrow 2 PM'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      stage: 'Final',
      score: 92,
      avatar: 'SJ',
      status: 'pending',
      nextAction: 'Final Interview - Pending Schedule'
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'UX Designer',
      stage: 'Offer',
      score: 88,
      avatar: 'MC',
      status: 'offer-sent',
      nextAction: 'Offer Sent - Awaiting Response'
    }
  ];

  const jobs = [
    { id: 'all', title: 'All Positions', count: 156 },
    { id: '1', title: 'Senior Frontend Developer', count: 67 },
    { id: '2', title: 'Product Manager', count: 45 },
    { id: '3', title: 'UX Designer', count: 34 },
    { id: '4', title: 'Backend Engineer', count: 10 }
  ];

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Interview':
        return <Calendar className="w-4 h-4" />;
      case 'Final':
        return <Clock className="w-4 h-4" />;
      case 'Offer':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'offer-sent':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Hiring Pipeline Overview
            </CardTitle>
            {showCandidates && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <select 
                  className="text-sm border rounded px-2 py-1"
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                >
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.title} ({job.count})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {pipelineStats.map((stage, index) => (
              <div key={stage.stage} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <div className={`w-12 h-12 rounded-full ${stage.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {stage.count}
                    </div>
                  </div>
                  {index < pipelineStats.length - 1 && (
                    <ArrowRight className="absolute top-6 -right-8 w-4 h-4 text-gray-400" />
                  )}
                </div>
                <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                <p className="text-sm text-gray-600">{stage.percentage}%</p>
                <div className="mt-2">
                  <Progress value={stage.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900">Pipeline Health</h4>
                <p className="text-sm text-blue-700">Conversion rate: 3.2% (Industry avg: 2.8%)</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Candidates - Only show if showCandidates is true */}
      {showCandidates && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Active Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {candidate.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                      <p className="text-sm text-gray-600">{candidate.role}</p>
                      <p className="text-xs text-gray-500">{candidate.nextAction}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="flex items-center space-x-2">
                        {getStageIcon(candidate.stage)}
                        <span className="text-sm font-medium">{candidate.stage}</span>
                      </div>
                      <p className="text-xs text-gray-600">Score: {candidate.score}%</p>
                    </div>
                    
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status.replace('-', ' ')}
                    </Badge>
                    
                    <Button size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline">
                View All Candidates
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidatePipeline;
