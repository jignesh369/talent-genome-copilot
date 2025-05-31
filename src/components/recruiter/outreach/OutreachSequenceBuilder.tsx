
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, Play, Zap } from 'lucide-react';
import SequenceList from './SequenceList';
import SequenceStepManager from './SequenceStepManager';
import SequenceSettings from './SequenceSettings';
import SequenceAnalytics from './SequenceAnalytics';

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

interface OutreachSequence {
  id: string;
  name: string;
  description: string;
  target_persona: string;
  industry: string;
  experience_level: string;
  steps: SequenceStep[];
  is_active: boolean;
  success_metrics: {
    open_rate: number;
    response_rate: number;
    conversion_rate: number;
  };
}

const OutreachSequenceBuilder: React.FC = () => {
  const [sequences, setSequences] = useState<OutreachSequence[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<OutreachSequence | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newSequence, setNewSequence] = useState<Partial<OutreachSequence>>({
    name: '',
    description: '',
    target_persona: '',
    industry: '',
    experience_level: '',
    steps: [],
    is_active: false
  });

  const addSequenceStep = () => {
    const newStep: SequenceStep = {
      id: Date.now().toString(),
      type: 'email',
      delay_days: 0,
      content: '',
      personalization_variables: []
    };

    if (selectedSequence) {
      setSelectedSequence({
        ...selectedSequence,
        steps: [...selectedSequence.steps, newStep]
      });
    } else if (isCreating) {
      setNewSequence({
        ...newSequence,
        steps: [...(newSequence.steps || []), newStep]
      });
    }
  };

  const updateSequenceStep = (stepId: string, updates: Partial<SequenceStep>) => {
    if (selectedSequence) {
      setSelectedSequence({
        ...selectedSequence,
        steps: selectedSequence.steps.map(step => 
          step.id === stepId ? { ...step, ...updates } : step
        )
      });
    } else if (isCreating) {
      setNewSequence({
        ...newSequence,
        steps: (newSequence.steps || []).map(step => 
          step.id === stepId ? { ...step, ...updates } : step
        )
      });
    }
  };

  const removeSequenceStep = (stepId: string) => {
    if (selectedSequence) {
      setSelectedSequence({
        ...selectedSequence,
        steps: selectedSequence.steps.filter(step => step.id !== stepId)
      });
    } else if (isCreating) {
      setNewSequence({
        ...newSequence,
        steps: (newSequence.steps || []).filter(step => step.id !== stepId)
      });
    }
  };

  const updateSequenceSettings = (updates: Partial<OutreachSequence>) => {
    if (selectedSequence) {
      setSelectedSequence({ ...selectedSequence, ...updates });
    } else if (isCreating) {
      setNewSequence({ ...newSequence, ...updates });
    }
  };

  const saveSequence = () => {
    if (isCreating && newSequence.name) {
      const sequence: OutreachSequence = {
        id: Date.now().toString(),
        name: newSequence.name,
        description: newSequence.description || '',
        target_persona: newSequence.target_persona || '',
        industry: newSequence.industry || '',
        experience_level: newSequence.experience_level || '',
        steps: newSequence.steps || [],
        is_active: false,
        success_metrics: {
          open_rate: 0,
          response_rate: 0,
          conversion_rate: 0
        }
      };
      
      setSequences([...sequences, sequence]);
      setIsCreating(false);
      setNewSequence({});
      setSelectedSequence(sequence);
    }
  };

  const currentSequence = selectedSequence || (isCreating ? newSequence : null);
  const currentSteps = currentSequence?.steps || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Outreach Sequence Builder</h2>
          <p className="text-gray-600">Create personalized multi-step outreach campaigns</p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="w-4 h-4 mr-2" />
          New Sequence
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sequence List */}
        <SequenceList
          sequences={sequences}
          selectedSequenceId={selectedSequence?.id}
          onSelectSequence={setSelectedSequence}
          isCreating={isCreating}
        />

        {/* Sequence Builder */}
        <div className="lg:col-span-2">
          {currentSequence ? (
            <Tabs defaultValue="builder">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="builder">Sequence Builder</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="builder" className="space-y-4">
                <SequenceStepManager
                  steps={currentSteps}
                  onAddStep={addSequenceStep}
                  onUpdateStep={updateSequenceStep}
                  onRemoveStep={removeSequenceStep}
                />
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <SequenceSettings
                  sequence={currentSequence}
                  onUpdateSequence={updateSequenceSettings}
                  showActiveToggle={!!selectedSequence}
                />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <SequenceAnalytics
                  metrics={selectedSequence?.success_metrics}
                  hasSequence={!!selectedSequence}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a sequence or create a new one
                </h3>
                <p className="text-gray-600 mb-4">
                  Build personalized outreach sequences to engage candidates effectively
                </p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Sequence
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {(isCreating || selectedSequence) && (
        <div className="flex justify-end space-x-2">
          {isCreating && (
            <>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={saveSequence} disabled={!newSequence.name}>
                <Save className="w-4 h-4 mr-2" />
                Save Sequence
              </Button>
            </>
          )}
          {selectedSequence && (
            <Button className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Launch Sequence
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OutreachSequenceBuilder;
