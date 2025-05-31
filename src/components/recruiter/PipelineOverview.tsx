
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

const PipelineOverview: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Current Hiring Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Applied</span>
              <span className="text-2xl font-bold text-blue-600">156</span>
            </div>
            <Progress value={100} className="h-3" />
            <p className="text-xs text-gray-500">100% conversion</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Screened</span>
              <span className="text-2xl font-bold text-green-600">89</span>
            </div>
            <Progress value={57} className="h-3" />
            <p className="text-xs text-gray-500">57% qualified</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Interviewed</span>
              <span className="text-2xl font-bold text-purple-600">34</span>
            </div>
            <Progress value={22} className="h-3" />
            <p className="text-xs text-gray-500">22% progressed</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Offers</span>
              <span className="text-2xl font-bold text-orange-600">12</span>
            </div>
            <Progress value={8} className="h-3" />
            <p className="text-xs text-gray-500">8% success rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineOverview;
