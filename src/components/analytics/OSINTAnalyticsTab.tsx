
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
    if (!osintMonitoring.active || osintMonitoring.active.length === 0) return 0;
    return osintMonitoring.active.reduce((sum: number, profile: any) => sum + (profile.overall_score || 0), 0) / osintMonitoring.active.length;
  };

  const getRiskLevel = (score: number) => {
    if (score >= 8) return { label: 'Low Risk', color: 'green' };
    if (score >= 6) return { label: 'Medium Risk', color: 'yellow' };
    return { label: 'High Risk', color: 'red' };
  };

  const activeAlerts = alerts.filter((alert: any) => alert.status === 'active');
  const recentAlerts = alerts.slice(0, 5);

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
            <div className="text-2xl font-bold">{osintMonitoring.total || 0}</div>
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
            <div className="text-2xl font-bold">{activeAlerts.length}</div>
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
            {(osintMonitoring.active || []).slice(0, 5).map((profile: any, index: number) => {
              const risk = getRiskLevel(profile.overall_score || 0);
              return (
                <div key={profile.candidate_id || index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Candidate {profile.candidate_id || index + 1}</span>
                    <Badge variant={risk.color === 'green' ? 'default' : 'destructive'}>
                      {(profile.overall_score || 0)}/10
                    </Badge>
                  </div>
                  <Progress value={(profile.overall_score || 0) * 10} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Influence: {(profile.influence_score || 0)}/10</span>
                    <span>Technical: {(profile.technical_depth || 0)}/10</span>
                  </div>
                </div>
              );
            })}
            {(!osintMonitoring.active || osintMonitoring.active.length === 0) && (
              <p className="text-gray-500 text-center py-4">No OSINT profiles available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert: any, index: number) => (
              <div key={alert.id || index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {alert.status === 'active' ? (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{alert.title || alert.type || 'Alert'}</p>
                    <p className="text-xs text-gray-500">{alert.description || alert.message || 'No details available'}</p>
                  </div>
                </div>
                {alert.status === 'active' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => resolveAlert(alert.id)}
                  >
                    Resolve
                  </Button>
                )}
              </div>
            ))}
            {recentAlerts.length === 0 && (
              <p className="text-gray-500 text-center py-4">No alerts available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OSINTAnalyticsTab;
