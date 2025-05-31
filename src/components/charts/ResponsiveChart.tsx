
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer } from 'recharts';

interface ResponsiveChartProps {
  children: React.ReactElement;
  config: any;
  className?: string;
  height?: number;
}

const ResponsiveChart: React.FC<ResponsiveChartProps> = ({ 
  children, 
  config, 
  className = "", 
  height = 300 
}) => {
  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height: `${height}px` }}>
      <ChartContainer config={config} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          {children}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default ResponsiveChart;
