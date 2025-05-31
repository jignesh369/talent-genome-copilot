
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, Shield, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';

const OSINTAnalyticsTab = () => {
  const { osintMonitoring, alerts, resolveAlert, getCandidateAlerts } = useRecruitingIntelligence();

  const getOverallScore = () => {
    if (osintMonitoring.length === 0) return 0;
    return osintMonitoring.reduce((sum, profile) => sum + profile.overall_score, 0) / osintMonitoring.length;
  };

  const getRiskLevel = (score: number) => {
    if (score >= 8) return { label: 'Low Risk', color: 'green' };
    if (score >= 6) return { label: 'Medium Risk', color: 'yellow' };
    return { label: 'High Risk', color: 'red' };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Eye className="h-4 w-4 mr-2 text-blue-500" />
              OSINT Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{osintMonitoring.length}</div>
            <p className="text-sm text-gray-600">Candidates monitored</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              Average Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOverallScore().toFixed(1)}/10</div>
            <Badge variant="secondary" className="mt-1">
              {getRiskLevel(getOverallScore()).label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.filter(a => a.status === 'active').length}</div>
            <p className="text-sm text-gray-600">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>OSINT Profile Quality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {osintMonitoring.slice(0, 5).map((profile) => {
              const risk = getRiskLevel(profile.overall_score);
              return (
                <div key={profile.candidate_id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Candidate {profile.candidate_id}</span>
                    <Badge variant={risk.color === 'green' ? 'default' : 'destructive'}>
                      {profile.overall_score}/10
                    </Badge>
                  </div>
                  <Progress value={profile.overall_score * 10} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Influence: {profile.influence_score}/10</span>
                    <span>Technical: {profile.technical_depth}/10</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {alert.status === 'active' ? (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{alert.type}</p>
                    <p className="text-xs text-gray-500">{alert.message}</p>
                  </div>
                </div>
                {alert.status === 'active' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => resolveAlert(alert.id, 'Manual review completed')}
                  >
                    Resolve
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OSINTAnalyticsTab;
