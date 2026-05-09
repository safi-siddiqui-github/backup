import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getEventSlugFromPath } from "@/lib/breadcrumb-helper";

/**
 * Hook to fetch event data for breadcrumbs
 * This can be extended to fetch actual event names from the API
 */
export function useBreadcrumbData() {
	const pathname = usePathname();
	const [eventName, setEventName] = useState<string | undefined>();
	const [moduleName, setModuleName] = useState<string | undefined>();

	useEffect(() => {
		const eventSlug = getEventSlugFromPath(pathname || "");

		// TODO: Fetch actual event name from API using eventSlug
		// For now, we'll format the slug as a title
		if (eventSlug && eventSlug !== "new") {
			// Format slug to title case
			const formatted = eventSlug
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");
			setEventName(formatted);
		} else {
			setEventName(undefined);
		}

		// Extract module name from path
		const moduleMatch = pathname?.match(
			/\/(rsvp|announcement|survey|schedule|ticket|seating|games|media|travel|website-builder)\//,
		);
		if (moduleMatch) {
			const moduleMap: Record<string, string> = {
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
			};
			setModuleName(moduleMap[moduleMatch[1]] || moduleMatch[1]);
		} else {
			setModuleName(undefined);
		}
	}, [pathname]);

	return { eventName, moduleName };
}
