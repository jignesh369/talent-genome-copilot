
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OutreachSequence {
  id: string;
  name: string;
  description: string;
  target_persona: string;
  industry: string;
  experience_level: string;
  steps: any[];
  is_active: boolean;
  success_metrics: {
    open_rate: number;
    response_rate: number;
    conversion_rate: number;
  };
}

interface SequenceListProps {
  sequences: OutreachSequence[];
  selectedSequenceId?: string;
  onSelectSequence: (sequence: OutreachSequence) => void;
  isCreating: boolean;
}

const SequenceList: React.FC<SequenceListProps> = ({
  sequences,
  selectedSequenceId,
  onSelectSequence,
  isCreating
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sequences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isCreating && (
          <div className="p-3 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-900">New Sequence</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">Draft</Badge>
            </div>
          </div>
        )}
        {sequences.map((sequence) => (
          <div
            key={sequence.id}
            className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
              selectedSequenceId === sequence.id ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => onSelectSequence(sequence)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{sequence.name}</h3>
              <Badge className={sequence.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {sequence.is_active ? 'Active' : 'Draft'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{sequence.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{sequence.steps.length} steps</span>
              <span>{sequence.success_metrics.response_rate}% response rate</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SequenceList;
