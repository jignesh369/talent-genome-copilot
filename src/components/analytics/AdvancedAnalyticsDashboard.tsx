
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Target, 
  Clock, 
  DollarSign,
  Users,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { predictiveAnalyticsService, PredictiveInsight, MarketIntelligence } from '@/services/predictiveAnalyticsService';
import { useEnhancedCandidates } from '@/hooks/useEnhancedCandidates';

const AdvancedAnalyticsDashboard = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [marketData, setMarketData] = useState<MarketIntelligence | null>(null);

  useEffect(() => {
    if (enhancedCandidates.length > 0) {
      const generatedInsights = predictiveAnalyticsService.generatePredictiveInsights(enhancedCandidates);
      setInsights(generatedInsights);
    }
    setMarketData(predictiveAnalyticsService.getMarketIntelligence());
  }, [enhancedCandidates]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'hiring_forecast': return Target;
      case 'candidate_trajectory': return TrendingUp;
      case 'market_trend': return BarChart3;
      case 'pipeline_bottleneck': return AlertTriangle;
      default: return Brain;
    }
  };

  // Mock data for charts
  const hiringVelocityData = [
    { month: 'Jan', hires: 12, applications: 150 },
    { month: 'Feb', hires: 15, applications: 180 },
    { month: 'Mar', hires: 18, applications: 200 },
    { month: 'Apr', hires: 22, applications: 220 },
    { month: 'May', hires: 25, applications: 250 },
    { month: 'Jun', hires: 28, applications: 280 }
  ];

  const skillDemandData = marketData?.skill_demand_trends.map(skill => ({
    name: skill.skill,
    demand: skill.demand_change,
    growth: skill.projected_growth
  })) || [];

  const pipelineData = [
    { stage: 'Sourced', candidates: 45, color: '#8884d8' },
    { stage: 'Qualified', candidates: 32, color: '#82ca9d' },
    { stage: 'Interviewing', candidates: 18, color: '#ffc658' },
    { stage: 'Offer', candidates: 8, color: '#ff7300' },
    { stage: 'Hired', candidates: 5, color: '#00ff00' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600">AI-powered insights and predictive intelligence</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Brain className="h-4 w-4 mr-2" />
          Generate New Insights
        </Button>
      </div>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => {
              const IconComponent = getInsightIcon(insight.type);
              return (
                <div key={insight.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-sm">{insight.title}</h3>
                    </div>
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Confidence: {Math.round(insight.confidence * 100)}%</span>
                    <span>{insight.timeframe}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="market">Market Intelligence</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Analytics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Velocity Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hiringVelocityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hires" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="applications" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pipeline Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={pipelineData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="candidates"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Demand Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillDemandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="demand" fill="#8884d8" />
                    <Bar dataKey="growth" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salary Benchmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData?.salary_benchmarks.map((benchmark, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{benchmark.role}</h3>
                        <Badge className={
                          benchmark.trend === 'increasing' ? 'bg-green-100 text-green-800' :
                          benchmark.trend === 'decreasing' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {benchmark.trend}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{benchmark.location}</p>
                      <div className="flex justify-between text-sm">
                        <span>Min: ${benchmark.min_salary.toLocaleString()}</span>
                        <span>Median: ${benchmark.median_salary.toLocaleString()}</span>
                        <span>Max: ${benchmark.max_salary.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">24.5</p>
                  <p className="text-sm text-gray-600">Avg. Days to Hire</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Active Candidates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Next 30 Days</h3>
                    <p className="text-2xl font-bold text-green-900">8-12 hires</p>
                    <p className="text-sm text-green-700">Based on current pipeline velocity</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">Pipeline Quality</h3>
                    <p className="text-2xl font-bold text-blue-900">87%</p>
                    <p className="text-sm text-blue-700">Above industry average</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Interview Stage Bottleneck</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">Declining Response Rates</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
