
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationItem as NavItem } from './NavigationItems';

interface NavigationItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, isActive, onClick }) => {
  const itemClasses = cn(
    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
    isActive
      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
  );

  if (item.isDashboardTab) {
    return (
      <button onClick={onClick} className={itemClasses}>
        <item.icon className="w-5 h-5" />
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <Link to={item.href} className={itemClasses}>
      <item.icon className="w-5 h-5" />
      <span>{item.label}</span>
    </Link>
  );
};

export default NavigationItem;
