
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Brain, Target, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const ForecastingInsights: React.FC = () => {
  const [forecastPeriod, setForecastPeriod] = useState('3m');

  const forecastData = [
    { month: 'Jul', predicted_hires: 28, predicted_cost: 89600, confidence: 92 },
    { month: 'Aug', predicted_hires: 31, predicted_cost: 95400, confidence: 87 },
    { month: 'Sep', predicted_hires: 29, predicted_cost: 91200, confidence: 84 },
    { month: 'Oct', predicted_hires: 33, predicted_cost: 102300, confidence: 78 },
    { month: 'Nov', predicted_hires: 27, predicted_cost: 86400, confidence: 75 },
    { month: 'Dec', predicted_hires: 24, predicted_cost: 79200, confidence: 71 }
  ];

  const predictions = [
    {
      id: 1,
      type: 'hiring_forecast',
      title: 'Q3 Hiring Surge Expected',
      description: 'Based on current trends and historical data, expect 25% increase in hiring volume',
      confidence: 89,
      impact: 'high',
      timeframe: 'Next 3 months',
      recommendations: [
        'Increase recruiter capacity by 2 FTE',
        'Prepare additional interview slots',
        'Budget for 25% higher sourcing costs'
      ]
    },
    {
      id: 2,
      type: 'cost_optimization',
      title: 'LinkedIn ROI Declining',
      description: 'LinkedIn sourcing showing 15% cost increase with diminishing quality returns',
      confidence: 76,
      impact: 'medium',
      timeframe: 'Next 6 weeks',
      recommendations: [
        'Diversify sourcing channels',
        'Optimize LinkedIn targeting',
        'Increase referral program budget'
      ]
    },
    {
      id: 3,
      type: 'quality_trend',
      title: 'Engineering Quality Scores Rising',
      description: 'AI-assisted screening improving engineering hire quality by 18%',
      confidence: 94,
      impact: 'high',
      timeframe: 'Current trend',
      recommendations: [
        'Expand AI screening to other roles',
        'Train recruiters on AI insights',
        'Standardize quality metrics'
      ]
    }
  ];

  const marketTrends = [
    { skill: 'React/TypeScript', demand_change: 23, market_saturation: 34, salary_trend: 'increasing' },
    { skill: 'AI/ML Engineers', demand_change: 67, market_saturation: 12, salary_trend: 'increasing' },
    { skill: 'DevOps/Cloud', demand_change: 31, market_saturation: 28, salary_trend: 'stable' },
    { skill: 'Product Management', demand_change: 15, market_saturation: 45, salary_trend: 'stable' },
    { skill: 'Data Science', demand_change: 8, market_saturation: 52, salary_trend: 'decreasing' }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const chartConfig = {
    predicted_hires: { label: "Predicted Hires", color: "#8884d8" },
    predicted_cost: { label: "Predicted Cost", color: "#82ca9d" }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forecasting & Insights</h2>
            <p className="text-gray-600">AI-powered predictions and strategic recommendations</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Next Month</SelectItem>
                <SelectItem value="3m">Next 3 Months</SelectItem>
                <SelectItem value="6m">Next 6 Months</SelectItem>
                <SelectItem value="1y">Next Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Brain className="w-4 h-4 mr-2" />
              Generate Insights
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Month Forecast</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">28 hires</p>
                  <p className="text-sm text-green-600 mt-1">92% confidence</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Predicted Cost</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">$89.6k</p>
                  <p className="text-sm text-blue-600 mt-1">Within budget</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quality Trend</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">+18%</p>
                  <p className="text-sm text-purple-600 mt-1">Improving</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="predicted_hires" stroke="#8884d8" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Intelligence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{trend.skill}</span>
                    <Badge variant={trend.demand_change > 20 ? 'default' : 'secondary'}>
                      {trend.demand_change > 0 ? '+' : ''}{trend.demand_change}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Saturation: {trend.market_saturation}%</span>
                    <span className={trend.salary_trend === 'increasing' ? 'text-green-600' : trend.salary_trend === 'decreasing' ? 'text-red-600' : 'text-gray-600'}>
                      Salary {trend.salary_trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI-Generated Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="p-6 border rounded-lg bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{prediction.title}</h3>
                      <Badge className={getImpactColor(prediction.impact)}>
                        {prediction.impact} impact
                      </Badge>
                      <span className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{prediction.description}</p>
                    <p className="text-sm text-gray-500 mb-4">Timeframe: {prediction.timeframe}</p>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommended Actions:</h4>
                  <ul className="space-y-1">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastingInsights;
