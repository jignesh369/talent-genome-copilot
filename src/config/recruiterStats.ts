
import { 
  Users,
  Clock,
  TrendingUp,
  Brain
} from 'lucide-react';

export const recruiterStats = [
  {
    title: "Active Candidates",
    value: "1,247",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    color: "blue",
    description: "vs last month"
  },
  {
    title: "Time to Hire",
    value: "18 days",
    change: "-30%",
    trend: "down" as const,
    icon: Clock,
    color: "green",
    description: "avg reduction"
  },
  {
    title: "Response Rate",
    value: "42%",
    change: "+8%",
    trend: "up" as const,
    icon: TrendingUp,
    color: "purple",
    description: "outreach success"
  },
  {
    title: "AI Match Score",
    value: "89%",
    change: "+5%",
    trend: "up" as const,
    icon: Brain,
    color: "emerald",
    description: "accuracy improved"
  }
];
