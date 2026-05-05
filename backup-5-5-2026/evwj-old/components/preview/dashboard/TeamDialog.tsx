import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useEventTeam } from "@/hooks/useEventTeam";
import { ModulePermissions } from "@/types/eventTeam";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AddTeamMemberForm } from "./AddTeamMemberForm";
import { TeamMemberListItem } from "./TeamMemberListItem";

interface TeamDialogProps {
	eventId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const TeamDialog = ({
	eventId,
	open,
	onOpenChange,
}: TeamDialogProps) => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [isInviting, setIsInviting] = useState(false);

	const {
		teamMembers,
		inviteTeamMember,
		removeTeamMember,
		updateMemberPermissions,
	} = useEventTeam(eventId);

	const handleInvite = async (
		email: string,
		modulePermissions: ModulePermissions,
	) => {
		setIsInviting(true);
		try {
			inviteTeamMember(email, modulePermissions);
			toast.success("Invitation sent successfully");
			setShowAddForm(false);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to send invitation",
			);
		} finally {
			setIsInviting(false);
		}
	};

	const handlePermissionsChange = (
		memberId: string,
		newPermissions: ModulePermissions,
	) => {
		try {
			updateMemberPermissions(memberId, newPermissions);
			toast.success("Permissions updated successfully");
		} catch (error) {
			toast.error("Failed to update permissions");
		}
	};

	const handleRemove = (memberId: string) => {
		try {
			removeTeamMember(memberId);
			toast.success("Team member removed");
		} catch (error) {
			toast.error("Failed to remove team member");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex max-h-[80vh] max-w-2xl flex-col">
				<DialogHeader>
					<DialogTitle>
						Team Members {teamMembers.length > 0 && `(${teamMembers.length})`}
					</DialogTitle>
					<DialogDescription>
						Manage your event team and invite collaborators
					</DialogDescription>
				</DialogHeader>

				<div className="flex-1 space-y-4 overflow-y-auto">
					<div className="space-y-4">
						{!showAddForm ? (
							<Button
								onClick={() => setShowAddForm(true)}
								className="w-full"
								variant="outline"
							>
								<UserPlus className="mr-2 h-4 w-4" />
								Add Team Member
							</Button>
						) : (
							<AddTeamMemberForm
								onInvite={handleInvite}
								onCancel={() => setShowAddForm(false)}
								isLoading={isInviting}
							/>
						)}
					</div>

					{teamMembers.length === 0 ? (
						<div className="text-muted-foreground py-12 text-center">
							<p>No team members yet</p>
							<p className="mt-2 text-sm">
								Click "Add Team Member" to invite someone
							</p>
						</div>
					) : (
						<div className="space-y-2">
							{teamMembers.map((member) => (
								<TeamMemberListItem
									key={member.id}
									member={member}
									isHost={true}
									onPermissionsChange={handlePermissionsChange}
									onRemove={handleRemove}
								/>
							))}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
