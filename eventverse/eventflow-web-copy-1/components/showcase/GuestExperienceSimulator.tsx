"use client";

import GuestGamesView from "@/components/GuestGamesView";
import GuestMediaUpload from "@/components/GuestMediaUpload";
import GuestRSVPForm from "@/components/GuestRSVPForm";
import GuestScheduleView from "@/components/GuestScheduleView";
import GuestSeatingView from "@/components/GuestSeatingView";
import GuestSurveyView from "@/components/GuestSurveyView";
import GuestTicketingView from "@/components/GuestTicketingView";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Baby,
  Building,
  Calendar,
  Camera,
  Eye,
  Gamepad2,
  Gift,
  Heart,
  MapPin,
  MessageSquare,
  Music,
  Play,
  Ticket,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

type SelectedScenarioType =
  | "sarah-michael-wedding"
  | "techcon-2024"
  | "techcon-2024"
  | "summer-music-fest"
  | "company-gala"
  | "baby-shower-emma"
  | "milestone-birthday";

type SelectedPersonaType =
  | "regular"
  | "vip"
  | "family"
  | "corporate"
  | "speaker";

type SelectedModuleType =
  | "rsvp"
  | "ticketing"
  | "schedule"
  | "seating"
  | "media"
  | "games"
  | "survey";

type MockScenariosType = Record<
  SelectedScenarioType,
  {
    id: string;
    name: string;
    type: string;
    couple: string;
    date: string;
    startDate: string;
    time: string;
    location: string;
    address: string;
    description: string;
    ticketPrice: number;
    guestCount: number;
    modules: SelectedModuleType[];
    theme: string;
    gameStats: {
      activeGames: number;
      totalParticipants: number;
      featuredGame: string;
    };
  }
>;

const GuestExperienceSimulator = () => {
  const [selectedScenario, setSelectedScenario] =
    useState<SelectedScenarioType>("techcon-2024");
  const [selectedModule, setSelectedModule] =
    useState<SelectedModuleType>("games");
  const [selectedPersona, setSelectedPersona] =
    useState<SelectedPersonaType>("regular");

  const mockScenarios: MockScenariosType = {
    "sarah-michael-wedding": {
      id: "sarah-michael-wedding",
      name: "Sarah & Michael's Garden Wedding",
      type: "wedding",
      couple: "Sarah & Michael",
      date: "June 15, 2024",
      startDate: "2024-06-15",
      time: "4:00 PM - 11:00 PM",
      location: "Rosewood Garden Estate",
      address: "1234 Garden Lane, Napa Valley, CA",
      description:
        "Join us for an intimate garden wedding celebration surrounded by blooming roses and fairy lights.",
      ticketPrice: 0,
      guestCount: 120,
      modules: ["rsvp", "schedule", "seating", "media", "games", "survey"],
      theme: "rose",
      gameStats: {
        activeGames: 8,
        totalParticipants: 89,
        featuredGame: "Love Story Trivia",
      },
    },
    "techcon-2024": {
      id: "techcon-2024",
      name: "TechCon 2024: AI Innovation Summit",
      type: "conference",
      couple: "TechCorp Industries",
      date: "September 10-12, 2024",
      startDate: "2024-09-10",
      time: "8:00 AM - 6:00 PM",
      location: "San Francisco Convention Center",
      address: "747 Howard St, San Francisco, CA 94103",
      description:
        "The premier conference for AI professionals, featuring keynotes from industry leaders and hands-on workshops.",
      ticketPrice: 299,
      guestCount: 2500,
      modules: ["ticketing", "schedule", "seating", "media", "games", "survey"],
      theme: "blue",
      gameStats: {
        activeGames: 12,
        totalParticipants: 1247,
        featuredGame: "AI Knowledge Challenge",
      },
    },
    "company-gala": {
      id: "company-gala",
      name: "Annual Excellence Gala",
      type: "corporate",
      couple: "Innovate Corp",
      date: "November 20, 2024",
      startDate: "2024-11-20",
      time: "6:00 PM - 11:00 PM",
      location: "Grand Ballroom, Marriott Downtown",
      address: "55 Fourth Street, San Francisco, CA 94103",
      description:
        "Celebrating our team's achievements with dinner, awards, and entertainment.",
      ticketPrice: 75,
      guestCount: 300,
      modules: ["ticketing", "schedule", "seating", "media", "games"],
      theme: "purple",
      gameStats: {
        activeGames: 6,
        totalParticipants: 187,
        featuredGame: "Company Culture Quiz",
      },
    },
    "summer-music-fest": {
      id: "summer-music-fest",
      name: "Summer Vibes Music Festival",
      type: "festival",
      couple: "Festival Productions",
      date: "July 20-22, 2024",
      startDate: "2024-07-20",
      time: "12:00 PM - 12:00 AM",
      location: "Golden Gate Park",
      address: "501 Stanyan St, San Francisco, CA 94117",
      description:
        "Three days of amazing music, food trucks, and good vibes in the heart of San Francisco.",
      ticketPrice: 89,
      guestCount: 5000,
      modules: ["ticketing", "schedule", "media", "games", "survey"],
      theme: "orange",
      gameStats: {
        activeGames: 15,
        totalParticipants: 3247,
        featuredGame: "Music Trivia Battle",
      },
    },
    "baby-shower-emma": {
      id: "baby-shower-emma",
      name: "Emma's Baby Shower",
      type: "baby-shower",
      couple: "Emma & David",
      date: "May 5, 2024",
      startDate: "2024-05-05",
      time: "2:00 PM - 5:00 PM",
      location: "The Parker Family Home",
      address: "789 Elm Street, Palo Alto, CA",
      description:
        "Celebrating baby Parker with games, gifts, and sweet treats!",
      ticketPrice: 0,
      guestCount: 35,
      modules: ["rsvp", "schedule", "media", "games", "survey"],
      theme: "pink",
      gameStats: {
        activeGames: 4,
        totalParticipants: 28,
        featuredGame: "Baby Name Guessing",
      },
    },
    "milestone-birthday": {
      id: "milestone-birthday",
      name: "Jessica's 30th Birthday Bash",
      type: "birthday",
      couple: "Jessica Martinez",
      date: "August 12, 2024",
      startDate: "2024-08-12",
      time: "7:00 PM - 1:00 AM",
      location: "Rooftop Terrace, The Standard",
      address: "333 Battery St, San Francisco, CA 94111",
      description:
        "Celebrating three decades of awesome with dinner, dancing, and city views!",
      ticketPrice: 45,
      guestCount: 80,
      modules: ["rsvp", "schedule", "media", "games"],
      theme: "gold",
      gameStats: {
        activeGames: 5,
        totalParticipants: 67,
        featuredGame: "Jessica's Life Journey",
      },
    },
  };

  const guestPersonas = {
    regular: {
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      relation: "Friend",
      isCheckedIn: false,
      gameStats: { score: 850, rank: 12, gamesPlayed: 4 },
    },
    vip: {
      name: "Victoria Sterling",
      email: "v.sterling@email.com",
      relation: "VIP Guest",
      isCheckedIn: true,
      gameStats: { score: 1247, rank: 3, gamesPlayed: 8 },
    },
    family: {
      name: "The Rodriguez Family",
      email: "rodriguez.family@email.com",
      relation: "Family",
      isCheckedIn: false,
      gameStats: { score: 654, rank: 18, gamesPlayed: 3 },
    },
    corporate: {
      name: "Michael Chen",
      email: "m.chen@company.com",
      relation: "Senior Director",
      isCheckedIn: false,
      gameStats: { score: 1089, rank: 7, gamesPlayed: 6 },
    },
    speaker: {
      name: "Dr. Sarah Kim",
      email: "s.kim@university.edu",
      relation: "Keynote Speaker",
      isCheckedIn: true,
      gameStats: { score: 1456, rank: 1, gamesPlayed: 9 },
    },
  };

  const selectedEvent = mockScenarios[selectedScenario];
  const selectedGuest = guestPersonas[selectedPersona];

  const availableModules = selectedEvent.modules.map((moduleId) => {
    const moduleNames: Record<SelectedModuleType, string> = {
      rsvp: "RSVP",
      ticketing: "Ticketing",
      schedule: "Schedule",
      seating: "Seating",
      media: "Media",
      games: "Games",
      survey: "Survey",
    };
    return {
      id: moduleId,
      name: moduleNames[moduleId],
      icon:
        moduleId === "rsvp"
          ? Heart
          : moduleId === "ticketing"
            ? Ticket
            : moduleId === "schedule"
              ? Calendar
              : moduleId === "seating"
                ? Users
                : moduleId === "media"
                  ? Camera
                  : moduleId === "games"
                    ? Gamepad2
                    : MessageSquare,
    };
  });

  const renderModuleContent = () => {
    const moduleProps = {
      event: selectedEvent,
      guest: selectedGuest,
    };

    switch (selectedModule) {
      case "rsvp":
        return <GuestRSVPForm {...moduleProps} />;
      case "ticketing":
        return <GuestTicketingView {...moduleProps} />;
      case "schedule":
        return <GuestScheduleView {...moduleProps} />;
      case "seating":
        return (
          <GuestSeatingView
            guest={selectedGuest}
            tableNumber={7}
            seatNumber={3}
          />
        );
      case "media":
        return <GuestMediaUpload {...moduleProps} />;
      case "games":
        return <GuestGamesView {...moduleProps} />;
      case "survey":
        return <GuestSurveyView {...moduleProps} />;
      default:
        return (
          <div className="py-8 text-center text-gray-500">
            Select a module to view the guest experience
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Scenario Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Guest Experience Simulator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Event Scenario
              </label>
              <Select
                value={selectedScenario}
                onValueChange={(value) =>
                  setSelectedScenario(value as SelectedScenarioType)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(mockScenarios).map((scenario) => (
                    <SelectItem
                      key={scenario.id}
                      value={scenario.id}
                    >
                      <div className="flex items-center gap-2">
                        {scenario.type === "wedding" && (
                          <Heart className="h-4 w-4" />
                        )}
                        {scenario.type === "conference" && (
                          <Building className="h-4 w-4" />
                        )}
                        {scenario.type === "corporate" && (
                          <Building className="h-4 w-4" />
                        )}
                        {scenario.type === "festival" && (
                          <Music className="h-4 w-4" />
                        )}
                        {scenario.type === "baby-shower" && (
                          <Baby className="h-4 w-4" />
                        )}
                        {scenario.type === "birthday" && (
                          <Gift className="h-4 w-4" />
                        )}
                        {scenario.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Guest Persona
              </label>
              <Select
                value={selectedPersona}
                onValueChange={(value) =>
                  setSelectedPersona(value as SelectedPersonaType)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(guestPersonas).map(([key, persona]) => (
                    <SelectItem
                      key={key}
                      value={key}
                    >
                      <div>
                        <div className="font-medium">{persona.name}</div>
                        <div className="text-xs text-gray-500">
                          {persona.relation}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Module View
              </label>
              <Select
                value={selectedModule}
                onValueChange={(value) =>
                  setSelectedModule(value as SelectedModuleType)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableModules.map((module) => (
                    <SelectItem
                      key={module.id}
                      value={module.id}
                    >
                      <div className="flex items-center gap-2">
                        <module.icon className="h-4 w-4" />
                        {module.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Enhanced Configuration Display */}
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="flex flex-wrap items-center gap-4">
              <Badge
                variant="outline"
                className="text-sm"
              >
                <Calendar className="mr-1 h-3 w-3" />
                {selectedEvent.name}
              </Badge>
              <Badge
                variant="outline"
                className="text-sm"
              >
                <User className="mr-1 h-3 w-3" />
                {selectedGuest.name}
              </Badge>
              <Badge
                variant="outline"
                className="text-sm"
              >
                <MapPin className="mr-1 h-3 w-3" />
                {selectedEvent.location}
              </Badge>
              <Badge
                variant="outline"
                className="text-sm"
              >
                {selectedEvent.guestCount} guests
              </Badge>
              {selectedModule === "games" && (
                <>
                  <Badge className="bg-purple-600 text-sm text-white">
                    <Gamepad2 className="mr-1 h-3 w-3" />
                    {selectedEvent.gameStats.activeGames} Live Games
                  </Badge>
                  <Badge className="bg-green-600 text-sm text-white">
                    <Play className="mr-1 h-3 w-3" />
                    {selectedEvent.gameStats.totalParticipants} Playing
                  </Badge>
                  <Badge className="bg-yellow-600 text-sm text-white">
                    <Trophy className="mr-1 h-3 w-3" />
                    Rank #{selectedGuest.gameStats.rank}
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Gaming Statistics for Games Module */}
          {selectedModule === "games" && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-purple-50 p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedGuest.gameStats.score}
                </div>
                <div className="text-sm text-gray-600">Guest Score</div>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <div className="text-2xl font-bold text-green-600">
                  #{selectedGuest.gameStats.rank}
                </div>
                <div className="text-sm text-gray-600">Global Rank</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedGuest.gameStats.gamesPlayed}
                </div>
                <div className="text-sm text-gray-600">Games Played</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Module Content */}
      <div className="rounded-lg border bg-white">{renderModuleContent()}</div>
    </div>
  );
};

export default GuestExperienceSimulator;
