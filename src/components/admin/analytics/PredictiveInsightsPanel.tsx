
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target, Clock } from 'lucide-react';

const PredictiveInsightsPanel: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictive Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">Hiring Forecast</h3>
                <p className="text-sm text-blue-700">Based on current trends, you're projected to hire 28 candidates next month (+12% vs this month)</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Quality Improvement</h3>
                <p className="text-sm text-green-700">Focusing on LinkedIn and Referrals could improve overall hire quality by 8%</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <h3 className="font-semibold text-orange-900">Process Optimization</h3>
                <p className="text-sm text-orange-700">Streamlining technical interviews could reduce time-to-hire by 3-4 days</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveInsightsPanel;
