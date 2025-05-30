
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Clock, Star, MessageCircle, ChevronRight } from "lucide-react";

const HiringManagerDashboard = () => {
  const [selectedRole, setSelectedRole] = useState(1);

  const stats = [
    { label: "Open Roles", value: "5", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Interviews Today", value: "3", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pending Reviews", value: "12", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Offers Extended", value: "2", icon: Star, color: "text-green-600", bg: "bg-green-50" },
  ];

  const openRoles = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      applicants: 45,
      progress: 75,
      status: "active",
      urgency: "high"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      applicants: 32,
      progress: 50,
      status: "active",
      urgency: "medium"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      applicants: 28,
      progress: 90,
      status: "almost-filled",
      urgency: "low"
    }
  ];

  const todayInterviews = [
    {
      id: 1,
      candidateName: "Alex Kumar",
      role: "Senior Frontend Developer",
      time: "10:00 AM",
      type: "Technical Interview",
      status: "upcoming"
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      role: "Product Manager",
      time: "2:00 PM",
      type: "Behavioral Interview",
      status: "upcoming"
    },
    {
      id: 3,
      candidateName: "Mike Chen",
      role: "UX Designer",
      time: "4:00 PM",
      type: "Portfolio Review",
      status: "upcoming"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hiring Manager Dashboard</h1>
            <p className="text-gray-600">Manage your team's hiring pipeline</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Create New Role
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white border-0 shadow-lg">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Open Roles */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Open Roles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {openRoles.map((role) => (
                  <div key={role.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{role.title}</h4>
                        <p className="text-sm text-gray-600">{role.department}</p>
                        <p className="text-xs text-gray-500">{role.applicants} applicants</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getUrgencyColor(role.urgency)}>
                          {role.urgency} priority
                        </Badge>
                        <Badge variant="outline">
                          {role.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hiring Progress</span>
                        <span className="font-medium">{role.progress}%</span>
                      </div>
                      <Progress value={role.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between mt-3">
                      <Button variant="outline" size="sm">
                        View Pipeline
                      </Button>
                      <Button size="sm" className="bg-purple-600 text-white">
                        Manage <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Today's Interviews */}
          <div className="space-y-6">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Today's Interviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayInterviews.map((interview) => (
                  <div key={interview.id} className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{interview.candidateName}</h5>
                      <span className="text-sm font-medium text-blue-600">{interview.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{interview.role}</p>
                    <p className="text-xs text-gray-500 mb-3">{interview.type}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        View Profile
                      </Button>
                      <Button size="sm" className="bg-blue-600 text-white text-xs">
                        Join Interview
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Interviews
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="sm" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Recruiters
                </Button>
                <Button size="sm" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Star className="w-4 h-4 mr-2" />
                  Review Candidates
                </Button>
                <Button size="sm" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interviews
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringManagerDashboard;
