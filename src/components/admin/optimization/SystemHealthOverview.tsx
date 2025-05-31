
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, Cpu, Clock } from 'lucide-react';

const SystemHealthOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          System Health Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-900">Excellent</h3>
            <p className="text-sm text-green-700">System performing optimally</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-900">98.7%</h3>
            <p className="text-sm text-blue-700">Overall performance score</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-900">99.9%</h3>
            <p className="text-sm text-purple-700">Uptime this month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealthOverview;
