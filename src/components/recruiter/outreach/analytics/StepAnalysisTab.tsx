
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Phone } from 'lucide-react';

interface StepMetrics {
  step_number: number;
  step_type: string;
  sent_count: number;
  opened_count: number;
  responded_count: number;
  open_rate: number;
  response_rate: number;
}

interface SequenceMetrics {
  sequence_id: string;
  sequence_name: string;
  step_performance: StepMetrics[];
}

interface StepAnalysisTabProps {
  sequenceMetrics: SequenceMetrics[];
}

const StepAnalysisTab: React.FC<StepAnalysisTabProps> = ({ sequenceMetrics }) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'linkedin': return MessageSquare;
      case 'phone': return Phone;
      default: return Mail;
    }
  };

  return (
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
  );
};

export default StepAnalysisTab;
