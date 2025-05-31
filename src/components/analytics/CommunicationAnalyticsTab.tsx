
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Send, TrendingUp, Clock } from 'lucide-react';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';

const CommunicationAnalyticsTab = () => {
  const { communicationMetrics, enhancedCandidates } = useRecruitingIntelligence();

  const getResponseRate = () => {
    const candidates = enhancedCandidates.filter(c => c.interaction_timeline.length > 0);
    if (candidates.length === 0) return 0;
    
    const totalResponses = candidates.reduce((sum, c) => sum + c.response_rate, 0);
    return (totalResponses / candidates.length) * 100;
  };

  const getActiveConversations = () => {
    return enhancedCandidates.filter(c => 
      c.interaction_timeline.some(i => 
        new Date(i.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      )
    ).length;
  };

  const getTopPerformingChannels = () => {
    const channels = ['email', 'linkedin_message', 'phone_call'];
    return channels.map(channel => {
      const interactions = enhancedCandidates.flatMap(c => 
        c.interaction_timeline.filter(i => i.type === channel)
      );
      const responses = interactions.filter(i => i.response_received).length;
      const rate = interactions.length > 0 ? (responses / interactions.length) * 100 : 0;
      
      return {
        channel,
        rate,
        count: interactions.length,
        responses
      };
    }).sort((a, b) => b.rate - a.rate);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
              Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getResponseRate().toFixed(1)}%</div>
            <p className="text-sm text-gray-600">Average across all channels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Send className="h-4 w-4 mr-2 text-green-500" />
              Active Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveConversations()}</div>
            <p className="text-sm text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
              Total Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enhancedCandidates.reduce((sum, c) => sum + c.interaction_timeline.length, 0)}
            </div>
            <p className="text-sm text-gray-600">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-orange-500" />
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-sm text-gray-600">Estimated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getTopPerformingChannels().map((channel) => (
              <div key={channel.channel} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">
                    {channel.channel.replace('_', ' ')}
                  </span>
                  <Badge variant="default">{channel.rate.toFixed(1)}%</Badge>
                </div>
                <Progress value={channel.rate} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{channel.count} sent</span>
                  <span>{channel.responses} responses</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Engaged Candidates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {enhancedCandidates
              .filter(c => c.engagement_score > 0)
              .sort((a, b) => b.engagement_score - a.engagement_score)
              .slice(0, 5)
              .map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{candidate.first_name} {candidate.last_name}</p>
                    <p className="text-xs text-gray-500">
                      {candidate.interaction_timeline.length} interactions
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="default">{candidate.engagement_score}</Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {(candidate.response_rate * 100).toFixed(0)}% response rate
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationAnalyticsTab;
