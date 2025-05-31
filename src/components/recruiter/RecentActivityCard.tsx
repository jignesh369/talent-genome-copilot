
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, CheckCircle, Target } from 'lucide-react';

interface Activity {
  candidate: string;
  action: string;
  time: string;
  score?: number;
  avatar: string;
  status: string;
}

const RecentActivityCard: React.FC = () => {
  const recentActivity: Activity[] = [
    { 
      candidate: "Sarah Chen", 
      action: "Assessment Completed", 
      time: "2 hours ago", 
      score: 92,
      avatar: "SC",
      status: "excellent"
    },
    { 
      candidate: "Marcus Rodriguez", 
      action: "Interview Scheduled", 
      time: "4 hours ago", 
      score: undefined,
      avatar: "MR",
      status: "pending"
    },
    { 
      candidate: "Priya Sharma", 
      action: "Background Check Complete", 
      time: "6 hours ago", 
      score: undefined,
      avatar: "PS",
      status: "verified"
    },
    { 
      candidate: "James Wilson", 
      action: "Offer Extended", 
      time: "1 day ago", 
      score: undefined,
      avatar: "JW",
      status: "offer"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <Star className="h-4 w-4 text-yellow-500" />;
      case "verified": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "offer": return <Target className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm text-gray-900 truncate">{activity.candidate}</p>
                {getStatusIcon(activity.status)}
              </div>
              <p className="text-xs text-gray-600 mb-1">{activity.action}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{activity.time}</p>
                {activity.score && (
                  <Badge variant="secondary" className="text-xs">
                    {activity.score}%
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
