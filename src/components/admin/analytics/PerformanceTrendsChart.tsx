
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const PerformanceTrendsChart: React.FC = () => {
  const performanceTrendsData = [
    { month: 'Jan', hires: 15, timeToHire: 22, costPerHire: 3200, qualityScore: 82 },
    { month: 'Feb', hires: 18, timeToHire: 20, costPerHire: 3100, qualityScore: 85 },
    { month: 'Mar', hires: 22, timeToHire: 19, costPerHire: 2900, qualityScore: 87 },
    { month: 'Apr', hires: 19, timeToHire: 21, costPerHire: 3050, qualityScore: 84 },
    { month: 'May', hires: 25, timeToHire: 18, costPerHire: 2850, qualityScore: 89 },
    { month: 'Jun', hires: 23, timeToHire: 17, costPerHire: 2750, qualityScore: 91 }
  ];

  const chartConfig = {
    hires: { label: "Hires", color: "#8884d8" },
    timeToHire: { label: "Time to Hire", color: "#82ca9d" },
    qualityScore: { label: "Quality Score", color: "#ff7300" }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="hires" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="timeToHire" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="qualityScore" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrendsChart;
