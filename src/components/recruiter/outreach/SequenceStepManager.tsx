
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, MessageSquare, Mail, Phone, Linkedin } from 'lucide-react';

interface SequenceStep {
  id: string;
  type: 'email' | 'linkedin' | 'phone' | 'sms';
  delay_days: number;
  subject?: string;
  content: string;
  personalization_variables: string[];
  trigger_conditions?: string[];
  a_b_test_variant?: 'A' | 'B';
}

interface SequenceStepManagerProps {
  steps: SequenceStep[];
  onAddStep: () => void;
  onUpdateStep: (stepId: string, updates: Partial<SequenceStep>) => void;
  onRemoveStep: (stepId: string) => void;
}

const SequenceStepManager: React.FC<SequenceStepManagerProps> = ({
  steps,
  onAddStep,
  onUpdateStep,
  onRemoveStep
}) => {
  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'linkedin': return Linkedin;
      case 'phone': return Phone;
      case 'sms': return MessageSquare;
      default: return Mail;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Sequence Steps</span>
          <Button onClick={onAddStep} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Step
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => {
          const IconComponent = getChannelIcon(step.type);
          return (
            <Card key={step.id} className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Step {index + 1}</h4>
                    <p className="text-sm text-gray-500">
                      {step.delay_days === 0 ? 'Immediate' : `${step.delay_days} days after previous step`}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveStep(step.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Channel</label>
                  <Select
                    value={step.type}
                    onValueChange={(value) => onUpdateStep(step.id, { type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Delay (days)</label>
                  <Input
                    type="number"
                    value={step.delay_days}
                    onChange={(e) => onUpdateStep(step.id, { delay_days: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
              </div>

              {(step.type === 'email' || step.type === 'linkedin') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    value={step.subject || ''}
                    onChange={(e) => onUpdateStep(step.id, { subject: e.target.value })}
                    placeholder="Enter subject line..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Message Content</label>
                <Textarea
                  value={step.content}
                  onChange={(e) => onUpdateStep(step.id, { content: e.target.value })}
                  placeholder="Enter your message content. Use {{variable_name}} for personalization..."
                  rows={4}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">{'{{candidate_name}}'}</Badge>
                <Badge variant="outline" className="text-xs">{'{{current_title}}'}</Badge>
                <Badge variant="outline" className="text-xs">{'{{company_name}}'}</Badge>
                <Badge variant="outline" className="text-xs">{'{{skills}}'}</Badge>
                <Badge variant="outline" className="text-xs">{'{{recent_achievement}}'}</Badge>
              </div>
            </Card>
          );
        })}

        {steps.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No steps added yet. Click "Add Step" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SequenceStepManager;
