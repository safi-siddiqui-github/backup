"use client";

import { useState } from "react";
import { Calendar, Mail, Users, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CampaignDetailDrawer from "./CampaignDetailDrawer";
import CreateCampaignDialog from "./CreateCampaignDialog";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Campaign } from "./types";
import { MOCK_CAMPAIGNS } from "./constants/mockData";
import {
	groupCampaignsByMonth,
	getChannelInfo,
	getStatusBadge,
} from "./utils/campaignUtils";

export default function CampaignsTabContent() {
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
		null,
	);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [createCampaignOpen, setCreateCampaignOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
	const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(
		null,
	);
	const [campaignToDuplicate, setCampaignToDuplicate] =
		useState<Campaign | null>(null);
	const groupedCampaigns = groupCampaignsByMonth(MOCK_CAMPAIGNS);

	const handleViewDetails = (campaign: Campaign) => {
		setSelectedCampaign(campaign);
		setDrawerOpen(true);
	};

	const handleDeleteClick = (e: React.MouseEvent, campaign: Campaign) => {
		e.stopPropagation();
		setCampaignToDelete(campaign);
		setDeleteDialogOpen(true);
	};

	const handleDuplicateClick = (e: React.MouseEvent, campaign: Campaign) => {
		e.stopPropagation();
		setCampaignToDuplicate(campaign);
		setDuplicateDialogOpen(true);
	};

	const handleEditClick = (e: React.MouseEvent, campaign: Campaign) => {
		e.stopPropagation();
		setCreateCampaignOpen(true);
		// TODO: Load campaign data into the dialog for editing
	};

	const handleConfirmDelete = () => {
		if (campaignToDelete) {
			console.log("Delete campaign:", campaignToDelete.id);
			// Add your delete logic here
			setDeleteDialogOpen(false);
			setCampaignToDelete(null);
		}
	};

	const handleConfirmDuplicate = () => {
		if (campaignToDuplicate) {
			console.log("Duplicate campaign:", campaignToDuplicate.id);
			// Add your duplicate logic here
			setDuplicateDialogOpen(false);
			setCampaignToDuplicate(null);
		}
	};

	return (
		<div className="space-y-8">
			{/* Header */}
			<div>
				<h2 className="text-2xl font-bold">Marketing Campaigns</h2>
				<p className="text-muted-foreground mt-1">
					Create and manage multi-channel campaigns
				</p>
			</div>

			{/* Timeline View */}
			<div className="relative">
				{/* Timeline Line */}
				<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700" />

				{/* Campaign Groups by Month */}
				<div className="space-y-12 pl-4">
					{groupedCampaigns.map(([monthYear, campaigns], groupIndex) => (
						<div key={monthYear} className="relative">
							{/* Month Marker - Above Cards */}
							<div className="relative mb-6">
								<div className="relative z-10 flex items-center gap-3 -ml-4">
									{/* Calendar Icon Circle */}
									<div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/30 rounded-full border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center shadow-sm relative z-10">
										<Calendar className="h-6 w-6 text-blue-600 dark:text-gray-400" />
									</div>
									<div className="flex flex-col">
										<span className="text-lg font-bold text-gray-900 dark:text-gray-100">
											{monthYear.split(" ")[0]} {monthYear.split(" ")[1]}
										</span>
									</div>
								</div>
							</div>

							{/* Campaigns - Below Date */}
							<div className="ml-12 space-y-4">
								{campaigns.map((campaign) => {
									const statusBadge = getStatusBadge(campaign.status);
									return (
										<div
											key={campaign.id}
											onClick={() => handleViewDetails(campaign)}
											className={cn(
												"bg-white dark:bg-slate-800 rounded-lg border p-6 shadow-sm relative max-w-2xl cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl",
												campaign.status === "draft" &&
													"border-orange-200 dark:border-orange-800",
												campaign.status === "scheduled" &&
													"border-blue-200 dark:border-blue-800",
												campaign.status === "completed" &&
													"border-gray-200 dark:border-slate-700",
											)}
										>
											{/* Header with Title, Status, and Menu */}
											<div className="flex items-start justify-between mb-3">
												<div className="flex items-center gap-3">
													<h3 className="text-lg font-bold">{campaign.name}</h3>
													<span
														className={cn(
															"px-2.5 py-1 rounded-full text-xs font-semibold",
															statusBadge.className,
														)}
													>
														{statusBadge.label}
													</span>
												</div>

												{/* Three Dots Menu */}
												<DropdownMenu>
													<DropdownMenuTrigger
														asChild
														onClick={(e) => e.stopPropagation()}
													>
														<button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
															<MoreVertical className="h-4 w-4 text-muted-foreground" />
														</button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem
															onClick={(e) => {
																e.stopPropagation();
																handleViewDetails(campaign);
															}}
														>
															View Details
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={(e) => handleEditClick(e, campaign)}
														>
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={(e) => handleDuplicateClick(e, campaign)}
														>
															Duplicate
														</DropdownMenuItem>
														<DropdownMenuItem
															className="text-red-600"
															onClick={(e) => handleDeleteClick(e, campaign)}
														>
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>

											{/* Description */}
											<p className="text-sm text-muted-foreground mb-4">
												{campaign.description}
											</p>

											{/* Date */}
											<div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
												<Calendar className="h-4 w-4" />
												<span>
													{campaign.date.toLocaleDateString("en-US", {
														month: "short",
														day: "numeric",
														year: "numeric",
													})}{" "}
													at{" "}
													{campaign.date.toLocaleTimeString("en-US", {
														hour: "numeric",
														minute: "2-digit",
														hour12: true,
													})}
												</span>
											</div>

											{/* Channels */}
											<div className="flex items-center gap-2 mb-3">
												<Mail className="h-4 w-4 text-muted-foreground shrink-0" />
												<div className="flex flex-wrap gap-2">
													{campaign.channels.map((channel) => {
														const {
															icon: Icon,
															name,
															color,
														} = getChannelInfo(channel);
														return (
															<span
																key={channel}
																className={cn(
																	"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
																	color,
																)}
															>
																<Icon className="h-3 w-3" />
																{name}
															</span>
														);
													})}
												</div>
											</div>

											{/* Audiences */}
											<div className="flex items-center gap-2 mb-4">
												<Users className="h-4 w-4 text-muted-foreground shrink-0" />
												<div className="flex flex-wrap gap-2">
													{campaign.audiences.map((audience) => (
														<span
															key={audience}
															className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
														>
															<Users className="h-3 w-3" />
															{audience.replace("-", " ")}
														</span>
													))}
												</div>
											</div>

											{/* Performance Metrics (for completed campaigns) */}
											{campaign.status === "completed" && campaign.metrics && (
												<>
													<div className="border-t border-gray-200 dark:border-slate-700 my-4" />
													<div className="grid grid-cols-4 gap-4">
														<div>
															<p className="text-xs text-muted-foreground mb-1">
																Reach
															</p>
															<p className="text-lg font-bold">
																{campaign.metrics.reach || 0}
															</p>
														</div>
														<div>
															<p className="text-xs text-muted-foreground mb-1">
																Opened
															</p>
															<p className="text-lg font-bold">
																{campaign.metrics.opened || 0}
															</p>
														</div>
														<div>
															<p className="text-xs text-muted-foreground mb-1">
																Clicked
															</p>
															<p className="text-lg font-bold">
																{campaign.metrics.clicked || 0}
															</p>
														</div>
														<div>
															<p className="text-xs text-muted-foreground mb-1">
																Conversions
															</p>
															<p className="text-lg font-bold text-green-600 dark:text-green-400">
																{campaign.metrics.conversions || 0}
															</p>
														</div>
													</div>
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Campaign Detail Drawer */}
			<CampaignDetailDrawer
				campaign={selectedCampaign}
				open={drawerOpen}
				onOpenChange={setDrawerOpen}
				onEdit={(id) => {
					setDrawerOpen(false);
					setCreateCampaignOpen(true);
					// TODO: Load campaign data into the dialog for editing
				}}
				onDuplicate={(id) => {
					console.log("Duplicate campaign:", id);
				}}
				onDelete={(id) => {
					console.log("Delete campaign:", id);
					setDrawerOpen(false);
				}}
			/>

			{/* Create/Edit Campaign Dialog */}
			<CreateCampaignDialog
				open={createCampaignOpen}
				onOpenChange={setCreateCampaignOpen}
			/>

			{/* Delete Confirmation Dialog */}
			{campaignToDelete && (
				<ConfirmationDialog
					open={deleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
					onConfirm={handleConfirmDelete}
					title="Delete Campaign"
					description={`Are you sure you want to delete "${campaignToDelete.name}"? This action cannot be undone and will permanently remove the campaign and all its data.`}
					confirmText="Delete"
					cancelText="Cancel"
					variant="destructive"
				/>
			)}

			{/* Duplicate Confirmation Dialog */}
			{campaignToDuplicate && (
				<ConfirmationDialog
					open={duplicateDialogOpen}
					onOpenChange={setDuplicateDialogOpen}
					onConfirm={handleConfirmDuplicate}
					title="Duplicate Campaign"
					description={`Are you sure you want to create a copy of "${campaignToDuplicate.name}"? A new campaign will be created with the same settings and content.`}
					confirmText="Duplicate"
					cancelText="Cancel"
					variant="default"
				/>
			)}
		</div>
	);
}
