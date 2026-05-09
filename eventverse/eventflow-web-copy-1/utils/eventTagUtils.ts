import { EventFormData } from "@/components/EnhancedEventCreationDialog";

interface EventTagData {
  text: string;
  color: string;
}

interface EventData {
  category: string;
  eventType: string;
  subcategory?: string;
  format: string;
  startDate: Date;
  ticketDetails?: {
    checkedIn: boolean;
    type?: string;
  };
  moduleUsage?: {
    rsvp?: { status: string };
  };
  maxCapacity?: number;
  attendeeCount?: number;
}

export const generateEventTags = (
  event: Partial<EventFormData>,
  context: "public" | "attending" = "public",
  isPastEvent?: boolean,
): EventTagData[] => {
  const tags: EventTagData[] = [];
  const now = new Date();
  const eventIsInPast =
    isPastEvent !== undefined
      ? isPastEvent
      : new Date(String(event.startDate)) < now;
  const eventIsToday =
    new Date(String(event.startDate)).toDateString() === now.toDateString();

  // Add category
  tags.push({
    text: event.category ?? "",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  });

  // Add format
  if (event.format === "virtual") {
    tags.push({
      text: "Virtual",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    });
  } else if (event.format === "hybrid") {
    tags.push({
      text: "Hybrid",
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    });
  }

  // Add subcategory or event type if different from category
  if (event.subcategory && event.subcategory !== event.category) {
    tags.push({
      text: event.subcategory,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    });
  } else if (event.eventType !== event.category) {
    tags.push({
      text: event?.eventType ?? "",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    });
  }

  // Add status-specific tags based on context
  if (context === "attending") {
    // For attending events, show attendance status
    if (event.ticketDetails?.checkedIn) {
      tags.push({
        text: "Checked In",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      });
    } else if (event.moduleUsage?.rsvp?.status) {
      const rsvpStatus = event.moduleUsage.rsvp.status;
      if (rsvpStatus === "attending") {
        tags.push({
          text: "RSVP: Attending",
          color:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        });
      } else if (rsvpStatus === "confirmed") {
        tags.push({
          text: "Confirmed",
          color:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        });
      }
    }

    if (eventIsToday && !event.ticketDetails?.checkedIn) {
      tags.push({
        text: "Today",
        color:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      });
    }
  } else {
    // For public events, show availability and special conditions
    if (event.maxCapacity && event.attendeeCount) {
      const spotsLeft = event.maxCapacity - event.attendeeCount;
      const isAlmostFull = spotsLeft <= event.maxCapacity * 0.1;

      if (isAlmostFull && !eventIsInPast) {
        tags.push({
          text: "Almost Full",
          color:
            "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        });
      }
    }
  }

  // Add past event indicator
  if (eventIsInPast) {
    tags.push({
      text: "Past Event",
      color: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    });
  }

  // Return max 3-4 tags to avoid overcrowding
  return tags.slice(0, 4);
};
