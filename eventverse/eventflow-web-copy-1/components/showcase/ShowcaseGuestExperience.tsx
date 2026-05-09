"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  Gamepad2,
  Gift,
  Heart,
  MapPin,
  MessageSquare,
  Monitor,
  QrCode,
  Smartphone,
  Star,
  Tablet,
  Ticket,
  Users,
} from "lucide-react";
import { useState } from "react";

interface ShowcaseGuestExperienceProps {
  eventType: string;
  guestPersona: string;
}

const ShowcaseGuestExperience = ({
  eventType,
  guestPersona,
}: ShowcaseGuestExperienceProps) => {
  const [selectedDevice, setSelectedDevice] = useState("mobile");
  const [currentStep, setCurrentStep] = useState("invitation");

  const devices = [
    { id: "mobile", name: "Mobile", icon: Smartphone },
    { id: "tablet", name: "Tablet", icon: Tablet },
    { id: "desktop", name: "Desktop", icon: Monitor },
  ];

  const guestJourney = [
    {
      id: "invitation",
      name: "Invitation",
      description: "Receives event invitation",
      duration: "30 seconds",
    },
    {
      id: "rsvp",
      name: "RSVP/Ticket",
      description: "Completes RSVP or purchases ticket",
      duration: "2-5 minutes",
    },
    {
      id: "preparation",
      name: "Pre-Event",
      description: "Views details, uploads photos",
      duration: "5-10 minutes",
    },
    {
      id: "checkin",
      name: "Check-in",
      description: "Arrives and checks in",
      duration: "1 minute",
    },
    {
      id: "experience",
      name: "During Event",
      description: "Participates in activities",
      duration: "Throughout event",
    },
    {
      id: "followup",
      name: "Post-Event",
      description: "Shares memories, provides feedback",
      duration: "10-15 minutes",
    },
  ];

  const getPersonaFeatures = () => {
    switch (guestPersona) {
      case "vip":
        return [
          "Priority seating assignment",
          "Exclusive VIP area access",
          "Premium gift bag",
          "Special photo opportunities",
          "VIP-only activities",
          "Dedicated support",
        ];
      case "family":
        return [
          "Multiple attendee management",
          "Child-friendly activities",
          "Family seating preferences",
          "Special dietary accommodations",
          "Age-appropriate games",
          "Family photo sessions",
        ];
      case "corporate":
        return [
          "Professional networking tools",
          "Business card exchange",
          "Company affiliation display",
          "Industry-specific content",
          "Meeting scheduling",
          "Professional photo library",
        ];
      case "speaker":
        return [
          "Backstage area access",
          "Presentation upload tools",
          "Speaker lounge access",
          "Technical support priority",
          "Media interview scheduling",
          "Speaker resource library",
        ];
      default:
        return [
          "Standard event access",
          "Basic photo sharing",
          "General activities",
          "Standard seating",
          "Community interactions",
          "Regular support",
        ];
    }
  };

  const getEventTypeContent = () => {
    switch (eventType) {
      case "wedding":
        return {
          primaryAction: "RSVP to Wedding",
          activities: [
            "Ceremony viewing",
            "Reception dinner",
            "Photo sharing",
            "Wedding games",
            "Guest wishes",
          ],
          specialFeatures: [
            "Meal preferences",
            "Song requests",
            "Gift registry",
            "Photo booth",
          ],
        };
      case "conference":
        return {
          primaryAction: "Purchase Conference Ticket",
          activities: [
            "Session attendance",
            "Networking",
            "Q&A participation",
            "Resource downloads",
            "Speaker meetings",
          ],
          specialFeatures: [
            "Session selection",
            "Calendar integration",
            "Networking matching",
            "Digital business cards",
          ],
        };
      case "festival":
        return {
          primaryAction: "Buy Festival Pass",
          activities: [
            "Stage performances",
            "Artist interactions",
            "Photo sharing",
            "Voting activities",
            "Social sharing",
          ],
          specialFeatures: [
            "Artist schedules",
            "Stage maps",
            "Live updates",
            "Exclusive content",
          ],
        };
      default:
        return {
          primaryAction: "Confirm Attendance",
          activities: [
            "Event participation",
            "Photo sharing",
            "Games & activities",
            "Social interactions",
            "Memory creation",
          ],
          specialFeatures: [
            "Personalized experience",
            "Activity tracking",
            "Social features",
            "Digital keepsakes",
          ],
        };
    }
  };

  const eventContent = getEventTypeContent();
  const personaFeatures = getPersonaFeatures();

  return (
    <div className="space-y-8">
      {/* Device & Persona Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Device Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-2">
              {devices.map((device) => (
                <Button
                  key={device.id}
                  variant={selectedDevice === device.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDevice(device.id)}
                  className="flex items-center gap-2"
                >
                  <device.icon className="h-4 w-4" />
                  {device.name}
                </Button>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Experience optimized for {selectedDevice} devices with responsive
              design and touch-friendly interactions.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {guestPersona.charAt(0).toUpperCase() +
                guestPersona.slice(1)}{" "}
              Guest Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {personaFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Guest Journey Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Complete Guest Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guestJourney.map((step, index) => (
              <div
                key={step.id}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  currentStep === step.id
                    ? "border-purple-200 bg-purple-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className="mb-2 flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      currentStep === step.id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{step.name}</div>
                    <div className="text-xs text-gray-500">{step.duration}</div>
                  </div>
                </div>
                <div className="ml-11 text-sm text-gray-600">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Step Details */}
      <Card>
        <CardHeader>
          <CardTitle>
            Step {guestJourney.findIndex((s) => s.id === currentStep) + 1}:{" "}
            {guestJourney.find((s) => s.id === currentStep)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Step Content */}
            <div className="space-y-4">
              {currentStep === "invitation" && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
                    <h3 className="mb-2 text-xl font-bold">
                      You&apos;re Invited!
                    </h3>
                    <p className="mb-4">
                      Join us for an amazing {eventType.replace("-", " ")}{" "}
                      experience
                    </p>
                    <Button className="bg-white text-purple-600 hover:bg-gray-100">
                      {eventContent.primaryAction}
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === "rsvp" && (
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-semibold">
                      {eventContent.primaryAction}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Attendance</span>
                        <Badge variant="outline">Will Attend</Badge>
                      </div>
                      {eventContent.specialFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{feature}</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === "preparation" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4 text-center">
                      <Calendar className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                      <div className="font-medium">Schedule</div>
                      <div className="text-sm text-gray-600">View timeline</div>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <MapPin className="mx-auto mb-2 h-8 w-8 text-green-600" />
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-gray-600">
                        Get directions
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === "checkin" && (
                <div className="space-y-4">
                  <div className="rounded-lg border p-6 text-center">
                    <QrCode className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 font-semibold">Digital Check-in</h3>
                    <p className="mb-4 text-sm text-gray-600">
                      Show this QR code at the entrance
                    </p>
                    <Badge className="bg-green-100 text-green-800">
                      Ready to Check-in
                    </Badge>
                  </div>
                </div>
              )}

              {currentStep === "experience" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {eventContent.activities
                      .slice(0, 4)
                      .map((activity, index) => (
                        <div
                          key={index}
                          className="rounded-lg border p-4 text-center"
                        >
                          <div className="text-sm font-medium">{activity}</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {currentStep === "followup" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4 text-center">
                      <Camera className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                      <div className="text-sm">Photos</div>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <Heart className="mx-auto mb-2 h-8 w-8 text-red-600" />
                      <div className="text-sm">Memories</div>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <Star className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
                      <div className="text-sm">Feedback</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Available Actions */}
            <div>
              <h3 className="mb-4 font-semibold">Available Actions</h3>
              <div className="space-y-3">
                {currentStep === "invitation" && (
                  <>
                    <Button className="w-full justify-start">
                      <Ticket className="mr-2 h-4 w-4" />
                      {eventContent.primaryAction}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </>
                )}

                {currentStep === "rsvp" && (
                  <>
                    <Button className="w-full justify-start">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirm RSVP
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Add Plus Ones
                    </Button>
                  </>
                )}

                {(currentStep === "preparation" ||
                  currentStep === "experience") && (
                  <>
                    <Button className="w-full justify-start">
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Photos
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Gamepad2 className="mr-2 h-4 w-4" />
                      Play Games
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </>
                )}

                {currentStep === "followup" && (
                  <>
                    <Button className="w-full justify-start">
                      <Star className="mr-2 h-4 w-4" />
                      Rate Experience
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Download Memories
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowcaseGuestExperience;
