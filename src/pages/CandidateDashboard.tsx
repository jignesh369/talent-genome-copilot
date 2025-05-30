
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Bell, Calendar, MessageCircle, Star, Clock, CheckCircle, Play, Gift, Zap } from "lucide-react";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("applications");

  const applications = [
    {
      id: 1,
      company: "TechCorp",
      role: "Frontend Developer",
      status: "Assessment Pending",
      progress: 60,
      nextStep: "Complete PerspectAI Assessment",
      appliedDate: "2 days ago",
      urgency: "high"
    },
    {
      id: 2,
      company: "DesignStudio",
      role: "UX Designer",
      status: "Interview Scheduled",
      progress: 80,
      nextStep: "Video Interview Tomorrow 2PM",
      appliedDate: "1 week ago",
      urgency: "medium"
    },
    {
      id: 3,
      company: "StartupXYZ",
      role: "Product Manager",
      status: "Offer Received",
      progress: 95,
      nextStep: "Review Offer Package",
      appliedDate: "2 weeks ago",
      urgency: "high"
    }
  ];

  const messages = [
    {
      id: 1,
      from: "Sarah (TechCorp Recruiter)",
      message: "Hi! Your profile looks great. Ready for the next step? 🚀",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "Mike (DesignStudio)",
      message: "Interview confirmed for tomorrow. Looking forward to meeting you!",
      time: "1 day ago",
      unread: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assessment Pending": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Interview Scheduled": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Offer Received": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    if (urgency === "high") return <Zap className="w-4 h-4 text-red-500" />;
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Hey Alex! 👋</h1>
                <p className="text-purple-100 text-lg">You're crushing it! 3 active applications, 1 offer waiting ✨</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Button size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Bell className="w-4 h-4 mr-2" />
                  2 New
                </Button>
                <Avatar className="w-12 h-12 border-2 border-white/30">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    AK
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Browse Jobs</p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Interviews</p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Messages</p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Offers</p>
                </CardContent>
              </Card>
            </div>

            {/* Applications */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Your Applications 🎯</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-gray-900">{app.role}</h3>
                          {getUrgencyIcon(app.urgency)}
                        </div>
                        <p className="text-gray-600 font-medium">{app.company}</p>
                        <p className="text-sm text-gray-500">Applied {app.appliedDate}</p>
                      </div>
                      <Badge className={`${getStatusColor(app.status)} border`}>
                        {app.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Next Step:</p>
                          <p className="text-sm text-gray-600">{app.nextStep}</p>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full">
                          {app.status === "Assessment Pending" ? (
                            <>
                              <Play className="w-4 h-4 mr-1" />
                              Take Test
                            </>
                          ) : app.status === "Offer Received" ? (
                            <>
                              <Gift className="w-4 h-4 mr-1" />
                              View Offer
                            </>
                          ) : (
                            <>
                              <Calendar className="w-4 h-4 mr-1" />
                              View Details
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Messages */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Recent Messages 💬
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-gray-900 text-sm">{msg.from}</p>
                      {msg.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{msg.message}</p>
                    <p className="text-xs text-gray-400">{msg.time}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-full">
                  View All Messages
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Coming Up ⏰
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Video Interview</p>
                      <Badge className="bg-yellow-400 text-yellow-900">Tomorrow</Badge>
                    </div>
                    <p className="text-sm text-blue-100">DesignStudio • 2:00 PM</p>
                  </div>
                  <Button size="sm" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Pro Tip 💡</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-100 mb-4">
                  Complete your PerspectAI assessment to boost your profile score by 40%! 📈
                </p>
                <Button size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
