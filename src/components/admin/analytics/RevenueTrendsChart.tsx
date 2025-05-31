
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const RevenueTrendsChart: React.FC = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000, customers: 12, churn: 5 },
    { month: 'Feb', revenue: 52000, customers: 15, churn: 3 },
    { month: 'Mar', revenue: 61000, customers: 18, churn: 4 },
    { month: 'Apr', revenue: 58000, customers: 17, churn: 6 },
    { month: 'May', revenue: 67000, customers: 21, churn: 2 },
    { month: 'Jun', revenue: 74000, customers: 24, churn: 3 }
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#8884d8",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueTrendsChart;
