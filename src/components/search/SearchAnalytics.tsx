
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, TrendingUp, Activity } from 'lucide-react';
import { useSearchPerformance } from '@/hooks/useSearchPerformance';

const SearchAnalytics = () => {
  const { 
    metrics, 
    getAverageSearchTime, 
    getAverageQualityScore 
  } = useSearchPerformance();

  const averageSearchTime = getAverageSearchTime();
  const averageQualityScore = getAverageQualityScore();
  const totalSearches = metrics.length;

  if (totalSearches === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Activity className="h-8 w-8 mx-auto mb-2" />
            <p>No search analytics available yet.</p>
            <p className="text-sm">Perform some searches to see performance metrics.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            Average Search Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageSearchTime.toFixed(0)}ms</div>
          <Badge variant="secondary" className="mt-1">
            Last {totalSearches} searches
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Target className="h-4 w-4 mr-2 text-green-500" />
            Average Quality Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(averageQualityScore * 100).toFixed(1)}%</div>
          <Badge variant="secondary" className="mt-1">
            AI confidence
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
            Total Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSearches}</div>
          <Badge variant="secondary" className="mt-1">
            This session
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchAnalytics;
