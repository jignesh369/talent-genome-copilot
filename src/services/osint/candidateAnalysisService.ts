
import { supabase } from '@/integrations/supabase/client';

export interface CandidateAnalysisResult {
  candidateId: string;
  aiSummary: string;
  strengths: string[];
  weaknesses: string[];
  growthPotential: string;
  riskFlags: string[];
  socialCredibilityScore: number;
  technicalDepthScore: number;
  communityEngagementScore: number;
  availabilitySignals: string[];
}

export interface OSINTData {
  github?: {
    profile: any;
    repositories: any[];
    contributions: any[];
  };
  stackoverflow?: {
    profile: any;
    answers: any[];
    questions: any[];
  };
  linkedin?: {
    profile: any;
    connections: number;
    posts: any[];
  };
  reddit?: {
    profile: any;
    posts: any[];
    comments: any[];
  };
  blogs?: {
    articles: any[];
    platforms: string[];
  };
}

export class CandidateAnalysisService {
  async analyzeCandidate(osintData: OSINTData, candidateId: string): Promise<CandidateAnalysisResult> {
    console.log('Analyzing candidate with OSINT data:', candidateId);
    
    try {
      // Call AI analysis function
      const { data: analysisResult, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'analyze_candidate_osint',
          data: {
            candidateId,
            osintData,
            analysisType: 'comprehensive'
          }
        }
      });

      if (error) {
        console.error('Error in AI candidate analysis:', error);
        return this.getFallbackAnalysis(osintData, candidateId);
      }

      return {
        candidateId,
        aiSummary: analysisResult.summary,
        strengths: analysisResult.strengths || [],
        weaknesses: analysisResult.weaknesses || [],
        growthPotential: analysisResult.growthPotential || '',
        riskFlags: analysisResult.riskFlags || [],
        socialCredibilityScore: analysisResult.socialCredibilityScore || 0,
        technicalDepthScore: analysisResult.technicalDepthScore || 0,
        communityEngagementScore: analysisResult.communityEngagementScore || 0,
        availabilitySignals: analysisResult.availabilitySignals || []
      };
    } catch (error) {
      console.error('Failed to analyze candidate:', error);
      return this.getFallbackAnalysis(osintData, candidateId);
    }
  }

  private getFallbackAnalysis(osintData: OSINTData, candidateId: string): CandidateAnalysisResult {
    const strengths = [];
    const weaknesses = [];
    const riskFlags = [];
    const availabilitySignals = [];
    
    // Analyze GitHub data
    if (osintData.github) {
      const repos = osintData.github.repositories || [];
      const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stars || 0), 0);
      
      if (totalStars > 100) {
        strengths.push('Strong open source presence with high-quality repositories');
      }
      
      if (repos.length > 10) {
        strengths.push('Prolific developer with diverse project portfolio');
      } else if (repos.length < 3) {
        weaknesses.push('Limited public code portfolio');
      }
      
      // Check for recent activity
      const recentActivity = repos.some((repo: any) => {
        const lastUpdate = new Date(repo.updated_at || 0);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return lastUpdate > sixMonthsAgo;
      });
      
      if (recentActivity) {
        availabilitySignals.push('Recent GitHub activity indicates active development');
      }
    }

    // Analyze Stack Overflow data
    if (osintData.stackoverflow) {
      const reputation = osintData.stackoverflow.profile?.reputation || 0;
      
      if (reputation > 5000) {
        strengths.push('High Stack Overflow reputation demonstrating problem-solving skills');
      } else if (reputation < 100) {
        weaknesses.push('Limited Stack Overflow engagement');
      }
    }

    // Analyze LinkedIn data
    if (osintData.linkedin) {
      const connections = osintData.linkedin.connections || 0;
      
      if (connections > 500) {
        strengths.push('Well-connected professional with strong industry network');
      }
      
      const recentPosts = osintData.linkedin.posts?.filter((post: any) => {
        const postDate = new Date(post.date || 0);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        return postDate > threeMonthsAgo;
      }) || [];
      
      if (recentPosts.length > 0) {
        availabilitySignals.push('Recent LinkedIn activity suggests professional engagement');
      }
    }

    // Calculate scores
    const socialCredibilityScore = this.calculateSocialCredibilityScore(osintData);
    const technicalDepthScore = this.calculateTechnicalDepthScore(osintData);
    const communityEngagementScore = this.calculateCommunityEngagementScore(osintData);

    return {
      candidateId,
      aiSummary: this.generateFallbackSummary(osintData, strengths, weaknesses),
      strengths,
      weaknesses,
      growthPotential: 'Shows consistent engagement in technical communities with potential for continued growth',
      riskFlags,
      socialCredibilityScore,
      technicalDepthScore,
      communityEngagementScore,
      availabilitySignals
    };
  }

  private calculateSocialCredibilityScore(osintData: OSINTData): number {
    let score = 0;
    
    // GitHub contribution
    if (osintData.github) {
      const repos = osintData.github.repositories || [];
      const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stars || 0), 0);
      score += Math.min(totalStars / 100, 3); // Max 3 points for stars
    }
    
    // Stack Overflow reputation
    if (osintData.stackoverflow) {
      const reputation = osintData.stackoverflow.profile?.reputation || 0;
      score += Math.min(reputation / 1000, 3); // Max 3 points for reputation
    }
    
    // LinkedIn connections
    if (osintData.linkedin) {
      const connections = osintData.linkedin.connections || 0;
      score += Math.min(connections / 200, 2); // Max 2 points for connections
    }
    
    // Blog content
    if (osintData.blogs?.articles?.length) {
      score += Math.min(osintData.blogs.articles.length / 5, 2); // Max 2 points for articles
    }
    
    return Math.min(score, 10);
  }

  private calculateTechnicalDepthScore(osintData: OSINTData): number {
    let score = 0;
    
    // GitHub repository quality
    if (osintData.github) {
      const repos = osintData.github.repositories || [];
      const languages = new Set(repos.map((repo: any) => repo.language).filter(Boolean));
      score += Math.min(languages.size, 3); // Max 3 points for language diversity
      
      const hasDocumentation = repos.some((repo: any) => repo.has_readme || repo.has_wiki);
      if (hasDocumentation) score += 1;
      
      const hasTests = repos.some((repo: any) => repo.has_tests);
      if (hasTests) score += 1;
    }
    
    // Stack Overflow technical answers
    if (osintData.stackoverflow) {
      const answers = osintData.stackoverflow.answers || [];
      const acceptedAnswers = answers.filter((answer: any) => answer.is_accepted);
      score += Math.min(acceptedAnswers.length / 10, 3); // Max 3 points for accepted answers
    }
    
    // Technical blog content
    if (osintData.blogs?.articles?.length) {
      const technicalArticles = osintData.blogs.articles.filter((article: any) => 
        article.tags?.some((tag: string) => 
          ['programming', 'development', 'tech', 'code'].includes(tag.toLowerCase())
        )
      );
      score += Math.min(technicalArticles.length / 3, 2); // Max 2 points for technical articles
    }
    
    return Math.min(score, 10);
  }

  private calculateCommunityEngagementScore(osintData: OSINTData): number {
    let score = 0;
    
    // GitHub community contributions
    if (osintData.github) {
      const contributions = osintData.github.contributions || [];
      score += Math.min(contributions.length / 50, 3); // Max 3 points for contributions
    }
    
    // Stack Overflow participation
    if (osintData.stackoverflow) {
      const answers = osintData.stackoverflow.answers || [];
      const questions = osintData.stackoverflow.questions || [];
      score += Math.min((answers.length + questions.length) / 20, 2); // Max 2 points for participation
    }
    
    // Reddit community engagement
    if (osintData.reddit) {
      const posts = osintData.reddit.posts || [];
      const comments = osintData.reddit.comments || [];
      score += Math.min((posts.length + comments.length) / 30, 2); // Max 2 points for engagement
    }
    
    // LinkedIn professional sharing
    if (osintData.linkedin) {
      const posts = osintData.linkedin.posts || [];
      score += Math.min(posts.length / 10, 3); // Max 3 points for professional sharing
    }
    
    return Math.min(score, 10);
  }

  private generateFallbackSummary(osintData: OSINTData, strengths: string[], weaknesses: string[]): string {
    const platforms = Object.keys(osintData).join(', ');
    const strengthCount = strengths.length;
    const weaknessCount = weaknesses.length;
    
    if (strengthCount > weaknessCount) {
      return `Strong technical professional with active presence across ${platforms}. Demonstrates ${strengthCount} key strengths in their digital footprint.`;
    } else if (weaknessCount > strengthCount) {
      return `Developing professional with presence on ${platforms}. Shows potential with ${weaknessCount} areas for growth identified.`;
    } else {
      return `Balanced technical professional with presence across ${platforms}. Shows consistent engagement with equal strengths and growth opportunities.`;
    }
  }
}

export const candidateAnalysisService = new CandidateAnalysisService();
