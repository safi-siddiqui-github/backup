"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Globe, Users } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import EventNameSuggestions from "../ai/EventNameSuggestions";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const EventDetailsForm = ({ formData, onUpdate }: Props) => {
  const handleInputChange = (
    field: keyof EventFormData,
    value: string | boolean,
  ) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-3">
          <Label
            htmlFor="eventName"
            className="flex items-center gap-2 text-base font-semibold"
          >
            Event Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="eventName"
            placeholder="Enter your event name"
            value={formData.eventName}
            onChange={(e) => handleInputChange("eventName", e.target.value)}
            className="h-12 border-2 text-lg focus:border-purple-500"
          />
        </div>

        <EventNameSuggestions
          eventType={formData.eventType}
          description={formData.description}
          onSuggestionSelect={(name) => handleInputChange("eventName", name)}
          currentName={formData.eventName}
        />

        <div className="space-y-3">
          <Label className="text-base font-semibold">Event Visibility</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={cn(
                "rounded-xl border-2 p-4 text-left transition-all",
                formData.isPublic
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300",
              )}
              onClick={() => handleInputChange("isPublic", true)}
            >
              <Globe className="mb-2 h-5 w-5 text-purple-600" />
              <div className="font-medium">Public Event</div>
              <div className="text-sm text-gray-600">
                Anyone can discover and attend
              </div>
            </button>
            <button
              className={cn(
                "rounded-xl border-2 p-4 text-left transition-all",
                !formData.isPublic
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300",
              )}
              onClick={() => handleInputChange("isPublic", false)}
            >
              <Users className="mb-2 h-5 w-5 text-purple-600" />
              <div className="font-medium">Private Event</div>
              <div className="text-sm text-gray-600">Invitation only</div>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label
          htmlFor="description"
          className="text-base font-semibold"
        >
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what makes your event special..."
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="min-h-[140px] border-2 focus:border-purple-500"
        />
        <p className="text-sm text-gray-500">
          This will be shown to your guests
        </p>
      </div>
    </div>
  );
};

export default EventDetailsForm;
