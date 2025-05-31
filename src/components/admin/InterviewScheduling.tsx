
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Plus
} from 'lucide-react';
import InterviewStatsGrid from './scheduling/InterviewStatsGrid';
import InterviewCalendar from './scheduling/InterviewCalendar';
import InterviewList from './scheduling/InterviewList';
import InterviewScheduleModal from './scheduling/InterviewScheduleModal';

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedView, setSelectedView] = useState('calendar');

  const [interviews] = useState<Interview[]>([
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
      <InterviewStatsGrid interviews={interviews} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <InterviewCalendar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {/* Interview List */}
        <InterviewList 
          interviews={interviews}
          selectedView={selectedView}
        />
      </div>

      {/* Schedule Interview Modal */}
      <InterviewScheduleModal 
        showModal={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
};

export default InterviewScheduling;
