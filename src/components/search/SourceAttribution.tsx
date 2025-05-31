
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Shield } from "lucide-react";
import SourceBadge from './SourceBadge';

interface DataSource {
  platform: string;
  confidence: number;
  lastUpdated: string;
  url?: string;
  verified: boolean;
}

interface SourceAttributionProps {
  sources: DataSource[];
  title?: string;
  compact?: boolean;
}

const SourceAttribution: React.FC<SourceAttributionProps> = ({ 
  sources, 
  title = "Data Sources",
  compact = false 
}) => {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        {sources.map((source, index) => (
          <SourceBadge
            key={index}
            source={source.platform}
            confidence={source.confidence}
            lastUpdated={source.lastUpdated}
            size="sm"
          />
        ))}
      </div>
    );
  }

  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-4">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          {title}
        </h4>
        <div className="space-y-2">
          {sources.map((source, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
              <div className="flex items-center space-x-3">
                <SourceBadge 
                  source={source.platform} 
                  confidence={source.confidence}
                  showTooltip={false}
                />
                {source.verified && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{new Date(source.lastUpdated).toLocaleDateString()}</span>
                {source.url && (
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceAttribution;
