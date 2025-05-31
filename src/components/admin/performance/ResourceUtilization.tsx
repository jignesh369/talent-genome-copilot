
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cpu, TrendingUp, TrendingDown } from 'lucide-react';

interface ResourceUtilizationProps {
  resources: any[];
}

const ResourceUtilization: React.FC<ResourceUtilizationProps> = ({ resources }) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center text-sm lg:text-base">
          <Cpu className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
          <span className="truncate">Resource Utilization</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 lg:p-6">
        <div className="space-y-4 lg:space-y-6">
          {resources.map((resource, index) => (
            <div key={index} className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm lg:text-base truncate mr-2">{resource.name}</span>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-xs lg:text-sm text-gray-600">
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
                className="h-2 w-full"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUtilization;
