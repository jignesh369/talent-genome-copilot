
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobs } from '@/hooks/useJobs';
import { useCandidates } from '@/hooks/useCandidates';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Star,
  Zap,
  BarChart3,
  Eye,
  MessageSquare,
  Send
} from 'lucide-react';

interface MatchScore {
  candidateId: string;
  jobId: string;
  overallScore: number;
  skillsMatch: number;
  experienceMatch: number;
  locationMatch: number;
  salaryMatch: number;
  reasons: string[];
  gaps: string[];
}

const AIMatchingEngine: React.FC = () => {
  const { jobs } = useJobs();
  const { candidates } = useCandidates();
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [matchingMode, setMatchingMode] = useState<'job-to-candidates' | 'candidate-to-jobs'>('job-to-candidates');
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [matches, setMatches] = useState<MatchScore[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock AI matching algorithm
  const generateMatches = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      if (matchingMode === 'job-to-candidates' && selectedJob) {
        const mockMatches: MatchScore[] = candidates.map(candidate => ({
          candidateId: candidate.id,
          jobId: selectedJob,
          overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
          skillsMatch: Math.floor(Math.random() * 30) + 70,
          experienceMatch: Math.floor(Math.random() * 25) + 75,
          locationMatch: Math.floor(Math.random() * 20) + 80,
          salaryMatch: Math.floor(Math.random() * 35) + 65,
          reasons: [
            'Strong technical skills match',
            'Relevant industry experience',
            'Leadership experience aligns with role'
          ],
          gaps: [
            'May need training in specific framework',
            'Salary expectation slightly above range'
          ]
        })).sort((a, b) => b.overallScore - a.overallScore);
        
        setMatches(mockMatches);
      }
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const selectedJobData = jobs.find(job => job.id === selectedJob);
  const topMatches = matches.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-600" />
            AI-Powered Matching Engine
          </h2>
          <p className="text-gray-600 mt-1">
            Intelligent candidate-job matching using advanced algorithms
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-100 text-purple-800">
            <Zap className="w-3 h-3 mr-1" />
            AI Enhanced
          </Badge>
        </div>
      </div>

      {/* Matching Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Matching Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Matching Mode</label>
              <Select value={matchingMode} onValueChange={(value: any) => setMatchingMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job-to-candidates">Find Candidates for Job</SelectItem>
                  <SelectItem value="candidate-to-jobs">Find Jobs for Candidate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {matchingMode === 'job-to-candidates' && (
              <div>
                <label className="block text-sm font-medium mb-2">Select Job</label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a job..." />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {matchingMode === 'candidate-to-jobs' && (
              <div>
                <label className="block text-sm font-medium mb-2">Select Candidate</label>
                <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a candidate..." />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map(candidate => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.first_name} {candidate.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-end">
              <Button 
                onClick={generateMatches} 
                disabled={isAnalyzing || (!selectedJob && !selectedCandidate)}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Find Matches
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matching Results */}
      {matches.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Match Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Match Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Matches</span>
                    <span className="font-medium">{matches.length}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>High Quality (90+)</span>
                    <span className="font-medium text-green-600">
                      {matches.filter(m => m.overallScore >= 90).length}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Good Match (80+)</span>
                    <span className="font-medium text-blue-600">
                      {matches.filter(m => m.overallScore >= 80 && m.overallScore < 90).length}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average Score</span>
                    <span className="font-medium">
                      {Math.round(matches.reduce((acc, m) => acc + m.overallScore, 0) / matches.length)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Matches */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Top Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMatches.map((match) => {
                  const candidate = candidates.find(c => c.id === match.candidateId);
                  if (!candidate) return null;

                  return (
                    <div key={match.candidateId} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {candidate.first_name[0]}{candidate.last_name[0]}
                          </div>
                          <div>
                            <h3 className="font-semibold">{candidate.first_name} {candidate.last_name}</h3>
                            <p className="text-sm text-gray-600">{candidate.current_title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold px-2 py-1 rounded ${getScoreColor(match.overallScore)}`}>
                            {match.overallScore}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-3 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{match.skillsMatch}%</div>
                          <div className="text-gray-500">Skills</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{match.experienceMatch}%</div>
                          <div className="text-gray-500">Experience</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{match.locationMatch}%</div>
                          <div className="text-gray-500">Location</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{match.salaryMatch}%</div>
                          <div className="text-gray-500">Salary</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div>
                          <h4 className="text-sm font-medium text-green-700 mb-1">Match Strengths:</h4>
                          <div className="flex flex-wrap gap-1">
                            {match.reasons.map((reason, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-green-700 border-green-200">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-orange-700 mb-1">Potential Gaps:</h4>
                          <div className="flex flex-wrap gap-1">
                            {match.gaps.map((gap, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-orange-700 border-orange-200">
                                {gap}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-1" />
                          Send to Pipeline
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {matches.length === 0 && !isAnalyzing && (
        <Card>
          <CardContent className="py-12 text-center">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">AI Matching Engine Ready</h3>
            <p className="text-gray-600 mb-4">
              Select a job or candidate above and click "Find Matches" to see AI-powered recommendations.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Skills Analysis
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Experience Matching
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Cultural Fit
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIMatchingEngine;
