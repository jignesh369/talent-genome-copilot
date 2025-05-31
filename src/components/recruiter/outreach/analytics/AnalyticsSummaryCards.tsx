
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users,
  MessageSquare, 
  Target,
  CheckCircle
} from 'lucide-react';

interface AnalyticsSummaryCardsProps {
  totalMetrics: {
    total_candidates: number;
    responses_received: number;
    interviews_scheduled: number;
    hires_made: number;
  };
}

const AnalyticsSummaryCards: React.FC<AnalyticsSummaryCardsProps> = ({ totalMetrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Outreach</p>
              <p className="text-2xl font-bold text-gray-900">{totalMetrics.total_candidates}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs last period
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Responses</p>
              <p className="text-2xl font-bold text-gray-900">{totalMetrics.responses_received}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% response rate
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{totalMetrics.interviews_scheduled}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {Math.round((totalMetrics.interviews_scheduled / totalMetrics.responses_received) * 100)}% conversion
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hires</p>
              <p className="text-2xl font-bold text-gray-900">{totalMetrics.hires_made}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {Math.round((totalMetrics.hires_made / totalMetrics.interviews_scheduled) * 100)}% hire rate
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSummaryCards;
