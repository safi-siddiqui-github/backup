
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContentBlockEditor } from "@/components/ui/content-block-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MapPin, Users, Sparkles, Camera, Ticket, Settings2, UserCheck, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import CompactPhotoUpload from "./CompactPhotoUpload";
import RSVPConfigModal from "./RSVPConfigModal";
import TicketingConfigModal from "./TicketingConfigModal";
import ExpandableEventDetails from "./ExpandableEventDetails";
import QuickInvitationModal from "./QuickInvitationModal";

const eventTypes = [
  "Wedding", "Birthday", "Corporate", "Conference", "Workshop", 
  "Party", "Meeting", "Celebration", "Other"
];

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onCreateEvent: () => void;
  onSwitchToFull: () => void;
}

const QuickCreateStep = ({ formData, onUpdate, onCreateEvent, onSwitchToFull }: Props) => {
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
    addLocationLater: false
  });

  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showTicketingModal, setShowTicketingModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [rsvpConfig, setRSVPConfig] = useState<any>(null);
  const [ticketingConfig, setTicketingConfig] = useState<any>(null);

  const handleInputChange = (field: string, value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    
    // Update parent form data
    const updates: Partial<EventFormData> = {};
    
    if (field === 'eventName') updates.eventName = value;
    if (field === 'eventType') updates.eventType = value;
    if (field === 'description') updates.description = value;
    if (field === 'expectedAttendees') updates.expectedAttendees = value;
    if (field === 'mainPhoto') {
      updates.eventPhotos = {
        ...formData.eventPhotos,
        mainPhoto: value
      };
    }
    
    if (field === 'startDate') {
      updates.eventDates = {
        ...formData.eventDates,
        startDate: value,
        isMultiDay: false
      };
    }
    
    if (field === 'startTime') {
      updates.eventDates = {
        ...formData.eventDates,
        startTime: value
      };
    }
    
    if (field === 'location') {
      updates.locations = [{
        id: "1",
        name: value,
        address: "",
        type: "physical"
      }];
    }

    onUpdate(updates);
  };

  const handlePhotoUpdate = (photoUrl: string | null) => {
    handleInputChange('mainPhoto', photoUrl || "");
  };

  const handleRSVPConfig = (config: any) => {
    setRSVPConfig(config);
    handleInputChange('expectedAttendees', config.expectedGuests);
  };

  const handleTicketingConfig = (config: any) => {
    setTicketingConfig(config);
    const totalTickets = config.ticketTypes.reduce((sum: number, ticket: any) => sum + ticket.quantity, 0);
    handleInputChange('expectedAttendees', totalTickets);
  };

  const handleQuickCreate = () => {
    // For RSVP events, show invitation modal first
    if (localData.eventMode === "rsvp") {
      setShowInvitationModal(true);
      return;
    }
    
    // For non-RSVP events, create immediately
    createEventWithSettings();
  };

  const createEventWithSettings = () => {
    // Set quick create presets based on event mode
    const baseModules = ["schedules", "games", "announcements"];
    const eventModeModule = localData.eventMode === "rsvp" ? "rsvp" : "ticketing";
    
    const quickCreateUpdates: Partial<EventFormData> = {
      selectedModules: [...baseModules, eventModeModule],
      moduleConfigurations: {
        [eventModeModule]: localData.eventMode === "rsvp" 
          ? { 
              maxAttendees: rsvpConfig?.maxAttendees || 60,
              basicForm: true,
              ...rsvpConfig 
            }
          : {
              ticketTypes: ticketingConfig?.ticketTypes || [],
              currency: ticketingConfig?.currency || "USD"
            },
        games: {
          maxGames: 3,
          basicTemplatesOnly: true
        },
        schedules: {
          singleDay: true,
          basicTimeline: true
        }
      },
      maxAttendees: localData.eventMode === "rsvp" 
        ? (rsvpConfig?.maxAttendees || 60)
        : (ticketingConfig?.ticketTypes?.reduce((sum: number, ticket: any) => sum + ticket.quantity, 0) || 100),
      status: 'published'
    };

    onUpdate(quickCreateUpdates);
    onCreateEvent();
  };

  const handleSendInvitations = (emails: string[]) => {
    // Here you would implement the actual invitation sending logic
    console.log("Sending invitations to:", emails);
    
    // Create the event after invitations are sent
    createEventWithSettings();
  };

  const handleSkipInvitations = () => {
    // Create the event without sending invitations
    createEventWithSettings();
  };

  const isFormValid = localData.eventName && localData.eventType && localData.startDate && (localData.location || localData.addLocationLater);
  const hasEventModeConfig = localData.eventMode === "rsvp" ? rsvpConfig : ticketingConfig;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Quick Event Setup</h2>
        </div>
        <p className="text-muted-foreground">Create a comprehensive event with essential features</p>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
          <strong>Includes:</strong> Photo Upload • {localData.eventMode === "rsvp" ? "RSVP System" : "Ticketing System"} • Schedule • Games • Announcements • Event Details
        </div>
      </div>

      {/* Event Photo Upload */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Event Photo
        </Label>
        <CompactPhotoUpload
          mainPhoto={localData.mainPhoto}
          onPhotoUpdate={handlePhotoUpdate}
          className="w-full"
        />
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="eventName" className="text-sm font-medium">Event Name *</Label>
            <Input
              id="eventName"
              placeholder="My Amazing Event"
              value={localData.eventName}
              onChange={(e) => handleInputChange('eventName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="eventType" className="text-sm font-medium">Event Type *</Label>
            <Select value={localData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Event Mode Toggle */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Event Registration Type *</Label>
            <div className="flex items-center space-x-4 p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <UserCheck className={`w-4 h-4 ${localData.eventMode === 'rsvp' ? 'text-primary' : 'text-muted-foreground'}`} />
                <Label htmlFor="rsvp-mode" className="cursor-pointer">RSVP Event</Label>
                <Switch
                  id="rsvp-mode"
                  checked={localData.eventMode === 'rsvp'}
                  onCheckedChange={(checked) => setLocalData(prev => ({ ...prev, eventMode: checked ? 'rsvp' : 'ticketing' }))}
                />
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Ticket className={`w-4 h-4 ${localData.eventMode === 'ticketing' ? 'text-primary' : 'text-muted-foreground'}`} />
                <Label htmlFor="ticket-mode" className="cursor-pointer">Ticketed Event</Label>
                <Switch
                  id="ticket-mode"
                  checked={localData.eventMode === 'ticketing'}
                  onCheckedChange={(checked) => setLocalData(prev => ({ ...prev, eventMode: checked ? 'ticketing' : 'rsvp' }))}
                />
              </div>
            </div>
            
            {/* Configuration Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => localData.eventMode === 'rsvp' ? setShowRSVPModal(true) : setShowTicketingModal(true)}
              className="w-full"
            >
              <Settings2 className="w-4 h-4 mr-2" />
              Configure {localData.eventMode === 'rsvp' ? 'RSVP' : 'Ticketing'} Settings
              {hasEventModeConfig && <span className="ml-2 text-green-600">✓</span>}
            </Button>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <ContentBlockEditor
              blocks={formData.descriptionBlocks || []}
              onChange={(blocks) => onUpdate({ descriptionBlocks: blocks })}
              placeholder="Brief description of your event..."
              showAISuggestions={true}
              className="min-h-[120px]"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="startDate" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Event Date *
            </Label>
            <Input
              id="startDate"
              type="date"
              value={localData.startDate ? localData.startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleInputChange('startDate', new Date(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="startTime" className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={localData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location {!localData.addLocationLater && "*"}
            </Label>
            <Input
              id="location"
              placeholder="Event venue or address"
              value={localData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="mt-1"
              disabled={localData.addLocationLater}
            />
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="add-location-later"
                checked={localData.addLocationLater}
                onCheckedChange={(checked) => {
                  setLocalData(prev => ({ 
                    ...prev, 
                    addLocationLater: !!checked,
                    location: checked ? "" : prev.location
                  }));
                }}
              />
              <Label 
                htmlFor="add-location-later" 
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Add location later
              </Label>
            </div>
          </div>

          {hasEventModeConfig && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">
                {localData.eventMode === 'rsvp' 
                  ? `Expected: ${rsvpConfig?.expectedGuests || 0} guests (Max: ${rsvpConfig?.maxAttendees || 0})`
                  : `Total tickets: ${ticketingConfig?.ticketTypes?.reduce((sum: number, ticket: any) => sum + ticket.quantity, 0) || 0}`
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Event Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Additional Event Details</h3>
        </div>
        <ExpandableEventDetails
          formData={formData}
          onUpdate={onUpdate}
        />
      </div>

      {/* Requirements Checklist */}
      {(!isFormValid || !hasEventModeConfig) && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
            <h4 className="font-semibold text-amber-900 dark:text-amber-200">Complete these requirements to create your event:</h4>
          </div>
          <div className="space-y-2">
            <div className={`flex items-center gap-2 text-sm ${localData.eventName ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-300'}`}>
              {localData.eventName ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
              <span>Event Name</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${localData.eventType ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-300'}`}>
              {localData.eventType ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
              <span>Event Type</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${localData.startDate ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-300'}`}>
              {localData.startDate ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
              <span>Event Date</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${(localData.location || localData.addLocationLater) ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-300'}`}>
              {(localData.location || localData.addLocationLater) ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
              <span>Location</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${hasEventModeConfig ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-300'}`}>
              {hasEventModeConfig ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
              <span>{localData.eventMode === 'rsvp' ? 'RSVP' : 'Ticketing'} Configuration</span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
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

      <QuickInvitationModal
        isOpen={showInvitationModal}
        onClose={handleSkipInvitations}
        onSendInvitations={handleSendInvitations}
        eventName={localData.eventName}
      />
    </div>
  );
};

export default QuickCreateStep;
