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
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Eye,
  Rocket,
  Save,
  Users,
} from "lucide-react";
import { useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import EventCardPreview from "./EventCardPreview";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onSaveAsDraft: () => void;
  onPublish: () => void;
  onBack: () => void;
  onEditStep?: (stepNumber: number) => void;
}

type LaunchOptionType = "draft" | "soft" | "full";

const LaunchMonitoringStep = ({
  formData,
  onUpdate,
  onSaveAsDraft,
  onPublish,
  onBack,
  onEditStep,
}: Props) => {
  const [launchOption, setLaunchOption] = useState<LaunchOptionType>("draft");

  const launchOptions = [
    {
      id: "draft",
      title: "Save as Draft",
      description:
        "Save your event privately. You can continue editing and publish later.",
      icon: Save,
      color: "gray",
      features: [
        "Private and editable",
        "No guest access",
        "Perfect for planning",
      ],
    },
    {
      id: "soft",
      title: "Soft Launch",
      description:
        "Launch to a small group first to test everything works perfectly.",
      icon: Eye,
      color: "yellow",
      features: ["Limited audience", "Test functionality", "Gather feedback"],
    },
    {
      id: "full",
      title: "Full Launch",
      description: "Make your event live and start inviting all your guests!",
      icon: Rocket,
      color: "green",
      features: [
        "Public or private listing",
        "Send invitations",
        "Full functionality",
      ],
    },
  ];

  const readinessChecks = [
    {
      id: "basics",
      label: "Event basics completed",
      status:
        formData.eventName && formData.eventType ? "complete" : "incomplete",
    },
    {
      id: "modules",
      label: "Modules selected and configured",
      status: formData.selectedModules.length > 0 ? "complete" : "incomplete",
    },
    {
      id: "invitations",
      label: "Invitation settings configured",
      status:
        formData.invitationSettings?.method?.length > 0
          ? "complete"
          : "incomplete",
    },
    { id: "preview", label: "Event preview reviewed", status: "complete" },
  ];

  const monitoringFeatures = [
    {
      icon: Users,
      title: "Guest Analytics",
      description: "Track RSVPs, attendance, and engagement",
    },
    {
      icon: Calendar,
      title: "Event Timeline",
      description: "Monitor progress and key milestones",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get alerts for important updates",
    },
    {
      icon: BarChart3,
      title: "Performance Insights",
      description: "Detailed reports and metrics",
    },
  ];

  const allChecksComplete = readinessChecks.every(
    (check) => check.status === "complete",
  );

  const handleLaunch = () => {
    if (launchOption === "draft") {
      onSaveAsDraft();
    } else {
      onUpdate({
        status: "published",
        softLaunch: launchOption === "soft",
        analytics: true,
      });
      onPublish();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">
          Ready to Launch? 🚀
        </h2>
        <p className="text-gray-600">
          Choose how you want to launch your amazing event
        </p>
      </div>

      {/* Readiness Check */}
      <Card
        className={
          allChecksComplete
            ? "border-green-200 bg-green-50"
            : "border-yellow-200 bg-yellow-50"
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {allChecksComplete ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            )}
            Pre-Launch Readiness
          </CardTitle>
          <CardDescription>
            {allChecksComplete
              ? "Everything looks great! Your event is ready to launch."
              : "Please review the items below before launching."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {readinessChecks.map((check) => (
              <div
                key={check.id}
                className="flex items-center gap-3 rounded-lg bg-white p-3"
              >
                {check.status === "complete" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
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

      {/* Event Card Preview */}
      <EventCardPreview
        formData={formData}
        onEditStep={onEditStep}
      />

      {/* Launch Options */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Choose Your Launch Strategy
        </h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {launchOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = launchOption === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setLaunchOption(option.id as LaunchOptionType)}
                className={`rounded-xl border-2 p-6 text-left transition-all hover:shadow-lg ${
                  isSelected
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg p-2 ${
                        option.color === "gray"
                          ? "bg-gray-100"
                          : option.color === "yellow"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          option.color === "gray"
                            ? "text-gray-600"
                            : option.color === "yellow"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800">
                      {option.title}
                    </h4>
                  </div>

                  <p className="text-sm text-gray-600">{option.description}</p>

                  <ul className="space-y-1">
                    {option.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isSelected && (
                    <Badge className="bg-purple-100 text-purple-700">
                      Selected
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Monitoring & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Post-Launch Monitoring
          </CardTitle>
          <CardDescription>
            Track your event&apos;s success with comprehensive analytics and
            insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {monitoringFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-3 rounded-lg border p-4"
                >
                  <Icon className="mt-1 h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {feature.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Event Summary */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="pt-6">
          <h4 className="mb-4 font-semibold text-purple-800">
            🎉 Event Summary
          </h4>
          <div className="grid grid-cols-1 gap-4 text-sm lg:grid-cols-2">
            <div>
              <strong>Event:</strong> {formData.eventName || "Untitled Event"}
              <br />
              <strong>Type:</strong> {formData.eventType || "Not specified"}
              <br />
              <strong>Date:</strong>{" "}
              {formData.eventDates?.startDate || formData.startDate
                ? (formData.eventDates?.startDate ||
                    formData.startDate)!.toLocaleDateString()
                : "TBD"}
              <br />
              <strong>Location:</strong> {formData.locations[0]?.name || "TBD"}
            </div>
            <div>
              <strong>Modules:</strong> {formData.selectedModules.length}{" "}
              selected
              <br />
              <strong>Expected Guests:</strong> {formData.expectedAttendees}
              <br />
              <strong>Visibility:</strong>{" "}
              {formData.isPublic ? "Public" : "Private"}
              <br />
              <strong>Invitation Methods:</strong>{" "}
              {formData.invitationSettings?.method?.length || 0} configured
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation & Launch */}
      <div className="flex justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Invitations
        </Button>

        <div className="flex gap-3">
          {launchOption !== "draft" && (
            <Button
              variant="outline"
              onClick={onSaveAsDraft}
              className="px-6"
            >
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
          )}

          <Button
            onClick={handleLaunch}
            disabled={!allChecksComplete && launchOption !== "draft"}
            className={`px-8 text-white ${
              launchOption === "draft"
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            }`}
          >
            {launchOption === "draft" && <Save className="mr-2 h-4 w-4" />}
            {launchOption === "soft" && <Eye className="mr-2 h-4 w-4" />}
            {launchOption === "full" && <Rocket className="mr-2 h-4 w-4" />}
            {launchOption === "draft"
              ? "Save Draft"
              : launchOption === "soft"
                ? "Soft Launch"
                : "Launch Event"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LaunchMonitoringStep;
