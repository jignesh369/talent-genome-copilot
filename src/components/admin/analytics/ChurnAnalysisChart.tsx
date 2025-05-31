
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const ChurnAnalysisChart: React.FC = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000, customers: 12, churn: 5 },
    { month: 'Feb', revenue: 52000, customers: 15, churn: 3 },
    { month: 'Mar', revenue: 61000, customers: 18, churn: 4 },
    { month: 'Apr', revenue: 58000, customers: 17, churn: 6 },
    { month: 'May', revenue: 67000, customers: 21, churn: 2 },
    { month: 'Jun', revenue: 74000, customers: 24, churn: 3 }
  ];

  const chartConfig = {
    churn: {
      label: "Churn",
      color: "#ffc658",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Churn Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="churn" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChurnAnalysisChart;
