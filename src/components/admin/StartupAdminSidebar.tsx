
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Building, 
  CreditCard, 
  Activity, 
  Brain, 
  Flag, 
  Globe, 
  DollarSign 
} from 'lucide-react';

const StartupAdminSidebar: React.FC = () => {
  return (
    <div className="col-span-3">
      <TabsList className="flex flex-col h-auto w-full p-1 bg-white border shadow-sm space-y-1">
        {/* Dashboard Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
            Dashboard
          </div>
          <TabsTrigger value="overview" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <BarChart3 className="w-4 h-4 mr-3" />
            Overview
          </TabsTrigger>
        </div>

        {/* Performance & Analytics Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
            Performance & Analytics
          </div>
          <TabsTrigger value="performance" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Globe className="w-4 h-4 mr-3" />
            Global Performance
          </TabsTrigger>
          <TabsTrigger value="revenue" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <DollarSign className="w-4 h-4 mr-3" />
            Revenue Analytics
          </TabsTrigger>
          <TabsTrigger value="analytics" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <BarChart3 className="w-4 h-4 mr-3" />
            Advanced Analytics
          </TabsTrigger>
          <TabsTrigger value="team" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Users className="w-4 h-4 mr-3" />
            Team Analytics
          </TabsTrigger>
        </div>

        {/* System Management Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
            System Management
          </div>
          <TabsTrigger value="health" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Activity className="w-4 h-4 mr-3" />
            System Health
          </TabsTrigger>
          <TabsTrigger value="ai-models" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Brain className="w-4 h-4 mr-3" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="features" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Flag className="w-4 h-4 mr-3" />
            Feature Control
          </TabsTrigger>
        </div>

        {/* Customer Management Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
            Customer Management
          </div>
          <TabsTrigger value="organizations" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Building className="w-4 h-4 mr-3" />
            Organizations
          </TabsTrigger>
          <TabsTrigger value="billing" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <CreditCard className="w-4 h-4 mr-3" />
            Billing Management
          </TabsTrigger>
        </div>
      </TabsList>
    </div>
  );
};

export default StartupAdminSidebar;
