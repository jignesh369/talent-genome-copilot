
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  change,
  onClick 
}) => {
  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <p className="text-xs text-green-600 mt-1">{change}</p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
