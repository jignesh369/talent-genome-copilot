
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, Clock, DollarSign, MapPin } from "lucide-react";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      status: "Active",
      applications: 45,
      qualified: 12,
      interviewed: 4,
      offers: 1,
      daysOpen: 18,
      priority: "High"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      salary: "$140k - $180k",
      status: "Active",
      applications: 67,
      qualified: 18,
      interviewed: 6,
      offers: 2,
      daysOpen: 25,
      priority: "Medium"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      salary: "$95k - $125k",
      status: "Active",
      applications: 32,
      qualified: 8,
      interviewed: 3,
      offers: 0,
      daysOpen: 12,
      priority: "High"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $145k",
      status: "On Hold",
      applications: 28,
      qualified: 6,
      interviewed: 2,
      offers: 1,
      daysOpen: 35,
      priority: "Low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-gray-600">Manage your open positions and hiring pipeline</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Job
        </Button>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <p className="text-gray-600">{job.department}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                  <Badge className={getPriorityColor(job.priority)}>
                    {job.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {job.daysOpen} days open
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {job.applications} applications
                </div>
              </div>
              
              {/* Pipeline Progress */}
              <div className="space-y-3">
                <h4 className="font-medium">Hiring Pipeline</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Applications</span>
                    <span>{job.applications}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Qualified</span>
                    <span>{job.qualified} ({Math.round((job.qualified / job.applications) * 100)}%)</span>
                  </div>
                  <Progress value={(job.qualified / job.applications) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Interviewed</span>
                    <span>{job.interviewed} ({Math.round((job.interviewed / job.applications) * 100)}%)</span>
                  </div>
                  <Progress value={(job.interviewed / job.applications) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Offers</span>
                    <span>{job.offers} ({Math.round((job.offers / job.applications) * 100)}%)</span>
                  </div>
                  <Progress value={(job.offers / job.applications) * 100} className="h-2" />
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">View Details</Button>
                <Button size="sm" variant="outline">Edit Job</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
