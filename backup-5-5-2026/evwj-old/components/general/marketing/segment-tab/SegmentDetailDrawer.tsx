"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { AvatarProps } from "../common/Avatar";
import SegmentOverviewSection from "./segment-drawer/SegmentOverviewSection";
import FilterCriteriaSection from "./segment-drawer/FilterCriteriaSection";
import GuestPreviewSection from "./segment-drawer/GuestPreviewSection";
import SegmentAnalyticsSection from "./segment-drawer/SegmentAnalyticsSection";
import CampaignUsageSection from "./segment-drawer/CampaignUsageSection";
import ActionsSection from "./segment-drawer/ActionsSection";

export interface SegmentDetail {
	id: string;
	title: string;
	description: string;
	guestCount: number;
	avatars: Omit<AvatarProps, "size" | "className">[];
	totalSpending: number;
	avgSpent: number;
	totalEvents: number;
	createdDate: string;
	lastUpdated: string;
	filterCriteria: string;
	guests: {
		id: string;
		name: string;
		email: string;
		initials: string;
		color: string;
		spending: number;
		events: number;
	}[];
	ageDistribution: {
		range: string;
		percentage: number;
	};
	eventTypeAttendance: {
		type: string;
		percentage: number;
	}[];
	topLocations: {
		location: string;
		count: number;
	}[];
	campaigns: {
		id: string;
		name: string;
		description: string;
		status: "draft" | "active" | "completed";
	}[];
	isAutomatic: boolean;
}

interface SegmentDetailDrawerProps {
	segment: SegmentDetail | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onEdit?: (segmentId: string) => void;
	onDelete?: (segmentId: string) => void;
	onCreateCampaign?: (segmentId: string) => void;
	onExport?: (segmentId: string) => void;
}

export default function SegmentDetailDrawer({
	segment,
	open,
	onOpenChange,
	onEdit,
	onDelete,
	onCreateCampaign,
	onExport,
}: SegmentDetailDrawerProps) {
	if (!segment) return null;

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="w-full sm:w-[600px] md:w-[700px] max-w-none! flex flex-col p-0"
			>
				<SheetHeader className="pb-4 border-b px-6 pt-6">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<SheetTitle className="text-xl sm:text-2xl font-semibold mb-1">
								{segment.title}
							</SheetTitle>
							<SheetDescription className="text-sm">
								{segment.description}
							</SheetDescription>
						</div>
						<div className="flex items-center gap-3 ml-4">
							<div className="flex items-center gap-2 border px-4 py-1 rounded-full bg-blue-500 w-fit ">
								<p className="text-xs text-white">Automatic</p>
							</div>
						</div>
					</div>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto px-6">
					<div className="flex flex-col gap-6 py-6">
						<SegmentOverviewSection segment={segment} />

						<FilterCriteriaSection segment={segment} />

						<GuestPreviewSection segment={segment} />

						<SegmentAnalyticsSection segment={segment} />

						<CampaignUsageSection segment={segment} />

						<ActionsSection
							segmentId={segment.id}
							onEdit={onEdit}
							onDelete={onDelete}
							onCreateCampaign={onCreateCampaign}
							onExport={onExport}
						/>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
