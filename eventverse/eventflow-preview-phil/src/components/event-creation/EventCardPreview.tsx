import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Eye, Edit3, Users, MapPin, Clock, Calendar, Car, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    description: formData.description || "Event description will appear here...",
    startDate: formData.eventDates?.startDate ? new Date(formData.eventDates.startDate) : 
               formData.startDate ? new Date(formData.startDate) : new Date(),
    endDate: formData.eventDates?.endDate || formData.endDate,
    time: formData.eventDates?.startTime || formData.time || "TBD",
    location: formData.locations[0]?.name || "Location TBD",
    host: "Event Host",
    attendees: formData.expectedAttendees || 0,
    maxAttendees: formData.maxAttendees || formData.expectedAttendees || 100,
    price: formData.ticketTypes?.[0]?.price || 0,
    tags: [formData.eventType].filter(Boolean),
    image: formData.eventPhotos?.mainPhoto || "/placeholder.svg",
    featured: false,
    format: formData.locations[0]?.type === 'virtual' ? 'virtual' : 
             formData.locations[0]?.type === 'hybrid' ? 'hybrid' : 'in-person',
    isPublic: formData.isPublic,
    plusOneAllowed: false
  };
};

const EventCardPreview = ({ formData, onEditStep }: Props) => {
  const [viewMode, setViewMode] = useState<'minimal' | 'detailed'>('minimal');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const eventData = convertFormDataToEvent(formData);
  
  // Minimal card rendering (essential info only)
  const renderMinimalCard = () => {
    const isVirtual = eventData.format === 'virtual';
    const spotsLeft = (eventData.maxAttendees || 0) - eventData.attendees;
    const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0;

    return (
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow bg-white">
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={eventData.image}
              alt={eventData.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            ♡
          </Button>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Date and Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>📅</span>
            <span>
              {eventData.startDate instanceof Date ? eventData.startDate.toLocaleDateString() : 'TBD'} • {eventData.time}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {eventData.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{isVirtual ? '🌐' : '📍'}</span>
            <span className="truncate">{eventData.location}</span>
          </div>

          {/* Basic Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{eventData.category}</Badge>
            <Badge variant="outline">{eventData.format}</Badge>
            {isAlmostFull && (
              <Badge variant="destructive" className="text-xs">
                Almost Full!
              </Badge>
            )}
          </div>

          {/* Attendees and Price */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              {eventData.attendees} attending
            </div>
            <div className="text-right">
              {eventData.price > 0 ? (
                <span className="font-bold text-lg">${eventData.price}</span>
              ) : (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Free
                </Badge>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full" disabled>
            <Eye className="w-4 h-4 mr-2" />
            Get Tickets
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Detailed card rendering (comprehensive info)
  const renderDetailedCard = () => {
    const isVirtual = eventData.format === 'virtual';
    const spotsLeft = (eventData.maxAttendees || 0) - eventData.attendees;
    const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0;

    return (
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow bg-white">
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={eventData.image}
              alt={eventData.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            ♡
          </Button>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Event Category Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{eventData.category}</Badge>
            <Badge variant="outline">{eventData.format}</Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-xl leading-tight">
            {eventData.name}
          </h3>

          {/* Event Description */}
          {formData.description && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                {formData.description}
              </p>
            </div>
          )}

          {/* Date and Time */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="font-medium">
              {eventData.startDate instanceof Date ? eventData.startDate.toLocaleDateString() : 'TBD'} • {eventData.time}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="font-medium">{eventData.location}</span>
          </div>

          {/* Host */}
          <div className="flex items-center gap-2 text-sm">
            <span>👤</span>
            <span className="text-muted-foreground">Hosted by</span>
            <span className="font-medium">{eventData.host}</span>
          </div>

          {/* Attendees Info */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {eventData.attendees} attending • {spotsLeft} spots left
              </span>
            </div>
            {isAlmostFull && (
              <Badge variant="destructive" className="text-xs">
                Almost Full!
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            {eventData.price > 0 ? (
              <div>
                <span className="text-2xl font-bold text-purple-700">${eventData.price}</span>
                <p className="text-xs text-purple-600 mt-1">per ticket</p>
              </div>
            ) : (
              <div>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-lg px-4 py-2">
                  Free Event
                </Badge>
              </div>
            )}
          </div>

          {/* Additional Details Sections */}
          {(formData.additionalDetails?.ageRestrictions?.hasRestrictions || 
            formData.additionalDetails?.checkIn?.hasCustomCheckIn ||
            formData.additionalDetails?.parking?.hasParkingInfo ||
            formData.additionalDetails?.specialGuests?.length > 0 ||
            formData.additionalDetails?.faqs?.length > 0) && (
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-sm text-gray-900">Event Details</h4>
              
              {/* Age Restrictions */}
              {formData.additionalDetails?.ageRestrictions?.hasRestrictions && (
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-orange-600 font-medium text-sm">Age Requirements</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                      {formData.additionalDetails.ageRestrictions.restrictionType === 'minimum' && 
                        `${formData.additionalDetails.ageRestrictions.minAge}+ Only`}
                      {formData.additionalDetails.ageRestrictions.restrictionType === 'maximum' && 
                        `Under ${formData.additionalDetails.ageRestrictions.maxAge}`}
                      {formData.additionalDetails.ageRestrictions.restrictionType === 'range' && 
                        `Ages ${formData.additionalDetails.ageRestrictions.minAge}-${formData.additionalDetails.ageRestrictions.maxAge}`}
                      {formData.additionalDetails.ageRestrictions.restrictionType === 'exact' && 
                        `Age ${formData.additionalDetails.ageRestrictions.minAge} Only`}
                    </Badge>
                    {formData.additionalDetails.ageRestrictions.requiresGuardian && (
                      <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                        Guardian Required
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Special Guests */}
              {formData.additionalDetails?.specialGuests?.length > 0 && (
                <Collapsible 
                  open={expandedSection === 'guests'} 
                  onOpenChange={(open) => setExpandedSection(open ? 'guests' : null)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-purple-800">
                          Featured Speakers ({formData.additionalDetails.specialGuests.length})
                        </span>
                      </div>
                      {expandedSection === 'guests' ? <ChevronUp className="w-4 h-4 text-purple-600" /> : <ChevronDown className="w-4 h-4 text-purple-600" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-3 p-3 bg-white border border-purple-200 rounded-lg">
                      {formData.additionalDetails.specialGuests.map((guest) => (
                        <div key={guest.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {guest.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{guest.name}</p>
                            <p className="text-xs text-muted-foreground">{guest.title}</p>
                            {guest.bio && (
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{guest.bio}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Check-in Information */}
              {formData.additionalDetails?.checkIn?.hasCustomCheckIn && (
                <Collapsible 
                  open={expandedSection === 'checkin'} 
                  onOpenChange={(open) => setExpandedSection(open ? 'checkin' : null)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          Check-in: {formData.additionalDetails.checkIn.checkInTime}
                        </span>
                      </div>
                      {expandedSection === 'checkin' ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-blue-600" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="p-3 bg-white border border-blue-200 rounded-lg space-y-2">
                      {formData.additionalDetails.checkIn.bufferTime && (
                        <p className="text-sm">• {formData.additionalDetails.checkIn.bufferTime} minute buffer time</p>
                      )}
                      {formData.additionalDetails.checkIn.earlyCheckIn && (
                        <p className="text-sm">• Early check-in allowed</p>
                      )}
                      {formData.additionalDetails.checkIn.checkInInstructions && (
                        <p className="text-sm">• {formData.additionalDetails.checkIn.checkInInstructions}</p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Parking Information */}
              {formData.additionalDetails?.parking?.hasParkingInfo && (
                <Collapsible 
                  open={expandedSection === 'parking'} 
                  onOpenChange={(open) => setExpandedSection(open ? 'parking' : null)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          {formData.additionalDetails.parking.parkingType === 'free' ? 'Free Parking' :
                           formData.additionalDetails.parking.parkingType === 'paid' ? `Parking $${formData.additionalDetails.parking.parkingCost}` :
                           `${formData.additionalDetails.parking.parkingType} Parking`}
                        </span>
                      </div>
                      {expandedSection === 'parking' ? <ChevronUp className="w-4 h-4 text-green-600" /> : <ChevronDown className="w-4 h-4 text-green-600" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="p-3 bg-white border border-green-200 rounded-lg space-y-2">
                      {formData.additionalDetails.parking.reservationRequired && (
                        <p className="text-sm">• Reservation required</p>
                      )}
                      {formData.additionalDetails.parking.validationAvailable && (
                        <p className="text-sm">• Parking validation available</p>
                      )}
                      {formData.additionalDetails.parking.parkingDetails && (
                        <p className="text-sm">• {formData.additionalDetails.parking.parkingDetails}</p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* FAQs */}
              {formData.additionalDetails?.faqs?.length > 0 && (
                <Collapsible 
                  open={expandedSection === 'faqs'} 
                  onOpenChange={(open) => setExpandedSection(open ? 'faqs' : null)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">
                          Frequently Asked Questions ({formData.additionalDetails.faqs.length})
                        </span>
                      </div>
                      {expandedSection === 'faqs' ? <ChevronUp className="w-4 h-4 text-yellow-600" /> : <ChevronDown className="w-4 h-4 text-yellow-600" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-3 p-3 bg-white border border-yellow-200 rounded-lg">
                      {formData.additionalDetails.faqs.map((faq) => (
                        <div key={faq.id} className="p-3 border border-gray-200 rounded-lg">
                          <p className="font-medium text-sm mb-2">{faq.question}</p>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button className="w-full" disabled>
            <Eye className="w-4 h-4 mr-2" />
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
            <Eye className="w-5 h-5 text-purple-600" />
            Event Card Preview
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'minimal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('minimal')}
            >
              Minimal Card
            </Button>
            <Button
              variant={viewMode === 'detailed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('detailed')}
            >
              Detailed Card
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {viewMode === 'minimal' 
            ? "Minimal view - how your event appears in quick browse situations"
            : "Detailed view - comprehensive event information with description and all details"
          }
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Preview Container */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="mx-auto max-w-md transition-all duration-300">
              {viewMode === 'minimal' ? renderMinimalCard() : renderDetailedCard()}
            </div>
          </div>

          {/* Quick Edit Actions */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditStep?.(1)}
              className="text-xs"
            >
              <Edit3 className="w-3 h-3 mr-1" />
              Edit Basics
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditStep?.(3)}
              className="text-xs"
            >
              <Edit3 className="w-3 h-3 mr-1" />
              Change Photo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditStep?.(4)}
              className="text-xs"
            >
              <Edit3 className="w-3 h-3 mr-1" />
              Edit Details
            </Button>
          </div>

          {/* Missing Data Warnings */}
          {(!formData.eventName || !formData.eventPhotos?.mainPhoto || !formData.locations[0]?.name) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800 font-medium mb-2">
                To improve your event card:
              </p>
              <ul className="text-xs text-yellow-700 space-y-1">
                {!formData.eventName && (
                  <li>• Add a compelling event name</li>
                )}
                {!formData.eventPhotos?.mainPhoto && (
                  <li>• Add a main event photo to attract more guests</li>
                )}
                {!formData.locations[0]?.name && (
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