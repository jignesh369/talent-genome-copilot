
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CommunicationChannel } from '@/services/realTimeCommunicationService';
import { realTimeCommunicationService } from '@/services/realTimeCommunicationService';
import { LucideIcon } from 'lucide-react';

interface ChannelListProps {
  channels: CommunicationChannel[];
  selectedChannel: CommunicationChannel | null;
  onChannelSelect: (channel: CommunicationChannel) => void;
  getChannelIcon: (type: string) => LucideIcon;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  selectedChannel,
  onChannelSelect,
  getChannelIcon
}) => {
  const formatLastMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-1">
      {channels.map((channel) => {
        const IconComponent = getChannelIcon(channel.type);
        const unreadCount = realTimeCommunicationService.getUnreadMessagesForChannel(channel.id);
        const isSelected = selectedChannel?.id === channel.id;

        return (
          <button
            key={channel.id}
            onClick={() => onChannelSelect(channel)}
            className={cn(
              "w-full p-3 text-left rounded-lg transition-colors hover:bg-white",
              isSelected ? "bg-white shadow-sm border" : "hover:bg-gray-100"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                channel.type === 'direct' ? 'bg-green-100' : 'bg-blue-100'
              )}>
                <IconComponent className={cn(
                  "h-4 w-4",
                  channel.type === 'direct' ? 'text-green-600' : 'text-blue-600'
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={cn(
                    "text-sm font-medium truncate",
                    unreadCount > 0 ? "text-gray-900" : "text-gray-700"
                  )}>
                    {channel.name}
                  </p>
                  {channel.last_message && (
                    <span className="text-xs text-gray-500">
                      {formatLastMessageTime(channel.last_message.timestamp)}
                    </span>
                  )}
                </div>
                {channel.last_message && (
                  <p className={cn(
                    "text-xs truncate mt-1",
                    unreadCount > 0 ? "text-gray-600 font-medium" : "text-gray-500"
                  )}>
                    {channel.last_message.sender_name}: {channel.last_message.content}
                  </p>
                )}
              </div>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </button>
        );
      })}
      {channels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No channels found</p>
        </div>
      )}
    </div>
  );
};

export default ChannelList;
