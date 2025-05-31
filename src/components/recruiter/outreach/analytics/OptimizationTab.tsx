
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';

const OptimizationTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Optimization Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Optimize Email Subject Lines</h4>
              <p className="text-sm text-yellow-800 mt-1">
                Your email open rates are 15% below industry average. Consider A/B testing different subject line approaches.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Timing Optimization</h4>
              <p className="text-sm text-blue-800 mt-1">
                Send LinkedIn messages on Tuesday-Thursday between 10-11 AM for 23% higher response rates.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900">High-Performing Template</h4>
              <p className="text-sm text-green-800 mt-1">
                Your "Senior Developer Outreach" sequence has a 28% response rate. Consider adapting this approach for other roles.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimizationTab;
