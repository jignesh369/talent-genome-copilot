
import React, { useState, useEffect } from 'react';
import { realTimeCommunicationService, TypingIndicator as TypingIndicatorType } from '@/services/realTimeCommunicationService';

interface TypingIndicatorProps {
  channelId: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ channelId }) => {
  const [typingUsers, setTypingUsers] = useState<TypingIndicatorType[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const indicators = realTimeCommunicationService.getTypingIndicators(channelId);
      const currentTime = new Date().getTime();
      
      // Filter out stale typing indicators (older than 3 seconds)
      const activeIndicators = indicators.filter(indicator => {
        const indicatorTime = new Date(indicator.timestamp).getTime();
        return currentTime - indicatorTime < 3000;
      });
      
      setTypingUsers(activeIndicators);
    }, 500);

    return () => clearInterval(interval);
  }, [channelId]);

  if (typingUsers.length === 0) {
    return null;
  }

  const getTypingText = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0].user_name} is typing...`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0].user_name} and ${typingUsers[1].user_name} are typing...`;
    } else {
      return `${typingUsers.length} people are typing...`;
    }
  };

  return (
    <div className="px-4 py-2 bg-gray-50 border-t">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span className="text-sm text-gray-600">{getTypingText()}</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
