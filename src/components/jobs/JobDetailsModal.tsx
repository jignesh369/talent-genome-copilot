
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, DollarSign, Users, Edit, Trash2 } from "lucide-react";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  status: string;
  applications: number;
  qualified: number;
  interviewed: number;
  offers: number;
  daysOpen: number;
  priority: string;
  description?: string;
  requirements?: string;
}

interface JobDetailsModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (job: Job) => void;
  onDelete?: (jobId: number) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ 
  job, 
  open, 
  onOpenChange, 
  onEdit, 
  onDelete 
}) => {
  if (!job) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{job.title}</DialogTitle>
              <p className="text-gray-600 mt-1">{job.department}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
              <Badge className={getPriorityColor(job.priority)}>{job.priority}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Info */}
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

          {/* Description */}
          {job.description && (
            <div>
              <h4 className="font-medium mb-2">Job Description</h4>
              <p className="text-gray-700 text-sm">{job.description}</p>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h4 className="font-medium mb-2">Requirements</h4>
              <p className="text-gray-700 text-sm">{job.requirements}</p>
            </div>
          )}

          {/* Pipeline Progress */}
          <div className="space-y-4">
            <h4 className="font-medium">Hiring Pipeline</h4>
            
            <div className="space-y-3">
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
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onEdit?.(job)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Job
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Job
              </Button>
            </div>
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;
