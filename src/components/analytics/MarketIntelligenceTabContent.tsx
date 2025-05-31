
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarketIntelligence } from '@/types/predictive-analytics';
import { TrendingUp, TrendingDown, DollarSign, Users, Zap } from 'lucide-react';

interface MarketIntelligenceTabContentProps {
  marketData: MarketIntelligence | null;
}

const MarketIntelligenceTabContent: React.FC<MarketIntelligenceTabContentProps> = ({ marketData }) => {
  if (!marketData) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Loading market intelligence data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Skill Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-orange-600" />
            <span>Skill Demand Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketData.skill_demand_trends.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{skill.skill}</h4>
                  <Badge variant={skill.demand_change > 0 ? "default" : "secondary"}>
                    {skill.demand_change > 0 ? '+' : ''}{skill.demand_change}%
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Popularity: {skill.popularity_score}%</p>
                  <p>Projected Growth: {skill.projected_growth}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Salary Benchmarks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketData.salary_benchmarks.map((benchmark, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">{benchmark.role}</h4>
                    <p className="text-sm text-gray-600">{benchmark.location}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {benchmark.trend === 'increasing' && <TrendingUp className="h-4 w-4 text-green-600" />}
                    {benchmark.trend === 'decreasing' && <TrendingDown className="h-4 w-4 text-red-600" />}
                    <span className="text-sm">{benchmark.trend}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Min</p>
                    <p className="font-medium">${benchmark.min_salary.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Median</p>
                    <p className="font-medium">${benchmark.median_salary.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Max</p>
                    <p className="font-medium">${benchmark.max_salary.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competition Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span>Competition Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketData.competition_analysis.map((competitor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{competitor.company}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Hiring Activity</p>
                    <p className="font-medium">{competitor.hiring_activity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Retention</p>
                    <p className="font-medium">{competitor.talent_retention}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Market Share</p>
                    <p className="font-medium">{competitor.market_share}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Strength</p>
                    <p className="font-medium">{competitor.competitive_strength}%</p>
                  </div>
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
