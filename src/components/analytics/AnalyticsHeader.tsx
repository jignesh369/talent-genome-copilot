
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const AnalyticsHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
        <p className="text-gray-600">AI-powered insights and predictive intelligence</p>
      </div>
      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Brain className="h-4 w-4 mr-2" />
        Generate New Insights
      </Button>
    </div>
  );
};

export default AnalyticsHeader;
