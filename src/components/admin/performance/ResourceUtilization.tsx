
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cpu, TrendingUp, TrendingDown } from 'lucide-react';

interface ResourceUtilizationProps {
  resources: any[];
}

const ResourceUtilization: React.FC<ResourceUtilizationProps> = ({ resources }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cpu className="w-5 h-5 mr-2" />
          Resource Utilization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resources.map((resource, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{resource.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {resource.current}%
                  </span>
                  <div className="flex items-center">
                    {resource.trend > 0 ? (
                      <TrendingUp className="w-3 h-3 text-red-600" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-green-600" />
                    )}
                    <span className={`text-xs ml-1 ${resource.trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {Math.abs(resource.trend)}%
                    </span>
                  </div>
                </div>
              </div>
              <Progress 
                value={resource.current} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUtilization;
