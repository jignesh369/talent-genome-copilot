
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface AvatarUploadProps {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  onUpload?: () => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  firstName,
  lastName,
  onUpload
}) => {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`;

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <Button variant="outline" onClick={onUpload}>
          Upload Photo
        </Button>
        <p className="text-sm text-gray-600 mt-1">JPG, PNG or GIF (max 5MB)</p>
      </div>
    </div>
  );
};

export default AvatarUpload;
