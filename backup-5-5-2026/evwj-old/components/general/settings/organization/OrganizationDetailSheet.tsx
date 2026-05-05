"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOrganizationMembers } from "@/lib/mock-organizations";
import { MOCK_EVENTS } from "@/lib/mock-events";
import { parseEventDate } from "@/lib/mock-events";
import { Crown, ArrowLeft, Users, Calendar, Mail, Image as ImageIcon, Video, Upload, UserMinus, UserX, Shield, ShieldOff, X, Trash2, AlertTriangle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import HomeCardComponent from "@/components/general/home/HomeCardComponent";
import InviteMembersDialog from "./InviteMembersDialog";
import { format } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
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

type OrganizationDetailSheetProps = {
	organization: any;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onUpdate?: () => void;
};

// Mock gallery data
const MOCK_GALLERY = [
	{
		id: "gallery-1",
		type: "image",
		url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
		thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
		uploadedBy: "John Smith",
		uploadedAt: "2024-01-15T10:30:00Z",
		eventName: "Tech Conference 2024",
	},
	{
		id: "gallery-2",
		type: "image",
		url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
		thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400",
		uploadedBy: "Sarah Johnson",
		uploadedAt: "2024-01-20T14:20:00Z",
		eventName: "Networking Event",
	},
	{
		id: "gallery-3",
		type: "video",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400",
		uploadedBy: "John Smith",
		uploadedAt: "2024-02-01T09:15:00Z",
		eventName: "Annual Summit",
	},
	{
		id: "gallery-4",
		type: "image",
		url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
		thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
		uploadedBy: "Sarah Johnson",
		uploadedAt: "2024-02-10T16:45:00Z",
		eventName: "Workshop Series",
	},
	{
		id: "gallery-5",
		type: "image",
		url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
		thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
		uploadedBy: "John Smith",
		uploadedAt: "2024-02-15T11:30:00Z",
		eventName: "Product Launch",
	},
	{
		id: "gallery-6",
		type: "video",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
		uploadedBy: "Sarah Johnson",
		uploadedAt: "2024-02-20T13:20:00Z",
		eventName: "Team Building",
	},
];

export default function OrganizationDetailSheet({
	organization,
	open,
	onOpenChange,
	onUpdate,
}: OrganizationDetailSheetProps) {
	const isOwner = organization?.role === "OWNER";
	const isAdmin = organization?.role === "ADMIN" || organization?.role === "OWNER";
	const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);
	const [removingAdminId, setRemovingAdminId] = useState<string | null>(null);
	const [makingAdminId, setMakingAdminId] = useState<string | null>(null);
	const [cancelingInvitationId, setCancelingInvitationId] = useState<string | null>(null);
	const [showInviteDialog, setShowInviteDialog] = useState(false);
	const [showDisbandDialog, setShowDisbandDialog] = useState(false);
	const [isDisbanding, setIsDisbanding] = useState(false);
	
	// Pagination state
	const [membersPage, setMembersPage] = useState(1);
	const [membersItemsPerPage, setMembersItemsPerPage] = useState(20);
	const [invitationsPage, setInvitationsPage] = useState(1);
	const [invitationsItemsPerPage, setInvitationsItemsPerPage] = useState(20);
	const [pastEventsPage, setPastEventsPage] = useState(1);
	const [pastEventsItemsPerPage, setPastEventsItemsPerPage] = useState(20);
	const [upcomingEventsPage, setUpcomingEventsPage] = useState(1);
	const [upcomingEventsItemsPerPage, setUpcomingEventsItemsPerPage] = useState(20);
	
	// Get members for this organization
	const allMembers = organization?.id
		? getOrganizationMembers(organization.id.toString())
		: [];

	// Get past and upcoming events (mock - filter from MOCK_EVENTS)
	const now = new Date();
	const allPastEvents = MOCK_EVENTS.filter((event) => {
		const eventDate = parseEventDate(event.startDate);
		return eventDate && eventDate < now;
	}).slice(0, organization?.pastEventsCount || 0);

	const allUpcomingEvents = MOCK_EVENTS.filter((event) => {
		const eventDate = parseEventDate(event.startDate);
		return eventDate && eventDate >= now;
	}).slice(0, organization?.upcomingEventsCount || 0);

	// Get invitations (mock - would come from API)
	const invitations = [
		{
			id: "inv-1",
			email: "newmember@example.com",
			invitedBy: "John Smith",
			createdAt: "2024-01-20T10:00:00Z",
			status: "PENDING" as const,
		},
		{
			id: "inv-2",
			email: "another@example.com",
			invitedBy: "Sarah Johnson",
			createdAt: "2024-01-25T14:30:00Z",
			status: "PENDING" as const,
		},
	];

	// Pagination calculations for members
	const membersTotalPages = Math.ceil(allMembers.length / membersItemsPerPage);
	const membersStartIndex = (membersPage - 1) * membersItemsPerPage;
	const membersEndIndex = membersStartIndex + membersItemsPerPage;
	const paginatedMembers = useMemo(() => {
		return allMembers.slice(membersStartIndex, membersEndIndex);
	}, [allMembers, membersStartIndex, membersEndIndex]);

	// Pagination calculations for invitations
	const invitationsTotalPages = Math.ceil(invitations.length / invitationsItemsPerPage);
	const invitationsStartIndex = (invitationsPage - 1) * invitationsItemsPerPage;
	const invitationsEndIndex = invitationsStartIndex + invitationsItemsPerPage;
	const paginatedInvitations = useMemo(() => {
		return invitations.slice(invitationsStartIndex, invitationsEndIndex);
	}, [invitations, invitationsStartIndex, invitationsEndIndex]);

	// Pagination calculations for past events
	const pastEventsTotalPages = Math.ceil(allPastEvents.length / pastEventsItemsPerPage);
	const pastEventsStartIndex = (pastEventsPage - 1) * pastEventsItemsPerPage;
	const pastEventsEndIndex = pastEventsStartIndex + pastEventsItemsPerPage;
	const paginatedPastEvents = useMemo(() => {
		return allPastEvents.slice(pastEventsStartIndex, pastEventsEndIndex);
	}, [allPastEvents, pastEventsStartIndex, pastEventsEndIndex]);

	// Pagination calculations for upcoming events
	const upcomingEventsTotalPages = Math.ceil(allUpcomingEvents.length / upcomingEventsItemsPerPage);
	const upcomingEventsStartIndex = (upcomingEventsPage - 1) * upcomingEventsItemsPerPage;
	const upcomingEventsEndIndex = upcomingEventsStartIndex + upcomingEventsItemsPerPage;
	const paginatedUpcomingEvents = useMemo(() => {
		return allUpcomingEvents.slice(upcomingEventsStartIndex, upcomingEventsEndIndex);
	}, [allUpcomingEvents, upcomingEventsStartIndex, upcomingEventsEndIndex]);

	// Reset to page 1 when items per page changes
	useEffect(() => {
		setMembersPage(1);
	}, [membersItemsPerPage]);

	useEffect(() => {
		setInvitationsPage(1);
	}, [invitationsItemsPerPage]);

	useEffect(() => {
		setPastEventsPage(1);
	}, [pastEventsItemsPerPage]);

	useEffect(() => {
		setUpcomingEventsPage(1);
	}, [upcomingEventsItemsPerPage]);

	const initials =
		organization?.name
			?.split(" ")
			.map((n: string) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) || "ORG";

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

	const handleMakeAdmin = (memberId: string, memberName: string) => {
		// TODO: Implement API call to make member admin
		toast.success(`${memberName} is now an admin`);
		setMakingAdminId(null);
		onUpdate?.();
	};

	const handleRemoveAdmin = (memberId: string, memberName: string) => {
		// TODO: Implement API call to remove admin role
		toast.success(`${memberName} is no longer an admin`);
		setRemovingAdminId(null);
		onUpdate?.();
	};

	const handleRemoveMember = (memberId: string, memberName: string) => {
		// TODO: Implement API call to remove member
		toast.success(`${memberName} has been removed from the organization`);
		setRemovingMemberId(null);
		onUpdate?.();
	};

	const handleCancelInvitation = (invitationId: string, email: string) => {
		// TODO: Implement API call to cancel invitation
		toast.success(`Invitation to ${email} has been cancelled`);
		setCancelingInvitationId(null);
		onUpdate?.();
	};

	const handleDisbandOrganization = async () => {
		setIsDisbanding(true);
		// TODO: Implement API call to disband organization
		// const response = await ActionResponseHelper(async () => {
		//   return await DeleteOrganizationAction(organization.id!);
		// });
		
		// if (response.success) {
		//   toast.success("Organization disbanded successfully");
		//   onOpenChange(false);
		//   if (onUpdate) {
		//     onUpdate();
		//   }
		//   // Refresh the page to update the organizations list
		//   window.location.reload();
		// } else {
		//   toast.error(response.message || "Failed to disband organization");
		// }
		
		toast.success("Organization disbanded successfully");
		setIsDisbanding(false);
		setShowDisbandDialog(false);
		onOpenChange(false);
		onUpdate?.();
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="w-full sm:w-full md:w-[90vw] lg:w-[85vw] xl:w-[80vw] max-w-none! flex flex-col p-0 overflow-hidden"
			>
				{/* Header with Back Button */}
				<SheetHeader className="border-b px-6 py-4">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => onOpenChange(false)}
							className="h-8 w-8"
						>
							<ArrowLeft className="h-4 w-4" />
						</Button>
						<div className="flex items-center gap-4 flex-1">
							<Avatar className="h-12 w-12 border-2">
								<AvatarImage src={organization?.logoUrl} />
								<AvatarFallback className="bg-linear-to-br from-purple-500 to-blue-500 text-white">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="flex-1 min-w-0">
								<SheetTitle className="text-xl font-semibold truncate">
									{organization?.name}
								</SheetTitle>
								<SheetDescription className="text-sm text-gray-600 dark:text-gray-400">
									{organization?.description || "Organization details"}
								</SheetDescription>
							</div>
							<Badge
								className={`border-0 text-xs text-white ${
									organization?.role === "OWNER"
										? "bg-linear-to-r from-purple-600 to-indigo-600"
										: organization?.role === "ADMIN"
											? "bg-linear-to-r from-yellow-500 to-orange-500"
											: "bg-linear-to-r from-blue-500 to-cyan-500"
								}`}
							>
								{organization?.role === "OWNER" ? (
									<>
										<Crown className="mr-1 h-3 w-3" />
										Owner
									</>
								) : organization?.role === "ADMIN" ? (
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
					</div>
				</SheetHeader>

				{/* Content with Tabs */}
				<div className="flex-1 overflow-y-auto">
					<Tabs defaultValue="overview" className="w-full">
						<TabsList className="w-full justify-start border-b rounded-none h-auto px-6">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="members">
								Members ({allMembers.length})
							</TabsTrigger>
							<TabsTrigger value="invitations">
								Invitations ({invitations.length})
							</TabsTrigger>
							<TabsTrigger value="events">
								Events ({allPastEvents.length + allUpcomingEvents.length})
							</TabsTrigger>
							<TabsTrigger value="gallery">Gallery</TabsTrigger>
						</TabsList>

						{/* Overview Tab */}
						<TabsContent value="overview" className="px-6 py-6 space-y-6">
							{/* Organization Details */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Organization Details</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{organization?.email && (
										<div>
											<p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
												Email
											</p>
											<p className="text-sm font-medium">{organization.email}</p>
										</div>
									)}
									{organization?.website && (
										<div>
											<p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
												Website
											</p>
											<a
												href={organization.website}
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
											>
												{organization.website}
											</a>
										</div>
									)}
									<div>
										<p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
											Created
										</p>
										<p className="text-sm font-medium">
											{organization?.createdAt
												? format(new Date(organization.createdAt), "MMM d, yyyy")
												: "N/A"}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
											Total Members
										</p>
										<p className="text-sm font-medium">
											{organization?.memberCount || 0}
										</p>
									</div>
								</div>
							</div>

							{/* Quick Stats */}
							<div className="grid grid-cols-3 gap-4">
								<div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-900/20">
									<div className="flex items-center gap-2 mb-2">
										<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
										<p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
									</div>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">
										{organization?.memberCount || 0}
									</p>
								</div>
								<div className="p-4 rounded-lg border bg-purple-50 dark:bg-purple-900/20">
									<div className="flex items-center gap-2 mb-2">
										<Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
										<p className="text-sm text-gray-600 dark:text-gray-400">Past Events</p>
									</div>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">
										{organization?.pastEventsCount || 0}
									</p>
								</div>
								<div className="p-4 rounded-lg border bg-green-50 dark:bg-green-900/20">
									<div className="flex items-center gap-2 mb-2">
										<Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Upcoming
										</p>
									</div>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">
										{organization?.upcomingEventsCount || 0}
									</p>
								</div>
							</div>

							{/* Disband Organization Section - Owner Only */}
							{isOwner && (
								<div className="mt-8 pt-6 border-t border-red-200 dark:border-red-900/30">
									<div className="flex flex-col gap-4">
										<div className="flex items-start gap-3">
											<AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-1">
													Danger Zone
												</h3>
												<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
													Disbanding this organization will permanently delete it and remove all
													members. This action cannot be undone.
												</p>
												<Button
													variant="destructive"
													onClick={() => setShowDisbandDialog(true)}
													className="w-full sm:w-auto"
												>
													<Trash2 className="mr-2 h-4 w-4" />
													Disband Organization
												</Button>
											</div>
										</div>
									</div>
								</div>
							)}
						</TabsContent>

						{/* Members Tab */}
						<TabsContent value="members" className="px-6 py-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-semibold">Members</h3>
									{isAdmin && (
										<Button size="sm" variant="outline">
											<Users className="mr-2 h-4 w-4" />
											Invite Member
										</Button>
									)}
								</div>
								<div className="space-y-3">
									{paginatedMembers.map((member, index) => (
										<div
											key={member.id}
											className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-gray-800"
										>
											<div className="flex items-center gap-3 flex-1">
												<Avatar className="h-10 w-10">
													<AvatarImage src={member.avatarUrl} />
													<AvatarFallback
														className={`text-xs font-medium text-white ${
															avatarColors[index % avatarColors.length]
														}`}
													>
														{getInitials(member.name)}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<p className="font-medium">{member.name}</p>
													<p className="text-sm text-gray-500 dark:text-gray-400">
														{member.email}
													</p>
													<p className="text-xs text-gray-400 dark:text-gray-500">
														Joined{" "}
														{format(new Date(member.joinedAt), "MMM d, yyyy")}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Badge
													className={`border-0 text-xs text-white ${
														member.role === "OWNER"
															? "bg-linear-to-r from-purple-600 to-indigo-600"
															: member.role === "ADMIN"
																? "bg-linear-to-r from-yellow-500 to-orange-500"
																: "bg-linear-to-r from-blue-500 to-cyan-500"
													}`}
												>
													{member.role === "OWNER" ? (
														<>
															<Crown className="mr-1 h-3 w-3" />
															Owner
														</>
													) : member.role === "ADMIN" ? (
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
												{isOwner && member.role !== "OWNER" && (
													<div className="flex items-center gap-2">
														{member.role === "ADMIN" ? (
															<>
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => setRemovingAdminId(member.id)}
																	className="text-xs"
																>
																	<ShieldOff className="mr-1 h-3 w-3" />
																	Remove as Admin
																</Button>
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => setRemovingMemberId(member.id)}
																	className="text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
																>
																	<UserX className="mr-1 h-3 w-3" />
																	Remove from Group
																</Button>
															</>
														) : (
															<>
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => setMakingAdminId(member.id)}
																	className="text-xs"
																>
																	<Shield className="mr-1 h-3 w-3" />
																	Make Admin
																</Button>
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => setRemovingMemberId(member.id)}
																	className="text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
																>
																	<UserX className="mr-1 h-3 w-3" />
																	Remove from Group
																</Button>
															</>
														)}
													</div>
												)}
											</div>
										</div>
									))}
								</div>

								{/* Members Pagination */}
								{allMembers.length > 0 && (
									<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
										<CardContent className="p-4">
											<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
												<div className="flex items-center gap-2">
													<span className="text-sm text-gray-600 dark:text-slate-400">
														Items per page:
													</span>
													<select
														value={membersItemsPerPage}
														onChange={(e) => {
															setMembersItemsPerPage(Number(e.target.value));
															setMembersPage(1);
														}}
														className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
													>
														<option value={10}>10</option>
														<option value={20}>20</option>
														<option value={30}>30</option>
														<option value={40}>40</option>
														<option value={50}>50</option>
													</select>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-sm text-gray-600 dark:text-slate-400">
														Showing {membersStartIndex + 1} -{" "}
														{Math.min(membersEndIndex, allMembers.length)} of {allMembers.length}
													</span>
													<div className="flex items-center gap-1">
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																setMembersPage((prev) => Math.max(1, prev - 1))
															}
															disabled={membersPage === 1}
														>
															<ChevronLeft className="h-4 w-4" />
														</Button>
														<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
															Page {membersPage} of {membersTotalPages}
														</span>
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																setMembersPage((prev) =>
																	Math.min(membersTotalPages, prev + 1),
																)
															}
															disabled={membersPage === membersTotalPages}
														>
															<ChevronRight className="h-4 w-4" />
														</Button>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						</TabsContent>

						{/* Invitations Tab */}
						<TabsContent value="invitations" className="px-6 py-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-semibold">Pending Invitations</h3>
									{isAdmin && (
										<Button
											size="sm"
											variant="outline"
											onClick={() => setShowInviteDialog(true)}
										>
											<Mail className="mr-2 h-4 w-4" />
											Send Invitation
										</Button>
									)}
								</div>
								<div className="space-y-3">
									{paginatedInvitations.map((invitation) => (
										<div
											key={invitation.id}
											className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-gray-800"
										>
											<div className="flex-1">
												<p className="font-medium">{invitation.email}</p>
												<p className="text-sm text-gray-500 dark:text-gray-400">
													Invited by {invitation.invitedBy} on{" "}
													{format(
														new Date(invitation.createdAt),
														"MMM d, yyyy 'at' h:mm a",
													)}
												</p>
											</div>
											<div className="flex items-center gap-2">
												<Badge
													variant="outline"
													className="text-yellow-600 dark:text-yellow-400"
												>
													{invitation.status}
												</Badge>
												{isAdmin && (
													<Button
														size="sm"
														variant="outline"
														onClick={() => setCancelingInvitationId(invitation.id)}
														className="text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
													>
														<X className="mr-1 h-3 w-3" />
														Cancel
													</Button>
												)}
											</div>
										</div>
									))}
								</div>

								{/* Invitations Pagination */}
								{invitations.length > 0 && (
									<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
										<CardContent className="p-4">
											<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
												<div className="flex items-center gap-2">
													<span className="text-sm text-gray-600 dark:text-slate-400">
														Items per page:
													</span>
													<select
														value={invitationsItemsPerPage}
														onChange={(e) => {
															setInvitationsItemsPerPage(Number(e.target.value));
															setInvitationsPage(1);
														}}
														className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
													>
														<option value={10}>10</option>
														<option value={20}>20</option>
														<option value={30}>30</option>
														<option value={40}>40</option>
														<option value={50}>50</option>
													</select>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-sm text-gray-600 dark:text-slate-400">
														Showing {invitationsStartIndex + 1} -{" "}
														{Math.min(invitationsEndIndex, invitations.length)} of {invitations.length}
													</span>
													<div className="flex items-center gap-1">
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																setInvitationsPage((prev) => Math.max(1, prev - 1))
															}
															disabled={invitationsPage === 1}
														>
															<ChevronLeft className="h-4 w-4" />
														</Button>
														<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
															Page {invitationsPage} of {invitationsTotalPages}
														</span>
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																setInvitationsPage((prev) =>
																	Math.min(invitationsTotalPages, prev + 1),
																)
															}
															disabled={invitationsPage === invitationsTotalPages}
														>
															<ChevronRight className="h-4 w-4" />
														</Button>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						</TabsContent>

						{/* Events Tab with Subtabs */}
						<TabsContent value="events" className="px-6 py-6">
							<Tabs defaultValue="past" className="w-full">
							<TabsList className="w-full justify-start border-b rounded-none h-auto mb-6">
								<TabsTrigger value="past">
									Past Events ({allPastEvents.length})
								</TabsTrigger>
								<TabsTrigger value="upcoming">
									Upcoming ({allUpcomingEvents.length})
								</TabsTrigger>
							</TabsList>

								<TabsContent value="past" className="mt-0">
									<div className="space-y-4">
										{paginatedPastEvents.length > 0 ? (
											<>
												<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
													{paginatedPastEvents.map((event, index) => (
														<HomeCardComponent key={index} event={event} />
													))}
												</div>
												{/* Past Events Pagination */}
												{allPastEvents.length > 0 && (
													<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
														<CardContent className="p-4">
															<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
																<div className="flex items-center gap-2">
																	<span className="text-sm text-gray-600 dark:text-slate-400">
																		Items per page:
																	</span>
																	<select
																		value={pastEventsItemsPerPage}
																		onChange={(e) => {
																			setPastEventsItemsPerPage(Number(e.target.value));
																			setPastEventsPage(1);
																		}}
																		className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
																	>
																		<option value={10}>10</option>
																		<option value={20}>20</option>
																		<option value={30}>30</option>
																		<option value={40}>40</option>
																		<option value={50}>50</option>
																	</select>
																</div>
																<div className="flex items-center gap-2">
																	<span className="text-sm text-gray-600 dark:text-slate-400">
																		Showing {pastEventsStartIndex + 1} -{" "}
																		{Math.min(pastEventsEndIndex, allPastEvents.length)} of {allPastEvents.length}
																	</span>
																	<div className="flex items-center gap-1">
																		<Button
																			variant="outline"
																			size="sm"
																			onClick={() =>
																				setPastEventsPage((prev) => Math.max(1, prev - 1))
																			}
																			disabled={pastEventsPage === 1}
																		>
																			<ChevronLeft className="h-4 w-4" />
																		</Button>
																		<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
																			Page {pastEventsPage} of {pastEventsTotalPages}
																		</span>
																		<Button
																			variant="outline"
																			size="sm"
																			onClick={() =>
																				setPastEventsPage((prev) =>
																					Math.min(pastEventsTotalPages, prev + 1),
																				)
																			}
																			disabled={pastEventsPage === pastEventsTotalPages}
																		>
																			<ChevronRight className="h-4 w-4" />
																		</Button>
																	</div>
																</div>
															</div>
														</CardContent>
													</Card>
												)}
											</>
										) : (
											<div className="text-center py-12 text-gray-500 dark:text-gray-400">
												<Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
												<p>No past events</p>
											</div>
										)}
									</div>
								</TabsContent>

								<TabsContent value="upcoming" className="mt-0">
									<div className="space-y-4">
										{paginatedUpcomingEvents.length > 0 ? (
											<>
												<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
													{paginatedUpcomingEvents.map((event, index) => (
														<HomeCardComponent key={index} event={event} />
													))}
												</div>
												{/* Upcoming Events Pagination */}
												{allUpcomingEvents.length > 0 && (
													<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
														<CardContent className="p-4">
															<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
																<div className="flex items-center gap-2">
																	<span className="text-sm text-gray-600 dark:text-slate-400">
																		Items per page:
																	</span>
																	<select
																		value={upcomingEventsItemsPerPage}
																		onChange={(e) => {
																			setUpcomingEventsItemsPerPage(Number(e.target.value));
																			setUpcomingEventsPage(1);
																		}}
																		className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
																	>
																		<option value={10}>10</option>
																		<option value={20}>20</option>
																		<option value={30}>30</option>
																		<option value={40}>40</option>
																		<option value={50}>50</option>
																	</select>
																</div>
																<div className="flex items-center gap-2">
																	<span className="text-sm text-gray-600 dark:text-slate-400">
																		Showing {upcomingEventsStartIndex + 1} -{" "}
																		{Math.min(upcomingEventsEndIndex, allUpcomingEvents.length)} of {allUpcomingEvents.length}
																	</span>
																	<div className="flex items-center gap-1">
																		<Button
																			variant="outline"
																			size="sm"
																			onClick={() =>
																				setUpcomingEventsPage((prev) => Math.max(1, prev - 1))
																			}
																			disabled={upcomingEventsPage === 1}
																		>
																			<ChevronLeft className="h-4 w-4" />
																		</Button>
																		<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
																			Page {upcomingEventsPage} of {upcomingEventsTotalPages}
																		</span>
																		<Button
																			variant="outline"
																			size="sm"
																			onClick={() =>
																				setUpcomingEventsPage((prev) =>
																					Math.min(upcomingEventsTotalPages, prev + 1),
																				)
																			}
																			disabled={upcomingEventsPage === upcomingEventsTotalPages}
																		>
																			<ChevronRight className="h-4 w-4" />
																		</Button>
																	</div>
																</div>
															</div>
														</CardContent>
													</Card>
												)}
											</>
										) : (
											<div className="text-center py-12 text-gray-500 dark:text-gray-400">
												<Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
												<p>No upcoming events</p>
											</div>
										)}
									</div>
								</TabsContent>
							</Tabs>
						</TabsContent>

						{/* Gallery Tab */}
						<TabsContent value="gallery" className="px-6 py-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-semibold">Gallery</h3>
									{isAdmin && (
										<Button size="sm" variant="outline">
											<Upload className="mr-2 h-4 w-4" />
											Upload Media
										</Button>
									)}
								</div>
								{MOCK_GALLERY.length > 0 ? (
									<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
										{MOCK_GALLERY.map((item) => (
											<div
												key={item.id}
												className="group relative aspect-square overflow-hidden rounded-lg border cursor-pointer hover:shadow-lg transition-shadow"
											>
												{item.type === "image" ? (
													<img
														src={item.thumbnail}
														alt={item.eventName}
														className="h-full w-full object-cover"
													/>
												) : (
													<div className="relative h-full w-full">
														<img
															src={item.thumbnail}
															alt={item.eventName}
															className="h-full w-full object-cover"
														/>
														<div className="absolute inset-0 flex items-center justify-center bg-black/30">
															<Video className="h-8 w-8 text-white" />
														</div>
													</div>
												)}
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
													<div className="absolute bottom-0 left-0 right-0 p-3 text-white">
														<p className="text-sm font-medium truncate">
															{item.eventName}
														</p>
														<p className="text-xs opacity-80">
															{format(new Date(item.uploadedAt), "MMM d, yyyy")}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-12 text-gray-500 dark:text-gray-400">
										<ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
										<p>No media uploaded yet</p>
										{isAdmin && (
											<Button className="mt-4" size="sm" variant="outline">
												<Upload className="mr-2 h-4 w-4" />
												Upload First Media
											</Button>
										)}
									</div>
								)}
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</SheetContent>

			{/* Remove Member Dialog */}
			<AlertDialog
				open={removingMemberId !== null}
				onOpenChange={(open) => !open && setRemovingMemberId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Remove Member</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to remove this member from the organization?
							They will lose access to all organization events and data.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								const member = allMembers.find((m) => m.id === removingMemberId);
								if (member) {
									handleRemoveMember(member.id, member.name);
								}
							}}
							className="bg-red-600 text-white hover:bg-red-700"
						>
							Remove Member
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Remove Admin Dialog */}
			<AlertDialog
				open={removingAdminId !== null}
				onOpenChange={(open) => !open && setRemovingAdminId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Remove Admin Role</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to remove the admin role from this member?
							They will become a regular member.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								const member = allMembers.find((m) => m.id === removingAdminId);
								if (member) {
									handleRemoveAdmin(member.id, member.name);
								}
							}}
							className="bg-yellow-600 text-white hover:bg-yellow-700"
						>
							Remove Admin
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Make Admin Dialog */}
			<AlertDialog
				open={makingAdminId !== null}
				onOpenChange={(open) => !open && setMakingAdminId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Make Admin</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to make this member an admin? They will be
							able to manage members and invitations.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								const member = allMembers.find((m) => m.id === makingAdminId);
								if (member) {
									handleMakeAdmin(member.id, member.name);
								}
							}}
							className="bg-blue-600 text-white hover:bg-blue-700"
						>
							Make Admin
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Cancel Invitation Dialog */}
			<AlertDialog
				open={cancelingInvitationId !== null}
				onOpenChange={(open) => !open && setCancelingInvitationId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Cancel Invitation</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to cancel this invitation? The recipient will
							no longer be able to accept it.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Keep Invitation</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								const invitation = invitations.find(
									(i) => i.id === cancelingInvitationId,
								);
								if (invitation) {
									handleCancelInvitation(invitation.id, invitation.email);
								}
							}}
							className="bg-red-600 text-white hover:bg-red-700"
						>
							Cancel Invitation
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Disband Organization Dialog */}
			<AlertDialog
				open={showDisbandDialog}
				onOpenChange={setShowDisbandDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
							<AlertTriangle className="h-5 w-5" />
							Disband Organization
						</AlertDialogTitle>
						<AlertDialogDescription className="space-y-2">
							<p>
								Are you absolutely sure you want to disband{" "}
								<strong>{organization?.name}</strong>?
							</p>
							<p className="text-red-600 dark:text-red-400 font-medium">
								This action cannot be undone. This will permanently:
							</p>
							<ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-2">
								<li>Delete the organization and all its data</li>
								<li>Remove all members from the organization</li>
								<li>Cancel all pending invitations</li>
								<li>Remove access to all organization events</li>
							</ul>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDisbanding}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDisbandOrganization}
							disabled={isDisbanding}
							className="bg-red-600 text-white hover:bg-red-700"
						>
							{isDisbanding ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Disbanding...
								</>
							) : (
								<>
									<Trash2 className="mr-2 h-4 w-4" />
									Disband Organization
								</>
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Invite Members Dialog */}
			{organization?.id && (
				<div className="hidden">
					<InviteMembersDialog
						organizationId={Number(organization.id)}
						open={showInviteDialog}
						onOpenChange={setShowInviteDialog}
						onInviteSent={() => {
							setShowInviteDialog(false);
							onUpdate?.();
						}}
					/>
				</div>
			)}
		</Sheet>
	);
}

