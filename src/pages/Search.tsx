
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import SearchInterface from '@/components/search/SearchInterface';
import SearchHistory from '@/components/search/SearchHistory';
import SimplifiedCandidateCard from '@/components/search/SimplifiedCandidateCard';
import SearchSidebar from '@/components/search/SearchSidebar';
import CandidateDetailsModal from '@/components/search/CandidateDetailsModal';
import DigitalFootprintModal from '@/components/search/DigitalFootprintModal';
import EmptyState from '@/components/search/EmptyState';
import { useSearch } from '@/hooks/useSearch';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';
import { Search as SearchIcon, History, Bell, Filter, SortDesc, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { useToast } from '@/hooks/use-toast';

const Search = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [footprintCandidate, setFootprintCandidate] = useState<EnhancedCandidate | null>(null);
  const { toast } = useToast();
  
  const {
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    handleSearch,
    handleVoiceInput,
    handleFeedback
  } = useSearch();

  const { generatePersonalizedOutreach, processAutomaticOutreach } = useRecruitingIntelligence();

  const handleContactCandidate = async (candidate: EnhancedCandidate) => {
    try {
      console.log('Contacting candidate:', candidate.name);
      
      toast({
        title: "Generating Enhanced AI Outreach",
        description: "Creating highly personalized message with quality scoring...",
      });

      const message = await generatePersonalizedOutreach(
        candidate.id, 
        'initial_outreach',
        {
          company_name: 'TechCorp',
          role_title: 'Senior Software Engineer',
          recruiter_name: 'Sarah',
          role_benefits: 'Cutting-edge AI projects,Competitive salary + equity,Remote work flexibility'
        }
      );

      if (message) {
        console.log('Generated enhanced outreach message:', message);
        toast({
          title: "Enhanced AI Outreach Generated",
          description: `High-quality personalized message created for ${candidate.name}. Quality-scored and optimized for response.`,
        });
      }
    } catch (error) {
      console.error('Error generating outreach:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI outreach message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAutomaticOutreach = async () => {
    try {
      toast({
        title: "Processing Automatic Outreach",
        description: "Analyzing candidates and generating triggered outreach...",
      });

      await processAutomaticOutreach();
    } catch (error) {
      console.error('Error in automatic outreach:', error);
      toast({
        title: "Error",
        description: "Failed to process automatic outreach.",
        variant: "destructive"
      });
    }
  };

  return (
    <RecruiterLayout 
      title="AI-Powered Talent Discovery" 
      subtitle="Discover exceptional talent with enhanced AI outreach and smart triggers"
      showSearch={false}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="search" className="flex items-center space-x-2">
                <SearchIcon className="h-4 w-4" />
                <span>Search</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <History className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Alerts</span>
              </TabsTrigger>
            </TabsList>
            
            {searchResult && (
              <Button 
                onClick={handleAutomaticOutreach}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Process Auto Outreach
              </Button>
            )}
          </div>

          <TabsContent value="search" className="space-y-6">
            <SearchInterface 
              query={query}
              setQuery={setQuery}
              isSearching={isSearching}
              isListening={isListening}
              onSearch={handleSearch}
              onVoiceInput={handleVoiceInput}
            />

            {searchResult && (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Best Matches ({searchResult.candidates.length})
                      </h2>
                      <p className="text-gray-600">Ranked by AI relevance and digital footprint analysis</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-200">
                        <Filter className="h-4 w-4 mr-2" />
                        Refine
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                        <SortDesc className="h-4 w-4 mr-2" />
                        Sort
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {searchResult.candidates.map((candidate) => (
                      <SimplifiedCandidateCard 
                        key={candidate.id} 
                        candidate={candidate}
                        onViewProfile={setSelectedCandidate}
                        onViewSnapshot={setFootprintCandidate}
                        onFeedback={handleFeedback}
                        onContactCandidate={handleContactCandidate}
                      />
                    ))}
                  </div>
                </div>

                <div className="xl:col-span-1">
                  <SearchSidebar 
                    searchResult={searchResult} 
                    onRefinementClick={setQuery}
                  />
                </div>
              </div>
            )}

            {!searchResult && !isSearching && <EmptyState />}
          </TabsContent>

          <TabsContent value="history">
            <SearchHistory />
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto" />
                  <h3 className="text-lg font-semibold">Search Alerts</h3>
                  <p className="text-gray-600">
                    Set up alerts for new candidates matching your saved searches. 
                    Get notified when new talent becomes available.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedCandidate && (
          <CandidateDetailsModal 
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            onFeedback={handleFeedback}
            onContactCandidate={handleContactCandidate}
          />
        )}

        <DigitalFootprintModal
          candidate={footprintCandidate}
          isOpen={!!footprintCandidate}
          onClose={() => setFootprintCandidate(null)}
        />
      </div>
    </RecruiterLayout>
  );
};

export default Search;
