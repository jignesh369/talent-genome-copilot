
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { History, Search, Bell, Star, MoreHorizontal, Trash2, Eye } from 'lucide-react';

interface SearchEntry {
  id: string;
  query: string;
  filters: string[];
  resultsCount: number;
  timestamp: string;
  saved: boolean;
  alertEnabled: boolean;
}

const SearchHistory: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<SearchEntry[]>([
    {
      id: '1',
      query: 'Senior React Developer',
      filters: ['Remote', 'Full-time', '5+ years'],
      resultsCount: 47,
      timestamp: '2 hours ago',
      saved: true,
      alertEnabled: true
    },
    {
      id: '2',
      query: 'Product Manager fintech',
      filters: ['San Francisco', 'Senior level'],
      resultsCount: 23,
      timestamp: '1 day ago',
      saved: false,
      alertEnabled: false
    },
    {
      id: '3',
      query: 'UX Designer startup',
      filters: ['NYC', 'Mid-level', 'Portfolio required'],
      resultsCount: 31,
      timestamp: '3 days ago',
      saved: true,
      alertEnabled: true
    }
  ]);

  const toggleSaved = (id: string) => {
    setSearchHistory(prev => prev.map(entry => 
      entry.id === id ? { ...entry, saved: !entry.saved } : entry
    ));
  };

  const toggleAlert = (id: string) => {
    setSearchHistory(prev => prev.map(entry => 
      entry.id === id ? { ...entry, alertEnabled: !entry.alertEnabled } : entry
    ));
  };

  const deleteEntry = (id: string) => {
    setSearchHistory(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5 text-blue-600" />
          <span>Search History & Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input placeholder="Search your history..." className="flex-1" />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {searchHistory.map((entry) => (
              <div key={entry.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{entry.query}</h3>
                      <Badge variant="secondary">{entry.resultsCount} results</Badge>
                      {entry.saved && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      {entry.alertEnabled && <Bell className="h-4 w-4 text-blue-500" />}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {entry.filters.map((filter, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {filter}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-500">{entry.timestamp}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleSaved(entry.id)}
                    >
                      <Star className={`h-4 w-4 ${entry.saved ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleAlert(entry.id)}
                    >
                      <Bell className={`h-4 w-4 ${entry.alertEnabled ? 'text-blue-500' : 'text-gray-400'}`} />
                    </Button>
                    
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchHistory;
