
import React from 'react';
import SearchHeader from "./SearchHeader";
import SearchContainer from "./SearchContainer";

const MindReaderSearch = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 p-4 sm:p-6">
      <SearchHeader />
      <SearchContainer />
    </div>
  );
};

export default MindReaderSearch;
