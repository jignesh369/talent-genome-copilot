
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface SequenceMetrics {
  open_rate: number;
  response_rate: number;
  conversion_rate: number;
}

interface SequenceAnalyticsProps {
  metrics?: SequenceMetrics;
  hasSequence: boolean;
}

const SequenceAnalytics: React.FC<SequenceAnalyticsProps> = ({
  metrics,
  hasSequence
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Performance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasSequence && metrics ? (
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {metrics.open_rate}%
              </div>
              <p className="text-sm text-gray-600">Open Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {metrics.response_rate}%
              </div>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {metrics.conversion_rate}%
              </div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Save the sequence to view analytics.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SequenceAnalytics;
