
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar as CalendarIcon, 
  Clock, 
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

interface InterviewStatsGridProps {
  interviews: Interview[];
}

const InterviewStatsGrid: React.FC<InterviewStatsGridProps> = ({ interviews }) => {
  const todayInterviews = interviews.filter(interview => 
    interview.date === new Date().toISOString().split('T')[0]
  );

  const upcomingInterviews = interviews.filter(interview => 
    new Date(interview.date) > new Date()
  );

  return (
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
  );
};

export default InterviewStatsGrid;
