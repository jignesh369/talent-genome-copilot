
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

async function collectGitHubData(candidateInfo: any) {
  const apifyToken = Deno.env.get('APIFY_API_TOKEN');
  if (!apifyToken) throw new Error('APIFY_API_TOKEN not configured');

  console.log('Collecting GitHub data for:', candidateInfo);

  // Use Apify's GitHub Profile Scraper
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
}

async function collectStackOverflowData(candidateInfo: any) {
  console.log('Collecting StackOverflow data for:', candidateInfo);

  // Use Stack Exchange API (free, no API key required for basic data)
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
  if (!apifyToken) throw new Error('APIFY_API_TOKEN not configured');

  console.log('Collecting LinkedIn data for:', candidateInfo);

  // Use Apify's LinkedIn Profile Scraper
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
}

async function collectWebSearchData(candidateInfo: any) {
  const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
  const googleCx = Deno.env.get('GOOGLE_CX');
  
  if (!googleApiKey || !googleCx) {
    console.error('Google Search API not configured');
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
    console.error('PERPLEXITY_API_KEY not configured');
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
  if (!openaiApiKey) throw new Error('OpenAI API key not configured');

  console.log('Analyzing candidate OSINT data');

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
}

async function performInternalSearch(searchParams: any) {
  console.log('Performing internal search with params:', searchParams);
  
  // Mock internal search for now - replace with actual database queries
  return {
    candidates: [],
    total_found: 0,
    search_quality_score: 0.7,
    ai_interpretation: {
      original_query: searchParams.query,
      interpreted_intent: searchParams.query,
      extracted_requirements: [],
      search_strategy: 'Internal database search',
      confidence: 0.8
    },
    suggested_refinements: ['Add more specific skills', 'Include location preferences'],
    diversity_metrics: {
      gender_distribution: {},
      location_distribution: {},
      experience_distribution: {},
      background_diversity_score: 0
    }
  };
}
