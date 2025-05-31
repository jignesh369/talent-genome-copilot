
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PredictionRequest {
  candidate_id: string;
  job_id: string;
  analysis_type: 'job_success' | 'cultural_fit' | 'retention_risk' | 'performance_forecast';
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

    const { candidate_id, job_id, analysis_type }: PredictionRequest = await req.json()

    // Fetch comprehensive candidate and job data
    const { data: candidate, error: candidateError } = await supabaseClient
      .from('candidates')
      .select(`
        *,
        candidate_insights (*),
        candidate_osint_profiles (*),
        applications (*)
      `)
      .eq('id', candidate_id)
      .single()

    if (candidateError) {
      throw candidateError
    }

    const { data: job, error: jobError } = await supabaseClient
      .from('jobs')
      .select('*')
      .eq('id', job_id)
      .single()

    if (jobError) {
      throw jobError
    }

    // Get historical data for ML model training
    const { data: historicalApplications } = await supabaseClient
      .from('applications')
      .select(`
        *,
        candidates (*),
        jobs (*)
      `)
      .eq('status', 'hired')
      .limit(100)

    // Prepare data for AI analysis
    const analysisData = {
      candidate: {
        experience_years: candidate.experience_years,
        skills: candidate.skills,
        current_title: candidate.current_title,
        technical_depth_score: candidate.candidate_insights?.[0]?.technical_depth_score || 50,
        community_influence_score: candidate.candidate_insights?.[0]?.community_influence_score || 50,
        learning_velocity_score: candidate.candidate_insights?.[0]?.learning_velocity_score || 50,
        osint_scores: candidate.candidate_osint_profiles?.reduce((acc: any, profile: any) => {
          acc[profile.platform] = profile.overall_score
          return acc
        }, {})
      },
      job: {
        title: job.title,
        department: job.department,
        skills: job.skills,
        requirements: job.requirements,
        experience_required: job.experience_required,
        remote_allowed: job.remote_allowed
      },
      historical_context: historicalApplications?.length || 0
    }

    // Generate AI-powered predictions
    const predictionPrompt = `
      Analyze this candidate-job match for ${analysis_type} prediction.
      
      Candidate Data: ${JSON.stringify(analysisData.candidate)}
      Job Requirements: ${JSON.stringify(analysisData.job)}
      Historical Context: ${analysisData.historical_context} similar hires
      
      Provide detailed analysis with:
      1. Success probability (0-100%)
      2. Key strength factors
      3. Potential risk factors
      4. Recommendation confidence level
      5. Specific insights for ${analysis_type}
      
      Format as JSON: {
        "success_probability": number,
        "cultural_fit_score": number,
        "performance_prediction": {
          "ramp_up_time_weeks": number,
          "productivity_score": number,
          "retention_probability": number
        },
        "risk_factors": string[],
        "strength_factors": string[],
        "confidence_level": number,
        "detailed_analysis": string,
        "recommendations": string[]
      }
    `

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI-powered hiring analytics expert. Provide accurate, data-driven predictions about candidate success and job performance.'
          },
          {
            role: 'user',
            content: predictionPrompt
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      }),
    })

    const aiResponse = await openaiResponse.json()
    const predictions = JSON.parse(aiResponse.choices?.[0]?.message?.content || '{}')

    // Store predictions in database
    await supabaseClient
      .from('candidate_predictions')
      .upsert({
        candidate_id,
        job_id,
        success_probability: predictions.success_probability,
        cultural_fit_score: predictions.cultural_fit_score,
        performance_prediction: predictions.performance_prediction,
        risk_factors: predictions.risk_factors,
        generated_at: new Date().toISOString(),
        model_version: 'gpt-4-v1.0'
      }, { onConflict: 'candidate_id,job_id' })

    // Generate risk alerts if needed
    if (predictions.success_probability < 30 || predictions.cultural_fit_score < 40) {
      await supabaseClient
        .from('risk_alerts')
        .insert({
          alert_type: 'low_success_probability',
          severity: predictions.success_probability < 20 ? 'high' : 'medium',
          entity_type: 'candidate_job_match',
          entity_id: candidate_id,
          description: `Low ${analysis_type} prediction for candidate ${candidate.first_name} ${candidate.last_name} and job ${job.title}`,
          resolved: false
        })
    }

    return new Response(
      JSON.stringify({
        success: true,
        predictions,
        analysis_type,
        confidence_indicators: {
          data_completeness: Object.values(analysisData.candidate).filter(v => v !== null && v !== undefined).length / Object.keys(analysisData.candidate).length,
          historical_context_strength: Math.min(100, (analysisData.historical_context / 50) * 100),
          osint_coverage: Object.keys(predictions.risk_factors || {}).length
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Predictive analytics error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
