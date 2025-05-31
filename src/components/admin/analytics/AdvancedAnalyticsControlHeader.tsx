
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download } from 'lucide-react';

interface AdvancedAnalyticsControlHeaderProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  onExportData: () => void;
}

const AdvancedAnalyticsControlHeader: React.FC<AdvancedAnalyticsControlHeaderProps> = ({
  dateRange,
  onDateRangeChange,
  onExportData
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
      <div className="flex items-center space-x-4">
        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-48">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={onExportData}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsControlHeader;
