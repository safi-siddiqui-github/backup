"use client";

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
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";

type NotificationPopoverProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

type Notification = {
	type: string;
	id: string;
};

export default function NotificationPopover({
	open,
	onOpenChange,
}: NotificationPopoverProps) {
	const [notifications, setNotifications] = useState<Partial<Notification>[]>(
		[],
	);
	const [unreadCount, setUnreadCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [filter, setFilter] = useState<"all" | "invitations" | "system">("all");
	const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);

	const loadNotifications = async () => {
		setIsLoading(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await GetNotificationsAction(50, 0);
		// });

		// if (response.success) {
		//   setNotifications(response.data?.notifications || []);
		//   setUnreadCount(response.data?.unreadCount || 0);
		//   setTotalCount(response.data?.totalCount || 0);
		// }
		setIsLoading(false);
	};

	useEffect(() => {
		if (open) {
			loadNotifications();
		}
	}, [open]);

	const handleMarkAllRead = async () => {
		setIsMarkingAllRead(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await MarkAllNotificationsReadAction();
		// });

		// if (response.success) {
		//   toast.success("All notifications marked as read");
		//   loadNotifications();
		// } else {
		//   toast.error(response.message || "Failed to mark notifications as read");
		// }
		setIsMarkingAllRead(false);
	};

	const filteredNotifications = notifications.filter((notification) => {
		if (filter === "all") return true;
		if (filter === "invitations") return notification.type === "ORG_INVITATION";
		if (filter === "system") return notification.type === "SYSTEM";
		return true;
	});

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="w-full overflow-y-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm sm:max-w-lg [background-color:white] dark:[background-color:#020617]"
			>
				<SheetHeader>
					<div className="flex items-center justify-between">
						<div>
							<SheetTitle className="flex items-center gap-2">
								<Bell className="h-5 w-5" />
								Notifications
							</SheetTitle>
							<SheetDescription>
								{totalCount} total{" "}
								{totalCount === 1 ? "notification" : "notifications"}
								{unreadCount > 0 && (
									<span className="ml-2">• {unreadCount} unread</span>
								)}
							</SheetDescription>
						</div>
						{unreadCount > 0 && (
							<Button
								variant="outline"
								size="sm"
								onClick={handleMarkAllRead}
								disabled={isMarkingAllRead}
							>
								{isMarkingAllRead ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<>
										<CheckCheck className="mr-2 h-4 w-4" />
										Mark All Read
									</>
								)}
							</Button>
						)}
					</div>
				</SheetHeader>

				<Tabs
					value={filter}
					onValueChange={(v) => setFilter(v as any)}
					className="mt-6"
				>
					<TabsList className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						<TabsTrigger value="all" className="flex-1">
							All
							{filter === "all" && totalCount > 0 && (
								<Badge variant="outline" className="ml-2 text-xs">
									{totalCount}
								</Badge>
							)}
						</TabsTrigger>
						<TabsTrigger value="invitations" className="flex-1">
							Invitations
							{filter === "invitations" &&
								notifications.filter((n) => n.type === "ORG_INVITATION")
									.length > 0 && (
									<Badge variant="outline" className="ml-2 text-xs">
										{
											notifications.filter((n) => n.type === "ORG_INVITATION")
												.length
										}
									</Badge>
								)}
						</TabsTrigger>
						<TabsTrigger value="system" className="flex-1">
							System
							{filter === "system" &&
								notifications.filter((n) => n.type === "SYSTEM").length > 0 && (
									<Badge variant="outline" className="ml-2 text-xs">
										{notifications.filter((n) => n.type === "SYSTEM").length}
									</Badge>
								)}
						</TabsTrigger>
					</TabsList>

					<TabsContent value={filter} className="mt-4">
						{isLoading ? (
							<div className="flex items-center justify-center py-12">
								<Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
							</div>
						) : filteredNotifications.length > 0 ? (
							<div className="space-y-0 overflow-hidden rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
								{filteredNotifications.map((notification) => (
									<NotificationItem
										key={notification.id}
										notification={notification}
										onAction={loadNotifications}
									/>
								))}
							</div>
						) : (
							<div className="text-muted-foreground py-12 text-center">
								<Bell className="mx-auto mb-4 h-16 w-16 opacity-50" />
								<p className="text-sm">
									No {filter === "all" ? "" : filter} notifications
								</p>
							</div>
						)}
					</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	);
}
