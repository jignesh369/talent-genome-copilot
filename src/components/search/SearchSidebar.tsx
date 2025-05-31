
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, RefreshCw } from "lucide-react";
import { SearchResult } from '@/types/enhanced-candidate';

interface SearchSidebarProps {
  searchResult: SearchResult;
  onRefinementClick: (refinement: string) => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({ searchResult, onRefinementClick }) => (
  <Card className="sticky top-6 shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center text-lg">
        <div className="p-2 bg-purple-100 rounded-lg mr-3">
          <Lightbulb className="h-5 w-5 text-purple-600" />
        </div>
        AI Analysis
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <h4 className="font-semibold text-sm mb-3 text-gray-800">Search Interpretation:</h4>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-gray-700 leading-relaxed">
            {searchResult.ai_interpretation.interpreted_intent}
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-3 text-gray-800">Key Requirements:</h4>
        <div className="space-y-2">
          {searchResult.ai_interpretation.extracted_requirements.slice(0, 4).map((req, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div>
                <span className="text-xs font-medium text-gray-700 capitalize">
                  {req.category.replace('_', ' ')}
                </span>
                <p className="text-xs text-gray-600">{req.value}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {Math.round(req.importance * 100)}%
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-3 text-gray-800">Diversity Insights:</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-800">
              {Object.keys(searchResult.diversity_metrics.location_distribution).length}
            </div>
            <div className="text-green-600">Locations</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="font-semibold text-purple-800">
              {searchResult.diversity_metrics.background_diversity_score.toFixed(1)}
            </div>
            <div className="text-purple-600">Diversity</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-3 text-gray-800">Suggested Refinements:</h4>
        <div className="space-y-2">
          {searchResult.suggested_refinements.slice(0, 3).map((refinement, index) => (
            <Button 
              key={index}
              variant="ghost" 
              size="sm" 
              className="text-xs h-auto p-2 w-full justify-start hover:bg-purple-50 transition-colors"
              onClick={() => onRefinementClick(refinement)}
            >
              <RefreshCw className="h-3 w-3 mr-2" />
              {refinement}
            </Button>
          ))}
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full hover:bg-purple-50 hover:border-purple-200 transition-colors">
        <Target className="h-4 w-4 mr-2" />
        Advanced Filters
      </Button>
    </CardContent>
  </Card>
);

export default SearchSidebar;
