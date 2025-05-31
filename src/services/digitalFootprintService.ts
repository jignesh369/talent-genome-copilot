
import { DigitalFootprintSnapshot, SkillRadarData, AchievementBadge, RiskSignal } from '../types/digital-footprint';
import { EnhancedCandidate } from '../types/enhanced-candidate';

export class DigitalFootprintService {
  private static instance: DigitalFootprintService;
  private cache = new Map<string, DigitalFootprintSnapshot>();

  static getInstance(): DigitalFootprintService {
    if (!DigitalFootprintService.instance) {
      DigitalFootprintService.instance = new DigitalFootprintService();
    }
    return DigitalFootprintService.instance;
  }

  async generateSnapshot(candidate: EnhancedCandidate): Promise<DigitalFootprintSnapshot> {
    // Check cache first
    const cached = this.cache.get(candidate.id);
    if (cached && this.isCacheValid(cached)) {
      return cached;
    }

    console.log(`Generating digital footprint snapshot for ${candidate.name}`);

    // Simulate AI processing delay
    await this.simulateDelay(1000, 2000);

    const snapshot: DigitalFootprintSnapshot = {
      candidate_id: candidate.id,
      ai_summary: await this.generateAISummary(candidate),
      skill_radar: this.generateSkillRadar(candidate),
      achievement_badges: this.generateAchievementBadges(candidate),
      risk_signals: this.analyzeRiskSignals(candidate),
      last_generated: new Date().toISOString(),
      confidence_score: Math.random() * 0.2 + 0.8 // 80-100%
    };

    // Cache the result
    this.cache.set(candidate.id, snapshot);
    return snapshot;
  }

  private async generateAISummary(candidate: EnhancedCandidate): Promise<string> {
    // This would integrate with GPT-4o in production
    const summaries = [
      `Strong in ${candidate.skills[0]} development with growing expertise in ${candidate.skills[1]}. Active contributor to open source projects. Recent job changes suggest career growth focus - verify stability preferences.`,
      `Experienced ${candidate.current_title?.toLowerCase()} with deep technical knowledge. Strong community engagement on platforms. Consider discussing long-term career goals given recent transitions.`,
      `Solid technical foundation in ${candidate.skills.slice(0, 2).join(' and ')}. Limited recent activity suggests focused project work. Strong potential but may need motivation assessment.`,
      `Rising talent with ${candidate.experience_years} years experience. Excellent learning velocity and community involvement. Job progression shows ambition - good cultural fit candidate.`,
      `Technical expert with proven track record. High-quality contributions across platforms. Stable career progression indicates reliability and commitment.`
    ];

    return summaries[Math.floor(Math.random() * summaries.length)];
  }

  private generateSkillRadar(candidate: EnhancedCandidate): SkillRadarData {
    const categories = [
      {
        category: 'Backend Development',
        score: this.calculateSkillScore(candidate, ['Python', 'Node.js', 'Go', 'Java', 'AWS']),
        max_score: 10,
        evidence: ['GitHub repositories', 'Stack Overflow answers', 'Project complexity']
      },
      {
        category: 'Frontend Development',
        score: this.calculateSkillScore(candidate, ['React', 'Vue.js', 'TypeScript', 'JavaScript', 'CSS']),
        max_score: 10,
        evidence: ['UI/UX projects', 'Component libraries', 'Design system work']
      },
      {
        category: 'Infrastructure & DevOps',
        score: this.calculateSkillScore(candidate, ['Kubernetes', 'Docker', 'AWS', 'GCP', 'Terraform']),
        max_score: 10,
        evidence: ['Infrastructure projects', 'CI/CD implementations', 'Cloud certifications']
      },
      {
        category: 'Data & ML',
        score: this.calculateSkillScore(candidate, ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'SQL']),
        max_score: 10,
        evidence: ['ML projects', 'Data analysis', 'Research papers', 'Kaggle competitions']
      },
      {
        category: 'Collaboration & Leadership',
        score: candidate.community_influence_score || Math.random() * 3 + 6,
        max_score: 10,
        evidence: ['Team projects', 'Mentoring activity', 'Conference talks', 'Open source leadership']
      },
      {
        category: 'Communication',
        score: this.calculateCommunicationScore(candidate),
        max_score: 10,
        evidence: ['Technical writing', 'Documentation quality', 'Community engagement', 'Presentation skills']
      }
    ];

    return {
      categories,
      max_score: 10
    };
  }

  private calculateSkillScore(candidate: EnhancedCandidate, relevantSkills: string[]): number {
    const hasSkills = candidate.skills.filter(skill => 
      relevantSkills.some(relevant => skill.toLowerCase().includes(relevant.toLowerCase()))
    );
    
    const baseScore = (hasSkills.length / relevantSkills.length) * 6; // 0-6 base
    const experienceBonus = Math.min(candidate.experience_years / 5, 1) * 2; // 0-2 bonus
    const communityBonus = (candidate.community_influence_score || 7) / 10 * 2; // 0-2 bonus
    
    return Math.min(baseScore + experienceBonus + communityBonus, 10);
  }

  private calculateCommunicationScore(candidate: EnhancedCandidate): number {
    // Base score from cultural fit indicators
    const culturalFitScore = candidate.cultural_fit_indicators
      ?.find(indicator => indicator.aspect === 'communication_style')?.score || 7;
    
    // Adjust based on community engagement
    const communityBonus = (candidate.community_influence_score || 7) > 8 ? 1 : 0;
    
    return Math.min(culturalFitScore + communityBonus, 10);
  }

  private generateAchievementBadges(candidate: EnhancedCandidate): AchievementBadge[] {
    const badges: AchievementBadge[] = [];

    // Open Source Contributor
    if (candidate.osint_profile?.github && Math.random() > 0.3) {
      badges.push({
        id: 'open-source',
        title: 'Open Source Contributor',
        description: 'Active contributor to open source projects',
        icon: 'open-source',
        color: 'green',
        evidence: 'Multiple repositories with community contributions'
      });
    }

    // Top Performer
    if ((candidate.technical_depth_score || 0) > 8.5) {
      badges.push({
        id: 'top-performer',
        title: `Top 10% ${candidate.skills[0]} Developer`,
        description: 'Exceptional technical depth and code quality',
        icon: 'top-performer',
        color: 'blue',
        evidence: 'High-quality code contributions and technical complexity'
      });
    }

    // Thought Leader
    if ((candidate.community_influence_score || 0) > 8) {
      badges.push({
        id: 'thought-leader',
        title: 'Technical Thought Leader',
        description: 'Influential voice in the developer community',
        icon: 'thought-leader',
        color: 'purple',
        evidence: 'High engagement on technical content and discussions'
      });
    }

    // Fast Learner
    if ((candidate.learning_velocity_score || 0) > 8.5) {
      badges.push({
        id: 'innovation',
        title: 'Rapid Learner',
        description: 'Quickly adopts new technologies and skills',
        icon: 'innovation',
        color: 'orange',
        evidence: 'Recent adoption of trending technologies'
      });
    }

    return badges;
  }

  private analyzeRiskSignals(candidate: EnhancedCandidate): RiskSignal[] {
    const risks: RiskSignal[] = [];

    // Job switching analysis
    const jobSwitches = this.estimateJobSwitches(candidate);
    if (jobSwitches > 2) {
      risks.push({
        type: 'job-switching',
        severity: jobSwitches > 3 ? 'high' : 'medium',
        title: 'Frequent Job Changes',
        description: `${jobSwitches} job changes in recent years`,
        recommendation: 'Discuss career stability and long-term goals',
        detected_from: 'Career progression analysis'
      });
    }

    // Low activity signal
    if ((candidate.osint_profile?.community_engagement || 0) < 5) {
      risks.push({
        type: 'low-activity',
        severity: 'medium',
        title: 'Limited Digital Presence',
        description: 'Below average online technical activity',
        recommendation: 'Verify current engagement and interest level',
        detected_from: 'OSINT activity analysis'
      });
    }

    // Skill gap analysis
    if (candidate.skills.length < 3) {
      risks.push({
        type: 'skill-gap',
        severity: 'low',
        title: 'Limited Skill Diversity',
        description: 'Narrow technical skill set documented',
        recommendation: 'Explore hidden skills during interview',
        detected_from: 'Profile skill analysis'
      });
    }

    return risks;
  }

  private estimateJobSwitches(candidate: EnhancedCandidate): number {
    // Simulate job switching analysis based on experience years
    const avgJobLength = 2.5; // years
    const estimatedJobs = candidate.experience_years / avgJobLength;
    return Math.floor(estimatedJobs + (Math.random() - 0.5));
  }

  private isCacheValid(snapshot: DigitalFootprintSnapshot): boolean {
    const cacheAgeHours = (Date.now() - new Date(snapshot.last_generated).getTime()) / (1000 * 60 * 60);
    return cacheAgeHours < 24; // Cache for 24 hours
  }

  private async simulateDelay(min: number, max: number): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

export const digitalFootprintService = DigitalFootprintService.getInstance();
