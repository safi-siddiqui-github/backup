
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventDashboard from "@/components/EventDashboard";

const EventManagement = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Mock event data - in a real app, this would be fetched based on eventId
  const mockEvent = {
    id: eventId,
    eventName: `Event ${eventId}`,
    eventType: "Corporate Event",
    description: "A professional corporate gathering",
    startDate: new Date(2024, 11, 20),
    endDate: new Date(2024, 11, 20),
    time: "6:00 PM",
    locations: [
      { name: "Downtown Convention Center", address: "456 Business Ave, City Center", source: "marketplace", vendorName: "Event Spaces Pro" }
    ],
    selectedModules: ["schedules", "rsvp", "seating", "budgeting", "media", "announcements"],
    weather: {
      temperature: 22,
      condition: "partly-cloudy",
      icon: "cloud-sun"
    },
    createdAt: new Date()
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <EventDashboard 
        event={mockEvent} 
        onBack={handleBackToDashboard}
        onEdit={() => {}} // Empty for now since there's no edit functionality here
      />
    </div>
  );
};

export default EventManagement;
