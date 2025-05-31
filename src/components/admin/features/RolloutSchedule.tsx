
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

const RolloutSchedule: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Scheduled Rollouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-blue-900">Predictive Analytics Beta</p>
              <p className="text-sm text-blue-700">Scheduled for rollout to Enterprise customers</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-900">Tomorrow, 10:00 AM</p>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">Pending</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-green-900">Integration Hub Stable</p>
              <p className="text-sm text-green-700">Full release to all customers</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-900">Next Week</p>
              <Badge variant="outline" className="bg-green-100 text-green-800">Scheduled</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RolloutSchedule;
