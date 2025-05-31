
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle,
  AlertTriangle,
  Clock,
  Users
} from 'lucide-react';

interface ReleaseStatisticsProps {
  features: any[];
  organizations: any[];
}

const ReleaseStatistics: React.FC<ReleaseStatisticsProps> = ({ features, organizations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stable Features</p>
              <p className="text-3xl font-bold text-gray-900">
                {features.filter(f => f.status === 'stable').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Beta Features</p>
              <p className="text-3xl font-bold text-gray-900">
                {features.filter(f => f.status === 'beta').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Development</p>
              <p className="text-3xl font-bold text-gray-900">
                {features.filter(f => f.status === 'development').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Organizations</p>
              <p className="text-3xl font-bold text-gray-900">{organizations.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseStatistics;
