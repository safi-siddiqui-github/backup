"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Crown, LogOut, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import OrganizationDetailSheet from "./OrganizationDetailSheet";

type Organization = {
	name: string;
	logoUrl: string;
	isVerified: string;
	description: string;
	email: string;
	id: number;
};

type OrganizationCardProps = {
	organization: Partial<Organization> & {
		role?: string;
		joinedAt?: Date | null;
		memberCount?: number;
		members?: Array<{
			id: string;
			name: string;
			avatarUrl?: string;
		}>;
		pastEventsCount?: number;
		upcomingEventsCount?: number;
	};
	onUpdate?: () => void;
	onLeave?: (organizationId: number | string) => void;
};

export default function OrganizationCard({
	organization,
	onUpdate,
	onLeave,
}: OrganizationCardProps) {
	const [showLeaveDialog, setShowLeaveDialog] = useState(false);
	const [showDetailSheet, setShowDetailSheet] = useState(false);
	const isOwner = organization.role === "OWNER";
	const isAdmin = organization.role === "ADMIN" || organization.role === "OWNER";
	const isMember = organization.role === "MEMBER";
	const initials =
		organization.name
			?.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) || "ORG";

	// Get member avatars for display (max 5)
	const memberAvatars = organization.members?.slice(0, 5) || [];
	const remainingMembers =
		(organization.memberCount || 0) - memberAvatars.length;
	const pastEvents = organization.pastEventsCount || 0;
	const upcomingEvents = organization.upcomingEventsCount || 0;

	// Avatar colors for fallback
	const avatarColors = [
		"bg-blue-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-green-500",
		"bg-orange-500",
		"bg-indigo-500",
		"bg-teal-500",
		"bg-red-500",
	];

	const getInitials = (name: string): string => {
		if (!name) return "?";
		const parts = name.split(" ");
		if (parts.length === 1) return name[0] ? name[0].toUpperCase() : "?";
		return (parts[0][0] || "") + (parts[parts.length - 1][0] || "");
	};

	const handleLeave = () => {
		if (onLeave && organization.id) {
			onLeave(organization.id);
			setShowLeaveDialog(false);
			toast.success("Left organization successfully");
		}
	};

	return (
		<>
			<Card
				className="group relative overflow-hidden !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg cursor-pointer dark:!bg-[#020617] dark:[background-color:#020617]"
				onClick={() => setShowDetailSheet(true)}
			>
				<CardContent className="p-6">
					<div className="flex flex-col gap-4">
						{/* Header Section */}
						<div className="flex items-start gap-4">
							<Avatar className="border-background h-16 w-16 shrink-0 border-2 shadow-sm ring-2 ring-offset-2 ring-offset-white transition-all duration-300 group-hover:ring-purple-200 dark:ring-offset-slate-800 dark:group-hover:ring-purple-800">
								<AvatarImage src={organization.logoUrl || undefined} />
								<AvatarFallback className="bg-linear-to-br from-purple-500 to-blue-500 text-lg text-white">
									{initials}
								</AvatarFallback>
							</Avatar>

							<div className="min-w-0 flex-1">
								<div className="mb-2 flex flex-wrap items-center gap-2">
									<h4 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
										{organization.name}
									</h4>
								</div>

								<div className="mb-3 flex flex-wrap items-center gap-2">
									<Badge
										className={`border-0 text-xs text-white ${
											organization.role === "OWNER"
												? "bg-linear-to-r from-purple-600 to-indigo-600"
												: organization.role === "ADMIN"
													? "bg-linear-to-r from-yellow-500 to-orange-500"
													: "bg-linear-to-r from-blue-500 to-cyan-500"
										}`}
									>
										{organization.role === "OWNER" ? (
											<>
												<Crown className="mr-1 h-3 w-3" />
												Owner
											</>
										) : organization.role === "ADMIN" ? (
											<>
												<Crown className="mr-1 h-3 w-3" />
												Admin
											</>
										) : (
											<>
												<Users className="mr-1 h-3 w-3" />
												Member
											</>
										)}
									</Badge>
								</div>

								{organization.description && (
									<p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
										{organization.description}
									</p>
								)}
							</div>

							{!isOwner && (
								<Button
									variant="outline"
									size="sm"
									onClick={(e) => {
										e.stopPropagation();
										setShowLeaveDialog(true);
									}}
									className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 shrink-0"
								>
									<LogOut className="mr-2 h-4 w-4" />
									Leave
								</Button>
							)}
						</div>

					{/* Stats Section */}
					<div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
						{/* Members */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								<div className="flex -space-x-2">
									{memberAvatars.map((member, index) => (
										<Avatar
											key={member.id}
											className="border-background h-8 w-8 border-2 ring-2 ring-white dark:ring-slate-800"
										>
											<AvatarImage src={member.avatarUrl} />
											<AvatarFallback
												className={`text-xs font-medium text-white ${
													avatarColors[index % avatarColors.length]
												}`}
											>
												{getInitials(member.name)}
											</AvatarFallback>
										</Avatar>
									))}
									{remainingMembers > 0 && (
										<div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-700 ring-2 ring-white dark:border-slate-800 dark:bg-gray-700 dark:text-gray-300 dark:ring-slate-800">
											+{remainingMembers}
										</div>
									)}
								</div>
							</div>
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									{organization.memberCount || 0}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									{organization.memberCount === 1 ? "Member" : "Members"}
								</p>
							</div>
						</div>

						{/* Past Events */}
						<div className="flex flex-col gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
								<Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									{pastEvents}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									{pastEvents === 1 ? "Past Event" : "Past Events"}
								</p>
							</div>
						</div>

						{/* Upcoming Events */}
						<div className="flex flex-col gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
								<Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
							</div>
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									{upcomingEvents}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									{upcomingEvents === 1 ? "Upcoming Event" : "Upcoming Events"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		{/* Organization Detail Sheet */}
		<OrganizationDetailSheet
			organization={organization}
			open={showDetailSheet}
			onOpenChange={setShowDetailSheet}
			onUpdate={onUpdate}
		/>

		{/* Leave Confirmation Dialog */}
		<AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
			<AlertDialogContent className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
						<LogOut className="h-5 w-5" />
						Leave Organization
					</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to leave{" "}
						<strong>{organization.name}</strong>? You will no longer have
						access to this organization's events and data.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleLeave}
						className="bg-red-600 text-white hover:bg-red-700"
					>
						Leave Organization
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
		</>
	);
}
