import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Clock, DollarSign, MapPin, Search, Filter, Plus, TrendingUp, Target, Brain } from "lucide-react";
import CreateJobModal from "@/components/jobs/CreateJobModal";
import JobDetailsModal from "@/components/jobs/JobDetailsModal";
import AIJobCreationWizard from "@/components/recruiter/AIJobCreationWizard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [showAIWizard, setShowAIWizard] = useState(false);

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
      priority: "High",
      description: "We're looking for a passionate frontend developer to join our team and help build the next generation of our platform.",
      requirements: "5+ years of React experience, TypeScript, modern CSS frameworks, experience with testing"
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
      priority: "Medium",
      description: "Lead product strategy and execution for our core platform features.",
      requirements: "3+ years PM experience, technical background preferred, strong analytical skills"
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
      priority: "High",
      description: "Design intuitive user experiences for our platform and mobile applications.",
      requirements: "Portfolio showcasing UX/UI design, Figma proficiency, user research experience"
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
      priority: "Low",
      description: "Manage and scale our cloud infrastructure and deployment pipelines.",
      requirements: "AWS/GCP experience, Kubernetes, CI/CD pipelines, infrastructure as code"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setJobDetailsOpen(true);
  };

  const handleAIJobCreation = (jobData: any) => {
    console.log('AI Job created:', jobData);
    setShowAIWizard(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enhanced Job Management</h1>
          <p className="text-gray-600">AI-powered job creation and advanced pipeline management</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowAIWizard(true)}>
            <Brain className="h-4 w-4 mr-2" />
            AI Job Wizard
          </Button>
          <CreateJobModal />
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Jobs</p>
                <p className="text-2xl font-bold text-blue-900">{jobs.length}</p>
              </div>
              <div className="p-2 bg-blue-200 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Active Jobs</p>
                <p className="text-2xl font-bold text-green-900">{jobs.filter(j => j.status === 'Active').length}</p>
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
                <p className="text-sm font-medium text-purple-700">Applications</p>
                <p className="text-2xl font-bold text-purple-900">{jobs.reduce((sum, job) => sum + job.applications, 0)}</p>
              </div>
              <div className="p-2 bg-purple-200 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Avg Time Open</p>
                <p className="text-2xl font-bold text-orange-900">{Math.round(jobs.reduce((sum, job) => sum + job.daysOpen, 0) / jobs.length)} days</p>
              </div>
              <div className="p-2 bg-orange-200 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="on hold">On Hold</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
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
                <Button size="sm" className="flex-1" onClick={() => handleViewDetails(job)}>
                  View Details
                </Button>
                <Button size="sm" variant="outline">Edit Job</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <JobDetailsModal
        job={selectedJob}
        open={jobDetailsOpen}
        onOpenChange={setJobDetailsOpen}
      />

      <Dialog open={showAIWizard} onOpenChange={setShowAIWizard}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI Job Creation Wizard</DialogTitle>
          </DialogHeader>
          <AIJobCreationWizard
            onSubmit={handleAIJobCreation}
            onCancel={() => setShowAIWizard(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Jobs;
