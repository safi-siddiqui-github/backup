"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {
	CampaignDetail,
	CampaignDetailDrawerProps,
} from "./campaign-drawer/types";
import { getStatusBadge } from "./campaign-drawer/utils";
import CampaignOverviewSection from "./campaign-drawer/sections/CampaignOverviewSection";
import TargetAudienceSection from "./campaign-drawer/sections/TargetAudienceSection";
import PerformanceMetricsSection from "./campaign-drawer/sections/PerformanceMetricsSection";
import EngagementFunnelSection from "./campaign-drawer/sections/EngagementFunnelSection";
import ChannelPerformanceSection from "./campaign-drawer/sections/ChannelPerformanceSection";
import CostBreakdownSection from "./campaign-drawer/sections/CostBreakdownSection";
import ChannelContentSection from "./campaign-drawer/sections/ChannelContentSection";
import ActionsSection from "./campaign-drawer/sections/ActionsSection";

export default function CampaignDetailDrawer({
	campaign,
	open,
	onOpenChange,
	onEdit,
	onDuplicate,
	onDelete,
}: CampaignDetailDrawerProps) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);

	if (!campaign) return null;

	const statusBadge = getStatusBadge(campaign.status);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="w-full sm:w-[700px] max-w-none! flex flex-col p-0"
			>
				{/* Header */}
				<SheetHeader className="pb-4 border-b px-6 pt-6">
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-3 mb-2">
								<SheetTitle className="text-xl sm:text-2xl font-bold">
									{campaign.name}
								</SheetTitle>
								<span
									className={cn(
										"px-3 py-1 rounded-full text-xs font-semibold shrink-0",
										statusBadge.className,
									)}
								>
									{statusBadge.label}
								</span>
							</div>
							<SheetDescription className="text-sm">
								{campaign.description}
							</SheetDescription>
						</div>
						<button
							onClick={() => onOpenChange(false)}
							className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors shrink-0"
						>
							<X className="h-5 w-5 text-muted-foreground" />
						</button>
					</div>
				</SheetHeader>

				{/* Content */}
				<div className="flex-1 overflow-y-auto px-6 py-6">
					<div className="flex flex-col gap-6">
						<CampaignOverviewSection campaign={campaign} />
						<TargetAudienceSection campaign={campaign} />
						<PerformanceMetricsSection metrics={campaign.metrics} />
						<EngagementFunnelSection metrics={campaign.metrics} />
						<ChannelPerformanceSection
							channelMetrics={campaign.channelMetrics}
						/>
						<CostBreakdownSection channelMetrics={campaign.channelMetrics} />
						<ChannelContentSection campaign={campaign} />
						<ActionsSection
							onEdit={() => onEdit?.(campaign.id)}
							onDuplicate={() => setDuplicateDialogOpen(true)}
							onDelete={() => setDeleteDialogOpen(true)}
						/>
					</div>
				</div>
			</SheetContent>

			{/* Delete Confirmation Dialog */}
			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={() => {
					onDelete?.(campaign.id);
					setDeleteDialogOpen(false);
				}}
				title="Delete Campaign"
				description={`Are you sure you want to delete "${campaign.name}"? This action cannot be undone and will permanently remove the campaign and all its data.`}
				confirmText="Delete"
				cancelText="Cancel"
				variant="destructive"
			/>

			{/* Duplicate Confirmation Dialog */}
			<ConfirmationDialog
				open={duplicateDialogOpen}
				onOpenChange={setDuplicateDialogOpen}
				onConfirm={() => {
					onDuplicate?.(campaign.id);
					setDuplicateDialogOpen(false);
				}}
				title="Duplicate Campaign"
				description={`Are you sure you want to create a copy of "${campaign.name}"? A new campaign will be created with the same settings and content.`}
				confirmText="Duplicate"
				cancelText="Cancel"
				variant="default"
			/>
		</Sheet>
	);
}
