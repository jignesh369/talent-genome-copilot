
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Star, Calendar, MessageCircle, Gift, TrendingUp, Clock, Zap } from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateDashboard = () => {
  const stats = [
    { label: "Applications", value: "8", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Interviews", value: "3", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Messages", value: "12", icon: MessageCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Offers", value: "1", icon: Gift, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const applications = [
    {
      id: 1,
      company: "TechCorp",
      role: "Frontend Developer",
      status: "Interview Scheduled",
      progress: 75,
      nextStep: "Video interview tomorrow at 2 PM",
      appliedDate: "3 days ago",
      logo: "TC"
    },
    {
      id: 2,
      company: "StartupXYZ",
      role: "Full Stack Developer",
      status: "Assessment Pending",
      progress: 50,
      nextStep: "Complete coding assessment",
      appliedDate: "1 week ago",
      logo: "SX"
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: "Sarah Johnson",
      company: "TechCorp",
      message: "Great interview today! We'll be in touch soon with next steps.",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "Mike Chen",
      company: "StartupXYZ",
      message: "Hi Alex! Could you complete the coding assessment by Friday?",
      time: "1 day ago",
      unread: false
    }
  ];

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Alex! 👋</h1>
              <p className="text-purple-100 text-lg">You have 3 active applications and 1 interview coming up</p>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/candidate-jobs">
            <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Browse Jobs</h3>
                <p className="text-sm text-gray-600">Find your dream role</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/candidate-interviews">
            <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Interviews</h3>
                <p className="text-sm text-gray-600">Manage your schedule</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/candidate-messages">
            <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Messages</h3>
                <p className="text-sm text-gray-600">Chat with recruiters</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/candidate-offers">
            <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Offers</h3>
                <p className="text-sm text-gray-600">Review & negotiate</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Your Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {app.logo}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{app.role}</h4>
                          <p className="text-sm text-gray-600">{app.company}</p>
                          <p className="text-xs text-gray-500">Applied {app.appliedDate}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {app.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                      <p className="text-sm text-gray-600 mt-2">{app.nextStep}</p>
                    </div>
                  </div>
                ))}
                <Link to="/candidate-jobs">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Apply to More Jobs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Recent Messages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{msg.from}</p>
                        <p className="text-xs text-gray-600">{msg.company}</p>
                      </div>
                      {msg.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{msg.message}</p>
                    <p className="text-xs text-gray-500">{msg.time}</p>
                  </div>
                ))}
                <Link to="/candidate-messages">
                  <Button variant="outline" className="w-full">View All Messages</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Interview */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Next Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Frontend Developer</p>
                    <p className="text-blue-100 text-sm">TechCorp • Tomorrow 2:00 PM</p>
                  </div>
                  <Link to="/candidate-interviews">
                    <Button size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateDashboard;
