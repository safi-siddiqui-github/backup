import { ReactElement, Dispatch, SetStateAction } from "react";

export type Priority = "low" | "medium" | "high";

export type Announcement = {
	title: string;
	description: string;
	priority: Priority;
	status: string;
	sentAt: string;
	recipients: string;
	delivered: number;
	opened: number;
	percentage: number;
};

export type Recipient = {
	name: string;
	email: string;
	source: string;
	status: string;
	deliveredAt: string;
};

export type AnnouncementType = {
	name: string;
	icon: ReactElement;
	textColor: string;
	iconContainerBg: string;
	selectedBgColor: string;
	selectedBorderColor: string;
	priority: Priority;
	defaultTitle: string;
	defaultMessage: string;
};

export type SubOption = {
	id: string;
	name: string;
	count: number;
};

export type AudienceOption = {
	id: string;
	icon: ReactElement;
	title: string;
	description: string;
	totalCount?: number;
	subOptions?: SubOption[];
};

export type AnnouncementModalHeaderProps = {
	item: Announcement;
	onDuplicate: () => void;
	onResend: () => void;
	onClose: () => void;
};

export type AnnouncementModalMessageProps = {
	item: Announcement;
};

export type AnnouncementModalStatsProps = {
	item: Announcement;
};

export type AnnouncementModalAudienceProps = {
	recipients: string;
};

export type AnnouncementModalSearchFilterProps = {
	searchTerm: string;
	setSearchTerm: (v: string) => void;
	statusFilter: string;
	setStatusFilter: (v: string) => void;
};

export type AnnouncementModalRecipientsTableProps = {
	recipients: Recipient[];
};

export type AnnouncementModalProps = {
	item: Announcement;
	onClose: () => void;
	setShowCreate?: (show: boolean) => void;
	setSelected?: Dispatch<SetStateAction<Announcement | null>>;
};

export type DateGroupedAnnouncementsProps = {
	announcementsList: Announcement[];
	onView: (item: Announcement) => void;
};

export type StatCardProps = {
	title: string;
	value: string | number;
	icon?: React.ReactNode;
	highlight?: boolean;
	color?: string;
};

export type AnnouncementCardProps = {
	item: Announcement;
	onView: (item: Announcement) => void;
};

export type CreateAnnouncementProps = {
	setShowCreate?: (show: boolean) => void;
	duplicateData?: {
		title: string;
		description: string;
		priority: Priority;
	};
};
