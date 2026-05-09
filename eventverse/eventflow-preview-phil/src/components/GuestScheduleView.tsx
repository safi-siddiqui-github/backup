
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Heart, Music, Utensils } from "lucide-react";
import ConferenceGuestSchedule from "@/components/showcase/ConferenceGuestSchedule";

interface GuestScheduleViewProps {
  event: any;
  guest: { name: string; email: string };
}

const GuestScheduleView = ({ event, guest }: GuestScheduleViewProps) => {
  // If it's a conference event, show the interactive conference schedule
  if (event.eventType === "Conference") {
    return <ConferenceGuestSchedule event={event} guest={guest} />;
  }

  // For non-conference events, show the original timeline view
  const mockSchedule = [
    {
      time: "2:00 PM",
      title: "Guest Arrival & Welcome",
      description: "Welcome drinks and light appetizers",
      location: "Garden Entrance",
      icon: Users,
      type: "arrival"
    },
    {
      time: "3:00 PM", 
      title: "Pre-Ceremony Music",
      description: "String quartet performance",
      location: "Rose Garden",
      icon: Music,
      type: "music"
    },
    {
      time: "4:00 PM",
      title: "Wedding Ceremony",
      description: "The main ceremony begins",
      location: "Garden Altar",
      icon: Heart,
      type: "ceremony"
    },
    {
      time: "4:30 PM",
      title: "Cocktail Hour",
      description: "Cocktails and canapés while couple takes photos",
      location: "Terrace",
      icon: Utensils,
      type: "cocktails"
    },
    {
      time: "6:00 PM",
      title: "Reception Dinner",
      description: "Seated dinner with speeches",
      location: "Main Pavilion",
      icon: Utensils,
      type: "dinner"
    },
    {
      time: "8:00 PM",
      title: "First Dance & Dancing",
      description: "Dancing continues until late",
      location: "Dance Floor",
      icon: Music,
      type: "dancing"
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "ceremony": return "bg-rose-500";
      case "cocktails": return "bg-purple-500";
      case "dinner": return "bg-orange-500";
      case "dancing": return "bg-blue-500";
      case "music": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-gradient-to-r from-rose-500 to-purple-600 text-white border-0 mb-6">
        <CardContent className="p-6 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Event Schedule</h2>
          <p className="opacity-90">Your timeline for {event.name}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockSchedule.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-20 bg-gray-50 p-4 flex flex-col items-center justify-center">
                    <div className="text-sm font-semibold text-gray-800">{item.time}</div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-full ${getEventTypeColor(item.type)} flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.location}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h3 className="font-semibold text-blue-800 mb-1">Important Notes</h3>
          <p className="text-sm text-blue-700">
            Please arrive 15 minutes early for each event. Check your email for any last-minute updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestScheduleView;
