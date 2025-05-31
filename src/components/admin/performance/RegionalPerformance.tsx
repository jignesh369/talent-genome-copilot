
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

interface RegionalPerformanceProps {
  regionalData: any[];
}

const RegionalPerformance: React.FC<RegionalPerformanceProps> = ({ regionalData }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Regional Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regionalData.map((region, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">{region.region}</h3>
                <p className="text-sm text-gray-600">{region.users} active users</p>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(region.status)}>
                  {region.status}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">{region.latency}ms avg</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalPerformance;
