
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target,
  Users,
  Zap
} from 'lucide-react';

interface SearchAnalyticsPanelProps {
  searchMetrics: {
    totalSearches: number;
    avgSearchTime: number;
    successRate: number;
    topQueries: string[];
    diversityScore: number;
    aiAccuracy: number;
  };
}

const SearchAnalyticsPanel: React.FC<SearchAnalyticsPanelProps> = ({ searchMetrics }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Search Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{searchMetrics.totalSearches}</div>
              <div className="text-sm text-gray-600">Total Searches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{searchMetrics.avgSearchTime}s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{searchMetrics.successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Target className="w-4 h-4 mr-2" />
              AI Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Intent Recognition</span>
                <span className="text-sm font-medium">{searchMetrics.aiAccuracy}%</span>
              </div>
              <Progress value={searchMetrics.aiAccuracy} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2" />
              Diversity Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Result Diversity</span>
                <span className="text-sm font-medium">{searchMetrics.diversityScore}%</span>
              </div>
              <Progress value={searchMetrics.diversityScore} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Popular Search Terms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {searchMetrics.topQueries.map((query, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {query}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchAnalyticsPanel;
