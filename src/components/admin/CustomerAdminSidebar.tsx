
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  BarChart3,
  Brain,
  CreditCard,
  Plug,
  TrendingUp,
  FileText,
  Settings,
  Target,
  Zap
} from 'lucide-react';

const CustomerAdminSidebar: React.FC = () => {
  const menuSections = [
    {
      items: [
        { value: "overview", label: "Dashboard", icon: LayoutDashboard, description: "Organization overview & key metrics" }
      ]
    },
    {
      title: "Analytics & Insights",
      items: [
        { value: "analytics", label: "Usage Analytics", icon: BarChart3, description: "User activity & platform usage", highlight: true },
        { value: "performance", label: "ROI & Performance", icon: TrendingUp, description: "Return on investment metrics" },
        { value: "forecasting", label: "Forecasting", icon: Target, description: "Predictive insights & recommendations", new: true }
      ]
    },
    {
      title: "Team Management",
      items: [
        { value: "team-members", label: "Members", icon: Users, description: "Manage team members" },
        { value: "roles-permissions", label: "Roles & Permissions", icon: Shield, description: "Access control & permissions" }
      ]
    },
    {
      title: "Platform",
      items: [
        { value: "integrations", label: "Integrations", icon: Plug, description: "Third-party integrations & APIs", highlight: true },
        { value: "ai-config", label: "AI Configuration", icon: Brain, description: "AI model settings & preferences" },
        { value: "billing-payments", label: "Billing & Payments", icon: CreditCard, description: "Subscription & payment methods" }
      ]
    },
    {
      title: "Compliance",
      items: [
        { value: "audit-logs", label: "Audit Logs", icon: FileText, description: "Activity logs & compliance" },
        { value: "organization-settings", label: "Organization Settings", icon: Settings, description: "Company configuration" }
      ]
    }
  ];

  return (
    <div className="lg:col-span-3 w-full overflow-hidden">
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden w-full">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <h3 className="font-semibold text-gray-900 truncate">Organization Control</h3>
          <p className="text-xs text-gray-600 mt-1 truncate">Manage usage, team & ROI</p>
        </div>
        
        <TabsList className="flex flex-col h-auto w-full p-0 bg-transparent space-y-0">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="w-full">
              {section.title && (
                <div className="px-4 py-3 bg-gray-50/50">
                  <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider truncate">{section.title}</h4>
                </div>
              )}
              <div className="p-2 space-y-1">
                {section.items.map((item) => (
                  <TabsTrigger 
                    key={item.value}
                    value={item.value} 
                    className="group w-full justify-start h-auto px-3 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 rounded-lg transition-all duration-200 hover:bg-gray-50 relative min-w-0"
                  >
                    <div className="flex items-center w-full min-w-0">
                      <div className={`p-2 rounded-lg mr-3 flex-shrink-0 transition-colors ${
                        item.highlight ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600' : 
                        'bg-gray-100 text-gray-600 group-data-[state=active]:bg-blue-100 group-data-[state=active]:text-blue-600'
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm font-medium truncate">{item.label}</span>
                          {item.new && (
                            <span className="px-1.5 py-0.5 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs rounded-full font-medium flex-shrink-0">
                              NEW
                            </span>
                          )}
                          {item.highlight && (
                            <Zap className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</p>
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
          <div className="flex items-center justify-between text-xs text-gray-600 min-w-0">
            <span className="truncate">Organization v1.2.0</span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="truncate">Active subscription</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdminSidebar;
