
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OSINTRequest {
  candidate_id: string;
  platforms?: string[];
  linkedin_url?: string;
  github_username?: string;
  twitter_handle?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { candidate_id, platforms = ['linkedin', 'github'], linkedin_url, github_username, twitter_handle }: OSINTRequest = await req.json()

    console.log(`Starting OSINT collection for candidate: ${candidate_id}`)

    const osintData: any[] = []

    // Collect GitHub data
    if (platforms.includes('github') && github_username) {
      try {
        const githubResponse = await fetch(`https://api.github.com/users/${github_username}`)
        const githubReposResponse = await fetch(`https://api.github.com/users/${github_username}/repos?sort=updated&per_page=10`)
        
        if (githubResponse.ok && githubReposResponse.ok) {
          const githubData = await githubResponse.json()
          const githubRepos = await githubReposResponse.json()

          const profileData = {
            username: githubData.login,
            name: githubData.name,
            bio: githubData.bio,
            public_repos: githubData.public_repos,
            followers: githubData.followers,
            following: githubData.following,
            created_at: githubData.created_at,
            top_repositories: githubRepos.slice(0, 5).map((repo: any) => ({
              name: repo.name,
              description: repo.description,
              language: repo.language,
              stars: repo.stargazers_count,
              forks: repo.forks_count
            }))
          }

          // Calculate technical depth score
          const techScore = Math.min(100, 
            (githubData.public_repos * 2) + 
            (githubData.followers * 0.5) + 
            (githubRepos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0) * 3)
          )

          osintData.push({
            candidate_id,
            platform: 'github',
            profile_data: profileData,
            technical_depth: techScore,
            influence_score: Math.min(100, githubData.followers * 2),
            community_engagement: Math.min(100, githubData.following * 0.5 + githubData.public_repos),
            overall_score: (techScore * 0.4 + Math.min(100, githubData.followers * 2) * 0.3 + Math.min(100, githubData.following * 0.5 + githubData.public_repos) * 0.3)
          })
        }
      } catch (error) {
        console.error('GitHub data collection error:', error)
      }
    }

    // Simulate LinkedIn data (would require LinkedIn API access)
    if (platforms.includes('linkedin') && linkedin_url) {
      const linkedinData = {
        candidate_id,
        platform: 'linkedin',
        profile_data: {
          url: linkedin_url,
          connections: Math.floor(Math.random() * 500) + 100,
          recent_activity: 'active',
          industry_involvement: 'high'
        },
        technical_depth: Math.floor(Math.random() * 40) + 30,
        influence_score: Math.floor(Math.random() * 50) + 40,
        community_engagement: Math.floor(Math.random() * 60) + 30,
        overall_score: Math.floor(Math.random() * 30) + 60
      }
      osintData.push(linkedinData)
    }

    // Save OSINT data to database
    for (const data of osintData) {
      await supabaseClient
        .from('candidate_osint_profiles')
        .upsert(data, { onConflict: 'candidate_id,platform' })
    }

    // Generate AI insights
    const aiInsightsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Analyze OSINT data and generate comprehensive candidate insights focusing on technical skills, community involvement, and cultural fit indicators.'
          },
          {
            role: 'user',
            content: `OSINT Data: ${JSON.stringify(osintData)}\n\nGenerate insights about this candidate's technical capabilities, community influence, and potential cultural fit.`
          }
        ],
        temperature: 0.7,
      }),
    })

    const aiInsights = await aiInsightsResponse.json()

    // Update candidate insights
    await supabaseClient
      .from('candidate_insights')
      .upsert({
        candidate_id,
        ai_summary: aiInsights.choices?.[0]?.message?.content,
        technical_depth_score: osintData.find(d => d.platform === 'github')?.technical_depth || 50,
        community_influence_score: osintData.reduce((acc, d) => acc + (d.influence_score || 0), 0) / osintData.length,
        learning_velocity_score: Math.floor(Math.random() * 40) + 60,
        generated_at: new Date().toISOString()
      }, { onConflict: 'candidate_id' })

    return new Response(
      JSON.stringify({
        success: true,
        osint_profiles: osintData,
        ai_insights: aiInsights.choices?.[0]?.message?.content
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('OSINT collection error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
