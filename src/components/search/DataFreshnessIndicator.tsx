
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface DataFreshnessIndicatorProps {
  lastUpdated: string;
  platform: string;
  size?: 'sm' | 'default';
}

const DataFreshnessIndicator: React.FC<DataFreshnessIndicatorProps> = ({ 
  lastUpdated, 
  platform,
  size = 'default' 
}) => {
  const getTimeDifference = (dateString: string) => {
    const now = new Date();
    const updated = new Date(dateString);
    const diffInHours = (now.getTime() - updated.getTime()) / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 24) {
      return { value: Math.round(diffInHours), unit: 'hours', severity: 'fresh' };
    } else if (diffInDays < 7) {
      return { value: Math.round(diffInDays), unit: 'days', severity: 'fresh' };
    } else if (diffInDays < 30) {
      return { value: Math.round(diffInDays), unit: 'days', severity: 'moderate' };
    } else {
      return { value: Math.round(diffInDays), unit: 'days', severity: 'stale' };
    }
  };

  const timeDiff = getTimeDifference(lastUpdated);

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'fresh':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'stale':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'fresh':
        return <CheckCircle className="h-3 w-3" />;
      case 'moderate':
        return <Clock className="h-3 w-3" />;
      case 'stale':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`${getSeverityStyles(timeDiff.severity)} ${size === 'sm' ? 'text-xs px-2 py-1' : ''} flex items-center space-x-1`}
    >
      {getIcon(timeDiff.severity)}
      <span>{timeDiff.value} {timeDiff.unit} ago</span>
    </Badge>
  );
};

export default DataFreshnessIndicator;
