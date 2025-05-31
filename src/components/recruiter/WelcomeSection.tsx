
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface WelcomeSectionProps {
  userName?: string;
  onCreateJob: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName, onCreateJob }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">Welcome back, {userName || 'Recruiter'}! 👋</h2>
          <p className="text-blue-100 text-lg">Here's your hiring performance overview</p>
        </div>
        <div className="hidden lg:flex space-x-4">
          <Button size="lg" variant="secondary">
            <Zap className="h-5 w-5 mr-2" />
            AI Insights
          </Button>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={onCreateJob}>
            Start New Search
          </Button>
        </div>
      </div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default WelcomeSection;
