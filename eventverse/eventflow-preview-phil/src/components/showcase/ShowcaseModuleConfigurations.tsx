
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Settings, 
  Users, 
  Calendar, 
  Ticket, 
  Camera, 
  Gamepad2, 
  MessageSquare,
  MapPin,
  Shield,
  Star,
  Zap
} from "lucide-react";

interface ShowcaseModuleConfigurationsProps {
  eventType: string;
  guestPersona: string;
}

const ShowcaseModuleConfigurations = ({ eventType, guestPersona }: ShowcaseModuleConfigurationsProps) => {
  const [selectedModule, setSelectedModule] = useState("rsvp");

  const modules = [
    {
      id: "rsvp",
      name: "RSVP System",
      icon: CheckCircle,
      description: "Guest response management",
      configurations: ["Basic RSVP", "With Meal Choices", "Plus Ones", "Dietary Restrictions", "Song Requests"]
    },
    {
      id: "ticketing",
      name: "Ticketing",
      icon: Ticket,
      description: "Ticket sales and management",
      configurations: ["Single Tier", "Multi-Tier VIP", "Early Bird", "Group Discounts", "Corporate Rates"]
    },
    {
      id: "schedule",
      name: "Event Schedule",
      icon: Calendar,
      description: "Timeline and agenda",
      configurations: ["Simple Timeline", "Multi-Day", "Session Selection", "Personal Agenda", "Live Updates"]
    },
    {
      id: "seating",
      name: "Seating Charts",
      icon: Users,
      description: "Table and seat assignments",
      configurations: ["Open Seating", "Assigned Tables", "Numbered Seats", "VIP Sections", "Accessibility"]
    },
    {
      id: "media",
      name: "Media Sharing",
      icon: Camera,
      description: "Photo and video galleries",
      configurations: ["Guest Uploads", "Professional Gallery", "QR Access", "Live Feed", "Download Rights"]
    },
    {
      id: "games",
      name: "Interactive Games",
      icon: Gamepad2,
      description: "Entertainment and engagement",
      configurations: ["Trivia", "Scavenger Hunt", "Photo Contest", "Voting", "Leaderboards"]
    },
    {
      id: "survey",
      name: "Feedback & Surveys",
      icon: MessageSquare,
      description: "Guest feedback collection",
      configurations: ["Post-Event Survey", "Real-time Polls", "Wishes Collection", "Rating System", "Comments"]
    }
  ];

  const getEventSpecificConfigs = (moduleId: string) => {
    const eventConfigs = {
      wedding: {
        rsvp: ["Ceremony + Reception", "Meal Preferences", "Song Requests", "Guest Wishes", "Dietary Notes"],
        ticketing: ["Not typically used for weddings"],
        schedule: ["Ceremony Timeline", "Reception Flow", "Photo Sessions", "Special Moments"],
        seating: ["Reception Tables", "Family Grouping", "Friend Clusters", "VIP Table"],
        media: ["Guest Photo Sharing", "Professional Gallery", "Couple's Moments", "QR Code Access"],
        games: ["Couple Trivia", "Wedding Bingo", "Memory Sharing", "Advice Collection"],
        survey: ["Wedding Wishes", "Favorite Memories", "Thank You Notes", "Future Advice"]
      },
      conference: {
        rsvp: ["Session Selection", "Networking Preferences", "Workshop Choices", "Meal Plans"],
        ticketing: ["General Admission", "VIP Pass", "Speaker Package", "Workshop Add-ons", "Group Rates"],
        schedule: ["Keynote Sessions", "Breakout Rooms", "Networking Breaks", "Workshop Times"],
        seating: ["Auditorium Style", "Round Tables", "Workshop Pods", "VIP Section"],
        media: ["Presentation Downloads", "Session Recordings", "Photo Gallery", "Speaker Resources"],
        games: ["Industry Quiz", "Networking Bingo", "Scavenger Hunt", "Innovation Challenge"],
        survey: ["Session Feedback", "Speaker Ratings", "Networking Survey", "Future Topics"]
      },
      festival: {
        rsvp: ["Day Passes", "Artist Preferences", "Food Choices", "Camping Options"],
        ticketing: ["Single Day", "Multi-Day Pass", "VIP Experience", "Group Packages", "Student Discounts"],
        schedule: ["Stage Lineups", "Artist Times", "Food Vendors", "Activity Zones"],
        seating: ["Standing Areas", "VIP Viewing", "Accessible Seating", "Premium Platforms"],
        media: ["Live Streams", "Artist Photos", "Fan Galleries", "Behind Scenes"],
        games: ["Artist Trivia", "Photo Contest", "Dance Competition", "Social Challenges"],
        survey: ["Artist Ratings", "Experience Feedback", "Future Lineups", "Venue Rating"]
      }
    };

    return eventConfigs[eventType]?.[moduleId] || modules.find(m => m.id === moduleId)?.configurations || [];
  };

  const getPersonaFeatures = (moduleId: string) => {
    const personaFeatures = {
      vip: {
        rsvp: ["Priority Processing", "Concierge Support", "Special Requests"],
        ticketing: ["VIP Lounge Access", "Premium Seating", "Skip Lines"],
        schedule: ["Exclusive Events", "Early Access", "Private Sessions"],
        seating: ["VIP Section", "Premium Location", "Reserved Tables"],
        media: ["Professional Photos", "Exclusive Content", "Download Rights"],
        games: ["VIP Leaderboard", "Exclusive Challenges", "Special Prizes"],
        survey: ["Priority Feedback", "Direct Communication", "Special Recognition"]
      },
      family: {
        rsvp: ["Multiple Attendees", "Age-Based Options", "Child Meals"],
        ticketing: ["Family Packages", "Child Discounts", "Group Rates"],
        schedule: ["Kid-Friendly Times", "Family Activities", "Quiet Spaces"],
        seating: ["Family Tables", "Child Seating", "Accessibility"],
        media: ["Family Photos", "Kid-Safe Content", "Private Albums"],
        games: ["Age-Appropriate", "Family Challenges", "Group Activities"],
        survey: ["Family Feedback", "Child Experience", "Safety Ratings"]
      },
      corporate: {
        rsvp: ["Department Selection", "Role Information", "Networking Goals"],
        ticketing: ["Corporate Rates", "Bulk Pricing", "Invoice Options"],
        schedule: ["Business Sessions", "Networking Time", "Industry Focus"],
        seating: ["Department Tables", "Networking Setup", "Business Cards"],
        media: ["Professional Photos", "Presentation Materials", "Company Gallery"],
        games: ["Industry Trivia", "Team Challenges", "Professional Network"],
        survey: ["Business Feedback", "ROI Assessment", "Future Events"]
      }
    };

    return personaFeatures[guestPersona]?.[moduleId] || [];
  };

  const selectedModuleData = modules.find(m => m.id === selectedModule);

  return (
    <div className="space-y-6">
      {/* Module Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((module) => (
          <Card 
            key={module.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedModule === module.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
            }`}
            onClick={() => setSelectedModule(module.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-3">
                <div className={`p-3 rounded-full ${
                  selectedModule === module.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <module.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-semibold text-sm mb-1">{module.name}</h3>
              <p className="text-xs text-gray-600">{module.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module Configuration Details */}
      {selectedModuleData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <selectedModuleData.icon className="w-6 h-6 text-purple-600" />
              {selectedModuleData.name} Configurations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="configurations" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="configurations">Configurations</TabsTrigger>
                <TabsTrigger value="event-specific">Event Specific</TabsTrigger>
                <TabsTrigger value="persona-features">Persona Features</TabsTrigger>
              </TabsList>

              <TabsContent value="configurations" className="space-y-4">
                <h4 className="font-semibold mb-3">Available Configurations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedModuleData.configurations.map((config, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{config}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="event-specific" className="space-y-4">
                <h4 className="font-semibold mb-3">
                  {eventType.charAt(0).toUpperCase() + eventType.slice(1).replace('-', ' ')} Specific Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getEventSpecificConfigs(selectedModule).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="persona-features" className="space-y-4">
                <h4 className="font-semibold mb-3">
                  {guestPersona.charAt(0).toUpperCase() + guestPersona.slice(1)} Guest Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getPersonaFeatures(selectedModule).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {getPersonaFeatures(selectedModule).length === 0 && (
                  <p className="text-gray-500 text-sm italic">No specific features for this persona and module combination.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShowcaseModuleConfigurations;
