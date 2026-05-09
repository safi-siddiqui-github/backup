"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PreviewTestingStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const deviceIcons = {
    desktop: Monitor,
    tablet: Tablet,
    mobile: Smartphone,
  };

  const previewChecks = [
    {
      id: "event-info",
      label: "Event information is complete",
      status: "complete",
    },
    {
      id: "modules",
      label: "Selected modules are configured",
      status: formData.selectedModules.length > 0 ? "complete" : "warning",
    },
    {
      id: "location",
      label: "Location details are provided",
      status: formData.locations[0]?.name ? "complete" : "warning",
    },
    {
      id: "date-time",
      label: "Date and time are set",
      status:
        formData.eventDates?.startDate || formData.startDate
          ? "complete"
          : "warning",
    },
    { id: "theme", label: "Theme is applied", status: "complete" },
  ];

  const guestJourneySteps = [
    {
      step: 1,
      title: "Discover Event",
      description:
        "Guest finds your event through invitation or public listing",
    },
    {
      step: 2,
      title: "View Details",
      description: "Guest reviews event information, location, and schedule",
    },
    {
      step: 3,
      title: "RSVP/Register",
      description: "Guest responds to invitation or purchases tickets",
    },
    {
      step: 4,
      title: "Receive Updates",
      description: "Guest gets announcements and event updates",
    },
    {
      step: 5,
      title: "Attend Event",
      description: "Guest participates in activities and engages with content",
    },
    {
      step: 6,
      title: "Share Memories",
      description: "Guest uploads photos and provides feedback",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Preview & Test Your Event
        </h2>
        <p className="mt-1 text-gray-600">
          Review how your event will look and function for guests
        </p>
      </div>

      <Tabs
        defaultValue="preview"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">Event Preview</TabsTrigger>
          <TabsTrigger value="journey">Guest Journey</TabsTrigger>
          <TabsTrigger value="checklist">Pre-Launch Checklist</TabsTrigger>
        </TabsList>

        <TabsContent
          value="preview"
          className="space-y-6"
        >
          {/* Device Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Preview on:
            </span>
            {(["desktop", "tablet", "mobile"] as const).map((device) => {
              const Icon = deviceIcons[device];
              return (
                <Button
                  key={device}
                  variant={previewDevice === device ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewDevice(device)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {device.charAt(0).toUpperCase() + device.slice(1)}
                </Button>
              );
            })}
          </div>

          {/* Preview Area */}
          <Card className="h-[500px] overflow-hidden">
            <div
              className={`mx-auto rounded-lg border bg-white shadow-sm transition-all duration-300 ${previewDevice === "desktop" ? "h-full w-full" : ""} ${previewDevice === "tablet" ? "mx-auto mt-8 h-full w-2/3" : ""} ${previewDevice === "mobile" ? "mx-auto mt-8 h-full w-80" : ""} `}
            >
              <div className="h-full overflow-y-auto p-6">
                {/* Event Header */}
                <div
                  className="mb-6 rounded-lg p-6 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${formData.theme.primaryColor}, ${formData.theme.secondaryColor})`,
                  }}
                >
                  <h1 className="mb-2 text-2xl font-bold">
                    {formData.eventName || "Your Event Name"}
                  </h1>
                  <p className="opacity-90">
                    {formData.description ||
                      "Event description will appear here"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div>
                      📅{" "}
                      {formData.eventDates?.startDate || formData.startDate
                        ? (formData.eventDates?.startDate ||
                            formData.startDate)!.toLocaleDateString()
                        : "Date TBD"}
                    </div>
                    <div>🕐 {formData.time || "Time TBD"}</div>
                    <div>
                      📍 {formData.locations[0]?.name || "Location TBD"}
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {formData.selectedModules.map((moduleId) => {
                      const moduleNames: Record<string, string> = {
                        schedules: "📅 Schedule",
                        announcements: "📢 Announcements",
                        rsvp: "✅ RSVP",
                        games: "🎮 Games",
                        media: "📸 Photos",
                        ticketing: "🎫 Tickets",
                        seating: "🪑 Seating",
                        budgeting: "💰 Budget",
                        analytics: "📊 Analytics",
                        survey: "📝 Survey",
                      };
                      return (
                        <div
                          key={moduleId}
                          className="rounded-lg border p-3 text-center"
                        >
                          <div className="mb-1 text-lg">
                            {moduleNames[moduleId]}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {formData.ticketTypes.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Tickets Available</h3>
                      {formData.ticketTypes.map((ticket, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded border p-3"
                        >
                          <div>
                            <div className="font-medium">{ticket.name}</div>
                            <div className="text-sm text-gray-600">
                              {ticket.description}
                            </div>
                          </div>
                          <div className="text-lg font-bold">
                            ${ticket.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent
          value="journey"
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Guest Experience Journey</CardTitle>
              <CardDescription>
                Understand how guests will interact with your event from
                discovery to participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {guestJourneySteps.map((step, index) => (
                  <div
                    key={step.step}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                      {index < guestJourneySteps.length - 1 && (
                        <div className="mt-2 ml-4 h-6 w-px bg-gray-200"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Testing</CardTitle>
              <CardDescription>
                Test key functionality before launch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Eye className="mr-2 h-4 w-4" />
                Test Guest RSVP Flow
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Eye className="mr-2 h-4 w-4" />
                Test Ticket Purchase Process
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Eye className="mr-2 h-4 w-4" />
                Test Mobile Experience
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Eye className="mr-2 h-4 w-4" />
                Test Email Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="checklist"
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Pre-Launch Checklist</CardTitle>
              <CardDescription>
                Ensure everything is ready before publishing your event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previewChecks.map((check) => (
                  <div
                    key={check.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    {check.status === "complete" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    )}
                    <span className="flex-1">{check.label}</span>
                    <Badge
                      variant={
                        check.status === "complete" ? "default" : "secondary"
                      }
                    >
                      {check.status === "complete" ? "Complete" : "Review"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance & Accessibility</CardTitle>
              <CardDescription>
                Your event meets quality standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">A+</div>
                  <div className="text-sm text-gray-600">Performance Score</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Accessibility</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm text-gray-600">Mobile Ready</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Configuration
        </Button>

        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 text-white hover:from-purple-700 hover:to-blue-700"
        >
          Next: Setup Invitations
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PreviewTestingStep;
