
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';
import FormSection from '@/components/shared/FormSection';
import AvatarUpload from '@/components/profile/AvatarUpload';
import { useToast } from '@/hooks/use-toast';

const ProfileForm: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Experienced recruiter with 5+ years in tech hiring.',
    avatarUrl: ''
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

  const handleAvatarUpload = () => {
    toast({
      title: "Avatar Upload",
      description: "Avatar upload functionality will be implemented.",
    });
  };

  return (
    <FormSection 
      title="Personal Information" 
      icon={User}
      onSave={handleSaveProfile}
      saveLabel="Save Profile"
      loading={loading}
    >
      <AvatarUpload
        avatarUrl={profile.avatarUrl}
        firstName={profile.firstName}
        lastName={profile.lastName}
        onUpload={handleAvatarUpload}
      />

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

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={profile.phone}
          onChange={(e) => setProfile({...profile, phone: e.target.value})}
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
          rows={3}
        />
      </div>
    </FormSection>
  );
};

export default ProfileForm;
