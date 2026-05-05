import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
	EventTeamMember,
	MODULE_LABELS,
	ModulePermissions,
} from "@/types/eventTeam";
import { formatDistanceToNow } from "date-fns";
import { Edit, MoreVertical, Trash2, Users } from "lucide-react";

interface TeamMemberListItemProps {
	member: EventTeamMember;
	isHost: boolean;
	onPermissionsChange: (
		memberId: string,
		newPermissions: ModulePermissions,
	) => void;
	onRemove: (memberId: string) => void;
}

const statusColors = {
	pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
	accepted: "bg-green-500/10 text-green-600 border-green-500/20",
	declined: "bg-red-500/10 text-red-600 border-red-500/20",
};

export const TeamMemberListItem = ({
	member,
	isHost,
	onPermissionsChange,
	onRemove,
}: TeamMemberListItemProps) => {
	return (
		<div className="bg-card hover:bg-accent/50 space-y-3 rounded-lg border p-4 transition-colors">
			<div className="flex items-start justify-between gap-4">
				<div className="flex flex-1 items-start gap-3">
					<div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
						<Users className="text-primary h-5 w-5" />
					</div>

					<div className="min-w-0 flex-1">
						{member.name && (
							<p className="truncate font-medium">{member.name}</p>
						)}
						<p className="text-muted-foreground truncate text-sm">
							{member.email}
						</p>

						<div className="mt-2 flex flex-wrap gap-2">
							<Badge variant="outline" className={statusColors[member.status]}>
								{member.status.charAt(0).toUpperCase() + member.status.slice(1)}
							</Badge>
						</div>

						{/* Module Permissions Display */}
						{member.modulePermissions &&
						Object.keys(member.modulePermissions).length > 0 ? (
							<div className="mt-3 space-y-2">
								<Label className="text-xs font-medium">Module Access:</Label>
								<div className="flex flex-wrap gap-2">
									{Object.entries(member.modulePermissions).map(
										([module, permission]) => (
											<Badge
												key={module}
												variant="outline"
												className={
													permission === "admin"
														? "bg-blue-500/10 text-blue-600 border-blue-500/20"
														: "bg-gray-500/10 text-gray-600 border-gray-500/20"
												}
											>
												{MODULE_LABELS[module as keyof typeof MODULE_LABELS]}:{" "}
												{permission}
											</Badge>
										),
									)}
								</div>
							</div>
						) : (
							<p className="text-muted-foreground mt-2 text-xs">
								No module access assigned
							</p>
						)}

						<p className="text-muted-foreground mt-2 text-xs">
							Invited{" "}
							{formatDistanceToNow(member.invitedAt, { addSuffix: true })}
							{member.acceptedAt &&
								` • Accepted ${formatDistanceToNow(member.acceptedAt, { addSuffix: true })}`}
						</p>
					</div>
				</div>

				{isHost && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="flex-shrink-0">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="bg-popover">
							<DropdownMenuItem
								onClick={() => {
									// TODO: Open edit permissions dialog
									// For now, just show a placeholder
									// onPermissionsChange could be called from an edit dialog
								}}
							>
								<Edit className="mr-2 h-4 w-4" />
								Edit Permissions
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => onRemove(member.id)}
								className="text-destructive focus:text-destructive"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Remove
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	);
};
