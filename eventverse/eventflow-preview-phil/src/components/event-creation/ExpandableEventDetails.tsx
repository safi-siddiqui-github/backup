import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Clock, Users, MapPin, HelpCircle, Star, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import AgeRestrictionsField from "./AgeRestrictionsField";
import CheckInTimeField from "./CheckInTimeField";
import ParkingInfoField from "./ParkingInfoField";
import EventFAQsField from "./EventFAQsField";
import SpecialGuestsManager from "./SpecialGuestsManager";
import { VendorBoothSettingsField } from './VendorBoothSettingsField';
import { EventFormData } from "../EnhancedEventCreationDialog";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const ExpandableEventDetails = ({ formData, onUpdate }: Props) => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    {
      id: "logistics",
      title: "Event Logistics",
      description: "Age restrictions, check-in times, and parking details",
      icon: Clock,
      color: "bg-blue-50 border-blue-200",
      fields: ["ageRestrictions", "checkIn", "parking"]
    },
    {
      id: "vendors",
      title: "Vendor Booths & Marketplace",
      description: "Configure vendor booth options and pricing",
      icon: Store,
      color: "bg-orange-50 border-orange-200",
      fields: ["vendorBooths"]
    },
    {
      id: "guests",
      title: "Special Guests & VIPs",
      description: "Speakers, performers, and notable attendees",
      icon: Star,
      color: "bg-purple-50 border-purple-200",
      fields: ["specialGuests"]
    },
    {
      id: "resources",
      title: "Event Resources",
      description: "FAQs and additional information for attendees",
      icon: HelpCircle,
      color: "bg-green-50 border-green-200",
      fields: ["faqs"]
    }
  ];

  const handleDetailUpdate = (section: string, data: any) => {
    if (section === "vendorBooths") {
      onUpdate({ vendorBoothSettings: data });
    } else {
      onUpdate({
        additionalDetails: {
          ...formData.additionalDetails,
          [section]: data
        }
      });
    }
  };

  // Count filled fields in each section
  const getFilledFieldsCount = (sectionFields: string[]) => {
    if (!formData.additionalDetails && sectionFields[0] !== "vendorBooths") return 0;
    
    return sectionFields.reduce((count, field) => {
      if (field === "vendorBooths") {
        if (formData.vendorBoothSettings?.allowVendorBooths && formData.vendorBoothSettings?.boothTypes?.length > 0) return count + 1;
        return count;
      }
      
      const fieldData = formData.additionalDetails?.[field];
      if (field === "ageRestrictions" && fieldData?.hasRestrictions) return count + 1;
      if (field === "checkIn" && fieldData?.hasCustomCheckIn) return count + 1;
      if (field === "parking" && fieldData?.hasParkingInfo) return count + 1;
      if (field === "faqs" && fieldData?.length > 0) return count + 1;
      if (field === "specialGuests" && fieldData?.length > 0) return count + 1;
      return count;
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-foreground mb-2">Additional Event Details</h4>
        <p className="text-sm text-muted-foreground">
          Optional information to enhance your event experience
        </p>
      </div>

      {sections.map((section) => {
        const Icon = section.icon;
        const isOpen = openSections.includes(section.id);
        const filledCount = getFilledFieldsCount(section.fields);
        const totalFields = section.fields.length;

        return (
          <Card key={section.id} className={cn("border-2 transition-colors", section.color)}>
            <Collapsible open={isOpen} onOpenChange={() => toggleSection(section.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          {section.title}
                          {filledCount > 0 && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                              {filledCount}/{totalFields}
                            </span>
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0 space-y-6">
                  {section.id === "logistics" && (
                    <>
                      <AgeRestrictionsField
                        data={formData.additionalDetails?.ageRestrictions}
                        onUpdate={(data) => handleDetailUpdate("ageRestrictions", data)}
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

                  {section.id === "vendors" && (
                    <VendorBoothSettingsField
                      data={formData.vendorBoothSettings}
                      onUpdate={(data) => handleDetailUpdate("vendorBooths", data)}
                    />
                  )}

                  {section.id === "guests" && (
                    <SpecialGuestsManager
                      data={formData.additionalDetails?.specialGuests || []}
                      onUpdate={(data) => handleDetailUpdate("specialGuests", data)}
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
