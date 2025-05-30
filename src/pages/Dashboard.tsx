
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Candidates",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-30%",
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "Response Rate",
      value: "42%",
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Offers Accepted",
      value: "89%",
      change: "+5%",
      icon: CheckCircle,
      color: "text-emerald-600"
    }
  ];

  const recentActivity = [
    { candidate: "Sarah Chen", action: "Assessment Completed", time: "2 hours ago", score: 92 },
    { candidate: "Marcus Rodriguez", action: "Interview Scheduled", time: "4 hours ago", score: null },
    { candidate: "Priya Sharma", action: "Background Check Complete", time: "6 hours ago", score: null },
    { candidate: "James Wilson", action: "Offer Extended", time: "1 day ago", score: null }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your hiring overview.</p>
        </div>
        <Button>Start New Search</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hiring Pipeline</CardTitle>
            <CardDescription>Current status across all open positions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Applied (156)</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Screened (89)</span>
                <span>57%</span>
              </div>
              <Progress value={57} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Interviewed (34)</span>
                <span>22%</span>
              </div>
              <Progress value={22} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Offers (12)</span>
                <span>8%</span>
              </div>
              <Progress value={8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest candidate updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex flex-col space-y-1 border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{activity.candidate}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                  {activity.score && (
                    <Badge variant="secondary">{activity.score}%</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
