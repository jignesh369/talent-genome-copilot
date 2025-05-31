
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, X, Star, Brain, User, Award } from 'lucide-react';
import { SkillExtraction } from '@/types/resume-parser';

interface SkillsTaggerProps {
  skills: SkillExtraction[];
  onSkillsChange: (skills: SkillExtraction[]) => void;
  isEditable?: boolean;
  showConfidence?: boolean;
  className?: string;
}

const SkillsTagger: React.FC<SkillsTaggerProps> = ({
  skills = [],
  onSkillsChange,
  isEditable = true,
  showConfidence = true,
  className = ""
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillExtraction['category']>('technical');

  const addSkill = useCallback(() => {
    if (!newSkill.trim()) return;
    
    const skill: SkillExtraction = {
      id: `skill_${Date.now()}`,
      name: newSkill.trim(),
      category: selectedCategory,
      confidence_score: 1.0,
      source: 'manual_added',
      proficiency_level: 'intermediate'
    };
    
    onSkillsChange([...skills, skill]);
    setNewSkill('');
  }, [newSkill, selectedCategory, skills, onSkillsChange]);

  const removeSkill = useCallback((skillId: string) => {
    onSkillsChange(skills.filter(skill => skill.id !== skillId));
  }, [skills, onSkillsChange]);

  const updateSkillCategory = useCallback((skillId: string, category: SkillExtraction['category']) => {
    onSkillsChange(skills.map(skill => 
      skill.id === skillId ? { ...skill, category } : skill
    ));
  }, [skills, onSkillsChange]);

  const getCategoryIcon = (category: SkillExtraction['category']) => {
    switch (category) {
      case 'technical': return <Brain className="h-3 w-3" />;
      case 'soft': return <User className="h-3 w-3" />;
      case 'domain': return <Star className="h-3 w-3" />;
      case 'certification': return <Award className="h-3 w-3" />;
      default: return <Star className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category: SkillExtraction['category']) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'soft': return 'bg-green-100 text-green-800 border-green-200';
      case 'domain': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'certification': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'language': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillExtraction['category'], SkillExtraction[]>);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Skills ({skills.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditable && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              className="flex-1"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as SkillExtraction['category'])}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="technical">Technical</option>
              <option value="soft">Soft Skill</option>
              <option value="domain">Domain</option>
              <option value="certification">Certification</option>
              <option value="language">Language</option>
            </select>
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize flex items-center">
                {getCategoryIcon(category as SkillExtraction['category'])}
                <span className="ml-1">{category} Skills ({categorySkills.length})</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className={`${getCategoryColor(skill.category)} relative group hover:scale-105 transition-transform`}
                  >
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(skill.category)}
                      <span>{skill.name}</span>
                      {showConfidence && (
                        <span className={`text-xs ${getConfidenceColor(skill.confidence_score)}`}>
                          {Math.round(skill.confidence_score * 100)}%
                        </span>
                      )}
                      {skill.proficiency_level && (
                        <span className="text-xs opacity-75">
                          ({skill.proficiency_level})
                        </span>
                      )}
                      {isEditable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                          className="h-4 w-4 p-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No skills detected yet.</p>
            {isEditable && (
              <p className="text-sm">Upload a resume or add skills manually.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsTagger;
