"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Building2, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import CreateOrganizationDialog from "../organization/CreateOrganizationDialog";
import OrganizationCard from "../organization/OrganizationCard";
import {
	MOCK_ORGANIZATIONS,
	MOCK_PENDING_INVITATIONS,
} from "@/lib/mock-organizations";

export default function OrganizationTab() {
	const [organizations, setOrganizations] = useState<any[]>([]);
	const [pendingInvitations, setPendingInvitations] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		setIsLoading(true);
		// const [orgsResponse, invResponse] = await Promise.all([
		//   ActionResponseHelper(async () => await GetUserOrganizationsAction()),
		//   ActionResponseHelper(async () => await GetPendingInvitationsAction()),
		// ]);

		// if (orgsResponse.success) {
		//   setOrganizations(orgsResponse.data?.organizations || []);
		// }

		// if (invResponse.success) {
		//   setPendingInvitations(invResponse.data?.organizationInvitations || []);
		// }

		// Using mock data for now
		setOrganizations(MOCK_ORGANIZATIONS);
		setPendingInvitations(MOCK_PENDING_INVITATIONS);

		setIsLoading(false);
	};

	const handleCreateOrganization = (organization: any) => {
		setOrganizations((prev) => [organization, ...prev]);
		toast.success("Organization created successfully");
	};

	const handleLeaveOrganization = (organizationId: number | string) => {
		setOrganizations((prev) =>
			prev.filter((org) => org.id !== organizationId),
		);
		toast.success("Left organization successfully");
	};

	const handleAcceptInvitation = async (invitationId: number) => {
		// const response = await ActionResponseHelper(async () => {
		//   return await AcceptInvitationAction(invitationId);
		// });
		// if (response.success) {
		//   toast.success("Invitation accepted successfully");
		//   loadData();
		// } else {
		//   toast.error(response.message || "Failed to accept invitation");
		// }
	};

	const handleDeclineInvitation = async (invitationId: number) => {
		// const response = await ActionResponseHelper(async () => {
		//   return await DeclineInvitationAction(invitationId);
		// });
		// if (response.success) {
		//   toast.success("Invitation declined");
		//   loadData();
		// } else {
		//   toast.error(response.message || "Failed to decline invitation");
		// }
	};

	// Pagination calculations
	const totalPages = Math.ceil(organizations.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedOrganizations = useMemo(() => {
		return organizations.slice(startIndex, endIndex);
	}, [organizations, startIndex, endIndex]);

	// Reset to page 1 when items per page changes
	useEffect(() => {
		setCurrentPage(1);
	}, [itemsPerPage]);

	return (
		<div className="space-y-6">
			{/* Organization Affiliations */}
			<Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<Building2 className="h-5 w-5" />
								Organization Affiliations
							</CardTitle>
							<CardDescription>
								Manage your organization memberships and event creation
								preferences
							</CardDescription>
						</div>
						<CreateOrganizationDialog onCreate={handleCreateOrganization} />
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Pending Invitations */}
					{pendingInvitations.length > 0 && (
						<div className="space-y-4">
							<h4 className="flex items-center gap-2 font-medium">
								<Mail className="h-4 w-4" />
								Pending Invitations
							</h4>
							<div className="space-y-2">
								{pendingInvitations.map((invitation) => (
									<div
										key={invitation.id}
										className="flex items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]"
									>
										<div>
											<p className="font-medium">
												Invitation to join {invitation.organization?.name}
											</p>
											<p className="text-muted-foreground text-sm">
												Invited by {invitation.invitedBy?.firstname}{" "}
												{invitation.invitedBy?.lastname}
											</p>
											{invitation.createdAt && (
												<p className="text-muted-foreground mt-1 text-xs">
													{format(
														new Date(invitation.createdAt),
														"MMM d, yyyy",
													)}
												</p>
											)}
										</div>
										<div className="flex gap-2">
											<Button
												size="sm"
												variant="outline"
												onClick={() => handleDeclineInvitation(invitation.id)}
												className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
											>
												Decline
											</Button>
											<Button
												size="sm"
												onClick={() => handleAcceptInvitation(invitation.id)}
												className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
											>
												Accept
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Organizations List */}
					{isLoading ? (
						<div className="text-muted-foreground py-8 text-center">
							<p>Loading organizations...</p>
						</div>
					) : organizations.length > 0 ? (
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h4 className="font-medium">Your Organizations</h4>
								<Badge variant="outline" className="text-xs">
									{organizations.length}{" "}
									{organizations.length === 1
										? "organization"
										: "organizations"}
								</Badge>
							</div>
							<div className="space-y-4">
								{paginatedOrganizations.map((org) => (
									<OrganizationCard
										key={org.id}
										organization={org}
										onUpdate={loadData}
										onLeave={handleLeaveOrganization}
									/>
								))}
							</div>
						</div>
					) : (
						<div className="rounded-lg border-2 border-dashed py-8 text-center">
							<Building2 className="text-muted-foreground mx-auto mb-3 h-12 w-12" />
							<h4 className="mb-1 font-medium">No Organization Affiliations</h4>
							<p className="text-muted-foreground mb-4 text-sm">
								You're not currently affiliated with any organizations
							</p>
							<CreateOrganizationDialog onCreate={handleCreateOrganization} />
						</div>
					)}

					{/* Pagination */}
					{organizations.length > 0 && (
						<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
							<CardContent className="p-4">
								<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-600 dark:text-slate-400">
											Items per page:
										</span>
										<select
											value={itemsPerPage}
											onChange={(e) => {
												setItemsPerPage(Number(e.target.value));
												setCurrentPage(1);
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
											Showing {startIndex + 1} -{" "}
											{Math.min(endIndex, organizations.length)} of {organizations.length}
										</span>
										<div className="flex items-center gap-1">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													setCurrentPage((prev) => Math.max(1, prev - 1))
												}
												disabled={currentPage === 1}
											>
												<ChevronLeft className="h-4 w-4" />
											</Button>
											<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
												Page {currentPage} of {totalPages}
											</span>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													setCurrentPage((prev) =>
														Math.min(totalPages, prev + 1),
													)
												}
												disabled={currentPage === totalPages}
											>
												<ChevronRight className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

