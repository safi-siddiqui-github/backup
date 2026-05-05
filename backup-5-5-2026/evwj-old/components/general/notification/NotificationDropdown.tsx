"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";

type NotificationDropdownProps = {
	onSeeAll?: () => void;
};

export default function NotificationDropdown({
	onSeeAll,
}: NotificationDropdownProps) {
	const [notifications, setNotifications] = useState<Partial<Notification>[]>(
		[],
	);
	const [unreadCount, setUnreadCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const loadNotifications = async () => {
		setIsLoading(true);
		// const response = await ActionResponseHelper(async () => {
		//   return await (5, 0);
		// });

		// if (response.success) {
		//   setNotifications(response.data?.notifications || []);
		//   setUnreadCount(response.data?.unreadCount || 0);
		// }
		setIsLoading(false);
	};

	useEffect(() => {
		loadNotifications();
		// Refresh notifications every 30 seconds
		const interval = setInterval(loadNotifications, 30000);
		return () => clearInterval(interval);
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
