
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const HiringFunnelChart: React.FC = () => {
  const hiringFunnelData = [
    { stage: 'Applications', count: 1250, conversion: 100 },
    { stage: 'Screening', count: 423, conversion: 33.8 },
    { stage: 'Phone Interview', count: 187, conversion: 44.2 },
    { stage: 'Technical', count: 89, conversion: 47.6 },
    { stage: 'Final Interview', count: 45, conversion: 50.6 },
    { stage: 'Offer', count: 23, conversion: 51.1 },
    { stage: 'Hired', count: 18, conversion: 78.3 }
  ];

  const chartConfig = {
    count: { label: "Count", color: "#8884d8" },
    conversion: { label: "Conversion", color: "#82ca9d" }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiring Funnel Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hiringFunnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Area type="monotone" dataKey="conversion" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default HiringFunnelChart;
