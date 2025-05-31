
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageSquare,
  Phone,
  Video,
  Users,
  Search,
  Plus,
  Settings,
  Bell,
  Send,
  Paperclip,
  Smile,
  MoreVertical
} from 'lucide-react';
import { realTimeCommunicationService, CommunicationChannel, Message } from '@/services/realTimeCommunicationService';
import ChannelList from './ChannelList';
import MessageThread from './MessageThread';
import TypingIndicator from './TypingIndicator';

const CommunicationHub = () => {
  const [channels, setChannels] = useState<CommunicationChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<CommunicationChannel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState(realTimeCommunicationService.getConnectionStatus());
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadChannels();
    updateUnreadCount();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      loadMessages(selectedChannel.id);
    }
  }, [selectedChannel]);

  const loadChannels = () => {
    const channelList = realTimeCommunicationService.getChannels();
    setChannels(channelList);
    if (channelList.length > 0 && !selectedChannel) {
      setSelectedChannel(channelList[0]);
    }
  };

  const loadMessages = (channelId: string) => {
    const channelMessages = realTimeCommunicationService.getMessages(channelId);
    setMessages(channelMessages);
  };

  const updateUnreadCount = () => {
    const count = realTimeCommunicationService.getUnreadMessageCount();
    setUnreadCount(count);
  };

  const handleChannelSelect = (channel: CommunicationChannel) => {
    setSelectedChannel(channel);
    // Mark messages as read when channel is selected
    realTimeCommunicationService.markAllMessagesAsRead(channel.id);
    updateUnreadCount();
  };

  const handleSendMessage = (content: string) => {
    if (selectedChannel && content.trim()) {
      const newMessage = realTimeCommunicationService.sendMessage(
        selectedChannel.id,
        content,
        '1' // Current user ID
      );
      setMessages(prev => [...prev, newMessage]);
      loadChannels(); // Refresh channels to update last message
    }
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'direct': return MessageSquare;
      case 'group': return Users;
      case 'announcement': return Bell;
      case 'interview_room': return Video;
      default: return MessageSquare;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Communication Hub</h1>
            <p className="text-sm text-gray-500">
              Status: <span className={connectionStatus === 'connected' ? 'text-green-600' : 'text-red-600'}>
                {connectionStatus}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="px-2 py-1">
              {unreadCount} unread
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Chat
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r bg-gray-50">
          <Tabs defaultValue="channels" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 m-2">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="direct">Direct</TabsTrigger>
              <TabsTrigger value="calls">Calls</TabsTrigger>
            </TabsList>
            
            <TabsContent value="channels" className="flex-1 p-2">
              <ChannelList
                channels={channels.filter(c => c.type === 'group' || c.type === 'announcement')}
                selectedChannel={selectedChannel}
                onChannelSelect={handleChannelSelect}
                getChannelIcon={getChannelIcon}
              />
            </TabsContent>
            
            <TabsContent value="direct" className="flex-1 p-2">
              <ChannelList
                channels={channels.filter(c => c.type === 'direct')}
                selectedChannel={selectedChannel}
                onChannelSelect={handleChannelSelect}
                getChannelIcon={getChannelIcon}
              />
            </TabsContent>
            
            <TabsContent value="calls" className="flex-1 p-2">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Start Voice Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Start Video Call
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChannel ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {React.createElement(getChannelIcon(selectedChannel.type), { 
                      className: "h-4 w-4 text-blue-600" 
                    })}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedChannel.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedChannel.participants.length} participant{selectedChannel.participants.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-hidden">
                <MessageThread
                  messages={messages}
                  currentUserId="1"
                  onSendMessage={handleSendMessage}
                />
              </div>

              {/* Typing Indicator */}
              <TypingIndicator channelId={selectedChannel.id} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a channel or direct message to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationHub;
