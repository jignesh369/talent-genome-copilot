
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SourceEffectivenessPanel: React.FC = () => {
  const sourceEffectivenessData = [
    { source: 'LinkedIn', applications: 450, hires: 8, cost: 1200, quality: 89 },
    { source: 'Indeed', applications: 320, hires: 5, cost: 800, quality: 76 },
    { source: 'Referrals', applications: 180, hires: 3, cost: 450, quality: 94 },
    { source: 'Company Website', applications: 220, hires: 2, cost: 200, quality: 82 },
    { source: 'Glassdoor', applications: 80, hires: 0, cost: 300, quality: 65 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Source Effectiveness</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sourceEffectivenessData.map((source, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{source.source}</h3>
                <Badge variant="outline">Quality: {source.quality}%</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Applications</p>
                  <p className="font-semibold">{source.applications}</p>
                </div>
                <div>
                  <p className="text-gray-600">Hires</p>
                  <p className="font-semibold">{source.hires}</p>
                </div>
                <div>
                  <p className="text-gray-600">Cost</p>
                  <p className="font-semibold">${source.cost}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceEffectivenessPanel;
