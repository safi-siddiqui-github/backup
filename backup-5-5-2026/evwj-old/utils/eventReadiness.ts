export interface ReadinessCheck {
	id: string;
	label: string;
	passed: boolean;
	weight: number;
	category: "critical" | "important" | "optional";
	quickFix?: string;
}

export interface ReadinessResult {
	score: number;
	status: "not-ready" | "almost-ready" | "ready";
	checks: ReadinessCheck[];
	criticalIssues: ReadinessCheck[];
	canGoLive: boolean;
}

export const calculateEventReadiness = (event: any): ReadinessResult => {
	const checks: ReadinessCheck[] = [
		// Critical checks (must pass to go live)
		{
			id: "has-name",
			label: "Event has a name",
			passed: !!event.eventName && event.eventName.trim().length > 0,
			weight: 10,
			category: "critical",
			quickFix: "Edit event details to add a name",
		},
		{
			id: "has-date",
			label: "Event date is set",
			passed: !!event.startDate,
			weight: 10,
			category: "critical",
			quickFix: "Set an event date",
		},
		{
			id: "has-location",
			label: "At least one location added",
			passed: event.locations && event.locations.length > 0,
			weight: 15,
			category: "critical",
			quickFix: "Add a location for your event",
		},
		{
			id: "has-description",
			label: "Event description provided",
			passed: !!event.description && event.description.trim().length > 10,
			weight: 10,
			category: "important",
			quickFix: "Add a detailed event description",
		},

		// Module configuration checks
		{
			id: "rsvp-configured",
			label: "RSVP module configured",
			passed:
				event.selectedModules?.includes("rsvp") &&
				event.moduleConfigurations?.rsvp?.configured,
			weight: 15,
			category: "important",
			quickFix: "Configure RSVP settings",
		},
		{
			id: "schedule-configured",
			label: "Schedule created",
			passed:
				event.selectedModules?.includes("schedules") &&
				event.scheduleData?.items &&
				event.scheduleData.items.length > 0,
			weight: 10,
			category: "important",
			quickFix: "Add schedule items",
		},

		// Optional but recommended
		{
			id: "has-cover-image",
			label: "Event cover image uploaded",
			passed: !!event.coverImage,
			weight: 5,
			category: "optional",
			quickFix: "Upload a cover image",
		},
		{
			id: "modules-selected",
			label: "At least 3 modules selected",
			passed: event.selectedModules && event.selectedModules.length >= 3,
			weight: 10,
			category: "important",
			quickFix: "Select additional modules",
		},
		{
			id: "announcements-ready",
			label: "Welcome announcement created",
			passed: event.moduleConfigurations?.announcements?.hasWelcomeMessage,
			weight: 5,
			category: "optional",
			quickFix: "Create a welcome announcement",
		},
		{
			id: "time-set",
			label: "Event time specified",
			passed: !!event.time,
			weight: 5,
			category: "important",
			quickFix: "Set an event time",
		},
		{
			id: "privacy-set",
			label: "Privacy settings configured",
			passed: event.isPublic !== undefined,
			weight: 5,
			category: "important",
			quickFix: "Set event privacy",
		},
	];

	// Calculate score
	const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0);
	const earnedWeight = checks
		.filter((check) => check.passed)
		.reduce((sum, check) => sum + check.weight, 0);

	const score = Math.round((earnedWeight / totalWeight) * 100);

	// Get critical issues
	const criticalIssues = checks.filter(
		(check) => check.category === "critical" && !check.passed,
	);

	// Determine status
	let status: ReadinessResult["status"];
	let canGoLive = false;

	if (criticalIssues.length > 0) {
		status = "not-ready";
		canGoLive = false;
	} else if (score >= 80) {
		status = "ready";
		canGoLive = true;
	} else if (score >= 50) {
		status = "almost-ready";
		canGoLive = false;
	} else {
		status = "not-ready";
		canGoLive = false;
	}

	return {
		score,
		status,
		checks,
		criticalIssues,
		canGoLive,
	};
};
