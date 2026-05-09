"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Calendar,
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit3,
  Eye,
  HelpCircle,
  MapPin,
  Users,
} from "lucide-react";
import { useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface Props {
  formData: EventFormData;
  onEditStep?: (stepNumber: number) => void;
}

// Convert form data to PublicEventCard format
const convertFormDataToEvent = (formData: EventFormData) => {
  return {
    id: "preview",
    name: formData.eventName || "Your Event Name",
    type: formData.eventType || "Event",
    category: formData.eventType || "Event",
    description:
      formData.description || "Event description will appear here...",
    startDate:
      formData.eventDates?.startDate || formData.startDate || new Date(),
    endDate: formData.eventDates?.endDate || formData.endDate,
    time: formData.eventDates?.startTime || formData.time || "TBD",
    location:
      (formData?.locations && formData?.locations[0]?.name) || "Location TBD",
    host: "Event Host",
    attendees: formData.expectedAttendees || 0,
    maxAttendees: formData.maxAttendees || formData.expectedAttendees || 100,
    price: formData.ticketTypes?.[0]?.price || 0,
    tags: [formData.eventType].filter(Boolean),
    image: formData.eventPhotos?.mainPhoto || "/placeholder.svg",
    featured: false,
    format:
      formData?.locations &&
      (formData?.locations[0]?.type === "virtual"
        ? "virtual"
        : formData?.locations[0]?.type === "hybrid"
          ? "hybrid"
          : "in-person"),
    isPublic: formData.isPublic,
    plusOneAllowed: false,
  };
};

const EventCardPreview = ({ formData, onEditStep }: Props) => {
  const [viewMode, setViewMode] = useState<"minimal" | "detailed">("minimal");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const eventData = convertFormDataToEvent(formData);

  // Minimal card rendering (essential info only)
  const renderMinimalCard = () => {
    const isVirtual = eventData.format === "virtual";
    const spotsLeft = (eventData.maxAttendees || 0) - eventData.attendees;
    const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0;

    return (
      <Card className="group cursor-pointer bg-white transition-shadow hover:shadow-lg">
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={eventData.image}
              alt={eventData.name}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Featured Badge */}
          {eventData.featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
              Featured
            </Badge>
          )}

          {/* Save Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 bg-white/90 p-0 hover:bg-white"
          >
            ♡
          </Button>
        </div>

        <CardContent className="space-y-4 p-6">
          {/* Date and Time */}
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>📅</span>
            <span>
              {eventData.startDate?.toLocaleDateString()} • {eventData.time}
            </span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-lg leading-tight font-semibold">
            {eventData.name}
          </h3>

          {/* Location */}
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>{isVirtual ? "🌐" : "📍"}</span>
            <span className="truncate">{eventData.location}</span>
          </div>

          {/* Basic Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{eventData.category}</Badge>
            <Badge variant="outline">{eventData.format}</Badge>
            {isAlmostFull && (
              <Badge
                variant="destructive"
                className="text-xs"
              >
                Almost Full!
              </Badge>
            )}
          </div>

          {/* Attendees and Price */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-muted-foreground text-sm">
              {eventData.attendees} attending
            </div>
            <div className="text-right">
              {eventData.price > 0 ? (
                <span className="text-lg font-bold">${eventData.price}</span>
              ) : (
                <Badge
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700"
                >
                  Free
                </Badge>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Button
            className="w-full"
            disabled
          >
            <Eye className="mr-2 h-4 w-4" />
            Get Tickets
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Detailed card rendering (comprehensive info)
  const renderDetailedCard = () => {
    const isVirtual = eventData.format === "virtual";
    const spotsLeft = (eventData.maxAttendees || 0) - eventData.attendees;
    const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0;

    return (
      <Card className="group cursor-pointer bg-white transition-shadow hover:shadow-lg">
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={eventData.image}
              alt={eventData.name}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Featured Badge */}
          {eventData.featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
              Featured
            </Badge>
          )}

          {/* Save Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 bg-white/90 p-0 hover:bg-white"
          >
            ♡
          </Button>
        </div>

        <CardContent className="space-y-4 p-6">
          {/* Event Category Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{eventData.category}</Badge>
            <Badge variant="outline">{eventData.format}</Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl leading-tight font-semibold">
            {eventData.name}
          </h3>

          {/* Event Description */}
          {formData.description && (
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="line-clamp-3 text-sm leading-relaxed text-gray-700">
                {formData.description}
              </p>
            </div>
          )}

          {/* Date and Time */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span className="font-medium">
              {eventData.startDate?.toLocaleDateString()} • {eventData.time}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-purple-600" />
            <span className="font-medium">{eventData.location}</span>
          </div>

          {/* Host */}
          <div className="flex items-center gap-2 text-sm">
            <span>👤</span>
            <span className="text-muted-foreground">Hosted by</span>
            <span className="font-medium">{eventData.host}</span>
          </div>

          {/* Attendees Info */}
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {eventData.attendees} attending • {spotsLeft} spots left
              </span>
            </div>
            {isAlmostFull && (
              <Badge
                variant="destructive"
                className="text-xs"
              >
                Almost Full!
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-3 text-center">
            {eventData.price > 0 ? (
              <div>
                <span className="text-2xl font-bold text-purple-700">
                  ${eventData.price}
                </span>
                <p className="mt-1 text-xs text-purple-600">per ticket</p>
              </div>
            ) : (
              <div>
                <Badge
                  variant="outline"
                  className="border-green-300 bg-green-100 px-4 py-2 text-lg text-green-800"
                >
                  Free Event
                </Badge>
              </div>
            )}
          </div>

          {/* Additional Details Sections */}
          {(formData.additionalDetails?.ageRestrictions?.hasRestrictions ||
            formData.additionalDetails?.checkIn?.hasCustomCheckIn ||
            formData.additionalDetails?.parking?.hasParkingInfo ||
            (formData?.additionalDetails?.specialGuests
              ? formData?.additionalDetails?.specialGuests?.length
              : 0) > 0 ||
            (formData?.additionalDetails?.faqs
              ? formData?.additionalDetails?.faqs?.length
              : 0) > 0) && (
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">
                Event Details
              </h4>

              {/* Age Restrictions */}
              {formData.additionalDetails?.ageRestrictions?.hasRestrictions && (
                <div className="rounded-lg bg-orange-50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-orange-600">
                      Age Requirements
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="border-orange-300 bg-orange-100 text-orange-700"
                    >
                      {formData.additionalDetails.ageRestrictions
                        .restrictionType === "minimum" &&
                        `${formData.additionalDetails.ageRestrictions.minAge}+ Only`}
                      {formData.additionalDetails.ageRestrictions
                        .restrictionType === "maximum" &&
                        `Under ${formData.additionalDetails.ageRestrictions.maxAge}`}
                      {formData.additionalDetails.ageRestrictions
                        .restrictionType === "range" &&
                        `Ages ${formData.additionalDetails.ageRestrictions.minAge}-${formData.additionalDetails.ageRestrictions.maxAge}`}
                      {formData.additionalDetails.ageRestrictions
                        .restrictionType === "exact" &&
                        `Age ${formData.additionalDetails.ageRestrictions.minAge} Only`}
                    </Badge>
                    {formData.additionalDetails.ageRestrictions
                      .requiresGuardian && (
                      <Badge
                        variant="outline"
                        className="border-orange-300 bg-orange-100 text-orange-700"
                      >
                        Guardian Required
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Special Guests */}
              {(formData.additionalDetails?.specialGuests
                ? formData.additionalDetails?.specialGuests?.length
                : 0) > 0 && (
                <Collapsible
                  open={expandedSection === "guests"}
                  onOpenChange={(open) =>
                    setExpandedSection(open ? "guests" : null)
                  }
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3 transition-colors hover:bg-purple-100">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-800">
                          Featured Speakers (
                          {formData?.additionalDetails?.specialGuests?.length})
                        </span>
                      </div>
                      {expandedSection === "guests" ? (
                        <ChevronUp className="h-4 w-4 text-purple-600" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-3 rounded-lg border border-purple-200 bg-white p-3">
                      {formData?.additionalDetails?.specialGuests?.map(
                        (guest) => (
                          <div
                            key={guest.id}
                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 font-semibold text-white">
                              {guest?.name?.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {guest.name}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {guest.title}
                              </p>
                              {guest.bio && (
                                <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                                  {guest.bio}
                                </p>
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Check-in Information */}
              {formData.additionalDetails?.checkIn?.hasCustomCheckIn && (
                <Collapsible
                  open={expandedSection === "checkin"}
                  onOpenChange={(open) =>
                    setExpandedSection(open ? "checkin" : null)
                  }
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 transition-colors hover:bg-blue-100">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          Check-in:{" "}
                          {formData.additionalDetails.checkIn.checkInTime}
                        </span>
                      </div>
                      {expandedSection === "checkin" ? (
                        <ChevronUp className="h-4 w-4 text-blue-600" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-2 rounded-lg border border-blue-200 bg-white p-3">
                      {formData.additionalDetails.checkIn.bufferTime && (
                        <p className="text-sm">
                          • {formData.additionalDetails.checkIn.bufferTime}{" "}
                          minute buffer time
                        </p>
                      )}
                      {formData.additionalDetails.checkIn.earlyCheckIn && (
                        <p className="text-sm">• Early check-in allowed</p>
                      )}
                      {formData.additionalDetails.checkIn
                        .checkInInstructions && (
                        <p className="text-sm">
                          •{" "}
                          {
                            formData.additionalDetails.checkIn
                              .checkInInstructions
                          }
                        </p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Parking Information */}
              {formData.additionalDetails?.parking?.hasParkingInfo && (
                <Collapsible
                  open={expandedSection === "parking"}
                  onOpenChange={(open) =>
                    setExpandedSection(open ? "parking" : null)
                  }
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 transition-colors hover:bg-green-100">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          {formData.additionalDetails.parking.parkingType ===
                          "free"
                            ? "Free Parking"
                            : formData.additionalDetails.parking.parkingType ===
                                "paid"
                              ? `Parking $${formData.additionalDetails.parking.parkingCost}`
                              : `${formData.additionalDetails.parking.parkingType} Parking`}
                        </span>
                      </div>
                      {expandedSection === "parking" ? (
                        <ChevronUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-2 rounded-lg border border-green-200 bg-white p-3">
                      {formData.additionalDetails.parking
                        .reservationRequired && (
                        <p className="text-sm">• Reservation required</p>
                      )}
                      {formData.additionalDetails.parking
                        .validationAvailable && (
                        <p className="text-sm">
                          • Parking validation available
                        </p>
                      )}
                      {formData.additionalDetails.parking.parkingDetails && (
                        <p className="text-sm">
                          • {formData.additionalDetails.parking.parkingDetails}
                        </p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* FAQs */}
              {(formData?.additionalDetails?.faqs
                ? formData?.additionalDetails?.faqs?.length
                : 0) > 0 && (
                <Collapsible
                  open={expandedSection === "faqs"}
                  onOpenChange={(open) =>
                    setExpandedSection(open ? "faqs" : null)
                  }
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3 transition-colors hover:bg-yellow-100">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">
                          Frequently Asked Questions (
                          {formData?.additionalDetails?.faqs?.length})
                        </span>
                      </div>
                      {expandedSection === "faqs" ? (
                        <ChevronUp className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-3 rounded-lg border border-yellow-200 bg-white p-3">
                      {formData?.additionalDetails?.faqs?.map((faq) => (
                        <div
                          key={faq.id}
                          className="rounded-lg border border-gray-200 p-3"
                        >
                          <p className="mb-2 text-sm font-medium">
                            {faq.question}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button
            className="w-full"
            disabled
          >
            <Eye className="mr-2 h-4 w-4" />
            Get Tickets
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-600" />
            Event Card Preview
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "minimal" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("minimal")}
            >
              Minimal Card
            </Button>
            <Button
              variant={viewMode === "detailed" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("detailed")}
            >
              Detailed Card
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          {viewMode === "minimal"
            ? "Minimal view - how your event appears in quick browse situations"
            : "Detailed view - comprehensive event information with description and all details"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Preview Container */}
          <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-6">
            <div className="mx-auto max-w-md transition-all duration-300">
              {viewMode === "minimal"
                ? renderMinimalCard()
                : renderDetailedCard()}
            </div>
          </div>

          {/* Quick Edit Actions */}
          <div className="flex flex-wrap gap-2 border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditStep?.(1)}
              className="text-xs"
            >
              <Edit3 className="mr-1 h-3 w-3" />
              Edit Basics
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditStep?.(3)}
              className="text-xs"
            >
              <Edit3 className="mr-1 h-3 w-3" />
              Change Photo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditStep?.(4)}
              className="text-xs"
            >
              <Edit3 className="mr-1 h-3 w-3" />
              Edit Details
            </Button>
          </div>

          {/* Missing Data Warnings */}
          {(!formData.eventName ||
            !formData.eventPhotos?.mainPhoto ||
            !(formData?.locations && formData?.locations[0]?.name)) && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <p className="mb-2 text-sm font-medium text-yellow-800">
                To improve your event card:
              </p>
              <ul className="space-y-1 text-xs text-yellow-700">
                {!formData.eventName && <li>• Add a compelling event name</li>}
                {!formData.eventPhotos?.mainPhoto && (
                  <li>• Add a main event photo to attract more guests</li>
                )}
                {!(formData.locations && formData.locations[0]?.name) && (
                  <li>• Add event location details</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCardPreview;
