
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
  step_performance: any[];
}

interface SequencePerformanceTabProps {
  sequenceMetrics: SequenceMetrics[];
}

const SequencePerformanceTab: React.FC<SequencePerformanceTabProps> = ({ sequenceMetrics }) => {
  return (
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
  );
};

export default SequencePerformanceTab;
