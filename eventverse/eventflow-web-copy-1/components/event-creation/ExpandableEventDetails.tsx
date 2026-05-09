"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  HelpCircle,
  Star,
} from "lucide-react";
import { ElementType, useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import AgeRestrictionsField from "./AgeRestrictionsField";
import CheckInTimeField from "./CheckInTimeField";
import EventFAQsField from "./EventFAQsField";
import ParkingInfoField from "./ParkingInfoField";
import SpecialGuestsManager from "./SpecialGuestsManager";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const ExpandableEventDetails = ({ formData, onUpdate }: Props) => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  type EventSectionsType = {
    id?: string;
    title?: string;
    description?: string;
    icon: ElementType;
    color?: string;
    fields: (keyof EventFormData["additionalDetails"])[];
  };

  const sections: EventSectionsType[] = [
    {
      id: "logistics",
      title: "Event Logistics",
      description: "Age restrictions, check-in times, and parking details",
      icon: Clock,
      color: "bg-blue-50 border-blue-200",
      fields: ["ageRestrictions", "checkIn", "parking"],
    },
    {
      id: "guests",
      title: "Special Guests & VIPs",
      description: "Speakers, performers, and notable attendees",
      icon: Star,
      color: "bg-purple-50 border-purple-200",
      fields: ["specialGuests"],
    },
    {
      id: "resources",
      title: "Event Resources",
      description: "FAQs and additional information for attendees",
      icon: HelpCircle,
      color: "bg-green-50 border-green-200",
      fields: ["faqs"],
    },
  ];

  const handleDetailUpdate = <
    K extends keyof EventFormData["additionalDetails"],
  >(
    section: K,
    data: Partial<EventFormData["additionalDetails"][K]>,
  ) => {
    onUpdate({
      additionalDetails: {
        ...formData.additionalDetails,
        [section]: data,
      },
    });
  };

  type AdditionalDetails = typeof formData.additionalDetails;

  /*
  // Count filled fields in each section
  const getFilledFieldsCount = (sectionFields: string[]) => {
    // const getFilledFieldsCount = (
    //   sectionFields: AdditionalDetails[]
    // ) => {
    if (!formData.additionalDetails) return 0;

    return sectionFields?.reduce((count, field) => {
      const fieldData = formData?.additionalDetails[field];
      if (field === "ageRestrictions" && fieldData?.hasRestrictions)
        return count + 1;
      if (field === "checkIn" && fieldData?.hasCustomCheckIn) return count + 1;
      if (field === "parking" && fieldData?.hasParkingInfo) return count + 1;
      if (field === "faqs" && fieldData?.length > 0) return count + 1;
      if (field === "specialGuests" && fieldData?.length > 0) return count + 1;
      return count;
    }, 0);
  };
  */

  const getFilledFieldsCount = (
    sectionFields: (keyof typeof formData.additionalDetails)[],
  ) => {
    if (!formData.additionalDetails) return 0;

    return sectionFields.reduce((count, field) => {
      const details = formData.additionalDetails;

      if (
        field === "ageRestrictions" &&
        details.ageRestrictions.hasRestrictions
      )
        return count + 1;

      if (field === "checkIn" && details.checkIn.hasCustomCheckIn)
        return count + 1;

      if (field === "parking" && details.parking.hasParkingInfo)
        return count + 1;

      if (field === "faqs" && details.faqs.length > 0) return count + 1;

      if (field === "specialGuests" && details.specialGuests.length > 0)
        return count + 1;

      return count;
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="mb-6 text-center">
        <h4 className="text-foreground mb-2 text-lg font-semibold">
          Additional Event Details
        </h4>
        <p className="text-muted-foreground text-sm">
          Optional information to enhance your event experience
        </p>
      </div>

      {sections.map((section) => {
        const Icon = section.icon;
        const isOpen = openSections.includes(section?.id ?? "");
        const filledCount = getFilledFieldsCount(section.fields);
        const totalFields = section.fields.length;

        return (
          <Card
            key={section.id}
            className={cn("border-2 transition-colors", section.color)}
          >
            <Collapsible
              open={isOpen}
              onOpenChange={() => toggleSection(section?.id ?? "")}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="hover:bg-muted/30 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white p-2 shadow-sm">
                        <Icon className="text-primary h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <CardTitle className="flex items-center gap-2 text-base font-semibold">
                          {section.title}
                          {filledCount > 0 && (
                            <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                              {filledCount}/{totalFields}
                            </span>
                          )}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-6 pt-0">
                  {section.id === "logistics" && (
                    <>
                      <AgeRestrictionsField
                        data={formData.additionalDetails?.ageRestrictions}
                        onUpdate={(data) =>
                          handleDetailUpdate("ageRestrictions", data)
                        }
                      />
                      <CheckInTimeField
                        data={formData.additionalDetails?.checkIn}
                        onUpdate={(data) => handleDetailUpdate("checkIn", data)}
                      />
                      <ParkingInfoField
                        data={formData.additionalDetails?.parking}
                        onUpdate={(data) => handleDetailUpdate("parking", data)}
                      />
                    </>
                  )}

                  {section.id === "guests" && (
                    <SpecialGuestsManager
                      data={formData.additionalDetails?.specialGuests || []}
                      onUpdate={(data) =>
                        handleDetailUpdate("specialGuests", data)
                      }
                    />
                  )}

                  {section.id === "resources" && (
                    <EventFAQsField
                      data={formData.additionalDetails?.faqs || []}
                      onUpdate={(data) => handleDetailUpdate("faqs", data)}
                    />
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};

export default ExpandableEventDetails;
