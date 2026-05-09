"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import IntegrationButton from "./integrations/IntegrationButton";

type InviteMembersDialogProps = {
	organizationId: number;
	onInviteSent?: () => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export default function InviteMembersDialog({
	organizationId,
	onInviteSent,
	open: controlledOpen,
	onOpenChange: controlledOnOpenChange,
}: InviteMembersDialogProps) {
	const [internalOpen, setInternalOpen] = useState(false);
	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const setOpen = controlledOnOpenChange || setInternalOpen;
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [isInviting, setIsInviting] = useState<number | null>(null);

	const handleSearch = async () => {
		if (!searchQuery.trim()) {
			setSearchResults([]);
			return;
		}

		setIsSearching(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await SearchUsersAction({ query: searchQuery, limit: 10 });
		// });

		// if (response.success) {
		//   setSearchResults(response.data?.users || []);
		// } else {
		//   toast.error(response.message || "Failed to search users");
		// }
		setIsSearching(false);
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (searchQuery.trim()) {
				handleSearch();
			} else {
				setSearchResults([]);
			}
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	const handleInvite = async (userId: number) => {
		setIsInviting(userId);
		// const response = await ActionResponseHelper(async () => {
		//   return await InviteMemberAction({
		//     organizationId,
		//     userId,
		//     integrationSource: "MANUAL",
		//   });
		// });

		// if (response.success) {
		//   toast.success("Invitation sent successfully");
		//   setSearchQuery("");
		//   setSearchResults([]);
		//   if (onInviteSent) {
		//     onInviteSent();
		//   }
		// } else {
		//   toast.error(response.message || "Failed to send invitation");
		// }
		setIsInviting(null);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<UserPlus className="mr-2 h-4 w-4" />
					Invite Members
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-white backdrop-blur-sm dark:bg-slate-800/95">
				<DialogHeader>
					<DialogTitle>Invite Members</DialogTitle>
					<DialogDescription>
						Invite members to your organization by searching for users or using
						integration platforms
					</DialogDescription>
				</DialogHeader>
				<Tabs defaultValue="search" className="w-full">
					<TabsList className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						<TabsTrigger value="search" className="flex-1">
							Search Users
						</TabsTrigger>
						<TabsTrigger value="integrations" className="flex-1">
							Integration Platforms
						</TabsTrigger>
					</TabsList>

					<TabsContent value="search" className="mt-4 space-y-4">
						<div className="relative">
							<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
							<Input
								placeholder="Search by email, username, or name..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>

						{isSearching && (
							<div className="flex items-center justify-center py-8">
								<Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
							</div>
						)}

						{!isSearching && searchResults.length > 0 && (
							<div className="max-h-[400px] space-y-2 overflow-y-auto">
								{searchResults.map((user) => (
									<div
										key={user.id}
										className="flex items-center justify-between rounded-lg border bg-white p-3 backdrop-blur-sm dark:bg-slate-800/95"
									>
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10">
												<AvatarImage
													src={
														user.email
															? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`
															: undefined
													}
												/>
												<AvatarFallback className="bg-linear-to-br from-purple-500 to-blue-500 text-white">
													{user.firstname?.[0] ||
														user.lastname?.[0] ||
														user.email?.[0] ||
														"U"}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className="font-medium">
													{user.firstname && user.lastname
														? `${user.firstname} ${user.lastname}`
														: user.username || user.email}
												</p>
												<p className="text-muted-foreground text-sm">
													{user.email}
												</p>
											</div>
										</div>
										<Button
											size="sm"
											onClick={() => handleInvite(user.id)}
											disabled={isInviting === user.id}
											className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
										>
											{isInviting === user.id ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Inviting...
												</>
											) : (
												<>
													<UserPlus className="mr-2 h-4 w-4" />
													Invite
												</>
											)}
										</Button>
									</div>
								))}
							</div>
						)}

						{!isSearching && searchQuery && searchResults.length === 0 && (
							<div className="text-muted-foreground py-8 text-center">
								<p>No users found</p>
							</div>
						)}

						{!isSearching && !searchQuery && (
							<div className="text-muted-foreground py-8 text-center">
								<p>Start typing to search for users</p>
							</div>
						)}
					</TabsContent>

					<TabsContent value="integrations" className="mt-4 space-y-4">
						<div className="grid grid-cols-2 gap-3">
							<IntegrationButton platform="MS_TEAMS" />
							<IntegrationButton platform="SLACK" />
							<IntegrationButton platform="DISCORD" />
							<IntegrationButton platform="WEBEX" />
							<IntegrationButton platform="LINKEDIN" />
							<IntegrationButton platform="FACEBOOK" />
							<IntegrationButton platform="INSTAGRAM" />
							<IntegrationButton platform="TIKTOK" />
						</div>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
