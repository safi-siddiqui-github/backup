"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Star,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { Routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import TicketPurchaseDialog from "./TicketPurchaseDialog";

interface PublicEventCardProps {
  event: {
    id: string;
    eventName: string;
    eventType: string;
    category: string;
    subcategory?: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    time: string;
    locations: Array<{ name: string; address: string }>;
    hostId: string;
    hostName: string;
    hostRating: number;
    attendeeCount: number;
    maxCapacity: number;
    ticketPrice: number;
    currency: string;
    tags: string[];
    image: string;
    featured?: boolean;
    format: string;
    isPublic?: boolean;
    allowsPlusOne?: boolean;
    plusOnePrice?: number;
  };
  isSaved: boolean;
  onSave: () => void;
  isPastEvent?: boolean;
}

const PublicEventCard = ({
  event,
  isSaved,
  onSave,
  isPastEvent,
}: PublicEventCardProps) => {
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  const handleTicketAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPastEvent) {
      return; // Do nothing for past events
    }

    setShowTicketDialog(true);
  };

  const handleSaveEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave();
  };

  const handleHostClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const isVirtual = event.locations[0].name === "Online Event";
  const spotsLeft = event.maxCapacity - event.attendeeCount;
  const isAlmostFull = spotsLeft <= event.maxCapacity * 0.1;

  // Check if event is in the past - only use isPastEvent prop if provided, otherwise check date
  const now = new Date();
  const eventIsInPast =
    isPastEvent !== undefined ? isPastEvent : event.startDate < now;

  // Select priority tags to display
  const getPriorityTags = () => {
    const tags = [];

    // Add category
    tags.push({ text: event.category, color: "bg-blue-100 text-blue-800" });

    // Add format
    if (event.format === "virtual") {
      tags.push({ text: "Virtual", color: "bg-green-100 text-green-800" });
    } else if (event.format === "hybrid") {
      tags.push({ text: "Hybrid", color: "bg-purple-100 text-purple-800" });
    }

    // Add subcategory or event type if available
    if (event.subcategory) {
      tags.push({
        text: event.subcategory,
        color: "bg-gray-100 text-gray-800",
      });
    } else if (event.eventType !== event.category) {
      tags.push({ text: event.eventType, color: "bg-gray-100 text-gray-800" });
    }

    // Add special conditions
    if (isAlmostFull && !eventIsInPast) {
      tags.push({
        text: "Almost full",
        color: "bg-orange-100 text-orange-800",
      });
    }

    if (eventIsInPast) {
      tags.push({ text: "Past Event", color: "bg-gray-100 text-gray-600" });
    }

    return tags.slice(0, 3); // Show max 3 tags
  };

  const priorityTags = getPriorityTags();

  return (
    <>
      <Link
        // to={`/events/${event.id}`}
        href={Routes.home}
        className="block"
      >
        <Card
          className={`group cursor-pointer overflow-hidden border-0 bg-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${eventIsInPast ? "opacity-75" : ""}`}
        >
          {/* Event Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-400 to-blue-500">
            {/* <img
              src={event.image}
              alt={event.eventName}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            /> */}
            <Image
              src={event.image}
              alt={event.eventName}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Button
              variant="ghost"
              size="sm"
              className={`absolute top-3 right-3 ${isSaved ? "bg-white/90 text-red-500" : "bg-black/20 text-white"} h-10 w-10 rounded-full p-0 hover:bg-white/90 hover:text-red-500`}
              onClick={handleSaveEvent}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
            {event.featured && !eventIsInPast && (
              <Badge className="absolute top-3 left-3 border-0 bg-purple-500 text-white">
                Featured
              </Badge>
            )}
            {event.ticketPrice === 0 && !eventIsInPast && (
              <Badge className="absolute bottom-3 left-3 border-0 bg-green-500 text-white">
                Free
              </Badge>
            )}
          </div>

          <CardContent className="p-4">
            {/* Date and Time */}
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-600">
              <Calendar className="h-4 w-4" />
              <span>{format(event.startDate, "EEE, MMM d")}</span>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>

            {/* Event Title */}
            <h3 className="mb-2 text-lg leading-tight font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
              {event.eventName}
            </h3>

            {/* Location */}
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className={isVirtual ? "text-purple-600" : ""}>
                {event.locations[0].name}
              </span>
            </div>

            {/* Host - Now Clickable */}
            <Link
              // href={`/host/${event.hostId}`}
              href={Routes.home}
              // onClick={handleHostClick}
              className="group/host -m-1 mb-3 flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
                <User className="h-3 w-3" />
              </div>
              <span className="text-sm text-gray-600 transition-colors group-hover/host:text-purple-600">
                {event.hostName}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                <span className="text-xs text-gray-500">
                  {event.hostRating}
                </span>
              </div>
            </Link>

            {/* Event Tags */}
            <div className="mb-3 flex flex-wrap gap-2">
              {priorityTags.map((tag, index) => (
                <Badge
                  key={index}
                  className={`text-xs ${tag.color} border-0`}
                >
                  {tag.text}
                </Badge>
              ))}
            </div>

            {/* Attendees and Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>
                  {event.attendeeCount} {eventIsInPast ? "attended" : "going"}
                </span>
              </div>

              <div className="text-right">
                {event.ticketPrice === 0 ? (
                  <span className="text-lg font-bold text-green-600">Free</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">from</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${event.ticketPrice}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          {/* Action Buttons */}
          <CardFooter className="p-4 pt-0">
            {eventIsInPast ? (
              <Button
                disabled
                className="w-full cursor-not-allowed bg-gray-300 text-gray-500"
              >
                Event Ended
              </Button>
            ) : (
              <Button
                onClick={handleTicketAction}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {event.ticketPrice === 0 ? "Get tickets" : "Buy tickets"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </Link>

      <TicketPurchaseDialog
        isOpen={showTicketDialog}
        onClose={() => setShowTicketDialog(false)}
        event={event}
      />
    </>
  );
};

export default PublicEventCard;
