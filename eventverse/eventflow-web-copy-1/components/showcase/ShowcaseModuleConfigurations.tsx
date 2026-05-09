"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Camera,
  CheckCircle,
  Gamepad2,
  MessageSquare,
  Settings,
  Star,
  Ticket,
  Users,
  Zap,
} from "lucide-react";
import { ElementType, useState } from "react";

interface ShowcaseModuleConfigurationsProps {
  // eventType: unknown;
  // guestPersona: string;
  eventType: "wedding" | "conference" | "festival";
  guestPersona: "vip" | "family" | "corporate";
}

type ModuleId =
  | "rsvp"
  | "ticketing"
  | "schedule"
  | "seating"
  | "media"
  | "games"
  | "survey";

type ModuleType = {
  id: ModuleId;
  name: string;
  icon: ElementType;
  description: string;
  configurations: string[];
};

const ShowcaseModuleConfigurations = ({
  eventType,
  guestPersona,
}: ShowcaseModuleConfigurationsProps) => {
  const [selectedModule, setSelectedModule] = useState<ModuleId>("rsvp");

  const modules: ModuleType[] = [
    {
      id: "rsvp",
      name: "RSVP System",
      icon: CheckCircle,
      description: "Guest response management",
      configurations: [
        "Basic RSVP",
        "With Meal Choices",
        "Plus Ones",
        "Dietary Restrictions",
        "Song Requests",
      ],
    },
    {
      id: "ticketing",
      name: "Ticketing",
      icon: Ticket,
      description: "Ticket sales and management",
      configurations: [
        "Single Tier",
        "Multi-Tier VIP",
        "Early Bird",
        "Group Discounts",
        "Corporate Rates",
      ],
    },
    {
      id: "schedule",
      name: "Event Schedule",
      icon: Calendar,
      description: "Timeline and agenda",
      configurations: [
        "Simple Timeline",
        "Multi-Day",
        "Session Selection",
        "Personal Agenda",
        "Live Updates",
      ],
    },
    {
      id: "seating",
      name: "Seating Charts",
      icon: Users,
      description: "Table and seat assignments",
      configurations: [
        "Open Seating",
        "Assigned Tables",
        "Numbered Seats",
        "VIP Sections",
        "Accessibility",
      ],
    },
    {
      id: "media",
      name: "Media Sharing",
      icon: Camera,
      description: "Photo and video galleries",
      configurations: [
        "Guest Uploads",
        "Professional Gallery",
        "QR Access",
        "Live Feed",
        "Download Rights",
      ],
    },
    {
      id: "games",
      name: "Interactive Games",
      icon: Gamepad2,
      description: "Entertainment and engagement",
      configurations: [
        "Trivia",
        "Scavenger Hunt",
        "Photo Contest",
        "Voting",
        "Leaderboards",
      ],
    },
    {
      id: "survey",
      name: "Feedback & Surveys",
      icon: MessageSquare,
      description: "Guest feedback collection",
      configurations: [
        "Post-Event Survey",
        "Real-time Polls",
        "Wishes Collection",
        "Rating System",
        "Comments",
      ],
    },
  ];

  const getEventSpecificConfigs = (moduleId: ModuleId) => {
    const eventConfigs = {
      wedding: {
        rsvp: [
          "Ceremony + Reception",
          "Meal Preferences",
          "Song Requests",
          "Guest Wishes",
          "Dietary Notes",
        ],
        ticketing: ["Not typically used for weddings"],
        schedule: [
          "Ceremony Timeline",
          "Reception Flow",
          "Photo Sessions",
          "Special Moments",
        ],
        seating: [
          "Reception Tables",
          "Family Grouping",
          "Friend Clusters",
          "VIP Table",
        ],
        media: [
          "Guest Photo Sharing",
          "Professional Gallery",
          "Couple's Moments",
          "QR Code Access",
        ],
        games: [
          "Couple Trivia",
          "Wedding Bingo",
          "Memory Sharing",
          "Advice Collection",
        ],
        survey: [
          "Wedding Wishes",
          "Favorite Memories",
          "Thank You Notes",
          "Future Advice",
        ],
      },
      conference: {
        rsvp: [
          "Session Selection",
          "Networking Preferences",
          "Workshop Choices",
          "Meal Plans",
        ],
        ticketing: [
          "General Admission",
          "VIP Pass",
          "Speaker Package",
          "Workshop Add-ons",
          "Group Rates",
        ],
        schedule: [
          "Keynote Sessions",
          "Breakout Rooms",
          "Networking Breaks",
          "Workshop Times",
        ],
        seating: [
          "Auditorium Style",
          "Round Tables",
          "Workshop Pods",
          "VIP Section",
        ],
        media: [
          "Presentation Downloads",
          "Session Recordings",
          "Photo Gallery",
          "Speaker Resources",
        ],
        games: [
          "Industry Quiz",
          "Networking Bingo",
          "Scavenger Hunt",
          "Innovation Challenge",
        ],
        survey: [
          "Session Feedback",
          "Speaker Ratings",
          "Networking Survey",
          "Future Topics",
        ],
      },
      festival: {
        rsvp: [
          "Day Passes",
          "Artist Preferences",
          "Food Choices",
          "Camping Options",
        ],
        ticketing: [
          "Single Day",
          "Multi-Day Pass",
          "VIP Experience",
          "Group Packages",
          "Student Discounts",
        ],
        schedule: [
          "Stage Lineups",
          "Artist Times",
          "Food Vendors",
          "Activity Zones",
        ],
        seating: [
          "Standing Areas",
          "VIP Viewing",
          "Accessible Seating",
          "Premium Platforms",
        ],
        media: [
          "Live Streams",
          "Artist Photos",
          "Fan Galleries",
          "Behind Scenes",
        ],
        games: [
          "Artist Trivia",
          "Photo Contest",
          "Dance Competition",
          "Social Challenges",
        ],
        survey: [
          "Artist Ratings",
          "Experience Feedback",
          "Future Lineups",
          "Venue Rating",
        ],
      },
    };

    return (
      eventConfigs[eventType]?.[moduleId] ||
      modules.find((m) => m.id === moduleId)?.configurations ||
      []
    );
  };

  const getPersonaFeatures = (moduleId: ModuleId) => {
    const personaFeatures = {
      vip: {
        rsvp: ["Priority Processing", "Concierge Support", "Special Requests"],
        ticketing: ["VIP Lounge Access", "Premium Seating", "Skip Lines"],
        schedule: ["Exclusive Events", "Early Access", "Private Sessions"],
        seating: ["VIP Section", "Premium Location", "Reserved Tables"],
        media: ["Professional Photos", "Exclusive Content", "Download Rights"],
        games: ["VIP Leaderboard", "Exclusive Challenges", "Special Prizes"],
        survey: [
          "Priority Feedback",
          "Direct Communication",
          "Special Recognition",
        ],
      },
      family: {
        rsvp: ["Multiple Attendees", "Age-Based Options", "Child Meals"],
        ticketing: ["Family Packages", "Child Discounts", "Group Rates"],
        schedule: ["Kid-Friendly Times", "Family Activities", "Quiet Spaces"],
        seating: ["Family Tables", "Child Seating", "Accessibility"],
        media: ["Family Photos", "Kid-Safe Content", "Private Albums"],
        games: ["Age-Appropriate", "Family Challenges", "Group Activities"],
        survey: ["Family Feedback", "Child Experience", "Safety Ratings"],
      },
      corporate: {
        rsvp: ["Department Selection", "Role Information", "Networking Goals"],
        ticketing: ["Corporate Rates", "Bulk Pricing", "Invoice Options"],
        schedule: ["Business Sessions", "Networking Time", "Industry Focus"],
        seating: ["Department Tables", "Networking Setup", "Business Cards"],
        media: [
          "Professional Photos",
          "Presentation Materials",
          "Company Gallery",
        ],
        games: ["Industry Trivia", "Team Challenges", "Professional Network"],
        survey: ["Business Feedback", "ROI Assessment", "Future Events"],
      },
    };

    return personaFeatures[guestPersona]?.[moduleId] || [];
  };

  const selectedModuleData = modules.find((m) => m.id === selectedModule);

  return (
    <div className="space-y-6">
      {/* Module Selection */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedModule === module.id
                ? "bg-purple-50 ring-2 ring-purple-500"
                : ""
            }`}
            onClick={() => setSelectedModule(module.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="mb-3 flex justify-center">
                <div
                  className={`rounded-full p-3 ${
                    selectedModule === module.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <module.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mb-1 text-sm font-semibold">{module.name}</h3>
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
              <selectedModuleData.icon className="h-6 w-6 text-purple-600" />
              {selectedModuleData.name} Configurations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="configurations"
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="configurations">Configurations</TabsTrigger>
                <TabsTrigger value="event-specific">Event Specific</TabsTrigger>
                <TabsTrigger value="persona-features">
                  Persona Features
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="configurations"
                className="space-y-4"
              >
                <h4 className="mb-3 font-semibold">Available Configurations</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {selectedModuleData.configurations.map((config, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                    >
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{config}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="event-specific"
                className="space-y-4"
              >
                <h4 className="mb-3 font-semibold">
                  {eventType.charAt(0).toUpperCase() +
                    eventType.slice(1).replace("-", " ")}{" "}
                  Specific Features
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {getEventSpecificConfigs(selectedModule).map(
                    (feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg bg-blue-50 p-3"
                      >
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ),
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="persona-features"
                className="space-y-4"
              >
                <h4 className="mb-3 font-semibold">
                  {guestPersona.charAt(0).toUpperCase() + guestPersona.slice(1)}{" "}
                  Guest Features
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {getPersonaFeatures(selectedModule).map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg bg-green-50 p-3"
                    >
                      <Star className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {getPersonaFeatures(selectedModule).length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No specific features for this persona and module
                    combination.
                  </p>
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
