
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowRight, 
  ArrowLeft,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Calendar,
  FileText,
  Star
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  stage: string;
  score: number;
  experience: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'active' | 'on-hold' | 'rejected';
  avatar?: string;
  skills: string[];
}

interface PipelineStage {
  id: string;
  name: string;
  count: number;
  color: string;
}

const CandidatePipeline: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');

  const stages: PipelineStage[] = [
    { id: 'applied', name: 'Applied', count: 24, color: 'bg-blue-100 text-blue-800' },
    { id: 'screening', name: 'Screening', count: 16, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'interview', name: 'Interview', count: 8, color: 'bg-purple-100 text-purple-800' },
    { id: 'technical', name: 'Technical', count: 5, color: 'bg-orange-100 text-orange-800' },
    { id: 'final', name: 'Final Round', count: 3, color: 'bg-green-100 text-green-800' },
    { id: 'offer', name: 'Offer', count: 2, color: 'bg-emerald-100 text-emerald-800' }
  ];

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@email.com',
      position: 'Senior Developer',
      stage: 'interview',
      score: 4.5,
      experience: '5 years',
      location: 'New York',
      salary: '$120k',
      appliedDate: '2025-01-01',
      status: 'active',
      skills: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@email.com',
      position: 'Product Manager',
      stage: 'screening',
      score: 4.2,
      experience: '7 years',
      location: 'San Francisco',
      salary: '$140k',
      appliedDate: '2024-12-28',
      status: 'active',
      skills: ['Product Strategy', 'Analytics', 'Leadership']
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@email.com',
      position: 'UX Designer',
      stage: 'technical',
      score: 4.8,
      experience: '4 years',
      location: 'Austin',
      salary: '$95k',
      appliedDate: '2024-12-30',
      status: 'active',
      skills: ['Figma', 'User Research', 'Prototyping']
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david@email.com',
      position: 'Senior Developer',
      stage: 'final',
      score: 4.6,
      experience: '6 years',
      location: 'Seattle',
      salary: '$130k',
      appliedDate: '2024-12-25',
      status: 'active',
      skills: ['Python', 'AWS', 'Machine Learning']
    },
    {
      id: '5',
      name: 'Emma Brown',
      email: 'emma@email.com',
      position: 'Marketing Manager',
      stage: 'offer',
      score: 4.9,
      experience: '5 years',
      location: 'Chicago',
      salary: '$85k',
      appliedDate: '2024-12-20',
      status: 'active',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy']
    }
  ]);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'all' || candidate.stage === selectedStage;
    const matchesPosition = selectedPosition === 'all' || candidate.position === selectedPosition;
    return matchesSearch && matchesStage && matchesPosition;
  });

  const handleMoveCandidate = (candidateId: string, newStage: string) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId ? { ...candidate, stage: newStage } : candidate
      )
    );
    toast({
      title: "Candidate Moved",
      description: `Candidate has been moved to ${newStage} stage.`,
    });
  };

  const handleRejectCandidate = (candidateId: string) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId ? { ...candidate, status: 'rejected' } : candidate
      )
    );
    toast({
      title: "Candidate Rejected",
      description: "Candidate has been moved to rejected status.",
    });
  };

  const getCandidatesByStage = (stageId: string) => {
    return filteredCandidates.filter(candidate => candidate.stage === stageId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Candidate Pipeline</h2>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Positions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="Senior Developer">Senior Developer</SelectItem>
              <SelectItem value="Product Manager">Product Manager</SelectItem>
              <SelectItem value="UX Designer">UX Designer</SelectItem>
              <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map((stage) => (
          <Card key={stage.id} className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedStage(stage.id)}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
              <div className="text-sm text-gray-600 mt-1">{stage.name}</div>
              <Badge className={`${stage.color} mt-2`}>
                {stage.id === selectedStage ? 'Selected' : 'View'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {stages.map((stage) => (
          <Card key={stage.id} className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>{stage.name}</span>
                <Badge variant="outline" className="text-xs">
                  {getCandidatesByStage(stage.id).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {getCandidatesByStage(stage.id).map((candidate) => (
                <div key={candidate.id} className="p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{candidate.name}</h4>
                        <p className="text-xs text-gray-600">{candidate.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{candidate.score}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-gray-600 mb-3">
                    <div>📍 {candidate.location}</div>
                    <div>💰 {candidate.salary}</div>
                    <div>⏱️ {candidate.experience}</div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {candidate.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs px-1 py-0">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        +{candidate.skills.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MessageSquare className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Calendar className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="flex space-x-1">
                      {stage.id !== 'offer' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            const currentIndex = stages.findIndex(s => s.id === stage.id);
                            if (currentIndex < stages.length - 1) {
                              handleMoveCandidate(candidate.id, stages[currentIndex + 1].id);
                            }
                          }}
                        >
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      )}
                      {stage.id !== 'applied' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            const currentIndex = stages.findIndex(s => s.id === stage.id);
                            if (currentIndex > 0) {
                              handleMoveCandidate(candidate.id, stages[currentIndex - 1].id);
                            }
                          }}
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View */}
      {selectedStage !== 'all' && (
        <Card>
          <CardHeader>
            <CardTitle>
              {stages.find(s => s.id === selectedStage)?.name} Stage Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getCandidatesByStage(selectedStage).map((candidate) => (
                <div key={candidate.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.email}</p>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        ⭐ {candidate.score}/5.0
                      </Badge>
                      <Badge variant="outline">
                        {candidate.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium">{candidate.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{candidate.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected Salary</p>
                      <p className="font-medium">{candidate.salary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Applied</p>
                      <p className="font-medium">{new Date(candidate.appliedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleRejectCandidate(candidate.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidatePipeline;
