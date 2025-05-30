
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone, MapPin, CheckCircle } from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateInterviews = () => {
  const interviews = [
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
  ];

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
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
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {interview.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{interview.date} at {interview.time}</span>
                    <span>({interview.duration})</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Join Meeting
                    </Button>
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

export default CandidateInterviews;
