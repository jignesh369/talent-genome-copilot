
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
  BarChart3,
  FileText,
  Zap,
  Shield,
  TrendingUp,
  Database
} from 'lucide-react';

const StartupAdminSidebar: React.FC = () => {
  const menuSections = [
    {
      items: [
        { value: "overview", label: "Dashboard", icon: LayoutDashboard, description: "Real-time platform overview" }
      ]
    },
    {
      title: "Intelligence",
      items: [
        { value: "analytics", label: "Revenue Analytics", icon: BarChart3, description: "Advanced revenue insights & forecasting", highlight: true },
        { value: "performance", label: "Performance Hub", icon: Globe, description: "Global performance monitoring" },
        { value: "predictive", label: "AI Predictions", icon: Brain, description: "Predictive analytics & insights", new: true }
      ]
    },
    {
      title: "Operations",
      items: [
        { value: "organizations", label: "Organizations", icon: Building, description: "Manage customer accounts" },
        { value: "billing", label: "Billing Center", icon: CreditCard, description: "Revenue & subscription management" },
        { value: "logs", label: "Audit Logs", icon: FileText, description: "System activity & security logs", new: true }
      ]
    },
    {
      title: "Platform",
      items: [
        { value: "health", label: "System Health", icon: Activity, description: "Infrastructure monitoring" },
        { value: "ai-models", label: "AI Models", icon: Zap, description: "ML model management" },
        { value: "features", label: "Feature Control", icon: Flag, description: "Release management" },
        { value: "security", label: "Security Center", icon: Shield, description: "Platform security overview", new: true }
      ]
    }
  ];

  return (
    <div className="col-span-3">
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <h3 className="font-semibold text-gray-900">Platform Control</h3>
          <p className="text-xs text-gray-600 mt-1">Advanced admin tools</p>
        </div>
        
        <TabsList className="flex flex-col h-auto w-full p-0 bg-transparent space-y-0">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="w-full">
              {section.title && (
                <div className="px-4 py-3 bg-gray-50/50">
                  <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider">{section.title}</h4>
                </div>
              )}
              <div className="p-2 space-y-1">
                {section.items.map((item) => (
                  <TabsTrigger 
                    key={item.value}
                    value={item.value} 
                    className="group w-full justify-start h-auto px-3 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 rounded-lg transition-all duration-200 hover:bg-gray-50 relative"
                  >
                    <div className="flex items-center w-full">
                      <div className={`p-2 rounded-lg mr-3 flex-shrink-0 transition-colors ${
                        item.highlight ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600' : 
                        'bg-gray-100 text-gray-600 group-data-[state=active]:bg-blue-100 group-data-[state=active]:text-blue-600'
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.label}</span>
                          {item.new && (
                            <span className="px-1.5 py-0.5 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs rounded-full font-medium">
                              NEW
                            </span>
                          )}
                          {item.highlight && (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </div>
              {sectionIndex < menuSections.length - 1 && (
                <div className="mx-4 border-b border-gray-100" />
              )}
            </div>
          ))}
        </TabsList>
        
        <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 border-t">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Platform v2.1.0</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupAdminSidebar;
