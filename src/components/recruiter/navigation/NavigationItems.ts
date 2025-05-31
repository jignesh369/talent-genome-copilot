
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Brain, 
  Calendar,
  MessageSquare,
  UserPlus,
  Search,
  BarChart3,
  Settings,
  Zap
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  href: string;
  isDashboardTab: boolean;
}

export const navigationItems: NavigationItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/recruiter-dashboard', isDashboardTab: true },
  { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/jobs', isDashboardTab: false },
  { id: 'candidates', label: 'Candidates', icon: Users, href: '/candidates', isDashboardTab: false },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp, href: '/recruiter-dashboard', isDashboardTab: true },
  { id: 'ai-matching', label: 'AI Matching', icon: Brain, href: '/recruiter-dashboard', isDashboardTab: true },
  { id: 'interviews', label: 'Interviews', icon: Calendar, href: '/recruiter-dashboard', isDashboardTab: true },
  { id: 'communication', label: 'Communications', icon: MessageSquare, href: '/communication', isDashboardTab: false },
  { id: 'outreach-sequences', label: 'Outreach Sequences', icon: Zap, href: '/outreach-sequences', isDashboardTab: false },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics', isDashboardTab: false },
  { id: 'search', label: 'Search', icon: Search, href: '/search', isDashboardTab: false },
  { id: 'team', label: 'Team', icon: UserPlus, href: '/recruiter-dashboard', isDashboardTab: true },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', isDashboardTab: false },
];
