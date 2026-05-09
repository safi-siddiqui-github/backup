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
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
	UpdateOrganizationSchema,
	UpdateOrganizationSchemaInfer,
} from "@/lib/validation/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
	AlertTriangle,
	CheckCircle,
	Clock,
	Crown,
	Loader2,
	Mail,
	Settings,
	Trash2,
	Users,
	X,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Organization = {
	id: number;
	name: string;
	description: string;
	website: string;
	contactInfo: string;
};

type ManageOrganizationDialogProps = {
	organization: Partial<Organization>;
	onUpdate?: () => void;
};

export default function ManageOrganizationDialog({
	organization,
	onUpdate,
}: ManageOrganizationDialogProps) {
	const [open, setOpen] = useState(false);
	const isOwner = (organization as any).role === "OWNER";
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [members, setMembers] = useState<any[]>([]);
	const [isLoadingMembers, setIsLoadingMembers] = useState(false);
	const [removingMemberId, setRemovingMemberId] = useState<number | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [invitations, setInvitations] = useState<any[]>([]);
	const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);
	const [revokingInvitationId, setRevokingInvitationId] = useState<
		number | null
	>(null);
	const [updatingRoleMemberId, setUpdatingRoleMemberId] = useState<
		number | null
	>(null);

	const form = useForm<UpdateOrganizationSchemaInfer>({
		resolver: zodResolver(UpdateOrganizationSchema),
		defaultValues: {
			organizationId: organization.id,
			name: organization.name || "",
			description: organization.description || "",
			website: organization.website || "",
			contactInfo: organization.contactInfo || "",
		},
	});

	useEffect(() => {
		if (open && organization.id) {
			loadMembers();
			loadInvitations();
		}
	}, [open, organization.id]);

	const loadMembers = async () => {
		setIsLoadingMembers(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await GetOrganizationMembersAction(organization.id!);
		// });

		// if (response.success) {
		//   setMembers(response.data?.organizationMembers || []);
		// } else {
		//   toast.error(response.message || "Failed to load members");
		// }
		setIsLoadingMembers(false);
	};

	const loadInvitations = async () => {
		setIsLoadingInvitations(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await GetOrganizationInvitationsAction(organization.id!);
		// });

		// if (response.success) {
		//   setInvitations(response.data?.organizationInvitations || []);
		// } else {
		//   toast.error(response.message || "Failed to load invitations");
		// }
		setIsLoadingInvitations(false);
	};

	const onSubmit = async (values: UpdateOrganizationSchemaInfer) => {
		setIsSubmitting(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await UpdateOrganizationAction(values);
		// });

		// if (response.success) {
		//   toast.success(response.message || "Organization updated successfully");
		//   if (onUpdate) {
		//     onUpdate();
		//   }
		//   setOpen(false);
		// } else {
		//   toast.error(response.message || "Failed to update organization");
		// }
		setIsSubmitting(false);
	};

	const handleRemoveMember = async (memberId: number) => {
		if (!confirm("Are you sure you want to remove this member?")) {
			return;
		}

		setRemovingMemberId(memberId);
		// const response = await ActionResponseHelper(async () => {
		//   return await RemoveMemberAction(organization.id!, memberId);
		// });

		// if (response.success) {
		//   toast.success("Member removed successfully");
		//   loadMembers();
		//   if (onUpdate) {
		//     onUpdate();
		//   }
		// } else {
		//   toast.error(response.message || "Failed to remove member");
		// }
		setRemovingMemberId(null);
	};

	const handleUpdateMemberRole = async (
		memberId: number,
		newRole: "ADMIN" | "MEMBER",
	) => {
		setUpdatingRoleMemberId(memberId);
		// const response = await ActionResponseHelper(async () => {
		//   return await UpdateMemberRoleAction(organization.id!, memberId, newRole);
		// });

		// if (response.success) {
		//   toast.success(response.message || "Member role updated successfully");
		//   loadMembers();
		//   if (onUpdate) {
		//     onUpdate();
		//   }
		// } else {
		//   toast.error(response.message || "Failed to update member role");
		// }
		setUpdatingRoleMemberId(null);
	};

	const handleDeleteOrganization = async () => {
		setIsDeleting(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await DeleteOrganizationAction(organization.id!);
		// });

		// if (response.success) {
		//   toast.success("Organization deleted successfully");
		//   setOpen(false);
		//   if (onUpdate) {
		//     onUpdate();
		//   }
		//   // Refresh the page to update the organizations list
		//   window.location.reload();
		// } else {
		//   toast.error(response.message || "Failed to delete organization");
		// }
		setIsDeleting(false);
	};

	const handleRevokeInvitation = async (invitationId: number) => {
		setRevokingInvitationId(invitationId);
		// const response = await ActionResponseHelper(async () => {
		//   return await RevokeInvitationAction(invitationId);
		// });

		// if (response.success) {
		//   toast.success("Invitation revoked successfully");
		//   loadInvitations();
		//   if (onUpdate) {
		//     onUpdate();
		//   }
		// } else {
		//   toast.error(response.message || "Failed to revoke invitation");
		// }
		setRevokingInvitationId(null);
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "PENDING":
				return <Clock className="h-4 w-4 text-yellow-500" />;
			case "ACCEPTED":
				return <CheckCircle className="h-4 w-4 text-green-500" />;
			case "DECLINED":
				return <XCircle className="h-4 w-4 text-red-500" />;
			case "EXPIRED":
				return <X className="h-4 w-4 text-gray-500" />;
			default:
				return null;
		}
	};

	const getStatusBadge = (status: string) => {
		const baseClasses = "text-xs px-2 py-1 rounded-full";
		switch (status) {
			case "PENDING":
				return `${baseClasses} bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400`;
			case "ACCEPTED":
				return `${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400`;
			case "DECLINED":
				return `${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400`;
			case "EXPIRED":
				return `${baseClasses} bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400`;
			default:
				return baseClasses;
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Settings className="mr-2 h-4 w-4" />
					Manage
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-white backdrop-blur-sm dark:bg-slate-800/95">
				<DialogHeader>
					<DialogTitle>Manage Organization</DialogTitle>
					<DialogDescription>
						Update organization details and manage members
					</DialogDescription>
				</DialogHeader>
				<Tabs defaultValue="details" className="w-full">
					<TabsList className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						<TabsTrigger value="details" className="flex-1">
							Details
						</TabsTrigger>
						<TabsTrigger value="members" className="flex-1">
							Members
						</TabsTrigger>
						<TabsTrigger value="invitations" className="flex-1">
							<Mail className="mr-2 h-4 w-4" />
							Invitations
						</TabsTrigger>
					</TabsList>

					<TabsContent value="details" className="mt-4 space-y-4">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Organization Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea {...field} className="min-h-[100px]" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="website"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Website</FormLabel>
											<FormControl>
												<Input {...field} type="url" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="contactInfo"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contact Information</FormLabel>
											<FormControl>
												<Textarea {...field} className="min-h-20" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<Button
										type="button"
										variant="outline"
										onClick={() => setOpen(false)}
										disabled={isSubmitting}
									>
										Cancel
									</Button>
									<Button
										type="submit"
										className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Saving..." : "Save Changes"}
									</Button>
								</DialogFooter>
							</form>
						</Form>

						{/* Danger Zone */}
						<div className="mt-6 border-t pt-6">
							<h4 className="mb-4 flex items-center gap-2 font-medium text-red-600 dark:text-red-400">
								<AlertTriangle className="h-4 w-4" />
								Danger Zone
							</h4>
							<div className="space-y-4 rounded-lg border border-red-200 p-4 dark:border-red-800">
								<div>
									<h5 className="mb-1 font-medium text-red-600 dark:text-red-400">
										Delete Organization
									</h5>
									<p className="text-muted-foreground mb-3 text-sm">
										Permanently delete this organization and all associated
										data. This action cannot be undone.
									</p>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant="destructive"
												disabled={isDeleting}
												className="w-full sm:w-auto"
											>
												{isDeleting ? (
													<>
														<Loader2 className="mr-2 h-4 w-4 animate-spin" />
														Deleting...
													</>
												) : (
													<>
														<Trash2 className="mr-2 h-4 w-4" />
														Delete Organization
													</>
												)}
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
											<AlertDialogHeader>
												<AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
													<AlertTriangle className="h-5 w-5" />
													Delete Organization
												</AlertDialogTitle>
												<AlertDialogDescription>
													Are you sure you want to delete{" "}
													<strong>{organization.name}</strong>? This will
													permanently delete:
													<ul className="mt-2 list-inside list-disc space-y-1">
														<li>All organization members</li>
														<li>All pending invitations</li>
														<li>All organization data</li>
														<li>
															All events associated with this organization
														</li>
													</ul>
													<p className="mt-3 font-semibold text-red-600 dark:text-red-400">
														This action cannot be undone.
													</p>
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel disabled={isDeleting}>
													Cancel
												</AlertDialogCancel>
												<AlertDialogAction
													onClick={handleDeleteOrganization}
													disabled={isDeleting}
													className="bg-red-600 text-white hover:bg-red-700"
												>
													{isDeleting ? (
														<>
															<Loader2 className="mr-2 h-4 w-4 animate-spin" />
															Deleting...
														</>
													) : (
														<>
															<Trash2 className="mr-2 h-4 w-4" />
															Delete Organization
														</>
													)}
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="members" className="mt-4 space-y-4">
						{isLoadingMembers ? (
							<div className="flex items-center justify-center py-8">
								<Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
							</div>
						) : members.length > 0 ? (
							<div className="max-h-[400px] space-y-2 overflow-y-auto">
								{members.map((member) => (
									<div
										key={member.id}
										className="flex items-center justify-between rounded-lg border bg-white p-4 backdrop-blur-sm dark:bg-slate-800/95"
									>
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10">
												<AvatarImage
													src={
														member.user?.email
															? `https://api.dicebear.com/7.x/initials/svg?seed=${member.user.email}`
															: undefined
													}
												/>
												<AvatarFallback className="bg-linear-to-br from-purple-500 to-blue-500 text-white">
													{member.user?.firstname?.[0] ||
														member.user?.lastname?.[0] ||
														member.user?.email?.[0] ||
														"U"}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className="flex items-center gap-2">
													<p className="font-medium">
														{member.user?.firstname && member.user?.lastname
															? `${member.user.firstname} ${member.user.lastname}`
															: member.user?.username || member.user?.email}
													</p>
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
												</div>
												<p className="text-muted-foreground text-sm">
													{member.user?.email}
												</p>
												{member.joinedAt && (
													<p className="text-muted-foreground text-xs">
														Joined{" "}
														{format(new Date(member.joinedAt), "MMM d, yyyy")}
													</p>
												)}
											</div>
										</div>
										<div className="flex shrink-0 items-center gap-2">
											{isOwner && member.role !== "OWNER" ? (
												<Select
													value={member.role}
													onValueChange={(value: "ADMIN" | "MEMBER") =>
														handleUpdateMemberRole(member.id, value)
													}
													disabled={updatingRoleMemberId === member.id}
												>
													<SelectTrigger className="w-32">
														<SelectValue />
													</SelectTrigger>
													<SelectContent className="bg-white backdrop-blur-sm dark:bg-slate-800/95">
														<SelectItem value="ADMIN">
															<span className="flex items-center gap-2">
																<Crown className="h-3 w-3" />
																Admin
															</span>
														</SelectItem>
														<SelectItem value="MEMBER">
															<span className="flex items-center gap-2">
																<Users className="h-3 w-3" />
																Member
															</span>
														</SelectItem>
													</SelectContent>
												</Select>
											) : (
												<span className="text-muted-foreground text-sm">
													{member.role === "OWNER"
														? "Owner"
														: member.role === "ADMIN"
															? "Admin"
															: "Member"}
												</span>
											)}
											{member.role !== "OWNER" && isOwner && (
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleRemoveMember(member.id)}
													disabled={
														removingMemberId === member.id ||
														updatingRoleMemberId === member.id
													}
													className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
												>
													{removingMemberId === member.id ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<>
															<Trash2 className="mr-2 h-4 w-4" />
															Remove
														</>
													)}
												</Button>
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-muted-foreground py-8 text-center">
								<Users className="mx-auto mb-3 h-12 w-12 opacity-50" />
								<p className="text-sm">No members found</p>
							</div>
						)}
					</TabsContent>

					<TabsContent value="invitations" className="mt-4 space-y-4">
						{isLoadingInvitations ? (
							<div className="flex items-center justify-center py-8">
								<Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
							</div>
						) : invitations.length > 0 ? (
							<div className="max-h-[400px] space-y-2 overflow-y-auto">
								{invitations.map((invitation) => {
									const invitedUser = invitation.invitedUser;
									const invitedEmail = invitation.email || invitedUser?.email;
									const invitedName = invitedUser
										? `${invitedUser.firstname || ""} ${invitedUser.lastname || ""}`.trim() ||
											invitedUser.username ||
											invitedUser.email
										: invitation.email;

									return (
										<div
											key={invitation.id}
											className="flex items-center justify-between rounded-lg border bg-white p-4 backdrop-blur-sm dark:bg-slate-800/95"
										>
											<div className="flex min-w-0 flex-1 items-center gap-3">
												<Avatar className="h-10 w-10">
													<AvatarImage
														src={
															invitedEmail
																? `https://api.dicebear.com/7.x/initials/svg?seed=${invitedEmail}`
																: undefined
														}
													/>
													<AvatarFallback className="bg-linear-to-br from-purple-500 to-blue-500 text-white">
														{invitedName?.[0]?.toUpperCase() ||
															invitedEmail?.[0]?.toUpperCase() ||
															"?"}
													</AvatarFallback>
												</Avatar>
												<div className="min-w-0 flex-1">
													<div className="flex flex-wrap items-center gap-2">
														<p className="truncate font-medium">
															{invitedName || "Unknown User"}
														</p>
														<Badge
															className={getStatusBadge(invitation.status)}
														>
															<span className="flex items-center gap-1">
																{getStatusIcon(invitation.status)}
																{invitation.status}
															</span>
														</Badge>
													</div>
													<p className="text-muted-foreground truncate text-sm">
														{invitedEmail}
													</p>
													<div className="mt-1 flex items-center gap-2">
														<p className="text-muted-foreground text-xs">
															Invited by {invitation.invitedBy?.firstname}{" "}
															{invitation.invitedBy?.lastname}
														</p>
														{invitation.createdAt && (
															<>
																<span className="text-muted-foreground text-xs">
																	•
																</span>
																<p className="text-muted-foreground text-xs">
																	{format(
																		new Date(invitation.createdAt),
																		"MMM d, yyyy",
																	)}
																</p>
															</>
														)}
													</div>
													{invitation.integrationSource &&
														invitation.integrationSource !== "MANUAL" && (
															<Badge variant="outline" className="mt-1 text-xs">
																Via{" "}
																{invitation.integrationSource.replace("_", " ")}
															</Badge>
														)}
												</div>
											</div>
											{invitation.status === "PENDING" && (
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleRevokeInvitation(invitation.id)}
													disabled={revokingInvitationId === invitation.id}
													className="shrink-0 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
												>
													{revokingInvitationId === invitation.id ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<>
															<XCircle className="mr-2 h-4 w-4" />
															Revoke
														</>
													)}
												</Button>
											)}
										</div>
									);
								})}
							</div>
						) : (
							<div className="text-muted-foreground py-8 text-center">
								<Mail className="mx-auto mb-3 h-12 w-12 opacity-50" />
								<p className="text-sm">No invitations found</p>
							</div>
						)}
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
