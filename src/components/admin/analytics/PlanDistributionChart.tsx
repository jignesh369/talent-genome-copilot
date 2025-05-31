
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PlanDistributionChart: React.FC = () => {
  const planDistribution = [
    { name: 'Starter', value: 40, color: '#8884d8' },
    { name: 'Professional', value: 35, color: '#82ca9d' },
    { name: 'Enterprise', value: 25, color: '#ffc658' }
  ];

  const chartConfig = {
    value: {
      label: "Value",
      color: "#8884d8",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {planDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PlanDistributionChart;
