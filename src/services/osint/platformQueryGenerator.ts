
export interface PlatformQuery {
  platform: 'github' | 'stackoverflow' | 'reddit' | 'linkedin' | 'devto' | 'medium';
  searchUrl: string;
  keywords: string[];
  queryString: string;
  expectedResults: number;
}

export interface OSINTSearchPlan {
  queries: PlatformQuery[];
  totalExpectedResults: number;
  searchStrategy: string;
  confidenceScore: number;
}

export class PlatformQueryGenerator {
  generateSearchPlan(jobSpec: any): OSINTSearchPlan {
    const queries: PlatformQuery[] = [];
    
    // Extract key information
    const skills = [...(jobSpec.must_have_skills || []), ...(jobSpec.nice_to_have_skills || [])];
    const primarySkill = skills[0] || 'software';
    const secondarySkills = skills.slice(1, 3);
    const industries = jobSpec.industries || [];
    const locations = jobSpec.locations || [];
    const experience = jobSpec.years_of_experience || '';
    
    // GitHub queries
    queries.push(...this.generateGitHubQueries(skills, industries, experience));
    
    // Stack Overflow queries
    queries.push(...this.generateStackOverflowQueries(skills, experience));
    
    // Reddit queries
    queries.push(...this.generateRedditQueries(skills, industries));
    
    // LinkedIn queries
    queries.push(...this.generateLinkedInQueries(jobSpec));
    
    // Dev.to and Medium queries
    queries.push(...this.generateContentPlatformQueries(skills, industries));
    
    const totalExpectedResults = queries.reduce((sum, q) => sum + q.expectedResults, 0);
    
    return {
      queries,
      totalExpectedResults,
      searchStrategy: this.generateSearchStrategy(jobSpec),
      confidenceScore: this.calculateConfidenceScore(jobSpec)
    };
  }

  private generateGitHubQueries(skills: string[], industries: string[], experience: string): PlatformQuery[] {
    const queries: PlatformQuery[] = [];
    const primarySkill = skills[0]?.toLowerCase() || 'javascript';
    
    // Primary skill with high activity
    queries.push({
      platform: 'github',
      searchUrl: `https://github.com/search?q=language:${primarySkill}+stars:>50+followers:>10`,
      keywords: [primarySkill, 'stars', 'followers'],
      queryString: `language:${primarySkill} stars:>50 followers:>10`,
      expectedResults: 200
    });

    // Industry-specific repositories
    if (industries.length > 0) {
      const industry = industries[0].toLowerCase();
      queries.push({
        platform: 'github',
        searchUrl: `https://github.com/search?q=${industry}+language:${primarySkill}+stars:>20`,
        keywords: [industry, primarySkill, 'stars'],
        queryString: `${industry} language:${primarySkill} stars:>20`,
        expectedResults: 100
      });
    }

    // Multi-skill repositories
    if (skills.length > 1) {
      const skillQuery = skills.slice(0, 2).join('+');
      queries.push({
        platform: 'github',
        searchUrl: `https://github.com/search?q=${skillQuery}+stars:>30`,
        keywords: skills.slice(0, 2).concat(['stars']),
        queryString: `${skillQuery} stars:>30`,
        expectedResults: 150
      });
    }

    return queries;
  }

  private generateStackOverflowQueries(skills: string[], experience: string): PlatformQuery[] {
    const queries: PlatformQuery[] = [];
    const primarySkill = skills[0]?.toLowerCase() || 'javascript';
    
    // High reputation users
    queries.push({
      platform: 'stackoverflow',
      searchUrl: `https://stackoverflow.com/search?q=[${primarySkill}]+user:me+score:5..`,
      keywords: [primarySkill, 'reputation', 'answers'],
      queryString: `[${primarySkill}] reputation:>1000 answers:>10`,
      expectedResults: 80
    });

    // Multiple skills
    if (skills.length > 1) {
      const tagQuery = skills.slice(0, 2).map(s => `[${s.toLowerCase()}]`).join('+');
      queries.push({
        platform: 'stackoverflow',
        searchUrl: `https://stackoverflow.com/search?q=${tagQuery}+score:3..`,
        keywords: skills.slice(0, 2).concat(['score']),
        queryString: `${tagQuery} reputation:>500`,
        expectedResults: 60
      });
    }

    return queries;
  }

  private generateRedditQueries(skills: string[], industries: string[]): PlatformQuery[] {
    const queries: PlatformQuery[] = [];
    const primarySkill = skills[0] || 'programming';
    
    // Programming subreddits
    queries.push({
      platform: 'reddit',
      searchUrl: `https://www.reddit.com/search/?q="${primarySkill}+developer"+site:reddit.com`,
      keywords: [primarySkill, 'developer', 'reddit'],
      queryString: `"${primarySkill} developer" site:reddit.com`,
      expectedResults: 40
    });

    // Industry-specific discussions
    if (industries.length > 0) {
      const industry = industries[0];
      queries.push({
        platform: 'reddit',
        searchUrl: `https://www.reddit.com/search/?q="${industry}+${primarySkill}"+site:reddit.com`,
        keywords: [industry, primarySkill, 'reddit'],
        queryString: `"${industry} ${primarySkill}" site:reddit.com`,
        expectedResults: 30
      });
    }

    return queries;
  }

  private generateLinkedInQueries(jobSpec: any): PlatformQuery[] {
    const queries: PlatformQuery[] = [];
    const skills = jobSpec.must_have_skills || [];
    const jobTitle = jobSpec.job_title || 'Software Engineer';
    const locations = jobSpec.locations || [];
    
    // Professional title search
    queries.push({
      platform: 'linkedin',
      searchUrl: `https://www.linkedin.com/search/results/people/?keywords="${jobTitle}"`,
      keywords: [jobTitle, 'linkedin', 'professional'],
      queryString: `"${jobTitle}" connections:>100`,
      expectedResults: 100
    });

    // Skills-based search
    if (skills.length > 0) {
      const skillQuery = skills.slice(0, 2).join(' AND ');
      queries.push({
        platform: 'linkedin',
        searchUrl: `https://www.linkedin.com/search/results/people/?keywords="${skillQuery}"`,
        keywords: skills.slice(0, 2).concat(['linkedin']),
        queryString: `"${skillQuery}" current:true`,
        expectedResults: 80
      });
    }

    // Location-based search
    if (locations.length > 0) {
      const location = locations[0];
      queries.push({
        platform: 'linkedin',
        searchUrl: `https://www.linkedin.com/search/results/people/?geoUrn=&keywords="${jobTitle}+${location}"`,
        keywords: [jobTitle, location, 'linkedin'],
        queryString: `"${jobTitle}" location:"${location}"`,
        expectedResults: 60
      });
    }

    return queries;
  }

  private generateContentPlatformQueries(skills: string[], industries: string[]): PlatformQuery[] {
    const queries: PlatformQuery[] = [];
    const primarySkill = skills[0] || 'technology';
    
    // Dev.to articles
    queries.push({
      platform: 'devto',
      searchUrl: `https://dev.to/search?q=${primarySkill}`,
      keywords: [primarySkill, 'devto', 'articles'],
      queryString: `${primarySkill} site:dev.to`,
      expectedResults: 50
    });

    // Medium articles
    queries.push({
      platform: 'medium',
      searchUrl: `https://medium.com/search?q=${primarySkill}`,
      keywords: [primarySkill, 'medium', 'technical writing'],
      queryString: `${primarySkill} site:medium.com`,
      expectedResults: 40
    });

    return queries;
  }

  private generateSearchStrategy(jobSpec: any): string {
    const strategies = [];
    
    if (jobSpec.must_have_skills?.length > 0) {
      strategies.push("GitHub repository analysis for technical depth");
    }
    
    if (jobSpec.years_of_experience) {
      strategies.push("Stack Overflow reputation and activity scoring");
    }
    
    if (jobSpec.industries?.length > 0) {
      strategies.push("Industry-specific project and discussion analysis");
    }
    
    strategies.push("LinkedIn professional network evaluation");
    strategies.push("Content platform thought leadership assessment");
    
    return strategies.join('. ') + '.';
  }

  private calculateConfidenceScore(jobSpec: any): number {
    let score = 0.5; // Base confidence
    
    if (jobSpec.must_have_skills?.length > 0) score += 0.2;
    if (jobSpec.job_title) score += 0.1;
    if (jobSpec.years_of_experience) score += 0.1;
    if (jobSpec.industries?.length > 0) score += 0.1;
    
    return Math.min(score, 1.0);
  }
}

export const platformQueryGenerator = new PlatformQueryGenerator();
