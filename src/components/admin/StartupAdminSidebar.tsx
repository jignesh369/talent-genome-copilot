
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  CreditCard, 
  Activity, 
  Brain, 
  Flag, 
  Globe, 
  DollarSign,
  BarChart3
} from 'lucide-react';

const StartupAdminSidebar: React.FC = () => {
  const menuSections = [
    {
      items: [
        { value: "overview", label: "Dashboard", icon: LayoutDashboard }
      ]
    },
    {
      title: "Analytics",
      items: [
        { value: "performance", label: "Global Performance", icon: Globe },
        { value: "revenue", label: "Revenue", icon: DollarSign },
        { value: "analytics", label: "Advanced Analytics", icon: BarChart3 },
        { value: "team", label: "Team Analytics", icon: Users }
      ]
    },
    {
      title: "System",
      items: [
        { value: "health", label: "System Health", icon: Activity },
        { value: "ai-models", label: "AI Models", icon: Brain },
        { value: "features", label: "Features", icon: Flag }
      ]
    },
    {
      title: "Management",
      items: [
        { value: "organizations", label: "Organizations", icon: Building },
        { value: "billing", label: "Billing", icon: CreditCard }
      ]
    }
  ];

  return (
    <div className="col-span-3">
      <div className="bg-white border rounded-lg shadow-sm">
        <TabsList className="flex flex-col h-auto w-full p-0 bg-transparent space-y-0">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="w-full">
              {section.title && (
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-600">{section.title}</h3>
                </div>
              )}
              <div className="p-2 space-y-1">
                {section.items.map((item) => (
                  <TabsTrigger 
                    key={item.value}
                    value={item.value} 
                    className="w-full justify-start h-10 px-3 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 rounded-md transition-colors"
                  >
                    <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </TabsTrigger>
                ))}
              </div>
              {sectionIndex < menuSections.length - 1 && (
                <div className="border-b border-gray-100" />
              )}
            </div>
          ))}
        </TabsList>
      </div>
    </div>
  );
};

export default StartupAdminSidebar;
