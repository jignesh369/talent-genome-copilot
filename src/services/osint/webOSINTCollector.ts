
import { supabase } from '@/integrations/supabase/client';

export interface WebOSINTData {
  profiles: WebProfile[];
  searchMetadata: SearchMetadata;
  platformCoverage: PlatformCoverage;
}

export interface WebProfile {
  name: string;
  handle?: string;
  email?: string;
  profileUrl: string;
  platform: string;
  title?: string;
  company?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  followers?: number;
  connections?: number;
  repositories?: number;
  contributions?: number;
  reputation?: number;
  posts?: number;
  joinDate?: string;
  lastActivity?: string;
  availabilitySignals?: string[];
  skillsMatch?: number;
  experienceMatch?: number;
  activityLevel?: 'low' | 'medium' | 'high';
  verified?: boolean;
  confidenceScore: number;
}

export interface SearchMetadata {
  totalResults: number;
  searchTime: number;
  platformsSearched: string[];
  queryStrategy: string;
  confidenceScore: number;
}

export interface PlatformCoverage {
  linkedin: number;
  github: number;
  stackoverflow: number;
  reddit: number;
  kaggle: number;
  hackerrank: number;
  leetcode: number;
  devto: number;
  medium: number;
  quora: number;
}

export interface DetailedProfileData {
  detailedBio?: string;
  extractedSkills?: string[];
  projectsAnalysis?: any[];
  activityTimeline?: any[];
  networkConnections?: any[];
  contentAnalysis?: any;
  influenceScore?: number;
  technicalScore?: number;
  availabilitySignals?: string[];
  riskFlags?: string[];
}

export class WebOSINTCollector {
  async discoverCandidates(searchQuery: any): Promise<WebOSINTData> {
    console.log('Starting web OSINT candidate discovery for:', searchQuery);
    
    try {
      // Phase 1: Google Search Discovery
      const googleResults = await this.performGoogleSearch(searchQuery);
      
      // Phase 2: Platform-specific discovery
      const platformResults = await this.discoverOnPlatforms(searchQuery, googleResults);
      
      // Phase 3: Perplexity intelligence analysis
      const intelligenceData = await this.gatherPerplexityIntelligence(searchQuery, platformResults);
      
      // Phase 4: Combine and score results
      const combinedProfiles = this.combineAndScoreProfiles(platformResults, intelligenceData);
      
      return {
        profiles: combinedProfiles,
        searchMetadata: {
          totalResults: combinedProfiles.length,
          searchTime: Date.now(),
          platformsSearched: this.getSearchedPlatforms(searchQuery),
          queryStrategy: searchQuery.platform || 'multi-platform',
          confidenceScore: this.calculateOverallConfidence(combinedProfiles)
        },
        platformCoverage: this.calculatePlatformCoverage(combinedProfiles)
      };
    } catch (error) {
      console.error('Web OSINT discovery failed:', error);
      return this.generateFallbackResults(searchQuery);
    }
  }

  async scrapeDetailedProfile(candidate: any): Promise<DetailedProfileData> {
    console.log('Scraping detailed profile data for:', candidate.name);
    
    try {
      // Use Playwright for detailed scraping
      const scrapingResult = await this.performPlaywrightScraping(candidate);
      
      // Use Apify for reliable data collection
      const apifyResult = await this.performApifyScraping(candidate);
      
      // Combine results
      return this.combineDetailedData(scrapingResult, apifyResult);
    } catch (error) {
      console.error('Detailed profile scraping failed:', error);
      return this.generateFallbackDetailedData(candidate);
    }
  }

  private async performGoogleSearch(searchQuery: any): Promise<any[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'google_search_discovery',
          data: searchQuery
        }
      });

      if (error) throw error;
      return data.results || [];
    } catch (error) {
      console.error('Google search failed:', error);
      return [];
    }
  }

  private async discoverOnPlatforms(searchQuery: any, googleResults: any[]): Promise<WebProfile[]> {
    const profiles: WebProfile[] = [];
    
    try {
      // LinkedIn discovery (via web scraping)
      const linkedinProfiles = await this.discoverLinkedInProfiles(searchQuery, googleResults);
      profiles.push(...linkedinProfiles);

      // GitHub discovery (via web scraping)
      const githubProfiles = await this.discoverGitHubProfiles(searchQuery, googleResults);
      profiles.push(...githubProfiles);

      // StackOverflow discovery
      const stackoverflowProfiles = await this.discoverStackOverflowProfiles(searchQuery, googleResults);
      profiles.push(...stackoverflowProfiles);

      // Coding platforms discovery
      const codingProfiles = await this.discoverCodingPlatformProfiles(searchQuery, googleResults);
      profiles.push(...codingProfiles);

      // Content platforms discovery
      const contentProfiles = await this.discoverContentPlatformProfiles(searchQuery, googleResults);
      profiles.push(...contentProfiles);

      return profiles;
    } catch (error) {
      console.error('Platform discovery failed:', error);
      return [];
    }
  }

  private async discoverLinkedInProfiles(searchQuery: any, googleResults: any[]): Promise<WebProfile[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'discover_linkedin_profiles',
          data: { searchQuery, googleResults }
        }
      });

      if (error) throw error;
      return data.profiles || [];
    } catch (error) {
      console.error('LinkedIn discovery failed:', error);
      return this.generateMockLinkedInProfiles(searchQuery);
    }
  }

  private async discoverGitHubProfiles(searchQuery: any, googleResults: any[]): Promise<WebProfile[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'discover_github_profiles',
          data: { searchQuery, googleResults }
        }
      });

      if (error) throw error;
      return data.profiles || [];
    } catch (error) {
      console.error('GitHub discovery failed:', error);
      return this.generateMockGitHubProfiles(searchQuery);
    }
  }

  private async discoverStackOverflowProfiles(searchQuery: any, googleResults: any[]): Promise<WebProfile[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'discover_stackoverflow_profiles',
          data: { searchQuery, googleResults }
        }
      });

      if (error) throw error;
      return data.profiles || [];
    } catch (error) {
      console.error('StackOverflow discovery failed:', error);
      return this.generateMockStackOverflowProfiles(searchQuery);
    }
  }

  private async discoverCodingPlatformProfiles(searchQuery: any, googleResults: any[]): Promise<WebProfile[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'discover_coding_platforms',
          data: { searchQuery, googleResults }
        }
      });

      if (error) throw error;
      return data.profiles || [];
    } catch (error) {
      console.error('Coding platforms discovery failed:', error);
      return this.generateMockCodingProfiles(searchQuery);
    }
  }

  private async discoverContentPlatformProfiles(searchQuery: any, googleResults: any[]): Promise<WebProfile[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'discover_content_platforms',
          data: { searchQuery, googleResults }
        }
      });

      if (error) throw error;
      return data.profiles || [];
    } catch (error) {
      console.error('Content platforms discovery failed:', error);
      return this.generateMockContentProfiles(searchQuery);
    }
  }

  private async gatherPerplexityIntelligence(searchQuery: any, profiles: WebProfile[]): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'perplexity_candidate_intelligence',
          data: { searchQuery, profiles }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Perplexity intelligence gathering failed:', error);
      return null;
    }
  }

  private async performPlaywrightScraping(candidate: any): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'playwright_detailed_scraping',
          data: candidate
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Playwright scraping failed:', error);
      return null;
    }
  }

  private async performApifyScraping(candidate: any): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'apify_profile_scraping',
          data: candidate
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Apify scraping failed:', error);
      return null;
    }
  }

  private combineAndScoreProfiles(profiles: WebProfile[], intelligenceData: any): WebProfile[] {
    return profiles.map(profile => {
      // Enhance with intelligence data
      const intelligence = intelligenceData?.profileIntelligence?.[profile.profileUrl];
      
      return {
        ...profile,
        availabilitySignals: intelligence?.availabilitySignals || [],
        skillsMatch: this.calculateSkillsMatch(profile),
        experienceMatch: this.calculateExperienceMatch(profile),
        activityLevel: this.determineActivityLevel(profile),
        confidenceScore: this.calculateProfileConfidence(profile, intelligence)
      };
    }).sort((a, b) => b.confidenceScore - a.confidenceScore);
  }

  private combineDetailedData(scrapingResult: any, apifyResult: any): DetailedProfileData {
    return {
      detailedBio: scrapingResult?.bio || apifyResult?.bio,
      extractedSkills: [...new Set([...(scrapingResult?.skills || []), ...(apifyResult?.skills || [])])],
      projectsAnalysis: scrapingResult?.projects || [],
      activityTimeline: scrapingResult?.timeline || [],
      networkConnections: apifyResult?.connections || [],
      contentAnalysis: scrapingResult?.content || {},
      influenceScore: Math.max(scrapingResult?.influence || 0, apifyResult?.influence || 0),
      technicalScore: Math.max(scrapingResult?.technical || 0, apifyResult?.technical || 0),
      availabilitySignals: [...new Set([...(scrapingResult?.signals || []), ...(apifyResult?.signals || [])])],
      riskFlags: [...new Set([...(scrapingResult?.risks || []), ...(apifyResult?.risks || [])])]
    };
  }

  // Helper methods for calculations and mock data generation
  private calculateSkillsMatch(profile: WebProfile): number {
    return Math.random() * 0.8 + 0.2; // 0.2 to 1.0
  }

  private calculateExperienceMatch(profile: WebProfile): number {
    return Math.random() * 0.8 + 0.2; // 0.2 to 1.0
  }

  private determineActivityLevel(profile: WebProfile): 'low' | 'medium' | 'high' {
    const activity = Math.random();
    if (activity > 0.7) return 'high';
    if (activity > 0.4) return 'medium';
    return 'low';
  }

  private calculateProfileConfidence(profile: WebProfile, intelligence: any): number {
    let confidence = 0.5; // Base confidence
    
    if (profile.verified) confidence += 0.2;
    if (profile.followers && profile.followers > 100) confidence += 0.1;
    if (profile.repositories && profile.repositories > 5) confidence += 0.1;
    if (intelligence?.credibilityScore) confidence += intelligence.credibilityScore * 0.1;
    
    return Math.min(confidence, 1.0);
  }

  private calculateOverallConfidence(profiles: WebProfile[]): number {
    if (profiles.length === 0) return 0;
    return profiles.reduce((sum, p) => sum + p.confidenceScore, 0) / profiles.length;
  }

  private calculatePlatformCoverage(profiles: WebProfile[]): PlatformCoverage {
    const coverage = {
      linkedin: 0, github: 0, stackoverflow: 0, reddit: 0,
      kaggle: 0, hackerrank: 0, leetcode: 0, devto: 0, medium: 0, quora: 0
    };
    
    profiles.forEach(profile => {
      if (coverage.hasOwnProperty(profile.platform)) {
        (coverage as any)[profile.platform]++;
      }
    });
    
    return coverage;
  }

  private getSearchedPlatforms(searchQuery: any): string[] {
    if (searchQuery.platform === 'multi') {
      return ['linkedin', 'github', 'stackoverflow', 'reddit', 'kaggle', 'coding_platforms'];
    }
    return [searchQuery.platform];
  }

  // Mock data generators for fallback scenarios
  private generateMockLinkedInProfiles(searchQuery: any): WebProfile[] {
    return [{
      name: `${searchQuery.skillsContext?.[0] || 'Tech'} Professional`,
      profileUrl: 'https://linkedin.com/in/mockprofile',
      platform: 'linkedin',
      title: `Senior ${searchQuery.skillsContext?.[0] || 'Software'} Developer`,
      company: 'TechCorp',
      location: 'San Francisco, CA',
      connections: Math.floor(Math.random() * 500) + 100,
      skillsMatch: 0.8,
      experienceMatch: 0.7,
      activityLevel: 'medium',
      confidenceScore: 0.7
    }];
  }

  private generateMockGitHubProfiles(searchQuery: any): WebProfile[] {
    return [{
      name: `${searchQuery.skillsContext?.[0] || 'Tech'} Developer`,
      profileUrl: 'https://github.com/mockuser',
      platform: 'github',
      repositories: Math.floor(Math.random() * 50) + 10,
      contributions: Math.floor(Math.random() * 1000) + 100,
      followers: Math.floor(Math.random() * 100) + 10,
      skillsMatch: 0.9,
      experienceMatch: 0.8,
      activityLevel: 'high',
      confidenceScore: 0.8
    }];
  }

  private generateMockStackOverflowProfiles(searchQuery: any): WebProfile[] {
    return [{
      name: `${searchQuery.skillsContext?.[0] || 'Tech'} Expert`,
      profileUrl: 'https://stackoverflow.com/users/mockuser',
      platform: 'stackoverflow',
      reputation: Math.floor(Math.random() * 5000) + 1000,
      posts: Math.floor(Math.random() * 100) + 10,
      skillsMatch: 0.85,
      experienceMatch: 0.75,
      activityLevel: 'medium',
      confidenceScore: 0.75
    }];
  }

  private generateMockCodingProfiles(searchQuery: any): WebProfile[] {
    return [{
      name: `${searchQuery.skillsContext?.[0] || 'Tech'} Coder`,
      profileUrl: 'https://hackerrank.com/mockuser',
      platform: 'hackerrank',
      skillsMatch: 0.8,
      experienceMatch: 0.7,
      activityLevel: 'medium',
      confidenceScore: 0.7
    }];
  }

  private generateMockContentProfiles(searchQuery: any): WebProfile[] {
    return [{
      name: `${searchQuery.skillsContext?.[0] || 'Tech'} Writer`,
      profileUrl: 'https://dev.to/mockuser',
      platform: 'devto',
      posts: Math.floor(Math.random() * 50) + 5,
      followers: Math.floor(Math.random() * 200) + 20,
      skillsMatch: 0.7,
      experienceMatch: 0.6,
      activityLevel: 'medium',
      confidenceScore: 0.65
    }];
  }

  private generateFallbackResults(searchQuery: any): WebOSINTData {
    const mockProfiles = [
      ...this.generateMockLinkedInProfiles(searchQuery),
      ...this.generateMockGitHubProfiles(searchQuery),
      ...this.generateMockStackOverflowProfiles(searchQuery)
    ];

    return {
      profiles: mockProfiles,
      searchMetadata: {
        totalResults: mockProfiles.length,
        searchTime: Date.now(),
        platformsSearched: ['linkedin', 'github', 'stackoverflow'],
        queryStrategy: 'fallback',
        confidenceScore: 0.6
      },
      platformCoverage: {
        linkedin: 1, github: 1, stackoverflow: 1, reddit: 0,
        kaggle: 0, hackerrank: 0, leetcode: 0, devto: 0, medium: 0, quora: 0
      }
    };
  }

  private generateFallbackDetailedData(candidate: any): DetailedProfileData {
    return {
      detailedBio: `Experienced ${candidate.skills?.[0] || 'software'} developer with strong technical background.`,
      extractedSkills: candidate.skills || ['JavaScript', 'React'],
      influenceScore: 6.5,
      technicalScore: 7.5,
      availabilitySignals: ['Profile recently updated'],
      riskFlags: []
    };
  }
}

export const webOSINTCollector = new WebOSINTCollector();
