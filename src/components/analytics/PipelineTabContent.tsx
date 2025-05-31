
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Target, Users } from 'lucide-react';

const PipelineTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">24.5</p>
            <p className="text-sm text-gray-600">Avg. Days to Hire</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">68%</p>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-gray-600">Active Candidates</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineTabContent;
