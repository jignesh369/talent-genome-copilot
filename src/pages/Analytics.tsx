
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Clock, Target, Award } from "lucide-react";

const Analytics = () => {
  const kpiMetrics = [
    {
      title: "Manual Sourcing Hours",
      current: "8.5hrs",
      target: "↓ 70%",
      progress: 65,
      trend: "down",
      status: "on-track"
    },
    {
      title: "Candidate Outreach Reply",
      current: "38%",
      target: "≥ 35%",
      progress: 100,
      trend: "up",
      status: "achieved"
    },
    {
      title: "Interview-to-Offer Ratio",
      current: "22%",
      target: "+ 15%",
      progress: 80,
      trend: "up",
      status: "on-track"
    },
    {
      title: "6-Month Retention",
      current: "92%",
      target: "≥ 90%",
      progress: 100,
      trend: "up",
      status: "achieved"
    }
  ];

  const hiringGenomeInsights = [
    {
      category: "Technical Skills",
      insights: ["React proficiency correlates with 89% retention", "TypeScript experience reduces onboarding time by 35%"],
      tags: 12
    },
    {
      category: "Soft Skills",
      insights: ["Communication scores predict team fit with 78% accuracy", "Problem-solving assessments correlate with performance"],
      tags: 8
    },
    {
      category: "Cultural Fit",
      insights: ["Remote work preference aligns with team dynamics", "Startup experience indicates faster adaptation"],
      tags: 6
    },
    {
      category: "Background Patterns",
      insights: ["CS degree vs bootcamp: no significant performance difference", "Previous company size impacts role expectations"],
      tags: 9
    }
  ];

  const diversityMetrics = [
    { category: "Gender", value: "52% Female, 48% Male", progress: 52 },
    { category: "Ethnicity", value: "65% Diverse", progress: 65 },
    { category: "Age", value: "35% Under 30", progress: 35 },
    { category: "Location", value: "40% Remote", progress: 40 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "achieved": return "bg-green-100 text-green-800";
      case "on-track": return "bg-blue-100 text-blue-800";
      case "at-risk": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Genome</h1>
        <p className="text-gray-600">Insights that compound over time</p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-600" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metric.current}</span>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status.replace('-', ' ')}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Target: {metric.target}</span>
                  <span>{metric.progress}%</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hiring Genome Insights */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Hiring Genome Insights
              </CardTitle>
              <Badge variant="secondary">47 total insights</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {hiringGenomeInsights.map((category) => (
              <div key={category.category} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{category.category}</h4>
                  <Badge variant="outline">{category.tags} tags</Badge>
                </div>
                <div className="space-y-2">
                  {category.insights.map((insight, index) => (
                    <p key={index} className="text-sm text-gray-600">• {insight}</p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Diversity & Cost Metrics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Diversity Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {diversityMetrics.map((metric) => (
                <div key={metric.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{metric.category}</span>
                    <span className="text-gray-600">{metric.value}</span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Cost Per Hire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">$4,250</div>
                <div className="text-sm text-green-600">↓ 23% from last quarter</div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Sourcing</span>
                  <span>$1,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Screening</span>
                  <span>$950</span>
                </div>
                <div className="flex justify-between">
                  <span>Interviews</span>
                  <span>$1,100</span>
                </div>
                <div className="flex justify-between">
                  <span>Administrative</span>
                  <span>$1,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time to Fill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">18 days</div>
                <div className="text-sm text-green-600">↓ 30% from industry avg</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
