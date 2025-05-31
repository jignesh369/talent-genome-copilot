
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown } from 'lucide-react';

const PredictionsTabContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Hiring Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Next 30 Days</h3>
              <p className="text-2xl font-bold text-green-900">8-12 hires</p>
              <p className="text-sm text-green-700">Based on current pipeline velocity</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Pipeline Quality</h3>
              <p className="text-2xl font-bold text-blue-900">87%</p>
              <p className="text-sm text-blue-700">Above industry average</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Interview Stage Bottleneck</span>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Declining Response Rates</span>
              </div>
              <Badge className="bg-red-100 text-red-800">High Risk</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionsTabContent;
