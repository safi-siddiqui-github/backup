import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Building, 
  Music, 
  Baby, 
  Gift, 
  Users,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  CheckCircle
} from "lucide-react";

interface EventTypeDetails {
  id: string;
  name: string;
  icon: any;
  description: string;
  guestCapacity: string;
  duration: string;
  modules: string[];
  features: string[];
  sampleSchedule: Array<{ time: string; activity: string }>;
}

interface ShowcaseEventTypesProps {
  selectedEventType: string;
  onEventTypeChange: (eventType: string) => void;
}

const ShowcaseEventTypes = ({ selectedEventType, onEventTypeChange }: ShowcaseEventTypesProps) => {
  const eventTypeDetails: EventTypeDetails[] = [
    {
      id: "wedding",
      name: "Luxury Wedding",
      icon: Heart,
      description: "Elegant celebration with comprehensive guest management",
      guestCapacity: "50-300 guests",
      duration: "6-8 hours",
      modules: ["RSVP", "Seating", "Schedule", "Media", "Games", "Survey"],
      features: [
        "Meal preference management",
        "Assigned table seating",
        "Photo sharing albums",
        "Wedding games & trivia",
        "Guest wishes collection",
        "Gift registry integration"
      ],
      sampleSchedule: [
        { time: "4:00 PM", activity: "Ceremony begins" },
        { time: "4:30 PM", activity: "Cocktail hour" },
        { time: "6:00 PM", activity: "Reception dinner" },
        { time: "8:00 PM", activity: "Dancing & celebration" }
      ]
    },
    {
      id: "conference",
      name: "Corporate Conference",
      icon: Building,
      description: "Professional networking event with session management",
      guestCapacity: "100-1000 attendees",
      duration: "1-3 days",
      modules: ["Ticketing", "Schedule", "Seating", "Media", "Survey"],
      features: [
        "Multi-tier ticket pricing",
        "Session-based scheduling",
        "Networking facilitation",
        "Speaker presentations",
        "Q&A and polls",
        "Professional photography"
      ],
      sampleSchedule: [
        { time: "8:00 AM", activity: "Registration & breakfast" },
        { time: "9:00 AM", activity: "Opening keynote" },
        { time: "10:30 AM", activity: "Breakout sessions" },
        { time: "12:00 PM", activity: "Networking lunch" }
      ]
    },
    {
      id: "festival",
      name: "Music Festival",
      icon: Music,
      description: "Multi-day entertainment experience with diverse activities",
      guestCapacity: "500-5000 attendees",
      duration: "2-4 days",
      modules: ["Ticketing", "Schedule", "Media", "Games", "Survey"],
      features: [
        "Multi-day pass options",
        "Artist lineup scheduling",
        "Live photo sharing",
        "Interactive fan activities",
        "Artist meet & greets",
        "Social media integration"
      ],
      sampleSchedule: [
        { time: "2:00 PM", activity: "Gates open" },
        { time: "3:00 PM", activity: "Opening acts" },
        { time: "6:00 PM", activity: "Main stage headliner" },
        { time: "10:00 PM", activity: "After party" }
      ]
    },
    {
      id: "baby-shower",
      name: "Baby Shower",
      icon: Baby,
      description: "Intimate celebration with gift coordination",
      guestCapacity: "20-50 guests",
      duration: "2-3 hours",
      modules: ["RSVP", "Schedule", "Media", "Games", "Survey"],
      features: [
        "Gift registry tracking",
        "Baby-themed games",
        "Memory collection",
        "Photo booth moments",
        "Advice for parents",
        "Dietary accommodations"
      ],
      sampleSchedule: [
        { time: "2:00 PM", activity: "Welcome & mingling" },
        { time: "2:30 PM", activity: "Baby shower games" },
        { time: "3:30 PM", activity: "Gift opening" },
        { time: "4:00 PM", activity: "Cake & celebration" }
      ]
    },
    {
      id: "birthday",
      name: "Birthday Party",
      icon: Gift,
      description: "Fun celebration with interactive entertainment",
      guestCapacity: "10-100 guests",
      duration: "3-4 hours",
      modules: ["RSVP", "Schedule", "Media", "Games"],
      features: [
        "Age-appropriate activities",
        "Photo memory collection",
        "Interactive party games",
        "Birthday wishes",
        "Special dietary options",
        "Entertainment coordination"
      ],
      sampleSchedule: [
        { time: "3:00 PM", activity: "Party begins" },
        { time: "3:30 PM", activity: "Party games" },
        { time: "4:30 PM", activity: "Cake ceremony" },
        { time: "5:00 PM", activity: "Free play & photos" }
      ]
    },
    {
      id: "fundraiser",
      name: "Fundraising Gala",
      icon: Users,
      description: "Elegant charity event with donation management",
      guestCapacity: "100-500 guests",
      duration: "4-5 hours",
      modules: ["Ticketing", "Seating", "Schedule", "Media", "Survey"],
      features: [
        "Tiered sponsorship levels",
        "Auction participation",
        "Donor recognition",
        "Impact storytelling",
        "Professional networking",
        "Tax receipt generation"
      ],
      sampleSchedule: [
        { time: "6:00 PM", activity: "Cocktail reception" },
        { time: "7:00 PM", activity: "Dinner service" },
        { time: "8:00 PM", activity: "Auction & speeches" },
        { time: "9:30 PM", activity: "Dancing & networking" }
      ]
    }
  ];

  const selectedDetails = eventTypeDetails.find(e => e.id === selectedEventType) || eventTypeDetails[0];

  return (
    <div className="space-y-8">
      {/* Event Type Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventTypeDetails.map((eventType) => (
          <Card 
            key={eventType.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col ${
              selectedEventType === eventType.id ? 'ring-2 ring-purple-500 shadow-lg' : ''
            }`}
            onClick={() => onEventTypeChange(eventType.id)}
          >
            <CardHeader className="text-center pb-3 flex-shrink-0">
              <div className="flex justify-center mb-3">
                <div className="bg-purple-100 rounded-full p-3">
                  <eventType.icon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-base font-semibold leading-tight">{eventType.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-1 flex flex-col justify-between pt-0">
              <div className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">{eventType.description}</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-center gap-1.5 text-gray-500">
                    <Users className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{eventType.guestCapacity}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-gray-500">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{eventType.duration}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <Badge 
                  variant={selectedEventType === eventType.id ? "default" : "outline"}
                  className="text-xs"
                >
                  {eventType.modules.length} Modules
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Event Details */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="flex items-center gap-3">
            <selectedDetails.icon className="w-6 h-6 text-purple-600" />
            {selectedDetails.name} - Complete Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Modules & Features */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Active Modules
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDetails.modules.map((module) => (
                    <Badge key={module} variant="outline" className="text-xs">
                      {module}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {selectedDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sample Schedule */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Sample Timeline
              </h3>
              <div className="space-y-3">
                {selectedDetails.sampleSchedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-purple-600 min-w-[80px] text-sm">
                      {item.time}
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {item.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowcaseEventTypes;
