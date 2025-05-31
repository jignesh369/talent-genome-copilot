
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';
import { useCandidatePredictions } from '@/hooks/useCandidatePredictions';
import { useCandidateConversion } from '@/hooks/useCandidateConversion';

const PredictiveInsightsTab = () => {
  const { enhancedCandidates } = useRecruitingIntelligence();
  const { predictJobSuccess, generateAssessment } = useCandidatePredictions();
  const { convertToSearchCandidate } = useCandidateConversion();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePredictions = async () => {
    setIsGenerating(true);
    const newPredictions = [];
    
    for (const candidate of enhancedCandidates.slice(0, 5)) {
      try {
        const searchCandidate = convertToSearchCandidate(candidate);
        const prediction = await predictJobSuccess(candidate.id, ['React', 'TypeScript', 'Node.js']);
        newPredictions.push({
          candidateId: candidate.id,
          candidateName: `${candidate.first_name} ${candidate.last_name}`,
          prediction
        });
      } catch (error) {
        console.error('Error generating prediction for candidate:', candidate.id, error);
      }
    }
    
    setPredictions(newPredictions);
    setIsGenerating(false);
  };

  const getTopCandidates = () => {
    return enhancedCandidates
      .sort((a, b) => b.placement_probability_score - a.placement_probability_score)
      .slice(0, 5);
  };

  const getEngagementTrend = () => {
    const highEngagement = enhancedCandidates.filter(c => c.engagement_score > 70).length;
    const total = enhancedCandidates.length;
    return total > 0 ? (highEngagement / total) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Brain className="h-4 w-4 mr-2 text-purple-500" />
              AI Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictions.length}</div>
            <p className="text-sm text-gray-600">Success predictions generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              Engagement Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getEngagementTrend().toFixed(1)}%</div>
            <p className="text-sm text-gray-600">High engagement rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTopCandidates().length}</div>
            <p className="text-sm text-gray-600">High-potential candidates</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              AI Job Success Predictions
              <Button 
                size="sm" 
                onClick={generatePredictions}
                disabled={isGenerating}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Generate" to create AI-powered success predictions</p>
              </div>
            ) : (
              predictions.map((item) => (
                <div key={item.candidateId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.candidateName}</span>
                    <Badge variant="default">
                      {item.prediction ? `${(item.prediction.success_probability * 100).toFixed(1)}%` : 'N/A'}
                    </Badge>
                  </div>
                  {item.prediction && (
                    <Progress value={item.prediction.success_probability * 100} className="h-2" />
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Placement Candidates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getTopCandidates().map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{candidate.first_name} {candidate.last_name}</p>
                  <p className="text-xs text-gray-500">{candidate.current_title}</p>
                </div>
                <div className="text-right">
                  <Badge variant="default">{candidate.placement_probability_score}%</Badge>
                  <p className="text-xs text-gray-500 mt-1">Engagement: {candidate.engagement_score}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveInsightsTab;
