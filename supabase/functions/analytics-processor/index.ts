
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalyticsRequest {
  organization_id: string;
  report_type: 'hiring_pipeline' | 'recruiter_performance' | 'source_effectiveness' | 'candidate_insights';
  date_range: {
    start: string;
    end: string;
  };
  filters?: Record<string, any>;
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

    const { organization_id, report_type, date_range, filters = {} }: AnalyticsRequest = await req.json()

    let analyticsData = {}

    if (report_type === 'hiring_pipeline') {
      // Analyze hiring pipeline metrics
      const { data: applications } = await supabaseClient
        .from('applications')
        .select(`
          *,
          jobs!inner (*),
          candidates (*)
        `)
        .eq('jobs.organization_id', organization_id)
        .gte('applied_at', date_range.start)
        .lte('applied_at', date_range.end)

      const pipelineAnalysis = {
        total_applications: applications?.length || 0,
        status_breakdown: applications?.reduce((acc: any, app: any) => {
          acc[app.status] = (acc[app.status] || 0) + 1
          return acc
        }, {}),
        average_time_per_stage: {},
        conversion_rates: {},
        source_performance: applications?.reduce((acc: any, app: any) => {
          acc[app.source] = (acc[app.source] || 0) + 1
          return acc
        }, {})
      }

      analyticsData = pipelineAnalysis
    }

    if (report_type === 'recruiter_performance') {
      // Analyze recruiter metrics
      const { data: jobs } = await supabaseClient
        .from('jobs')
        .select(`
          *,
          applications (*)
        `)
        .eq('organization_id', organization_id)
        .gte('created_at', date_range.start)
        .lte('created_at', date_range.end)

      const recruiterMetrics = jobs?.reduce((acc: any, job: any) => {
        const recruiterId = job.created_by
        if (!acc[recruiterId]) {
          acc[recruiterId] = {
            jobs_created: 0,
            total_applications: 0,
            hires: 0,
            avg_time_to_hire: 0
          }
        }
        acc[recruiterId].jobs_created++
        acc[recruiterId].total_applications += job.applications?.length || 0
        acc[recruiterId].hires += job.applications?.filter((app: any) => app.status === 'hired').length || 0
        return acc
      }, {})

      analyticsData = recruiterMetrics
    }

    // Generate AI insights for the analytics
    const insightsPrompt = `
      Analyze these recruiting analytics and provide actionable insights:
      
      Report Type: ${report_type}
      Data: ${JSON.stringify(analyticsData)}
      Date Range: ${date_range.start} to ${date_range.end}
      
      Provide:
      1. Key performance trends
      2. Areas for improvement
      3. Specific recommendations
      4. Predicted outcomes if current trends continue
      
      Format as JSON with insights, recommendations, and predictions.
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
            content: 'You are a data analytics expert specializing in recruiting metrics. Provide actionable insights and recommendations.'
          },
          {
            role: 'user',
            content: insightsPrompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    })

    const aiInsights = await openaiResponse.json()
    const insights = JSON.parse(aiInsights.choices?.[0]?.message?.content || '{}')

    // Store analytics event
    await supabaseClient
      .from('analytics_events')
      .insert({
        organization_id,
        event_type: 'analytics_report_generated',
        entity_type: 'report',
        properties: {
          report_type,
          date_range,
          metrics_count: Object.keys(analyticsData).length
        }
      })

    return new Response(
      JSON.stringify({
        success: true,
        report_type,
        date_range,
        metrics: analyticsData,
        ai_insights: insights,
        generated_at: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Analytics processing error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
