"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CalendarDays } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import AIThemeGenerator from "./AIThemeGenerator";
import CompactPhotoUpload from "./CompactPhotoUpload";
import DateTimeManager from "./DateTimeManager";
import ExpandableEventDetails from "./ExpandableEventDetails";
import LocationManager from "./LocationManager";
import ModernEventTypeSelector from "./ModernEventTypeSelector";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
}

const EventBasicsStep = ({ formData, onUpdate, onNext }: Props) => {
  const canProceed =
    formData.eventName &&
    formData.eventType &&
    formData?.eventDates?.startDate &&
    formData?.locations &&
    formData?.locations[0].name;

  const handleMainPhotoUpdate = (photoId: string | null) => {
    onUpdate({
      eventPhotos: {
        ...formData.eventPhotos,
        mainPhoto: photoId,
      },
    });
  };

  return (
    <div className="space-y-8 p-6">
      <div className="mb-8 text-center">
        <CalendarDays className="mx-auto mb-4 h-12 w-12 text-purple-600" />
        <h3 className="mb-2 text-2xl font-bold text-gray-900">Event Basics</h3>
        <p className="text-gray-600">
          Let&apos;s start with the fundamentals of your event
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="eventName"
              className="text-base font-semibold"
            >
              Event Name *
            </Label>
            <Input
              id="eventName"
              value={formData.eventName}
              onChange={(e) => onUpdate({ eventName: e.target.value })}
              placeholder="Enter your event name"
              className="mt-2"
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-base font-semibold"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Describe your event..."
              className="mt-2"
              rows={4}
            />
          </div>
        </div>

        <div className="space-y-6">
          <CompactPhotoUpload
            mainPhoto={formData.eventPhotos?.mainPhoto || null}
            onPhotoUpdate={handleMainPhotoUpdate}
          />
        </div>
      </div>

      {/* Full-width Event Type Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Event Type *</Label>
        <ModernEventTypeSelector
          selectedType={formData?.eventType ?? ""}
          onTypeSelect={(type) => onUpdate({ eventType: type })}
        />
      </div>

      <div className="border-t border-gray-200 pt-8">
        <AIThemeGenerator
          formData={formData}
          onUpdate={onUpdate}
        />
      </div>

      <div className="space-y-6">
        <DateTimeManager
          formData={formData}
          onUpdate={onUpdate}
        />

        <LocationManager
          formData={formData}
          onUpdate={onUpdate}
        />
      </div>

      {/* Additional Event Details - Expandable Section */}
      <div className="border-t border-gray-200 pt-8">
        <ExpandableEventDetails
          formData={formData}
          onUpdate={onUpdate}
        />
      </div>

      <div className="flex justify-end pt-6">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2"
        >
          Continue to Features
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EventBasicsStep;
