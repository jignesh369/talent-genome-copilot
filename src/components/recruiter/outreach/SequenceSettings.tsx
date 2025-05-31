
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface OutreachSequence {
  id?: string;
  name?: string;
  description?: string;
  target_persona?: string;
  industry?: string;
  experience_level?: string;
  is_active?: boolean;
}

interface SequenceSettingsProps {
  sequence: OutreachSequence;
  onUpdateSequence: (updates: Partial<OutreachSequence>) => void;
  showActiveToggle?: boolean;
}

const SequenceSettings: React.FC<SequenceSettingsProps> = ({
  sequence,
  onUpdateSequence,
  showActiveToggle = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sequence Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Sequence Name</label>
          <Input
            value={sequence.name || ''}
            onChange={(e) => onUpdateSequence({ name: e.target.value })}
            placeholder="Enter sequence name..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={sequence.description || ''}
            onChange={(e) => onUpdateSequence({ description: e.target.value })}
            placeholder="Describe the purpose of this sequence..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Target Industry</label>
            <Select
              value={sequence.industry || ''}
              onValueChange={(value) => onUpdateSequence({ industry: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Experience Level</label>
            <Select
              value={sequence.experience_level || ''}
              onValueChange={(value) => onUpdateSequence({ experience_level: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showActiveToggle && (
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium mb-2">Active Status</label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={sequence.is_active || false}
                  onCheckedChange={(checked) => onUpdateSequence({ is_active: checked })}
                />
                <span className="text-sm text-gray-600">
                  {sequence.is_active ? 'Active' : 'Draft'}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SequenceSettings;
