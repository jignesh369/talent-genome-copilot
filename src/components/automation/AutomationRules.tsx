
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap, 
  Plus, 
  Edit, 
  Trash2, 
  Play,
  Pause,
  Clock,
  Target,
  Filter
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'candidate_applied' | 'interview_scheduled' | 'score_threshold' | 'time_based';
    conditions: any;
  };
  actions: {
    type: 'send_email' | 'slack_notification' | 'update_status' | 'schedule_interview';
    parameters: any;
  }[];
  enabled: boolean;
  lastTriggered?: string;
  executionCount: number;
}

const AutomationRules: React.FC = () => {
  const { toast } = useToast();
  
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'High Score Candidate Alert',
      description: 'Notify team when candidate scores above 85%',
      trigger: {
        type: 'score_threshold',
        conditions: { threshold: 85 }
      },
      actions: [
        {
          type: 'slack_notification',
          parameters: { channel: '#hiring', message: 'High-scoring candidate needs review' }
        }
      ],
      enabled: true,
      lastTriggered: '2024-01-28T10:30:00Z',
      executionCount: 23
    },
    {
      id: '2',
      name: 'Application Acknowledgment',
      description: 'Send welcome email to new applicants',
      trigger: {
        type: 'candidate_applied',
        conditions: {}
      },
      actions: [
        {
          type: 'send_email',
          parameters: { template: 'welcome_email', delay: 0 }
        }
      ],
      enabled: true,
      lastTriggered: '2024-01-28T14:15:00Z',
      executionCount: 156
    },
    {
      id: '3',
      name: 'Interview Reminder',
      description: 'Send reminder 24 hours before interview',
      trigger: {
        type: 'time_based',
        conditions: { hours_before: 24 }
      },
      actions: [
        {
          type: 'send_email',
          parameters: { template: 'interview_reminder' }
        }
      ],
      enabled: false,
      executionCount: 0
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    triggerType: '',
    actionType: ''
  });

  const handleToggleRule = (id: string, enabled: boolean) => {
    setRules(prev => 
      prev.map(rule => 
        rule.id === id ? { ...rule, enabled } : rule
      )
    );
    
    const rule = rules.find(r => r.id === id);
    toast({
      title: enabled ? "Rule Enabled" : "Rule Disabled",
      description: `Automation rule "${rule?.name}" has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleDeleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
    toast({
      title: "Rule Deleted",
      description: "Automation rule has been removed.",
    });
  };

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.triggerType || !newRule.actionType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const rule: AutomationRule = {
      id: Date.now().toString(),
      name: newRule.name,
      description: newRule.description,
      trigger: {
        type: newRule.triggerType as any,
        conditions: {}
      },
      actions: [{
        type: newRule.actionType as any,
        parameters: {}
      }],
      enabled: true,
      executionCount: 0
    };

    setRules(prev => [...prev, rule]);
    setNewRule({ name: '', description: '', triggerType: '', actionType: '' });
    setShowCreateForm(false);
    
    toast({
      title: "Rule Created",
      description: `Automation rule "${rule.name}" has been created.`,
    });
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'candidate_applied':
        return <Target className="h-4 w-4" />;
      case 'time_based':
        return <Clock className="h-4 w-4" />;
      case 'score_threshold':
        return <Filter className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const formatTriggerType = (type: string) => {
    const formats = {
      'candidate_applied': 'Candidate Applied',
      'interview_scheduled': 'Interview Scheduled',
      'score_threshold': 'Score Threshold',
      'time_based': 'Time Based'
    };
    return formats[type as keyof typeof formats] || type;
  };

  const formatActionType = (type: string) => {
    const formats = {
      'send_email': 'Send Email',
      'slack_notification': 'Slack Notification',
      'update_status': 'Update Status',
      'schedule_interview': 'Schedule Interview'
    };
    return formats[type as keyof typeof formats] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Automation Rules</h2>
          <p className="text-gray-600">Create intelligent automation to streamline your recruiting process</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Automation Rule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input
                  id="ruleName"
                  value={newRule.name}
                  onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  placeholder="Enter rule name"
                />
              </div>
              <div>
                <Label htmlFor="ruleDescription">Description</Label>
                <Input
                  id="ruleDescription"
                  value={newRule.description}
                  onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                  placeholder="Describe what this rule does"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Trigger Type</Label>
                <Select 
                  value={newRule.triggerType} 
                  onValueChange={(value) => setNewRule({...newRule, triggerType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate_applied">Candidate Applied</SelectItem>
                    <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="score_threshold">Score Threshold</SelectItem>
                    <SelectItem value="time_based">Time Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Action Type</Label>
                <Select 
                  value={newRule.actionType} 
                  onValueChange={(value) => setNewRule({...newRule, actionType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="send_email">Send Email</SelectItem>
                    <SelectItem value="slack_notification">Slack Notification</SelectItem>
                    <SelectItem value="update_status">Update Status</SelectItem>
                    <SelectItem value="schedule_interview">Schedule Interview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleCreateRule}>Create Rule</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {getTriggerIcon(rule.trigger.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{rule.name}</h3>
                    <p className="text-gray-600 text-sm">{rule.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="outline">
                        Trigger: {formatTriggerType(rule.trigger.type)}
                      </Badge>
                      <Badge variant="outline">
                        Actions: {rule.actions.length}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Executed {rule.executionCount} times
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm text-gray-500">
                    {rule.lastTriggered && (
                      <div>Last triggered: {new Date(rule.lastTriggered).toLocaleDateString()}</div>
                    )}
                  </div>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={(checked) => handleToggleRule(rule.id, checked)}
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Actions:</h4>
                <div className="flex flex-wrap gap-2">
                  {rule.actions.map((action, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      {formatActionType(action.type)}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AutomationRules;
