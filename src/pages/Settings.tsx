import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  CreditCard, 
  Key, 
  Mail, 
  Phone,
  MapPin,
  Save,
  LogOut
} from "lucide-react";

const Settings = () => {
  const { user, userRole, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    title: '',
    department: '',
    bio: '',
    location: '',
    timezone: 'UTC-8'
  });

  const [notifications, setNotifications] = useState({
    emailNewApplications: true,
    emailInterviewReminders: true,
    emailOfferUpdates: true,
    pushNotifications: true,
    weeklyReports: false,
    marketingEmails: false
  });

  const [organization, setOrganization] = useState({
    name: 'TechCorp Inc.',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '51-200 employees',
    description: 'Leading technology company focused on innovation.'
  });

  // Helper function to determine visible tabs based on user role
  const getVisibleTabs = (userRole: string | null) => {
    const baseTabs = [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'security', label: 'Security', icon: Shield }
    ];

    // Only customer_admin gets access to organization and billing tabs
    if (userRole === 'customer_admin') {
      return [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'organization', label: 'Organization', icon: Building },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard }
      ];
    }

    // startup_admin gets all tabs (though they should typically use their dedicated dashboard)
    if (userRole === 'startup_admin') {
      return [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'organization', label: 'Organization', icon: Building },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard }
      ];
    }

    // All other roles (candidate, recruiter, hiring_manager) get base tabs only
    return baseTabs;
  };

  const visibleTabs = getVisibleTabs(userRole);
  const gridCols = `grid-cols-${visibleTabs.length}`;

  const handleSaveProfile = async () => {
    setLoading(true);
    // TODO: Integrate with Supabase
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    // TODO: Integrate with Supabase
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Notification Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className={`grid w-full ${gridCols}`}>
          {visibleTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {profile.firstName?.[0]}{profile.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Upload Photo</Button>
                  <p className="text-sm text-gray-600 mt-1">JPG, PNG or GIF (max 5MB)</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profile.title}
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {visibleTabs.some(tab => tab.id === 'organization') && (
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={organization.name}
                    onChange={(e) => setOrganization({...organization, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={organization.website}
                      onChange={(e) => setOrganization({...organization, website: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={organization.industry}
                      onChange={(e) => setOrganization({...organization, industry: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={organization.description}
                    onChange={(e) => setOrganization({...organization, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Organization
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Applications</Label>
                    <p className="text-sm text-gray-600">Get notified when candidates apply to your jobs</p>
                  </div>
                  <Switch
                    checked={notifications.emailNewApplications}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, emailNewApplications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Interview Reminders</Label>
                    <p className="text-sm text-gray-600">Reminders for upcoming interviews</p>
                  </div>
                  <Switch
                    checked={notifications.emailInterviewReminders}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, emailInterviewReminders: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-600">Weekly hiring pipeline summary</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, weeklyReports: checked})
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Push Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Browser Notifications</Label>
                    <p className="text-sm text-gray-600">Real-time notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, pushNotifications: checked})
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Current Role</Label>
                  <div className="mt-1">
                    <Badge className="capitalize">{userRole}</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Change Password</Label>
                  <p className="text-sm text-gray-600 mb-2">Update your password to keep your account secure</p>
                  <Button variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>

                <Separator />

                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600 mb-2">Add an extra layer of security to your account</p>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>

                <Separator />

                <div>
                  <Label className="text-red-600">Danger Zone</Label>
                  <p className="text-sm text-gray-600 mb-2">Sign out of your account</p>
                  <Button variant="destructive" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {visibleTabs.some(tab => tab.id === 'billing') && (
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Pro Plan</h4>
                  <p className="text-blue-700">$99/month • Unlimited jobs and candidates</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Payment Method</h4>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-gray-400" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Billing History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">December 2024</p>
                        <p className="text-sm text-gray-600">Pro Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$99.00</p>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;
