
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calendar, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CandidateLayout from "@/components/candidate/CandidateLayout";

const CandidateOffers = () => {
  const [offers, setOffers] = useState([
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
  ]);

  const handleAcceptOffer = (offerId: number) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, status: "accepted" }
        : offer
    ));
    
    toast({
      title: "Offer Accepted! 🎉",
      description: "Congratulations! You've accepted the job offer. The company will be notified.",
    });
  };

  const handleDeclineOffer = (offerId: number) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, status: "declined" }
        : offer
    ));
    
    toast({
      title: "Offer Declined",
      description: "You've declined the job offer. The company will be notified.",
    });
  };

  const handleNegotiateOffer = (offerId: number) => {
    toast({
      title: "Negotiation Started",
      description: "Opening negotiation interface...",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-800";
      case "declined": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            {offers.length} Active Offer{offers.length !== 1 ? 's' : ''}
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
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {offer.location}
                    </div>
                  </div>
                  <Badge className={getStatusColor(offer.status)}>
                    {offer.status}
                  </Badge>
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

                {offer.status === "pending" && (
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeclineOffer(offer.id)}
                    >
                      Decline
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleNegotiateOffer(offer.id)}
                    >
                      Negotiate
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleAcceptOffer(offer.id)}
                    >
                      Accept
                    </Button>
                  </div>
                )}

                {offer.status === "accepted" && (
                  <div className="pt-4 border-t">
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-green-800 font-medium">🎉 Congratulations! You've accepted this offer.</p>
                      <p className="text-green-700 text-sm mt-1">Next steps will be communicated by the company.</p>
                    </div>
                  </div>
                )}

                {offer.status === "declined" && (
                  <div className="pt-4 border-t">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 font-medium">This offer has been declined.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {offers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Job Offers Yet</h3>
              <p className="text-gray-600 mb-4">Keep applying and interviewing - your dream offer is coming!</p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                Browse Jobs
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </CandidateLayout>
  );
};

export default CandidateOffers;
