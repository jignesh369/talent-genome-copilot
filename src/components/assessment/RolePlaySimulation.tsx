
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle,
  Timer,
  Lightbulb
} from 'lucide-react';

interface RolePlaySimulationProps {
  simulation: {
    title: string;
    scenario: string;
    yourRole: string;
    otherRole: string;
    objectives: string[];
    timeLimit: number;
  };
  onComplete: (responses: { situation: string; action: string; result: string }) => void;
}

const RolePlaySimulation: React.FC<RolePlaySimulationProps> = ({
  simulation,
  onComplete
}) => {
  const [currentPhase, setCurrentPhase] = useState<'briefing' | 'simulation' | 'reflection'>('briefing');
  const [timeLeft, setTimeLeft] = useState(simulation.timeLimit);
  const [isActive, setIsActive] = useState(false);
  const [responses, setResponses] = useState({
    situation: '',
    action: '',
    result: ''
  });

  const startSimulation = () => {
    setCurrentPhase('simulation');
    setIsActive(true);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          setCurrentPhase('reflection');
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleReflectionSubmit = () => {
    onComplete(responses);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {currentPhase === 'briefing' && (
        <>
          {/* Simulation Briefing */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">{simulation.title}</h2>
                  <Badge variant="secondary" className="bg-white/20 text-white mt-1">
                    Interactive Role-Play
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Setup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Scenario
                </h3>
                <p className="text-gray-700 leading-relaxed">{simulation.scenario}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Your Role
                </h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900">You are:</p>
                    <p className="text-blue-700">{simulation.yourRole}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900">You're interacting with:</p>
                    <p className="text-gray-700">{simulation.otherRole}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Objectives */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Your Objectives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {simulation.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-green-800 text-sm">{objective}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Start Button */}
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Timer className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-bold">Ready to Start?</h3>
                <p className="text-green-100">
                  You'll have {Math.floor(simulation.timeLimit / 60)} minutes to complete this simulation
                </p>
              </div>
              <Button 
                onClick={startSimulation}
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Role-Play
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {currentPhase === 'simulation' && (
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Simulation in Progress</h2>
              <p className="text-orange-100 text-lg">
                Time Remaining: {formatTime(timeLeft)}
              </p>
            </div>
            
            <div className="bg-white/20 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-xl mb-3">Now Acting Out:</h3>
              <p className="text-lg">{simulation.title}</p>
              <p className="text-orange-100 mt-2">
                Demonstrate your approach to this scenario. Think about your communication style, 
                problem-solving approach, and how you handle challenges.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white/20 text-white hover:bg-white/30"
                onClick={() => setCurrentPhase('reflection')}
              >
                <Pause className="w-5 h-5 mr-2" />
                Complete Early
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentPhase === 'reflection' && (
        <>
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-3" />
              <h2 className="text-2xl font-bold">Simulation Complete!</h2>
              <p className="text-blue-100">Now let's reflect on your experience</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  1. Describe the situation and key challenges you identified:
                </label>
                <textarea
                  value={responses.situation}
                  onChange={(e) => setResponses(prev => ({ ...prev, situation: e.target.value }))}
                  className="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What were the main issues and stakeholder concerns..."
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  2. What actions did you take and why?
                </label>
                <textarea
                  value={responses.action}
                  onChange={(e) => setResponses(prev => ({ ...prev, action: e.target.value }))}
                  className="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your approach and decision-making process..."
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  3. What would be the expected outcome and how would you measure success?
                </label>
                <textarea
                  value={responses.result}
                  onChange={(e) => setResponses(prev => ({ ...prev, result: e.target.value }))}
                  className="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How would you know if your approach was successful..."
                />
              </div>

              <Button 
                onClick={handleReflectionSubmit}
                disabled={!responses.situation || !responses.action || !responses.result}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                Complete Assessment
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default RolePlaySimulation;
