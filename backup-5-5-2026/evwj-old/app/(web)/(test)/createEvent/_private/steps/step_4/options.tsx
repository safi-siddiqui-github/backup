import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    ChevronDown,
    ChevronRight,
    Clock,
    HelpCircle,
    Star,
    Store,
    Sparkles,
} from "lucide-react";
import { useState } from "react";
import { EventFormData } from "../../types/types";
import FeatureEventField from "./FeatureEventField";
import AgeRestrictionsField from "./AgeRestrictionsField";
import CheckInTimeField from "./CheckInTimeField";
import ParkingInfoField from "./ParkingInfoField";
import { VendorBoothSettingsField } from "./VendorBoothSettingsField";
import SpecialGuestsManager from "./SpecialGuestsManager";
import EventFAQsField from "./EventFAQsField";
 

type Props = {
    formData: EventFormData;
    onUpdate: (updates: Partial<EventFormData>) => void;
}

export default function ExpandableEventDetails   ({ formData, onUpdate }: Props)   {
    const [openSections, setOpenSections] = useState<string[]>([]);

    const toggleSection = (sectionId: string) => {
        setOpenSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId],
        );
    };

    const sections = [
        {
            id: "feature",
            title: "Feature Event",
            description: "Get premium placement and increased visibility",
            icon: Sparkles,
            fields: ["featureEvent"],
        },
        {
            id: "logistics",
            title: "Event Logistics",
            description: "Age restrictions, check-in, and parking",
            icon: Clock,
            fields: ["ageRestrictions", "checkIn", "parking"],
        },
        {
            id: "vendors",
            title: "Vendor Booths & Marketplace",
            description: "Configure vendor booth options and pricing",
            icon: Store,
            fields: ["vendorBooths"],
        },
        {
            id: "guests",
            title: "Special Guests & VIPs",
            description: "Speakers, performers, and notable attendees",
            icon: Star,
            fields: ["specialGuests"],
        },
        {
            id: "faqs",
            title: "FAQs",
            description: "Frequently asked questions for attendees",
            icon: HelpCircle,
            fields: ["faqs"],
        },
    ];

    const handleDetailUpdate = (section: string, data: unknown) => {
        if (section === "vendorBooths") {
            // onUpdate({ vendorBoothSettings: data });
        } else {
            onUpdate({
                additionalDetails: {
                    ...formData.additionalDetails,
                    [section]: data,
                },
            });
        }
    };

    // Count filled fields in each section
    const getFilledFieldsCount = (sectionFields: string[]) => {
        if (!formData.additionalDetails && sectionFields[0] !== "vendorBooths" && sectionFields[0] !== "featureEvent")
            return 0;

        return sectionFields.reduce((count, field) => {
            if (field === "vendorBooths") {
                if (
                    formData.vendorBoothSettings?.allowVendorBooths &&
                    formData.vendorBoothSettings?.boothTypes?.length > 0
                )
                    return count + 1;
                return count;
            }

            if (field === "featureEvent") {
                if (formData.additionalDetails?.featureEvent?.isFeatured) return count + 1;
                return count;
            }

            // ...existing code...
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
                const isOpen = openSections.includes(section.id);
                const filledCount = getFilledFieldsCount(section.fields);
                const totalFields = section.fields.length;

                return (
                    <Card
                        key={section.id}
                        className="border-2 transition-colors !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
                    >
                        <Collapsible
                            open={isOpen}
                            onOpenChange={() => toggleSection(section.id)}
                        >
                            <CollapsibleTrigger asChild>
                                <CardHeader className="hover:bg-muted/30 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
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
                                        <Button variant="ghost" size="sm">
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
                                    {section.id === "feature" && (
                                        <FeatureEventField
                                            data={
                                                formData.additionalDetails?.featureEvent
                                                    ? {
                                                        ...formData.additionalDetails.featureEvent,
                                                        featureType:
                                                            formData.additionalDetails.featureEvent.featureType === "single" ||
                                                            formData.additionalDetails.featureEvent.featureType === "recurring"
                                                                ? formData.additionalDetails.featureEvent.featureType
                                                                : "single",
                                                    }
                                                    : undefined
                                            }
                                            eventDate={formData.eventDates?.startDate || formData.startDate}
                                            onUpdate={(data) => handleDetailUpdate("featureEvent", data)}
                                        />
                                    )}

                                    {section.id === "logistics" && (
                                        <>
                                            <AgeRestrictionsField
                                                data={formData.additionalDetails?.ageRestrictions}
                                                onUpdate={(data) =>
                                                    handleDetailUpdate("ageRestrictions", data)
                                                }
                                            />
                                            {/* <CheckInTimeField
                                                data={formData.additionalDetails?.checkIn}
                                                onUpdate={(data) => handleDetailUpdate("checkIn", data)}
                                            />
                                            <ParkingInfoField
                                                data={formData.additionalDetails?.parking}
                                                onUpdate={(data) => handleDetailUpdate("parking", data)}
                                            /> */}
                                        </>
                                    )}

                                    {section.id === "vendors" && (
                                        <VendorBoothSettingsField
                                            data={formData.vendorBoothSettings}
                                            onUpdate={(data) =>
                                                handleDetailUpdate("vendorBooths", data)
                                            }
                                        />
                                    )}

                                    {section.id === "guests" && (
                                        <SpecialGuestsManager
                                            data={formData.additionalDetails?.specialGuests || []}
                                            onUpdate={(data) =>
                                                handleDetailUpdate("specialGuests", data)
                                            }
                                        />
                                    )}

                                    {section.id === "faqs" && (
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
 
