
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calendar, MapPin } from "lucide-react";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateOffers = () => {
  const offers = [
    {
      id: 1,
      company: "TechCorp",
      role: "Frontend Developer",
      salary: "$150,000",
      equity: "0.1%",
      bonus: "$20,000",
      startDate: "Jan 15, 2024",
      location: "Remote",
      status: "pending"
    }
  ];

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            {offers.length} Active Offer
          </Badge>
        </div>

        <div className="space-y-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="bg-white hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">{offer.role}</CardTitle>
                    <p className="text-lg text-purple-600 font-medium">{offer.company}</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">{offer.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center text-green-600 mb-1">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Salary</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{offer.salary}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center text-purple-600 mb-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Equity</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{offer.equity}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center text-blue-600 mb-1">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Bonus</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{offer.bonus}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center text-orange-600 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Start Date</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{offer.startDate}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm">Decline</Button>
                  <Button variant="outline" size="sm">Negotiate</Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Accept
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateOffers;
