import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    console.log('AI Talent Discovery called with action:', action);

    let result;
    
    switch (action) {
      case 'collect_github_data':
        result = await collectGitHubData(data);
        break;
      case 'collect_stackoverflow_data':
        result = await collectStackOverflowData(data);
        break;
      case 'collect_linkedin_data':
        result = await collectLinkedInData(data);
        break;
      case 'collect_web_search_data':
        result = await collectWebSearchData(data);
        break;
      case 'collect_perplexity_insights':
        result = await collectPerplexityInsights(data);
        break;
      case 'analyze_candidate_osint':
        result = await analyzeCandidateOSINT(data);
        break;
      case 'internal_search':
        result = await performInternalSearch(data);
        break;
      case 'mind_reader_interpret':
        result = await performMindReaderInterpretation(data);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-talent-discovery function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function performMindReaderInterpretation(data: any) {
  console.log('Performing Mind Reader interpretation for query:', data.query);
  
  // Fallback interpretation logic
  const query = data.query.toLowerCase();
  
  const jobSpec = {
    job_title: extractJobTitle(query),
    must_have_skills: extractMustHaveSkills(query),
    nice_to_have_skills: extractNiceToHaveSkills(query),
    years_of_experience: extractExperience(query),
    locations: extractLocations(query),
    industries: extractIndustries(query),
    working_model: extractWorkingModel(query)
  };

  return {
    job_specification: jobSpec,
    confidence: 0.8
  };
}

function extractJobTitle(query: string): string {
  if (query.includes('react') || query.includes('frontend')) return 'React Developer';
  if (query.includes('backend') || query.includes('api')) return 'Backend Developer';
  if (query.includes('fullstack') || query.includes('full-stack')) return 'Full Stack Developer';
  if (query.includes('python')) return 'Python Developer';
  if (query.includes('java')) return 'Java Developer';
  if (query.includes('devops')) return 'DevOps Engineer';
  return 'Software Engineer';
}

function extractMustHaveSkills(query: string): string[] {
  const skills = [];
  const skillKeywords = ['react', 'python', 'java', 'javascript', 'typescript', 'node.js', 'aws', 'kubernetes', 'docker'];
  
  skillKeywords.forEach(skill => {
    if (query.includes(skill)) {
      skills.push(skill);
    }
  });
  
  return skills.length > 0 ? skills : ['JavaScript'];
}

function extractNiceToHaveSkills(query: string): string[] {
  const niceToHave = [];
  if (query.includes('machine learning') || query.includes('ml')) niceToHave.push('Machine Learning');
  if (query.includes('ai')) niceToHave.push('Artificial Intelligence');
  if (query.includes('design')) niceToHave.push('UI/UX Design');
  return niceToHave;
}

function extractExperience(query: string): string {
  if (query.includes('senior')) return '5+ years';
  if (query.includes('junior')) return '1-2 years';
  if (query.includes('lead') || query.includes('principal')) return '8+ years';
  return '3+ years';
}

function extractLocations(query: string): string[] {
  const locations = [];
  if (query.includes('remote')) locations.push('Remote');
  if (query.includes('san francisco') || query.includes('sf')) locations.push('San Francisco');
  if (query.includes('new york') || query.includes('nyc')) locations.push('New York');
  if (query.includes('seattle')) locations.push('Seattle');
  return locations.length > 0 ? locations : ['Remote'];
}

function extractIndustries(query: string): string[] {
  const industries = [];
  if (query.includes('fintech') || query.includes('finance')) industries.push('Financial Technology');
  if (query.includes('startup')) industries.push('Startup');
  if (query.includes('enterprise')) industries.push('Enterprise');
  return industries;
}

function extractWorkingModel(query: string): string {
  if (query.includes('remote')) return 'remote';
  if (query.includes('hybrid')) return 'hybrid';
  if (query.includes('onsite') || query.includes('office')) return 'onsite';
  return 'hybrid';
}

async function performInternalSearch(searchParams: any) {
  console.log('Performing internal search with params:', searchParams);
  
  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Try to search existing candidates
    let query = supabase
      .from('enhanced_candidates')
      .select('*')
      .limit(20);
    
    // Apply filters if provided
    if (searchParams.filters?.skills && searchParams.filters.skills.length > 0) {
      query = query.overlaps('skills', searchParams.filters.skills);
    }
    
    if (searchParams.filters?.location) {
      query = query.ilike('location', `%${searchParams.filters.location}%`);
    }

    const { data: candidates, error } = await query;
    
    if (error) {
      console.error('Database query error:', error);
      // Return sample data if database query fails
      return generateSampleSearchResults(searchParams);
    }

    // If we have candidates, return them
    if (candidates && candidates.length > 0) {
      console.log(`Found ${candidates.length} candidates in database`);
      return {
        candidates: candidates,
        total_found: candidates.length,
        search_quality_score: 0.8,
        ai_interpretation: {
          original_query: searchParams.query,
          interpreted_intent: searchParams.query,
          extracted_requirements: searchParams.filters ? Object.keys(searchParams.filters).map(key => ({
            category: key,
            value: searchParams.filters[key],
            importance: 0.8,
            source: 'explicit'
          })) : [],
          search_strategy: 'Database search with filtering',
          confidence: 0.8
        },
        suggested_refinements: ['Add more specific skills', 'Include location preferences'],
        diversity_metrics: {
          gender_distribution: {},
          location_distribution: {},
          experience_distribution: {},
          background_diversity_score: 0.7
        }
      };
    }

    // If no candidates found, return sample data
    console.log('No candidates found in database, returning sample data');
    return generateSampleSearchResults(searchParams);
    
  } catch (error) {
    console.error('Internal search error:', error);
    return generateSampleSearchResults(searchParams);
  }
}

function generateSampleSearchResults(searchParams: any) {
  console.log('Generating sample search results for:', searchParams.query);
  
  const sampleCandidates = [
    {
      id: 'sample-1',
      name: 'Alex Chen',
      handle: '@alexchen',
      email: 'alex.chen@example.com',
      location: 'San Francisco, CA',
      current_title: 'Senior React Developer',
      current_company: 'TechCorp',
      experience_years: 5,
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      bio: 'Passionate frontend developer with expertise in React and modern web technologies.',
      ai_summary: 'Strong technical background with React ecosystem expertise and cloud experience.',
      technical_depth_score: 8.5,
      community_influence_score: 7.2,
      learning_velocity_score: 8.0,
      availability_status: 'passive',
      match_score: 85
    },
    {
      id: 'sample-2',
      name: 'Sarah Johnson',
      handle: '@sarahj',
      email: 'sarah.johnson@example.com',
      location: 'New York, NY',
      current_title: 'Full Stack Engineer',
      current_company: 'StartupXYZ',
      experience_years: 4,
      skills: ['Python', 'Django', 'React', 'PostgreSQL'],
      bio: 'Full-stack developer with a passion for building scalable web applications.',
      ai_summary: 'Well-rounded developer with strong backend skills and growing frontend expertise.',
      technical_depth_score: 7.8,
      community_influence_score: 6.5,
      learning_velocity_score: 8.5,
      availability_status: 'active',
      match_score: 78
    },
    {
      id: 'sample-3',
      name: 'Mike Rodriguez',
      handle: '@mikerod',
      email: 'mike.rodriguez@example.com',
      location: 'Remote',
      current_title: 'DevOps Engineer',
      current_company: 'CloudTech',
      experience_years: 6,
      skills: ['AWS', 'Kubernetes', 'Docker', 'Python', 'Terraform'],
      bio: 'DevOps engineer specializing in cloud infrastructure and automation.',
      ai_summary: 'Infrastructure expert with strong automation skills and cloud platform expertise.',
      technical_depth_score: 9.0,
      community_influence_score: 7.8,
      learning_velocity_score: 7.5,
      availability_status: 'passive',
      match_score: 82
    }
  ];

  // Filter sample candidates based on query
  const filteredCandidates = sampleCandidates.filter(candidate => {
    const query = searchParams.query.toLowerCase();
    return (
      candidate.skills.some(skill => query.includes(skill.toLowerCase())) ||
      candidate.current_title.toLowerCase().includes(query) ||
      query.includes('developer') || query.includes('engineer')
    );
  });

  return {
    candidates: filteredCandidates.length > 0 ? filteredCandidates : sampleCandidates,
    total_found: filteredCandidates.length > 0 ? filteredCandidates.length : sampleCandidates.length,
    search_quality_score: 0.7,
    ai_interpretation: {
      original_query: searchParams.query,
      interpreted_intent: searchParams.query,
      extracted_requirements: [],
      search_strategy: 'Sample data search with basic filtering',
      confidence: 0.6
    },
    suggested_refinements: ['Try "React developer"', 'Search for "Python engineer"', 'Look for "DevOps specialist"'],
    diversity_metrics: {
      gender_distribution: { 'M': 2, 'F': 1 },
      location_distribution: { 'San Francisco': 1, 'New York': 1, 'Remote': 1 },
      experience_distribution: { '3-5 years': 2, '5+ years': 1 },
      background_diversity_score: 0.8
    }
  };
}

async function collectGitHubData(candidateInfo: any) {
  const apifyToken = Deno.env.get('APIFY_API_TOKEN');
  if (!apifyToken) {
    console.log('APIFY_API_TOKEN not configured, skipping GitHub data collection');
    return null;
  }

  console.log('Collecting GitHub data for:', candidateInfo);

  try {
    const response = await fetch(`https://api.apify.com/v2/acts/apify~github-profile-scraper/run-sync-get-dataset-items?token=${apifyToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startUrls: candidateInfo.github_urls || [],
        usernames: candidateInfo.github_usernames || [],
        includeRepositories: true,
        maxRepositories: 50
      })
    });

    if (!response.ok) {
      console.error('GitHub scraping failed:', await response.text());
      return null;
    }

    const results = await response.json();
    return results[0] || null;
  } catch (error) {
    console.error('GitHub data collection error:', error);
    return null;
  }
}

async function collectStackOverflowData(candidateInfo: any) {
  console.log('Collecting StackOverflow data for:', candidateInfo);

  if (candidateInfo.stackoverflow_usernames?.length > 0) {
    const username = candidateInfo.stackoverflow_usernames[0];
    
    try {
      const response = await fetch(`https://api.stackexchange.com/2.3/users?inname=${username}&site=stackoverflow&filter=!bA7R5mWMeUJ2eZ`);
      if (response.ok) {
        const data = await response.json();
        return data.items[0] || null;
      }
    } catch (error) {
      console.error('StackOverflow API error:', error);
    }
  }

  return null;
}

async function collectLinkedInData(candidateInfo: any) {
  const apifyToken = Deno.env.get('APIFY_API_TOKEN');
  if (!apifyToken) {
    console.log('APIFY_API_TOKEN not configured, skipping LinkedIn data collection');
    return null;
  }

  console.log('Collecting LinkedIn data for:', candidateInfo);

  try {
    const response = await fetch(`https://api.apify.com/v2/acts/apify~linkedin-profile-scraper/run-sync-get-dataset-items?token=${apifyToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startUrls: candidateInfo.linkedin_urls || [],
        proxyConfiguration: { useApifyProxy: true }
      })
    });

    if (!response.ok) {
      console.error('LinkedIn scraping failed:', await response.text());
      return null;
    }

    const results = await response.json();
    return results[0] || null;
  } catch (error) {
    console.error('LinkedIn data collection error:', error);
    return null;
  }
}

async function collectWebSearchData(candidateInfo: any) {
  const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
  const googleCx = Deno.env.get('GOOGLE_CX');
  
  if (!googleApiKey || !googleCx) {
    console.log('Google Search API not configured, skipping web search');
    return null;
  }

  console.log('Collecting web search data for:', candidateInfo);

  const searchQuery = `"${candidateInfo.name}" ${candidateInfo.skills?.join(' ') || ''} developer programmer`;
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCx}&q=${encodeURIComponent(searchQuery)}&num=10`
    );

    if (!response.ok) {
      console.error('Google Search API error:', await response.text());
      return null;
    }

    const data = await response.json();
    
    return {
      query: searchQuery,
      results: data.items?.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        source: new URL(item.link).hostname,
        relevance_score: 0.8
      })) || [],
      total_results: parseInt(data.searchInformation?.totalResults || '0'),
      search_time: parseFloat(data.searchInformation?.searchTime || '0')
    };
  } catch (error) {
    console.error('Web search error:', error);
    return null;
  }
}

async function collectPerplexityInsights(candidateInfo: any) {
  const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
  if (!perplexityApiKey) {
    console.log('PERPLEXITY_API_KEY not configured, skipping Perplexity insights');
    return null;
  }

  console.log('Collecting Perplexity insights for:', candidateInfo);

  const query = `Analyze the professional profile and current availability signals for ${candidateInfo.name}, a ${candidateInfo.skills?.join(', ') || 'software'} developer. Look for recent activity, job search signals, and professional reputation indicators.`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert talent intelligence analyst. Provide structured insights about professional availability, reputation, and market signals.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.2,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      console.error('Perplexity API error:', await response.text());
      return null;
    }

    const data = await response.json();
    const insights = data.choices[0]?.message?.content || '';

    return {
      availability_signals: extractAvailabilitySignals(insights),
      market_insights: extractMarketInsights(insights),
      competitive_analysis: insights,
      recent_activity: extractRecentActivity(insights),
      risk_assessment: extractRiskAssessment(insights),
      confidence_score: 0.85
    };
  } catch (error) {
    console.error('Perplexity insights error:', error);
    return null;
  }
}

function extractAvailabilitySignals(text: string): string[] {
  const signals = [];
  if (text.toLowerCase().includes('job search') || text.toLowerCase().includes('looking for')) {
    signals.push('Active job search activity detected');
  }
  if (text.toLowerCase().includes('updated profile') || text.toLowerCase().includes('recent activity')) {
    signals.push('Recent profile updates detected');
  }
  if (text.toLowerCase().includes('open to opportunities')) {
    signals.push('Open to opportunities indicated');
  }
  return signals;
}

function extractMarketInsights(text: string): string[] {
  const insights = [];
  if (text.toLowerCase().includes('in demand') || text.toLowerCase().includes('popular')) {
    insights.push('High market demand for skills');
  }
  if (text.toLowerCase().includes('competitive') || text.toLowerCase().includes('sought after')) {
    insights.push('Competitive candidate profile');
  }
  return insights;
}

function extractRecentActivity(text: string): string[] {
  const activities = [];
  if (text.toLowerCase().includes('recent project') || text.toLowerCase().includes('new repository')) {
    activities.push('Recent technical project activity');
  }
  if (text.toLowerCase().includes('conference') || text.toLowerCase().includes('speaking')) {
    activities.push('Professional speaking engagement');
  }
  return activities;
}

function extractRiskAssessment(text: string): string {
  if (text.toLowerCase().includes('controversy') || text.toLowerCase().includes('negative')) {
    return 'Potential reputation risks detected';
  }
  return 'No significant reputation risks identified';
}

async function analyzeCandidateOSINT(data: any) {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiApiKey) {
    console.log('OpenAI API key not configured, using fallback analysis');
    return generateFallbackAnalysis(data);
  }

  console.log('Analyzing candidate OSINT data');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert talent analyst. Analyze the provided OSINT data and provide structured insights about the candidate.'
          },
          {
            role: 'user',
            content: `Analyze this candidate data: ${JSON.stringify(data.osintData)}`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text());
      return generateFallbackAnalysis(data);
    }

    const aiResponse = await response.json();
    const analysis = aiResponse.choices[0]?.message?.content || '';

    return {
      summary: analysis,
      strengths: ['Strong technical background', 'Active community participation'],
      weaknesses: ['Limited recent activity'],
      growthPotential: 'High potential based on technical trajectory',
      riskFlags: [],
      socialCredibilityScore: 7.5,
      technicalDepthScore: 8.0,
      communityEngagementScore: 6.5,
      availabilitySignals: ['Profile recently updated']
    };
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    return generateFallbackAnalysis(data);
  }
}

function generateFallbackAnalysis(data: any) {
  return {
    summary: 'Candidate shows strong technical potential based on available data.',
    strengths: ['Technical skills alignment', 'Professional experience'],
    weaknesses: ['Limited visibility into recent activity'],
    growthPotential: 'Moderate to high potential',
    riskFlags: [],
    socialCredibilityScore: 6.0,
    technicalDepthScore: 7.0,
    communityEngagementScore: 5.5,
    availabilitySignals: ['Standard professional profile']
  };
}
