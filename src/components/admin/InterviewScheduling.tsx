
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  interviewer: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  location?: string;
  meetingLink?: string;
}

const InterviewScheduling: React.FC = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedView, setSelectedView] = useState('calendar');

  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'John Smith',
      position: 'Senior Developer',
      interviewer: 'Sarah Johnson',
      date: '2025-01-02',
      time: '10:00',
      duration: 60,
      type: 'video',
      status: 'scheduled',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      candidateName: 'Emma Wilson',
      position: 'Product Manager',
      interviewer: 'Mike Chen',
      date: '2025-01-02',
      time: '14:30',
      duration: 45,
      type: 'in-person',
      status: 'confirmed',
      location: 'Conference Room A'
    },
    {
      id: '3',
      candidateName: 'David Brown',
      position: 'Designer',
      interviewer: 'Emily Davis',
      date: '2025-01-03',
      time: '11:00',
      duration: 60,
      type: 'video',
      status: 'scheduled',
      meetingLink: 'https://zoom.us/j/123456789'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleScheduleInterview = () => {
    toast({
      title: "Interview Scheduled",
      description: "Interview has been scheduled and invitations sent.",
    });
    setShowScheduleModal(false);
  };

  const handleSendReminder = (interviewId: string) => {
    toast({
      title: "Reminder Sent",
      description: "Interview reminder has been sent to all participants.",
    });
  };

  const handleReschedule = (interviewId: string) => {
    toast({
      title: "Reschedule Request",
      description: "Reschedule options have been sent to participants.",
    });
  };

  const todayInterviews = interviews.filter(interview => 
    interview.date === new Date().toISOString().split('T')[0]
  );

  const upcomingInterviews = interviews.filter(interview => 
    new Date(interview.date) > new Date()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Interview Scheduling</h2>
        <div className="flex items-center space-x-4">
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-40">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="calendar">Calendar View</SelectItem>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="today">Today's Schedule</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowScheduleModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{todayInterviews.length}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingInterviews.length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {interviews.filter(i => i.status === 'confirmed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {interviews.filter(i => i.status === 'scheduled').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Interview List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedView === 'today' ? "Today's Interviews" : 'Upcoming Interviews'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(selectedView === 'today' ? todayInterviews : upcomingInterviews).map((interview) => (
                <div key={interview.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold">{interview.candidateName}</h3>
                        <p className="text-sm text-gray-600">{interview.position}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(interview.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(interview.status)}
                        <span>{interview.status}</span>
                      </div>
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <span>{new Date(interview.date).toLocaleDateString()} at {interview.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{interview.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{interview.interviewer}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {interview.type === 'video' && <Video className="w-4 h-4 text-gray-500" />}
                      {interview.type === 'in-person' && <MapPin className="w-4 h-4 text-gray-500" />}
                      {interview.type === 'phone' && <Clock className="w-4 h-4 text-gray-500" />}
                      <span className="capitalize">{interview.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleSendReminder(interview.id)}>
                      <Send className="w-4 h-4 mr-1" />
                      Remind
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleReschedule(interview.id)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Interview Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Candidate</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="emma">Emma Wilson</SelectItem>
                    <SelectItem value="david">David Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Position</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Senior Developer</SelectItem>
                    <SelectItem value="manager">Product Manager</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Interviewer</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Chen</SelectItem>
                    <SelectItem value="emily">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Interview Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="in-person">In Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Input type="time" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration (min)</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Additional notes or instructions..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleInterview}>
                Schedule Interview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewScheduling;
