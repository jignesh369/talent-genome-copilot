
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InterviewCard from './InterviewCard';

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

interface InterviewListProps {
  interviews: Interview[];
  selectedView: string;
}

const InterviewList: React.FC<InterviewListProps> = ({ interviews, selectedView }) => {
  const todayInterviews = interviews.filter(interview => 
    interview.date === new Date().toISOString().split('T')[0]
  );

  const upcomingInterviews = interviews.filter(interview => 
    new Date(interview.date) > new Date()
  );

  const displayInterviews = selectedView === 'today' ? todayInterviews : upcomingInterviews;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>
          {selectedView === 'today' ? "Today's Interviews" : 'Upcoming Interviews'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayInterviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewList;
