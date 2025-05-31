
import React from 'react';

interface ScoreIndicatorProps {
  score: number;
  label: string;
  color?: string;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ score, label, color = "blue" }) => (
  <div className="flex items-center space-x-2 group">
    <div className={`w-3 h-3 rounded-full transition-all duration-200 group-hover:scale-110 ${
      color === 'blue' ? 'bg-blue-500' : 
      color === 'green' ? 'bg-green-500' : 
      color === 'purple' ? 'bg-purple-500' : 'bg-gray-500'
    }`}></div>
    <span className="text-xs text-gray-600 font-medium">{label}</span>
    <span className="text-xs font-bold text-gray-800">{score.toFixed(1)}</span>
  </div>
);

export default ScoreIndicator;
