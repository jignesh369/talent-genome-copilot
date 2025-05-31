
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Target, 
  MessageSquare,
  Lightbulb,
  TrendingUp,
  User,
  Briefcase,
  Code,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

interface PersonalizationInsight {
  type: 'skill_match' | 'career_trajectory' | 'recent_activity' | 'mutual_connection' | 'company_interest';
  title: string;
  content: string;
  confidence: number;
  source: string;
  suggested_usage: string;
}

interface CandidatePersonalization {
  candidate_id: string;
  candidate_name: string;
  current_title: string;
  current_company: string;
  insights: PersonalizationInsight[];
  personalized_content: {
    subject_suggestions: string[];
    opening_lines: string[];
    value_propositions: string[];
    call_to_actions: string[];
  };
  communication_style: 'formal' | 'casual' | 'technical' | 'executive';
  optimal_timing: {
    day_of_week: string;
    time_of_day: string;
    timezone: string;
  };
  personalization_score: number;
}

const CandidatePersonalizationEngine: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [generatingContent, setGeneratingContent] = useState(false);
  
  // Mock candidate data
  const [candidates] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Frontend Developer',
      company: 'TechCorp'
    },
    {
      id: '2',
      name: 'Mike Chen',
      title: 'Product Manager',
      company: 'StartupXYZ'
    }
  ]);

  const [personalizationData, setPersonalizationData] = useState<CandidatePersonalization>({
    candidate_id: '1',
    candidate_name: 'Sarah Johnson',
    current_title: 'Senior Frontend Developer',
    current_company: 'TechCorp',
    insights: [
      {
        type: 'skill_match',
        title: 'React Expertise Alignment',
        content: 'Sarah has 5+ years of React experience and recently contributed to a major open-source React component library.',
        confidence: 95,
        source: 'GitHub Analysis',
        suggested_usage: 'Mention our React-heavy tech stack and opportunities to work on cutting-edge frontend projects.'
      },
      {
        type: 'recent_activity',
        title: 'Conference Speaking',
        content: 'Recently spoke at ReactConf 2024 about "Building Scalable Design Systems"',
        confidence: 88,
        source: 'LinkedIn Activity',
        suggested_usage: 'Reference her thought leadership and our need for someone to help scale our design system.'
      },
      {
        type: 'career_trajectory',
        title: 'Leadership Growth Pattern',
        content: 'Career progression shows consistent move toward technical leadership roles every 2-3 years.',
        confidence: 82,
        source: 'Career Analysis',
        suggested_usage: 'Highlight senior IC role with mentorship opportunities and potential team lead path.'
      }
    ],
    personalized_content: {
      subject_suggestions: [
        'Loved your ReactConf talk on Design Systems - opportunity at [Company]',
        'Senior React role with design system leadership opportunities',
        'Building scalable frontend architecture - would love to chat'
      ],
      opening_lines: [
        'Hi Sarah, I caught your ReactConf presentation on building scalable design systems - really insightful approach to component composition!',
        'Your open-source contributions to the React ecosystem caught our attention, particularly your work on [specific project].',
        'Given your expertise in React and design systems, I thought you\'d be interested in a senior frontend opportunity we have.'
      ],
      value_propositions: [
        'Lead the evolution of our design system used by 50+ developers across 8 product teams',
        'Work with cutting-edge React patterns and contribute to our open-source component library',
        'Opportunity to mentor junior developers while solving complex frontend architecture challenges'
      ],
      call_to_actions: [
        'Would love to hear your thoughts on frontend architecture over a 15-minute call this week.',
        'Happy to share more details about our technical challenges - are you free for a quick chat?',
        'I\'d be interested in your perspective on our design system roadmap. Worth a conversation?'
      ]
    },
    communication_style: 'technical',
    optimal_timing: {
      day_of_week: 'Tuesday',
      time_of_day: '10:00 AM',
      timezone: 'PST'
    },
    personalization_score: 89
  });

  const generatePersonalizedContent = async () => {
    setGeneratingContent(true);
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratingContent(false);
  };

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'skill_match': return Code;
      case 'career_trajectory': return TrendingUp;
      case 'recent_activity': return Zap;
      case 'mutual_connection': return User;
      case 'company_interest': return Briefcase;
      default: return Lightbulb;
    }
  };

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case 'skill_match': return 'bg-blue-100 text-blue-800';
      case 'career_trajectory': return 'bg-green-100 text-green-800';
      case 'recent_activity': return 'bg-purple-100 text-purple-800';
      case 'mutual_connection': return 'bg-orange-100 text-orange-800';
      case 'company_interest': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-600" />
            Candidate Personalization Engine
          </h2>
          <p className="text-gray-600">AI-powered insights for highly personalized outreach</p>
        </div>
        <Button onClick={generatePersonalizedContent} disabled={generatingContent}>
          <Zap className="w-4 h-4 mr-2" />
          {generatingContent ? 'Generating...' : 'Generate Content'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Candidate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedCandidate === candidate.id ? 'border-purple-500 bg-purple-50' : ''
                }`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <div className="font-medium">{candidate.name}</div>
                <div className="text-sm text-gray-600">{candidate.title}</div>
                <div className="text-sm text-gray-500">{candidate.company}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Personalization Insights */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Personalization Insights</span>
                <div className="flex items-center space-x-2">
                  <Progress value={personalizationData.personalization_score} className="w-24" />
                  <span className="text-sm font-medium">{personalizationData.personalization_score}%</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personalizationData.insights.map((insight, index) => {
                  const IconComponent = getInsightTypeIcon(insight.type);
                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{insight.title}</h4>
                            <Badge className={getInsightTypeColor(insight.type)}>
                              {insight.type.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{insight.confidence}%</div>
                          <div className="text-xs text-gray-500">{insight.source}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{insight.content}</p>
                      <div className="bg-blue-50 border border-blue-200 rounded p-2">
                        <p className="text-xs text-blue-800">
                          <strong>Usage:</strong> {insight.suggested_usage}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Personalized Content */}
      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">Subject Lines</TabsTrigger>
          <TabsTrigger value="openings">Opening Lines</TabsTrigger>
          <TabsTrigger value="value">Value Props</TabsTrigger>
          <TabsTrigger value="cta">Call to Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Subject Lines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {personalizationData.personalized_content.subject_suggestions.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="flex-1">{subject}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {Math.floor(Math.random() * 20) + 60}% predicted open rate
                    </Badge>
                    <Button size="sm" variant="outline">
                      Use
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="openings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Opening Lines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {personalizationData.personalized_content.opening_lines.map((opening, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <p className="mb-2">{opening}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {Math.floor(Math.random() * 15) + 70}% engagement score
                    </Badge>
                    <Button size="sm" variant="outline">
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="value" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tailored Value Propositions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {personalizationData.personalized_content.value_propositions.map((value, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <p className="mb-2">{value}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">High relevance match</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Use
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimized Call-to-Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {personalizationData.personalized_content.call_to_actions.map((cta, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <p className="mb-2">{cta}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {Math.floor(Math.random() * 10) + 80}% response likelihood
                    </Badge>
                    <Button size="sm" variant="outline">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Optimization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Personalization Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Communication Style</label>
              <Badge className="bg-blue-100 text-blue-800 text-sm">
                {personalizationData.communication_style}
              </Badge>
              <p className="text-xs text-gray-600 mt-1">
                Based on candidate's professional communication patterns
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Optimal Timing</label>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">
                  {personalizationData.optimal_timing.day_of_week}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {personalizationData.optimal_timing.time_of_day}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {personalizationData.optimal_timing.timezone}
                </Badge>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Personalization Score</label>
              <div className="flex items-center space-x-2">
                <Progress value={personalizationData.personalization_score} className="flex-1" />
                <span className="text-sm font-medium">{personalizationData.personalization_score}%</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                High confidence in personalization accuracy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidatePersonalizationEngine;
