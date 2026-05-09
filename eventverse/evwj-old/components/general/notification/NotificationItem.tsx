"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Bell, Building2, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Notification = {
	isRead: string;
	id: string;
	data: unknown;
	type: string;
	title: string;
	message: string;
	createdAt: string;
};
type NotificationItemProps = {
	notification: Partial<Notification>;
	onAction?: () => void;
};

export default function NotificationItem({
	notification,
	onAction,
}: NotificationItemProps) {
	const [isProcessing, setIsProcessing] = useState(false);

	const handleMarkRead = async () => {
		if (notification.isRead || !notification.id) return;

		setIsProcessing(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await MarkNotificationReadAction(notification.id!);
		// });

		// if (response.success && onAction) {
		//   onAction();
		// }
		setIsProcessing(false);
	};

	const handleAcceptInvitation = async () => {
		if (!notification.data || !notification.id) return;

		setIsProcessing(true);
		const invitationId = (notification.data as any)?.invitationId;
		if (!invitationId) {
			toast.error("Invalid invitation data");
			setIsProcessing(false);
			return;
		}

		// const response = await ActionResponseHelper(async () => {
		//   return await AcceptOrgInvitation(invitationId);
		// });

		// if (response.success) {
		//   toast.success("Invitation accepted successfully");
		//   await handleMarkRead();
		//   if (onAction) {
		//     onAction();
		//   }
		// } else {
		//   toast.error(response.message || "Failed to accept invitation");
		// }
		setIsProcessing(false);
	};

	const handleDeclineInvitation = async () => {
		if (!notification.data || !notification.id) return;

		setIsProcessing(true);
		const invitationId = (notification.data as any)?.invitationId;
		if (!invitationId) {
			toast.error("Invalid invitation data");
			setIsProcessing(false);
			return;
		}

		// const response = await ActionResponseHelper(async () => {
		//   return await DeclineOrgInvitation(invitationId);
		// });

		// if (response.success) {
		//   toast.success("Invitation declined");
		//   await handleMarkRead();
		//   if (onAction) {
		//     onAction();
		//   }
		// } else {
		//   toast.error(response.message || "Failed to decline invitation");
		// }
		setIsProcessing(false);
	};

	const getIcon = () => {
		switch (notification.type) {
			case "ORG_INVITATION":
				return <Building2 className="h-4 w-4" />;
			default:
				return <Bell className="h-4 w-4" />;
		}
	};

	const getIconColor = () => {
		switch (notification.type) {
			case "ORG_INVITATION":
				return "text-blue-500";
			default:
				return "text-gray-500";
		}
	};

	return (
		<div
			className={`hover:bg-accent/50 cursor-pointer border-b p-3 transition-colors last:border-b-0 ${
				!notification.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
			}`}
			onClick={handleMarkRead}
		>
			<div className="flex items-start gap-3">
				<div className={`mt-0.5 ${getIconColor()}`}>{getIcon()}</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0 flex-1">
							<p className="text-sm font-medium">{notification.title}</p>
							<p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
								{notification.message}
							</p>
							{notification.createdAt && (
								<p className="text-muted-foreground mt-1 text-xs">
									{formatDistanceToNow(new Date(notification.createdAt), {
										addSuffix: true,
									})}
								</p>
							)}
						</div>
						{!notification.isRead && (
							<Badge
								variant="outline"
								className="shrink-0 border-blue-500 bg-blue-500 text-xs text-white"
							>
								New
							</Badge>
						)}
					</div>

					{notification.type === "ORG_INVITATION" && !notification.isRead && (
						<div className="mt-3 flex gap-2">
							<Button
								size="sm"
								variant="outline"
								onClick={(e) => {
									e.stopPropagation();
									handleDeclineInvitation();
								}}
								disabled={isProcessing}
								className="h-7 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
							>
								<XCircle className="mr-1 h-3 w-3" />
								Decline
							</Button>
							<Button
								size="sm"
								onClick={(e) => {
									e.stopPropagation();
									handleAcceptInvitation();
								}}
								disabled={isProcessing}
								className="bg-lienar-to-r h-7 from-purple-600 to-blue-600 text-xs hover:from-purple-700 hover:to-blue-700"
							>
								<CheckCircle2 className="mr-1 h-3 w-3" />
								Accept
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
