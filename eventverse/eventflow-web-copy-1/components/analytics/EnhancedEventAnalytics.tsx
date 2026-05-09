
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, Zap } from "lucide-react";
import EventAnalytics from "./EventAnalytics";
import GuestAnalytics from "./GuestAnalytics";
import PredictiveAnalyticsDashboard from "../ai/PredictiveAnalyticsDashboard";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface Props {
  eventId: string;
  eventData?: EventFormData;
}

const EnhancedEventAnalytics = ({ eventId, eventData }: Props) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock event data if not provided
  const mockEventData: EventFormData = eventData || {
    isPublic: true,
    eventName: "Sample Event",
    eventType: "Corporate",
    description: "Sample event description",
    theme: { primaryColor: "#8B5CF6", secondaryColor: "#3B82F6" },
    eventDates: {
      isMultiDay: false,
      startDate: new Date(),
      endDate: null,
      timezone: "UTC",
      sessions: []
    },
    startDate: new Date(),
    endDate: null,
    time: "18:00",
    timezone: "UTC",
    isRecurring: false,
    locations: [{ 
      id: "1",
      name: "Convention Center", 
      address: "123 Main St",
      type: "physical"
    }],
    recurrence: {
      isRecurring: false,
      pattern: "weekly",
      frequency: 1,
      endType: "never"
    },
    selectedModules: ["rsvp", "media", "analytics"],
    moduleConfigurations: {},
    expectedAttendees: 200,
    guestGroups: [],
    vipGuests: [],
    ticketTypes: [{ name: "General", price: 50, quantity: 200 }],
    mealOptions: [],
    additionalFeatures: [],
    dressCode: "",
    giftRegistryUrl: "",
    transportationDetails: "",
    accommodationDetails: "",
    specialRequirements: "",
    invitationSettings: {
      method: ["email"],
      template: "default",
      customMessage: "",
      sendTime: "now"
    },
    eventPhotos: {
      mainPhoto: null,
      additionalPhotos: [],
      maxPhotos: 10
    },
    status: "published",
    softLaunch: false,
    analytics: true,
    additionalDetails: {
      ageRestrictions: { hasRestrictions: false },
      checkIn: { hasCustomCheckIn: false },
      parking: { hasParkingInfo: false },
      faqs: [],
      specialGuests: []
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Enhanced Event Analytics
            <Badge variant="outline" className="ml-auto bg-purple-100 text-purple-700">
              AI Enhanced
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            Comprehensive analytics with AI-powered insights and predictive intelligence.
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Event Overview
          </TabsTrigger>
          <TabsTrigger value="guests" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Guest Analytics
          </TabsTrigger>
          <TabsTrigger value="predictive" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Predictive Insights
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Real-time AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <EventAnalytics eventId={eventId} />
        </TabsContent>

        <TabsContent value="guests" className="space-y-6">
          <GuestAnalytics eventId={eventId} />
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <PredictiveAnalyticsDashboard eventData={mockEventData} />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" />
                Real-time AI Monitoring
                <Badge className="bg-orange-100 text-orange-700">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="font-semibold text-green-800">Engagement Score</div>
                        <div className="text-2xl font-bold text-green-600">94%</div>
                        <div className="text-sm text-green-600">↑ 12% from baseline</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="font-semibold text-blue-800">AI Sentiment</div>
                        <div className="text-2xl font-bold text-blue-600">Positive</div>
                        <div className="text-sm text-blue-600">High satisfaction detected</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="font-semibold text-purple-800">Optimization Status</div>
                        <div className="text-2xl font-bold text-purple-600">Active</div>
                        <div className="text-sm text-purple-600">3 improvements applied</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">AI Recommendation</h4>
                    <p className="text-yellow-700 text-sm">
                      Guest engagement is peaking around the networking area. Consider extending the networking 
                      session by 15 minutes and adding a surprise element to maintain momentum.
                    </p>
                    <button className="mt-2 text-xs bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-300">
                      Apply Suggestion
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedEventAnalytics;
