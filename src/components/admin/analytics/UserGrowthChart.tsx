
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const UserGrowthChart: React.FC = () => {
  const userGrowthData = [
    { month: 'Jan', totalUsers: 347, newUsers: 45, activeUsers: 298 },
    { month: 'Feb', totalUsers: 412, newUsers: 65, activeUsers: 356 },
    { month: 'Mar', totalUsers: 489, newUsers: 77, activeUsers: 423 },
    { month: 'Apr', totalUsers: 534, newUsers: 45, activeUsers: 467 },
    { month: 'May', totalUsers: 612, newUsers: 78, activeUsers: 534 },
    { month: 'Jun', totalUsers: 689, newUsers: 77, activeUsers: 601 }
  ];

  const chartConfig = {
    newUsers: {
      label: "New Users",
      color: "#82ca9d",
    },
    activeUsers: {
      label: "Active Users",
      color: "#8884d8",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="newUsers" fill="#82ca9d" />
              <Bar dataKey="activeUsers" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;
