
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  ArrowRight, 
  Plus, 
  Filter,
  Search,
  TrendingUp
} from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface CandidatePipelineManagerProps {
  candidates: EnhancedCandidate[];
  onMoveCandidate: (candidateId: string, newStage: string) => void;
  onViewCandidate: (candidate: EnhancedCandidate) => void;
}

const pipelineStages = [
  { id: 'sourced', name: 'Sourced', color: 'bg-gray-100' },
  { id: 'contacted', name: 'Contacted', color: 'bg-blue-100' },
  { id: 'screening', name: 'Screening', color: 'bg-yellow-100' },
  { id: 'interviewing', name: 'Interviewing', color: 'bg-orange-100' },
  { id: 'offer', name: 'Offer', color: 'bg-purple-100' },
  { id: 'hired', name: 'Hired', color: 'bg-green-100' },
  { id: 'rejected', name: 'Rejected', color: 'bg-red-100' }
];

const CandidatePipelineManager: React.FC<CandidatePipelineManagerProps> = ({
  candidates,
  onMoveCandidate,
  onViewCandidate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = searchTerm === '' || 
      candidate.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.current_title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = selectedStage === 'all' || candidate.pipeline_stage === selectedStage;
    
    return matchesSearch && matchesStage;
  });

  const getCandidatesByStage = (stageId: string) => {
    return filteredCandidates.filter(candidate => candidate.pipeline_stage === stageId);
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Candidate Pipeline
            </CardTitle>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {pipelineStages.map(stage => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {pipelineStages.map(stage => {
              const stageCount = getCandidatesByStage(stage.id).length;
              return (
                <div key={stage.id} className="text-center">
                  <div className={`${stage.color} p-3 rounded-lg`}>
                    <p className="text-sm font-medium">{stage.name}</p>
                    <p className="text-2xl font-bold mt-1">{stageCount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pipelineStages.slice(0, 4).map(stage => {
          const stageCandidates = getCandidatesByStage(stage.id);
          return (
            <Card key={stage.id} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>{stage.name}</span>
                  <Badge variant="secondary">{stageCandidates.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stageCandidates.map(candidate => (
                  <div
                    key={candidate.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewCandidate(candidate)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">
                        {candidate.first_name} {candidate.last_name}
                      </h4>
                      <Badge className="text-xs" variant="outline">
                        {Math.round(candidate.placement_probability_score)}%
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{candidate.current_title}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {candidate.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Engagement: {candidate.engagement_score}%
                      </span>
                      <Select onValueChange={(newStage) => onMoveCandidate(candidate.id, newStage)}>
                        <SelectTrigger className="h-6 w-6 p-0">
                          <ArrowRight className="w-3 h-3" />
                        </SelectTrigger>
                        <SelectContent>
                          {pipelineStages
                            .filter(s => s.id !== candidate.pipeline_stage)
                            .map(stage => (
                              <SelectItem key={stage.id} value={stage.id}>
                                Move to {stage.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No candidates in this stage</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CandidatePipelineManager;
