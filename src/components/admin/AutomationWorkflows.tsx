
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Edit,
  Trash2,
  ArrowRight,
  Clock,
  Users,
  Mail,
  Calendar
} from 'lucide-react';

const AutomationWorkflows = () => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState([
    {
      id: '1',
      name: 'Welcome New Candidates',
      description: 'Automatically send welcome email and schedule initial screening',
      trigger: 'Candidate Application',
      actions: ['Send Email', 'Create Task', 'Schedule Interview'],
      status: 'active',
      executionCount: 47,
      lastExecuted: '2 hours ago'
    },
    {
      id: '2',
      name: 'Interview Follow-up',
      description: 'Send feedback request and next steps after interviews',
      trigger: 'Interview Completed',
      actions: ['Send Feedback Form', 'Update Pipeline', 'Notify Hiring Manager'],
      status: 'active',
      executionCount: 23,
      lastExecuted: '4 hours ago'
    },
    {
      id: '3',
      name: 'Candidate Nurturing',
      description: 'Regular check-ins with passive candidates',
      trigger: 'Scheduled Event',
      actions: ['Send Update Email', 'Log Activity'],
      status: 'paused',
      executionCount: 156,
      lastExecuted: '2 days ago'
    }
  ]);

  const handleToggleWorkflow = (id: string) => {
    setWorkflows(prev =>
      prev.map(workflow =>
        workflow.id === id
          ? { ...workflow, status: workflow.status === 'active' ? 'paused' : 'active' }
          : workflow
      )
    );
    
    const workflow = workflows.find(w => w.id === id);
    toast({
      title: workflow?.status === 'active' ? "Workflow Paused" : "Workflow Activated",
      description: `${workflow?.name} has been ${workflow?.status === 'active' ? 'paused' : 'activated'}.`,
    });
  };

  const handleEditWorkflow = (name: string) => {
    toast({
      title: "Edit Workflow",
      description: `Opening workflow editor for ${name}...`,
    });
  };

  const handleDeleteWorkflow = (id: string, name: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
    toast({
      title: "Workflow Deleted",
      description: `${name} has been deleted successfully.`,
    });
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'Candidate Application':
        return Users;
      case 'Interview Completed':
        return Calendar;
      case 'Scheduled Event':
        return Clock;
      default:
        return Zap;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Automation & Workflows</h3>
          <p className="text-sm text-gray-600">Create intelligent workflows to automate your recruiting processes</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                <p className="text-3xl font-bold text-gray-900">
                  {workflows.filter(w => w.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Executions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {workflows.reduce((sum, w) => sum + w.executionCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-3xl font-bold text-gray-900">24h</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {workflows.map((workflow) => {
          const TriggerIcon = getTriggerIcon(workflow.trigger);
          return (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <TriggerIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{workflow.name}</CardTitle>
                      <p className="text-sm text-gray-600">{workflow.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={workflow.status === 'active'}
                      onCheckedChange={() => handleToggleWorkflow(workflow.id)}
                    />
                    <Button variant="ghost" size="sm" onClick={() => handleEditWorkflow(workflow.name)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteWorkflow(workflow.id, workflow.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{workflow.trigger}</Badge>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <div className="flex items-center space-x-1">
                      {workflow.actions.map((action, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Executed {workflow.executionCount} times</span>
                    <span>Last run: {workflow.lastExecuted}</span>
                    <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                      {workflow.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AutomationWorkflows;
