"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RSVPConfig, TicketingConfig } from "@/types/rsvp";
import {
  Calendar,
  Camera,
  Clock,
  Lightbulb,
  MapPin,
  Settings2,
  Sparkles,
  Ticket,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import CompactPhotoUpload from "./CompactPhotoUpload";
import ExpandableEventDetails from "./ExpandableEventDetails";
import RSVPConfigModal from "./RSVPConfigModal";
import TicketingConfigModal from "./TicketingConfigModal";

const eventTypes = [
  "Wedding",
  "Birthday",
  "Corporate",
  "Conference",
  "Workshop",
  "Party",
  "Meeting",
  "Celebration",
  "Other",
];

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onCreateEvent: () => void;
  onSwitchToFull: () => void;
}

const QuickCreateStep = ({
  formData,
  onUpdate,
  onCreateEvent,
  onSwitchToFull,
}: Props) => {
  const [localData, setLocalData] = useState({
    eventName: formData.eventName || "",
    eventType: formData.eventType || "",
    description: formData.description || "",
    startDate: formData.eventDates.startDate || null,
    startTime: formData.eventDates.startTime || "",
    location: formData.locations[0]?.name || "",
    expectedAttendees: formData.expectedAttendees || 30,
    mainPhoto: formData.eventPhotos?.mainPhoto || "",
    eventMode: "rsvp" as "rsvp" | "ticketing",
  });

  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showTicketingModal, setShowTicketingModal] = useState(false);
  const [rsvpConfig, setRSVPConfig] = useState<Partial<RSVPConfig> | undefined>(
    undefined,
  );
  const [ticketingConfig, setTicketingConfig] = useState<
    Partial<TicketingConfig> | undefined
  >(undefined);

  const handleInputChange = (field: string, value: string) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));

    // Update parent form data
    const updates: Partial<EventFormData> = {};

    if (field === "eventName") updates.eventName = value;
    if (field === "eventType") updates.eventType = value;
    if (field === "description") updates.description = value;
    if (field === "expectedAttendees")
      updates.expectedAttendees = Number(value);
    if (field === "mainPhoto") {
      updates.eventPhotos = {
        ...formData.eventPhotos,
        mainPhoto: value,
      };
    }

    if (field === "startDate") {
      updates.eventDates = {
        ...formData.eventDates,
        startDate: new Date(String(value)),
        isMultiDay: false,
      };
    }

    if (field === "startTime") {
      updates.eventDates = {
        ...formData.eventDates,
        startTime: value,
      };
    }

    if (field === "location") {
      updates.locations = [
        {
          id: "1",
          name: value,
          address: "",
          type: "physical",
        },
      ];
    }

    onUpdate(updates);
  };

  const handlePhotoUpdate = (photoUrl: string | null) => {
    handleInputChange("mainPhoto", photoUrl || "");
  };

  const handleRSVPConfig = (config: RSVPConfig) => {
    setRSVPConfig(config);
    handleInputChange("expectedAttendees", String(config?.expectedGuests));
  };

  const handleTicketingConfig = (config: TicketingConfig) => {
    setTicketingConfig(config);
    const totalTickets = config?.ticketTypes?.reduce(
      (sum: number, ticket) => sum + (ticket?.quantity ?? 0),
      0,
    );
    handleInputChange("expectedAttendees", String(totalTickets));
  };

  const handleQuickCreate = () => {
    // Set quick create presets based on event mode
    const baseModules = ["schedules", "games", "announcements"];
    const eventModeModule =
      localData.eventMode === "rsvp" ? "rsvp" : "ticketing";

    const quickCreateUpdates: Partial<EventFormData> = {
      selectedModules: [...baseModules, eventModeModule],
      moduleConfigurations: {
        [eventModeModule]:
          localData.eventMode === "rsvp"
            ? {
                maxAttendees: rsvpConfig?.maxAttendees || 60,
                basicForm: true,
                ...rsvpConfig,
              }
            : {
                ticketTypes: ticketingConfig?.ticketTypes || [],
                currency: ticketingConfig?.currency || "USD",
              },
        games: {
          maxGames: 3,
          basicTemplatesOnly: true,
        },
        schedules: {
          singleDay: true,
          basicTimeline: true,
        },
      },
      maxAttendees:
        localData.eventMode === "rsvp"
          ? rsvpConfig?.maxAttendees || 60
          : ticketingConfig?.ticketTypes?.reduce(
              (sum: number, ticket) => sum + (ticket?.quantity ?? 0),
              0,
            ) || 100,
      status: "published",
    };

    onUpdate(quickCreateUpdates);
    onCreateEvent();
  };

  const isFormValid =
    localData.eventName &&
    localData.eventType &&
    localData.startDate &&
    localData.location;
  const hasEventModeConfig =
    localData.eventMode === "rsvp" ? rsvpConfig : ticketingConfig;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles className="text-primary h-6 w-6" />
          <h2 className="text-2xl font-bold">Quick Event Setup</h2>
        </div>
        <p className="text-muted-foreground">
          Create a comprehensive event with essential features
        </p>
        <div className="bg-primary/10 border-primary/20 rounded-lg border p-3 text-sm">
          <strong>Includes:</strong> Photo Upload •{" "}
          {localData.eventMode === "rsvp" ? "RSVP System" : "Ticketing System"}{" "}
          • Schedule • Games • Announcements • Event Details
        </div>
      </div>

      {/* Event Photo Upload */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Camera className="h-4 w-4" />
          Event Photo
        </Label>
        <CompactPhotoUpload
          mainPhoto={localData.mainPhoto}
          onPhotoUpdate={handlePhotoUpdate}
          className="w-full"
        />
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="eventName"
              className="text-sm font-medium"
            >
              Event Name *
            </Label>
            <Input
              id="eventName"
              placeholder="My Amazing Event"
              value={localData.eventName}
              onChange={(e) => handleInputChange("eventName", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="eventType"
              className="text-sm font-medium"
            >
              Event Type *
            </Label>
            <Select
              value={localData.eventType}
              onValueChange={(value) => handleInputChange("eventType", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Event Mode Toggle */}
          {localData.eventType && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Event Registration Type *
              </Label>
              <div className="flex items-center space-x-4 rounded-lg border p-3">
                <div className="flex items-center space-x-2">
                  <UserCheck
                    className={`h-4 w-4 ${localData.eventMode === "rsvp" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <Label
                    htmlFor="rsvp-mode"
                    className="cursor-pointer"
                  >
                    RSVP Event
                  </Label>
                  <Switch
                    id="rsvp-mode"
                    checked={localData.eventMode === "rsvp"}
                    onCheckedChange={(checked) =>
                      setLocalData((prev) => ({
                        ...prev,
                        eventMode: checked ? "rsvp" : "ticketing",
                      }))
                    }
                  />
                </div>
                <Separator
                  orientation="vertical"
                  className="h-6"
                />
                <div className="flex items-center space-x-2">
                  <Ticket
                    className={`h-4 w-4 ${localData.eventMode === "ticketing" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <Label
                    htmlFor="ticket-mode"
                    className="cursor-pointer"
                  >
                    Ticketed Event
                  </Label>
                  <Switch
                    id="ticket-mode"
                    checked={localData.eventMode === "ticketing"}
                    onCheckedChange={(checked) =>
                      setLocalData((prev) => ({
                        ...prev,
                        eventMode: checked ? "ticketing" : "rsvp",
                      }))
                    }
                  />
                </div>
              </div>

              {/* Configuration Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  localData.eventMode === "rsvp"
                    ? setShowRSVPModal(true)
                    : setShowTicketingModal(true)
                }
                className="w-full"
              >
                <Settings2 className="mr-2 h-4 w-4" />
                Configure{" "}
                {localData.eventMode === "rsvp" ? "RSVP" : "Ticketing"} Settings
                {hasEventModeConfig && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
              </Button>
            </div>
          )}

          <div>
            <Label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of your event..."
              value={localData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="startDate"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Calendar className="h-4 w-4" />
              Event Date *
            </Label>
            <Input
              id="startDate"
              type="date"
              value={
                localData.startDate
                  ? localData.startDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                handleInputChange(
                  "startDate",
                  new Date(e.target.value).toDateString(),
                )
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="startTime"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Clock className="h-4 w-4" />
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={localData.startTime}
              onChange={(e) => handleInputChange("startTime", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="location"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <MapPin className="h-4 w-4" />
              Location *
            </Label>
            <Input
              id="location"
              placeholder="Event venue or address"
              value={localData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="mt-1"
            />
          </div>

          {hasEventModeConfig && (
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-muted-foreground text-sm">
                {localData.eventMode === "rsvp"
                  ? `Expected: ${rsvpConfig?.expectedGuests || 0} guests (Max: ${rsvpConfig?.maxAttendees || 0})`
                  : `Total tickets: ${ticketingConfig?.ticketTypes?.reduce((sum: number, ticket) => sum + (ticket?.quantity ?? 0), 0) || 0}`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Event Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-primary h-5 w-5" />
          <h3 className="text-lg font-semibold">Additional Event Details</h3>
        </div>
        <ExpandableEventDetails
          formData={formData}
          onUpdate={onUpdate}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row">
        <Button
          variant="outline"
          onClick={onSwitchToFull}
          className="flex-1"
        >
          Switch to Full Setup
        </Button>
        <Button
          onClick={handleQuickCreate}
          disabled={!isFormValid || !hasEventModeConfig}
          className="flex-1"
        >
          Create Event Instantly
        </Button>
      </div>

      {/* Modals */}
      <RSVPConfigModal
        isOpen={showRSVPModal}
        onClose={() => setShowRSVPModal(false)}
        onSave={handleRSVPConfig}
        initialConfig={rsvpConfig}
      />

      <TicketingConfigModal
        isOpen={showTicketingModal}
        onClose={() => setShowTicketingModal(false)}
        onSave={handleTicketingConfig}
        initialConfig={ticketingConfig}
      />
    </div>
  );
};

export default QuickCreateStep;
