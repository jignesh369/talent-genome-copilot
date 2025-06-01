
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { useRiskAlerts } from '@/hooks/useRiskAlerts';

const RiskAlertsPanel: React.FC = () => {
  const { alerts, loading, resolveAlert, getAlertStats } = useRiskAlerts();
  const stats = getAlertStats();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Risk Alerts
          <div className="flex space-x-2 text-sm">
            <Badge variant="destructive">{stats.critical + stats.high}</Badge>
            <Badge variant="secondary">{stats.medium}</Badge>
            <Badge variant="outline">{stats.low}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <p>No active risk alerts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.filter(alert => !alert.resolved).slice(0, 5).map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-orange-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getSeverityIcon(alert.severity)}
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(alert.detected_at).toLocaleDateString()}
                      </span>
                    </div>
                    <AlertDescription>
                      <div className="font-medium mb-1">{alert.title}</div>
                      <div className="text-sm text-gray-600">{alert.description}</div>
                      {alert.recommended_actions.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs font-medium text-gray-700">Recommended Actions:</div>
                          <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                            {alert.recommended_actions.slice(0, 2).map((action, index) => (
                              <li key={index}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </AlertDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resolveAlert(alert.id)}
                    className="ml-4"
                  >
                    Resolve
                  </Button>
                </div>
              </Alert>
            ))}
            
            {alerts.filter(alert => !alert.resolved).length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline" size="sm">
                  View All Alerts ({stats.unresolved})
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskAlertsPanel;
