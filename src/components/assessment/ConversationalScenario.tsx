
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

interface ConversationalScenarioProps {
  scenario: {
    title: string;
    context: string;
    initialMessage: string;
    expectedResponses: string[];
  };
  onComplete: (responses: string[]) => void;
  timeLimit?: number;
}

const ConversationalScenario: React.FC<ConversationalScenarioProps> = ({
  scenario,
  onComplete,
  timeLimit = 300 // 5 minutes default
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    // Initialize with bot's first message
    setMessages([{
      id: '1',
      sender: 'bot',
      content: scenario.initialMessage,
      timestamp: new Date()
    }]);

    // Start timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserResponses(prev => [...prev, currentInput]);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's an interesting perspective. Can you elaborate on how you would handle the technical challenges?",
        "I see. What would be your next step if the stakeholder pushes back on your explanation?",
        "Good point. How would you measure the success of this approach?",
        "Thanks for that insight. One final question: How would you prevent this issue from happening again?"
      ];
      
      const responseIndex = Math.min(userResponses.length, botResponses.length - 1);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: botResponses[responseIndex],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Complete after 3-4 exchanges
      if (userResponses.length >= 3) {
        setTimeout(() => handleComplete(), 2000);
      }
    }, 1500);

    setCurrentInput('');
  };

  const handleComplete = () => {
    setIsComplete(true);
    onComplete(userResponses);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Scenario Header */}
      <Card className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2">{scenario.title}</h3>
          <p className="text-blue-100 text-sm mb-3">{scenario.context}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Role-Play Simulation
            </Badge>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'bot' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {message.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'bot' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'bot' ? 'text-gray-500' : 'text-blue-100'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      {!isComplete && (
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Type your response here..."
                className="flex-1 min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!currentInput.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </CardContent>
        </Card>
      )}

      {isComplete && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-green-900 mb-2">Simulation Complete!</h3>
            <p className="text-green-700 text-sm">
              Great job! Your responses have been recorded and will be evaluated.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConversationalScenario;
