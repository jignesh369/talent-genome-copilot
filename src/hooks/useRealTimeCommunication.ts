
import { useState, useEffect } from 'react';
import { 
  realTimeCommunicationService, 
  CommunicationChannel, 
  Message, 
  NotificationPreferences 
} from '@/services/realTimeCommunicationService';

export const useRealTimeCommunication = () => {
  const [channels, setChannels] = useState<CommunicationChannel[]>([]);
  const [connectionStatus, setConnectionStatus] = useState(realTimeCommunicationService.getConnectionStatus());
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeCommunication();
  }, []);

  const initializeCommunication = async () => {
    setLoading(true);
    try {
      await realTimeCommunicationService.connect();
      loadChannels();
      updateUnreadCount();
      setConnectionStatus(realTimeCommunicationService.getConnectionStatus());
    } catch (error) {
      console.error('Failed to initialize communication:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChannels = () => {
    const channelList = realTimeCommunicationService.getChannels();
    setChannels(channelList);
  };

  const updateUnreadCount = () => {
    const count = realTimeCommunicationService.getUnreadMessageCount();
    setUnreadCount(count);
  };

  const sendMessage = (channelId: string, content: string, messageType: Message['message_type'] = 'text') => {
    const message = realTimeCommunicationService.sendMessage(channelId, content, '1', messageType);
    loadChannels(); // Refresh channels to update last message
    updateUnreadCount();
    return message;
  };

  const createChannel = (name: string, type: CommunicationChannel['type'], participants: string[]) => {
    const channel = realTimeCommunicationService.createChannel(name, type, participants);
    loadChannels();
    return channel;
  };

  const markChannelAsRead = (channelId: string) => {
    realTimeCommunicationService.markAllMessagesAsRead(channelId);
    updateUnreadCount();
  };

  const searchMessages = (query: string, channelId?: string) => {
    return realTimeCommunicationService.searchMessages(query, channelId);
  };

  const startTyping = (channelId: string, userId: string, userName: string) => {
    realTimeCommunicationService.startTyping(channelId, userId, userName);
  };

  const stopTyping = (channelId: string, userId: string) => {
    realTimeCommunicationService.stopTyping(channelId, userId);
  };

  const getMessagesForChannel = (channelId: string) => {
    return realTimeCommunicationService.getMessages(channelId);
  };

  const getTypingIndicators = (channelId: string) => {
    return realTimeCommunicationService.getTypingIndicators(channelId);
  };

  const disconnect = () => {
    realTimeCommunicationService.disconnect();
    setConnectionStatus('disconnected');
  };

  const reconnect = async () => {
    try {
      await realTimeCommunicationService.connect();
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Failed to reconnect:', error);
    }
  };

  return {
    channels,
    connectionStatus,
    unreadCount,
    loading,
    sendMessage,
    createChannel,
    markChannelAsRead,
    searchMessages,
    startTyping,
    stopTyping,
    getMessagesForChannel,
    getTypingIndicators,
    disconnect,
    reconnect,
    refreshChannels: loadChannels,
    refreshUnreadCount: updateUnreadCount
  };
};
