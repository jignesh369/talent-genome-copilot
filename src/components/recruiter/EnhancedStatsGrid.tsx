
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
}

interface EnhancedStatsGridProps {
  stats: Stat[];
}

const EnhancedStatsGrid: React.FC<EnhancedStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className={`absolute inset-0 ${stat.bgColor} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-green-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-green-600"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EnhancedStatsGrid;
