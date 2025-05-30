
import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, User, Settings, LogOut, Building } from 'lucide-react';

const UserProfileDropdown = () => {
  const { user, userRole, signOut } = useAuth();

  const handleProfileClick = () => {
    // Redirect based on user role
    if (userRole === 'customer_admin') {
      window.location.href = '/customer-admin';
    } else {
      window.location.href = '/settings';
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const getInitials = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`;
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  const getUserName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    return user?.email || 'User';
  };

  const getRoleDisplay = () => {
    switch (userRole) {
      case 'startup_admin':
        return 'Startup Admin';
      case 'customer_admin':
        return 'Organization Admin';
      case 'recruiter':
        return 'Recruiter';
      case 'hiring_manager':
        return 'Hiring Manager';
      case 'candidate':
        return 'Candidate';
      default:
        return 'User';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
            <p className="text-xs text-gray-500">{getRoleDisplay()}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border shadow-lg" align="end">
        <DropdownMenuLabel>
          <div>
            <p className="font-medium">{getUserName()}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          {userRole === 'customer_admin' ? 'Admin Dashboard' : 'Profile & Settings'}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Building className="mr-2 h-4 w-4" />
          Organization
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
