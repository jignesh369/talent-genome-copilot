
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Plus, Search, Edit } from 'lucide-react';
import { Organization } from '@/types/organization';

interface StartupAdminOrganizationsProps {
  organizations: Organization[];
  onCreateOrganization: () => void;
  onViewOrganization: (org: Organization) => void;
  onEditOrganization: (org: Organization) => void;
}

const StartupAdminOrganizations: React.FC<StartupAdminOrganizationsProps> = ({
  organizations,
  onCreateOrganization,
  onViewOrganization,
  onEditOrganization
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Customer Organizations ({organizations.length})
          </CardTitle>
          <Button size="sm" onClick={onCreateOrganization}>
            <Plus className="w-4 h-4 mr-2" />
            Add Organization
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {organizations.map((org) => (
            <div key={org.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {org.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{org.name}</h4>
                  <p className="text-sm text-gray-600">{org.contactEmail}</p>
                  <p className="text-xs text-gray-500">{org.domain}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <Badge className={
                    org.plan === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                    org.plan === 'professional' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {org.plan}
                  </Badge>
                  <p className="text-xs text-gray-600 mt-1">{org.userLimit} users</p>
                </div>
                
                <Badge 
                  variant={org.status === 'active' ? 'default' : org.status === 'trial' ? 'secondary' : 'outline'}
                  className={
                    org.status === 'active' ? 'bg-green-100 text-green-800' : 
                    org.status === 'trial' ? 'bg-blue-100 text-blue-800' : ''
                  }
                >
                  {org.status}
                </Badge>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewOrganization(org)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditOrganization(org)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StartupAdminOrganizations;
