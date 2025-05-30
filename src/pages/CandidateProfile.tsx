
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Edit, Upload } from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateProfile = () => {
  const profileData = {
    name: "Alex Kumar",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Frontend Developer",
    bio: "Passionate frontend developer with 3+ years of experience in React and TypeScript.",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "Git"]
  };

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                    AK
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-gray-900">{profileData.name}</h3>
                <p className="text-gray-600 font-medium">{profileData.title}</p>
                <p className="text-sm text-gray-500">{profileData.location}</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{profileData.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateProfile;
