
import React from 'react';
import { Brain, Sparkles } from "lucide-react";

const SearchHeader: React.FC = () => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-8">
        <div className="relative p-6 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <Brain className="h-12 w-12 text-purple-600" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
        AI-Powered Talent Discovery
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Discover exceptional talent with comprehensive OSINT analysis and AI insights. 
        <span className="text-purple-600 font-semibold"> Describe your ideal candidate</span> and watch the magic happen.
      </p>
    </div>
  );
};

export default SearchHeader;
