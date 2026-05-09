"use client";

import { Button } from "@/shadcn/ui/button";
import { Bell,  CheckCheck, CheckCircle2, Loader2,   XCircle } from "lucide-react";
import { ReactNode,   useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu";
import { Badge } from "@/shadcn/ui/badge";
import { formatDistanceToNow as dateFnsFormatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shadcn/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

export default function WebHeaderNotificationBellComponent() {
	const [unreadCount, setUnreadCount] = useState(0);
	const [showPopover, setShowPopover] = useState(false);

	const loadUnreadCount = async () => {
	};

	useEffect(() => {
		loadUnreadCount();
		const interval = setInterval(loadUnreadCount, 30000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="relative h-8 w-8 min-[2560px]:h-10 min-[2560px]:w-10 lg:h-8 lg:w-8 xl:h-9 xl:w-9"
					>
						<Bell className="h-4 w-4 min-[2560px]:h-6 min-[2560px]:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
						{unreadCount > 0 && (
							<Badge
								variant="destructive"
								className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center p-0 text-[10px] min-[2560px]:h-6 min-[2560px]:w-6 min-[2560px]:text-sm lg:h-4 lg:w-4 lg:text-[10px] xl:h-5 xl:w-5 xl:text-xs"
							>
								{unreadCount > 9 ? "9+" : unreadCount}
							</Badge>
						)}
					</Button>
				</DropdownMenuTrigger>
				<NotificationDropdown
					onSeeAll={() => {
						setShowPopover(true);
					}}
				/>
			</DropdownMenu>
			<NotificationPopover open={showPopover} onOpenChange={setShowPopover} />
		</>
	);
}


type NotificationDropdownProps = {
	onSeeAll?: () => void;
};

function NotificationDropdown({
	onSeeAll,
}: NotificationDropdownProps) {
	const [notifications, setNotifications] = useState<Partial<Notification>[]>(
		[],
	);
	const [unreadCount, setUnreadCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);


  const loadNotifications = async (): Promise<void> => {
    setIsLoading(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadNotifications();
    }, 0);
    const interval = setInterval(loadNotifications, 30000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

	return (
		<DropdownMenuContent
			className="max-h-[500px] w-80 overflow-y-auto bg-white backdrop-blur-sm dark:bg-slate-800/95"
			align="end"
		>
			<DropdownMenuLabel className="flex items-center justify-between">
				<span>Notifications</span>
				{unreadCount > 0 && (
					<span className="text-muted-foreground text-xs font-normal">
						{unreadCount} unread
					</span>
				)}
			</DropdownMenuLabel>
			<DropdownMenuSeparator />

			{isLoading ? (
				<div className="flex items-center justify-center py-8">
					<Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
				</div>
			) : notifications.length > 0 ? (
				<>
					<div className="max-h-[400px] overflow-y-auto">
						{notifications.map((notification, index) => (
							<NotificationItem
								key={index}
								notification={notification}
								onAction={loadNotifications}
							/>
						))}
					</div>
					<DropdownMenuSeparator />
					<div className="p-2">
						<Button variant="outline" className="w-full" onClick={onSeeAll}>
							See All Notifications
						</Button>
					</div>
				</>
			) : (
				<div className="text-muted-foreground py-8 text-center">
					<Bell className="mx-auto mb-3 h-12 w-12 opacity-50" />
					<p className="text-sm">No notifications</p>
				</div>
			)}
		</DropdownMenuContent>
	);
}


type OrgInvitationData = {
  invitationId: string;
};

type Notification = {
  isRead: string;
  id: string;
  data: OrgInvitationData | unknown;
  type: string;
  title: string;
  message: string;
  createdAt: string;
};
type NotificationItemProps = {
	notification: Partial<Notification>;
	onAction?: () => void;
};

  function NotificationItem({
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
    const invitationId = (notification.data as OrgInvitationData)?.invitationId;
		if (!invitationId) {
			toast.error("Invalid invitation data");
			setIsProcessing(false);
			return;
		}


		setIsProcessing(false);
	};

  const handleDeclineInvitation = async (): Promise<void> => {
    if (!notification.data || !notification.id) return;

    setIsProcessing(true);
    const invitationId = (notification.data as OrgInvitationData)?.invitationId;
    if (!invitationId) {
      toast.error("Invalid invitation data");
      setIsProcessing(false);
      return;
    }
    setIsProcessing(false);
  };

	const getIcon = () => {
		switch (notification.type) {
			case "ORG_INVITATION":
    const invitationId = (notification.data as OrgInvitationData)?.invitationId;
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

  function formatDistanceToNow(date: Date, options: { addSuffix: boolean }): ReactNode {
    return dateFnsFormatDistanceToNow(date, options);
  }

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

type NotificationPopoverProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

function NotificationPopover({
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
			const timeout = setTimeout(() => {
				loadNotifications();
			}, 0);
			return () => clearTimeout(timeout);
		}
	}, [open]);

	const handleMarkAllRead = async () => {
		setIsMarkingAllRead(true);
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
					onValueChange={(v: string) => setFilter(v as "all" | "invitations" | "system")}
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
