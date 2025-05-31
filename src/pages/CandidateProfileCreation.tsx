
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, UserCheck } from 'lucide-react';
import CandidateProfileCreator from '@/components/candidate/CandidateProfileCreator';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

const CandidateProfileCreation = () => {
  const [createdProfiles, setCreatedProfiles] = useState<EnhancedCandidate[]>([]);
  const [showCreator, setShowCreator] = useState(false);

  const suggestedCandidates = [
    'Jignesh Talasila',
    'Suraj Vanka'
  ];

  const handleProfileCreated = (profile: EnhancedCandidate) => {
    setCreatedProfiles(prev => [...prev, profile]);
    setShowCreator(false);
  };

  const quickCreateProfile = (name: string) => {
    setShowCreator(true);
    // You could pre-fill the name in the creator component
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Candidate Profile Creation</h1>
        <p className="text-lg text-gray-600">
          Create detailed candidate profiles by searching the internet for professional information
        </p>
      </div>

      {!showCreator && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Quick Profile Creation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Create profiles for these suggested candidates:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedCandidates.map((name, index) => (
                    <Card key={index} className="border-2 hover:border-purple-300 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{name}</h3>
                            <p className="text-sm text-gray-600">Click to search and create profile</p>
                          </div>
                          <Button
                            onClick={() => quickCreateProfile(name)}
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Create
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => setShowCreator(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Custom Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {createdProfiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Created Profiles ({createdProfiles.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {createdProfiles.map((profile) => (
                    <div key={profile.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{profile.name}</h3>
                          <p className="text-sm text-gray-600">
                            {profile.current_title} at {profile.current_company}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">
                              {profile.experience_years} years exp
                            </Badge>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {profile.match_score}% match
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Created {new Date(profile.profile_last_updated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {showCreator && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create New Profile</h2>
            <Button
              variant="outline"
              onClick={() => setShowCreator(false)}
            >
              Back to Overview
            </Button>
          </div>
          
          <CandidateProfileCreator onProfileCreated={handleProfileCreated} />
        </div>
      )}
    </div>
  );
};

export default CandidateProfileCreation;
