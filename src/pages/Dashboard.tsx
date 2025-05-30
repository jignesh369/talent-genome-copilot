
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Clock, CheckCircle, ArrowUpRight, ArrowDownRight, Star, Zap, Target, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Candidates",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "vs last month"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-30%",
      trend: "down",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "avg reduction"
    },
    {
      title: "Response Rate",
      value: "42%",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "outreach success"
    },
    {
      title: "AI Match Score",
      value: "89%",
      change: "+5%",
      trend: "up",
      icon: Brain,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "accuracy improved"
    }
  ];

  const hiringData = [
    { month: 'Jan', applications: 120, interviews: 45, offers: 12, hires: 8 },
    { month: 'Feb', applications: 150, interviews: 52, offers: 15, hires: 11 },
    { month: 'Mar', applications: 180, interviews: 68, offers: 18, hires: 14 },
    { month: 'Apr', applications: 165, interviews: 61, offers: 16, hires: 12 },
    { month: 'May', applications: 200, interviews: 75, offers: 22, hires: 18 },
    { month: 'Jun', applications: 190, interviews: 72, offers: 20, hires: 16 }
  ];

  const departmentData = [
    { name: 'Engineering', value: 45, color: '#3B82F6' },
    { name: 'Sales', value: 25, color: '#10B981' },
    { name: 'Marketing', value: 15, color: '#8B5CF6' },
    { name: 'Design', value: 10, color: '#F59E0B' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const performanceData = [
    { week: 'W1', efficiency: 78, quality: 85 },
    { week: 'W2', efficiency: 82, quality: 88 },
    { week: 'W3', efficiency: 85, quality: 92 },
    { week: 'W4', efficiency: 88, quality: 94 }
  ];

  const recentActivity = [
    { 
      candidate: "Sarah Chen", 
      action: "Assessment Completed", 
      time: "2 hours ago", 
      score: 92,
      avatar: "SC",
      status: "excellent"
    },
    { 
      candidate: "Marcus Rodriguez", 
      action: "Interview Scheduled", 
      time: "4 hours ago", 
      score: null,
      avatar: "MR",
      status: "pending"
    },
    { 
      candidate: "Priya Sharma", 
      action: "Background Check Complete", 
      time: "6 hours ago", 
      score: null,
      avatar: "PS",
      status: "verified"
    },
    { 
      candidate: "James Wilson", 
      action: "Offer Extended", 
      time: "1 day ago", 
      score: null,
      avatar: "JW",
      status: "offer"
    }
  ];

  const chartConfig = {
    applications: {
      label: "Applications",
      color: "#3B82F6",
    },
    interviews: {
      label: "Interviews",
      color: "#10B981",
    },
    offers: {
      label: "Offers",
      color: "#8B5CF6",
    },
    hires: {
      label: "Hires",
      color: "#F59E0B",
    },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <Star className="h-4 w-4 text-yellow-500" />;
      case "verified": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "offer": return <Target className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Welcome back, John!</h1>
            <p className="text-blue-100 text-lg">Here's your hiring performance overview</p>
          </div>
          <div className="hidden lg:flex space-x-4">
            <Button size="lg" variant="secondary">
              <Zap className="h-5 w-5 mr-2" />
              AI Insights
            </Button>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start New Search
            </Button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Enhanced Stats Grid */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Hiring Funnel Trends
            </CardTitle>
            <CardDescription>Monthly hiring pipeline performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hiringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="applications" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interviews" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="offers" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hires" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Hiring by Department
            </CardTitle>
            <CardDescription>Active positions distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-emerald-600" />
              AI Performance Metrics
            </CardTitle>
            <CardDescription>Weekly efficiency and quality scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stackId="1" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="quality" 
                    stackId="2" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Enhanced Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest candidate updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm text-gray-900 truncate">{activity.candidate}</p>
                    {getStatusIcon(activity.status)}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{activity.action}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.score && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.score}%
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Overview with enhanced visuals */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Current Hiring Pipeline
          </CardTitle>
          <CardDescription>Real-time status across all open positions</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Applied</span>
                <span className="text-2xl font-bold text-blue-600">156</span>
              </div>
              <Progress value={100} className="h-3" />
              <p className="text-xs text-gray-500">100% conversion</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Screened</span>
                <span className="text-2xl font-bold text-green-600">89</span>
              </div>
              <Progress value={57} className="h-3" />
              <p className="text-xs text-gray-500">57% qualified</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Interviewed</span>
                <span className="text-2xl font-bold text-purple-600">34</span>
              </div>
              <Progress value={22} className="h-3" />
              <p className="text-xs text-gray-500">22% progressed</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Offers</span>
                <span className="text-2xl font-bold text-orange-600">12</span>
              </div>
              <Progress value={8} className="h-3" />
              <p className="text-xs text-gray-500">8% success rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
