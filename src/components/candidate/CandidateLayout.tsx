
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  Briefcase, 
  MessageCircle, 
  Calendar, 
  User, 
  Bell,
  DollarSign
} from "lucide-react";

interface CandidateLayoutProps {
  children: React.ReactNode;
}

const CandidateLayout = ({ children }: CandidateLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/candidate-dashboard", icon: Home },
    { name: "Jobs", href: "/candidate-jobs", icon: Briefcase },
    { name: "Messages", href: "/candidate-messages", icon: MessageCircle, badge: 2 },
    { name: "Interviews", href: "/candidate-interviews", icon: Calendar, badge: 1 },
    { name: "Offers", href: "/candidate-offers", icon: DollarSign },
    { name: "Profile", href: "/candidate-profile", icon: User },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Top Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <Link to="/candidate-dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JP</span>
                </div>
                <span className="text-xl font-bold text-gray-900">JobPilot</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                      isActive(item.href)
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge className="bg-red-500 text-white text-xs ml-1 h-4 w-4 rounded-full p-0 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                  3
                </Badge>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                  AK
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors relative",
                isActive(item.href)
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600"
              )}
            >
              <item.icon className="h-4 w-4 mb-1" />
              <span className="text-xs font-medium truncate">{item.name}</span>
              {item.badge && (
                <Badge className="absolute -top-1 -right-1 h-3 w-3 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {children}
      </main>
    </div>
  );
};

export default CandidateLayout;
