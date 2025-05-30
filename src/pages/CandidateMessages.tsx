
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, Phone, Video, MoreHorizontal, Paperclip } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "recruiter",
      content: "Hi Alex! Thanks for your application to the Frontend Developer position. I'd love to schedule a quick chat to discuss your experience.",
      timestamp: "2 days ago",
      avatar: "SJ"
    },
    {
      id: 2,
      sender: "candidate",
      content: "Hi Sarah! Thank you for reaching out. I'm very interested in the position and would be happy to chat. What times work best for you?",
      timestamp: "2 days ago",
      avatar: "AK"
    },
    {
      id: 3,
      sender: "recruiter",
      content: "Perfect! How about tomorrow at 2 PM for a 30-minute video call? I'll send you the meeting link.",
      timestamp: "1 day ago",
      avatar: "SJ"
    },
    {
      id: 4,
      sender: "candidate",
      content: "That works perfectly for me! Looking forward to it.",
      timestamp: "1 day ago",
      avatar: "AK"
    },
    {
      id: 5,
      sender: "recruiter",
      content: "Great! Interview confirmed for tomorrow at 2 PM. Here's the meeting link: https://meet.google.com/abc-defg-hij",
      timestamp: "2 hours ago",
      avatar: "SJ"
    }
  ]);

  const conversations = [
    {
      id: 1,
      recruiter: "Sarah Johnson",
      company: "TechCorp",
      role: "Frontend Developer",
      lastMessage: "Great! Interview confirmed for tomorrow at 2 PM",
      timestamp: "2 hours ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      recruiter: "Mike Chen",
      company: "StartupXYZ",
      role: "Full Stack Engineer",
      lastMessage: "Looking forward to our call tomorrow!",
      timestamp: "1 day ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      recruiter: "Emily Davis",
      company: "DesignCorp",
      role: "UI/UX Designer",
      lastMessage: "Could you share your portfolio?",
      timestamp: "3 days ago",
      unread: 1,
      online: true
    }
  ];

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "candidate" as const,
        content: newMessage,
        timestamp: "Just now",
        avatar: "AK"
      };
      
      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
      
      toast({
        title: "Message Sent",
        description: "Your message has been delivered successfully.",
      });
    }
  };

  const handlePhoneCall = () => {
    toast({
      title: "Phone Call",
      description: "Initiating phone call with recruiter...",
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Video Call",
      description: "Starting video call with recruiter...",
    });
  };

  const handleAttachFile = () => {
    toast({
      title: "File Attachment",
      description: "File attachment feature coming soon!",
    });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.recruiter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              <div className="space-y-1">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                      selectedConversation === conv.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                              {conv.recruiter.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conv.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 text-sm truncate">{conv.recruiter}</p>
                            <span className="text-xs text-gray-500">{conv.timestamp}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{conv.company} • {conv.role}</p>
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        </div>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="bg-red-500 text-white text-xs ml-2">{conv.unread}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-2 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {currentConversation.recruiter.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {currentConversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{currentConversation.recruiter}</h3>
                        <p className="text-sm text-gray-600">{currentConversation.company} • {currentConversation.role}</p>
                        <p className="text-xs text-green-600">{currentConversation.online ? 'Online' : 'Offline'}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handlePhoneCall}>
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleVideoCall}>
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'candidate' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                        message.sender === 'candidate' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={`text-white text-xs ${
                            message.sender === 'candidate' 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                              : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}>
                            {message.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg px-4 py-2 ${
                          message.sender === 'candidate'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'candidate' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleAttachFile}>
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                  <p>Choose a conversation from the sidebar to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateMessages;
