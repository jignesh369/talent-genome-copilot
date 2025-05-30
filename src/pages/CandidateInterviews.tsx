
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone, MapPin, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateInterviews = () => {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      company: "TechCorp",
      role: "Frontend Developer",
      type: "video",
      date: "Tomorrow",
      time: "2:00 PM",
      duration: "45 mins",
      status: "scheduled",
      interviewer: "Sarah Johnson",
      meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 2,
      company: "StartupXYZ",
      role: "Full Stack Engineer",
      type: "phone",
      date: "Dec 30",
      time: "11:00 AM",
      duration: "30 mins",
      status: "scheduled",
      interviewer: "Mike Chen"
    }
  ]);

  const handleJoinMeeting = (interview: any) => {
    if (interview.type === "video" && interview.meetingLink) {
      window.open(interview.meetingLink, '_blank');
      toast({
        title: "Joining Meeting",
        description: "Opening video call in new tab...",
      });
    } else {
      toast({
        title: "Phone Interview",
        description: `Please call ${interview.interviewer} at the scheduled time.`,
      });
    }
  };

  const handleReschedule = (interviewId: number) => {
    toast({
      title: "Reschedule Request",
      description: "Your reschedule request has been sent to the recruiter.",
    });
  };

  const handleScheduleNew = () => {
    toast({
      title: "Schedule Interview",
      description: "Opening interview scheduling form...",
    });
  };

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            onClick={handleScheduleNew}
          >
            Schedule New
          </Button>
        </div>

        <div className="space-y-6">
          {interviews.map((interview) => (
            <Card key={interview.id} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{interview.role}</h3>
                    <p className="text-lg text-purple-600 font-medium mb-1">{interview.company}</p>
                    <p className="text-sm text-gray-600 mb-4">with {interview.interviewer}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{interview.date} at {interview.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{interview.duration}</span>
                      </div>
                      <div className="flex items-center">
                        {interview.type === "video" ? (
                          <Video className="w-4 h-4 mr-1" />
                        ) : (
                          <Phone className="w-4 h-4 mr-1" />
                        )}
                        <span className="capitalize">{interview.type}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {interview.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {interview.type === "video" && interview.meetingLink && (
                      <p className="text-green-600">Meeting link ready</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReschedule(interview.id)}
                    >
                      Reschedule
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleJoinMeeting(interview)}
                    >
                      {interview.type === "video" ? "Join Meeting" : "Call Info"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {interviews.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Interviews Scheduled</h3>
              <p className="text-gray-600 mb-4">You don't have any upcoming interviews</p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                onClick={handleScheduleNew}
              >
                Schedule Your First Interview
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </CandidateLayout>
  );
};

export default CandidateInterviews;
