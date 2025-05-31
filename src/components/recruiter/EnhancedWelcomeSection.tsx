
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, MessageSquare, TrendingUp, Zap } from 'lucide-react';

interface EnhancedWelcomeSectionProps {
  userName?: string;
  onCreateJob: () => void;
}

const EnhancedWelcomeSection: React.FC<EnhancedWelcomeSectionProps> = ({ 
  userName, 
  onCreateJob 
}) => {
  const quickActions = [
    {
      label: "Create Job",
      icon: Plus,
      action: onCreateJob,
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Post a new position"
    },
    {
      label: "Schedule Interview",
      icon: Calendar,
      action: () => console.log('Schedule interview'),
      color: "bg-green-600 hover:bg-green-700",
      description: "Book candidate meetings"
    },
    {
      label: "Send Message",
      icon: MessageSquare,
      action: () => console.log('Send message'),
      color: "bg-purple-600 hover:bg-purple-700",
      description: "Reach out to candidates"
    }
  ];

  const todayStats = [
    { label: "New Applications", value: "24", trend: "+15%" },
    { label: "Interviews Today", value: "3", trend: "+2" },
    { label: "Active Candidates", value: "156", trend: "+8%" }
  ];

  return (
    <div className="space-y-6">
      {/* Main Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {userName || 'Recruiter'}! 👋
                </h1>
                <p className="text-blue-100 text-lg mb-4">
                  Ready to find exceptional talent today?
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Zap className="h-3 w-3 mr-1" />
                    AI-Powered
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    High Performance
                  </Badge>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-white/80" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        </CardContent>
      </Card>

      {/* Quick Actions & Today's Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`w-full justify-start space-x-3 ${action.color} text-white`}
                  size="lg"
                >
                  <action.icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm opacity-90">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Stats */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Today's Activity</h3>
            <div className="space-y-4">
              {todayStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{stat.label}</span>
                  <div className="text-right">
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-sm text-green-600">{stat.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedWelcomeSection;
