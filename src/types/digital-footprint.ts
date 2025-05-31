
export interface DigitalFootprintSnapshot {
  candidate_id: string;
  ai_summary: string;
  skill_radar: SkillRadarData;
  achievement_badges: AchievementBadge[];
  risk_signals: RiskSignal[];
  last_generated: string;
  confidence_score: number;
}

export interface SkillRadarData {
  categories: SkillCategory[];
  max_score: number;
}

export interface SkillCategory {
  category: string;
  score: number;
  max_score: number;
  evidence: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: 'open-source' | 'top-performer' | 'thought-leader' | 'community-builder' | 'innovation' | 'mentorship';
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
  evidence: string;
}

export interface RiskSignal {
  type: 'job-switching' | 'work-gap' | 'low-activity' | 'skill-gap' | 'communication';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  recommendation: string;
  detected_from: string;
}
