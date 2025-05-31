
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { MarketIntelligence } from '@/types/predictive-analytics';

interface MarketIntelligenceTabContentProps {
  marketData: MarketIntelligence | null;
}

const MarketIntelligenceTabContent: React.FC<MarketIntelligenceTabContentProps> = ({ marketData }) => {
  const skillDemandData = marketData?.skill_demand_trends.map(skill => ({
    name: skill.skill,
    demand: skill.demand_change,
    growth: skill.projected_growth
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Skill Demand Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillDemandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#8884d8" />
              <Bar dataKey="growth" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salary Benchmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketData?.salary_benchmarks.map((benchmark, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{benchmark.role}</h3>
                  <Badge className={
                    benchmark.trend === 'increasing' ? 'bg-green-100 text-green-800' :
                    benchmark.trend === 'decreasing' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {benchmark.trend}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{benchmark.location}</p>
                <div className="flex justify-between text-sm">
                  <span>Min: ${benchmark.min_salary.toLocaleString()}</span>
                  <span>Median: ${benchmark.median_salary.toLocaleString()}</span>
                  <span>Max: ${benchmark.max_salary.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketIntelligenceTabContent;
