
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Calendar } from 'lucide-react';

const GoalTrackingCard = () => {
  const goals = [
    {
      title: "Monthly Hires",
      current: 8,
      target: 12,
      progress: 67,
      timeLeft: "15 days left",
      trend: "up",
      icon: Target
    },
    {
      title: "Pipeline Health",
      current: 156,
      target: 200,
      progress: 78,
      timeLeft: "On track",
      trend: "up",
      icon: TrendingUp
    },
    {
      title: "Time to Hire",
      current: 18,
      target: 15,
      progress: 83,
      timeLeft: "3 days over",
      trend: "down",
      icon: Calendar
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-green-600" />
          <span>Goal Tracking</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <goal.icon className="h-4 w-4 text-gray-600" />
                <span className="font-medium">{goal.title}</span>
              </div>
              <span className="text-sm text-gray-600">{goal.timeLeft}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>{goal.current} / {goal.target}</span>
              <span className="font-medium">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GoalTrackingCard;
