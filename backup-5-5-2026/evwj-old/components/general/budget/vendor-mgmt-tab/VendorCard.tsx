"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DollarSign,
	FileText,
	Clock,
	Star,
	MessageSquare,
	ArrowRight,
} from "lucide-react";
import { Vendor } from "./VendorListView";
import { cn } from "@/lib/utils";

interface VendorCardProps {
	vendor: Vendor;
	viewMode: "grid" | "list";
	onClick: () => void;
}

export default function VendorCard({
	vendor,
	viewMode,
	onClick,
}: VendorCardProps) {
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

	const getStatusLabel = (status: string) => {
		return status.charAt(0).toUpperCase() + status.slice(1);
	};

	// Grid view
	if (viewMode === "grid") {
		return (
			<Card
				onClick={onClick}
				className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer flex flex-col h-full !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]"
			>
				<CardContent className="p-6 flex flex-col flex-1 space-y-4">
					{/* Header */}
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-3">
							<Avatar className="h-12 w-12">
								<AvatarImage src={vendor.avatar} alt={vendor.name} />
								<AvatarFallback>{vendor.name.substring(0, 1)}</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold text-lg">{vendor.name}</h3>
								<p className="text-sm text-muted-foreground">
									{vendor.category}
								</p>
							</div>
						</div>
						<Badge className={cn("", getStatusColor(vendor.status))}>
							{getStatusLabel(vendor.status)}
						</Badge>
					</div>

					{/* Rating */}
					<div className="flex items-center gap-1">
						<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
						<span className="font-semibold">{vendor.rating}</span>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 gap-2 text-sm">
						<div className="flex items-center gap-2 text-muted-foreground">
							<DollarSign className="h-4 w-4 text-green-600" />
							<div>
								<div className="font-semibold text-foreground">
									${vendor.totalValue.toLocaleString()}
								</div>
								<div className="text-xs">Total Value</div>
							</div>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<FileText className="h-4 w-4 text-blue-600" />
							<div>
								<div className="font-semibold text-foreground">
									{vendor.activeEvents}
								</div>
								<div className="text-xs">Active Events</div>
							</div>
						</div>
					</div>

					{/* Events List */}
					{vendor.events && vendor.events.length > 0 && (
					<div className="space-y-2">
							<p className="text-xs font-semibold text-muted-foreground">Events</p>
							{vendor.events.slice(0, 2).map((event) => (
								<div
									key={event.id}
									className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-2"
								>
									<div className="flex items-center justify-between mb-1">
										<p className="text-sm font-semibold text-purple-600 dark:text-purple-400 truncate">
											{event.name}
										</p>
										<p className="text-xs text-gray-600 dark:text-gray-400">
											{event.date}
										</p>
						</div>
									<div className="flex items-center justify-between">
										<p className="text-xs text-gray-600 dark:text-gray-400">
											{event.projects.length} project{event.projects.length !== 1 ? 's' : ''}
									</p>
										<p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
											${event.totalBudget.toLocaleString()}
									</p>
								</div>
							</div>
							))}
							{vendor.events.length > 2 && (
								<p className="text-xs text-center text-gray-500 dark:text-gray-400">
									+{vendor.events.length - 2} more event{vendor.events.length - 2 !== 1 ? 's' : ''}
								</p>
							)}
						</div>
					)}

					{/* Spacer to push button to bottom */}
					<div className="flex-1" />

					{/* Action Button */}
					<Button
						variant="outline"
						className="w-full mt-auto"
						// onClick={onClick}
					>
						<MessageSquare className="mr-2 h-4 w-4" />
						Message
					</Button>
				</CardContent>
			</Card>
		);
	}

	// List view
	return (
		<Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<CardContent className="p-0">
				<div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
					{/* Left: Avatar and Info */}
					<div className="flex items-center gap-4 flex-1 min-w-0">
						<Avatar className="h-14 w-14 shrink-0">
							<AvatarImage src={vendor.avatar} alt={vendor.name} />
							<AvatarFallback>{vendor.name.substring(0, 1)}</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<h3 className="font-semibold text-lg truncate">
									{vendor.name}
								</h3>
								<Badge
									className={cn("shrink-0", getStatusColor(vendor.status))}
								>
									{getStatusLabel(vendor.status)}
								</Badge>
							</div>
							<div className="flex items-center gap-3 text-sm text-muted-foreground">
								<span>{vendor.category}</span>
								<div className="flex items-center gap-1">
									<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
									<span className="font-semibold">{vendor.rating}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Center: Stats */}
					<div className="flex gap-6 text-sm">
						<div className="flex items-center gap-2">
							<DollarSign className="h-4 w-4 text-green-600" />
							<div>
								<div className="font-semibold">
									${vendor.totalValue.toLocaleString()}
								</div>
								<div className="text-xs text-muted-foreground">Total Value</div>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<FileText className="h-4 w-4 text-blue-600" />
							<div>
								<div className="font-semibold">{vendor.activeEvents}</div>
								<div className="text-xs text-muted-foreground">
									Active Events
								</div>
							</div>
						</div>
					</div>

					{/* Right: Action */}
					<div className="flex items-center gap-4 w-full md:w-auto">
						<Button
							variant="ghost"
							size="icon"
							onClick={onClick}
							className="shrink-0"
						>
							<ArrowRight className="h-5 w-5" />
						</Button>
					</div>
				</div>

				{/* Events List (Bottom bar for list view) */}
				{vendor.events && vendor.events.length > 0 && (
					<div className="border-t bg-purple-50 dark:bg-purple-900/20 px-6 py-3">
						<div className="space-y-2">
							<p className="text-xs font-semibold text-muted-foreground mb-2">Events</p>
							{vendor.events.slice(0, 2).map((event) => (
								<div key={event.id} className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-purple-900 dark:text-purple-100">
											{event.name}
										</p>
										<p className="text-xs text-purple-700 dark:text-purple-300">
											{event.projects.length} project{event.projects.length !== 1 ? 's' : ''} • {event.date}
										</p>
									</div>
									<p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
										${event.totalBudget.toLocaleString()}
									</p>
								</div>
							))}
							{vendor.events.length > 2 && (
								<p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
									+{vendor.events.length - 2} more event{vendor.events.length - 2 !== 1 ? 's' : ''}
								</p>
							)}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
