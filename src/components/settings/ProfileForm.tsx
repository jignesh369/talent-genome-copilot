
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import FormSection from '@/components/shared/FormSection';
import AvatarUpload from '@/components/profile/AvatarUpload';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

const ProfileForm: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    title: '',
    department: '',
    bio: '',
    location: '',
    timezone: 'UTC-8'
  });

  const handleSaveProfile = async () => {
    setLoading(true);
    // TODO: Integrate with Supabase
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    }, 1000);
  };

  return (
    <FormSection 
      title="Profile Information" 
      onSave={handleSaveProfile}
      saveLabel="Save Profile"
      loading={loading}
    >
      <AvatarUpload
        avatarUrl={user?.user_metadata?.avatar_url}
        firstName={profile.firstName}
        lastName={profile.lastName}
      />

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={profile.firstName}
            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={profile.lastName}
            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({...profile, email: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            value={profile.title}
            onChange={(e) => setProfile({...profile, title: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
          placeholder="Tell us about yourself..."
          rows={3}
        />
      </div>
    </FormSection>
  );
};

export default ProfileForm;
