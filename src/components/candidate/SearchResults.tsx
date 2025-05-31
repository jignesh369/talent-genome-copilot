
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  searchResults: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  if (!searchResults) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="h-5 w-5 mr-2" />
          Search Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={searchResults}
          readOnly
          rows={6}
          className="text-sm"
        />
      </CardContent>
    </Card>
  );
};

export default SearchResults;
