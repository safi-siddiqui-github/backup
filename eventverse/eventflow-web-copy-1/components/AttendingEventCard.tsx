"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { generateEventTags } from "@/utils/eventTagUtils";
import { format } from "date-fns";
import { Calendar, Clock, Globe, Lock, MapPin, Star, User } from "lucide-react";
import Image from "next/image";
import { EventFormData } from "./EnhancedEventCreationDialog";

interface AttendingEventCardProps {
  // event: {
  //   id: string;
  //   eventName: string;
  //   eventType: string;
  //   category: string;
  //   subcategory?: string;
  //   description: string;
  //   startDate: Date;
  //   endDate?: Date;
  //   time: string;
  //   locations: Array<{ name: string; address: string }>;
  //   hostId: string;
  //   hostName: string;
  //   hostRating: number;
  //   attendeeCount: number;
  //   maxCapacity: number;
  //   ticketPrice: number;
  //   currency: string;
  //   tags: string[];
  //   image: string;
  //   featured?: boolean;
  //   format: string;
  //   isPublic: boolean;
  //   ticketDetails?: {
  //     quantity: number;
  //     type: string;
  //     ticketNumbers: string[];
  //     qrCode: string;
  //     purchaseDate: string;
  //     totalPaid: number;
  //     checkedIn: boolean;
  //     checkInTime?: string;
  //   };
  //   moduleUsage?: {
  //     rsvp: {
  //       status: "confirmed" | "pending" | "declined" | "attending";
  //       responses?: any;
  //     };
  //     seating: {
  //       tableNumber?: number;
  //       seatNumber?: string;
  //       assignment?: string;
  //     };
  //     media: { photosUploaded: number; albumAccess: boolean };
  //     games: { participated: string[]; points: number; rank?: number };
  //     surveys: { completed: string[]; pending: string[] };
  //   };
  //   accessInfo?: {
  //     entryCode: string;
  //     vipAccess: boolean;
  //     specialPerks: string[];
  //     notifications: number;
  //   };
  // };
  event: Partial<EventFormData>;
  // event: Partial<MockAttendingEvent>;
  onEventSelect: (event: Partial<EventFormData>) => void;
  // onEventSelect: (event: Partial<MockAttendingEvent>) => void;
}

const AttendingEventCard = ({
  event,
  onEventSelect,
}: AttendingEventCardProps) => {
  const handleCardClick = () => {
    onEventSelect(event);
  };

  const now = new Date();
  const eventIsInPast = new Date(String(event.startDate)) < now;
  const eventIsToday =
    new Date(String(event.startDate)).toDateString() === now.toDateString();

  const ticketDetails =
    event.ticketDetails ||
    ({
      quantity: 1,
      type: "General Admission",
      totalPaid: event.ticketPrice,
      checkedIn: eventIsInPast,
    } as EventFormData["ticketDetails"]);

  // Generate dynamic tags
  const dynamicTags = generateEventTags(
    {
      category: event.category ?? "",
      eventType: event.eventType,
      subcategory: event?.subcategory ?? "",
      format: event.format ?? "",
      startDate: new Date(String(event.startDate)),
      ticketDetails: ticketDetails,
      moduleUsage: event.moduleUsage,
      maxCapacity: event.maxCapacity,
      attendeeCount: event.attendeeCount,
    },
    "attending",
    eventIsInPast,
  );

  return (
    <Card
      className="group cursor-pointer overflow-hidden border border-gray-200 bg-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg dark:border-gray-600 dark:bg-gray-700"
      onClick={handleCardClick}
    >
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-400 to-blue-500">
        {/* <img
          src={event.image}
          alt={event.eventName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        /> */}
        <Image
          src={event?.image ?? ""}
          alt={event?.eventName ?? ""}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Status Badge */}
        <Badge
          className={`absolute top-3 left-3 border-0 ${
            ticketDetails?.checkedIn
              ? "bg-green-500 text-white"
              : eventIsToday
                ? "bg-orange-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          {ticketDetails?.checkedIn
            ? "Checked In"
            : eventIsToday
              ? "Today"
              : "Confirmed"}
        </Badge>

        {/* Privacy Badge */}
        <Badge
          className={`absolute top-3 left-24 flex items-center gap-1 border-0 ${
            event.isPublic ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {event.isPublic ? (
            <>
              <Globe className="h-3 w-3" />
              Public
            </>
          ) : (
            <>
              <Lock className="h-3 w-3" />
              Private
            </>
          )}
        </Badge>

        {/* Ticket/Guest Count */}
        <Badge className="absolute top-3 right-3 border-0 bg-white/90 text-gray-700">
          {event.moduleUsage?.rsvp
            ? `${1 + Number(event?.moduleUsage?.rsvp.responses?.plusOnes || 0)} Guest${1 + Number(event.moduleUsage.rsvp.responses?.plusOnes || 0) > 1 ? "s" : ""}`
            : `${ticketDetails?.quantity} Ticket${(ticketDetails?.quantity ?? 0) > 1 ? "s" : ""}`}
        </Badge>
      </div>

      <CardContent className="p-6">
        {/* Date and Time */}
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-purple-600">
          <Calendar className="h-4 w-4" />
          <span>{format(event.startDate ?? "", "EEE, MMM d")}</span>
          <span>•</span>
          <Clock className="h-4 w-4" />
          <span>{event.time}</span>
        </div>

        {/* Event Title */}
        <h3 className="mb-3 text-xl leading-tight font-semibold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white">
          {event.eventName}
        </h3>

        {/* Location */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span
            className={
              event?.locations && event?.locations[0]?.name === "Online Event"
                ? "text-purple-600"
                : ""
            }
          >
            {event?.locations && event?.locations[0]?.name}
          </span>
        </div>

        {/* Dynamic Event Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {dynamicTags.map((tag, index) => (
            <Badge
              key={index}
              className={`text-xs ${tag.color} border-0`}
            >
              {tag.text}
            </Badge>
          ))}
        </div>

        {/* Host and Payment Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {event.hostName}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {event.hostRating}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {event.moduleUsage?.rsvp ? (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  RSVP:{" "}
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {event.moduleUsage.rsvp.status === "attending"
                    ? "Attending"
                    : event.moduleUsage.rsvp.status === "confirmed"
                      ? "Confirmed"
                      : event.moduleUsage.rsvp.status}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Paid:{" "}
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${ticketDetails?.totalPaid}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendingEventCard;
