
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video, 
  MapPin,
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

interface InterviewCardProps {
  interview: Interview;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview }) => {
  const { toast } = useToast();

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

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50">
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
  );
};

export default InterviewCard;
