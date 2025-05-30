
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search } from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);

  const conversations = [
    {
      id: 1,
      recruiter: "Sarah Johnson",
      company: "TechCorp",
      role: "Frontend Developer",
      lastMessage: "Great! Interview confirmed for tomorrow at 2 PM",
      timestamp: "2 hours ago",
      unread: 2
    },
    {
      id: 2,
      recruiter: "Mike Chen",
      company: "StartupXYZ",
      role: "Full Stack Engineer",
      lastMessage: "Looking forward to our call tomorrow!",
      timestamp: "1 day ago",
      unread: 0
    }
  ];

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                      selectedConversation === conv.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                            {conv.recruiter.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{conv.recruiter}</p>
                          <p className="text-xs text-gray-600">{conv.company}</p>
                          <p className="text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                        </div>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">{conv.unread}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                Select a conversation to start messaging
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateMessages;
