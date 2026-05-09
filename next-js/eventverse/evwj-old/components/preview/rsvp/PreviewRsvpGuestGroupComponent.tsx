"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isFunction } from "lodash";
import { Settings, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";

export default function PreviewRsvpGuestGroupComponent() {
	//
	const [isGroupManagementOpen, setIsGroupManagementOpen] = useState(false);
	//
	const guestListData = useMemo(
		() => [
			{
				id: "1",
				name: "Sarah Johnson",
				email: "sarah@example.com",
				phone: "+1234567890",
				group: "family",
				status: "attending",
				plusOnes: 1,
				plusOneNames: ["John Johnson"],
				dietaryRestrictions: "Vegetarian",
				invitedDate: new Date("2024-01-15"),
				respondedDate: new Date("2024-01-18"),
				avatar:
					"https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
			},
			{
				id: "2",
				name: "Mike Chen",
				email: "mike@example.com",
				group: "friends",
				status: "pending",
				plusOnes: 0,
				invitedDate: new Date("2024-01-15"),
				avatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
			},
			{
				id: "3",
				name: "Emma Davis",
				email: "emma@example.com",
				phone: "+1987654321",
				group: "work",
				status: "declined",
				plusOnes: 0,
				notes: "Travel conflict",
				invitedDate: new Date("2024-01-15"),
				respondedDate: new Date("2024-01-20"),
				avatar:
					"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
			},
			{
				id: "4",
				name: "Alex Rodriguez",
				email: "alex@example.com",
				phone: "+1555123456",
				group: "friends",
				status: "attending",
				plusOnes: 2,
				plusOneNames: ["Maria Rodriguez", "Carlos Rodriguez"],
				dietaryRestrictions: "Gluten-free",
				invitedDate: new Date("2024-01-16"),
				respondedDate: new Date("2024-01-19"),
				avatar:
					"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
			},
			{
				id: "5",
				name: "Lisa Thompson",
				email: "lisa@example.com",
				group: "work",
				status: "maybe",
				plusOnes: 1,
				plusOneNames: ["David Thompson"],
				invitedDate: new Date("2024-01-17"),
				respondedDate: new Date("2024-01-21"),
			},
		],
		[],
	);
	//
	const guestGroupsData = useMemo(
		() => [
			{
				id: "family",
				name: "Family",
				description: "Close family members",
				color: "bg-red-500",
				memberLimit: 12,
				guestCount: 0,
			},
			{
				id: "friends",
				name: "Friends",
				description: "Personal friends",
				color: "bg-blue-500",
				memberLimit: 25,
				guestCount: 0,
			},
			{
				id: "work",
				name: "Work Colleagues",
				description: "Professional contacts",
				color: "bg-green-500",
				memberLimit: 15,
				guestCount: 0,
			},
			{
				id: "vip",
				name: "VIP Guests",
				description: "Special invited guests",
				color: "bg-purple-500",
				memberLimit: 8,
				guestCount: 0,
			},
		],
		[],
	);
	//
	const groupsWithCounts = guestGroupsData.map((group) => ({
		...group,
		guestCount: guestListData.filter((guest) => guest?.group === group.id)
			.length,
	}));
	//
	const getGroupStats = (groupId: string) => {
		const groupGuests = guestListData.filter(
			(guest) => guest.group === groupId,
		);
		return {
			total: groupGuests.length,
			attending: groupGuests.filter((g) => g.status === "attending").length,
			declined: groupGuests.filter((g) => g.status === "declined").length,
			pending: groupGuests.filter((g) => g.status === "pending").length,
			maybe: groupGuests.filter((g) => g.status === "maybe").length,
		};
	};
	//
	if (isGroupManagementOpen || isFunction(getGroupStats)) {
	}
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				{/*  */}

				{/*  */}
				<div className="flex flex-col">
					{/*  */}
					<p className="text-xl font-semibold">Manage Guest Groups</p>
					{/*  */}
					<p className="text-sm">
						Organize your guests into different categories
					</p>
					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<Button
					variant={"outline"}
					onClick={() => setIsGroupManagementOpen(true)}
				>
					<Settings className="" />
					Manage Groups
				</Button>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			{/* <div className="grid grid-cols-1 gap-4 rounded-md md:grid-cols-3 xl:grid-cols-4"> */}
			<div className="flex flex-wrap gap-4 rounded-md">
				{/*  */}

				{/*  */}
				<div
					className="bg-background dark:border-foreground dark:text-foreground hover:bg-background/50 flex min-w-44 flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 text-gray-500 md:min-w-56 lg:min-w-72 xl:min-w-82"
					onClick={() => setIsGroupManagementOpen(true)}
				>
					{/*  */}
					<UserPlus />
					{/*  */}
					<p className="text-sm">Add New Group</p>
					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				{groupsWithCounts?.map((item, index) => {
					//
					return (
						<div
							key={index}
							className="bg-background flex min-w-56 flex-1 flex-col gap-4 rounded-md p-4 shadow md:min-w-72 lg:min-w-82 xl:gap-6 xl:p-6"
						>
							{/*  */}

							{/*  */}
							<div className="flex flex-col">
								{/*  */}
								<div className="flex items-center gap-2">
									{/*  */}
									<div className={`size-4 rounded-full ${item?.color}`} />
									{/*  */}
									<div className="flex flex-col">
										{/*  */}
										<p className="text-lg font-semibold">{item?.name}</p>
										{/*  */}
										{/*  */}
									</div>
									{/*  */}
								</div>
								{/*  */}
								<p className="text-sm">{item?.description}</p>
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-wrap items-center gap-4 text-sm">
								{/*  */}

								{/*  */}
								<div className="flex flex-1 items-center justify-between gap-2">
									{/*  */}
									<p className="">Total Invited</p>
									{/*  */}
									<p className="font-medium">10</p>
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-1 items-center justify-between gap-2">
									{/*  */}
									<p className="">Attending</p>
									{/*  */}
									<p className="font-medium">10</p>
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
							</div>

							{/*  */}
							<div className="flex flex-col gap-2 text-sm">
								{/*  */}

								{/*  */}
								<div className="flex items-center justify-between gap-2">
									{/*  */}
									<p className="">Limit</p>
									{/*  */}
									<p className="font-medium">10</p>
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div
									className={cn(
										"bg-secondary relative overflow-hidden rounded-full p-1",
									)}
								>
									<div
										className={cn(
											`bg-primary absolute top-0 left-0 h-full w-5/6 ${item.color}`,
										)}
									>
										{/*  */}

										{/*  */}
									</div>
								</div>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
						</div>
					);
				})}
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
