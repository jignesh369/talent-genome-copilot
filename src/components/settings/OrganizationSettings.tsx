
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building } from 'lucide-react';
import FormSection from '@/components/shared/FormSection';

const OrganizationSettings: React.FC = () => {
  const [organization, setOrganization] = useState({
    name: 'TechCorp Inc.',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '51-200 employees',
    description: 'Leading technology company focused on innovation.'
  });

  const handleSaveOrganization = () => {
    // TODO: Implement save functionality
    console.log('Saving organization settings:', organization);
  };

  return (
    <FormSection 
      title="Organization Details" 
      icon={Building}
      onSave={handleSaveOrganization}
      saveLabel="Save Organization"
    >
      <div>
        <Label htmlFor="orgName">Organization Name</Label>
        <Input
          id="orgName"
          value={organization.name}
          onChange={(e) => setOrganization({...organization, name: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={organization.website}
            onChange={(e) => setOrganization({...organization, website: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={organization.industry}
            onChange={(e) => setOrganization({...organization, industry: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={organization.description}
          onChange={(e) => setOrganization({...organization, description: e.target.value})}
          rows={3}
        />
      </div>
    </FormSection>
  );
};

export default OrganizationSettings;
