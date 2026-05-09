"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	Clock,
	FileText,
	CreditCard,
	Star,
	DollarSign,
	Calendar,
} from "lucide-react";
import { Vendor } from "./VendorListView";
import { cn } from "@/lib/utils";
import VendorTimeline from "./VendorTimeline";
import VendorDocumentsTab from "./VendorDocumentsTab";
import VendorPaymentsTab from "./VendorPaymentsTab";
import EventProjectSelector from "./EventProjectSelector";

interface VendorDetailViewProps {
	vendor: Vendor;
	onBack: () => void;
}

export default function VendorDetailView({
	vendor,
	onBack,
}: VendorDetailViewProps) {
	const [activeTab, setActiveTab] = useState("timeline");
	const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
	const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

	// Handle event/project selection
	const handleEventProjectSelect = (eventId: string | null, projectId: string | null) => {
		setSelectedEventId(eventId);
		setSelectedProjectId(projectId);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
			case "pending":
				return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
			case "blocked":
				return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
			case "completed":
				return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	return (
		<div className="space-y-6">
			{/* Back Button */}
			<Button variant="ghost" onClick={onBack} className="mb-4">
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Vendors
			</Button>

			{/* Vendor Header Card */}
			<div className="rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm p-4 sm:p-6 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
					<div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
						<Avatar className="h-12 w-12 sm:h-16 sm:w-16 shrink-0">
							<AvatarImage src={vendor.avatar} alt={vendor.name} />
							<AvatarFallback>{vendor.name.substring(0, 1)}</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
								<h2 className="text-lg sm:text-2xl font-bold truncate">
									{vendor.name}
								</h2>
								<Badge
									className={cn(
										"shrink-0 w-fit",
										getStatusColor(vendor.status),
									)}
								>
									{vendor.status.charAt(0).toUpperCase() +
										vendor.status.slice(1)}
								</Badge>
							</div>
							<div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
								<span>{vendor.category}</span>
								<div className="flex items-center gap-1">
									<Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
									<span className="font-semibold">{vendor.rating}</span>
								</div>
							</div>
						</div>
					</div>
					{/* Event/Project Selector */}
					{vendor.events && vendor.events.length > 0 && (
						<EventProjectSelector
							events={vendor.events}
							selectedEventId={selectedEventId}
							selectedProjectId={selectedProjectId}
							onSelect={handleEventProjectSelect}
						/>
					)}
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
					<div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-muted/30">
						<div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-1.5 sm:p-2 shrink-0">
							<DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
						</div>
						<div className="min-w-0">
							<div className="text-xs sm:text-sm text-muted-foreground">
								Total Value
							</div>
							<div className="text-sm sm:text-lg font-semibold truncate">
								${vendor.totalValue.toLocaleString()}
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-muted/30">
						<div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 shrink-0">
							<FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
						</div>
						<div className="min-w-0">
							<div className="text-xs sm:text-sm text-muted-foreground">
								Active Events
							</div>
							<div className="text-sm sm:text-lg font-semibold">
								{vendor.activeEvents}
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-muted/30">
						<div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 p-1.5 sm:p-2 shrink-0">
							<Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
						</div>
						<div className="min-w-0">
							<div className="text-xs sm:text-sm text-muted-foreground">
								Upcoming
							</div>
							<div className="text-sm sm:text-lg font-semibold">
								{vendor.upcomingCount}
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-muted/30">
						<div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-1.5 sm:p-2 shrink-0">
							<Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
						</div>
						<div className="min-w-0">
							<div className="text-xs sm:text-sm text-muted-foreground">
								Completed
							</div>
							<div className="text-sm sm:text-lg font-semibold">
								{vendor.completedCount}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Tabs Section */}
			<div className="rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<div className="border-b px-3 sm:px-6 pt-4 sm:pt-6 overflow-x-auto">
						<TabsList className="h-auto bg-transparent p-0 w-full justify-start shadow-none min-w-max">
							<TabsTrigger
								value="timeline"
								className="rounded-none cursor-pointer px-3 sm:px-6 text-sm sm:text-base data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground"
							>
								<Clock className="h-4 w-4 mr-1 sm:mr-2" />
								<span className="hidden sm:inline">Service Timeline</span>
								<span className="sm:hidden">Timeline</span>
							</TabsTrigger>
							<TabsTrigger
								value="documents"
								className="rounded-none cursor-pointer px-3 sm:px-6 text-sm sm:text-base data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground"
							>
								<FileText className="h-4 w-4 mr-1 sm:mr-2" />
								Documents
							</TabsTrigger>
							<TabsTrigger
								value="payments"
								className="rounded-none cursor-pointer px-3 sm:px-6 text-sm sm:text-base data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground"
							>
								<CreditCard className="h-4 w-4 mr-1 sm:mr-2" />
								Payments
							</TabsTrigger>
						</TabsList>
					</div>

					{/* Tab Contents */}
					<div className="p-3 sm:p-6">
						<TabsContent value="timeline" className="mt-0">
							<VendorTimeline 
								vendor={vendor}
								selectedEventId={selectedEventId}
								selectedProjectId={selectedProjectId}
							/>
						</TabsContent>

						<TabsContent value="documents" className="mt-0">
							<VendorDocumentsTab 
								vendorName={vendor.name}
								selectedEventId={selectedEventId}
								selectedProjectId={selectedProjectId}
							/>
						</TabsContent>

						<TabsContent value="payments" className="mt-0">
							<VendorPaymentsTab 
								vendorName={vendor.name}
								selectedEventId={selectedEventId}
								selectedProjectId={selectedProjectId}
							/>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</div>
	);
}
