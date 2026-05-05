"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import NotificationPopover from "./NotificationPopover";

export default function NotificationBell() {
	const [unreadCount, setUnreadCount] = useState(0);
	const [showPopover, setShowPopover] = useState(false);

	const loadUnreadCount = async () => {
		// const response = await ActionResponseHelper(async () => {
		//   return await GetNotificationsAction(1, 0);
		// });
		// if (response.success) {
		//   setUnreadCount(response.data?.unreadCount || 0);
		// }
	};

	useEffect(() => {
		loadUnreadCount();
		// Refresh count every 30 seconds
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
