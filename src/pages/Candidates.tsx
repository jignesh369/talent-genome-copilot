
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Plus, Mail, Phone, MapPin } from "lucide-react";

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
      lastActivity: "2 hours ago"
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
      lastActivity: "4 hours ago"
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
      lastActivity: "6 hours ago"
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
      lastActivity: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Review": return "bg-yellow-100 text-yellow-800";
      case "Interview Scheduled": return "bg-blue-100 text-blue-800";
      case "Background Check": return "bg-purple-100 text-purple-800";
      case "Offer Extended": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Manage your talent pipeline</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search candidates by name, skills, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    <p className="text-sm text-gray-600">{candidate.title}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(candidate.status)}>
                  {candidate.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Score</span>
                <Badge variant="secondary">{candidate.score}%</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {candidate.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {candidate.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {candidate.phone}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>{candidate.experience} experience</span>
                <span>{candidate.lastActivity}</span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">View Profile</Button>
                <Button size="sm" variant="outline">Message</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
