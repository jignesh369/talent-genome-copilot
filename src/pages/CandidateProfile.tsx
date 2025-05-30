
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Edit, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Kumar",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Frontend Developer",
    bio: "Passionate frontend developer with 3+ years of experience in React and TypeScript.",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "Git"]
  });

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!",
      });
    }
  };

  const handleUploadPhoto = () => {
    toast({
      title: "Upload Photo",
      description: "Photo upload feature coming soon!",
    });
  };

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            onClick={handleEditProfile}
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                      AK
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                      onClick={handleUploadPhoto}
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      Upload
                    </Button>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{profileData.name}</h3>
                <p className="text-gray-600 font-medium">{profileData.title}</p>
                <p className="text-sm text-gray-500">{profileData.location}</p>
                
                {isEditing && (
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Edit Contact Info
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Update Bio
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Strength</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-600">
                    Add more skills and experience to reach 100%
                  </p>
                </div>
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
                {isEditing && (
                  <Button variant="outline" size="sm" className="mt-2">
                    Edit Bio
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Skills</CardTitle>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      Add Skills
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {skill}
                      {isEditing && (
                        <button className="ml-1 text-xs text-red-500">×</button>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Experience</CardTitle>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      Add Experience
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-purple-200 pl-4">
                    <h4 className="font-semibold">Frontend Developer</h4>
                    <p className="text-sm text-gray-600">TechCorp • 2021 - Present</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Developed modern web applications using React and TypeScript
                    </p>
                  </div>
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
