
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Database, PieChart } from 'lucide-react';

const QuickActionsGrid: React.FC = () => {
  const quickActions = [
    {
      title: 'System Configuration',
      description: 'Configure platform settings, security, and feature flags.',
      icon: Settings,
      color: 'text-blue-600',
      action: () => {}
    },
    {
      title: 'Integration Management', 
      description: 'Manage calendar, email, and ATS integrations.',
      icon: Database,
      color: 'text-green-600',
      action: () => {}
    },
    {
      title: 'Usage Analytics',
      description: 'Monitor team usage, costs, and performance metrics.',
      icon: PieChart,
      color: 'text-purple-600',
      action: () => {}
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {quickActions.map((action, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <action.icon className={`w-5 h-5 mr-2 ${action.color}`} />
              {action.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{action.description}</p>
            <Button className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActionsGrid;
