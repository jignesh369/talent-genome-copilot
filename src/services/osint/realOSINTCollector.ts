
import { supabase } from '@/integrations/supabase/client';

export interface RealOSINTData {
  github?: GitHubRealData;
  stackoverflow?: StackOverflowRealData;
  linkedin?: LinkedInRealData;
  general_web?: WebSearchData;
  perplexity_insights?: PerplexityInsights;
}

export interface GitHubRealData {
  username: string;
  profile: any;
  repositories: any[];
  contributions: number;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  bio?: string;
  company?: string;
  location?: string;
  blog?: string;
  twitter_username?: string;
  hireable?: boolean;
}

export interface StackOverflowRealData {
  user_id: number;
  display_name: string;
  reputation: number;
  badges: any;
  answer_count: number;
  question_count: number;
  up_vote_count: number;
  down_vote_count: number;
  profile_image: string;
  website_url?: string;
  location?: string;
  about_me?: string;
  creation_date: number;
  last_access_date: number;
}

export interface LinkedInRealData {
  profile_url: string;
  name: string;
  headline?: string;
  location?: string;
  connections?: number;
  experience?: any[];
  education?: any[];
  skills?: string[];
  about?: string;
  current_company?: string;
  current_position?: string;
}

export interface WebSearchData {
  query: string;
  results: SearchResult[];
  total_results: number;
  search_time: number;
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
  relevance_score: number;
}

export interface PerplexityInsights {
  availability_signals: string[];
  market_insights: string[];
  competitive_analysis: string;
  recent_activity: string[];
  risk_assessment: string;
  confidence_score: number;
}

export class RealOSINTCollector {
  async collectCandidateData(candidateInfo: any): Promise<RealOSINTData> {
    console.log('Starting real OSINT data collection for:', candidateInfo);
    
    const data: RealOSINTData = {};
    
    try {
      // Parallel data collection from multiple sources
      const [githubData, stackoverflowData, linkedinData, webData, perplexityData] = await Promise.allSettled([
        this.collectGitHubData(candidateInfo),
        this.collectStackOverflowData(candidateInfo),
        this.collectLinkedInData(candidateInfo),
        this.collectWebSearchData(candidateInfo),
        this.collectPerplexityInsights(candidateInfo)
      ]);

      if (githubData.status === 'fulfilled') data.github = githubData.value;
      if (stackoverflowData.status === 'fulfilled') data.stackoverflow = stackoverflowData.value;
      if (linkedinData.status === 'fulfilled') data.linkedin = linkedinData.value;
      if (webData.status === 'fulfilled') data.general_web = webData.value;
      if (perplexityData.status === 'fulfilled') data.perplexity_insights = perplexityData.value;

      return data;
    } catch (error) {
      console.error('Error collecting OSINT data:', error);
      throw error;
    }
  }

  private async collectGitHubData(candidateInfo: any): Promise<GitHubRealData | null> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'collect_github_data',
          data: candidateInfo
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('GitHub data collection failed:', error);
      return null;
    }
  }

  private async collectStackOverflowData(candidateInfo: any): Promise<StackOverflowRealData | null> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'collect_stackoverflow_data',
          data: candidateInfo
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('StackOverflow data collection failed:', error);
      return null;
    }
  }

  private async collectLinkedInData(candidateInfo: any): Promise<LinkedInRealData | null> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'collect_linkedin_data',
          data: candidateInfo
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('LinkedIn data collection failed:', error);
      return null;
    }
  }

  private async collectWebSearchData(candidateInfo: any): Promise<WebSearchData | null> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'collect_web_search_data',
          data: candidateInfo
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Web search data collection failed:', error);
      return null;
    }
  }

  private async collectPerplexityInsights(candidateInfo: any): Promise<PerplexityInsights | null> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'collect_perplexity_insights',
          data: candidateInfo
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Perplexity insights collection failed:', error);
      return null;
    }
  }
}

export const realOSINTCollector = new RealOSINTCollector();
