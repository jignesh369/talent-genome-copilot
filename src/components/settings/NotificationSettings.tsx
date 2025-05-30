
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Bell } from 'lucide-react';
import FormSection from '@/components/shared/FormSection';
import { useToast } from '@/hooks/use-toast';

const NotificationSettings: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState({
    emailNewApplications: true,
    emailInterviewReminders: true,
    emailOfferUpdates: true,
    pushNotifications: true,
    weeklyReports: false,
    marketingEmails: false
  });

  const handleSaveNotifications = async () => {
    setLoading(true);
    // TODO: Integrate with Supabase
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Notification Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };

  return (
    <FormSection 
      title="Notification Preferences" 
      icon={Bell}
      onSave={handleSaveNotifications}
      saveLabel="Save Preferences"
      loading={loading}
    >
      <div className="space-y-4">
        <h4 className="font-medium">Email Notifications</h4>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>New Applications</Label>
            <p className="text-sm text-gray-600">Get notified when candidates apply to your jobs</p>
          </div>
          <Switch
            checked={notifications.emailNewApplications}
            onCheckedChange={(checked) => 
              setNotifications({...notifications, emailNewApplications: checked})
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Interview Reminders</Label>
            <p className="text-sm text-gray-600">Reminders for upcoming interviews</p>
          </div>
          <Switch
            checked={notifications.emailInterviewReminders}
            onCheckedChange={(checked) => 
              setNotifications({...notifications, emailInterviewReminders: checked})
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Weekly Reports</Label>
            <p className="text-sm text-gray-600">Weekly hiring pipeline summary</p>
          </div>
          <Switch
            checked={notifications.weeklyReports}
            onCheckedChange={(checked) => 
              setNotifications({...notifications, weeklyReports: checked})
            }
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Push Notifications</h4>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Browser Notifications</Label>
            <p className="text-sm text-gray-600">Real-time notifications in your browser</p>
          </div>
          <Switch
            checked={notifications.pushNotifications}
            onCheckedChange={(checked) => 
              setNotifications({...notifications, pushNotifications: checked})
            }
          />
        </div>
      </div>
    </FormSection>
  );
};

export default NotificationSettings;
