import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Sparkles, MapPin, Clock, Star, Heart, Zap, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CandidatePortal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      salary: "₹8-15L",
      type: "Full-time",
      posted: "2 hours ago",
      skills: ["React", "TypeScript", "Tailwind"],
      hot: true
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignStudio",
      location: "Bangalore",
      salary: "₹6-12L",
      type: "Full-time",
      posted: "1 day ago",
      skills: ["Figma", "Research", "Prototyping"],
      hot: false
    },
    {
      id: 3,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Mumbai",
      salary: "₹12-20L",
      type: "Full-time",
      posted: "3 days ago",
      skills: ["Strategy", "Analytics", "Leadership"],
      hot: true
    }
  ];

  const handleGetStarted = () => {
    navigate('/candidate-dashboard');
  };

  const handleBrowseJobs = () => {
    navigate('/candidate-jobs');
  };

  const handleExploreJobs = () => {
    navigate('/candidate-jobs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 pt-16 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Your Dream Job Awaits ✨
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Hey there! 👋<br />
              Ready to level up<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                your career?
              </span>
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              We're not just another job board. We're your personal career wingman, using AI to match you with opportunities that actually fit your vibe! 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleBrowseJobs}
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-full"
              >
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">10k+</h3>
              <p className="text-gray-600">Dream jobs waiting</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">95%</h3>
              <p className="text-gray-600">Match accuracy</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">2.5x</h3>
              <p className="text-gray-600">Faster hiring</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Jobs that match your energy ⚡
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These opportunities are trending right now. Your next adventure might be just one click away!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white">
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-t-lg"></div>
                {job.hot && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      🔥 Hot
                    </Badge>
                  </div>
                )}
                <div className="absolute -bottom-6 left-6">
                  <Avatar className="w-12 h-12 border-4 border-white shadow-lg">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                      {job.company.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <CardHeader className="pt-8 pb-3">
                <div className="space-y-2">
                  <CardTitle className="text-lg font-bold text-gray-900">{job.title}</CardTitle>
                  <p className="text-sm text-gray-600 font-medium">{job.company}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {job.salary}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {job.type}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700">Skills needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link to={`/apply/${job.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold">
                      Apply Now 🚀
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            onClick={handleExploreJobs}
            className="px-8 py-4 text-lg rounded-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Search className="w-5 h-5 mr-2" />
            Explore All Jobs
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to start your journey? 🎯
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of candidates who found their perfect match. It takes less than 2 minutes to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/candidate-signup">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-8 py-4 text-lg rounded-full">
                Sign Up - It's Free! ✨
              </Button>
            </Link>
            <Link to="/candidate-login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-full">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePortal;
