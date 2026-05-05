import { Routes } from "@/lib/lib-routes";

/**
 * Maps route segments to human-readable labels
 */
export const routeLabelMap: Record<string, string> = {
  // Main routes
  dashboard: "Dashboard",
  event: "Events",
  events: "Explore Events",
  "explore-events": "Explore Events",
  location: "Location",

  // Auth routes
  login: "Login",
  signup: "Sign Up",
  "forgot-password": "Forgot Password",
  "check-email": "Check Email",
  "verify-email": "Verify Email",
  "update-password": "Update Password",

  // General routes
  home: "Home",
  about: "About",
  contact: "Contact",
  features: "Features",
  "how-it-works": "How It Works",
  help: "Help",

  // Event creation
  create: "Create Event",
  new: "New Event",
  detail: "Details",

  // Modules
  rsvp: "RSVP",
  announcement: "Announcements",
  survey: "Surveys",
  schedule: "Schedule",
  ticket: "Tickets",
  seating: "Seating",
  games: "Games & Activities",
  media: "Media Center",
  travel: "Travel & Accommodation",
  "website-builder": "Website Builder",

  // Sub-modules
  arrangement: "Seating Arrangement",
  trivia: "Trivia",
  "trivia-custom": "Custom Trivia",

  // Special cases
  moduleGroup: "",
};

/**
 * Maps module slugs to display names
 */
export const moduleLabelMap: Record<string, string> = {
  rsvp: "RSVP",
  announcement: "Announcements",
  survey: "Surveys",
  schedule: "Schedule",
  ticket: "Tickets",
  seating: "Seating",
  games: "Games & Activities",
  media: "Media Center",
  "media-center": "Media Center",
  travel: "Travel & Accommodation",
  "website-builder": "Website Builder",
};

/**
 * Converts a route segment to a human-readable label
 */
export function getRouteLabel(segment: string): string {
  // Remove dynamic route markers
  const cleanSegment = segment.replace(/\[|\]/g, "");

  // Check if it's a slug parameter (we'll handle these specially)
  if (cleanSegment.includes("slug") || cleanSegment.includes("Slug")) {
    return ""; // Will be replaced with actual data
  }

  // Decode URI components for human-readable labels (e.g., New%20York -> New York)
  let decoded = cleanSegment;
  try {
    decoded = decodeURIComponent(cleanSegment);
  } catch {
    // noop - keep as-is if decoding fails
  }

  // Return mapped label (static) or formatted decoded segment (dynamic)
  return routeLabelMap[cleanSegment] || formatSegment(decoded);
}

/**
 * Formats a route segment into a readable label
 */
function formatSegment(segment: string): string {
  // Convert kebab-case to Title Case
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Parses a pathname into breadcrumb segments
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
  isDynamic?: boolean;
  dynamicValue?: string;
}

export function parseBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Remove leading/trailing slashes and split
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Home",
      href: Routes.web.general.home,
    },
  ];

  // Build up the path as we go
  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const nextSegment = segments[i + 1];
    const nextNextSegment = segments[i + 2];
    const prevSegment = i > 0 ? segments[i - 1] : null;

    // Skip explicit "home" segment (we already added Home above)
    if (segment === "home") {
      currentPath += `/${segment}`;
      continue;
    }

    // Skip certain segments that don't need breadcrumbs
    if (segment === "dashboard" && i === 0) {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: "Dashboard",
        href: Routes.web.auth.dashboard,
      });
      continue;
    }

    // Skip "event" segment if it's followed by "detail" (event detail page)
    // This prevents showing "Event" before the event name in breadcrumbs
    if (segment === "event" && nextSegment === "detail") {
      // Still add to path for the next segment, but don't add breadcrumb
      currentPath += `/${segment}`;
      continue;
    }

    // Skip "detail" segment if it's part of event detail page
    // We'll add "Details" manually in the breadcrumb component
    if (segment === "detail" && prevSegment === "event") {
      // Still add to path for the next segment (slug), but don't add breadcrumb
      currentPath += `/${segment}`;
      continue;
    }

    currentPath += `/${segment}`;

    // Handle dynamic segments (slugs)
    // Check if previous segment was "detail" - if so, this is likely an event slug
    const isEventSlug = prevSegment === "detail" || prevSegment === "event";

    const isDynamic =
      segment.includes("[") ||
      segment.includes("slug") ||
      isEventSlug || // Event slugs following "event" segment
      (/^[a-z0-9-]+$/.test(segment) && segment.length > 10); // Likely a slug

    let label = getRouteLabel(segment);
    let href = currentPath;

    // Special-case: new explore events path /home/explore-events/location/{location}
    if (segment === "explore-events") {
      // Build href to include location segment and city if present
      if (nextSegment === "location" && nextNextSegment) {
        // Preserve encoded city in href
        href = `/home/explore-events/location/${nextNextSegment}`;
      } else if (nextSegment === "location") {
        href = `/home/explore-events/location`;
      } else {
        href = `/home/explore-events`;
      }
    }

    // Skip adding a breadcrumb for the literal "location" segment
    if (segment === "location") {
      continue;
    }

    // If it's likely a dynamic value (slug), try to format it
    if (isDynamic && !label) {
      // Format slug as title case
      label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // Skip empty labels (they'll be replaced with actual data)
    if (label) {
      breadcrumbs.push({
        label,
        href,
        isDynamic,
        dynamicValue: isDynamic ? segment : undefined,
      });
    }
  }

  return breadcrumbs;
}

/**
 * Gets the module name from a pathname
 */
export function getModuleFromPath(pathname: string): string | null {
  const moduleMatch = pathname.match(
    /\/(rsvp|announcement|survey|schedule|ticket|seating|games|media|travel|website-builder)\//,
  );
  if (moduleMatch) {
    return moduleLabelMap[moduleMatch[1]] || moduleMatch[1];
  }
  return null;
}

/**
 * Gets the event slug from a pathname
 */
export function getEventSlugFromPath(pathname: string): string | null {
  const eventMatch = pathname.match(/\/event\/([^\/]+)/);
  return eventMatch ? eventMatch[1] : null;
}
