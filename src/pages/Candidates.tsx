
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Plus, Mail, Phone, MapPin, Star, Zap, Clock, Calendar, TrendingUp } from "lucide-react";

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 123-4567",
      status: "In Review",
      score: 92,
      skills: ["React", "TypeScript", "Node.js"],
      experience: "5 years",
      lastActivity: "2 hours ago",
      avatar: "SC",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b95a05bc?w=150&h=150&fit=crop&crop=face",
      salary: "$120k - $140k",
      education: "Stanford University",
      availability: "2 weeks notice"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Product Manager",
      location: "Austin, TX",
      email: "marcus.r@email.com",
      phone: "+1 (555) 234-5678",
      status: "Interview Scheduled",
      score: 88,
      skills: ["Strategy", "Analytics", "Agile"],
      experience: "7 years",
      lastActivity: "4 hours ago",
      avatar: "MR",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      salary: "$140k - $160k",
      education: "MIT Sloan",
      availability: "1 month notice"
    },
    {
      id: 3,
      name: "Priya Sharma",
      title: "UX Designer",
      location: "New York, NY",
      email: "priya.sharma@email.com",
      phone: "+1 (555) 345-6789",
      status: "Background Check",
      score: 95,
      skills: ["Figma", "Research", "Prototyping"],
      experience: "4 years",
      lastActivity: "6 hours ago",
      avatar: "PS",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      salary: "$95k - $115k",
      education: "RISD",
      availability: "Available immediately"
    },
    {
      id: 4,
      name: "James Wilson",
      title: "DevOps Engineer",
      location: "Seattle, WA",
      email: "james.wilson@email.com",
      phone: "+1 (555) 456-7890",
      status: "Offer Extended",
      score: 90,
      skills: ["AWS", "Kubernetes", "Terraform"],
      experience: "6 years",
      lastActivity: "1 day ago",
      avatar: "JW",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      salary: "$130k - $150k",
      education: "Georgia Tech",
      availability: "3 weeks notice"
    },
    {
      id: 5,
      name: "Ana Rodriguez",
      title: "Data Scientist",
      location: "Remote",
      email: "ana.rodriguez@email.com",
      phone: "+1 (555) 567-8901",
      status: "Technical Assessment",
      score: 87,
      skills: ["Python", "ML", "SQL"],
      experience: "3 years",
      lastActivity: "3 hours ago",
      avatar: "AR",
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      salary: "$110k - $130k",
      education: "UC Berkeley",
      availability: "2 weeks notice"
    },
    {
      id: 6,
      name: "David Kim",
      title: "Mobile Developer",
      location: "Los Angeles, CA",
      email: "david.kim@email.com",
      phone: "+1 (555) 678-9012",
      status: "Portfolio Review",
      score: 91,
      skills: ["React Native", "Swift", "Kotlin"],
      experience: "4 years",
      lastActivity: "5 hours ago",
      avatar: "DK",
      imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      salary: "$105k - $125k",
      education: "UCLA",
      availability: "1 month notice"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Interview Scheduled": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Background Check": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Offer Extended": return "bg-green-100 text-green-800 border-green-200";
      case "Technical Assessment": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Portfolio Review": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 80) return "bg-blue-100 text-blue-800 border-blue-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Talent Pipeline</h1>
            <p className="text-indigo-100 text-lg">Discover and manage your top candidates</p>
          </div>
          <div className="hidden lg:flex space-x-4">
            <Button size="lg" variant="secondary">
              <Zap className="h-5 w-5 mr-2" />
              AI Match
            </Button>
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search candidates by name, skills, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        <Button variant="outline" size="lg">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <Button variant="outline" size="lg">
          <TrendingUp className="h-4 w-4 mr-2" />
          Sort by Score
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Candidates</p>
                <p className="text-2xl font-bold text-blue-900">1,247</p>
              </div>
              <div className="p-2 bg-blue-200 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">High Scorers</p>
                <p className="text-2xl font-bold text-green-900">89</p>
              </div>
              <div className="p-2 bg-green-200 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">In Process</p>
                <p className="text-2xl font-bold text-purple-900">156</p>
              </div>
              <div className="p-2 bg-purple-200 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">This Week</p>
                <p className="text-2xl font-bold text-orange-900">23</p>
              </div>
              <div className="p-2 bg-orange-200 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
            <div className="relative">
              <div className="h-24 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-t-lg"></div>
              <div className="absolute -bottom-6 left-6">
                <div className="relative">
                  <img
                    src={candidate.imageUrl}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <CardHeader className="pt-8 pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold">{candidate.name}</CardTitle>
                  <p className="text-sm text-gray-600 font-medium">{candidate.title}</p>
                  <p className="text-xs text-gray-500">{candidate.education}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={`${getStatusColor(candidate.status)} border`}>
                    {candidate.status}
                  </Badge>
                  <Badge className={`${getScoreColor(candidate.score)} border`}>
                    <Star className="w-3 h-3 mr-1" />
                    {candidate.score}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  {candidate.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {candidate.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {candidate.phone}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Salary Range:</span>
                  <span className="font-medium text-gray-900">{candidate.salary}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium text-gray-900">{candidate.experience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Availability:</span>
                  <span className="font-medium text-gray-900">{candidate.availability}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2 text-gray-700">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500 pt-2 border-t">
                <span>{candidate.lastActivity}</span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Active
                </span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  View Profile
                </Button>
                <Button size="sm" variant="outline" className="flex-1 hover:bg-gray-50">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
