
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Filter, Download } from 'lucide-react';

interface AdvancedAnalyticsHeaderProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
}

const AdvancedAnalyticsHeader: React.FC<AdvancedAnalyticsHeaderProps> = ({
  dateRange,
  onDateRangeChange
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
        <p className="text-sm text-gray-600">Real-time recruiting intelligence and insights</p>
      </div>
      <div className="flex items-center space-x-4">
        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-40">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsHeader;
