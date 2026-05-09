import { EventModuleSlugType } from "@/type";
import {
	Users,
	PanelsTopLeft,
	Calendar,
	MessageSquare,
	Megaphone,
	Camera,
	Ticket,
	Gamepad2,
	DollarSign,
	type LucideIcon,
} from "lucide-react";

export type ModuleType =
	| "rsvp"
	| "seating"
	| "schedule"
	| "survey"
	| "announcement"
	| "media"
	| "ticket"
	| "travel"
	| "games"
	| "budget";

/**
 * Client-safe module configuration (no server actions or Prisma)
 */
export interface ModuleConfig {
	moduleType: ModuleType;
	moduleCategorySlug: EventModuleSlugType;
	hrefType: string;
	icon: LucideIcon;
	iconBtnBg: string;
	cardBorCol: string;
	getModuleKey: () => string;
}

const MODULE_REGISTRY: Record<ModuleType, ModuleConfig> = {
	rsvp: {
		moduleType: "rsvp",
		moduleCategorySlug: "rsvp-management",
		hrefType: "rsvp",
		icon: Users,
		iconBtnBg: "bg-green-600",
		cardBorCol: "hover:border-green-600",
		getModuleKey: () => "rsvpModule",
	},
	seating: {
		moduleType: "seating",
		moduleCategorySlug: "seating-arrangement",
		hrefType: "seating",
		icon: PanelsTopLeft,
		iconBtnBg: "bg-purple-600",
		cardBorCol: "hover:border-purple-600",
		getModuleKey: () => "seatingModule",
	},
	schedule: {
		moduleType: "schedule",
		moduleCategorySlug: "schedule-timeline",
		hrefType: "schedule",
		icon: Calendar,
		iconBtnBg: "bg-cyan-600",
		cardBorCol: "hover:border-cyan-600",
		getModuleKey: () => "scheduleModule",
	},
	survey: {
		moduleType: "survey",
		moduleCategorySlug: "survey-feedback",
		hrefType: "survey",
		icon: MessageSquare,
		iconBtnBg: "bg-sky-600",
		cardBorCol: "hover:border-sky-600",
		getModuleKey: () => "surveyModule",
	},
	announcement: {
		moduleType: "announcement",
		moduleCategorySlug: "announcements",
		hrefType: "announcement",
		icon: Megaphone,
		iconBtnBg: "bg-blue-600",
		cardBorCol: "hover:border-blue-600",
		getModuleKey: () => "announcementModule",
	},
	media: {
		moduleType: "media",
		moduleCategorySlug: "media-management",
		hrefType: "media",
		icon: Camera,
		iconBtnBg: "bg-pink-600",
		cardBorCol: "hover:border-pink-600",
		getModuleKey: () => "mediaModule",
	},
	ticket: {
		moduleType: "ticket",
		moduleCategorySlug: "ticketing-system",
		hrefType: "ticket",
		icon: Ticket,
		iconBtnBg: "bg-orange-600",
		cardBorCol: "hover:border-orange-600",
		getModuleKey: () => "ticketModule",
	},
	travel: {
		moduleType: "travel",
		moduleCategorySlug: "travel-accommodation",
		hrefType: "travel",
		icon: PanelsTopLeft,
		iconBtnBg: "bg-cyan-600",
		cardBorCol: "hover:border-cyan-600",
		getModuleKey: () => "travelModule",
	},
	games: {
		moduleType: "games",
		moduleCategorySlug: "games-activities",
		hrefType: "games",
		icon: Gamepad2,
		iconBtnBg: "bg-yellow-600",
		cardBorCol: "hover:border-yellow-600",
		getModuleKey: () => "gameModule",
	},
	budget: {
		moduleType: "budget",
		moduleCategorySlug: "budget-planning",
		hrefType: "budget",
		icon: DollarSign,
		iconBtnBg: "bg-emerald-600",
		cardBorCol: "hover:border-emerald-600",
		getModuleKey: () => "budgetModule",
	},
};

/**
 * Get module configuration by module type
 */
export function getModuleConfig(
	moduleType: ModuleType,
): ModuleConfig | undefined {
	return MODULE_REGISTRY[moduleType];
}

/**
 * Get module configuration by module category slug
 */
export function getModuleConfigBySlug(
	slug: EventModuleSlugType,
): ModuleConfig | undefined {
	if (!slug) return undefined;
	return Object.values(MODULE_REGISTRY).find(
		(config) => config.moduleCategorySlug === slug,
	);
}

/**
 * Get all module configurations
 */
export function getAllModuleConfigs(): ModuleConfig[] {
	return Object.values(MODULE_REGISTRY);
}

/**
 * Get module key (property name in EventModel) by module type
 */
export function getModuleKey(moduleType: ModuleType): string {
	return MODULE_REGISTRY[moduleType]?.getModuleKey() || "";
}
