
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UserProfileDropdown from "@/components/navigation/UserProfileDropdown";
import NotificationDropdown from "@/components/navigation/NotificationDropdown";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BarChart3, 
  Search, 
  Settings,
  Zap,
  Menu,
  X
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Only show this navigation for non-recruiter pages or when specifically needed
  const shouldShowNavigation = () => {
    const recruiterPaths = [
      '/recruiter-dashboard',
      '/candidates', 
      '/jobs', 
      '/analytics', 
      '/search', 
      '/settings'
    ];
    
    // Don't show this navigation if we're on a recruiter page that uses RecruiterLayout
    return !recruiterPaths.some(path => location.pathname === path);
  };

  // If we shouldn't show navigation, return null
  if (!shouldShowNavigation()) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Candidates", href: "/candidates", icon: Users },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Search", href: "/search", icon: Search },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">HireAI Copilot</span>
                <p className="text-xs text-gray-500 hidden md:block">Intelligent Recruiting Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Quick Search */}
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden lg:flex items-center space-x-2"
              onClick={() => window.location.href = '/search'}
            >
              <Search className="h-4 w-4" />
              <span>Quick Search</span>
            </Button>

            {/* Notifications */}
            <NotificationDropdown />

            {/* User Menu */}
            <UserProfileDropdown />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 shadow-lg">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start mt-4"
              onClick={() => {
                window.location.href = '/search';
                setMobileMenuOpen(false);
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              Quick Search
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
