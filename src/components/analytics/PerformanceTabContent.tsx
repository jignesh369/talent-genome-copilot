
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const PerformanceTabContent = () => {
  const hiringVelocityData = [
    { month: 'Jan', hires: 12, applications: 150 },
    { month: 'Feb', hires: 15, applications: 180 },
    { month: 'Mar', hires: 18, applications: 200 },
    { month: 'Apr', hires: 22, applications: 220 },
    { month: 'May', hires: 25, applications: 250 },
    { month: 'Jun', hires: 28, applications: 280 }
  ];

  const pipelineData = [
    { stage: 'Sourced', candidates: 45, color: '#8884d8' },
    { stage: 'Qualified', candidates: 32, color: '#82ca9d' },
    { stage: 'Interviewing', candidates: 18, color: '#ffc658' },
    { stage: 'Offer', candidates: 8, color: '#ff7300' },
    { stage: 'Hired', candidates: 5, color: '#00ff00' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Hiring Velocity Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hiringVelocityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hires" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="applications" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={pipelineData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="candidates"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pipelineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTabContent;
