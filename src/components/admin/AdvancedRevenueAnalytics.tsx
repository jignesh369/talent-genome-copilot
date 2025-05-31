
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users,
  Target,
  Calendar,
  CreditCard,
  AlertTriangle
} from 'lucide-react';

const AdvancedRevenueAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const revenueMetrics = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$847,320',
      change: '+12.8%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Annual Run Rate',
      value: '$10.2M',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Customer LTV',
      value: '$28,450',
      change: '+8.7%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Churn Rate',
      value: '2.3%',
      change: '-0.5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  const revenueGrowthData = [
    { month: 'Jul', mrr: 675000, arr: 8100000, newCustomers: 23, churnedCustomers: 5 },
    { month: 'Aug', mrr: 721000, arr: 8652000, newCustomers: 31, churnedCustomers: 7 },
    { month: 'Sep', mrr: 768000, arr: 9216000, newCustomers: 28, churnedCustomers: 4 },
    { month: 'Oct', mrr: 789000, arr: 9468000, newCustomers: 19, churnedCustomers: 8 },
    { month: 'Nov', mrr: 812000, arr: 9744000, newCustomers: 25, churnedCustomers: 3 },
    { month: 'Dec', mrr: 847000, arr: 10164000, newCustomers: 34, churnedCustomers: 6 }
  ];

  const planDistribution = [
    { name: 'Starter', value: 45, revenue: 187500, color: '#8884d8' },
    { name: 'Professional', value: 35, revenue: 425000, color: '#82ca9d' },
    { name: 'Enterprise', value: 20, revenue: 234820, color: '#ffc658' }
  ];

  const cohortData = [
    { cohort: 'Jan 2024', month1: 100, month2: 87, month3: 78, month4: 72, month5: 68, month6: 65 },
    { cohort: 'Feb 2024', month1: 100, month2: 89, month3: 81, month4: 76, month5: 71, month6: 68 },
    { cohort: 'Mar 2024', month1: 100, month2: 92, month3: 85, month4: 79, month5: 74, month6: 71 },
    { cohort: 'Apr 2024', month1: 100, month2: 94, month3: 87, month4: 82, month5: 78, month6: 75 },
    { cohort: 'May 2024', month1: 100, month2: 96, month3: 89, month4: 84, month5: 80, month6: 77 },
    { cohort: 'Jun 2024', month1: 100, month2: 98, month3: 91, month4: 86, month5: 82, month6: 79 }
  ];

  const pricingOptimization = [
    {
      plan: 'Starter',
      currentPrice: '$99',
      suggestedPrice: '$129',
      elasticity: 0.8,
      revenueImpact: '+$45k/month',
      confidence: 87
    },
    {
      plan: 'Professional',
      currentPrice: '$299',
      suggestedPrice: '$349',
      elasticity: 0.6,
      revenueImpact: '+$78k/month',
      confidence: 92
    },
    {
      plan: 'Enterprise',
      currentPrice: '$599',
      suggestedPrice: '$699',
      elasticity: 0.4,
      revenueImpact: '+$23k/month',
      confidence: 79
    }
  ];

  const topCustomers = [
    { name: 'TechCorp Solutions', mrr: 12500, plan: 'Enterprise', growth: '+15%', risk: 'low' },
    { name: 'Global Innovations', mrr: 8900, plan: 'Professional', growth: '+8%', risk: 'medium' },
    { name: 'StartupHub Inc', mrr: 7800, plan: 'Enterprise', growth: '+22%', risk: 'low' },
    { name: 'DataFlow Systems', mrr: 6700, plan: 'Professional', growth: '-2%', risk: 'high' },
    { name: 'CloudTech Ltd', mrr: 5900, plan: 'Professional', growth: '+12%', risk: 'low' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const chartConfig = {
    mrr: { label: "MRR", color: "#8884d8" },
    arr: { label: "ARR", color: "#82ca9d" },
    newCustomers: { label: "New Customers", color: "#ffc658" },
    churnedCustomers: { label: "Churned Customers", color: "#ff7300" }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Revenue Analytics</h2>
          <p className="text-sm text-gray-600">Customer lifetime value, churn prediction, and pricing optimization</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
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
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {revenueMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    )}
                    <span className="text-sm text-green-600">{metric.change}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Revenue Growth</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Optimization</TabsTrigger>
          <TabsTrigger value="customers">Top Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* MRR Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Recurring Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="mrr" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Plan Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Customer Movement */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Movement</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="newCustomers" fill="#82ca9d" />
                    <Bar dataKey="churnedCustomers" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Retention Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Cohort</th>
                      <th className="text-center py-2">Month 1</th>
                      <th className="text-center py-2">Month 2</th>
                      <th className="text-center py-2">Month 3</th>
                      <th className="text-center py-2">Month 4</th>
                      <th className="text-center py-2">Month 5</th>
                      <th className="text-center py-2">Month 6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.map((cohort, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-medium">{cohort.cohort}</td>
                        <td className="text-center py-2">{cohort.month1}%</td>
                        <td className="text-center py-2">{cohort.month2}%</td>
                        <td className="text-center py-2">{cohort.month3}%</td>
                        <td className="text-center py-2">{cohort.month4}%</td>
                        <td className="text-center py-2">{cohort.month5}%</td>
                        <td className="text-center py-2">{cohort.month6}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingOptimization.map((plan, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{plan.plan} Plan</h3>
                      <Badge variant="outline">
                        {plan.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Current Price</p>
                        <p className="font-semibold">{plan.currentPrice}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Suggested Price</p>
                        <p className="font-semibold text-green-600">{plan.suggestedPrice}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price Elasticity</p>
                        <p className="font-semibold">{plan.elasticity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue Impact</p>
                        <p className="font-semibold text-green-600">{plan.revenueImpact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Revenue Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.plan} Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${customer.mrr.toLocaleString()}/month</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-sm ${customer.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {customer.growth}
                        </span>
                        <Badge className={getRiskColor(customer.risk)}>
                          {customer.risk} risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedRevenueAnalytics;
