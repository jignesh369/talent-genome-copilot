
export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  recipient_id?: string;
  channel_id?: string;
  content: string;
  message_type: 'text' | 'file' | 'system' | 'interview_invite' | 'offer_update';
  timestamp: string;
  read: boolean;
  thread_id?: string;
  attachments?: MessageAttachment[];
  metadata?: Record<string, any>;
}

export interface MessageAttachment {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  url: string;
}

export interface CommunicationChannel {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'announcement' | 'interview_room';
  participants: ChannelParticipant[];
  last_message?: Message;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface ChannelParticipant {
  user_id: string;
  user_name: string;
  user_avatar?: string;
  role: 'admin' | 'member' | 'guest';
  joined_at: string;
  last_seen?: string;
}

export interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  desktop_notifications: boolean;
  notification_types: {
    messages: boolean;
    interviews: boolean;
    offers: boolean;
    system_updates: boolean;
  };
}

export interface TypingIndicator {
  user_id: string;
  user_name: string;
  channel_id: string;
  timestamp: string;
}

class RealTimeCommunicationService {
  private messages: Map<string, Message[]> = new Map();
  private channels: Map<string, CommunicationChannel> = new Map();
  private typingIndicators: Map<string, TypingIndicator[]> = new Map();
  private connectionStatus: 'connected' | 'disconnected' | 'connecting' = 'connected';

  constructor() {
    this.initializeMockData();
  }

  // Connection management
  getConnectionStatus(): 'connected' | 'disconnected' | 'connecting' {
    return this.connectionStatus;
  }

  connect(): Promise<void> {
    this.connectionStatus = 'connecting';
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connectionStatus = 'connected';
        resolve();
      }, 1000);
    });
  }

  disconnect(): void {
    this.connectionStatus = 'disconnected';
  }

  // Channel management
  getChannels(): CommunicationChannel[] {
    return Array.from(this.channels.values());
  }

  getChannel(channelId: string): CommunicationChannel | null {
    return this.channels.get(channelId) || null;
  }

  createChannel(name: string, type: CommunicationChannel['type'], participants: string[]): CommunicationChannel {
    const channel: CommunicationChannel = {
      id: Date.now().toString(),
      name,
      type,
      participants: participants.map(userId => ({
        user_id: userId,
        user_name: `User ${userId}`,
        role: 'member',
        joined_at: new Date().toISOString()
      })),
      created_at: new Date().toISOString()
    };

    this.channels.set(channel.id, channel);
    this.messages.set(channel.id, []);
    return channel;
  }

  // Message management
  getMessages(channelId: string): Message[] {
    return this.messages.get(channelId) || [];
  }

  sendMessage(channelId: string, content: string, senderId: string, messageType: Message['message_type'] = 'text'): Message {
    const message: Message = {
      id: Date.now().toString(),
      sender_id: senderId,
      sender_name: `User ${senderId}`,
      channel_id: channelId,
      content,
      message_type: messageType,
      timestamp: new Date().toISOString(),
      read: false
    };

    const channelMessages = this.messages.get(channelId) || [];
    channelMessages.push(message);
    this.messages.set(channelId, channelMessages);

    // Update channel's last message
    const channel = this.channels.get(channelId);
    if (channel) {
      channel.last_message = message;
      this.channels.set(channelId, channel);
    }

    return message;
  }

  markMessageAsRead(messageId: string, channelId: string): void {
    const messages = this.messages.get(channelId);
    if (messages) {
      const message = messages.find(m => m.id === messageId);
      if (message) {
        message.read = true;
      }
    }
  }

  markAllMessagesAsRead(channelId: string): void {
    const messages = this.messages.get(channelId);
    if (messages) {
      messages.forEach(message => {
        message.read = true;
      });
    }
  }

  // Typing indicators
  startTyping(channelId: string, userId: string, userName: string): void {
    const indicators = this.typingIndicators.get(channelId) || [];
    const existingIndex = indicators.findIndex(i => i.user_id === userId);
    
    const indicator: TypingIndicator = {
      user_id: userId,
      user_name: userName,
      channel_id: channelId,
      timestamp: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      indicators[existingIndex] = indicator;
    } else {
      indicators.push(indicator);
    }

    this.typingIndicators.set(channelId, indicators);
  }

  stopTyping(channelId: string, userId: string): void {
    const indicators = this.typingIndicators.get(channelId) || [];
    const filtered = indicators.filter(i => i.user_id !== userId);
    this.typingIndicators.set(channelId, filtered);
  }

  getTypingIndicators(channelId: string): TypingIndicator[] {
    return this.typingIndicators.get(channelId) || [];
  }

  // Notifications
  getUnreadMessageCount(): number {
    let count = 0;
    this.messages.forEach(messages => {
      count += messages.filter(m => !m.read).length;
    });
    return count;
  }

  getUnreadMessagesForChannel(channelId: string): number {
    const messages = this.messages.get(channelId) || [];
    return messages.filter(m => !m.read).length;
  }

  // Search
  searchMessages(query: string, channelId?: string): Message[] {
    const searchChannels = channelId ? [channelId] : Array.from(this.messages.keys());
    const results: Message[] = [];

    searchChannels.forEach(cId => {
      const messages = this.messages.get(cId) || [];
      const matches = messages.filter(m => 
        m.content.toLowerCase().includes(query.toLowerCase()) ||
        m.sender_name.toLowerCase().includes(query.toLowerCase())
      );
      results.push(...matches);
    });

    return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  private initializeMockData(): void {
    // Create sample channels
    const generalChannel = this.createChannel('General Discussion', 'group', ['1', '2', '3']);
    const hrChannel = this.createChannel('HR Team', 'group', ['1', '2']);
    const candidateChannel = this.createChannel('Jane Doe - Frontend Role', 'direct', ['1', '4']);

    // Add sample messages
    this.sendMessage(generalChannel.id, 'Welcome to the team communication hub!', '1', 'system');
    this.sendMessage(generalChannel.id, 'Thanks! Excited to be here.', '2');
    this.sendMessage(hrChannel.id, 'Weekly sync scheduled for Friday', '1');
    this.sendMessage(candidateChannel.id, 'Hi Jane! Thanks for your interest in our frontend position.', '1');
    this.sendMessage(candidateChannel.id, 'Thank you for reaching out! I\'m very excited about this opportunity.', '4');
  }
}

export const realTimeCommunicationService = new RealTimeCommunicationService();
