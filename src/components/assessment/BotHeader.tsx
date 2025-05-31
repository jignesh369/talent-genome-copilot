
import React from 'react';
import { Bot, Clock, Zap, Heart, MessageSquare } from 'lucide-react';
import { AssessmentQuestion } from '@/types/assessment';

interface BotHeaderProps {
  question: AssessmentQuestion;
}

const BotHeader: React.FC<BotHeaderProps> = ({ question }) => {
  const getCategoryIcon = () => {
    switch (question.category) {
      case 'technical': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'speed': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'culture': return <Heart className="w-5 h-5 text-pink-500" />;
      case 'communication': return <MessageSquare className="w-5 h-5 text-green-500" />;
      default: return <Bot className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">AI Assessment Bot</p>
        <div className="flex items-center space-x-2">
          {getCategoryIcon()}
          <span className="text-sm font-medium capitalize text-gray-700">
            {question.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BotHeader;
