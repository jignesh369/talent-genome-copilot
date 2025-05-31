
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface ProfilePreviewProps {
  profile: Partial<EnhancedCandidate>;
  onCreateProfile: () => void;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ profile, onCreateProfile }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
          Generated Profile Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <p className="font-medium">{profile.name}</p>
          </div>
          <div>
            <Label>Current Title</Label>
            <p className="font-medium">{profile.current_title}</p>
          </div>
          <div>
            <Label>Company</Label>
            <p className="font-medium">{profile.current_company}</p>
          </div>
          <div>
            <Label>Experience</Label>
            <p className="font-medium">{profile.experience_years} years</p>
          </div>
        </div>

        {profile.skills && profile.skills.length > 0 && (
          <div>
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label>AI Summary</Label>
          <p className="text-sm text-gray-600 mt-1">{profile.ai_summary}</p>
        </div>

        <Button onClick={onCreateProfile} className="w-full">
          <CheckCircle className="h-4 w-4 mr-2" />
          Create Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfilePreview;
