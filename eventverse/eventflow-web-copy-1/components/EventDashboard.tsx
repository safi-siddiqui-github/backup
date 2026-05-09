"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getModuleById,
  ModuleDefinition,
  moduleRegistry,
} from "@/config/moduleRegistry";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  ArrowLeft,
  CloudSun,
  Edit,
  Eye,
  EyeOff,
  Lock,
  Settings,
  Share,
} from "lucide-react";
import { ElementType, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { EventModelType, ModuleMappingType } from "@/types/general";
import ModuleActivationDialog from "./ModuleActivationDialog";

const EventDashboard = ({
  event,
  onBack,
  onEdit,
}: {
  event: EventModelType;
  onBack: () => void;
  onEdit: () => void;
}) => {
  // const navigate = useNavigate();
  const navigate = () => {};
  const { toast } = useToast();
  const [activationModule, setActivationModule] =
    useState<ModuleDefinition | null>(null);
  const [eventModules, setEventModules] = useState<string[] | undefined>(
    event.selectedModules,
  );

  // Ensure announcements module is always included
  const allSelectedModules = eventModules?.includes("announcements")
    ? eventModules
    : [...(eventModules ?? []), "announcements"];

  const handleModuleActivation = (moduleId: string) => {
    const updatedModules = [...(eventModules ?? []), moduleId];
    setEventModules(updatedModules);

    // Update the event object for persistence
    // event?.selectedModules = updatedModules;
    // }

    toast({
      title: "Module Activated",
      description: `${getModuleById(moduleId)?.name} is now available for your event.`,
    });
  };

  const formatEventDate = () => {
    if (event.endDate && event.endDate !== event.startDate) {
      return `${format(String(event?.startDate), "MMM d")} - ${format(event.endDate, "MMM d, yyyy")}`;
    }
    return format(String(event?.startDate), "MMMM d, yyyy");
  };

  const handleModuleClick = (moduleId: string) => {
    // Handle legacy module ID mappings for consistency
    const moduleMapping: Record<string, string> = {
      schedules: "schedule",
      budgeting: "budget",
    };

    const mappedId = moduleMapping[moduleId] || moduleId;

    // Navigate to module page with event context
    // navigate(`/modules/${mappedId}?eventId=${event.id}`);
  };

  const moduleMapping: ModuleMappingType = {
    schedules: "schedule",
    budgeting: "budget",
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="gradient-header bg-card border-border border-b shadow-sm dark:shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-accent p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-foreground text-2xl font-bold">
                  {event.eventName}
                </h1>
                <p className="text-muted-foreground">{event.eventType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Status Badges */}
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className={
                    event.status === "published"
                      ? "border-green-200 bg-green-100 text-green-800"
                      : "border-yellow-200 bg-yellow-100 text-yellow-800"
                  }
                >
                  {event.status === "published" ? "Published" : "Draft"}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    event.isPublic
                      ? "border-blue-200 bg-blue-100 text-blue-800"
                      : "border-gray-200 bg-gray-100 text-gray-800"
                  }
                >
                  <div className="flex items-center gap-1">
                    {event.isPublic ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                    {event.isPublic ? "Public" : "Private"}
                  </div>
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  className="border-border hover:bg-accent"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-accent"
                >
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-accent"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Event Info Card */}
          <div className="lg:col-span-1">
            <Card className="gradient-card bg-card border-border mb-6 shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.description && (
                  <div className="mb-4">
                    <p className="text-muted-foreground text-sm">Description</p>
                    <p className="text-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Date</p>
                    <p className="text-foreground font-medium">
                      {formatEventDate()}
                    </p>
                    {event.time && (
                      <p className="text-muted-foreground text-sm">
                        at {event.time}
                      </p>
                    )}
                  </div>
                  <div className="border-border flex items-center gap-2 rounded-lg border bg-blue-50 px-3 py-2 dark:bg-blue-950/50">
                    <CloudSun className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      {event.weather?.temperature}°C
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-foreground font-medium">Locations:</h3>
                  {event?.locations?.map((location, index) => (
                    <div
                      key={index}
                      className="group relative"
                    >
                      <div className="bg-muted border-border hover:bg-accent/40 cursor-pointer rounded-lg border p-3 transition-colors">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <p className="text-foreground font-medium">
                            {location.name}
                          </p>
                          <div className="flex items-center gap-1">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                location.source === "marketplace"
                                  ? "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                                  : location.source === "manual"
                                    ? "border-gray-200 bg-gray-50 text-gray-700 dark:bg-gray-950/50 dark:text-gray-300"
                                    : "border-green-200 bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300"
                              }`}
                            >
                              {location.source === "marketplace"
                                ? "🏪 Marketplace"
                                : location.source === "manual"
                                  ? "✏️ Custom"
                                  : "📍 Location"}
                            </Badge>
                            {location.sections &&
                              location.sections.length > 0 && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {location.sections.length} section
                                  {location.sections.length > 0 ? "s" : ""}
                                </Badge>
                              )}
                          </div>
                        </div>
                        {location.address && (
                          <p className="text-muted-foreground text-sm">
                            {location.address}
                          </p>
                        )}
                        {location.source === "marketplace" &&
                          location.vendorName && (
                            <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                              by {location.vendorName}
                            </p>
                          )}
                      </div>

                      {/* Hover Tooltip for Sections */}
                      {location.sections && location.sections.length > 0 && (
                        <div className="border-border pointer-events-none absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border bg-white p-3 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-800">
                          <h4 className="text-foreground mb-2 text-sm font-medium">
                            Sections in {location.name}
                          </h4>
                          <div className="space-y-2">
                            {location.sections.map((section, sectionIndex) => (
                              <div
                                key={sectionIndex}
                                className="flex items-center justify-between text-xs"
                              >
                                <div>
                                  <span className="text-foreground font-medium">
                                    {section.name}
                                  </span>
                                  {section.description && (
                                    <span className="text-muted-foreground ml-2">
                                      • {section.description}
                                    </span>
                                  )}
                                </div>
                                {section.capacity && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {section.capacity} capacity
                                  </Badge>
                                )}
                              </div>
                            ))}
                            <div className="mt-2 border-t pt-2">
                              <span className="text-muted-foreground text-xs">
                                Total capacity:{" "}
                                {location.sections.reduce(
                                  (sum, section) =>
                                    sum + (section.capacity || 0),
                                  0,
                                ) || "Not specified"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-border flex items-center justify-between border-t pt-3">
                  <span className="text-muted-foreground text-sm">Status:</span>
                  <Badge
                    variant="secondary"
                    className="border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-200"
                  >
                    Planning
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="gradient-card bg-card border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">
                  Quick Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">RSVPs</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      3
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Schedule Items
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      2
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Budget Spent</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      $0
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modules Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-foreground mb-2 text-xl font-semibold">
                Event Modules
              </h2>
              <p className="text-muted-foreground">
                Manage all aspects of your event
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(() => {
                // Separate selected and unselected modules
                const selectedModules = moduleRegistry.filter((moduleData) => {
                  const moduleMapping: ModuleMappingType = {
                    schedule: "schedules",
                    budget: "budgeting",
                  };
                  const eventModuleId =
                    moduleMapping[moduleData?.id ?? "rsvp"] || moduleData.id;
                  return (
                    allSelectedModules.includes(eventModuleId ?? "") ||
                    allSelectedModules.includes(moduleData?.id ?? "")
                  );
                });

                const unselectedModules = moduleRegistry.filter(
                  (moduleData) => {
                    const moduleMapping: ModuleMappingType = {
                      schedule: "schedules",
                      budget: "budgeting",
                    };
                    const eventModuleId =
                      moduleMapping[moduleData.id ?? "rsvp"] || moduleData.id;
                    return !(
                      allSelectedModules.includes(eventModuleId ?? "") ||
                      allSelectedModules.includes(moduleData.id ?? "")
                    );
                  },
                );

                // Combine with selected modules first
                const sortedModules = [
                  ...selectedModules,
                  ...unselectedModules,
                ];

                return sortedModules.map((moduleData) => {
                  // Handle legacy module ID mappings for selected modules
                  const moduleMapping: ModuleMappingType = {
                    schedule: "schedules",
                    budget: "budgeting",
                  };

                  const eventModuleId =
                    moduleMapping[moduleData.id ?? "rsvp"] || moduleData.id;
                  const isSelected =
                    allSelectedModules?.includes(eventModuleId ?? "") ||
                    allSelectedModules?.includes(moduleData.id ?? "");
                  const Icon = moduleData.icon as ElementType;
                  const isFree =
                    moduleData.id === "schedule" ||
                    moduleData.id === "announcements" ||
                    moduleData.id === "rsvp";

                  return (
                    <Card
                      key={moduleData.id}
                      onClick={() => {
                        if (isSelected) {
                          handleModuleClick(eventModuleId ?? "");
                        } else {
                          setActivationModule(moduleData);
                        }
                      }}
                      className={`gradient-card border-border cursor-pointer shadow-sm transition-all duration-200 ${
                        isSelected
                          ? "bg-card hover:bg-accent/50 hover:scale-105 hover:shadow-md"
                          : "bg-card/50 relative opacity-60 grayscale-[0.5] hover:opacity-75 hover:grayscale-[0.2]"
                      } `}
                    >
                      {/* Lock Overlay for Unselected Modules */}
                      {!isSelected && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/10 opacity-0 transition-opacity hover:opacity-100">
                          <div className="rounded-full bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                            <Lock className="h-6 w-6 text-gray-600" />
                          </div>
                        </div>
                      )}

                      {/* Lock Icon in Corner for Locked Modules */}
                      {!isSelected && (
                        <div className="absolute top-3 right-3 z-20 rounded-full bg-gray-500/80 p-1.5 backdrop-blur-sm">
                          <Lock className="h-3 w-3 text-white" />
                        </div>
                      )}

                      <CardHeader className="pb-4 text-center">
                        <div
                          className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl ${
                            isSelected
                              ? isFree
                                ? "bg-green-500"
                                : moduleData.color
                              : "bg-gray-400"
                          }`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle
                          className={`text-lg ${isSelected ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {moduleData.name}
                        </CardTitle>
                        {isSelected && isFree && (
                          <Badge
                            variant="secondary"
                            className="mx-auto w-fit border-green-200 bg-green-100 text-green-800"
                          >
                            Free
                          </Badge>
                        )}
                        {!isSelected && (
                          <Badge
                            variant="outline"
                            className="mx-auto w-fit border-orange-200 bg-orange-100 text-xs text-orange-800"
                          >
                            Activate
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`mx-auto w-fit text-xs ${isSelected ? "border-border" : "border-gray-300"}`}
                        >
                          {moduleData.category}
                        </Badge>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p
                          className={`text-sm ${isSelected ? "text-muted-foreground" : "text-gray-500"}`}
                        >
                          {moduleData.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Module Activation Dialog */}
      <ModuleActivationDialog
        open={!!activationModule}
        onClose={() => setActivationModule(null)}
        module={activationModule}
        onActivate={handleModuleActivation}
      />
    </div>
  );
};

export default EventDashboard;
