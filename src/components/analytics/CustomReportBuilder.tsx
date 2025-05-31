
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Save, BarChart, PieChart, LineChart, Filter, Calendar } from 'lucide-react';

interface ReportConfig {
  name: string;
  metrics: string[];
  filters: any[];
  dateRange: string;
  chartType: string;
  groupBy: string;
}

const CustomReportBuilder: React.FC = () => {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: '',
    metrics: [],
    filters: [],
    dateRange: 'last_30_days',
    chartType: 'bar',
    groupBy: 'department'
  });

  const availableMetrics = [
    'applications_count',
    'interviews_scheduled',
    'offers_made',
    'hires_completed',
    'time_to_hire',
    'cost_per_hire',
    'source_effectiveness',
    'pipeline_velocity'
  ];

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: BarChart },
    { value: 'line', label: 'Line Chart', icon: LineChart },
    { value: 'pie', label: 'Pie Chart', icon: PieChart }
  ];

  const handleMetricToggle = (metric: string) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metric)
        ? prev.metrics.filter(m => m !== metric)
        : [...prev.metrics, metric]
    }));
  };

  const generateReport = () => {
    console.log('Generating custom report with config:', reportConfig);
  };

  const saveReport = () => {
    console.log('Saving report template:', reportConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart className="h-5 w-5 text-blue-600" />
          <span>Custom Report Builder</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Report Name</label>
          <Input
            placeholder="Enter report name..."
            value={reportConfig.name}
            onChange={(e) => setReportConfig(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        {/* Metrics Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Select Metrics</label>
          <div className="grid grid-cols-2 gap-3">
            {availableMetrics.map((metric) => (
              <div key={metric} className="flex items-center space-x-2">
                <Checkbox
                  checked={reportConfig.metrics.includes(metric)}
                  onCheckedChange={() => handleMetricToggle(metric)}
                />
                <label className="text-sm capitalize">
                  {metric.replace(/_/g, ' ')}
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {reportConfig.metrics.map((metric) => (
              <Badge key={metric} variant="secondary">
                {metric.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Chart Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Chart Type</label>
          <div className="grid grid-cols-3 gap-3">
            {chartTypes.map((chart) => (
              <Button
                key={chart.value}
                variant={reportConfig.chartType === chart.value ? "default" : "outline"}
                onClick={() => setReportConfig(prev => ({ ...prev, chartType: chart.value }))}
                className="flex items-center space-x-2"
              >
                <chart.icon className="h-4 w-4" />
                <span>{chart.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <Select value={reportConfig.dateRange} onValueChange={(value) => setReportConfig(prev => ({ ...prev, dateRange: value }))}>
            <SelectTrigger>
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 days</SelectItem>
              <SelectItem value="last_30_days">Last 30 days</SelectItem>
              <SelectItem value="last_90_days">Last 90 days</SelectItem>
              <SelectItem value="last_year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Group By */}
        <div>
          <label className="block text-sm font-medium mb-2">Group By</label>
          <Select value={reportConfig.groupBy} onValueChange={(value) => setReportConfig(prev => ({ ...prev, groupBy: value }))}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="job_type">Job Type</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
              <SelectItem value="source">Source</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button onClick={generateReport} className="flex-1">
            <BarChart className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={saveReport}>
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomReportBuilder;
