
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Shield, 
  MessageSquare, 
  Bell, 
  Mail,
  Link, 
  Zap, 
  Brain, 
  CreditCard, 
  Palette, 
  Settings 
} from 'lucide-react';

const CustomerAdminSidebar: React.FC = () => {
  return (
    <div className="col-span-3">
      <TabsList className="flex flex-col h-auto w-full p-1 bg-white border shadow-sm space-y-1">
        {/* Dashboard Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
            Dashboard
          </div>
          <TabsTrigger value="overview" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <BarChart3 className="w-4 h-4 mr-3" />
            Overview
          </TabsTrigger>
        </div>

        {/* Analytics Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
            Analytics
          </div>
          <TabsTrigger value="analytics" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <BarChart3 className="w-4 h-4 mr-3" />
            Advanced Analytics
          </TabsTrigger>
          <TabsTrigger value="performance" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Zap className="w-4 h-4 mr-3" />
            Performance
          </TabsTrigger>
        </div>

        {/* Team Management Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
            Team Management
          </div>
          <TabsTrigger value="team" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Users className="w-4 h-4 mr-3" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="roles" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Shield className="w-4 h-4 mr-3" />
            Roles & Permissions
          </TabsTrigger>
        </div>

        {/* Communications Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
            Communications
          </div>
          <TabsTrigger value="communication" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <MessageSquare className="w-4 h-4 mr-3" />
            Communication Hub
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Bell className="w-4 h-4 mr-3" />
            Smart Notifications
          </TabsTrigger>
        </div>

        {/* Integrations & Automation Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
            Integrations & Automation
          </div>
          <TabsTrigger value="email-calendar" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Mail className="w-4 h-4 mr-3" />
            Email & Calendar
          </TabsTrigger>
          <TabsTrigger value="integrations" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Link className="w-4 h-4 mr-3" />
            Platform Integrations
          </TabsTrigger>
          <TabsTrigger value="automation" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Zap className="w-4 h-4 mr-3" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="ai-config" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Brain className="w-4 h-4 mr-3" />
            AI Configuration
          </TabsTrigger>
        </div>

        {/* System Settings Section */}
        <div className="w-full">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
            System Settings
          </div>
          <TabsTrigger value="billing" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <CreditCard className="w-4 h-4 mr-3" />
            Billing & Plans
          </TabsTrigger>
          <TabsTrigger value="themes" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Palette className="w-4 h-4 mr-3" />
            Themes & Branding
          </TabsTrigger>
          <TabsTrigger value="system" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <Settings className="w-4 h-4 mr-3" />
            System Configuration
          </TabsTrigger>
        </div>
      </TabsList>
    </div>
  );
};

export default CustomerAdminSidebar;
