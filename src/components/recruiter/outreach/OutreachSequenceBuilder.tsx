
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Trash2, 
  Clock, 
  MessageSquare, 
  Mail, 
  Phone, 
  Linkedin,
  Zap,
  BarChart3,
  Save,
  Play
} from 'lucide-react';

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

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'linkedin': return Linkedin;
      case 'phone': return Phone;
      case 'sms': return MessageSquare;
      default: return Mail;
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
                  selectedSequence?.id === sequence.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedSequence(sequence)}
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Sequence Steps</span>
                      <Button onClick={addSequenceStep} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Step
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentSteps.map((step, index) => {
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
                              onClick={() => removeSequenceStep(step.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Channel</label>
                              <Select
                                value={step.type}
                                onValueChange={(value) => updateSequenceStep(step.id, { type: value as any })}
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
                                onChange={(e) => updateSequenceStep(step.id, { delay_days: parseInt(e.target.value) || 0 })}
                                min="0"
                              />
                            </div>
                          </div>

                          {(step.type === 'email' || step.type === 'linkedin') && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium mb-2">Subject</label>
                              <Input
                                value={step.subject || ''}
                                onChange={(e) => updateSequenceStep(step.id, { subject: e.target.value })}
                                placeholder="Enter subject line..."
                              />
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium mb-2">Message Content</label>
                            <Textarea
                              value={step.content}
                              onChange={(e) => updateSequenceStep(step.id, { content: e.target.value })}
                              placeholder="Enter your message content. Use {{variable_name}} for personalization..."
                              rows={4}
                            />
                          </div>

                          <div className="mt-3 flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">{{candidate_name}}</Badge>
                            <Badge variant="outline" className="text-xs">{{current_title}}</Badge>
                            <Badge variant="outline" className="text-xs">{{company_name}}</Badge>
                            <Badge variant="outline" className="text-xs">{{skills}}</Badge>
                            <Badge variant="outline" className="text-xs">{{recent_achievement}}</Badge>
                          </div>
                        </Card>
                      );
                    })}

                    {currentSteps.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No steps added yet. Click "Add Step" to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sequence Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Sequence Name</label>
                      <Input
                        value={currentSequence.name || ''}
                        onChange={(e) => {
                          if (selectedSequence) {
                            setSelectedSequence({ ...selectedSequence, name: e.target.value });
                          } else if (isCreating) {
                            setNewSequence({ ...newSequence, name: e.target.value });
                          }
                        }}
                        placeholder="Enter sequence name..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={currentSequence.description || ''}
                        onChange={(e) => {
                          if (selectedSequence) {
                            setSelectedSequence({ ...selectedSequence, description: e.target.value });
                          } else if (isCreating) {
                            setNewSequence({ ...newSequence, description: e.target.value });
                          }
                        }}
                        placeholder="Describe the purpose of this sequence..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Target Industry</label>
                        <Select
                          value={currentSequence.industry || ''}
                          onValueChange={(value) => {
                            if (selectedSequence) {
                              setSelectedSequence({ ...selectedSequence, industry: value });
                            } else if (isCreating) {
                              setNewSequence({ ...newSequence, industry: value });
                            }
                          }}
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
                          value={currentSequence.experience_level || ''}
                          onValueChange={(value) => {
                            if (selectedSequence) {
                              setSelectedSequence({ ...selectedSequence, experience_level: value });
                            } else if (isCreating) {
                              setNewSequence({ ...newSequence, experience_level: value });
                            }
                          }}
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

                    {selectedSequence && (
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-medium mb-2">Active Status</label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={selectedSequence.is_active}
                              onCheckedChange={(checked) => 
                                setSelectedSequence({ ...selectedSequence, is_active: checked })
                              }
                            />
                            <span className="text-sm text-gray-600">
                              {selectedSequence.is_active ? 'Active' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Performance Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSequence ? (
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {selectedSequence.success_metrics.open_rate}%
                          </div>
                          <p className="text-sm text-gray-600">Open Rate</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {selectedSequence.success_metrics.response_rate}%
                          </div>
                          <p className="text-sm text-gray-600">Response Rate</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {selectedSequence.success_metrics.conversion_rate}%
                          </div>
                          <p className="text-sm text-gray-600">Conversion Rate</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Save the sequence to view analytics.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
