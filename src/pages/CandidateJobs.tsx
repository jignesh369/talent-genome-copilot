
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Bookmark } from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      posted: "2 days ago",
      description: "We're looking for a passionate frontend developer to join our team...",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      saved: false
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time", 
      salary: "$100k - $140k",
      posted: "1 week ago",
      description: "Join our fast-growing startup and help build the future of work...",
      skills: ["Node.js", "React", "MongoDB"],
      saved: true
    }
  ];

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Search
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Bookmark className={`w-4 h-4 ${job.saved ? 'fill-current text-yellow-500' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                    <p className="text-lg text-purple-600 font-medium mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.posted}
                      </div>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-lg font-bold text-green-600 mb-2">{job.salary}</p>
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        Apply Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateJobs;
