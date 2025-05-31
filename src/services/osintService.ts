import { OSINTProfile } from '../types/osint';

export class OSINTService {
  private static instance: OSINTService;
  private apiKeys: Record<string, string> = {};
  private rateLimits: Record<string, { remaining: number; reset: number }> = {};

  static getInstance(): OSINTService {
    if (!OSINTService.instance) {
      OSINTService.instance = new OSINTService();
    }
    return OSINTService.instance;
  }

  // GitHub API integration
  async fetchGitHubProfile(username: string) {
    try {
      // Simulate API call with realistic data
      await this.simulateDelay(800, 1500);
      
      return {
        username,
        followers: Math.floor(Math.random() * 1000) + 50,
        following: Math.floor(Math.random() * 500) + 20,
        public_repos: Math.floor(Math.random() * 50) + 10,
        total_stars: Math.floor(Math.random() * 2000) + 100,
        total_commits_last_year: Math.floor(Math.random() * 800) + 200,
        top_languages: [
          { language: 'TypeScript', percentage: 35, lines_of_code: 45000, projects_count: 12 },
          { language: 'Python', percentage: 28, lines_of_code: 38000, projects_count: 8 },
          { language: 'JavaScript', percentage: 22, lines_of_code: 29000, projects_count: 15 },
          { language: 'Go', percentage: 15, lines_of_code: 18000, projects_count: 5 }
        ],
        recent_activity: [
          { type: 'commit' as const, repo: 'ml-pipeline', date: '2024-01-28', description: 'Optimized data processing pipeline' },
          { type: 'pr' as const, repo: 'react-components', date: '2024-01-27', description: 'Added dark mode support' }
        ],
        notable_repos: [
          { name: 'ml-pipeline', description: 'Scalable ML inference pipeline', stars: 234, forks: 45, language: 'Python', last_updated: '2024-01-28', complexity_score: 8.5, innovation_score: 7.8 },
          { name: 'react-components', description: 'Reusable UI component library', stars: 89, forks: 23, language: 'TypeScript', last_updated: '2024-01-27', complexity_score: 6.2, innovation_score: 6.5 }
        ],
        contribution_streak: 127,
        code_quality_score: 8.2
      };
    } catch (error) {
      console.error('GitHub API error:', error);
      return null;
    }
  }

  // Stack Overflow API integration
  async fetchStackOverflowProfile(userId: number) {
    try {
      await this.simulateDelay(600, 1200);
      
      return {
        user_id: userId,
        reputation: Math.floor(Math.random() * 5000) + 1000,
        badges: {
          gold: Math.floor(Math.random() * 5) + 1,
          silver: Math.floor(Math.random() * 15) + 5,
          bronze: Math.floor(Math.random() * 30) + 10
        },
        top_tags: [
          { tag: 'python', score: 1250, posts_count: 45, badges_earned: 3 },
          { tag: 'machine-learning', score: 890, posts_count: 28, badges_earned: 2 },
          { tag: 'react', score: 670, posts_count: 32, badges_earned: 1 }
        ],
        answer_count: Math.floor(Math.random() * 200) + 50,
        question_count: Math.floor(Math.random() * 50) + 10,
        helpfulness_score: 8.4,
        recent_activity: [
          { type: 'answer' as const, title: 'How to optimize React re-renders', date: '2024-01-26', score: 15 },
          { type: 'badge' as const, title: 'Great Answer Badge', date: '2024-01-25', score: 0 }
        ]
      };
    } catch (error) {
      console.error('Stack Overflow API error:', error);
      return null;
    }
  }

  // Twitter/X API integration
  async fetchTwitterProfile(username: string) {
    try {
      await this.simulateDelay(700, 1300);
      
      return {
        username,
        followers: Math.floor(Math.random() * 5000) + 500,
        following: Math.floor(Math.random() * 1000) + 200,
        tweet_count: Math.floor(Math.random() * 2000) + 1000,
        tech_engagement_score: 7.6,
        thought_leadership_score: 6.8,
        recent_tech_tweets: [
          { content: 'The future of TypeScript is looking bright with the new features...', date: '2024-01-28', retweets: 23, likes: 156, tech_relevance: 9.2 },
          { content: 'Just shipped a new ML model that improved accuracy by 15%', date: '2024-01-26', retweets: 45, likes: 289, tech_relevance: 8.8 }
        ],
        influence_metrics: {
          retweets_avg: 12.3,
          mentions_count: 89,
          engagement_rate: 4.2,
          thought_leadership_topics: ['Machine Learning', 'TypeScript', 'Web Development']
        }
      };
    } catch (error) {
      console.error('Twitter API error:', error);
      return null;
    }
  }

  // LinkedIn scraping (public data only)
  async fetchLinkedInProfile(profileUrl: string) {
    try {
      await this.simulateDelay(1000, 2000);
      
      return {
        profile_url: profileUrl,
        current_position: 'Senior Software Engineer',
        current_company: 'TechCorp Inc.',
        experience_years: Math.floor(Math.random() * 10) + 3,
        education: [
          { institution: 'Stanford University', degree: 'MS', field: 'Computer Science', start_year: 2018, end_year: 2020 },
          { institution: 'UC Berkeley', degree: 'BS', field: 'Computer Science', start_year: 2014, end_year: 2018 }
        ],
        skills: [
          { skill: 'Machine Learning', endorsements: 45, verified: true },
          { skill: 'Python', endorsements: 67, verified: true },
          { skill: 'React', endorsements: 34, verified: false }
        ],
        recommendations_count: 12,
        connections_count: Math.floor(Math.random() * 500) + 500,
        career_progression_score: 8.1
      };
    } catch (error) {
      console.error('LinkedIn scraping error:', error);
      return null;
    }
  }

  // Reddit API integration
  async fetchRedditProfile(username: string) {
    try {
      await this.simulateDelay(500, 1000);
      
      return {
        username,
        karma: Math.floor(Math.random() * 10000) + 1000,
        account_age_days: Math.floor(Math.random() * 2000) + 365,
        active_subreddits: [
          { subreddit: 'MachineLearning', posts_count: 23, karma: 567, expertise_level: 'expert' as const },
          { subreddit: 'Python', posts_count: 45, karma: 890, expertise_level: 'expert' as const },
          { subreddit: 'reactjs', posts_count: 34, karma: 445, expertise_level: 'intermediate' as const }
        ],
        tech_contributions: [
          { subreddit: 'MachineLearning', title: 'New approach to transformer optimization', type: 'post' as const, score: 234, date: '2024-01-25' },
          { subreddit: 'Python', title: 'Explained async/await patterns', type: 'comment' as const, score: 89, date: '2024-01-24' }
        ],
        expertise_areas: ['Machine Learning', 'Python', 'Data Science', 'Web Development'],
        community_standing: 8.7
      };
    } catch (error) {
      console.error('Reddit API error:', error);
      return null;
    }
  }

  // Comprehensive OSINT profile aggregation
  async buildOSINTProfile(candidateData: any): Promise<OSINTProfile> {
    const promises = [];
    
    // Fetch data from all available sources
    if (candidateData.github_username) {
      promises.push(this.fetchGitHubProfile(candidateData.github_username));
    }
    if (candidateData.stackoverflow_id) {
      promises.push(this.fetchStackOverflowProfile(candidateData.stackoverflow_id));
    }
    if (candidateData.twitter_username) {
      promises.push(this.fetchTwitterProfile(candidateData.twitter_username));
    }
    if (candidateData.linkedin_url) {
      promises.push(this.fetchLinkedInProfile(candidateData.linkedin_url));
    }
    if (candidateData.reddit_username) {
      promises.push(this.fetchRedditProfile(candidateData.reddit_username));
    }

    const [github, stackoverflow, twitter, linkedin, reddit] = await Promise.allSettled(promises);

    // Calculate aggregate scores
    const overall_score = this.calculateOverallScore({
      github: github.status === 'fulfilled' ? github.value : null,
      stackoverflow: stackoverflow.status === 'fulfilled' ? stackoverflow.value : null,
      twitter: twitter.status === 'fulfilled' ? twitter.value : null,
      linkedin: linkedin.status === 'fulfilled' ? linkedin.value : null,
      reddit: reddit.status === 'fulfilled' ? reddit.value : null
    });

    return {
      candidate_id: candidateData.id,
      github: github.status === 'fulfilled' ? github.value : undefined,
      stackoverflow: stackoverflow.status === 'fulfilled' ? stackoverflow.value : undefined,
      twitter: twitter.status === 'fulfilled' ? twitter.value : undefined,
      linkedin: linkedin.status === 'fulfilled' ? linkedin.value : undefined,
      reddit: reddit.status === 'fulfilled' ? reddit.value : undefined,
      overall_score: overall_score.overall,
      influence_score: overall_score.influence,
      technical_depth: overall_score.technical_depth,
      community_engagement: overall_score.community_engagement,
      learning_velocity: overall_score.learning_velocity,
      last_updated: new Date().toISOString(),
      availability_signals: this.detectAvailabilitySignals({
        github: github.status === 'fulfilled' ? github.value : null,
        twitter: twitter.status === 'fulfilled' ? twitter.value : null,
        linkedin: linkedin.status === 'fulfilled' ? linkedin.value : null
      })
    };
  }

  private calculateOverallScore(profiles: any) {
    let technical_depth = 0;
    let influence = 0;
    let community_engagement = 0;
    let learning_velocity = 0;
    let count = 0;

    if (profiles.github) {
      technical_depth += profiles.github.code_quality_score * 0.4;
      influence += (profiles.github.total_stars / 100) * 0.3;
      learning_velocity += profiles.github.contribution_streak / 365 * 10;
      count++;
    }

    if (profiles.stackoverflow) {
      technical_depth += profiles.stackoverflow.helpfulness_score * 0.3;
      community_engagement += (profiles.stackoverflow.reputation / 1000) * 0.4;
      count++;
    }

    if (profiles.twitter) {
      influence += profiles.twitter.thought_leadership_score * 0.4;
      community_engagement += profiles.twitter.tech_engagement_score * 0.3;
      count++;
    }

    if (profiles.reddit) {
      community_engagement += profiles.reddit.community_standing * 0.3;
      count++;
    }

    const overall = count > 0 ? (technical_depth + influence + community_engagement + learning_velocity) / (count * 4) * 10 : 0;

    return {
      overall: Math.min(overall, 10),
      technical_depth: Math.min(technical_depth / count || 0, 10),
      influence: Math.min(influence / count || 0, 10),
      community_engagement: Math.min(community_engagement / count || 0, 10),
      learning_velocity: Math.min(learning_velocity / count || 0, 10)
    };
  }

  private detectAvailabilitySignals(profiles: any) {
    const signals = [];
    const now = new Date();

    // GitHub activity patterns
    if (profiles.github && profiles.github.recent_activity) {
      const recentCommits = profiles.github.recent_activity.filter((activity: any) => 
        activity.type === 'commit' && 
        new Date(activity.date) > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      );
      
      if (recentCommits.length > 10) {
        signals.push({
          signal_type: 'side_project_focus' as const,
          confidence: 0.7,
          source: 'GitHub',
          detected_at: now.toISOString(),
          details: 'High recent activity suggests active development focus'
        });
      }
    }

    // Twitter sentiment analysis
    if (profiles.twitter && profiles.twitter.recent_tech_tweets) {
      const careerTweets = profiles.twitter.recent_tech_tweets.filter((tweet: any) =>
        tweet.content.toLowerCase().includes('looking for') || 
        tweet.content.toLowerCase().includes('new opportunity') ||
        tweet.content.toLowerCase().includes('career change')
      );
      
      if (careerTweets.length > 0) {
        signals.push({
          signal_type: 'open_to_opportunities' as const,
          confidence: 0.8,
          source: 'Twitter',
          detected_at: now.toISOString(),
          details: 'Recent tweets suggest openness to new opportunities'
        });
      }
    }

    return signals;
  }

  private async simulateDelay(min: number, max: number) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

export const osintService = OSINTService.getInstance();
