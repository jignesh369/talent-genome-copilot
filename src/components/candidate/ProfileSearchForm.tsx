
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Globe, User } from 'lucide-react';

interface ProfileSearchFormProps {
  candidateName: string;
  setCandidateName: (name: string) => void;
  perplexityApiKey: string;
  setPerplexityApiKey: (key: string) => void;
  isSearching: boolean;
  onSearch: () => void;
}

const ProfileSearchForm: React.FC<ProfileSearchFormProps> = ({
  candidateName,
  setCandidateName,
  perplexityApiKey,
  setPerplexityApiKey,
  isSearching,
  onSearch
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Create Candidate Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="candidateName">Candidate Name</Label>
          <Input
            id="candidateName"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="e.g., Jignesh Talasila"
          />
        </div>
        
        <div>
          <Label htmlFor="apiKey">Perplexity API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={perplexityApiKey}
            onChange={(e) => setPerplexityApiKey(e.target.value)}
            placeholder="Enter your Perplexity API key to search the internet"
          />
          <p className="text-xs text-gray-500 mt-1">
            Get your API key from <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">perplexity.ai</a>
          </p>
        </div>

        <Button 
          onClick={onSearch}
          disabled={isSearching}
          className="w-full"
        >
          {isSearching ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Searching Internet...
            </>
          ) : (
            <>
              <Globe className="h-4 w-4 mr-2" />
              Search & Generate Profile
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSearchForm;
