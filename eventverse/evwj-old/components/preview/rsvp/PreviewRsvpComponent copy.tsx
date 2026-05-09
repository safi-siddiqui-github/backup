"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { isFunction } from "lodash";
import {
	ArrowLeft,
	Calendar as CalendarIcon,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Clock,
	Download,
	Edit,
	Eye,
	FileText,
	Gift,
	HelpCircle,
	Link2,
	Mail,
	Phone,
	Plus,
	Search,
	Settings,
	Shield,
	Trash2,
	UserPlus,
	Users,
	UtensilsCrossed,
	XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// interface RSVPGroup {
//   id: string;
//   name: string;
//   description?: string;
//   color: string;
//   memberLimit?: number;
//   guestCount: number;
//   plusOneLimit?: number; // Group-specific plus one limits
// }

interface Guest {
	id: string;
	name: string;
	email: string;
	phone?: string;
	group?: string;
	status: "pending" | "attending" | "declined" | "maybe";
	plusOnes: number;
	plusOneNames?: string[];
	dietaryRestrictions?: string;
	notes?: string;
	invitedDate: Date;
	respondedDate?: Date;
	customFields?: Record<string, unknown>;
	allowedPlusOnes?: number; // Individual plus one limits
	avatar?: string; // Profile photo URL
}

interface RSVPSettings {
	deadline?: Date;
	allowPlusOnes: boolean;
	maxPlusOnes: number;
	publicRegistration: boolean;
	requireApproval: boolean;
	autoReminders: boolean;
	responseOptions: "yes-no" | "yes-no-maybe" | "custom";
	customResponses?: string[];
	registryLinks?: RegistryLink[];
	capacityLimit?: number;
	enableWaitlist: boolean;
	collectDietaryInfo: boolean;
	enableCustomFields: boolean;
}

interface RegistryLink {
	id: string;
	name: string;
	url: string;
	platform: string;
	description?: string;
}

// interface CustomField {
//   id: string;
//   label: string;
//   type:
//     | "text"
//     | "dropdown"
//     | "checkbox"
//     | "radio"
//     | "textarea"
//     | "custom"
//     | "food";
//   required: boolean;
//   options?: string[];
//   placeholder?: string;
//   icon?: ElementType;
//   description?: string;
// }

// interface FoodChoice {
//   id: string;
//   name: string;
//   description?: string;
//   dietary: string[];
//   price?: number;
//   category: "appetizer" | "main" | "dessert" | "beverage";
//   config?: {
//     choices?: FoodChoice[];
//   };
// }

interface MockEvent {
	id: string;
	eventName: string;
	eventType: string;
	description: string;
	eventDates: {
		startDate: string;
		endDate: string;
	};
	startDate: Date;
	time: string;
	locations: {
		name: string;
		address: string;
	}[];
}

// interface RSVPFormProps {
//   event: MockEvent;
//   groups: RSVPGroup[];
//   customFields?: CustomField[];
//   foodChoices?: FoodChoice[];
//   settings?: Partial<RSVPSettings & RSVPSettingsProps>;
//   onBack: () => void;
//   isPreview?: boolean;
// }

// interface PredefinedField {
//   id?: string;
//   icon?: ElementType;
//   label?: string;
//   required?: boolean;
//   description?: string;
//   type?: string;
//   config?: {
//     choices?: FoodChoice[];
//   };
// }

// interface FormFieldLibraryProps {
//   // predefinedFields: unknown[];
//   predefinedFields: PredefinedField[];
//   customFields: CustomField[];
//   onUpdateCustomFields: (fields: CustomField[]) => void;
//   foodChoices: FoodChoice[];
//   onUpdateFoodChoices: (choices: FoodChoice[]) => void;
//   // onAddField: (field: any) => void;
//   onAddField: (field: FormField) => void;
// }

interface GuestListProps {
	guests: Partial<Guest>[];
	groupId: string;
	groupName: string;
	maxDisplay?: number;
}

interface RSVPSettingsProps {
	settings?: Partial<RSVPSettings & RSVPSettingsProps>;
	onUpdate?: (settings: RSVPSettings) => void;
}

interface GuestProfileDialogProps {
	guest: Partial<Guest> | null;
	isOpen: boolean;
	onClose: () => void;
	groupName?: string;
}

// interface AddGuestDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddGuest: (guest: Partial<Guest>) => void;
//   groups: RSVPGroup[];
// }

// interface GroupManagementDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   groups: RSVPGroup[];
//   onUpdateGroups: (groups: RSVPGroup[]) => void;
// }

// interface FormField {
//   id: string;
//   type: "predefined" | "custom" | "food";
//   fieldType: string;
//   label: string;
//   required: boolean;
//   order: number;
//   // config?: unkown;
//   config?: {
//     choices?: FoodChoice[];
//     placeholder?: string;
//     options?: [];
//   };
// }

// interface RSVPFormBuilderProps {
//   customFields: CustomField[];
//   onUpdateCustomFields: (fields: CustomField[]) => void;
//   foodChoices: FoodChoice[];
//   onUpdateFoodChoices: (choices: FoodChoice[]) => void;
//   settings: RSVPSettingsProps;
//   onUpdateSettings: (
//     settings: Partial<RSVPSettings & RSVPSettingsProps>,
//   ) => void;
//   groups: RSVPGroup[];
//   event: MockEvent;
// }

// interface CustomFieldsManagerProps {
//   fields: CustomField[];
//   onUpdate: (fields: CustomField[]) => void;
// }

// interface FormCanvasProps {
//   formFields: FormField[];
//   onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
//   onRemoveField: (fieldId: string) => void;
//   onReorderFields: (draggedId: string, targetId: string) => void;
//   onAddField?: (field: FormField, insertIndex?: number) => void;
//   settings: RSVPSettingsProps;
//   groups: RSVPGroup[];
// }

// interface FormPreviewProps {
//   formFields: FormField[];
//   customFields: CustomField[];
//   foodChoices: FoodChoice[];
//   settings: Partial<RSVPSettings & RSVPSettingsProps>;
//   groups: RSVPGroup[];
//   event: MockEvent;
// }

// interface EmailContactImportDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onImport: (contacts: string[]) => void;
// }

// interface EmailProvider {
//   id: string;
//   name: string;
//   icon: string;
//   authUrl?: string;
//   isConnected?: boolean;
// }

// interface EmailContact {
//   id: string;
//   name: string;
//   email: string;
//   displayName?: string;
//   organization?: string;
//   profilePhoto?: string;
// }

// interface PhoneContactImportDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onImport: (contacts: string[]) => void;
// }

// interface ContactPhone {
//   number: string;
//   type: "mobile" | "work" | "home" | "other";
//   isPrimary?: boolean;
// }

// interface PhoneContact {
//   id: string;
//   name: string;
//   phoneNumbers: ContactPhone[];
//   email?: string;
//   organization?: string;
//   profilePhoto?: string;
//   isFavorite?: boolean;
//   group?: string;
// }

type RsvpTab =
	| "dashboard"
	| "guests"
	| "groups"
	| "settings"
	| "form"
	| "analytics"
	| "builder";

export default function PreviewRsvpComponent() {
	//
	const event: MockEvent = {
		id: "demo-event",
		eventName: "Demo Event",
		eventType: "Wedding",
		description: "This is a demo event for testing the RSVP module",
		eventDates: {
			startDate: "2024-06-15",
			endDate: "2024-06-15",
		},
		// Add the fields expected by RSVPForm
		startDate: new Date("2024-06-15"),
		time: "6:00 PM",
		locations: [
			{
				name: "Demo Venue",
				address: "123 Demo Street, Demo City, DC 12345",
			},
		],
	};
	//
	const [activeView, setActiveView] = useState<RsvpTab>("dashboard");
	const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
	const [isGroupManagementOpen, setIsGroupManagementOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState<string>("all");
	const [filterGroup, setFilterGroup] = useState<string>("all");
	//
	if (isAddGuestOpen || isGroupManagementOpen) {
	}
	//
	const [rsvpSettings, setRsvpSettings] = useState<
		Partial<RSVPSettings & RSVPSettingsProps>
	>({
		allowPlusOnes: true,
		maxPlusOnes: 2,
		publicRegistration: false,
		requireApproval: false,
		autoReminders: true,
		responseOptions: "yes-no-maybe",
		registryLinks: [],
		enableWaitlist: false,
		collectDietaryInfo: true,
		enableCustomFields: false,
	});

	// const [customFields, setCustomFields] = useState<CustomField[]>([]);
	// const [foodChoices, setFoodChoices] = useState<FoodChoice[]>([]);

	// Mock data
	const [guests, setGuests] = useState<Partial<Guest>[]>([
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
	]);

	const [groups, setGroups] = useState([
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
	]);

	if (isFunction(setGuests || setGroups)) {
	}

	// Calculate guest counts for groups
	const groupsWithCounts = groups?.map((group) => ({
		...group,
		guestCount: guests.filter((guest) => guest?.group === group.id).length,
	}));

	// Helper function to get group statistics
	const getGroupStats = (groupId: string) => {
		const groupGuests = guests.filter((guest) => guest.group === groupId);
		return {
			total: groupGuests.length,
			attending: groupGuests.filter((g) => g.status === "attending").length,
			declined: groupGuests.filter((g) => g.status === "declined").length,
			pending: groupGuests.filter((g) => g.status === "pending").length,
			maybe: groupGuests.filter((g) => g.status === "maybe").length,
		};
	};

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

	const filteredGuests = guests.filter((guest) => {
		const matchesSearch =
			guest?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			guest?.email?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			filterStatus === "all" || guest.status === filterStatus;
		const matchesGroup = filterGroup === "all" || guest.group === filterGroup;
		return matchesSearch && matchesStatus && matchesGroup;
	});

	const stats = {
		total: guests.length,
		attending: guests.filter((g) => g.status === "attending").length,
		declined: guests.filter((g) => g.status === "declined").length,
		pending: guests.filter((g) => g.status === "pending").length,
		maybe: guests.filter((g) => g.status === "maybe").length,
		totalWithPlusOnes: guests.reduce(
			(sum, g) => sum + (g.status === "attending" ? 1 + (g?.plusOnes ?? 0) : 0),
			0,
		),
	};

	// const addGuest = (guestData: Partial<Guest>) => {
	//   const newGuest = {
	//     ...guestData,
	//     id: Date.now().toString(),
	//     invitedDate: new Date(),
	//   };
	//   setGuests([...guests, newGuest]);
	// };

	if (activeView === "form") {
		return (
			<>
				{/* <RSVPForm
          event={event}
          groups={groups}
          customFields={customFields}
          foodChoices={foodChoices}
          settings={rsvpSettings}
          onBack={() => setActiveView("dashboard")}
        /> */}
			</>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{/*  */}

			{/*  */}
			<div className="bg-background sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 p-4">
				{/*  */}
				<div className="flex items-center gap-4">
					{/*  */}
					<Button asChild variant={"outline"}>
						<Link href={"#"}>
							<ArrowLeft />
						</Link>
					</Button>
					{/*  */}
					<div className="flex flex-col">
						{/*  */}
						<p className="text-xl font-bold">RSVP Management</p>
						{/*  */}
						<p className="lining-clamp-1">{event.eventName}</p>
						{/*  */}
					</div>
					{/*  */}
				</div>
				{/*  */}
				<div className="flex flex-wrap items-center gap-4">
					{/*  */}
					<Button variant={"secondary"} onClick={() => setActiveView("form")}>
						<Eye />
						Preview Form
					</Button>
					{/*  */}
					<Button variant={"secondary"}>
						<Link2 />
						Share Link
					</Button>
					{/*  */}
					<Button variant={"secondary"} onClick={() => setIsAddGuestOpen(true)}>
						<Plus />
						Add Guest
					</Button>
					{/*  */}
				</div>
				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			<div className="container mx-auto max-w-7xl px-4 py-6">
				<Tabs
					value={activeView}
					onValueChange={(value) => setActiveView(value as RsvpTab)}
					className="space-y-6"
				>
					<TabsContent
						value="dash"
						// value="dashboard"
						// className="space-y-6"
					>
						{/* Enhanced Stats Cards */}
						<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
							<Card className="backdrop-blur-sm">
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium text-gray-600 dark:text-white">
										Total Invited
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{stats.total}
									</div>
								</CardContent>
							</Card>
							<Card className="backdrop-blur-sm">
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium text-gray-600 dark:text-white">
										Attending
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-green-600">
										{stats.attending}
									</div>
									<div className="text-xs text-gray-500 dark:text-white">
										+{stats.totalWithPlusOnes - stats.attending} plus ones
									</div>
								</CardContent>
							</Card>
							<Card className="backdrop-blur-sm">
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium text-gray-600 dark:text-white">
										Pending
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-yellow-600">
										{stats.pending}
									</div>
								</CardContent>
							</Card>
							<Card className="backdrop-blur-sm">
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium text-gray-600 dark:text-white">
										Declined
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-red-600">
										{stats.declined}
									</div>
								</CardContent>
							</Card>
							<Card className="backdrop-blur-sm">
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-medium text-gray-600 dark:text-white">
										Response Rate
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-blue-600">
										{Math.round(
											((stats.total - stats.pending) / stats.total) * 100,
										)}
										%
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Recent Activity */}
						<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl">
							<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
							<CardHeader className="relative z-10 pb-4">
								<CardTitle className="from-primary to-secondary flex items-center gap-2 bg-linear-to-r via-purple-500 bg-clip-text text-2xl font-bold text-transparent">
									🎉 Recent Activity
								</CardTitle>
								<CardDescription className="text-muted-foreground/80 font-medium">
									Hot off the press! Your latest RSVP responses
								</CardDescription>
							</CardHeader>
							<CardContent className="relative z-10">
								<div className="space-y-4">
									{guests
										.filter((g) => g.respondedDate)
										.sort(
											(a, b) =>
												(b.respondedDate?.getTime() || 0) -
												(a.respondedDate?.getTime() || 0),
										)
										.slice(0, 5)
										.map((guest, index) => (
											<div
												key={guest.id}
												// className="from-background/80 to-muted/20 border-border/30 hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 animate-fade-in group flex items-center gap-4 rounded-xl border bg-linear-to-r p-4 shadow-md transition-all duration-300 hover:shadow-lg"
												className="animate-fade-in group dark:bg-secondary flex items-center gap-4 rounded-xl border bg-linear-to-r p-4 shadow-md transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700"
												style={{ animationDelay: `${index * 100}ms` }}
											>
												<div className="shrink-0">
													<div className="relative">
														<Avatar className="border-background h-12 w-12 border-2">
															<AvatarImage
																src={guest.avatar}
																alt={guest.name}
															/>
															<AvatarFallback className="bg-primary/10 text-primary font-medium">
																{guest?.name
																	?.split(" ")
																	?.map((n) => n[0])
																	.join("")}
															</AvatarFallback>
														</Avatar>
														<div className="border-background absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2">
															{guest.status === "attending" && (
																<div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-500 text-xs">
																	🎊
																</div>
															)}
															{guest.status === "declined" && (
																<div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-red-400 to-rose-500 text-xs">
																	😔
																</div>
															)}
															{guest.status === "maybe" && (
																<div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-orange-500 text-xs">
																	🤔
																</div>
															)}
															{guest.status === "pending" && (
																<div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-gray-400 to-slate-500 text-xs">
																	⏳
																</div>
															)}
														</div>
													</div>
												</div>
												<div className="min-w-0 flex-1">
													<div className="text-foreground group-hover:text-primary text-base font-semibold transition-colors">
														{guest.name}
													</div>
													<div className="text-muted-foreground flex items-center gap-2 text-sm">
														<span>
															{/* 📅 {guest.respondedDate?.toLocaleDateString()} */}
														</span>
														{guest.status === "attending" &&
															(guest?.plusOnes ?? 0) > 0 && (
																<span className="font-medium text-green-600">
																	{guest.plusOneNames &&
																	guest.plusOneNames.length > 0
																		? `+${guest.plusOneNames.join(", ")} 👥`
																		: `+${guest.plusOnes} guest${(guest?.plusOnes ?? 0) > 1 ? "s" : ""} 👥`}
																</span>
															)}
													</div>
												</div>
												<Badge
													className={cn(
														"px-3 py-1 font-semibold text-white shadow-md",
														guest.status === "attending" &&
															"animate-pulse bg-linear-to-r from-green-500 to-emerald-600",
														guest.status === "declined" &&
															"bg-linear-to-r from-red-500 to-rose-600",
														guest.status === "maybe" &&
															"bg-linear-to-r from-yellow-500 to-orange-600",
														guest.status === "pending" &&
															"bg-linear-to-r from-gray-500 to-slate-600",
													)}
												>
													{guest.status === "attending" && "🎉 Coming!"}
													{guest.status === "declined" && "❌ Can't make it"}
													{guest.status === "maybe" && "🤷 Maybe"}
													{guest.status === "pending" && "⌛ Pending"}
												</Badge>
											</div>
										))}
									{guests.filter((g) => g.respondedDate).length === 0 && (
										<div className="text-muted-foreground py-8 text-center">
											<div className="mb-4 text-6xl">📭</div>
											<p className="text-lg font-medium">No responses yet!</p>
											<p className="text-sm">
												Your guests will appear here once they RSVP
											</p>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="builder" className="space-y-4">
						{/* <RSVPFormBuilder
              customFields={customFields}
              onUpdateCustomFields={setCustomFields}
              foodChoices={foodChoices}
              onUpdateFoodChoices={setFoodChoices}
              settings={rsvpSettings}
              onUpdateSettings={setRsvpSettings}
              groups={groups}
              event={event}
            /> */}
					</TabsContent>

					<TabsContent value="guests" className="space-y-4">
						{/* Enhanced Search and Filters */}
						<Card className="dark:bg-secondary backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex flex-col gap-4 md:flex-row">
									<div className="relative flex-1">
										<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
										<Input
											placeholder="Search guests..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="pl-10"
										/>
									</div>
									<div className="flex gap-2">
										<select
											value={filterStatus}
											onChange={(e) => setFilterStatus(e.target.value)}
											className="dark:bg-background rounded-md border px-3 py-2 text-sm"
										>
											<option value="all">All Status</option>
											<option value="attending">Attending</option>
											<option value="declined">Declined</option>
											<option value="maybe">Maybe</option>
											<option value="pending">Pending</option>
										</select>
										<select
											value={filterGroup}
											onChange={(e) => setFilterGroup(e.target.value)}
											className="dark:bg-background rounded-md border px-3 py-2 text-sm"
										>
											<option value="all">All Groups</option>
											{groups?.map((group) => (
												<option key={group.id} value={group.id}>
													{group.name}
												</option>
											))}
										</select>
										<Button variant="outline" size="sm">
											<Download className="mr-2 h-4 w-4" />
											Export
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Guest Table */}
						<Card className="dark:bg-secondary backdrop-blur-sm">
							<CardContent className="p-0">
								<Table>
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
									<TableBody>
										{filteredGuests.map((guest) => (
											<TableRow key={guest.id}>
												<TableCell>
													<div className="flex items-center gap-3">
														<Avatar className="h-8 w-8">
															<AvatarImage
																src={guest.avatar}
																alt={guest.name}
															/>
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
												<TableCell>
													{guest.group && (
														<Badge
															variant="outline"
															className="flex items-center gap-1"
														>
															<div
																className={`h-2 w-2 rounded-full ${groups?.find((g) => g.id === guest.group)?.color}`}
															/>
															{groups?.find((g) => g.id === guest.group)?.name}
														</Badge>
													)}
												</TableCell>
												<TableCell>
													<div className="flex items-center gap-2">
														{getStatusIcon(guest?.status ?? "")}
														<Badge
															className={getStatusColor(guest?.status ?? "")}
														>
															{guest.status}
														</Badge>
													</div>
												</TableCell>
												<TableCell>
													<div className="text-sm text-gray-600 dark:text-gray-300">
														{guest.plusOnes === 0 ? (
															<span className="">None</span>
														) : guest.plusOneNames &&
															guest.plusOneNames.length > 0 ? (
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
														<div>
															{guest?.invitedDate?.toLocaleDateString()}
														</div>
														{guest.respondedDate && (
															<div className="text-gray-500 dark:text-gray-300">
																Responded:{" "}
																{guest.respondedDate.toLocaleDateString()}
															</div>
														)}
													</div>
												</TableCell>
												<TableCell>
													<div className="flex gap-1">
														<Button variant="ghost" size="sm">
															<Edit className="h-4 w-4" />
														</Button>
														<Button variant="ghost" size="sm">
															<Mail className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="sm"
															className="text-red-600"
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="groups" className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold">Manage Guest Groups</h3>
								<p className="text-sm">
									Organize your guests into different categories
								</p>
							</div>
							<Button
								onClick={() => setIsGroupManagementOpen(true)}
								// className="bg-white/20 text-white hover:bg-white/30"
							>
								<Settings className="mr-2 h-4 w-4" />
								Manage Groups
							</Button>
						</div>

						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{groupsWithCounts?.map((group) => {
								const groupStats = getGroupStats(String(group?.id));
								return (
									<Card
										key={group.id}
										className="dark:bg-secondary bg-white/95 backdrop-blur-sm"
									>
										<CardHeader>
											<div className="flex items-center gap-3">
												<div
													className={`h-4 w-4 rounded-full ${group.color}`}
												/>
												<CardTitle className="text-lg">{group.name}</CardTitle>
											</div>
											<CardDescription>{group.description}</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-3">
												<div className="grid grid-cols-2 gap-4 text-sm">
													<div className="flex justify-between">
														<span className="">Total Invited:</span>
														<span className="font-medium">
															{groupStats.total}
														</span>
													</div>
													<div className="flex justify-between">
														<span className="">Attending:</span>
														<span className="font-medium text-green-600">
															{groupStats.attending}
														</span>
													</div>
													{group.memberLimit && (
														<div className="col-span-2 flex justify-between">
															<span className="">Limit:</span>
															<span className="font-medium">
																{group.memberLimit}
															</span>
														</div>
													)}
												</div>

												{group.memberLimit && (
													<div className="h-2 w-full rounded-full bg-gray-200">
														<div
															className={`h-2 rounded-full ${group.color}`}
															style={{
																width: `${Math.min((groupStats.total / group.memberLimit) * 100, 100)}%`,
															}}
														/>
													</div>
												)}

												<div className="pt-2">
													<GuestList
														guests={guests}
														groupId={String(group?.id)}
														groupName={group?.name ?? ""}
													/>
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}

							{/* Add New Group Card */}
							<Card
								className="dark:bg-secondary cursor-pointer border-2 border-dashed border-gray-300 bg-white/95 backdrop-blur-sm transition-colors hover:border-gray-400"
								onClick={() => setIsGroupManagementOpen(true)}
							>
								<CardContent className="flex h-full flex-col items-center justify-center p-6">
									<UserPlus className="mb-2 h-8 w-8 text-gray-400" />
									<span className="text-sm text-gray-600">Add New Group</span>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="settings" className="space-y-4">
						<RSVPSettings settings={rsvpSettings} onUpdate={setRsvpSettings} />
					</TabsContent>
				</Tabs>
			</div>

			{/* <AddGuestDialog
        isOpen={isAddGuestOpen}
        onClose={() => setIsAddGuestOpen(false)}
        onAddGuest={addGuest}
        groups={groups ?? []}
      />

      <GroupManagementDialog
        isOpen={isGroupManagementOpen}
        onClose={() => setIsGroupManagementOpen(false)}
        groups={groupsWithCounts ?? []}
        onUpdateGroups={setGroups}
      /> */}
		</div>
	);
}

// In RSVPModule
// const RSVPForm = ({
//   event,
//   groups,
//   customFields = [],
//   foodChoices = [],
//   settings,
//   onBack,
//   isPreview = false,
// }: RSVPFormProps) => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     guestName: "",
//     email: "",
//     phone: "",
//     response: "",
//     selectedGroup: "",
//     plusOnes: 0,
//     plusOneNames: [] as string[],
//     dietaryRestrictions: "",
//     accommodations: "",
//     mealChoice: "",
//     songRequests: "",
//     specialMessage: "",
//     newsletter: false,
//     transportation: "",
//     customResponses: {} as Record<string, string | string[]>,
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleCustomFieldChange = (
//     fieldId: string,
//     value: string | string[],
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       customResponses: {
//         ...prev.customResponses,
//         [fieldId]: value,
//       },
//     }));
//   };

//   const handlePlusOneNameChange = (index: number, name: string) => {
//     const newNames = [...formData.plusOneNames];
//     newNames[index] = name;
//     setFormData((prev) => ({ ...prev, plusOneNames: newNames }));
//   };

//   const handleSubmit = () => {
//     if (isPreview) {
//       alert("This is a preview - form submission is disabled");
//       return;
//     }
//     console.log("RSVP submitted:", formData);
//     setIsSubmitted(true);
//   };

//   const formatEventDate = (date: Date) => {
//     if (!date) return "Date TBD";

//     try {
//       if (date instanceof Date) {
//         return format(date, "MMMM d, yyyy");
//       }
//       if (typeof date === "string") {
//         return format(new Date(date), "MMMM d, yyyy");
//       }
//       return "Date TBD";
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "Date TBD";
//     }
//   };

//   const renderCustomField = (field: CustomField) => {
//     const value = formData.customResponses[field.id] || "";

//     switch (field.type) {
//       case "text":
//         return (
//           <Input
//             value={value}
//             onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
//             placeholder={
//               field.placeholder || `Enter ${field.label.toLowerCase()}`
//             }
//             required={field.required}
//           />
//         );

//       case "textarea":
//         return (
//           <Textarea
//             value={value}
//             onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
//             placeholder={
//               field.placeholder || `Enter ${field.label.toLowerCase()}`
//             }
//             required={field.required}
//             rows={3}
//           />
//         );

//       case "dropdown":
//         return (
//           <Select
//             value={String(value)}
//             onValueChange={(val) => handleCustomFieldChange(field.id, val)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select an option" />
//             </SelectTrigger>
//             <SelectContent>
//               {field.options?.map((option, index) => (
//                 <SelectItem
//                   key={index}
//                   value={option}
//                 >
//                   {option}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         );

//       case "radio":
//         return (
//           <RadioGroup
//             value={String(value)}
//             onValueChange={(val) => handleCustomFieldChange(field.id, val)}
//           >
//             {field.options?.map((option, index) => (
//               <div
//                 key={index}
//                 className="flex items-center space-x-2"
//               >
//                 <RadioGroupItem
//                   value={option}
//                   id={`${field.id}-${index}`}
//                 />
//                 <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
//               </div>
//             ))}
//           </RadioGroup>
//         );

//       case "checkbox":
//         const checkboxValues: string[] = Array.isArray(value) ? value : [];
//         return (
//           <div className="space-y-2">
//             {field.options?.map((option, index) => (
//               <div
//                 key={index}
//                 className="flex items-center space-x-2"
//               >
//                 <Checkbox
//                   checked={checkboxValues.includes(option)}
//                   onCheckedChange={(checked) => {
//                     const newValues = checked
//                       ? [...checkboxValues, option]
//                       : checkboxValues.filter((v) => v !== option);
//                     handleCustomFieldChange(field.id, newValues);
//                   }}
//                   id={`${field.id}-${index}`}
//                 />
//                 <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
//               </div>
//             ))}
//           </div>
//         );

//       default:
//         return (
//           <Input
//             value={value}
//             onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
//             placeholder={
//               field.placeholder || `Enter ${field.label.toLowerCase()}`
//             }
//             required={field.required}
//           />
//         );
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
//         <Card className="dark:bg-secondary w-full max-w-md backdrop-blur-sm">
//           <CardContent className="p-8 text-center">
//             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
//               <Check className="h-8 w-8 text-white" />
//             </div>
//             <h2 className="mb-2 text-2xl font-bold text-gray-900">
//               RSVP Submitted!
//             </h2>
//             <p className="mb-6 text-gray-600">
//               Thank you for your response. We have sent a confirmation to your
//               email.
//             </p>
//             <Button
//               onClick={onBack}
//               className="w-full"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Dashboard
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen ${isPreview ? "" : "bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900"}`}
//     >
//       {/* Header */}
//       {!isPreview && (
//         <div className="sticky top-0 z-10 border-b border-white/20 bg-white/10 backdrop-blur-sm">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={onBack}
//                 className="p-2 text-white hover:bg-white/10"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//               </Button>
//               <div>
//                 <h1 className="text-lg font-bold text-white">
//                   RSVP Form Preview
//                 </h1>
//                 <p className="text-sm text-purple-100">{event.eventName}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="container mx-auto max-w-2xl px-4 py-8">
//         {/* Event Info Card */}
//         <Card className="dark:bg-background mb-6 backdrop-blur-sm">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl text-gray-900 dark:text-white">
//               {event.eventName}
//             </CardTitle>
//             <CardDescription className="text-lg">
//               You&apos;re Invited!
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 md:grid-cols-2">
//               <div className="flex items-center gap-3">
//                 <CalendarIcon className="h-5 w-5 text-purple-600" />
//                 <div>
//                   <div className="font-medium">
//                     {formatEventDate(event.startDate)}
//                   </div>
//                   {event.time && (
//                     <div className="text-sm text-gray-500">at {event.time}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <MapPin className="h-5 w-5 text-purple-600" />
//                 <div>
//                   <div className="font-medium">
//                     {event.locations?.[0]?.name || "Venue TBD"}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {event.locations?.[0]?.address || "Address TBD"}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* RSVP Form */}
//         <Card className="dark:bg-background backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle>
//               Please Respond by{" "}
//               {settings?.deadline
//                 ? format(settings.deadline, "MMMM d, yyyy")
//                 : "[Date]"}
//             </CardTitle>
//             <CardDescription>
//               We&apos;re excited to celebrate with you! Please let us know if
//               you can attend.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Step 1: Basic Info */}
//             {step === 1 && (
//               <div className="space-y-4">
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="guest-name">Full Name *</Label>
//                     <Input
//                       id="guest-name"
//                       value={formData.guestName}
//                       onChange={(e) =>
//                         handleInputChange("guestName", e.target.value)
//                       }
//                       placeholder="Your full name"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address *</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         handleInputChange("email", e.target.value)
//                       }
//                       placeholder="your@email.com"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     placeholder="+1 (555) 123-4567"
//                   />
//                 </div>

//                 {/* Group Selection */}
//                 {groups.length > 0 && (
//                   <div className="space-y-2">
//                     <Label htmlFor="group">Which group do you belong to?</Label>
//                     <Select
//                       value={formData.selectedGroup}
//                       onValueChange={(value) =>
//                         handleInputChange("selectedGroup", value)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select your group (optional)" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="none">
//                           Prefer not to specify
//                         </SelectItem>
//                         {groups.map((group) => (
//                           <SelectItem
//                             key={group.id}
//                             value={group.id}
//                           >
//                             <div className="flex items-center gap-2">
//                               <div
//                                 className={`h-3 w-3 rounded-full ${group.color}`}
//                               />
//                               <span>{group.name}</span>
//                             </div>
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 )}

//                 <div className="space-y-3">
//                   <Label>Will you be attending?</Label>
//                   <RadioGroup
//                     value={formData.response}
//                     onValueChange={(value) =>
//                       handleInputChange("response", value)
//                     }
//                   >
//                     <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50">
//                       <RadioGroupItem
//                         value="attending"
//                         id="attending"
//                       />
//                       <Label
//                         htmlFor="attending"
//                         className="flex cursor-pointer items-center gap-2"
//                       >
//                         <Check className="h-4 w-4 text-green-600" />
//                         Yes, I&apos;ll be there!
//                       </Label>
//                     </div>
//                     {settings?.responseOptions === "yes-no-maybe" && (
//                       <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50">
//                         <RadioGroupItem
//                           value="maybe"
//                           id="maybe"
//                         />
//                         <Label
//                           htmlFor="maybe"
//                           className="flex cursor-pointer items-center gap-2"
//                         >
//                           <Clock className="h-4 w-4 text-yellow-600" />
//                           Maybe - I am not sure yet
//                         </Label>
//                       </div>
//                     )}
//                     <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50">
//                       <RadioGroupItem
//                         value="declined"
//                         id="declined"
//                       />
//                       <Label
//                         htmlFor="declined"
//                         className="flex cursor-pointer items-center gap-2"
//                       >
//                         <X className="h-4 w-4 text-red-600" />
//                         Sorry, I can&apos;t make it
//                       </Label>
//                     </div>
//                   </RadioGroup>
//                 </div>

//                 {formData.response === "attending" &&
//                   settings?.allowPlusOnes && (
//                     <div className="space-y-4 rounded-lg bg-green-50 p-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="plus-ones">
//                           How many guests will you bring?
//                         </Label>
//                         <select
//                           id="plus-ones"
//                           value={formData.plusOnes}
//                           onChange={(e) =>
//                             handleInputChange(
//                               "plusOnes",
//                               String(parseInt(e.target.value)),
//                             )
//                           }
//                           className="w-full rounded-md border p-2"
//                         >
//                           <option value={0}>Just me</option>
//                           {Array.from(
//                             { length: settings?.maxPlusOnes ?? 0 },
//                             (_, i) => (
//                               <option
//                                 key={i + 1}
//                                 value={i + 1}
//                               >
//                                 {i + 1} additional guest{i + 1 > 1 ? "s" : ""}
//                               </option>
//                             ),
//                           )}
//                         </select>
//                       </div>

//                       {formData.plusOnes > 0 && (
//                         <div className="space-y-2">
//                           <Label>Guest Names</Label>
//                           {Array.from({ length: formData.plusOnes }, (_, i) => (
//                             <Input
//                               key={i}
//                               placeholder={`Guest ${i + 1} name`}
//                               value={formData.plusOneNames[i] || ""}
//                               onChange={(e) =>
//                                 handlePlusOneNameChange(i, e.target.value)
//                               }
//                             />
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}

//                 <div className="flex justify-end">
//                   <Button
//                     onClick={() => setStep(2)}
//                     disabled={
//                       !formData.guestName ||
//                       !formData.email ||
//                       !formData.response
//                     }
//                   >
//                     Continue
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Additional Details */}
//             {step === 2 && formData.response === "attending" && (
//               <div className="space-y-4">
//                 {/* Food Choices */}
//                 {foodChoices.length > 0 && (
//                   <div className="space-y-2">
//                     <Label>Meal Choice</Label>
//                     <RadioGroup
//                       value={formData.mealChoice}
//                       onValueChange={(value) =>
//                         handleInputChange("mealChoice", value)
//                       }
//                     >
//                       {foodChoices.map((choice) => (
//                         <div
//                           key={choice.id}
//                           className="flex items-center space-x-2 rounded-lg border p-3"
//                         >
//                           <RadioGroupItem
//                             value={choice.id}
//                             id={choice.id}
//                           />
//                           <Label
//                             htmlFor={choice.id}
//                             className="flex-1"
//                           >
//                             <div className="font-medium">{choice.name}</div>
//                             {choice.description && (
//                               <div className="text-sm text-gray-500">
//                                 {choice.description}
//                               </div>
//                             )}
//                             {choice.dietary.length > 0 && (
//                               <div className="mt-1 flex gap-1">
//                                 {choice.dietary.map((diet, index) => (
//                                   <Badge
//                                     key={index}
//                                     variant="secondary"
//                                     className="text-xs"
//                                   >
//                                     {diet}
//                                   </Badge>
//                                 ))}
//                               </div>
//                             )}
//                           </Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </div>
//                 )}

//                 {settings?.collectDietaryInfo && (
//                   <div className="space-y-2">
//                     <Label htmlFor="dietary">
//                       Dietary Restrictions or Allergies
//                     </Label>
//                     <Textarea
//                       id="dietary"
//                       value={formData.dietaryRestrictions}
//                       onChange={(e) =>
//                         handleInputChange("dietaryRestrictions", e.target.value)
//                       }
//                       placeholder="Please list any dietary restrictions, allergies, or special meal requirements..."
//                       rows={3}
//                     />
//                   </div>
//                 )}

//                 <div className="space-y-2">
//                   <Label htmlFor="accommodations">Special Accommodations</Label>
//                   <Textarea
//                     id="accommodations"
//                     value={formData.accommodations}
//                     onChange={(e) =>
//                       handleInputChange("accommodations", e.target.value)
//                     }
//                     placeholder="Do you need any special accommodations? (wheelchair access, seating preferences, etc.)"
//                     rows={3}
//                   />
//                 </div>

//                 {/* Custom Fields */}
//                 {customFields.map((field) => (
//                   <div
//                     key={field.id}
//                     className="space-y-2"
//                   >
//                     <Label htmlFor={field.id}>
//                       {field.label}
//                       {field.required && (
//                         <span className="ml-1 text-red-500">*</span>
//                       )}
//                     </Label>
//                     {renderCustomField(field)}
//                   </div>
//                 ))}

//                 <div className="space-y-2">
//                   <Label htmlFor="songs">Song Requests</Label>
//                   <Input
//                     id="songs"
//                     value={formData.songRequests}
//                     onChange={(e) =>
//                       handleInputChange("songRequests", e.target.value)
//                     }
//                     placeholder="Any songs you'd like to hear at the event?"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">Special Message</Label>
//                   <Textarea
//                     id="message"
//                     value={formData.specialMessage}
//                     onChange={(e) =>
//                       handleInputChange("specialMessage", e.target.value)
//                     }
//                     placeholder="Share a special message or memory with the hosts..."
//                     rows={3}
//                   />
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="newsletter"
//                     checked={formData.newsletter}
//                     onCheckedChange={(checked) =>
//                       handleInputChange("newsletter", checked)
//                     }
//                   />
//                   <Label
//                     htmlFor="newsletter"
//                     className="text-sm"
//                   >
//                     Send me updates about future events
//                   </Label>
//                 </div>

//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => setStep(1)}
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     onClick={handleSubmit}
//                     className="flex-1"
//                   >
//                     <Heart className="mr-2 h-4 w-4" />
//                     Submit RSVP
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Decline Message */}
//             {step === 2 && formData.response === "declined" && (
//               <div className="space-y-4">
//                 <div className="rounded-lg bg-red-50 p-6 text-center">
//                   <p className="mb-4 text-gray-700">
//                     We&apos;re sorry you can&apos;t make it! We&apos;ll miss
//                     having you there.
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">
//                     Would you like to share a message?
//                   </Label>
//                   <Textarea
//                     id="message"
//                     value={formData.specialMessage}
//                     onChange={(e) =>
//                       handleInputChange("specialMessage", e.target.value)
//                     }
//                     placeholder="Share a message with the hosts..."
//                     rows={3}
//                   />
//                 </div>

//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => setStep(1)}
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     onClick={handleSubmit}
//                     className="flex-1"
//                   >
//                     Submit Response
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// In RSVPForm
// const RSVPFormBuilder = ({
//   customFields,
//   onUpdateCustomFields,
//   foodChoices,
//   onUpdateFoodChoices,
//   settings,
//   // onUpdateSettings,
//   groups,
//   event,
// }: RSVPFormBuilderProps) => {
//   const [activeTab, setActiveTab] = useState<"builder" | "preview">("builder");
//   const [formFields, setFormFields] = useState<FormField[]>([
//     {
//       id: "1",
//       type: "predefined",
//       fieldType: "name",
//       label: "Full Name",
//       required: true,
//       order: 1,
//     },
//     {
//       id: "2",
//       type: "predefined",
//       fieldType: "email",
//       label: "Email Address",
//       required: true,
//       order: 2,
//     },
//     {
//       id: "3",
//       type: "predefined",
//       fieldType: "rsvp-response",
//       label: "Will you be attending?",
//       required: true,
//       order: 3,
//     },
//   ]);

//   const predefinedFields = [
//     {
//       id: "name",
//       type: "predefined",
//       label: "Full Name",
//       icon: User,
//       description: "Guest full name (required)",
//       required: true,
//     },
//     {
//       id: "email",
//       type: "predefined",
//       label: "Email Address",
//       icon: Mail,
//       description: "Contact email (required)",
//       required: true,
//     },
//     {
//       id: "phone",
//       type: "predefined",
//       label: "Phone Number",
//       icon: Phone,
//       description: "Contact phone number",
//       required: false,
//     },
//     {
//       id: "rsvp-response",
//       type: "predefined",
//       label: "RSVP Response",
//       icon: CheckSquare,
//       description: "Yes/No/Maybe response",
//       required: true,
//     },
//     {
//       id: "plus-ones",
//       type: "predefined",
//       label: "Plus Ones",
//       icon: Users,
//       description: "Number of additional guests",
//       required: false,
//     },
//     {
//       id: "group-selection",
//       type: "predefined",
//       label: "Guest Group",
//       icon: Users,
//       description: "Select guest category",
//       required: false,
//     },
//     {
//       id: "dietary-restrictions",
//       type: "predefined",
//       label: "Dietary Restrictions",
//       icon: Utensils,
//       description: "Food allergies and preferences",
//       required: false,
//     },
//     {
//       id: "special-accommodations",
//       type: "predefined",
//       label: "Special Accommodations",
//       icon: MapPin,
//       description: "Accessibility requirements",
//       required: false,
//     },
//     {
//       id: "song-requests",
//       type: "predefined",
//       label: "Song Requests",
//       icon: Music,
//       description: "Music preferences",
//       required: false,
//     },
//     {
//       id: "message-to-hosts",
//       type: "predefined",
//       label: "Message to Hosts",
//       icon: MessageSquare,
//       description: "Personal note or wishes",
//       required: false,
//     },
//   ];

//   const addField = (fieldData: FormField, insertIndex?: number) => {
//     const newField: FormField = {
//       id: Date.now().toString(),
//       type: fieldData.type,
//       fieldType: fieldData.id || fieldData.fieldType || fieldData.type,
//       label: fieldData.label,
//       required: fieldData.required || false,
//       order: insertIndex !== undefined ? insertIndex : formFields.length + 1,
//       config: fieldData.config,
//     };

//     let updatedFields = [...formFields];

//     if (insertIndex !== undefined) {
//       // Insert at specific position and reorder
//       updatedFields.splice(insertIndex, 0, newField);
//       updatedFields = updatedFields.map((field, index) => ({
//         ...field,
//         order: index + 1,
//       }));
//     } else {
//       // Add to end
//       updatedFields.push(newField);
//     }

//     setFormFields(updatedFields);
//   };

//   const removeField = (fieldId: string) => {
//     const updatedFields = formFields
//       .filter((field) => field.id !== fieldId)
//       .map((field, index) => ({
//         ...field,
//         order: index + 1,
//       }));
//     setFormFields(updatedFields);
//   };

//   const updateField = (fieldId: string, updates: Partial<FormField>) => {
//     setFormFields(
//       formFields.map((field) =>
//         field.id === fieldId ? { ...field, ...updates } : field,
//       ),
//     );
//   };

//   const reorderFields = (draggedId: string, targetId: string) => {
//     const draggedIndex = formFields.findIndex((f) => f.id === draggedId);
//     const targetIndex = formFields.findIndex((f) => f.id === targetId);

//     if (draggedIndex === -1 || targetIndex === -1) return;

//     const newFields = [...formFields];
//     const [draggedField] = newFields.splice(draggedIndex, 1);
//     newFields.splice(targetIndex, 0, draggedField);

//     // Update order numbers
//     const reorderedFields = newFields.map((field, index) => ({
//       ...field,
//       order: index + 1,
//     }));

//     setFormFields(reorderedFields);
//   };

//   return (
//     <div className="h-full">
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">RSVP Form Builder</h2>
//           <p className="">Design your perfect guest response form</p>
//         </div>
//         <div className="flex gap-2">
//           <Button
//             variant={activeTab === "builder" ? "default" : "outline"}
//             onClick={() => setActiveTab("builder")}
//             // className={
//             //   activeTab === "builder"
//             //     ? ""
//             //     : "border-white/20 bg-white/10 text-white"
//             // }
//           >
//             <Settings className="mr-2 h-4 w-4" />
//             Form Builder
//           </Button>
//           <Button
//             variant={activeTab === "preview" ? "default" : "outline"}
//             onClick={() => setActiveTab("preview")}
//             // className={
//             //   activeTab === "preview"
//             //     ? ""
//             //     : "border-white/20 bg-white/10 text-white"
//             // }
//           >
//             <Eye className="mr-2 h-4 w-4" />
//             Preview
//           </Button>
//         </div>
//       </div>

//       {activeTab === "builder" ? (
//         <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-4">
//           {/* Field Library Sidebar */}
//           <div className="lg:col-span-1">
//             <FormFieldLibrary
//               predefinedFields={predefinedFields}
//               customFields={customFields}
//               onUpdateCustomFields={onUpdateCustomFields}
//               foodChoices={foodChoices}
//               onUpdateFoodChoices={onUpdateFoodChoices}
//               onAddField={addField}
//             />
//           </div>

//           {/* Form Canvas */}
//           <div className="lg:col-span-3">
//             <FormCanvas
//               formFields={formFields}
//               onUpdateField={updateField}
//               onRemoveField={removeField}
//               onReorderFields={reorderFields}
//               onAddField={addField}
//               settings={settings}
//               groups={groups}
//             />
//           </div>
//         </div>
//       ) : (
//         <>
//           <FormPreview
//             formFields={formFields}
//             customFields={customFields}
//             foodChoices={foodChoices}
//             settings={settings}
//             groups={groups}
//             event={event}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// In RSVPFormBuilder
// const FormFieldLibrary = ({
//   predefinedFields,
//   customFields,
//   onUpdateCustomFields,
//   // foodChoices,
//   // onUpdateFoodChoices,
//   // onAddField,
// }: FormFieldLibraryProps) => {
//   const [activeLibraryTab, setActiveLibraryTab] = useState("predefined");
//   // const [draggedField, setDraggedField] = useState<
//   //   (CustomField & FoodChoice) | null
//   // >(null);
//   const [draggedField, setDraggedField] = useState<PredefinedField | null>(
//     null,
//   );

//   const handleDragStart = (
//     e: React.DragEvent,
//     // field: CustomField & FoodChoice,
//     // field: CustomField,
//     field: PredefinedField,
//   ) => {
//     setDraggedField(field);

//     // Create a custom drag image
//     const dragImage = document.createElement("div");
//     dragImage.className =
//       "bg-white dark:bg-secondary border-2 border-blue-500 rounded-lg p-3 shadow-xl opacity-95 max-w-xs";
//     dragImage.style.position = "absolute";
//     dragImage.style.top = "-1000px";
//     dragImage.style.left = "-1000px";
//     dragImage.innerHTML = `
//       <div class="flex items-center gap-2">
//         <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
//         <span class="font-medium text-sm">${field.label}</span>
//         ${field.required ? '<span class="text-xs bg-red-100 text-red-700 px-1 rounded">Required</span>' : ""}
//       </div>
//     `;
//     document.body.appendChild(dragImage);

//     e.dataTransfer.setDragImage(dragImage, 10, 10);
//     e.dataTransfer.setData("application/json", JSON.stringify(field));
//     e.dataTransfer.effectAllowed = "copy";

//     // Clean up drag image
//     setTimeout(() => {
//       if (document.body.contains(dragImage)) {
//         document.body.removeChild(dragImage);
//       }
//     }, 0);
//   };

//   const handleDragEnd = () => {
//     setDraggedField(null);
//   };

//   return (
//     <Card className="dark:bg-secondary h-full backdrop-blur-sm">
//       <CardHeader className="pb-3">
//         <CardTitle className="text-lg">Field Library</CardTitle>
//         <p className="text-sm text-gray-600 dark:text-gray-300">
//           Drag fields to add them to your form
//         </p>
//       </CardHeader>
//       <CardContent className="p-0">
//         <Tabs
//           value={activeLibraryTab}
//           onValueChange={setActiveLibraryTab}
//           className="h-full"
//         >
//           <TabsList className="mb-4 w-full px-1">
//             <TabsTrigger
//               value="predefined"
//               className="text-xs"
//             >
//               Standard
//             </TabsTrigger>
//             <TabsTrigger
//               value="custom"
//               className="text-xs"
//             >
//               Custom
//             </TabsTrigger>
//           </TabsList>

//           {/* <div className="h-[calc(100%-120px)] overflow-y-auto px-4 pb-4"> */}
//           <div className="overflow-y-auto px-4 pb-4">
//             <TabsContent
//               value="predefined"
//               className="mt-0 space-y-2"
//             >
//               {predefinedFields?.map((field) => (
//                 <div
//                   key={field.id}
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, field)}
//                   onDragEnd={handleDragEnd}
//                   className={`group dark:hover:bg-secondary cursor-grab rounded-lg border p-3 transition-all hover:border-blue-300 hover:bg-blue-50 active:cursor-grabbing ${
//                     draggedField?.id === field.id
//                       ? "scale-95 border-blue-500 bg-blue-50 opacity-50 dark:bg-black!"
//                       : ""
//                   }`}
//                 >
//                   <div className="mb-1 flex items-center gap-2 text-gray-500 dark:text-gray-300">
//                     <Grip className="h-4 w-4 group-hover:text-blue-500" />
//                     {field.icon && (
//                       <field.icon className="h-4 w-4 group-hover:text-blue-600" />
//                     )}
//                     <span className="text-sm font-medium">{field.label}</span>
//                     {field.required && (
//                       <Badge
//                         variant="secondary"
//                         className="text-xs"
//                       >
//                         Required
//                       </Badge>
//                     )}
//                   </div>
//                   <p className="ml-8 text-xs">{field.description}</p>
//                 </div>
//               ))}
//             </TabsContent>

//             <TabsContent
//               value="custom"
//               className="mt-0"
//             >
//               <div className="space-y-4">
//                 {customFields.length > 0 && (
//                   <div className="space-y-2">
//                     <div className="text-sm font-medium">
//                       Your Custom Fields:
//                     </div>
//                     {customFields.map((field) => (
//                       <div
//                         key={field.id}
//                         draggable
//                         onDragStart={(e) =>
//                           handleDragStart(e, { ...field, type: "custom" })
//                         }
//                         onDragEnd={handleDragEnd}
//                         className={`group cursor-grab rounded-lg border p-3 transition-all hover:border-blue-300 hover:bg-blue-50 active:cursor-grabbing ${
//                           draggedField?.id === field.id
//                             ? "scale-95 border-blue-500 bg-blue-50 opacity-50"
//                             : ""
//                         }`}
//                       >
//                         <div className="mb-1 flex items-center gap-2">
//                           <Grip className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
//                           <span className="text-sm font-medium">
//                             {field.label}
//                           </span>
//                           {field.required && (
//                             <Badge
//                               variant="secondary"
//                               className="text-xs"
//                             >
//                               Required
//                             </Badge>
//                           )}
//                         </div>
//                         <div className="ml-6 text-xs text-gray-500">
//                           {field.type} • Custom field
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <CustomFieldsManager
//                   fields={customFields}
//                   onUpdate={onUpdateCustomFields}
//                 />
//               </div>
//             </TabsContent>
//           </div>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// };

// In FormFieldLibrary
// const CustomFieldsManager = ({
//   fields,
//   onUpdate,
// }: CustomFieldsManagerProps) => {
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingField, setEditingField] = useState<CustomField | null>(null);
//   if (editingField) {
//   }
//   const [newField, setNewField] = useState<Partial<CustomField>>({
//     label: "",
//     type: "text",
//     required: false,
//     options: [],
//   });

//   const fieldTypes = [
//     { value: "text", label: "Text Input" },
//     { value: "textarea", label: "Long Text" },
//     { value: "dropdown", label: "Dropdown" },
//     { value: "radio", label: "Multiple Choice" },
//     { value: "checkbox", label: "Checkboxes" },
//   ];

//   const addField = () => {
//     if (newField.label) {
//       const field: CustomField = {
//         id: Date.now().toString(),
//         label: newField.label,
//         type: newField.type || "text",
//         required: newField.required || false,
//         options: newField.options || [],
//         placeholder: newField.placeholder,
//       };
//       onUpdate([...fields, field]);
//       setNewField({ label: "", type: "text", required: false, options: [] });
//       setIsAdding(false);
//     }
//   };

//   // const updateField = (id: string, updates: Partial<CustomField>) => {
//   //   onUpdate(
//   //     fields.map((field) =>
//   //       field.id === id ? { ...field, ...updates } : field,
//   //     ),
//   //   );
//   // };

//   const removeField = (id: string) => {
//     onUpdate(fields.filter((field) => field.id !== id));
//   };

//   // const addOption = (fieldId: string, option: string) => {
//   //   updateField(fieldId, {
//   //     options: [
//   //       ...(fields.find((f) => f.id === fieldId)?.options || []),
//   //       option,
//   //     ],
//   //   });
//   // };

//   // const removeOption = (fieldId: string, optionIndex: number) => {
//   //   const field = fields.find((f) => f.id === fieldId);
//   //   if (field) {
//   //     updateField(fieldId, {
//   //       options: field.options?.filter((_, index) => index !== optionIndex),
//   //     });
//   //   }
//   // };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold">Custom RSVP Fields</h3>
//         <Button
//           onClick={() => setIsAdding(true)}
//           size="sm"
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Add Field
//         </Button>
//       </div>

//       {/* Add New Field Form */}
//       {isAdding && (
//         <Card className="dark:bg-secondary border-blue-200 bg-blue-50">
//           <CardHeader>
//             <CardTitle className="text-lg">Add Custom Field</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label>Field Label</Label>
//                 <Input
//                   value={newField.label}
//                   onChange={(e) =>
//                     setNewField({ ...newField, label: e.target.value })
//                   }
//                   placeholder="e.g., Transportation Needs"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Field Type</Label>
//                 <Select
//                   value={newField.type}
//                   onValueChange={(value) =>
//                     setNewField({
//                       ...newField,
//                       type: value as CustomField["type"],
//                     })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {fieldTypes.map((type) => (
//                       <SelectItem
//                         key={type.value}
//                         value={type.value}
//                       >
//                         {type.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {(newField.type === "text" || newField.type === "textarea") && (
//               <div className="space-y-2">
//                 <Label>Placeholder Text</Label>
//                 <Input
//                   value={newField.placeholder || ""}
//                   onChange={(e) =>
//                     setNewField({ ...newField, placeholder: e.target.value })
//                   }
//                   placeholder="Hint text for users"
//                 />
//               </div>
//             )}

//             {(newField.type === "dropdown" ||
//               newField.type === "radio" ||
//               newField.type === "checkbox") && (
//               <div className="space-y-2">
//                 <Label>Options</Label>
//                 <div className="space-y-2">
//                   {newField.options?.map((option, index) => (
//                     <div
//                       key={index}
//                       className="flex gap-2"
//                     >
//                       <Input
//                         value={option}
//                         readOnly
//                       />
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           const newOptions = [...(newField.options || [])];
//                           newOptions.splice(index, 1);
//                           setNewField({ ...newField, options: newOptions });
//                         }}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                   <div className="flex gap-2">
//                     <Input
//                       placeholder="Add option"
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           const value = (e.target as HTMLInputElement).value;
//                           if (value) {
//                             setNewField({
//                               ...newField,
//                               options: [...(newField.options || []), value],
//                             });
//                             (e.target as HTMLInputElement).value = "";
//                           }
//                         }
//                       }}
//                     />
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={(e) => {
//                         const input = (e.target as HTMLElement)
//                           .previousElementSibling as HTMLInputElement;
//                         if (input.value) {
//                           setNewField({
//                             ...newField,
//                             options: [...(newField.options || []), input.value],
//                           });
//                           input.value = "";
//                         }
//                       }}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Switch
//                   checked={newField.required}
//                   onCheckedChange={(checked) =>
//                     setNewField({ ...newField, required: checked })
//                   }
//                 />
//                 <Label>Required Field</Label>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <Button onClick={addField}>Add Field</Button>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsAdding(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Existing Fields */}
//       <div className="space-y-3">
//         {fields.map((field) => (
//           <Card
//             key={field.id}
//             className="border-l-4 border-l-blue-500"
//           >
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <GripVertical className="h-4 w-4 text-gray-400" />
//                   <div>
//                     <div className="font-medium">{field.label}</div>
//                     <div className="text-sm text-gray-500">
//                       {fieldTypes.find((t) => t.value === field.type)?.label}
//                       {field.required && (
//                         <Badge
//                           variant="secondary"
//                           className="ml-2"
//                         >
//                           Required
//                         </Badge>
//                       )}
//                     </div>
//                     {field.options && field.options.length > 0 && (
//                       <div className="mt-1 text-xs text-gray-400">
//                         Options: {field.options.join(", ")}
//                       </div>
//                     )}
//                     <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
//                       <GripVertical className="h-3 w-3" />
//                       Ready to drag to form
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-1">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setEditingField(field)}
//                   >
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeField(field.id)}
//                     className="text-red-600"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {fields.length === 0 && !isAdding && (
//         <Card className="border-2 border-dashed border-gray-300">
//           <CardContent className="p-8 text-center">
//             <p className="mb-4 text-gray-500">No custom fields added yet</p>
//             <Button
//               onClick={() => setIsAdding(true)}
//               variant="outline"
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Add Your First Custom Field
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// In RSVPFormBuilder
// const FormCanvas = ({
//   formFields,
//   onUpdateField,
//   onRemoveField,
//   onReorderFields,
//   onAddField,
//   // settings,
//   groups,
// }: FormCanvasProps) => {
//   const [draggedField, setDraggedField] = useState<string | null>(null);
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [dragOverIndex, setDragOverIndex] = useState<number>(-1);
//   const [isDragOver, setIsDragOver] = useState(false);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "copy";
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     if (!e.currentTarget.contains(e.relatedTarget as Node)) {
//       setIsDragOver(false);
//       setDragOverIndex(-1);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     setDragOverIndex(-1);

//     try {
//       const fieldData = JSON.parse(e.dataTransfer.getData("application/json"));

//       // Check if it's a new field from the library
//       if (!formFields.some((f) => f.id === fieldData.id)) {
//         const newField: FormField = {
//           id: Date.now().toString(),
//           type: fieldData.type || "predefined",
//           fieldType: fieldData.id || fieldData.fieldType || fieldData.type,
//           label: fieldData.label,
//           required: fieldData.required || false,
//           order: formFields.length + 1,
//           config: fieldData.config,
//         };

//         if (onAddField) {
//           onAddField(newField, dragOverIndex >= 0 ? dragOverIndex : undefined);
//         }
//       }
//     } catch (error) {
//       console.error("Error parsing dropped field data:", error);
//     }
//   };

//   const handleFieldDragStart = (e: React.DragEvent, fieldId: string) => {
//     setDraggedField(fieldId);
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("text/plain", fieldId);
//   };

//   // const handleFieldDragEnd = (e: React.DragEvent) => {
//   const handleFieldDragEnd = () => {
//     setDraggedField(null);
//     setDragOverIndex(-1);
//   };

//   const handleFieldDragOver = (e: React.DragEvent, index: number) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (draggedField) {
//       e.dataTransfer.dropEffect = "move";

//       // Calculate insertion point based on cursor position
//       const rect = e.currentTarget.getBoundingClientRect();
//       const midY = rect.top + rect.height / 2;
//       const insertIndex = e.clientY < midY ? index : index + 1;

//       setDragOverIndex(insertIndex);
//     }
//   };

//   const handleFieldDrop = (e: React.DragEvent, targetIndex: number) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (draggedField) {
//       const targetField = sortedFields[targetIndex];
//       if (targetField && draggedField !== targetField.id) {
//         onReorderFields(draggedField, targetField.id);
//       }
//     }

//     setDraggedField(null);
//     setDragOverIndex(-1);
//   };

//   const getInsertionIndicator = (index: number) => {
//     if (dragOverIndex === index && draggedField) {
//       return (
//         <div className="mx-4 my-2 h-1 animate-pulse rounded-full bg-blue-500 shadow-md">
//           <div className="h-full rounded-full bg-linear-to-r from-blue-400 to-blue-600"></div>
//         </div>
//       );
//     }
//     return null;
//   };

//   const renderFieldPreview = (field: FormField) => {
//     switch (field.fieldType) {
//       case "name":
//       case "email":
//       case "phone":
//         return (
//           <Input
//             placeholder={`Enter ${field.label.toLowerCase()}`}
//             disabled
//             className="bg-gray-50"
//           />
//         );

//       case "rsvp-response":
//         return (
//           <div className="space-y-2">
//             <div className="flex items-center space-x-2 rounded border p-2">
//               <input
//                 type="radio"
//                 disabled
//               />
//               <label>Yes, I&apos;ll be there!</label>
//             </div>
//             <div className="flex items-center space-x-2 rounded border p-2">
//               <input
//                 type="radio"
//                 disabled
//               />
//               <label>Maybe - I&apos;m not sure yet</label>
//             </div>
//             <div className="flex items-center space-x-2 rounded border p-2">
//               <input
//                 type="radio"
//                 disabled
//               />
//               <label>Sorry, I can&apos;t make it</label>
//             </div>
//           </div>
//         );

//       case "plus-ones":
//         return (
//           <select
//             disabled
//             className="w-full rounded border bg-gray-50 p-2"
//           >
//             <option>Just me</option>
//             <option>1 additional guest</option>
//             <option>2 additional guests</option>
//           </select>
//         );

//       case "group-selection":
//         return (
//           <select
//             disabled
//             className="w-full rounded border bg-gray-50 p-2"
//           >
//             <option>Select your group</option>
//             {groups.map((group) => (
//               <option key={group.id}>{group.name}</option>
//             ))}
//           </select>
//         );

//       case "text":
//         return (
//           <Input
//             placeholder={field.config?.placeholder || "Enter your response"}
//             disabled
//             className="bg-gray-50"
//           />
//         );

//       case "textarea":
//         return (
//           <textarea
//             placeholder={field.config?.placeholder || "Enter your response"}
//             disabled
//             className="w-full rounded border bg-gray-50 p-2"
//             rows={3}
//           />
//         );

//       case "dropdown":
//         return (
//           <select
//             disabled
//             className="w-full rounded border bg-gray-50 p-2"
//           >
//             <option>Select an option</option>
//             {field.config?.options?.map((option: string, index: number) => (
//               <option key={index}>{option}</option>
//             ))}
//           </select>
//         );

//       case "food-choices":
//         return (
//           <div className="space-y-2">
//             {field.config?.choices?.slice(0, 3).map((choice, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-center space-x-2 rounded border p-2"
//               >
//                 <input
//                   type="radio"
//                   disabled
//                 />
//                 <label>{choice.name}</label>
//               </div>
//             ))}
//             {(field.config?.choices?.length ?? 0) > 3 && (
//               <div className="text-sm text-gray-500">
//                 +{(field?.config?.choices?.length ?? 0) - 3} more options
//               </div>
//             )}
//           </div>
//         );

//       default:
//         return (
//           <Input
//             placeholder="Field preview"
//             disabled
//             className="bg-gray-50"
//           />
//         );
//     }
//   };

//   const sortedFields = [...formFields].sort((a, b) => a.order - b.order);

//   return (
//     <Card className="dark:bg-secondary h-full backdrop-blur-sm">
//       <CardHeader>
//         <CardTitle className="flex items-center justify-between">
//           <span>Form Builder Canvas</span>
//           <Badge variant="outline">{formFields.length} fields</Badge>
//         </CardTitle>
//       </CardHeader>
//       {/* <CardContent className="h-[calc(100%-80px)] overflow-y-auto"> */}
//       <CardContent className="overflow-y-auto">
//         <div
//           className={`min-h-full space-y-3 transition-all ${
//             isDragOver
//               ? "dark:bg-background rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-4"
//               : ""
//           }`}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           {sortedFields.length === 0 ? (
//             <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
//               <div className="text-gray-500">
//                 <Settings className="mx-auto mb-4 h-12 w-12 opacity-50" />
//                 <h3 className="mb-2 text-lg font-medium">
//                   Start Building Your Form
//                 </h3>
//                 <p className="text-sm">
//                   Drag fields from the library on the left to build your RSVP
//                   form. You can reorder fields by dragging them within this
//                   area.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {getInsertionIndicator(0)}
//               {sortedFields.map((field, index) => (
//                 <div key={field.id}>
//                   <div
//                     draggable
//                     onDragStart={(e) => handleFieldDragStart(e, field.id)}
//                     onDragEnd={handleFieldDragEnd}
//                     onDragOver={(e) => handleFieldDragOver(e, index)}
//                     onDrop={(e) => handleFieldDrop(e, index)}
//                     className={`dark:bg-background cursor-move rounded-lg border bg-white p-4 transition-all ${
//                       draggedField === field.id
//                         ? "rotate-1 transform border-blue-500 opacity-50 shadow-lg"
//                         : "hover:border-blue-200 hover:shadow-md"
//                     } ${editingField === field.id ? "ring-2 ring-blue-500" : ""}`}
//                   >
//                     <div className="mb-3 flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <GripVertical className="h-4 w-4 cursor-grab text-gray-400 hover:text-blue-500" />
//                         <span className="font-medium">{field.label}</span>
//                         {field.required && (
//                           <Badge
//                             variant="secondary"
//                             className="text-xs"
//                           >
//                             Required
//                           </Badge>
//                         )}
//                         <Badge
//                           variant="outline"
//                           className="text-xs"
//                         >
//                           {field.type === "predefined"
//                             ? "Standard"
//                             : field.type === "custom"
//                               ? "Custom"
//                               : "Food"}
//                         </Badge>
//                       </div>
//                       <div className="flex gap-1">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() =>
//                             setEditingField(
//                               editingField === field.id ? null : field.id,
//                             )
//                           }
//                         >
//                           {editingField === field.id ? (
//                             <EyeOff className="h-4 w-4" />
//                           ) : (
//                             <Edit className="h-4 w-4" />
//                           )}
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => onRemoveField(field.id)}
//                           className="text-red-600 hover:bg-red-50 hover:text-red-700"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>

//                     {editingField === field.id ? (
//                       <div className="space-y-3 rounded bg-gray-50 p-3">
//                         <div className="grid grid-cols-2 gap-3">
//                           <div>
//                             <Label className="text-sm">Field Label</Label>
//                             <Input
//                               value={field.label}
//                               onChange={(e) =>
//                                 onUpdateField(field.id, {
//                                   label: e.target.value,
//                                 })
//                               }
//                               className="mt-1"
//                             />
//                           </div>
//                           <div className="mt-6 flex items-center space-x-2">
//                             <Switch
//                               checked={field.required}
//                               onCheckedChange={(checked) =>
//                                 onUpdateField(field.id, { required: checked })
//                               }
//                             />
//                             <Label>Required Field</Label>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">
//                           {field.label}
//                           {field.required && (
//                             <span className="ml-1 text-red-500">*</span>
//                           )}
//                         </Label>
//                         {renderFieldPreview(field)}
//                       </div>
//                     )}
//                   </div>
//                   {getInsertionIndicator(index + 1)}
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// In RSVPFormBuilder
// const FormPreview = ({
//   // formFields,
//   customFields,
//   foodChoices,
//   settings,
//   groups,
//   event,
// }: FormPreviewProps) => {
//   return (
//     <div className="space-y-4">
//       <Card className="dark:bg-secondary backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <span>Form Preview</span>
//             <span className="text-sm font-normal text-gray-500">
//               - This is how guests will see your RSVP form
//             </span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-lg bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-1">
//             <div className="dark:bg-secondary overflow-hidden rounded-lg bg-white">
//               <RSVPForm
//                 event={event}
//                 groups={groups}
//                 customFields={customFields}
//                 foodChoices={foodChoices}
//                 settings={settings}
//                 onBack={() => {}}
//                 isPreview={true}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// In RSVPModule
const GuestList = ({
	guests,
	groupId,
	groupName,
	maxDisplay = 5,
}: GuestListProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedGuest, setSelectedGuest] = useState<Partial<Guest> | null>(
		null,
	);

	const groupGuests = guests.filter((guest) => guest.group === groupId);
	const filteredGuests = groupGuests.filter(
		(guest) =>
			guest?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
			guest?.email?.toLowerCase()?.includes(searchQuery.toLowerCase()),
	);

	const displayedGuests = isExpanded
		? filteredGuests
		: filteredGuests.slice(0, maxDisplay);
	const attendingCount = groupGuests.filter(
		(g) => g.status === "attending",
	).length;

	const getAvatarColor = (index: number) => {
		const colors = [
			"from-blue-500 to-blue-600",
			"from-purple-500 to-purple-600",
			"from-pink-500 to-pink-600",
			"from-green-500 to-green-600",
			"from-orange-500 to-orange-600",
			"from-red-500 to-red-600",
			"from-indigo-500 to-indigo-600",
			"from-yellow-500 to-yellow-600",
		];
		return colors[index % colors.length];
	};

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

	if (groupGuests.length === 0) {
		return (
			<div className="text-muted-foreground py-4 text-center text-sm">
				No guests in this group yet
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{/* Avatar Stack */}
			<div className="flex items-center gap-2">
				<div className="flex -space-x-2">
					{groupGuests.slice(0, maxDisplay).map((guest, index) => (
						<Avatar
							key={guest.id}
							className="border-background h-8 w-8 cursor-pointer border-2 transition-transform hover:z-10 hover:scale-110"
							onClick={() => setSelectedGuest(guest ?? null)}
						>
							<AvatarImage src={guest.avatar} alt={guest.name} />
							<AvatarFallback
								className={cn(
									"bg-linear-to-br text-xs font-medium text-white",
									getAvatarColor(index),
								)}
							>
								{guest?.name
									?.split(" ")
									?.map((n) => n[0])
									.join("")
									.slice(0, 2)}
							</AvatarFallback>
						</Avatar>
					))}
				</div>
				{groupGuests.length > maxDisplay && (
					<span className="text-muted-foreground text-sm font-medium">
						+{groupGuests.length - maxDisplay} more
					</span>
				)}
			</div>

			{/* Stats */}
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">
					{groupGuests.length} member{groupGuests.length !== 1 ? "s" : ""} •{" "}
					{attendingCount} attending
				</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsExpanded(!isExpanded)}
					className="h-7 px-2 text-xs"
				>
					{isExpanded ? (
						<>
							Collapse <ChevronUp className="ml-1 h-3 w-3" />
						</>
					) : (
						<>
							Expand <ChevronDown className="ml-1 h-3 w-3" />
						</>
					)}
				</Button>
			</div>

			{/* Expanded Content */}
			{isExpanded && (
				<div className="animate-fade-in space-y-3">
					{/* Search */}
					<div className="relative">
						<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
						<Input
							placeholder="Search guests..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="bg-muted/50 h-9 pl-9"
						/>
					</div>

					{/* Guest Cards */}
					<div className="max-h-64 space-y-2 overflow-y-auto">
						{displayedGuests.map((guest, index) => (
							<div
								key={guest.id}
								className="bg-card hover:bg-accent/50 group flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors"
								onClick={() => setSelectedGuest(guest)}
								style={{ animationDelay: `${index * 50}ms` }}
							>
								<div className="flex min-w-0 flex-1 items-center gap-3">
									<Avatar className="border-background h-10 w-10 border-2 transition-transform group-hover:scale-105">
										<AvatarImage src={guest.avatar} alt={guest.name} />
										<AvatarFallback
											className={cn(
												"bg-linear-to-br text-sm font-medium text-white",
												getAvatarColor(index),
											)}
										>
											{guest?.name
												?.split(" ")
												.map((n) => n[0])
												.join("")
												.slice(0, 2)}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium">{guest.name}</p>
										<p className="text-muted-foreground truncate text-xs">
											{guest.email}
										</p>
									</div>
								</div>
								<Badge
									variant="outline"
									className={cn(
										"shrink-0 text-xs capitalize",
										getStatusColor(guest?.status ?? ""),
									)}
								>
									{guest.status === "attending" && "✓ "}
									{guest.status === "declined" && "✗ "}
									{guest.status === "maybe" && "? "}
									{guest.status === "pending" && "⏱ "}
									{guest.status}
								</Badge>
							</div>
						))}
					</div>

					{filteredGuests.length === 0 && (
						<div className="text-muted-foreground py-6 text-center text-sm">
							No guests found matching &apos;{searchQuery}&apos;
						</div>
					)}
				</div>
			)}

			{/* Profile Dialog */}
			<GuestProfileDialog
				guest={selectedGuest}
				isOpen={!!selectedGuest}
				onClose={() => setSelectedGuest(null)}
				groupName={groupName}
			/>
		</div>
	);
};

// In GuestList
const GuestProfileDialog = ({
	guest,
	isOpen,
	onClose,
	groupName,
}: GuestProfileDialogProps) => {
	if (!guest) return null;

	const getStatusConfig = (status: string) => {
		switch (status) {
			case "attending":
				return {
					icon: CheckCircle,
					color: "text-green-600 dark:text-green-400",
					bg: "bg-green-500/10",
					label: "Attending",
				};
			case "declined":
				return {
					icon: XCircle,
					color: "text-red-600 dark:text-red-400",
					bg: "bg-red-500/10",
					label: "Declined",
				};
			case "maybe":
				return {
					icon: HelpCircle,
					color: "text-yellow-600 dark:text-yellow-400",
					bg: "bg-yellow-500/10",
					label: "Maybe",
				};
			default:
				return {
					icon: Clock,
					color: "text-muted-foreground",
					bg: "bg-muted",
					label: "Pending",
				};
		}
	};

	const statusConfig = getStatusConfig(guest?.status ?? "");
	const StatusIcon = statusConfig.icon;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="sr-only">
						Guest Profile - {guest.name}
					</DialogTitle>
				</DialogHeader>

				{/* Header Section */}
				<div className="flex items-start gap-4">
					<Avatar className="border-background h-20 w-20 border-4 shadow-lg">
						<AvatarImage src={guest.avatar} alt={guest.name} />
						<AvatarFallback className="from-primary bg-linear-to-br to-purple-600 text-2xl font-semibold text-white">
							{guest?.name
								?.split(" ")
								.map((n) => n[0])
								.join("")
								.slice(0, 2)}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<h2 className="text-2xl font-bold">{guest.name}</h2>
						{groupName && (
							<p className="text-muted-foreground mt-1 text-sm">
								{groupName} Group
							</p>
						)}
						<Badge
							variant="outline"
							className={cn("mt-2", statusConfig.bg, statusConfig.color)}
						>
							<StatusIcon className="mr-1 h-3 w-3" />
							{statusConfig.label}
						</Badge>
					</div>
				</div>

				<Separator className="my-4" />

				{/* Contact Information */}
				<div className="space-y-4">
					<h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
						Contact Information
					</h3>
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
								<Mail className="text-primary h-4 w-4" />
							</div>
							<div>
								<p className="text-muted-foreground text-xs">Email</p>
								<a
									href={`mailto:${guest.email}`}
									className="hover:text-primary text-sm font-medium transition-colors"
								>
									{guest.email}
								</a>
							</div>
						</div>
						{guest.phone && (
							<div className="flex items-center gap-3">
								<div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
									<Phone className="text-primary h-4 w-4" />
								</div>
								<div>
									<p className="text-muted-foreground text-xs">Phone</p>
									<a
										href={`tel:${guest.phone}`}
										className="hover:text-primary text-sm font-medium transition-colors"
									>
										{guest.phone}
									</a>
								</div>
							</div>
						)}
					</div>
				</div>

				<Separator className="my-4" />

				{/* RSVP Details */}
				<div className="space-y-4">
					<h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
						RSVP Details
					</h3>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
								<CalendarIcon className="h-4 w-4 text-blue-600" />
							</div>
							<div>
								<p className="text-muted-foreground text-xs">Invited</p>
								<p className="text-sm font-medium">
									{guest?.invitedDate?.toLocaleDateString()}
								</p>
							</div>
						</div>
						{guest.respondedDate && (
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
									<CheckCircle className="h-4 w-4 text-green-600" />
								</div>
								<div>
									<p className="text-muted-foreground text-xs">Responded</p>
									<p className="text-sm font-medium">
										{guest.respondedDate.toLocaleDateString()}
									</p>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Plus Ones */}
				{(guest?.plusOnes ?? 0) > 0 && (
					<>
						<Separator className="my-4" />
						<div className="space-y-4">
							<h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
								<Users className="h-4 w-4" />
								Plus Ones ({guest.plusOnes})
							</h3>
							{guest.plusOneNames && guest.plusOneNames.length > 0 ? (
								<ul className="space-y-2">
									{guest.plusOneNames.map((name, index) => (
										<li key={index} className="flex items-center gap-2 text-sm">
											<div className="bg-primary h-2 w-2 rounded-full"></div>
											{name}
										</li>
									))}
								</ul>
							) : (
								<p className="text-muted-foreground text-sm">
									{guest.plusOnes} guest{(guest?.plusOnes ?? 0) > 1 ? "s" : ""}{" "}
									(names not provided)
								</p>
							)}
						</div>
					</>
				)}

				{/* Dietary Restrictions */}
				{guest.dietaryRestrictions && (
					<>
						<Separator className="my-4" />
						<div className="space-y-4">
							<h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
								<UtensilsCrossed className="h-4 w-4" />
								Dietary Restrictions
							</h3>
							<p className="text-sm">{guest.dietaryRestrictions}</p>
						</div>
					</>
				)}

				{/* Notes */}
				{guest.notes && (
					<>
						<Separator className="my-4" />
						<div className="space-y-4">
							<h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
								<FileText className="h-4 w-4" />
								Notes
							</h3>
							<p className="text-sm">{guest.notes}</p>
						</div>
					</>
				)}

				{/* Actions */}
				<div className="flex gap-2 pt-4">
					<Button
						variant="default"
						className="flex-1"
						onClick={() => (window.location.href = `mailto:${guest.email}`)}
					>
						<Mail className="mr-2 h-4 w-4" />
						Send Email
					</Button>
					<Button variant="outline" onClick={onClose}>
						Close
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

// In RSVPModule
const RSVPSettings = ({ settings }: Partial<RSVPSettingsProps>) => {
	const [registryLinks, setRegistryLinks] = useState<RegistryLink[]>(
		settings?.registryLinks || [],
	);
	const [newRegistry, setNewRegistry] = useState({
		name: "",
		url: "",
		platform: "",
		description: "",
	});

	const handleSettingChange = (
		key: keyof Partial<RSVPSettings>,
		value: RegistryLink[] | number,
	) => {
		if (key || value) {
		}
		// onUpdate && onUpdate({ ...settings });
	};

	const addRegistryLink = () => {
		if (newRegistry.name && newRegistry.url) {
			const newLink: RegistryLink = {
				id: Date.now().toString(),
				...newRegistry,
			};
			const updatedLinks = [...registryLinks, newLink];
			setRegistryLinks(updatedLinks);
			handleSettingChange("registryLinks", updatedLinks);
			setNewRegistry({ name: "", url: "", platform: "", description: "" });
		}
	};

	const removeRegistryLink = (id: string) => {
		const updatedLinks = registryLinks.filter((link) => link.id !== id);
		setRegistryLinks(updatedLinks);
		handleSettingChange("registryLinks", updatedLinks);
	};

	return (
		<div className="space-y-6">
			<Tabs defaultValue="basic" className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="basic">Basic Settings</TabsTrigger>
					<TabsTrigger value="access">Access Control</TabsTrigger>
					<TabsTrigger value="registry">Registry</TabsTrigger>
					<TabsTrigger value="communication">Communication</TabsTrigger>
				</TabsList>

				<TabsContent value="basic" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Clock className="h-5 w-5" />
								Response Settings
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label>RSVP Deadline</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className={cn(
													"w-full justify-start text-left font-normal",
													settings?.deadline && "text-muted-foreground",
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{settings?.deadline
													? format(settings.deadline, "PPP")
													: "Select deadline"}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={settings?.deadline}
												// onSelect={(date) =>
												// date ? handleSettingChange("deadline", date) : null
												// }
												initialFocus
												className="pointer-events-auto p-3"
											/>
										</PopoverContent>
									</Popover>
								</div>

								<div className="space-y-2">
									<Label>Response Options</Label>
									<Select
										value={settings?.responseOptions}
										// onValueChange={(value) =>
										// handleSettingChange("responseOptions", value)
										// }
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="yes-no">Yes / No</SelectItem>
											<SelectItem value="yes-no-maybe">
												Yes / No / Maybe
											</SelectItem>
											<SelectItem value="custom">Custom Options</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label>Capacity Limit (Optional)</Label>
									<Input
										type="number"
										value={settings?.capacityLimit || ""}
										onChange={(e) =>
											handleSettingChange(
												"capacityLimit",
												Number(e?.target?.value),
												// e?.target?.value ? parseInt(e?.target?.value) : undefined,
											)
										}
										placeholder="No limit"
									/>
								</div>

								<div className="space-y-2">
									<Label>Maximum Plus Ones</Label>
									<Input
										type="number"
										value={settings?.maxPlusOnes}
										onChange={(e) =>
											handleSettingChange(
												"maxPlusOnes",
												parseInt(e?.target?.value) || 0,
											)
										}
										min="0"
										max="10"
									/>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label htmlFor="plus-ones">Allow Plus Ones</Label>
									<Switch
										id="plus-ones"
										checked={settings?.allowPlusOnes}
										// onCheckedChange={(checked) =>
										//   handleSettingChange("allowPlusOnes", checked)
										// }
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label htmlFor="waitlist">Enable Waitlist</Label>
									<Switch
										id="waitlist"
										checked={settings?.enableWaitlist}
										// onCheckedChange={(checked) =>
										//   handleSettingChange("enableWaitlist", checked)
										// }
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label htmlFor="dietary">Collect Dietary Information</Label>
									<Switch
										id="dietary"
										checked={settings?.collectDietaryInfo}
										// onCheckedChange={(checked) =>
										//   handleSettingChange("collectDietaryInfo", checked)
										// }
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label htmlFor="custom-fields">Enable Custom Fields</Label>
									<Switch
										id="custom-fields"
										checked={settings?.enableCustomFields}
										// onCheckedChange={(checked) =>
										//   handleSettingChange("enableCustomFields", checked)
										// }
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="access" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="h-5 w-5" />
								Access Control
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<div>
										<Label htmlFor="public">Public Registration</Label>
										<p className="text-sm text-gray-500">
											Allow anyone with the link to RSVP
										</p>
									</div>
									<Switch
										id="public"
										checked={settings?.publicRegistration}
										// onCheckedChange={(checked) =>
										//   handleSettingChange("publicRegistration", checked)
										// }
									/>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<Label htmlFor="approval">Require Approval</Label>
										<p className="text-sm text-gray-500">
											Manually approve each RSVP
										</p>
									</div>
									<Switch
										id="approval"
										checked={settings?.requireApproval}
										// onCheckedChange={(checked) =>
										//   handleSettingChange("requireApproval", checked)
										// }
									/>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<Label htmlFor="reminders">Automatic Reminders</Label>
										<p className="text-sm text-gray-500">
											Send reminder emails automatically
										</p>
									</div>
									<Switch
										id="reminders"
										checked={settings?.autoReminders}
										// onCheckedChange={(checked) =>
										//   handleSettingChange("autoReminders", checked)
										// }
									/>
								</div>
							</div>

							{settings?.publicRegistration && (
								<div className="rounded-lg bg-blue-50 p-4">
									<h4 className="mb-2 font-medium text-blue-800">
										Shareable Event Page
									</h4>
									<p className="mb-3 text-sm text-blue-700">
										Your event will be accessible via a public link that you can
										share on social media, email, or anywhere else.
									</p>
									<div className="flex gap-2">
										<Input
											value="https://eventverse.app/events/demo-event-123"
											readOnly
											className="bg-white"
										/>
										<Button size="sm" variant="outline">
											<Link2 className="mr-2 h-4 w-4" />
											Copy Link
										</Button>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="registry" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Gift className="h-5 w-5" />
								Gift Registry
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label>Registry Name</Label>
									<Input
										value={newRegistry.name}
										onChange={(e) =>
											setNewRegistry({ ...newRegistry, name: e.target.value })
										}
										placeholder="Wedding Registry"
									/>
								</div>
								<div className="space-y-2">
									<Label>Platform</Label>
									<Select
										value={newRegistry.platform}
										onValueChange={(value) =>
											setNewRegistry({ ...newRegistry, platform: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select platform" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="amazon">Amazon</SelectItem>
											<SelectItem value="target">Target</SelectItem>
											<SelectItem value="walmart">Walmart</SelectItem>
											<SelectItem value="bed-bath-beyond">
												Bed Bath & Beyond
											</SelectItem>
											<SelectItem value="williams-sonoma">
												Williams Sonoma
											</SelectItem>
											<SelectItem value="honeymoon-fund">
												Honeymoon Fund
											</SelectItem>
											<SelectItem value="custom">Custom</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Registry URL</Label>
								<Input
									value={newRegistry.url}
									onChange={(e) =>
										setNewRegistry({ ...newRegistry, url: e.target.value })
									}
									placeholder="https://..."
								/>
							</div>

							<div className="space-y-2">
								<Label>Description (Optional)</Label>
								<Textarea
									value={newRegistry.description}
									onChange={(e) =>
										setNewRegistry({
											...newRegistry,
											description: e.target.value,
										})
									}
									placeholder="Brief description of the registry"
									rows={2}
								/>
							</div>

							<Button onClick={addRegistryLink} className="w-full">
								<Plus className="mr-2 h-4 w-4" />
								Add Registry
							</Button>

							{registryLinks.length > 0 && (
								<div className="space-y-2">
									<Label>Current Registries</Label>
									<div className="space-y-2">
										{registryLinks.map((registry) => (
											<div
												key={registry.id}
												className="flex items-center justify-between rounded-lg border p-3"
											>
												<div>
													<div className="font-medium">{registry.name}</div>
													<div className="text-sm text-gray-500">
														{registry.platform}
													</div>
													{registry.description && (
														<div className="text-xs text-gray-400">
															{registry.description}
														</div>
													)}
												</div>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => removeRegistryLink(registry.id)}
													className="text-red-600"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										))}
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="communication" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Communication Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label>Invitation Template</Label>
									<Select defaultValue="default">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="default">Default Template</SelectItem>
											<SelectItem value="formal">Formal</SelectItem>
											<SelectItem value="casual">Casual</SelectItem>
											<SelectItem value="modern">Modern</SelectItem>
											<SelectItem value="custom">Custom</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>Reminder Schedule</Label>
									<Select defaultValue="standard">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="standard">
												Standard (2 weeks, 1 week, 3 days)
											</SelectItem>
											<SelectItem value="frequent">
												Frequent (2 weeks, 1 week, 3 days, 1 day)
											</SelectItem>
											<SelectItem value="minimal">
												Minimal (1 week, 3 days)
											</SelectItem>
											<SelectItem value="custom">Custom</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Custom Message</Label>
								<Textarea
									placeholder="Add a personal message to your invitations..."
									rows={3}
								/>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<Label>SMS Notifications</Label>
									<p className="text-sm text-gray-500">
										Send reminders via text message
									</p>
								</div>
								<Switch defaultChecked={false} />
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

// In RSVPModule
// const AddGuestDialog = ({
//   isOpen,
//   onClose,
//   onAddGuest,
//   groups,
// }: AddGuestDialogProps) => {
//   const [formData, setFormData] = useState<Partial<Guest>>({
//     name: "",
//     email: "",
//     phone: "",
//     group: "",
//     status: "pending",
//     plusOnes: 0,
//     dietaryRestrictions: "",
//     notes: "",
//   });

//   const [bulkMode, setBulkMode] = useState(false);
//   const [bulkContactMethod, setBulkContactMethod] = useState<"email" | "phone">(
//     "email",
//   );
//   const [bulkEmails, setBulkEmails] = useState("");
//   const [bulkPhones, setBulkPhones] = useState("");
//   const [showEmailImport, setShowEmailImport] = useState(false);
//   const [showPhoneImport, setShowPhoneImport] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation for single guest mode
//     if (!bulkMode) {
//       if (formData?.name?.trim()) {
//         alert("Name is required");
//         return;
//       }
//       if (!formData.phone?.trim()) {
//         alert("Phone number is required");
//         return;
//       }
//     }

//     if (bulkMode) {
//       if (bulkContactMethod === "email") {
//         // Handle bulk email input
//         const emails = bulkEmails.split("\n").filter((email) => email.trim());
//         emails.forEach((email) => {
//           const trimmedEmail = email.trim();
//           if (trimmedEmail) {
//             onAddGuest({
//               ...formData,
//               email: trimmedEmail,
//               phone: "", // No phone for bulk email
//               name: trimmedEmail.split("@")[0], // Use email prefix as default name
//             });
//           }
//         });
//       } else {
//         // Handle bulk phone input
//         const phones = bulkPhones.split("\n").filter((phone) => phone.trim());
//         phones.forEach((phone) => {
//           const trimmedPhone = phone.trim();
//           if (trimmedPhone) {
//             onAddGuest({
//               ...formData,
//               phone: trimmedPhone,
//               email: "", // No email for bulk phone
//               name: `Guest ${trimmedPhone}`, // Use phone as default name
//             });
//           }
//         });
//       }
//     } else {
//       onAddGuest(formData);
//     }

//     // Reset form
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       group: "",
//       status: "pending",
//       plusOnes: 0,
//       dietaryRestrictions: "",
//       notes: "",
//     });
//     setBulkEmails("");
//     setBulkPhones("");
//     setBulkMode(false);
//     setBulkContactMethod("email");
//     setShowEmailImport(false);
//     setShowPhoneImport(false);
//     onClose();
//   };

//   const handleInputChange = (
//     field: keyof Guest,
//     value: string | number | string[],
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleEmailImport = (emails: string[]) => {
//     const currentEmails = bulkEmails
//       .split("\n")
//       .filter((email) => email.trim());
//     const newEmails = [...currentEmails, ...emails].join("\n");
//     setBulkEmails(newEmails);
//     setShowEmailImport(false);
//   };

//   const handlePhoneImport = (phones: string[]) => {
//     const currentPhones = bulkPhones
//       .split("\n")
//       .filter((phone) => phone.trim());
//     const newPhones = [...currentPhones, ...phones].join("\n");
//     setBulkPhones(newPhones);
//     setShowPhoneImport(false);
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={onClose}
//     >
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add Guest{bulkMode ? "s" : ""}</DialogTitle>
//           <DialogDescription>
//             {bulkMode
//               ? `Add multiple guests by entering their ${bulkContactMethod === "email" ? "email addresses" : "phone numbers"} (one per line)`
//               : "Add a new guest to your event's RSVP list"}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="mb-4 flex gap-2">
//           <Button
//             variant={!bulkMode ? "default" : "outline"}
//             size="sm"
//             onClick={() => setBulkMode(false)}
//           >
//             Single Guest
//           </Button>
//           <Button
//             variant={bulkMode ? "default" : "outline"}
//             size="sm"
//             onClick={() => setBulkMode(true)}
//           >
//             Bulk Add
//           </Button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//         >
//           {bulkMode ? (
//             <div className="space-y-4">
//               {/* Bulk Contact Method Toggle */}
//               <div className="flex gap-2">
//                 <Button
//                   type="button"
//                   variant={
//                     bulkContactMethod === "email" ? "default" : "outline"
//                   }
//                   size="sm"
//                   onClick={() => setBulkContactMethod("email")}
//                   className="flex items-center gap-2"
//                 >
//                   <Mail className="h-4 w-4" />
//                   Bulk by Email
//                 </Button>
//                 <Button
//                   type="button"
//                   variant={
//                     bulkContactMethod === "phone" ? "default" : "outline"
//                   }
//                   size="sm"
//                   onClick={() => setBulkContactMethod("phone")}
//                   className="flex items-center gap-2"
//                 >
//                   <Phone className="h-4 w-4" />
//                   Bulk by Phone
//                 </Button>
//               </div>

//               {bulkContactMethod === "email" ? (
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="bulk-emails">Email Addresses</Label>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => setShowEmailImport(true)}
//                       className="flex items-center gap-2"
//                     >
//                       <Download className="h-4 w-4" />
//                       Import from Email
//                     </Button>
//                   </div>
//                   <Textarea
//                     id="bulk-emails"
//                     placeholder="Enter email addresses, one per line:&#10;john@example.com&#10;jane@example.com&#10;mike@example.com"
//                     value={bulkEmails}
//                     onChange={(e) => setBulkEmails(e.target.value)}
//                     rows={6}
//                     required
//                   />
//                   <p className="text-muted-foreground text-xs">
//                     Names will be auto-generated from email addresses. You can
//                     edit them later.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="bulk-phones">Phone Numbers</Label>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => setShowPhoneImport(true)}
//                       className="flex items-center gap-2"
//                     >
//                       <Download className="h-4 w-4" />
//                       Import from Contacts
//                     </Button>
//                   </div>
//                   <Textarea
//                     id="bulk-phones"
//                     placeholder="Enter phone numbers, one per line:&#10;+1 (555) 123-4567&#10;+1 (555) 987-6543&#10;+1 (555) 456-7890"
//                     value={bulkPhones}
//                     onChange={(e) => setBulkPhones(e.target.value)}
//                     rows={6}
//                     required
//                   />
//                   <p className="text-muted-foreground text-xs">
//                     Names will be auto-generated from phone numbers. You can
//                     edit them later.
//                   </p>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name *</Label>
//                   <Input
//                     id="name"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number *</Label>
//                   <Input
//                     id="phone"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     placeholder="+1 (555) 123-4567"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="email"
//                     className="flex items-center gap-1"
//                   >
//                     Email
//                     <Badge
//                       variant="secondary"
//                       className="text-xs"
//                     >
//                       Important
//                     </Badge>
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     placeholder="john@example.com"
//                   />
//                   <p className="text-muted-foreground text-xs">
//                     Email helps with notifications and digital invitations
//                   </p>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="plus-ones">Plus Ones</Label>
//                   <Input
//                     id="plus-ones"
//                     type="number"
//                     min="0"
//                     max="5"
//                     value={formData.plusOnes}
//                     onChange={(e) =>
//                       handleInputChange(
//                         "plusOnes",
//                         parseInt(e.target.value) || 0,
//                       )
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="dietary">Dietary Restrictions</Label>
//                 <Input
//                   id="dietary"
//                   value={formData.dietaryRestrictions}
//                   onChange={(e) =>
//                     handleInputChange("dietaryRestrictions", e.target.value)
//                   }
//                   placeholder="Vegetarian, Vegan, Gluten-free, etc."
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="notes">Notes</Label>
//                 <Textarea
//                   id="notes"
//                   value={formData.notes}
//                   onChange={(e) => handleInputChange("notes", e.target.value)}
//                   placeholder="Any additional notes about this guest..."
//                   rows={3}
//                 />
//               </div>
//             </>
//           )}

//           {/* Common fields for both modes */}
//           <div className="space-y-2">
//             <Label>Group</Label>
//             <div className="flex flex-wrap gap-2">
//               <Button
//                 type="button"
//                 variant={!formData.group ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleInputChange("group", "")}
//               >
//                 No Group
//               </Button>
//               {groups.map((group) => (
//                 <Button
//                   key={group.id}
//                   type="button"
//                   variant={formData.group === group.id ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handleInputChange("group", group.id)}
//                   className="flex items-center gap-2"
//                 >
//                   <div className={`h-2 w-2 rounded-full ${group.color}`} />
//                   {group.name}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//             >
//               Cancel
//             </Button>
//             <Button type="submit">
//               <Plus className="mr-2 h-4 w-4" />
//               Add Guest{bulkMode ? "s" : ""}
//             </Button>
//           </DialogFooter>
//         </form>

//         {/* Import Dialogs */}
//         <EmailContactImportDialog
//           isOpen={showEmailImport}
//           onClose={() => setShowEmailImport(false)}
//           onImport={handleEmailImport}
//         />

//         <PhoneContactImportDialog
//           isOpen={showPhoneImport}
//           onClose={() => setShowPhoneImport(false)}
//           onImport={handlePhoneImport}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };

// In AddGuestDialog
// const EmailContactImportDialog = ({
//   isOpen,
//   onClose,
//   onImport,
// }: EmailContactImportDialogProps) => {
//   const mockEmailProviders: EmailProvider[] = [
//     { id: "gmail", name: "Gmail", icon: "📧", isConnected: false },
//     { id: "outlook", name: "Outlook", icon: "📮", isConnected: false },
//     { id: "yahoo", name: "Yahoo Mail", icon: "📫", isConnected: false },
//     { id: "apple", name: "Apple Mail", icon: "✉️", isConnected: false },
//   ];
//   const [selectedProvider, setSelectedProvider] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [contacts, setContacts] = useState<EmailContact[]>([]);
//   const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
//     new Set(),
//   );
//   const [importStep, setImportStep] = useState<
//     "provider" | "select" | "success"
//   >("provider");

//   // Mock contacts data
//   const mockContacts: EmailContact[] = [
//     {
//       id: "1",
//       name: "John Smith",
//       email: "john.smith@example.com",
//       organization: "ABC Corp",
//     },
//     {
//       id: "2",
//       name: "Jane Doe",
//       email: "jane.doe@company.com",
//       organization: "XYZ Inc",
//     },
//     {
//       id: "3",
//       name: "Mike Johnson",
//       email: "mike.j@startup.co",
//       organization: "Startup Co",
//     },
//     { id: "4", name: "Sarah Wilson", email: "sarah.wilson@freelance.com" },
//     {
//       id: "5",
//       name: "David Brown",
//       email: "david.brown@agency.net",
//       organization: "Creative Agency",
//     },
//     {
//       id: "6",
//       name: "Lisa Chen",
//       email: "lisa.chen@tech.com",
//       organization: "Tech Solutions",
//     },
//     {
//       id: "7",
//       name: "Robert Taylor",
//       email: "robert.t@consulting.biz",
//       organization: "Business Consulting",
//     },
//     {
//       id: "8",
//       name: "Emma Davis",
//       email: "emma.davis@design.studio",
//       organization: "Design Studio",
//     },
//   ];

//   const filteredContacts = contacts.filter(
//     (contact) =>
//       contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (contact.organization &&
//         contact.organization.toLowerCase().includes(searchTerm.toLowerCase())),
//   );

//   const handleProviderSelect = async (providerId: string) => {
//     setSelectedProvider(providerId);
//     setIsLoading(true);

//     // Simulate OAuth flow and contact fetching
//     setTimeout(() => {
//       setContacts(mockContacts);
//       setIsLoading(false);
//       setImportStep("select");
//     }, 2000);
//   };

//   const handleContactToggle = (contactId: string) => {
//     const newSelected = new Set(selectedContacts);
//     if (newSelected.has(contactId)) {
//       newSelected.delete(contactId);
//     } else {
//       newSelected.add(contactId);
//     }
//     setSelectedContacts(newSelected);
//   };

//   const handleSelectAll = () => {
//     if (selectedContacts.size === filteredContacts.length) {
//       setSelectedContacts(new Set());
//     } else {
//       setSelectedContacts(new Set(filteredContacts.map((c) => c.id)));
//     }
//   };

//   const handleImport = () => {
//     const selectedEmails = contacts
//       .filter((contact) => selectedContacts.has(contact.id))
//       .map((contact) => contact.email);

//     onImport(selectedEmails);

//     // Reset state and show success
//     setImportStep("success");
//     setTimeout(() => {
//       onClose();
//       resetDialog();
//     }, 1500);
//   };

//   const resetDialog = () => {
//     setImportStep("provider");
//     setSelectedProvider("");
//     setContacts([]);
//     setSelectedContacts(new Set());
//     setSearchTerm("");
//     setIsLoading(false);
//   };

//   const handleClose = () => {
//     onClose();
//     resetDialog();
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={handleClose}
//     >
//       <DialogContent className="max-h-[80vh] sm:max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Mail className="h-5 w-5" />
//             Import Email Contacts
//           </DialogTitle>
//           <DialogDescription>
//             {importStep === "provider" &&
//               "Choose your email provider to import contacts"}
//             {importStep === "select" &&
//               "Select the contacts you want to add as guests"}
//             {importStep === "success" &&
//               "Successfully imported your selected contacts!"}
//           </DialogDescription>
//         </DialogHeader>

//         {importStep === "provider" && (
//           <div className="space-y-4">
//             {isLoading ? (
//               <div className="flex flex-col items-center justify-center space-y-4 py-8">
//                 <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
//                 <p className="text-muted-foreground text-sm">
//                   Connecting to {selectedProvider}...
//                 </p>
//                 <p className="text-muted-foreground text-xs">
//                   Fetching your contacts securely
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-3">
//                 {mockEmailProviders.map((provider) => (
//                   <Button
//                     key={provider.id}
//                     variant="outline"
//                     className="flex h-16 flex-col items-center gap-2"
//                     onClick={() => handleProviderSelect(provider.id)}
//                   >
//                     <span className="text-2xl">{provider.icon}</span>
//                     <span className="text-sm">{provider.name}</span>
//                   </Button>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {importStep === "select" && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Badge variant="secondary">
//                   <Users className="mr-1 h-3 w-3" />
//                   {contacts.length} contacts found
//                 </Badge>
//                 <Badge variant="outline">
//                   {selectedContacts.size} selected
//                 </Badge>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleSelectAll}
//               >
//                 {selectedContacts.size === filteredContacts.length
//                   ? "Deselect All"
//                   : "Select All"}
//               </Button>
//             </div>

//             <div className="relative">
//               <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
//               <Input
//                 placeholder="Search contacts..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9"
//               />
//             </div>

//             <ScrollArea className="h-64">
//               <div className="space-y-2">
//                 {filteredContacts.map((contact) => (
//                   <div
//                     key={contact.id}
//                     className="hover:bg-accent flex cursor-pointer items-center space-x-3 rounded-lg border p-3"
//                     onClick={() => handleContactToggle(contact.id)}
//                   >
//                     <Checkbox
//                       checked={selectedContacts.has(contact.id)}
//                       onCheckedChange={() => handleContactToggle(contact.id)}
//                     />
//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-center gap-2">
//                         <p className="truncate text-sm font-medium">
//                           {contact.name}
//                         </p>
//                         {contact.organization && (
//                           <Badge
//                             variant="outline"
//                             className="text-xs"
//                           >
//                             {contact.organization}
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-muted-foreground truncate text-sm">
//                         {contact.email}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </div>
//         )}

//         {importStep === "success" && (
//           <div className="flex flex-col items-center justify-center space-y-4 py-8">
//             <CheckCircle className="h-12 w-12 text-green-500" />
//             <p className="text-lg font-medium">
//               Contacts Imported Successfully!
//             </p>
//             <p className="text-muted-foreground text-sm">
//               {selectedContacts.size} contacts have been added to your guest
//               list
//             </p>
//           </div>
//         )}

//         <DialogFooter>
//           {importStep === "select" && (
//             <>
//               <Button
//                 variant="outline"
//                 onClick={() => setImportStep("provider")}
//               >
//                 Back
//               </Button>
//               <Button
//                 onClick={handleImport}
//                 disabled={selectedContacts.size === 0}
//               >
//                 <Download className="mr-2 h-4 w-4" />
//                 Import {selectedContacts.size} Contact
//                 {selectedContacts.size !== 1 ? "s" : ""}
//               </Button>
//             </>
//           )}
//           {importStep === "provider" && (
//             <Button
//               variant="outline"
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// In AddGuestDialog
// const PhoneContactImportDialog = ({
//   isOpen,
//   onClose,
//   onImport,
// }: PhoneContactImportDialogProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [contacts, setContacts] = useState<PhoneContact[]>([]);
//   const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
//     new Set(),
//   );
//   const [importStep, setImportStep] = useState<
//     "permission" | "select" | "success"
//   >("permission");

//   // Mock phone contacts data
//   const mockPhoneContacts: PhoneContact[] = [
//     {
//       id: "1",
//       name: "John Smith",
//       phoneNumbers: [
//         { number: "+1 (555) 123-4567", type: "mobile", isPrimary: true },
//         { number: "+1 (555) 123-4568", type: "work" },
//       ],
//       email: "john.smith@example.com",
//       organization: "ABC Corp",
//       isFavorite: true,
//     },
//     {
//       id: "2",
//       name: "Jane Doe",
//       phoneNumbers: [
//         { number: "+1 (555) 987-6543", type: "mobile", isPrimary: true },
//       ],
//       email: "jane.doe@company.com",
//       organization: "XYZ Inc",
//     },
//     {
//       id: "3",
//       name: "Mike Johnson",
//       phoneNumbers: [
//         { number: "+1 (555) 456-7890", type: "mobile", isPrimary: true },
//         { number: "+1 (555) 456-7891", type: "home" },
//       ],
//       isFavorite: true,
//     },
//     {
//       id: "4",
//       name: "Sarah Wilson",
//       phoneNumbers: [
//         { number: "+1 (555) 321-0987", type: "mobile", isPrimary: true },
//       ],
//       email: "sarah.wilson@freelance.com",
//     },
//     {
//       id: "5",
//       name: "David Brown",
//       phoneNumbers: [
//         { number: "+1 (555) 654-3210", type: "work", isPrimary: true },
//         { number: "+1 (555) 654-3211", type: "mobile" },
//       ],
//       organization: "Creative Agency",
//     },
//     {
//       id: "6",
//       name: "Lisa Chen",
//       phoneNumbers: [
//         { number: "+1 (555) 789-0123", type: "mobile", isPrimary: true },
//       ],
//       organization: "Tech Solutions",
//     },
//     {
//       id: "7",
//       name: "Mom",
//       phoneNumbers: [
//         { number: "+1 (555) 111-2222", type: "mobile", isPrimary: true },
//       ],
//       isFavorite: true,
//       group: "Family",
//     },
//     {
//       id: "8",
//       name: "Emma Davis",
//       phoneNumbers: [
//         { number: "+1 (555) 333-4444", type: "mobile", isPrimary: true },
//       ],
//       organization: "Design Studio",
//     },
//   ];

//   const filteredContacts = contacts.filter(
//     (contact) =>
//       contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       contact.phoneNumbers.some((phone) => phone.number.includes(searchTerm)) ||
//       (contact.organization &&
//         contact.organization.toLowerCase().includes(searchTerm.toLowerCase())),
//   );

//   const handleRequestAccess = async () => {
//     setIsLoading(true);

//     // Simulate permission request and contact fetching
//     setTimeout(() => {
//       setContacts(mockPhoneContacts);
//       setIsLoading(false);
//       setImportStep("select");
//     }, 2000);
//   };

//   const handleContactToggle = (contactId: string) => {
//     const newSelected = new Set(selectedContacts);
//     if (newSelected.has(contactId)) {
//       newSelected.delete(contactId);
//     } else {
//       newSelected.add(contactId);
//     }
//     setSelectedContacts(newSelected);
//   };

//   const handleSelectAll = () => {
//     if (selectedContacts.size === filteredContacts.length) {
//       setSelectedContacts(new Set());
//     } else {
//       setSelectedContacts(new Set(filteredContacts.map((c) => c.id)));
//     }
//   };

//   const getPhoneTypeIcon = (type: ContactPhone["type"]) => {
//     switch (type) {
//       case "mobile":
//         return <Smartphone className="h-3 w-3" />;
//       case "work":
//         return <Briefcase className="h-3 w-3" />;
//       case "home":
//         return <Home className="h-3 w-3" />;
//       default:
//         return <Phone className="h-3 w-3" />;
//     }
//   };

//   const handleImport = () => {
//     const selectedPhones = contacts
//       .filter((contact) => selectedContacts.has(contact.id))
//       .map(
//         (contact) =>
//           contact.phoneNumbers.find((p) => p.isPrimary)?.number ||
//           contact.phoneNumbers[0]?.number,
//       )
//       .filter(Boolean);

//     onImport(selectedPhones);

//     // Reset state and show success
//     setImportStep("success");
//     setTimeout(() => {
//       onClose();
//       resetDialog();
//     }, 1500);
//   };

//   const resetDialog = () => {
//     setImportStep("permission");
//     setContacts([]);
//     setSelectedContacts(new Set());
//     setSearchTerm("");
//     setIsLoading(false);
//   };

//   const handleClose = () => {
//     onClose();
//     resetDialog();
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={handleClose}
//     >
//       <DialogContent className="max-h-[80vh] sm:max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Phone className="h-5 w-5" />
//             Import Phone Contacts
//           </DialogTitle>
//           <DialogDescription>
//             {importStep === "permission" &&
//               "Access your phone contacts to import guest phone numbers"}
//             {importStep === "select" &&
//               "Select the contacts you want to add as guests"}
//             {importStep === "success" &&
//               "Successfully imported your selected contacts!"}
//           </DialogDescription>
//         </DialogHeader>

//         {importStep === "permission" && (
//           <div className="space-y-4">
//             {isLoading ? (
//               <div className="flex flex-col items-center justify-center space-y-4 py-8">
//                 <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
//                 <p className="text-muted-foreground text-sm">
//                   Accessing your contacts...
//                 </p>
//                 <p className="text-muted-foreground text-xs">
//                   This may take a moment
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4 text-center">
//                 <div className="flex justify-center">
//                   <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
//                     <Phone className="text-primary h-8 w-8" />
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="mb-2 font-medium">Access Phone Contacts</h3>
//                   <p className="text-muted-foreground mb-4 text-sm">
//                     We&apos;ll import your phone contacts so you can easily add
//                     guests to your event. Your contact data will be processed
//                     securely and not stored.
//                   </p>
//                 </div>
//                 <Button
//                   onClick={handleRequestAccess}
//                   className="w-full"
//                 >
//                   <Phone className="mr-2 h-4 w-4" />
//                   Access Phone Contacts
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {importStep === "select" && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Badge variant="secondary">
//                   <Phone className="mr-1 h-3 w-3" />
//                   {contacts.length} contacts found
//                 </Badge>
//                 <Badge variant="outline">
//                   {selectedContacts.size} selected
//                 </Badge>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleSelectAll}
//               >
//                 {selectedContacts.size === filteredContacts.length
//                   ? "Deselect All"
//                   : "Select All"}
//               </Button>
//             </div>

//             <div className="relative">
//               <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
//               <Input
//                 placeholder="Search contacts..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9"
//               />
//             </div>

//             <ScrollArea className="h-64">
//               <div className="space-y-2">
//                 {filteredContacts.map((contact) => (
//                   <div
//                     key={contact.id}
//                     className="hover:bg-accent flex cursor-pointer items-start space-x-3 rounded-lg border p-3"
//                     onClick={() => handleContactToggle(contact.id)}
//                   >
//                     <Checkbox
//                       checked={selectedContacts.has(contact.id)}
//                       onCheckedChange={() => handleContactToggle(contact.id)}
//                       className="mt-1"
//                     />
//                     <div className="min-w-0 flex-1">
//                       <div className="mb-1 flex items-center gap-2">
//                         <p className="truncate text-sm font-medium">
//                           {contact.name}
//                         </p>
//                         {contact.isFavorite && (
//                           <Heart className="h-3 w-3 fill-current text-red-500" />
//                         )}
//                         {contact.organization && (
//                           <Badge
//                             variant="outline"
//                             className="text-xs"
//                           >
//                             {contact.organization}
//                           </Badge>
//                         )}
//                         {contact.group && (
//                           <Badge
//                             variant="secondary"
//                             className="text-xs"
//                           >
//                             {contact.group}
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="space-y-1">
//                         {contact.phoneNumbers.map((phone, index) => (
//                           <div
//                             key={index}
//                             className="text-muted-foreground flex items-center gap-2 text-xs"
//                           >
//                             {getPhoneTypeIcon(phone.type)}
//                             <span>{phone.number}</span>
//                             {phone.isPrimary && (
//                               <Badge
//                                 variant="outline"
//                                 className="text-xs"
//                               >
//                                 Primary
//                               </Badge>
//                             )}
//                             <span className="capitalize">({phone.type})</span>
//                           </div>
//                         ))}
//                         {contact.email && (
//                           <p className="text-muted-foreground text-xs">
//                             {contact.email}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </div>
//         )}

//         {importStep === "success" && (
//           <div className="flex flex-col items-center justify-center space-y-4 py-8">
//             <CheckCircle className="h-12 w-12 text-green-500" />
//             <p className="text-lg font-medium">
//               Contacts Imported Successfully!
//             </p>
//             <p className="text-muted-foreground text-sm">
//               {selectedContacts.size} contacts have been added to your guest
//               list
//             </p>
//           </div>
//         )}

//         <DialogFooter>
//           {importStep === "select" && (
//             <>
//               <Button
//                 variant="outline"
//                 onClick={() => setImportStep("permission")}
//               >
//                 Back
//               </Button>
//               <Button
//                 onClick={handleImport}
//                 disabled={selectedContacts.size === 0}
//               >
//                 <Download className="mr-2 h-4 w-4" />
//                 Import {selectedContacts.size} Contact
//                 {selectedContacts.size !== 1 ? "s" : ""}
//               </Button>
//             </>
//           )}
//           {importStep === "permission" && (
//             <Button
//               variant="outline"
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// In RSVPModule
// const GroupManagementDialog = ({
//   isOpen,
//   onClose,
//   groups,
//   onUpdateGroups,
// }: GroupManagementDialogProps) => {
//   const [editingGroup, setEditingGroup] = useState<RSVPGroup | null>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     color: "bg-blue-500",
//     memberLimit: "",
//   });

//   const colorOptions = [
//     { value: "bg-red-500", label: "Red" },
//     { value: "bg-blue-500", label: "Blue" },
//     { value: "bg-green-500", label: "Green" },
//     { value: "bg-purple-500", label: "Purple" },
//     { value: "bg-yellow-500", label: "Yellow" },
//     { value: "bg-pink-500", label: "Pink" },
//     { value: "bg-indigo-500", label: "Indigo" },
//     { value: "bg-orange-500", label: "Orange" },
//   ];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name.trim()) return;

//     const newGroup: RSVPGroup = {
//       id: editingGroup?.id || Date.now().toString(),
//       name: formData.name,
//       description: formData.description,
//       color: formData.color,
//       memberLimit: formData.memberLimit
//         ? parseInt(formData.memberLimit)
//         : undefined,
//       guestCount: editingGroup?.guestCount ?? 0,
//     };

//     if (editingGroup) {
//       onUpdateGroups(
//         groups.map((g) => (g.id === editingGroup.id ? newGroup : g)),
//       );
//     } else {
//       onUpdateGroups([...groups, newGroup]);
//     }

//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       color: "bg-blue-500",
//       memberLimit: "",
//     });
//     setEditingGroup(null);
//   };

//   const handleEdit = (group: RSVPGroup) => {
//     setEditingGroup(group);
//     setFormData({
//       name: group.name,
//       description: group.description || "",
//       color: group.color,
//       memberLimit: group.memberLimit?.toString() || "",
//     });
//   };

//   const handleDelete = (groupId: string) => {
//     onUpdateGroups(groups.filter((g) => g.id !== groupId));
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={onClose}
//     >
//       <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Manage Guest Groups</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Add/Edit Form */}
//           <form
//             onSubmit={handleSubmit}
//             className="dark:bg-secondary space-y-4 rounded-lg bg-gray-50 p-4"
//           >
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="group-name">Group Name *</Label>
//                 <Input
//                   id="group-name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, name: e.target.value }))
//                   }
//                   placeholder="e.g., VIP Guests, Family, Friends"
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="member-limit">Member Limit (optional)</Label>
//                 <Input
//                   id="member-limit"
//                   type="number"
//                   value={formData.memberLimit}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       memberLimit: e.target.value,
//                     }))
//                   }
//                   placeholder="No limit"
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     description: e.target.value,
//                   }))
//                 }
//                 placeholder="Brief description of this group"
//                 rows={2}
//               />
//             </div>

//             <div>
//               <Label>Group Color</Label>
//               <div className="mt-2 flex gap-2">
//                 {colorOptions.map((color) => (
//                   <button
//                     key={color.value}
//                     type="button"
//                     onClick={() =>
//                       setFormData((prev) => ({ ...prev, color: color.value }))
//                     }
//                     className={`h-8 w-8 rounded-full ${color.value} ${
//                       formData.color === color.value
//                         ? "ring-2 ring-gray-900 ring-offset-2"
//                         : ""
//                     }`}
//                     title={color.label}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <Button type="submit">
//                 {editingGroup ? "Update Group" : "Add Group"}
//               </Button>
//               {editingGroup && (
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={resetForm}
//                 >
//                   Cancel
//                 </Button>
//               )}
//             </div>
//           </form>

//           {/* Existing Groups */}
//           <div className="space-y-3">
//             <h4 className="font-medium">Existing Groups ({groups.length})</h4>
//             {groups.length === 0 ? (
//               <p className="py-4 text-center text-gray-500">
//                 No groups created yet
//               </p>
//             ) : (
//               <div className="space-y-2">
//                 {groups.map((group) => (
//                   <div
//                     key={group.id}
//                     className="flex items-center justify-between rounded-lg border p-3"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className={`h-4 w-4 rounded-full ${group.color}`} />
//                       <div>
//                         <div className="font-medium">{group.name}</div>
//                         {group.description && (
//                           <div className="text-sm text-gray-600">
//                             {group.description}
//                           </div>
//                         )}
//                         {group.memberLimit && (
//                           <Badge
//                             variant="secondary"
//                             className="text-xs"
//                           >
//                             Limit: {group.memberLimit}
//                           </Badge>
//                         )}
//                         {group.guestCount !== undefined && (
//                           <Badge
//                             variant="outline"
//                             className="ml-2 text-xs"
//                           >
//                             {group.guestCount} members
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex gap-1">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleEdit(group)}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleDelete(group.id)}
//                         className="text-red-600"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
