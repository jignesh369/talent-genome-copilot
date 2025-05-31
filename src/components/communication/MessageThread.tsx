
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Message } from '@/services/realTimeCommunicationService';
import { cn } from '@/lib/utils';

interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  currentUserId,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const isToday = (date: string) => {
    return new Date(date).toDateString() === new Date().toDateString();
  };

  const isYesterday = (date: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(date).toDateString() === yesterday.toDateString();
  };

  const formatDateHeader = (dateString: string) => {
    if (isToday(dateString)) return 'Today';
    if (isYesterday(dateString)) return 'Yesterday';
    return new Date(dateString).toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-gray-600">
                  {formatDateHeader(date)}
                </span>
              </div>
            </div>

            {/* Messages for this date */}
            {dateMessages.map((message, index) => {
              const isOwnMessage = message.sender_id === currentUserId;
              const showAvatar = index === 0 || dateMessages[index - 1].sender_id !== message.sender_id;

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-end space-x-2 mb-2",
                    isOwnMessage ? "justify-end" : "justify-start"
                  )}
                >
                  {/* Avatar (for other users) */}
                  {!isOwnMessage && (
                    <div className={cn("w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600", showAvatar ? "visible" : "invisible")}>
                      {message.sender_name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={cn("max-w-xs lg:max-w-md", isOwnMessage ? "order-1" : "order-2")}>
                    {showAvatar && !isOwnMessage && (
                      <p className="text-xs text-gray-500 mb-1 ml-1">{message.sender_name}</p>
                    )}
                    
                    <div className={cn(
                      "px-4 py-2 rounded-lg",
                      message.message_type === 'system' 
                        ? "bg-gray-100 text-gray-700 text-center text-sm italic"
                        : isOwnMessage 
                          ? "bg-blue-600 text-white" 
                          : "bg-white border shadow-sm"
                    )}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.message_type !== 'system' && (
                        <div className={cn(
                          "flex items-center justify-between mt-1",
                          isOwnMessage ? "text-blue-100" : "text-gray-400"
                        )}>
                          <span className="text-xs">{formatMessageTime(message.timestamp)}</span>
                          {message.message_type === 'interview_invite' && (
                            <Badge variant="secondary" className="text-xs">Interview</Badge>
                          )}
                          {message.message_type === 'offer_update' && (
                            <Badge variant="secondary" className="text-xs">Offer</Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Avatar (for own messages) */}
                  {isOwnMessage && (
                    <div className={cn("w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-600 order-2", showAvatar ? "visible" : "invisible")}>
                      You
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <div className="flex items-end space-x-2">
          <Button variant="outline" size="sm" className="mb-2">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <Button variant="outline" size="sm" className="mb-2">
            <Smile className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="mb-2 bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
