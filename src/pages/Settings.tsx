
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Bell, Shield, Zap, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@company.com" />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Senior Recruiter" />
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600">Browser notifications for urgent updates</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-gray-600">Summary of hiring activities</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Candidate Updates</Label>
                  <p className="text-sm text-gray-600">Status changes and new applications</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI & Automation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-screening</Label>
                  <p className="text-sm text-gray-600">Automatically screen candidates with AI</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Smart Outreach</Label>
                  <p className="text-sm text-gray-600">AI-generated personalized messages</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hiring Genome Learning</Label>
                  <p className="text-sm text-gray-600">Continuous learning from hiring decisions</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Ghost Risk Alerts</Label>
                  <p className="text-sm text-gray-600">Predict candidate dropout risk</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline">Enabled</Badge>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
              
              <div>
                <Label>Password</Label>
                <Button variant="outline" className="w-full mt-2">
                  Change Password
                </Button>
              </div>
              
              <div>
                <Label>Active Sessions</Label>
                <p className="text-sm text-gray-600 mt-1">3 active sessions</p>
                <Button variant="outline" size="sm" className="mt-2">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Data Export</Label>
                <Button variant="outline" className="w-full mt-2">
                  Export Data
                </Button>
              </div>
              
              <div>
                <Label>Data Retention</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Candidates: 24 months<br/>
                  Hires: 7 years
                </p>
              </div>
              
              <div>
                <Label>Privacy Policy</Label>
                <Button variant="link" className="p-0 h-auto mt-1">
                  View Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plan Information */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge className="bg-blue-100 text-blue-800">Professional</Badge>
                <p className="text-sm text-gray-600 mt-2">
                  Up to 1,000 candidates/month
                </p>
              </div>
              
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Candidates this month:</span>
                  <span>247/1,000</span>
                </div>
                <div className="flex justify-between">
                  <span>AI searches:</span>
                  <span>156/500</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
