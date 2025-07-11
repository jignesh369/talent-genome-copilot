
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, UserPlus, Briefcase, MessageSquare, Calendar, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'application' | 'interview' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
}

const NotificationDropdown = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'application',
      title: 'New Application',
      message: 'Sarah Johnson applied for Senior Developer position',
      timestamp: '2 minutes ago',
      unread: true
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview with Mike Chen scheduled for tomorrow 2 PM',
      timestamp: '1 hour ago',
      unread: true
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Emily Davis sent you a message about the Frontend role',
      timestamp: '3 hours ago',
      unread: false
    },
    {
      id: '4',
      type: 'system',
      title: 'Integration Update',
      message: 'Google Calendar integration has been successfully updated',
      timestamp: '1 day ago',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, unread: false }
          : notification
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.unread) {
      markAsRead(notification.id);
    }
    
    // Handle navigation based on notification type
    switch (notification.type) {
      case 'application':
        toast({
          title: "Opening Applications",
          description: "Redirecting to applications page...",
        });
        // window.location.href = '/candidates';
        break;
      case 'interview':
        toast({
          title: "Opening Calendar",
          description: "Redirecting to interview calendar...",
        });
        // window.location.href = '/calendar';
        break;
      case 'message':
        toast({
          title: "Opening Messages",
          description: "Redirecting to messages...",
        });
        // window.location.href = '/messages';
        break;
      default:
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <UserPlus className="h-4 w-4 text-blue-600" />;
      case 'interview':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      case 'system':
        return <CheckCircle2 className="h-4 w-4 text-orange-600" />;
      default:
        return <Briefcase className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-white border shadow-lg z-50" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className="cursor-pointer p-4 flex-col items-start hover:bg-gray-50"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-center text-blue-600 justify-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
