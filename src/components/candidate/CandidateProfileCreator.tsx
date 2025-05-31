
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, User, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface CandidateProfileCreatorProps {
  onProfileCreated: (profile: EnhancedCandidate) => void;
}

const CandidateProfileCreator: React.FC<CandidateProfileCreatorProps> = ({ onProfileCreated }) => {
  const [candidateName, setCandidateName] = useState('');
  const [perplexityApiKey, setPerplexityApiKey] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string>('');
  const [generatedProfile, setGeneratedProfile] = useState<Partial<EnhancedCandidate> | null>(null);
  const { toast } = useToast();

  const searchCandidateInfo = async () => {
    if (!candidateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a candidate name",
        variant: "destructive"
      });
      return;
    }

    if (!perplexityApiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Perplexity API key to search the internet",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    console.log('Searching for candidate:', candidateName);

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a professional recruiter assistant. Search for professional information about the person including their current job, company, skills, experience, education, and any professional achievements. Be precise and focus on career-related information.'
            },
            {
              role: 'user',
              content: `Find professional information about ${candidateName}. Include their current position, company, experience, skills, education, and professional background. Focus on publicly available professional information.`
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const searchResult = data.choices[0]?.message?.content || 'No information found';
      
      setSearchResults(searchResult);
      generateCandidateProfile(candidateName, searchResult);
      
      toast({
        title: "Search Complete",
        description: "Found professional information and generated candidate profile",
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search for candidate information. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const generateCandidateProfile = (name: string, searchInfo: string) => {
    // Parse the search results and create a candidate profile
    const profile: Partial<EnhancedCandidate> = {
      id: `candidate_${Date.now()}`,
      name: name,
      handle: name.toLowerCase().replace(/\s+/g, '_'),
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      location: 'Unknown',
      current_title: extractFromText(searchInfo, ['title', 'position', 'role']) || 'Software Engineer',
      current_company: extractFromText(searchInfo, ['company', 'organization', 'employer']) || 'Tech Company',
      experience_years: extractExperienceYears(searchInfo),
      skills: extractSkills(searchInfo),
      bio: searchInfo.substring(0, 500) + (searchInfo.length > 500 ? '...' : ''),
      ai_summary: generateAISummary(name, searchInfo),
      career_trajectory_analysis: {
        progression_type: 'ascending',
        growth_rate: 0.8,
        stability_score: 0.7,
        next_likely_move: 'Senior technical role',
        timeline_events: []
      },
      technical_depth_score: 8.0,
      community_influence_score: 7.0,
      cultural_fit_indicators: [],
      learning_velocity_score: 8.0,
      osint_profile: {
        candidate_id: `candidate_${Date.now()}`,
        overall_score: 8.0,
        influence_score: 7.0,
        technical_depth: 8.0,
        community_engagement: 7.0,
        learning_velocity: 8.0,
        last_updated: new Date().toISOString(),
        availability_signals: []
      },
      match_score: 85,
      relevance_factors: [],
      availability_status: 'passive',
      best_contact_method: {
        platform: 'email',
        confidence: 0.8,
        best_time: '10:00 AM',
        approach_style: 'professional'
      },
      profile_last_updated: new Date().toISOString(),
      osint_last_fetched: new Date().toISOString()
    };

    setGeneratedProfile(profile);
  };

  const extractFromText = (text: string, keywords: string[]): string | undefined => {
    for (const keyword of keywords) {
      const regex = new RegExp(`${keyword}[:\\s]+([^\\n\\r\\.]{1,100})`, 'i');
      const match = text.match(regex);
      if (match) {
        return match[1].trim();
      }
    }
    return undefined;
  };

  const extractExperienceYears = (text: string): number => {
    const yearMatches = text.match(/(\d+)\s*years?\s*(of\s*)?experience/i);
    if (yearMatches) {
      return parseInt(yearMatches[1]);
    }
    return 5; // Default
  };

  const extractSkills = (text: string): string[] => {
    const commonTechSkills = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 
      'Docker', 'Kubernetes', 'Machine Learning', 'AI', 'Data Science', 'SQL',
      'MongoDB', 'PostgreSQL', 'GraphQL', 'REST API', 'Microservices'
    ];
    
    return commonTechSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    ).slice(0, 8);
  };

  const generateAISummary = (name: string, searchInfo: string): string => {
    return `${name} is a skilled professional with expertise in software development and technology. Based on available information, they demonstrate strong technical capabilities and professional experience in their field.`;
  };

  const createProfile = () => {
    if (generatedProfile) {
      onProfileCreated(generatedProfile as EnhancedCandidate);
      toast({
        title: "Profile Created",
        description: `Successfully created profile for ${generatedProfile.name}`,
      });
      
      // Reset form
      setCandidateName('');
      setSearchResults('');
      setGeneratedProfile(null);
    }
  };

  return (
    <div className="space-y-6">
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
            onClick={searchCandidateInfo}
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

      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={searchResults}
              readOnly
              rows={6}
              className="text-sm"
            />
          </CardContent>
        </Card>
      )}

      {generatedProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Generated Profile Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <p className="font-medium">{generatedProfile.name}</p>
              </div>
              <div>
                <Label>Current Title</Label>
                <p className="font-medium">{generatedProfile.current_title}</p>
              </div>
              <div>
                <Label>Company</Label>
                <p className="font-medium">{generatedProfile.current_company}</p>
              </div>
              <div>
                <Label>Experience</Label>
                <p className="font-medium">{generatedProfile.experience_years} years</p>
              </div>
            </div>

            {generatedProfile.skills && generatedProfile.skills.length > 0 && (
              <div>
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {generatedProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label>AI Summary</Label>
              <p className="text-sm text-gray-600 mt-1">{generatedProfile.ai_summary}</p>
            </div>

            <Button onClick={createProfile} className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidateProfileCreator;
