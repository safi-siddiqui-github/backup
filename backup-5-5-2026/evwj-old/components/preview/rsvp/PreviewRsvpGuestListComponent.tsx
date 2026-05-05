"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	CheckCircle,
	Clock,
	Download,
	Edit,
	Search,
	Trash2,
	XCircle,
} from "lucide-react";
import { useMemo } from "react";

export default function PreviewRsvpGuestListComponent() {
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
	const getStatusIcon = (status: string) => {
		switch (status) {
			case "attending":
				return <CheckCircle className="h-4 w-4" />;
			case "declined":
				return <XCircle className="h-4 w-4" />;
			case "maybe":
				return <Clock className="h-4 w-4" />;
			default:
				return <Clock className="h-4 w-4" />;
		}
	};
	//
	const getStatusColor = (status: string) => {
		switch (status) {
			case "attending":
				return "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20";
			case "declined":
				return "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20";
			case "maybe":
				return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20";
			default:
				return "bg-muted text-muted-foreground border-border";
		}
	};
	//
	return (
		<div className="bg-background flex flex-col gap-8 rounded-md p-4 shadow">
			{/*  */}

			{/*  */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				{/*  */}

				{/*  */}
				<InputGroup className="min-w-44 flex-1">
					<InputGroupInput placeholder="Search..." />
					<InputGroupAddon>
						<Search />
					</InputGroupAddon>
				</InputGroup>
				{/*  */}

				{/*  */}
				<div className="flex flex-wrap items-center gap-4">
					{/*  */}

					{/*  */}
					<Select>
						<SelectTrigger className="">
							<SelectValue placeholder="Select a status" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="attending">Attending</SelectItem>
								<SelectItem value="declined">Declined</SelectItem>
								<SelectItem value="maybe">Maybe</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					{/*  */}

					{/*  */}
					<Select>
						<SelectTrigger className="">
							<SelectValue placeholder="Select a group" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="all">All Groups</SelectItem>
								<SelectItem value="Family">Family</SelectItem>
								<SelectItem value="Friends">Friends</SelectItem>
								<SelectItem value="Work-Colleagues">Work Colleagues</SelectItem>
								<SelectItem value="VIP-Guests">VIP Guests</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					{/*  */}

					{/*  */}
					<Button variant={"outline"}>
						<Download />
						Export
					</Button>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			<Table>
				{/*  */}
				<TableHeader>
					<TableRow>
						<TableHead>Guest</TableHead>
						<TableHead>Contact</TableHead>
						<TableHead>Group</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Plus Ones</TableHead>
						<TableHead>Invited</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				{/*  */}

				{/*  */}
				<TableBody>
					{/*  */}
					{guestListData?.map((guest) => (
						<TableRow key={guest.id}>
							{/*  */}

							{/*  */}
							<TableCell>
								<div className="flex items-center gap-3">
									<Avatar className="h-8 w-8">
										<AvatarImage src={guest.avatar} alt={guest.name} />
										<AvatarFallback className="bg-primary/10 text-primary font-medium">
											{guest?.name
												?.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<div className="font-medium">{guest.name}</div>
									</div>
								</div>
							</TableCell>
							{/*  */}

							{/*  */}
							<TableCell>
								<div className="text-sm">
									<div>{guest.email}</div>
									{guest.phone && (
										<div className="text-gray-500 dark:text-gray-300">
											{guest.phone}
										</div>
									)}
								</div>
							</TableCell>
							{/*  */}

							{/*  */}
							<TableCell>
								{guest.group && (
									<Badge variant="outline" className="flex items-center gap-1">
										<div
											className={`h-2 w-2 rounded-full ${guestGroupsData.find((g) => g.id === guest.group)?.color}`}
										/>
										{guestGroupsData.find((g) => g.id === guest.group)?.name}
									</Badge>
								)}
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									{getStatusIcon(guest?.status ?? "")}
									<Badge className={getStatusColor(guest?.status ?? "")}>
										{guest.status}
									</Badge>
								</div>
							</TableCell>
							<TableCell>
								<div className="text-sm text-gray-600 dark:text-gray-300">
									{guest.plusOnes === 0 ? (
										<span className="">None</span>
									) : guest.plusOneNames && guest.plusOneNames.length > 0 ? (
										<div>
											<div className="text-primary font-medium">
												+{guest.plusOnes}
											</div>
											<div className="text-xs">
												{guest.plusOneNames.join(", ")}
											</div>
										</div>
									) : (
										<div>
											<div className="text-primary font-medium">
												+{guest.plusOnes}
											</div>
											<div className="text-xs">
												{guest.plusOnes === 1 ? "guest" : "guests"}
											</div>
										</div>
									)}
								</div>
							</TableCell>
							<TableCell>
								<div className="text-sm">
									<div>{guest?.invitedDate?.toLocaleDateString()}</div>
									{guest.respondedDate && (
										<div className="text-gray-500 dark:text-gray-300">
											Responded: {guest.respondedDate.toLocaleDateString()}
										</div>
									)}
								</div>
							</TableCell>
							<TableCell>
								<div className="flex gap-1">
									<Button variant="ghost" size="sm">
										<Edit className="h-4 w-4" />
									</Button>
									{/* <Button
                    variant="ghost"
                    size="sm"
                  >
                    <Mail className="h-4 w-4" />
                  </Button> */}
									<Button variant="ghost" size="sm" className="text-red-600">
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{/*  */}

			{/*  */}
		</div>
	);
}
