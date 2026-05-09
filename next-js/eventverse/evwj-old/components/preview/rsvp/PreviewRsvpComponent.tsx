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
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	rectIntersection,
	useDraggable,
	useDroppable,
	useSensor,
	useSensors,
	type DragEndEvent,
	type DragOverEvent,
	type DragStartEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";
import {
	ArrowLeft,
	Briefcase,
	Calendar as CalendarIcon,
	Check,
	CheckCircle,
	CheckSquare,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Clock,
	Download,
	Edit,
	Eye,
	EyeOff,
	FileText,
	Gift,
	Grip,
	GripVertical,
	Heart,
	HelpCircle,
	Home,
	Link2,
	Mail,
	MapPin,
	MessageSquare,
	Music,
	Phone,
	Plus,
	Search,
	Send,
	Settings,
	Shield,
	Smartphone,
	Trash2,
	User,
	UserPlus,
	Users,
	Utensils,
	UtensilsCrossed,
	X,
	XCircle,
} from "lucide-react";
import { ElementType, useEffect, useMemo, useState } from "react";

interface RSVPGroup {
	id: string;
	name: string;
	description?: string;
	color: string;
	memberLimit?: number;
	guestCount: number;
	plusOneLimit?: number; // Group-specific plus one limits
}

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

interface CustomField {
	id: string;
	label: string;
	type:
		| "text"
		| "dropdown"
		| "checkbox"
		| "radio"
		| "textarea"
		| "custom"
		| "food";
	required: boolean;
	options?: string[];
	placeholder?: string;
	icon?: ElementType;
	description?: string;
}

interface FoodChoice {
	id: string;
	name: string;
	description?: string;
	dietary: string[];
	price?: number;
	category: "appetizer" | "main" | "dessert" | "beverage";
	config?: {
		choices?: FoodChoice[];
	};
}

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

interface RSVPFormProps {
	event: MockEvent;
	groups: RSVPGroup[];
	customFields?: CustomField[];
	foodChoices?: FoodChoice[];
	settings?: Partial<RSVPSettings & RSVPSettingsProps>;
	onBack: () => void;
	isPreview?: boolean;
}

interface PredefinedField {
	id?: string;
	icon?: ElementType;
	label?: string;
	required?: boolean;
	description?: string;
	type?: string;
	config?: {
		choices?: FoodChoice[];
	};
}

interface FormFieldLibraryProps {
	predefinedFields: PredefinedField[];
	customFields: CustomField[];
	onUpdateCustomFields: (fields: CustomField[]) => void;
	formFields: FormField[]; // To filter out already added fields
	onAddField?: (fieldData: FormField, insertIndex?: number) => void;
}

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

interface AddGuestDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onAddGuest: (guest: Partial<Guest>) => void;
	groups: RSVPGroup[];
	settings?: Partial<RSVPSettings & RSVPSettingsProps>;
}

interface GroupManagementDialogProps {
	isOpen: boolean;
	onClose: () => void;
	groups: RSVPGroup[];
	onUpdateGroups: (groups: RSVPGroup[]) => void;
	initialGroup?: RSVPGroup | null;
}

interface FormField {
	id: string;
	type: "predefined" | "custom" | "food";
	fieldType: string;
	label: string;
	required: boolean;
	order: number;
	// config?: unkown;
	config?: {
		choices?: FoodChoice[];
		placeholder?: string;
		options?: [];
	};
}

interface RSVPFormBuilderProps {
	customFields: CustomField[];
	onUpdateCustomFields: (fields: CustomField[]) => void;
	foodChoices: FoodChoice[];
	onUpdateFoodChoices: (choices: FoodChoice[]) => void;
	settings: RSVPSettingsProps;
	onUpdateSettings: (
		settings: Partial<RSVPSettings & RSVPSettingsProps>,
	) => void;
	groups: RSVPGroup[];
	event: MockEvent;
}

interface CustomFieldsManagerProps {
	fields: CustomField[];
	onUpdate: (fields: CustomField[]) => void;
}

interface FormCanvasProps {
	formFields: FormField[];
	onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
	onRemoveField: (fieldId: string) => void;
	settings: RSVPSettingsProps;
	groups: RSVPGroup[];
}

interface FormBuilderDndContextProps {
	predefinedFields: PredefinedField[];
	customFields: CustomField[];
	onUpdateCustomFields: (fields: CustomField[]) => void;
	formFields: FormField[];
	onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
	onRemoveField: (fieldId: string) => void;
	onReorderFields: (draggedId: string, targetId: string) => void;
	onAddField: (field: FormField, insertIndex?: number) => void;
	settings: RSVPSettingsProps;
	groups: RSVPGroup[];
}

interface FormPreviewProps {
	formFields: FormField[];
	customFields: CustomField[];
	foodChoices: FoodChoice[];
	settings: Partial<RSVPSettings & RSVPSettingsProps>;
	groups: RSVPGroup[];
	event: MockEvent;
}

interface EmailContactImportDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onImport: (contacts: string[]) => void;
}

interface EmailProvider {
	id: string;
	name: string;
	icon: string;
	authUrl?: string;
	isConnected?: boolean;
}

interface EmailContact {
	id: string;
	name: string;
	email: string;
	displayName?: string;
	organization?: string;
	profilePhoto?: string;
}

interface PhoneContactImportDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onImport: (contacts: string[]) => void;
}

interface ContactPhone {
	number: string;
	type: "mobile" | "work" | "home" | "other";
	isPrimary?: boolean;
}

interface PhoneContact {
	id: string;
	name: string;
	phoneNumbers: ContactPhone[];
	email?: string;
	organization?: string;
	profilePhoto?: string;
	isFavorite?: boolean;
	group?: string;
}

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
	const mockEvent: MockEvent = {
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
	return (
		<div className="flex flex-col">
			{/*  */}

			{/* Module Content */}
			<RSVPModule event={mockEvent} />

			{/*  */}
		</div>
	);
}

// In PreviewRsvpComponent
const RSVPModule = ({ event }: { event: MockEvent }) => {
	//
	const [activeView, setActiveView] = useState<RsvpTab>("dashboard");
	const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
	const [isGroupManagementOpen, setIsGroupManagementOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState<string>("all");
	const [filterGroup, setFilterGroup] = useState<string>("all");
	const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
	const [editingGroup, setEditingGroup] = useState<string>("");
	const [editingStatus, setEditingStatus] = useState<string>("");
	const [groupToEdit, setGroupToEdit] = useState<RSVPGroup | null>(null);
	const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	// Enhanced state management
	// const [rsvpSettings, setRsvpSettings] = useState<RSVPSettings>({
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

	const [customFields, setCustomFields] = useState<CustomField[]>([]);
	const [foodChoices, setFoodChoices] = useState<FoodChoice[]>([]);

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

	const [groups, setGroups] = useState<RSVPGroup[]>([
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

	// Calculate guest counts for groups
	const groupsWithCounts = groups.map((group) => ({
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

	// Pagination calculations
	const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedGuests = filteredGuests.slice(startIndex, endIndex);

	// Select all functionality
	const allSelected = useMemo(() => {
		return (
			paginatedGuests.length > 0 &&
			paginatedGuests.every((guest) => selectedGuests.has(guest.id!))
		);
	}, [paginatedGuests, selectedGuests]);

	const handleSelectAll = () => {
		if (allSelected) {
			// Deselect all on current page
			const newSelected = new Set(selectedGuests);
			paginatedGuests.forEach((guest) => {
				if (guest.id) newSelected.delete(guest.id);
			});
			setSelectedGuests(newSelected);
		} else {
			// Select all on current page
			const newSelected = new Set(selectedGuests);
			paginatedGuests.forEach((guest) => {
				if (guest.id) newSelected.add(guest.id);
			});
			setSelectedGuests(newSelected);
		}
	};

	const handleSelectGuest = (guestId: string) => {
		const newSelected = new Set(selectedGuests);
		if (newSelected.has(guestId)) {
			newSelected.delete(guestId);
		} else {
			newSelected.add(guestId);
		}
		setSelectedGuests(newSelected);
	};

	const handleSendInvitation = () => {
		// TODO: Implement send invitation logic
		console.log("Sending invitations to:", Array.from(selectedGuests));
		// For now, just show a toast or alert
		alert(`Sending invitations to ${selectedGuests.size} guest(s)`);
	};

	// Reset to page 1 when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, filterStatus, filterGroup, itemsPerPage]);

	const handleEditGuest = (guestId: string) => {
		const guest = guests.find((g) => g.id === guestId);
		if (guest) {
			setEditingGuestId(guestId);
			setEditingGroup(guest.group || "none");
			setEditingStatus(guest.status || "pending");
		}
	};

	const handleSaveGuest = (guestId: string) => {
		setGuests((prevGuests) =>
			prevGuests.map((guest) =>
				guest.id === guestId
					? {
							...guest,
							group:
								editingGroup === "none" ? undefined : editingGroup || undefined,
							status: editingStatus as
								| "pending"
								| "attending"
								| "declined"
								| "maybe",
						}
					: guest,
			),
		);
		setEditingGuestId(null);
		setEditingGroup("");
		setEditingStatus("");
	};

	const handleCancelEdit = () => {
		setEditingGuestId(null);
		setEditingGroup("");
		setEditingStatus("");
	};

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

	const addGuest = (guestData: Partial<Guest>) => {
		const newGuest = {
			...guestData,
			id: Date.now().toString(),
			invitedDate: new Date(),
		};
		setGuests([...guests, newGuest]);
	};

	if (activeView === "form") {
		return (
			<>
				<RSVPForm
					event={event}
					groups={groups}
					customFields={customFields}
					foodChoices={foodChoices}
					settings={rsvpSettings}
					onBack={() => setActiveView("dashboard")}
				/>
			</>
		);
	}

	const rsvpTabs = [
		{ value: "dashboard", label: "Dashboard" },
		{ value: "builder", label: "Form Builder" },
		{ value: "groups", label: "Groups" },
		{ value: "guests", label: "Guest List" },
		{ value: "settings", label: "Settings" },
	];

	return (
		<div className="">
			<Tabs
				value={activeView}
				onValueChange={(value) => setActiveView(value as RsvpTab)}
				className="space-y-6"
			>
				{/* Mobile/Tablet: Dropdown Select */}
				<div className="lg:hidden mb-4">
					<Select value={activeView} onValueChange={(value) => setActiveView(value as RsvpTab)}>
						<SelectTrigger className="w-fit min-w-[200px] !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] border border-gray-200 dark:border-gray-700 h-11">
							<SelectValue>
								{(() => {
									const currentTab = rsvpTabs.find((tab) => tab.value === activeView);
									if (!currentTab) return null;
									return (
										<span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
											{currentTab.label}
										</span>
									);
								})()}
							</SelectValue>
						</SelectTrigger>
						<SelectContent className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
							{rsvpTabs.map((tab) => (
								<SelectItem key={tab.value} value={tab.value}>
									{tab.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Desktop: Tab List */}
				<TabsList className="hidden lg:grid w-full grid-cols-5 !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
					<TabsTrigger
						value="dashboard"
						className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Dashboard
					</TabsTrigger>
					<TabsTrigger
						value="builder"
						className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Form Builder
					</TabsTrigger>
					<TabsTrigger
						value="groups"
						className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Groups
					</TabsTrigger>
					<TabsTrigger
						value="guests"
						className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Guest List
					</TabsTrigger>
					<TabsTrigger
						value="settings"
						className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Settings
					</TabsTrigger>
				</TabsList>

				<TabsContent value="dashboard" className="space-y-6">
					{/* Enhanced Stats Cards */}
					<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
						<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
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
						<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
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
						<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
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
						<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
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
						<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
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
					<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
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
											className="animate-fade-in group flex items-center gap-4 rounded-xl border bg-linear-to-r from-background/80 to-muted/20 p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 dark:bg-[#020617]"
											style={{ animationDelay: `${index * 100}ms` }}
										>
											<div className="shrink-0">
												<div className="relative">
													<Avatar className="border-background h-12 w-12 border-2">
														<AvatarImage src={guest.avatar} alt={guest.name} />
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
					<RSVPFormBuilder
						customFields={customFields}
						onUpdateCustomFields={setCustomFields}
						foodChoices={foodChoices}
						onUpdateFoodChoices={setFoodChoices}
						settings={rsvpSettings}
						onUpdateSettings={setRsvpSettings}
						groups={groups}
						event={event}
					/>
				</TabsContent>

				<TabsContent value="groups" className="space-y-4">
					<div>
						<h3 className="text-lg font-semibold">Manage Guest Groups</h3>
						<p className="text-sm">
							Organize your guests into different categories
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{/* Add New Group Card - Always First */}
						<Card
							className="cursor-pointer border-2 border-dashed border-gray-300 !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm transition-colors hover:border-gray-400 dark:border-slate-600 dark:!bg-[#020617] dark:[background-color:#020617] dark:hover:border-slate-500"
							onClick={() => setIsGroupManagementOpen(true)}
						>
							<CardContent className="flex h-full flex-col items-center justify-center p-6">
								<UserPlus className="mb-2 h-8 w-8 text-gray-400 dark:text-slate-500" />
								<span className="text-sm text-gray-600 dark:text-slate-400">
									Add New Group
								</span>
							</CardContent>
						</Card>

						{groupsWithCounts.map((group) => {
							const groupStats = getGroupStats(group.id);
							return (
								<Card
									key={group.id}
									className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
								>
									<CardHeader className="relative">
										<div className="flex items-center gap-3">
											<div className={`h-4 w-4 rounded-full ${group.color}`} />
											<CardTitle className="text-lg dark:text-slate-200">
												{group.name}
											</CardTitle>
										</div>
										<CardDescription className="dark:text-slate-400">
											{group.description}
										</CardDescription>
										{/* Edit and Delete Buttons */}
										<div className="absolute top-4 right-4 flex gap-1">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => {
													setGroupToEdit(group);
													setIsGroupManagementOpen(true);
												}}
												className="h-8 w-8 p-0"
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => {
													setGroups(groups.filter((g) => g.id !== group.id));
												}}
												className="h-8 w-8 p-0 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div className="flex justify-between">
													<span className="text-gray-600 dark:text-slate-400">
														Total Invited:
													</span>
													<span className="font-medium dark:text-slate-200">
														{groupStats.total}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600 dark:text-slate-400">
														Attending:
													</span>
													<span className="font-medium text-green-600 dark:text-green-400">
														{groupStats.attending}
													</span>
												</div>
												{group.memberLimit && (
													<div className="col-span-2 flex justify-between">
														<span className="text-gray-600 dark:text-slate-400">
															Limit:
														</span>
														<span className="font-medium dark:text-slate-200">
															{group.memberLimit}
														</span>
													</div>
												)}
											</div>

											{group.memberLimit && (
												<div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-700">
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
													groupId={group.id}
													groupName={group.name}
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</TabsContent>

				<TabsContent value="guests" className="space-y-4">
					{/* Enhanced Search and Filters */}
					<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
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
										{groups.map((group) => (
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

					{/* Send Invitation and Add Guest Buttons */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-600 dark:text-slate-400">
								{selectedGuests.size > 0 &&
									`${selectedGuests.size} guest(s) selected`}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Button
								onClick={() => setIsAddGuestOpen(true)}
								variant="outline"
								className="flex transform items-center justify-center space-x-2 rounded-xl px-6 py-2.5 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
							>
								<UserPlus className="h-4 w-4" />
								<span>Add Guest</span>
							</Button>
							<Button
								onClick={handleSendInvitation}
								disabled={selectedGuests.size === 0}
								className={cn(
									"flex transform items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl",
									selectedGuests.size === 0 && "cursor-not-allowed opacity-50",
								)}
							>
								<Send className="h-4 w-4" />
								<span>Send Invitation</span>
							</Button>
						</div>
					</div>

					{/* Guest Table */}
					<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-12">
											<Checkbox
												checked={allSelected}
												onCheckedChange={handleSelectAll}
											/>
										</TableHead>
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
									{paginatedGuests.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={8}
												className="py-8 text-center text-gray-500 dark:text-slate-400"
											>
												No guests found
											</TableCell>
										</TableRow>
									) : (
										paginatedGuests.map((guest) => (
											<TableRow key={guest.id}>
												<TableCell>
													<Checkbox
														checked={selectedGuests.has(guest.id!)}
														onCheckedChange={() => handleSelectGuest(guest.id!)}
													/>
												</TableCell>
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
													{editingGuestId === guest.id ? (
														<Select
															value={editingGroup}
															onValueChange={setEditingGroup}
														>
															<SelectTrigger className="w-[180px]">
																<SelectValue placeholder="Select group" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="none">None</SelectItem>
																{groups.map((group) => (
																	<SelectItem key={group.id} value={group.id}>
																		<div className="flex items-center gap-2">
																			<div
																				className={`h-2 w-2 rounded-full ${group.color}`}
																			/>
																			<span>{group.name}</span>
																		</div>
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													) : (
														guest.group && (
															<Badge
																variant="outline"
																className="flex items-center gap-1"
															>
																<div
																	className={`h-2 w-2 rounded-full ${groups.find((g) => g.id === guest.group)?.color}`}
																/>
																{groups.find((g) => g.id === guest.group)?.name}
															</Badge>
														)
													)}
												</TableCell>
												<TableCell>
													{editingGuestId === guest.id ? (
														<Select
															value={editingStatus}
															onValueChange={setEditingStatus}
														>
															<SelectTrigger className="w-[180px]">
																<SelectValue placeholder="Select status" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="pending">Pending</SelectItem>
																<SelectItem value="attending">
																	Attending
																</SelectItem>
																<SelectItem value="declined">
																	Declined
																</SelectItem>
																<SelectItem value="maybe">Maybe</SelectItem>
															</SelectContent>
														</Select>
													) : (
														<div className="flex items-center gap-2">
															{getStatusIcon(guest?.status ?? "")}
															<Badge
																className={getStatusColor(guest?.status ?? "")}
															>
																{guest.status}
															</Badge>
														</div>
													)}
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
														{editingGuestId === guest.id ? (
															<>
																<Button
																	variant="ghost"
																	size="sm"
																	onClick={() => handleSaveGuest(guest.id!)}
																	className="text-green-600 hover:text-green-700"
																>
																	<Check className="h-4 w-4" />
																</Button>
																<Button
																	variant="ghost"
																	size="sm"
																	onClick={handleCancelEdit}
																	className="text-red-600 hover:text-red-700"
																>
																	<X className="h-4 w-4" />
																</Button>
															</>
														) : (
															<>
																<Button
																	variant="ghost"
																	size="sm"
																	onClick={() => handleEditGuest(guest.id!)}
																>
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
															</>
														)}
													</div>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					{/* Pagination */}
					{filteredGuests.length > 0 && (
						<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
							<CardContent className="p-4">
								<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-600 dark:text-slate-400">
											Items per page:
										</span>
										<select
											value={itemsPerPage}
											onChange={(e) => {
												setItemsPerPage(Number(e.target.value));
												setCurrentPage(1);
											}}
											className="dark:bg-background rounded-md border px-3 py-1.5 text-sm"
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={30}>30</option>
											<option value={40}>40</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-600 dark:text-slate-400">
											Showing {startIndex + 1} -{" "}
											{Math.min(endIndex, filteredGuests.length)} of{" "}
											{filteredGuests.length}
										</span>
										<div className="flex items-center gap-1">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													setCurrentPage((prev) => Math.max(1, prev - 1))
												}
												disabled={currentPage === 1}
											>
												<ChevronLeft className="h-4 w-4" />
											</Button>
											<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
												Page {currentPage} of {totalPages}
											</span>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													setCurrentPage((prev) =>
														Math.min(totalPages, prev + 1),
													)
												}
												disabled={currentPage === totalPages}
											>
												<ChevronRight className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value="settings" className="space-y-4">
					<RSVPSettings settings={rsvpSettings} onUpdate={setRsvpSettings} />
				</TabsContent>
			</Tabs>

			<AddGuestDialog
				isOpen={isAddGuestOpen}
				onClose={() => setIsAddGuestOpen(false)}
				onAddGuest={addGuest}
				groups={groups}
				settings={rsvpSettings}
			/>

			<GroupManagementDialog
				isOpen={isGroupManagementOpen}
				onClose={() => {
					setIsGroupManagementOpen(false);
					setGroupToEdit(null);
				}}
				groups={groupsWithCounts}
				onUpdateGroups={setGroups}
				initialGroup={groupToEdit}
			/>
		</div>
	);
};

// In RSVPModule
const RSVPForm = ({
	event,
	groups,
	customFields = [],
	foodChoices = [],
	settings,
	onBack,
	isPreview = false,
}: RSVPFormProps) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		guestName: "",
		email: "",
		phone: "",
		response: "",
		selectedGroup: "",
		plusOnes: 0,
		plusOneNames: [] as string[],
		dietaryRestrictions: "",
		accommodations: "",
		mealChoice: "",
		songRequests: "",
		specialMessage: "",
		newsletter: false,
		transportation: "",
		customResponses: {} as Record<string, string | string[]>,
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleCustomFieldChange = (
		fieldId: string,
		value: string | string[],
	) => {
		setFormData((prev) => ({
			...prev,
			customResponses: {
				...prev.customResponses,
				[fieldId]: value,
			},
		}));
	};

	const handlePlusOneNameChange = (index: number, name: string) => {
		const newNames = [...formData.plusOneNames];
		newNames[index] = name;
		setFormData((prev) => ({ ...prev, plusOneNames: newNames }));
	};

	const handleSubmit = () => {
		if (isPreview) {
			alert("This is a preview - form submission is disabled");
			return;
		}
		console.log("RSVP submitted:", formData);
		setIsSubmitted(true);
	};

	const formatEventDate = (date: Date) => {
		if (!date) return "Date TBD";

		try {
			if (date instanceof Date) {
				return format(date, "MMMM d, yyyy");
			}
			if (typeof date === "string") {
				return format(new Date(date), "MMMM d, yyyy");
			}
			return "Date TBD";
		} catch (error) {
			console.error("Error formatting date:", error);
			return "Date TBD";
		}
	};

	const renderCustomField = (field: CustomField) => {
		const value = formData.customResponses[field.id] || "";

		switch (field.type) {
			case "text":
				return (
					<Input
						value={value}
						onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
						placeholder={
							field.placeholder || `Enter ${field.label.toLowerCase()}`
						}
						required={field.required}
					/>
				);

			case "textarea":
				return (
					<Textarea
						value={value}
						onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
						placeholder={
							field.placeholder || `Enter ${field.label.toLowerCase()}`
						}
						required={field.required}
						rows={3}
					/>
				);

			case "dropdown":
				return (
					<Select
						value={String(value)}
						onValueChange={(val) => handleCustomFieldChange(field.id, val)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select an option" />
						</SelectTrigger>
						<SelectContent>
							{field.options?.map((option, index) => (
								<SelectItem key={index} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);

			case "radio":
				return (
					<RadioGroup
						value={String(value)}
						onValueChange={(val) => handleCustomFieldChange(field.id, val)}
					>
						{field.options?.map((option, index) => (
							<div key={index} className="flex items-center space-x-2">
								<RadioGroupItem value={option} id={`${field.id}-${index}`} />
								<Label htmlFor={`${field.id}-${index}`}>{option}</Label>
							</div>
						))}
					</RadioGroup>
				);

			case "checkbox":
				const checkboxValues: string[] = Array.isArray(value) ? value : [];
				return (
					<div className="space-y-2">
						{field.options?.map((option, index) => (
							<div key={index} className="flex items-center space-x-2">
								<Checkbox
									checked={checkboxValues.includes(option)}
									onCheckedChange={(checked) => {
										const newValues = checked
											? [...checkboxValues, option]
											: checkboxValues.filter((v) => v !== option);
										handleCustomFieldChange(field.id, newValues);
									}}
									id={`${field.id}-${index}`}
								/>
								<Label htmlFor={`${field.id}-${index}`}>{option}</Label>
							</div>
						))}
					</div>
				);

			default:
				return (
					<Input
						value={value}
						onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
						placeholder={
							field.placeholder || `Enter ${field.label.toLowerCase()}`
						}
						required={field.required}
					/>
				);
		}
	};

	if (isSubmitted) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
				<Card className="w-full max-w-md !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
					<CardContent className="p-8 text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
							<Check className="h-8 w-8 text-white" />
						</div>
						<h2 className="mb-2 text-2xl font-bold text-gray-900">
							RSVP Submitted!
						</h2>
						<p className="mb-6 text-gray-600">
							Thank you for your response. We have sent a confirmation to your
							email.
						</p>
						<Button onClick={onBack} className="w-full">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Dashboard
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen ${isPreview ? "" : "bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900"}`}
		>
			{/* Header */}
			{!isPreview && (
				<div className="sticky top-0 z-10 w-full border-b border-white/20 bg-white/10 backdrop-blur-sm">
					<div className="w-full px-4 py-3 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
						<div className="flex items-center gap-3">
							<Button
								variant="ghost"
								size="sm"
								onClick={onBack}
								className="p-2 text-white hover:bg-white/10"
							>
								<ArrowLeft className="h-4 w-4" />
							</Button>
							<div>
								<h1 className="text-lg font-bold text-white">
									RSVP Form Preview
								</h1>
								<p className="text-sm text-purple-100">{event.eventName}</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="container mx-auto max-w-2xl px-4 py-8">
				{/* Event Info Card */}
				<Card className="mb-6 !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl text-gray-900 dark:text-white">
							{event.eventName}
						</CardTitle>
						<CardDescription className="text-lg">
							You&apos;re Invited!
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="flex items-center gap-3">
								<CalendarIcon className="h-5 w-5 text-purple-600" />
								<div>
									<div className="font-medium">
										{formatEventDate(event.startDate)}
									</div>
									{event.time && (
										<div className="text-sm text-gray-500">at {event.time}</div>
									)}
								</div>
							</div>
							<div className="flex items-center gap-3">
								<MapPin className="h-5 w-5 text-purple-600" />
								<div>
									<div className="font-medium">
										{event.locations?.[0]?.name || "Venue TBD"}
									</div>
									<div className="text-sm text-gray-500">
										{event.locations?.[0]?.address || "Address TBD"}
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* RSVP Form */}
				<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
					<CardHeader>
						<CardTitle>
							Please Respond by{" "}
							{settings?.deadline
								? format(settings.deadline, "MMMM d, yyyy")
								: "[Date]"}
						</CardTitle>
						<CardDescription>
							We&apos;re excited to celebrate with you! Please let us know if
							you can attend.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Step 1: Basic Info */}
						{step === 1 && (
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="guest-name">Full Name *</Label>
										<Input
											id="guest-name"
											value={formData.guestName}
											onChange={(e) =>
												handleInputChange("guestName", e.target.value)
											}
											placeholder="Your full name"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email Address *</Label>
										<Input
											id="email"
											type="email"
											value={formData.email}
											onChange={(e) =>
												handleInputChange("email", e.target.value)
											}
											placeholder="your@email.com"
											required
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input
										id="phone"
										value={formData.phone}
										onChange={(e) => handleInputChange("phone", e.target.value)}
										placeholder="+1 (555) 123-4567"
									/>
								</div>

								{/* Group Selection */}
								{groups.length > 0 && (
									<div className="space-y-2">
										<Label htmlFor="group">Which group do you belong to?</Label>
										<Select
											value={formData.selectedGroup}
											onValueChange={(value) =>
												handleInputChange("selectedGroup", value)
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select your group (optional)" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="none">
													Prefer not to specify
												</SelectItem>
												{groups.map((group) => (
													<SelectItem key={group.id} value={group.id}>
														<div className="flex items-center gap-2">
															<div
																className={`h-3 w-3 rounded-full ${group.color}`}
															/>
															<span>{group.name}</span>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								)}

								<div className="space-y-3">
									<Label>Will you be attending?</Label>
									<RadioGroup
										value={formData.response}
										onValueChange={(value) =>
											handleInputChange("response", value)
										}
									>
										<div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50">
											<RadioGroupItem value="attending" id="attending" />
											<Label
												htmlFor="attending"
												className="flex cursor-pointer items-center gap-2"
											>
												<Check className="h-4 w-4 text-green-600" />
												Yes, I&apos;ll be there!
											</Label>
										</div>
										{settings?.responseOptions === "yes-no-maybe" && (
											<div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50">
												<RadioGroupItem value="maybe" id="maybe" />
												<Label
													htmlFor="maybe"
													className="flex cursor-pointer items-center gap-2"
												>
													<Clock className="h-4 w-4 text-yellow-600" />
													Maybe - I am not sure yet
												</Label>
											</div>
										)}
										<div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50">
											<RadioGroupItem value="declined" id="declined" />
											<Label
												htmlFor="declined"
												className="flex cursor-pointer items-center gap-2"
											>
												<X className="h-4 w-4 text-red-600" />
												Sorry, I can&apos;t make it
											</Label>
										</div>
									</RadioGroup>
								</div>

								{formData.response === "attending" &&
									settings?.allowPlusOnes && (
										<div className="space-y-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
											<div className="space-y-2">
												<Label htmlFor="plus-ones">
													How many guests will you bring?
												</Label>
												<select
													id="plus-ones"
													value={formData.plusOnes}
													onChange={(e) =>
														handleInputChange(
															"plusOnes",
															String(parseInt(e.target.value)),
														)
													}
													className="w-full rounded-md border p-2"
												>
													<option value={0}>Just me</option>
													{Array.from(
														{ length: settings?.maxPlusOnes ?? 0 },
														(_, i) => (
															<option key={i + 1} value={i + 1}>
																{i + 1} additional guest{i + 1 > 1 ? "s" : ""}
															</option>
														),
													)}
												</select>
											</div>

											{formData.plusOnes > 0 && (
												<div className="space-y-2">
													<Label>Guest Names</Label>
													{Array.from({ length: formData.plusOnes }, (_, i) => (
														<Input
															key={i}
															placeholder={`Guest ${i + 1} name`}
															value={formData.plusOneNames[i] || ""}
															onChange={(e) =>
																handlePlusOneNameChange(i, e.target.value)
															}
														/>
													))}
												</div>
											)}
										</div>
									)}

								<div className="flex justify-end">
									<Button
										onClick={() => setStep(2)}
										disabled={
											!formData.guestName ||
											!formData.email ||
											!formData.response
										}
									>
										Continue
									</Button>
								</div>
							</div>
						)}

						{/* Step 2: Additional Details */}
						{step === 2 && formData.response === "attending" && (
							<div className="space-y-4">
								{/* Food Choices */}
								{foodChoices.length > 0 && (
									<div className="space-y-2">
										<Label>Meal Choice</Label>
										<RadioGroup
											value={formData.mealChoice}
											onValueChange={(value) =>
												handleInputChange("mealChoice", value)
											}
										>
											{foodChoices.map((choice) => (
												<div
													key={choice.id}
													className="flex items-center space-x-2 rounded-lg border p-3"
												>
													<RadioGroupItem value={choice.id} id={choice.id} />
													<Label htmlFor={choice.id} className="flex-1">
														<div className="font-medium">{choice.name}</div>
														{choice.description && (
															<div className="text-sm text-gray-500">
																{choice.description}
															</div>
														)}
														{choice.dietary.length > 0 && (
															<div className="mt-1 flex gap-1">
																{choice.dietary.map((diet, index) => (
																	<Badge
																		key={index}
																		variant="secondary"
																		className="text-xs"
																	>
																		{diet}
																	</Badge>
																))}
															</div>
														)}
													</Label>
												</div>
											))}
										</RadioGroup>
									</div>
								)}

								{settings?.collectDietaryInfo && (
									<div className="space-y-2">
										<Label htmlFor="dietary">
											Dietary Restrictions or Allergies
										</Label>
										<Textarea
											id="dietary"
											value={formData.dietaryRestrictions}
											onChange={(e) =>
												handleInputChange("dietaryRestrictions", e.target.value)
											}
											placeholder="Please list any dietary restrictions, allergies, or special meal requirements..."
											rows={3}
										/>
									</div>
								)}

								<div className="space-y-2">
									<Label htmlFor="accommodations">Special Accommodations</Label>
									<Textarea
										id="accommodations"
										value={formData.accommodations}
										onChange={(e) =>
											handleInputChange("accommodations", e.target.value)
										}
										placeholder="Do you need any special accommodations? (wheelchair access, seating preferences, etc.)"
										rows={3}
									/>
								</div>

								{/* Custom Fields */}
								{customFields.map((field) => (
									<div key={field.id} className="space-y-2">
										<Label htmlFor={field.id}>
											{field.label}
											{field.required && (
												<span className="ml-1 text-red-500">*</span>
											)}
										</Label>
										{renderCustomField(field)}
									</div>
								))}

								<div className="space-y-2">
									<Label htmlFor="songs">Song Requests</Label>
									<Input
										id="songs"
										value={formData.songRequests}
										onChange={(e) =>
											handleInputChange("songRequests", e.target.value)
										}
										placeholder="Any songs you'd like to hear at the event?"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Special Message</Label>
									<Textarea
										id="message"
										value={formData.specialMessage}
										onChange={(e) =>
											handleInputChange("specialMessage", e.target.value)
										}
										placeholder="Share a special message or memory with the hosts..."
										rows={3}
									/>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="newsletter"
										checked={formData.newsletter}
										onCheckedChange={(checked) =>
											handleInputChange("newsletter", checked)
										}
									/>
									<Label htmlFor="newsletter" className="text-sm">
										Send me updates about future events
									</Label>
								</div>

								<div className="flex gap-2">
									<Button variant="outline" onClick={() => setStep(1)}>
										Back
									</Button>
									<Button onClick={handleSubmit} className="flex-1">
										<Heart className="mr-2 h-4 w-4" />
										Submit RSVP
									</Button>
								</div>
							</div>
						)}

						{/* Step 2: Decline Message */}
						{step === 2 && formData.response === "declined" && (
							<div className="space-y-4">
								<div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
									<p className="mb-4 text-gray-700 dark:text-slate-200">
										We&apos;re sorry you can&apos;t make it! We&apos;ll miss
										having you there.
									</p>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">
										Would you like to share a message?
									</Label>
									<Textarea
										id="message"
										value={formData.specialMessage}
										onChange={(e) =>
											handleInputChange("specialMessage", e.target.value)
										}
										placeholder="Share a message with the hosts..."
										rows={3}
									/>
								</div>

								<div className="flex gap-2">
									<Button variant="outline" onClick={() => setStep(1)}>
										Back
									</Button>
									<Button onClick={handleSubmit} className="flex-1">
										Submit Response
									</Button>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

// DndContext wrapper for form builder
const FormBuilderDndContext = ({
	predefinedFields,
	customFields,
	onUpdateCustomFields,
	formFields,
	onUpdateField,
	onRemoveField,
	onReorderFields,
	onAddField,
	settings,
	groups,
}: FormBuilderDndContextProps) => {
	const [activeFieldData, setActiveFieldData] = useState<
		| PredefinedField
		| CustomField
		| FormField
		| {
				id: string;
				type: string;
				label: string;
				description?: string;
				config?: FormField["config"];
		  }
		| null
	>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3, // Reduced to 3px for easier dragging
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;

		// Get field data from active.id
		const fieldId = active.id as string;

		// Check if it's a library field (prefixed with "library-")
		if (fieldId.startsWith("library-")) {
			const actualId = fieldId.replace("library-", "");
			// Find in predefined fields
			const predefined = predefinedFields.find((f) => f.id === actualId);
			if (predefined) {
				setActiveFieldData(predefined);
				return;
			}
			// Find in custom fields
			const custom = customFields.find((f) => f.id === actualId);
			if (custom) {
				setActiveFieldData({ ...custom, type: "custom" });
				return;
			}
			// Check if it's food
			if (actualId === "food-choices") {
				setActiveFieldData({
					id: "food-choices",
					type: "food",
					label: "Meal Selection",
					description: "Choose meal preferences",
				});
				return;
			}
		} else {
			// It's a canvas field being reordered
			const field = formFields.find((f) => f.id === fieldId);
			if (field) {
				setActiveFieldData(field);
			}
		}
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;

		// Provide visual feedback when dragging library items over canvas
		if (active && active.id.toString().startsWith("library-") && over) {
			// This will trigger the isOver state in useDroppable
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			setActiveFieldData(null);
			return;
		}

		const activeIdStr = active.id as string;
		const overIdStr = over.id as string;

		// If dragging from library to canvas
		if (activeIdStr.startsWith("library-")) {
			const actualId = activeIdStr.replace("library-", "");

			// Find the field data from active.data
			const dragData = active.data.current;
			let fieldData:
				| PredefinedField
				| (CustomField & { type: "custom" })
				| {
						id: string;
						type: string;
						label: string;
						description?: string;
						config?: FormField["config"];
				  }
				| null = null;

			if (dragData?.type === "library-field" && dragData?.field) {
				fieldData = dragData.field;
			} else {
				// Fallback: find in predefined fields
				const predefined = predefinedFields.find((f) => f.id === actualId);
				if (predefined) {
					fieldData = { ...predefined, id: predefined.id }; // Ensure id is preserved
				} else {
					// Find in custom fields
					const custom = customFields.find((f) => f.id === actualId);
					if (custom) {
						fieldData = { ...custom, type: "custom", id: custom.id };
					} else if (actualId === "food-choices") {
						fieldData = {
							id: "food-choices",
							type: "food",
							label: "Meal Selection",
							description: "Choose meal preferences",
						};
					}
				}
			}

			// Allow dropping on canvas-dropzone OR on any sortable item in canvas
			if (
				fieldData &&
				(overIdStr === "canvas-dropzone" || !overIdStr.startsWith("library-"))
			) {
				// Extract field data properties safely based on type
				let fieldId: string;
				let fieldType: "predefined" | "custom" | "food";
				let fieldLabel: string;
				let fieldRequired: boolean;
				let fieldConfig: FormField["config"] | undefined;

				if ("id" in fieldData && fieldData.id) {
					fieldId = fieldData.id;
					if ("type" in fieldData) {
						if (fieldData.type === "custom") {
							fieldType = "custom";
							const customField = fieldData as CustomField & { type: "custom" };
							fieldLabel = customField.label || "";
							fieldRequired = customField.required || false;
							fieldConfig = undefined;
						} else if (fieldData.type === "food") {
							fieldType = "food";
							fieldLabel = fieldData.label || "";
							fieldRequired = false;
							fieldConfig =
								"config" in fieldData ? fieldData.config : undefined;
						} else {
							// Predefined field
							fieldType = "predefined";
							const predefinedField = fieldData as PredefinedField;
							fieldLabel = predefinedField.label || "";
							fieldRequired = predefinedField.required || false;
							fieldConfig = predefinedField.config;
						}
					} else {
						// Fallback for predefined fields
						const predefinedField = fieldData as PredefinedField;
						fieldType = "predefined";
						fieldLabel = predefinedField.label || "";
						fieldRequired = predefinedField.required || false;
						fieldConfig = predefinedField.config;
					}
				} else {
					// Fallback
					fieldId = actualId;
					fieldType = "predefined";
					fieldLabel = "";
					fieldRequired = false;
					fieldConfig = undefined;
				}

				// Check if field already exists to prevent duplicates
				const fieldExists = formFields.some((f) => {
					return f.fieldType === fieldId;
				});

				if (!fieldExists && fieldId && fieldLabel) {
					// Determine insertion position
					let insertOrder = formFields.length + 1;

					// If dropping on a sortable field, insert before it
					if (
						overIdStr !== "canvas-dropzone" &&
						formFields.some((f) => f.id === overIdStr)
					) {
						const targetField = formFields.find((f) => f.id === overIdStr);
						if (targetField) {
							insertOrder = targetField.order;
						}
					}

					// Add new field to canvas
					const newField: FormField = {
						id: Date.now().toString(),
						type: fieldType,
						fieldType: fieldId,
						label: fieldLabel,
						required: fieldRequired,
						order: insertOrder,
						config: fieldConfig,
					};
					onAddField(
						newField,
						insertOrder !== formFields.length + 1 ? insertOrder - 1 : undefined,
					);
				}
			}
		} else {
			// Reordering existing fields within canvas
			if (activeIdStr !== overIdStr && overIdStr !== "canvas-dropzone") {
				const sorted = [...formFields].sort((a, b) => a.order - b.order);
				const activeIndex = sorted.findIndex((f) => f.id === activeIdStr);
				const overIndex = sorted.findIndex((f) => f.id === overIdStr);

				if (activeIndex !== -1 && overIndex !== -1) {
					// Call onReorderFields to update order
					const targetField = sorted[overIndex];
					if (targetField) {
						onReorderFields(activeIdStr, targetField.id);
					}
				}
			}
		}

		setActiveFieldData(null);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={rectIntersection}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
		>
			<div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-4">
				{/* Field Library Sidebar */}
				<div className="lg:col-span-1">
					<FormFieldLibrary
						predefinedFields={predefinedFields}
						customFields={customFields}
						onUpdateCustomFields={onUpdateCustomFields}
						formFields={formFields}
						onAddField={onAddField}
					/>
				</div>

				{/* Form Canvas */}
				<div className="lg:col-span-3">
					<FormCanvas
						formFields={formFields}
						onUpdateField={onUpdateField}
						onRemoveField={onRemoveField}
						settings={settings}
						groups={groups}
					/>
				</div>
			</div>

			<DragOverlay>
				{activeFieldData && "label" in activeFieldData ? (
					<div className="max-w-xs rounded-lg border-2 border-blue-500 bg-white p-3 opacity-95 shadow-xl dark:border-blue-600 dark:bg-[#020617]">
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-blue-500"></div>
							<span className="text-sm font-medium dark:text-slate-200">
								{activeFieldData.label}
							</span>
							{"required" in activeFieldData && activeFieldData.required && (
								<span className="rounded bg-red-100 px-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
									Required
								</span>
							)}
						</div>
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

// In RSVPForm
const RSVPFormBuilder = ({
	customFields,
	onUpdateCustomFields,
	foodChoices,
	settings,
	// onUpdateSettings,
	groups,
	event,
}: RSVPFormBuilderProps) => {
	const [activeTab, setActiveTab] = useState<"builder" | "preview">("builder");
	const [formFields, setFormFields] = useState<FormField[]>([
		{
			id: "1",
			type: "predefined",
			fieldType: "name",
			label: "Full Name",
			required: true,
			order: 1,
		},
		{
			id: "2",
			type: "predefined",
			fieldType: "email",
			label: "Email Address",
			required: true,
			order: 2,
		},
		{
			id: "3",
			type: "predefined",
			fieldType: "rsvp-response",
			label: "Will you be attending?",
			required: true,
			order: 3,
		},
	]);

	const predefinedFields = [
		{
			id: "name",
			type: "predefined",
			label: "Full Name",
			icon: User,
			description: "Guest full name (required)",
			required: true,
		},
		{
			id: "email",
			type: "predefined",
			label: "Email Address",
			icon: Mail,
			description: "Contact email (required)",
			required: true,
		},
		{
			id: "phone",
			type: "predefined",
			label: "Phone Number",
			icon: Phone,
			description: "Contact phone number",
			required: false,
		},
		{
			id: "rsvp-response",
			type: "predefined",
			label: "RSVP Response",
			icon: CheckSquare,
			description: "Yes/No/Maybe response",
			required: true,
		},
		{
			id: "plus-ones",
			type: "predefined",
			label: "Plus Ones",
			icon: Users,
			description: "Number of additional guests",
			required: false,
		},
		{
			id: "group-selection",
			type: "predefined",
			label: "Guest Group",
			icon: Users,
			description: "Select guest category",
			required: false,
		},
		{
			id: "dietary-restrictions",
			type: "predefined",
			label: "Dietary Restrictions",
			icon: Utensils,
			description: "Food allergies and preferences",
			required: false,
		},
		{
			id: "special-accommodations",
			type: "predefined",
			label: "Special Accommodations",
			icon: MapPin,
			description: "Accessibility requirements",
			required: false,
		},
		{
			id: "song-requests",
			type: "predefined",
			label: "Song Requests",
			icon: Music,
			description: "Music preferences",
			required: false,
		},
		{
			id: "message-to-hosts",
			type: "predefined",
			label: "Message to Hosts",
			icon: MessageSquare,
			description: "Personal note or wishes",
			required: false,
		},
	];

	const addField = (fieldData: FormField, insertIndex?: number) => {
		// IMPORTANT: fieldData.fieldType already contains the library field's id
		// (set in handleDragEnd). We should preserve it, not try to use fieldData.id
		const newField: FormField = {
			id: Date.now().toString(),
			type: fieldData.type,
			fieldType: fieldData.fieldType || fieldData.type, // Use fieldType, not id!
			label: fieldData.label,
			required: fieldData.required || false,
			order:
				insertIndex !== undefined ? insertIndex + 1 : formFields.length + 1,
			config: fieldData.config,
		};

		let updatedFields = [...formFields];

		if (insertIndex !== undefined && insertIndex >= 0) {
			// Insert at specific position and reorder
			updatedFields.splice(insertIndex, 0, newField);
			updatedFields = updatedFields.map((field, index) => ({
				...field,
				order: index + 1,
			}));
		} else {
			// Add to end
			updatedFields.push(newField);
		}

		setFormFields(updatedFields);
	};

	const removeField = (fieldId: string) => {
		const updatedFields = formFields
			.filter((field) => field.id !== fieldId)
			.map((field, index) => ({
				...field,
				order: index + 1,
			}));
		setFormFields(updatedFields);
	};

	const updateField = (fieldId: string, updates: Partial<FormField>) => {
		setFormFields(
			formFields.map((field) =>
				field.id === fieldId ? { ...field, ...updates } : field,
			),
		);
	};

	const reorderFields = (draggedId: string, targetId: string) => {
		const draggedIndex = formFields.findIndex((f) => f.id === draggedId);
		const targetIndex = formFields.findIndex((f) => f.id === targetId);

		if (draggedIndex === -1 || targetIndex === -1) return;

		const newFields = [...formFields];
		const [draggedField] = newFields.splice(draggedIndex, 1);
		newFields.splice(targetIndex, 0, draggedField);

		// Update order numbers
		const reorderedFields = newFields.map((field, index) => ({
			...field,
			order: index + 1,
		}));

		setFormFields(reorderedFields);
	};

	return (
		<div className="h-full">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">RSVP Form Builder</h2>
					<p className="">Design your perfect guest response form</p>
				</div>
				<div className="flex gap-2">
					<Button
						variant={activeTab === "builder" ? "default" : "outline"}
						onClick={() => setActiveTab("builder")}
						// className={
						//   activeTab === "builder"
						//     ? ""
						//     : "border-white/20 bg-white/10 text-white"
						// }
					>
						<Settings className="mr-2 h-4 w-4" />
						Form Builder
					</Button>
					<Button
						variant={activeTab === "preview" ? "default" : "outline"}
						onClick={() => setActiveTab("preview")}
						// className={
						//   activeTab === "preview"
						//     ? ""
						//     : "border-white/20 bg-white/10 text-white"
						// }
					>
						<Eye className="mr-2 h-4 w-4" />
						Preview
					</Button>
				</div>
			</div>

			{activeTab === "builder" ? (
				<FormBuilderDndContext
					predefinedFields={predefinedFields}
					customFields={customFields}
					onUpdateCustomFields={onUpdateCustomFields}
					formFields={formFields}
					onUpdateField={updateField}
					onRemoveField={removeField}
					onReorderFields={reorderFields}
					onAddField={addField}
					settings={settings}
					groups={groups}
				/>
			) : (
				<>
					<FormPreview
						formFields={formFields}
						customFields={customFields}
						foodChoices={foodChoices}
						settings={settings}
						groups={groups}
						event={event}
					/>
				</>
			)}
		</div>
	);
};

// In RSVPFormBuilder
const FormFieldLibrary = ({
	predefinedFields,
	customFields,
	onUpdateCustomFields,
	formFields,
	onAddField,
}: FormFieldLibraryProps) => {
	const [activeLibraryTab, setActiveLibraryTab] = useState("predefined");

	// Filter out fields that are already in the canvas
	// Use useMemo to recalculate when formFields changes
	const { availablePredefined, availableCustom } = useMemo(() => {
		// Get all fieldType values from canvas fields (this is what we match against)
		const usedFieldTypes = new Set<string>();

		formFields.forEach((f) => {
			// Add fieldType if it exists
			if (f.fieldType) {
				usedFieldTypes.add(f.fieldType);
			}
			// Also add type if it exists and fieldType doesn't
			if (f.type && !f.fieldType) {
				usedFieldTypes.add(f.type);
			}
		});

		// Filter predefined fields - check if field.id matches any canvas fieldType
		const availablePredefined = predefinedFields.filter((field) => {
			if (!field.id) return false;
			// Check if this field's id is used as a fieldType in any canvas field
			const isUsed = usedFieldTypes.has(field.id);
			return !isUsed;
		});

		// Filter custom fields - check by fieldType or id match
		const availableCustom = customFields.filter((field) => {
			// Check if field.id matches any canvas field's fieldType or id
			return !formFields.some((f) => {
				const canvasFieldType = f.fieldType || f.type;
				return canvasFieldType === field.id || f.id === field.id;
			});
		});

		return {
			availablePredefined,
			availableCustom,
		};
	}, [formFields, predefinedFields, customFields]);

	// Helper function to convert library field to FormField
	const convertFieldToFormField = (
		field: PredefinedField | (CustomField & { type?: string; icon?: ElementType }),
	): FormField | null => {
		const actualId = "id" in field ? field.id : "";
		if (!actualId) return null;

		// Check if field already exists
		const fieldExists = formFields.some((f) => {
			return f.fieldType === actualId;
		});

		if (fieldExists) return null;

		let fieldType: "predefined" | "custom" | "food";
		let fieldLabel: string;
		let fieldRequired: boolean;
		let fieldConfig: FormField["config"] | undefined;

		if ("type" in field && field.type === "custom") {
			fieldType = "custom";
			const customField = field as CustomField & { type: "custom" };
			fieldLabel = customField.label || "";
			fieldRequired = customField.required || false;
			fieldConfig = undefined;
		} else {
			// Predefined field
			fieldType = "predefined";
			const predefinedField = field as PredefinedField;
			fieldLabel = predefinedField.label || "";
			fieldRequired = predefinedField.required || false;
			fieldConfig = predefinedField.config;
		}

		if (!fieldLabel) return null;

		return {
			id: Date.now().toString(),
			type: fieldType,
			fieldType: actualId,
			label: fieldLabel,
			required: fieldRequired,
			order: formFields.length + 1,
			config: fieldConfig,
		};
	};

	// DraggableFieldItem component for library fields
	const DraggableFieldItem = ({
		id,
		field,
	}: {
		id: string;
		field:
			| PredefinedField
			| (CustomField & { type?: string; icon?: ElementType });
	}) => {
		const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
			id,
			data: {
				type: "library-field",
				field,
			},
		});

		const handleAddClick = (e: React.MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			if (!onAddField) return;

			const formField = convertFieldToFormField(field);
			if (formField) {
				onAddField(formField);
			}
		};

		return (
			<div
				ref={setNodeRef}
				{...attributes}
				className={`group cursor-grab rounded-lg border p-3 transition-all hover:border-blue-300 hover:bg-blue-50 active:cursor-grabbing dark:border-slate-600 dark:hover:border-blue-600 dark:hover:bg-blue-900/20 ${
					isDragging
						? "scale-95 border-blue-500 bg-blue-50 opacity-50 dark:border-blue-600 dark:bg-blue-900/20"
						: ""
				}`}
			>
				<div className="mb-1 flex items-center justify-between gap-2">
					<div className="flex items-center gap-2 flex-1" {...listeners}>
						<Grip className="h-4 w-4 text-gray-400 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-blue-400" />
						{field.icon && (
							<field.icon className="h-4 w-4 text-gray-500 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" />
						)}
						<span className="text-sm font-medium dark:text-slate-200">
							{field.label}
						</span>
						{field.required && (
							<Badge variant="secondary" className="text-xs">
								Required
							</Badge>
						)}
					</div>
					{onAddField && (
						<Button
							type="button"
							size="sm"
							variant="outline"
							onClick={handleAddClick}
							className="flex-shrink-0 h-7 px-2 text-xs"
							onMouseDown={(e) => e.stopPropagation()}
						>
							<Plus className="h-3 w-3 mr-1" />
							Add
						</Button>
					)}
				</div>
				<p className="ml-8 text-xs text-gray-500 dark:text-slate-400">
					{field.description ||
						(field.type === "custom" ? `${field.type} • Custom field` : "")}
				</p>
			</div>
		);
	};

	return (
		<Card className="h-full !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">Field Library</CardTitle>
				<p className="text-sm text-gray-600 dark:text-slate-400">
					Drag fields to add them to your form
				</p>
			</CardHeader>
			<CardContent className="p-4">
				<Tabs
					value={activeLibraryTab}
					onValueChange={setActiveLibraryTab}
					className="flex h-full flex-col"
				>
					<TabsList className="mb-4 grid w-full grid-cols-2">
						<TabsTrigger value="predefined" className="text-xs">
							Standard
						</TabsTrigger>
						<TabsTrigger value="custom" className="text-xs">
							Custom
						</TabsTrigger>
					</TabsList>

					<div className="min-h-0 flex-1 overflow-y-auto">
						<TabsContent value="predefined" className="mt-0 space-y-2">
							{availablePredefined.length > 0 ? (
								availablePredefined.map((field) => (
									<DraggableFieldItem
										key={field.id}
										id={`library-${field.id}`}
										field={field}
									/>
								))
							) : (
								<div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-slate-600">
									<p className="text-sm text-gray-500 dark:text-slate-400">
										All standard fields have been added to your form
									</p>
								</div>
							)}
						</TabsContent>

						<TabsContent value="custom" className="mt-0">
							<div className="space-y-4">
								{availableCustom.length > 0 && (
									<div className="space-y-2">
										<div className="text-sm font-medium">
											Your Custom Fields:
										</div>
										{availableCustom.map((field) => (
											<DraggableFieldItem
												key={field.id}
												id={`library-${field.id}`}
												field={
													{ ...field, type: "custom" } as CustomField & {
														type: string;
													}
												}
											/>
										))}
									</div>
								)}
								{customFields.length > 0 && availableCustom.length === 0 && (
									<div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-slate-600">
										<p className="text-sm text-gray-500 dark:text-slate-400">
											All custom fields have been added to your form
										</p>
									</div>
								)}

								<CustomFieldsManager
									fields={customFields}
									onUpdate={onUpdateCustomFields}
								/>
							</div>
						</TabsContent>
					</div>
				</Tabs>
			</CardContent>
		</Card>
	);
};

// In FormFieldLibrary
const CustomFieldsManager = ({
	fields,
	onUpdate,
}: CustomFieldsManagerProps) => {
	const [isAdding, setIsAdding] = useState(false);
	const [editingField, setEditingField] = useState<CustomField | null>(null);
	if (editingField) {
	}
	const [newField, setNewField] = useState<Partial<CustomField>>({
		label: "",
		type: "text",
		required: false,
		options: [],
	});

	const fieldTypes = [
		{ value: "text", label: "Text Input" },
		{ value: "textarea", label: "Long Text" },
		{ value: "dropdown", label: "Dropdown" },
		{ value: "radio", label: "Multiple Choice" },
		{ value: "checkbox", label: "Checkboxes" },
	];

	const addField = () => {
		if (newField.label) {
			const field: CustomField = {
				id: Date.now().toString(),
				label: newField.label,
				type: newField.type || "text",
				required: newField.required || false,
				options: newField.options || [],
				placeholder: newField.placeholder,
			};
			onUpdate([...fields, field]);
			setNewField({ label: "", type: "text", required: false, options: [] });
			setIsAdding(false);
		}
	};

	// const updateField = (id: string, updates: Partial<CustomField>) => {
	//   onUpdate(
	//     fields.map((field) =>
	//       field.id === id ? { ...field, ...updates } : field,
	//     ),
	//   );
	// };

	const removeField = (id: string) => {
		onUpdate(fields.filter((field) => field.id !== id));
	};

	// const addOption = (fieldId: string, option: string) => {
	//   updateField(fieldId, {
	//     options: [
	//       ...(fields.find((f) => f.id === fieldId)?.options || []),
	//       option,
	//     ],
	//   });
	// };

	// const removeOption = (fieldId: string, optionIndex: number) => {
	//   const field = fields.find((f) => f.id === fieldId);
	//   if (field) {
	//     updateField(fieldId, {
	//       options: field.options?.filter((_, index) => index !== optionIndex),
	//     });
	//   }
	// };

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold dark:text-slate-200">
					Custom RSVP Fields
				</h3>
				<Button onClick={() => setIsAdding(true)} size="sm">
					<Plus className="mr-2 h-4 w-4" />
					Add Field
				</Button>
			</div>

			{/* Add New Field Form */}
			{isAdding && (
				<Card className="border-blue-200 !bg-white [background-color:white] backdrop-blur-sm dark:border-blue-700/50 dark:!bg-[#020617] dark:[background-color:#020617]">
					<CardHeader>
						<CardTitle className="text-lg dark:text-slate-200">
							Add Custom Field
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label className="dark:text-slate-200">Field Label</Label>
								<Input
									value={newField.label}
									onChange={(e) =>
										setNewField({ ...newField, label: e.target.value })
									}
									placeholder="e.g., Transportation Needs"
									className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
								/>
							</div>
							<div className="space-y-2">
								<Label className="dark:text-slate-200">Field Type</Label>
								<Select
									value={newField.type}
									onValueChange={(value) =>
										setNewField({
											...newField,
											type: value as CustomField["type"],
										})
									}
								>
									<SelectTrigger className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200">
										<SelectValue />
									</SelectTrigger>
									<SelectContent className="dark:border-slate-600 dark:bg-[#020617]">
										{fieldTypes.map((type) => (
											<SelectItem
												key={type.value}
												value={type.value}
												className="dark:text-slate-200 dark:hover:bg-slate-700"
											>
												{type.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{(newField.type === "text" || newField.type === "textarea") && (
							<div className="space-y-2">
								<Label className="dark:text-slate-200">Placeholder Text</Label>
								<Input
									value={newField.placeholder || ""}
									onChange={(e) =>
										setNewField({ ...newField, placeholder: e.target.value })
									}
									placeholder="Hint text for users"
									className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
								/>
							</div>
						)}

						{(newField.type === "dropdown" ||
							newField.type === "radio" ||
							newField.type === "checkbox") && (
							<div className="space-y-2">
								<Label className="dark:text-slate-200">Options</Label>
								<div className="space-y-2">
									{newField.options?.map((option, index) => (
										<div key={index} className="flex gap-2">
											<Input
												value={option}
												readOnly
												className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
											/>
											<Button
												variant="outline"
												size="sm"
												onClick={() => {
													const newOptions = [...(newField.options || [])];
													newOptions.splice(index, 1);
													setNewField({ ...newField, options: newOptions });
												}}
												className="dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}
									<div className="flex gap-2">
										<Input
											placeholder="Add option"
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													const value = (e.target as HTMLInputElement).value;
													if (value) {
														setNewField({
															...newField,
															options: [...(newField.options || []), value],
														});
														(e.target as HTMLInputElement).value = "";
													}
												}
											}}
											className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
										/>
										<Button
											variant="outline"
											size="sm"
											onClick={(e) => {
												const input = (e.target as HTMLElement)
													.previousElementSibling as HTMLInputElement;
												if (input.value) {
													setNewField({
														...newField,
														options: [...(newField.options || []), input.value],
													});
													input.value = "";
												}
											}}
											className="dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
										>
											<Plus className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						)}

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Switch
									checked={newField.required}
									onCheckedChange={(checked) =>
										setNewField({ ...newField, required: checked })
									}
								/>
								<Label className="dark:text-slate-200">Required Field</Label>
							</div>
						</div>

						<div className="flex gap-2">
							<Button onClick={addField}>Add Field</Button>
							<Button
								variant="outline"
								onClick={() => setIsAdding(false)}
								className="dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
							>
								Cancel
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Existing Fields */}
			<div className="space-y-3">
				{fields.map((field) => (
					<Card
						key={field.id}
						className="border-l-4 border-l-blue-500 !bg-white [background-color:white] backdrop-blur-sm dark:border-l-blue-600 dark:!bg-[#020617] dark:[background-color:#020617]"
					>
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<GripVertical className="h-4 w-4 text-gray-400 dark:text-slate-500" />
									<div>
										<div className="font-medium dark:text-slate-200">
											{field.label}
										</div>
										<div className="text-sm text-gray-500 dark:text-slate-400">
											{fieldTypes.find((t) => t.value === field.type)?.label}
											{field.required && (
												<Badge variant="secondary" className="ml-2">
													Required
												</Badge>
											)}
										</div>
										{field.options && field.options.length > 0 && (
											<div className="mt-1 text-xs text-gray-400 dark:text-slate-500">
												Options: {field.options.join(", ")}
											</div>
										)}
										<div className="mt-1 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
											<GripVertical className="h-3 w-3" />
											Ready to drag to form
										</div>
									</div>
								</div>
								<div className="flex gap-1">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setEditingField(field)}
										className="dark:hover:bg-slate-700"
									>
										<Edit className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => removeField(field.id)}
										className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{fields.length === 0 && !isAdding && (
				<Card className="border-2 border-dashed border-gray-300 !bg-white [background-color:white] backdrop-blur-sm dark:border-slate-600 dark:!bg-[#020617] dark:[background-color:#020617]">
					<CardContent className="p-8 text-center">
						<p className="mb-4 text-gray-500 dark:text-slate-400">
							No custom fields added yet
						</p>
						<Button
							onClick={() => setIsAdding(true)}
							variant="outline"
							className="dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
						>
							<Plus className="mr-2 h-4 w-4" />
							Add Your First Custom Field
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

// In FormFieldLibrary
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FoodChoicesManager = ({
	choices,
	onUpdate,
}: {
	choices: FoodChoice[];
	onUpdate: (choices: FoodChoice[]) => void;
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const [newChoice, setNewChoice] = useState<Partial<FoodChoice>>({
		name: "",
		description: "",
		dietary: [],
		category: "main",
	});

	const categories = [
		{ value: "appetizer", label: "Appetizer" },
		{ value: "main", label: "Main Course" },
		{ value: "dessert", label: "Dessert" },
		{ value: "beverage", label: "Beverage" },
	];

	const dietaryOptions = [
		"Vegetarian",
		"Vegan",
		"Gluten-Free",
		"Dairy-Free",
		"Nut-Free",
		"Keto",
		"Halal",
		"Kosher",
		"Low-Carb",
		"Organic",
	];

	const addChoice = () => {
		if (newChoice.name) {
			const choice: FoodChoice = {
				id: Date.now().toString(),
				name: newChoice.name,
				description: newChoice.description,
				dietary: newChoice.dietary || [],
				category: newChoice.category || "main",
				price: newChoice.price,
			};
			onUpdate([...choices, choice]);
			setNewChoice({
				name: "",
				description: "",
				dietary: [],
				category: "main",
			});
			setIsAdding(false);
		}
	};

	const removeChoice = (id: string) => {
		onUpdate(choices.filter((choice) => choice.id !== id));
	};

	const toggleDietary = (dietary: string) => {
		const current = newChoice.dietary || [];
		if (current.includes(dietary)) {
			setNewChoice({
				...newChoice,
				dietary: current.filter((d) => d !== dietary),
			});
		} else {
			setNewChoice({
				...newChoice,
				dietary: [...current, dietary],
			});
		}
	};

	const groupedChoices = categories.map((category) => ({
		...category,
		items: choices.filter((choice) => choice.category === category.value),
	}));

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold">Food & Beverage Options</h3>
				<Button onClick={() => setIsAdding(true)} size="sm">
					<Plus className="mr-2 h-4 w-4" />
					Add Option
				</Button>
			</div>

			{/* Add New Choice Form */}
			{isAdding && (
				<Card className="border-green-200 bg-green-50">
					<CardHeader>
						<CardTitle className="text-lg">Add Food Option</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label>Option Name</Label>
								<Input
									value={newChoice.name}
									onChange={(e) =>
										setNewChoice({ ...newChoice, name: e.target.value })
									}
									placeholder="e.g., Grilled Salmon"
								/>
							</div>
							<div className="space-y-2">
								<Label>Category</Label>
								<Select
									value={newChoice.category}
									onValueChange={(value) =>
										setNewChoice({
											...newChoice,
											category: value as FoodChoice["category"],
										})
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{categories.map((cat) => (
											<SelectItem key={cat.value} value={cat.value}>
												{cat.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-2">
							<Label>Description</Label>
							<Textarea
								value={newChoice.description}
								onChange={(e) =>
									setNewChoice({ ...newChoice, description: e.target.value })
								}
								placeholder="Describe the dish, ingredients, preparation method..."
								rows={2}
							/>
						</div>

						<div className="space-y-2">
							<Label>Price per Person (Optional)</Label>
							<Input
								type="number"
								step="0.01"
								value={newChoice.price || ""}
								onChange={(e) =>
									setNewChoice({
										...newChoice,
										price: e.target.value
											? parseFloat(e.target.value)
											: undefined,
									})
								}
								placeholder="0.00"
							/>
						</div>

						<div className="space-y-2">
							<Label>Dietary Information</Label>
							<div className="grid grid-cols-2 gap-2 md:grid-cols-3">
								{dietaryOptions.map((dietary) => (
									<div key={dietary} className="flex items-center space-x-2">
										<Checkbox
											checked={(newChoice.dietary || []).includes(dietary)}
											onCheckedChange={() => toggleDietary(dietary)}
										/>
										<Label className="text-sm">{dietary}</Label>
									</div>
								))}
							</div>
						</div>

						<div className="flex gap-2">
							<Button onClick={addChoice}>Add Option</Button>
							<Button variant="outline" onClick={() => setIsAdding(false)}>
								Cancel
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Existing Choices by Category */}
			<div className="space-y-6">
				{groupedChoices.map((category) => (
					<div key={category.value}>
						<h4 className="mb-3 flex items-center gap-2 font-medium text-gray-900">
							<Utensils className="h-4 w-4" />
							{category.label} ({category.items.length})
						</h4>

						{category.items.length === 0 ? (
							<Card className="border-2 border-dashed border-gray-200">
								<CardContent className="p-4 text-center text-gray-500">
									No {category.label.toLowerCase()} options added yet
								</CardContent>
							</Card>
						) : (
							<div className="grid gap-3">
								{category.items.map((choice) => (
									<Card key={choice.id}>
										<CardContent className="p-4">
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<div className="mb-1 flex items-center gap-2">
														<h5 className="font-medium">{choice.name}</h5>
														{choice.price && (
															<Badge variant="outline">${choice.price}</Badge>
														)}
													</div>
													{choice.description && (
														<p className="mb-2 text-sm text-gray-600">
															{choice.description}
														</p>
													)}
													{choice.dietary.length > 0 && (
														<div className="flex flex-wrap gap-1">
															{choice.dietary.map((dietary) => (
																<Badge
																	key={dietary}
																	variant="secondary"
																	className="text-xs"
																>
																	{dietary}
																</Badge>
															))}
														</div>
													)}
												</div>
												<div className="ml-4 flex gap-1">
													<Button variant="ghost" size="sm">
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => removeChoice(choice.id)}
														className="text-red-600"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>
				))}
			</div>

			{choices.length === 0 && !isAdding && (
				<Card className="border-2 border-dashed border-gray-300">
					<CardContent className="p-8 text-center">
						<Utensils className="mx-auto mb-4 h-12 w-12 text-gray-400" />
						<p className="mb-4 text-gray-500">No food options added yet</p>
						<Button onClick={() => setIsAdding(true)} variant="outline">
							<Plus className="mr-2 h-4 w-4" />
							Add Your First Food Option
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

// In RSVPFormBuilder
const FormCanvas = ({
	formFields,
	onUpdateField,
	onRemoveField,
	groups,
}: FormCanvasProps) => {
	const [editingField, setEditingField] = useState<string | null>(null);

	// Render field preview function (must be defined before SortableFieldItem)
	const renderFieldPreview = (field: FormField) => {
		switch (field.fieldType) {
			case "name":
			case "email":
			case "phone":
				return (
					<Input
						placeholder={`Enter ${field.label.toLowerCase()}`}
						disabled
						className="bg-gray-50 dark:bg-slate-700/50"
					/>
				);

			case "rsvp-response":
				return (
					<div className="space-y-2">
						<div className="flex items-center space-x-2 rounded border p-2 dark:border-slate-600">
							<input type="radio" disabled />
							<label className="dark:text-slate-200">
								Yes, I&apos;ll be there!
							</label>
						</div>
						<div className="flex items-center space-x-2 rounded border p-2 dark:border-slate-600">
							<input type="radio" disabled />
							<label className="dark:text-slate-200">
								Maybe - I&apos;m not sure yet
							</label>
						</div>
						<div className="flex items-center space-x-2 rounded border p-2 dark:border-slate-600">
							<input type="radio" disabled />
							<label className="dark:text-slate-200">
								Sorry, I can&apos;t make it
							</label>
						</div>
					</div>
				);

			case "plus-ones":
				return (
					<select
						disabled
						className="w-full rounded border bg-gray-50 p-2 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
					>
						<option>Just me</option>
						<option>1 additional guest</option>
						<option>2 additional guests</option>
					</select>
				);

			case "group-selection":
				return (
					<select
						disabled
						className="w-full rounded border bg-gray-50 p-2 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
					>
						<option>Select your group</option>
						{groups.map((group) => (
							<option key={group.id}>{group.name}</option>
						))}
					</select>
				);

			case "text":
				return (
					<Input
						placeholder={field.config?.placeholder || "Enter your response"}
						disabled
						className="bg-gray-50 dark:bg-slate-700/50"
					/>
				);

			case "textarea":
				return (
					<textarea
						placeholder={field.config?.placeholder || "Enter your response"}
						disabled
						className="w-full rounded border bg-gray-50 p-2 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
						rows={3}
					/>
				);

			case "dropdown":
				return (
					<select
						disabled
						className="w-full rounded border bg-gray-50 p-2 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
					>
						<option>Select an option</option>
						{field.config?.options?.map((option: string, index: number) => (
							<option key={index}>{option}</option>
						))}
					</select>
				);

			case "food-choices":
				return (
					<div className="space-y-2">
						{field.config?.choices?.slice(0, 3).map((choice, index: number) => (
							<div
								key={index}
								className="flex items-center space-x-2 rounded border p-2 dark:border-slate-600"
							>
								<input type="radio" disabled />
								<label className="dark:text-slate-200">{choice.name}</label>
							</div>
						))}
						{(field.config?.choices?.length ?? 0) > 3 && (
							<div className="text-sm text-gray-500 dark:text-slate-400">
								+{(field?.config?.choices?.length ?? 0) - 3} more options
							</div>
						)}
					</div>
				);

			default:
				return (
					<Input
						placeholder="Field preview"
						disabled
						className="bg-gray-50 dark:bg-slate-700/50"
					/>
				);
		}
	};

	// Sortable field item component
	const SortableFieldItem = ({ field }: { field: FormField }) => {
		const {
			attributes,
			listeners,
			setNodeRef,
			transform,
			transition,
			isDragging,
		} = useSortable({
			id: field.id,
		});

		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? 0.5 : 1,
		};

		return (
			<div
				ref={setNodeRef}
				style={style}
				className={`cursor-move rounded-lg border bg-white p-4 transition-all dark:bg-[#020617] ${
					isDragging
						? "rotate-1 transform border-blue-500 opacity-50 shadow-lg dark:border-blue-600"
						: "hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md dark:hover:border-blue-700 dark:hover:bg-slate-700/50 dark:hover:shadow-lg"
				} ${editingField === field.id ? "ring-2 ring-blue-500 dark:ring-blue-600" : ""}`}
			>
				<div className="mb-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div {...listeners} {...attributes}>
							<GripVertical className="h-4 w-4 cursor-grab text-gray-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400" />
						</div>
						<span className="font-medium dark:text-slate-200">
							{field.label}
						</span>
						{field.required && (
							<Badge variant="secondary" className="text-xs">
								Required
							</Badge>
						)}
						<Badge variant="outline" className="text-xs">
							{field.type === "predefined"
								? "Standard"
								: field.type === "custom"
									? "Custom"
									: "Food"}
						</Badge>
					</div>
					<div className="flex gap-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() =>
								setEditingField(editingField === field.id ? null : field.id)
							}
						>
							{editingField === field.id ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Edit className="h-4 w-4" />
							)}
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onRemoveField(field.id)}
							className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{editingField === field.id ? (
					<div className="space-y-3 rounded bg-gray-50 p-3 dark:bg-slate-700/50">
						<div className="grid grid-cols-2 gap-3">
							<div>
								<Label className="text-sm">Field Label</Label>
								<Input
									value={field.label}
									onChange={(e) =>
										onUpdateField(field.id, {
											label: e.target.value,
										})
									}
									className="mt-1"
								/>
							</div>
							<div className="mt-6 flex items-center space-x-2">
								<Switch
									checked={field.required}
									onCheckedChange={(checked) =>
										onUpdateField(field.id, { required: checked })
									}
								/>
								<Label>Required Field</Label>
							</div>
						</div>
					</div>
				) : (
					<div className="space-y-2">
						<Label className="text-sm font-medium">
							{field.label}
							{field.required && <span className="ml-1 text-red-500">*</span>}
						</Label>
						{renderFieldPreview(field)}
					</div>
				)}
			</div>
		);
	};

	// Canvas drop zone
	const CanvasDropZone = () => {
		const { setNodeRef, isOver } = useDroppable({
			id: "canvas-dropzone",
		});

		return (
			<div
				ref={setNodeRef}
				className={`min-h-full space-y-1 transition-all ${
					isOver
						? "rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-4 dark:border-blue-600 dark:bg-blue-900/20"
						: ""
				}`}
			>
				{formFields.length === 0 ? (
					<div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-slate-600">
						<div className="text-gray-500 dark:text-slate-400">
							<Settings className="mx-auto mb-4 h-12 w-12 opacity-50" />
							<h3 className="mb-2 text-lg font-medium dark:text-slate-200">
								Start Building Your Form
							</h3>
							<p className="text-sm dark:text-slate-400">
								Drag fields from the library on the left to build your RSVP
								form. You can reorder fields by dragging them within this area.
							</p>
						</div>
					</div>
				) : (
					<SortableContext
						items={formFields.map((f) => f.id)}
						strategy={verticalListSortingStrategy}
					>
						<div className="space-y-1">
							{formFields
								.sort((a, b) => a.order - b.order)
								.map((field) => (
									<SortableFieldItem key={field.id} field={field} />
								))}
						</div>
					</SortableContext>
				)}
			</div>
		);
	};

	return (
		<Card className="h-full !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span>Form Builder Canvas</span>
					<Badge variant="outline">{formFields.length} fields</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className="h-[calc(100%-80px)] overflow-y-auto">
				<CanvasDropZone />
			</CardContent>
		</Card>
	);
};

// In RSVPFormBuilder
const FormPreview = ({
	// formFields,
	customFields,
	foodChoices,
	settings,
	groups,
	event,
}: FormPreviewProps) => {
	return (
		<div className="space-y-4">
			<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<span>Form Preview</span>
						<span className="text-sm font-normal text-gray-500">
							- This is how guests will see your RSVP form
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="rounded-lg bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-1">
						<div className="overflow-hidden rounded-lg [background-color:white] bg-white dark:[background-color:#020617] dark:bg-[#020617]">
							<RSVPForm
								event={event}
								groups={groups}
								customFields={customFields}
								foodChoices={foodChoices}
								settings={settings}
								onBack={() => {}}
								isPreview={true}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

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

			{/* Expanded Content Dialog */}
			<Dialog open={isExpanded} onOpenChange={setIsExpanded}>
				<DialogContent className="max-h-[85vh] max-w-2xl">
					<DialogHeader>
						<DialogTitle>{groupName} - Guest List</DialogTitle>
						<DialogDescription>
							{groupGuests.length} member{groupGuests.length !== 1 ? "s" : ""} •{" "}
							{attendingCount} attending
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
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
						<ScrollArea className="max-h-[60vh]">
							<div className="space-y-2 pr-4">
								{displayedGuests.map((guest, index) => (
									<div
										key={guest.id}
										className="bg-card hover:bg-accent/50 group flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors"
										onClick={() => {
											setSelectedGuest(guest);
											setIsExpanded(false);
										}}
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
						</ScrollArea>

						{filteredGuests.length === 0 && (
							<div className="text-muted-foreground py-6 text-center text-sm">
								No guests found matching &apos;{searchQuery}&apos;
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>

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
				<TabsList className="grid w-full grid-cols-4 !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
					<TabsTrigger value="basic">Basic Settings</TabsTrigger>
					<TabsTrigger value="access">Access Control</TabsTrigger>
					<TabsTrigger value="registry">Registry</TabsTrigger>
					<TabsTrigger value="communication">Communication</TabsTrigger>
				</TabsList>

				<TabsContent value="basic" className="space-y-4">
					<Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 dark:text-slate-200">
								<Clock className="h-5 w-5" />
								Response Settings
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label className="dark:text-slate-200">RSVP Deadline</Label>
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
												disabled
												initialFocus
												className="pointer-events-auto p-3"
											/>
										</PopoverContent>
									</Popover>
								</div>

								<div className="space-y-2">
									<Label className="dark:text-slate-200">
										Response Options
									</Label>
									<Select value={settings?.responseOptions} disabled>
										<SelectTrigger className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200">
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
									<Label className="dark:text-slate-200">
										Capacity Limit (Optional)
									</Label>
									<Input
										type="number"
										value={settings?.capacityLimit || ""}
										readOnly
										placeholder="No limit"
										className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
									/>
								</div>

								<div className="space-y-2">
									<Label className="dark:text-slate-200">
										Maximum Plus Ones
									</Label>
									<Input
										type="number"
										value={settings?.maxPlusOnes}
										readOnly
										min="0"
										max="10"
										className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
									/>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label htmlFor="plus-ones" className="dark:text-slate-200">
										Allow Plus Ones
									</Label>
									<Switch
										id="plus-ones"
										checked={settings?.allowPlusOnes}
										disabled
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label htmlFor="waitlist" className="dark:text-slate-200">
										Enable Waitlist
									</Label>
									<Switch
										id="waitlist"
										checked={settings?.enableWaitlist}
										disabled
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label htmlFor="dietary" className="dark:text-slate-200">
										Collect Dietary Information
									</Label>
									<Switch
										id="dietary"
										checked={settings?.collectDietaryInfo}
										disabled
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label
										htmlFor="custom-fields"
										className="dark:text-slate-200"
									>
										Enable Custom Fields
									</Label>
									<Switch
										id="custom-fields"
										checked={settings?.enableCustomFields}
										disabled
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="access" className="space-y-4">
					<Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 dark:text-slate-200">
								<Shield className="h-5 w-5" />
								Access Control
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<div>
										<Label htmlFor="public" className="dark:text-slate-200">
											Public Registration
										</Label>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											Allow anyone with the link to RSVP
										</p>
									</div>
									<Switch
										id="public"
										checked={settings?.publicRegistration}
										disabled
									/>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<Label htmlFor="approval" className="dark:text-slate-200">
											Require Approval
										</Label>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											Manually approve each RSVP
										</p>
									</div>
									<Switch
										id="approval"
										checked={settings?.requireApproval}
										disabled
									/>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<Label htmlFor="reminders" className="dark:text-slate-200">
											Automatic Reminders
										</Label>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											Send reminder emails automatically
										</p>
									</div>
									<Switch
										id="reminders"
										checked={settings?.autoReminders}
										disabled
									/>
								</div>
							</div>

							{settings?.publicRegistration && (
								<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
									<h4 className="mb-2 font-medium text-blue-800 dark:text-blue-300">
										Shareable Event Page
									</h4>
									<p className="mb-3 text-sm text-blue-700 dark:text-blue-400">
										Your event will be accessible via a public link that you can
										share on social media, email, or anywhere else.
									</p>
									<div className="flex gap-2">
										<Input
											value="https://eventverse.app/events/demo-event-123"
											readOnly
											className="bg-white dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
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
					<Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 dark:text-slate-200">
								<Gift className="h-5 w-5" />
								Gift Registry
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label className="dark:text-slate-200">Registry Name</Label>
									<Input
										value={newRegistry.name}
										onChange={(e) =>
											setNewRegistry({ ...newRegistry, name: e.target.value })
										}
										placeholder="Wedding Registry"
										className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
									/>
								</div>
								<div className="space-y-2">
									<Label className="dark:text-slate-200">Platform</Label>
									<Select
										value={newRegistry.platform}
										onValueChange={(value) =>
											setNewRegistry({ ...newRegistry, platform: value })
										}
									>
										<SelectTrigger className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200">
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
								<Label className="dark:text-slate-200">Registry URL</Label>
								<Input
									value={newRegistry.url}
									onChange={(e) =>
										setNewRegistry({ ...newRegistry, url: e.target.value })
									}
									placeholder="https://..."
									className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
								/>
							</div>

							<div className="space-y-2">
								<Label className="dark:text-slate-200">
									Description (Optional)
								</Label>
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
									className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
								/>
							</div>

							<Button onClick={addRegistryLink} className="w-full">
								<Plus className="mr-2 h-4 w-4" />
								Add Registry
							</Button>

							{registryLinks.length > 0 && (
								<div className="space-y-2">
									<Label className="dark:text-slate-200">
										Current Registries
									</Label>
									<div className="space-y-2">
										{registryLinks.map((registry) => (
											<div
												key={registry.id}
												className="flex items-center justify-between rounded-lg border [background-color:white] bg-white p-3 dark:border-slate-600 dark:[background-color:rgb(51_65_85/0.5)] dark:bg-slate-700/50"
											>
												<div>
													<div className="font-medium dark:text-slate-200">
														{registry.name}
													</div>
													<div className="text-sm text-gray-500 dark:text-slate-400">
														{registry.platform}
													</div>
													{registry.description && (
														<div className="text-xs text-gray-400 dark:text-slate-500">
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
					<Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
						<CardHeader>
							<CardTitle className="dark:text-slate-200">
								Communication Settings
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label className="dark:text-slate-200">
										Invitation Template
									</Label>
									<Select defaultValue="default">
										<SelectTrigger className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200">
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
									<Label className="dark:text-slate-200">
										Reminder Schedule
									</Label>
									<Select defaultValue="standard">
										<SelectTrigger className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200">
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
								<Label className="dark:text-slate-200">Custom Message</Label>
								<Textarea
									placeholder="Add a personal message to your invitations..."
									rows={3}
									className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
								/>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<Label className="dark:text-slate-200">
										SMS Notifications
									</Label>
									<p className="text-sm text-gray-500 dark:text-slate-400">
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
const AddGuestDialog = ({
	isOpen,
	onClose,
	onAddGuest,
	groups,
	settings,
}: AddGuestDialogProps) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [plusOnes, setPlusOnes] = useState(0);
	const [plusOneNames, setPlusOneNames] = useState<string[]>([]);
	const [notes, setNotes] = useState("");
	const [selectedGroup, setSelectedGroup] = useState<string>("");

	const [bulkMode, setBulkMode] = useState(false);
	const [bulkContactMethod, setBulkContactMethod] = useState<"email" | "phone">(
		"email",
	);
	const [bulkEmails, setBulkEmails] = useState("");
	const [bulkPhones, setBulkPhones] = useState("");
	const [showEmailImport, setShowEmailImport] = useState(false);
	const [showPhoneImport, setShowPhoneImport] = useState(false);

	const maxPlusOnes = settings?.maxPlusOnes ?? 2;
	const allowPlusOnes = settings?.allowPlusOnes ?? true;

	const handlePlusOneChange = (index: number, value: string) => {
		const newNames = [...plusOneNames];
		newNames[index] = value;
		setPlusOneNames(newNames);
	};

	const handlePlusOnesChange = (value: number) => {
		const numValue = Math.max(0, Math.min(value, maxPlusOnes));
		setPlusOnes(numValue);
		// Adjust plusOneNames array to match
		if (numValue > plusOneNames.length) {
			setPlusOneNames([...plusOneNames, ...Array(numValue - plusOneNames.length).fill("")]);
		} else if (numValue < plusOneNames.length) {
			setPlusOneNames(plusOneNames.slice(0, numValue));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validation for single guest mode
		if (!bulkMode) {
			if (!firstName.trim() || !lastName.trim()) {
				alert("First name and last name are required");
				return;
			}
			if (!phone.trim()) {
				alert("Phone number is required");
				return;
			}
		}

		if (bulkMode) {
			if (bulkContactMethod === "email") {
				// Handle bulk email input
				const emails = bulkEmails.split("\n").filter((email) => email.trim());
				emails.forEach((email) => {
					const trimmedEmail = email.trim();
					if (trimmedEmail) {
						const emailParts = trimmedEmail.split("@");
						const defaultName = emailParts[0] || "Guest";
						onAddGuest({
							name: defaultName,
							email: trimmedEmail,
							phone: "",
							group: selectedGroup || undefined,
							status: "pending",
							plusOnes: 0,
							notes: notes.trim() || undefined,
						});
					}
				});
			} else {
				// Handle bulk phone input
				const phones = bulkPhones.split("\n").filter((phone) => phone.trim());
				phones.forEach((phone) => {
					const trimmedPhone = phone.trim();
					if (trimmedPhone) {
						onAddGuest({
							name: `Guest ${trimmedPhone}`,
							phone: trimmedPhone,
							email: "",
							group: selectedGroup || undefined,
							status: "pending",
							plusOnes: 0,
							notes: notes.trim() || undefined,
						});
					}
				});
			}
		} else {
			onAddGuest({
				name: `${firstName.trim()} ${lastName.trim()}`,
				email: email.trim() || "",
				phone: phone.trim(),
				group: selectedGroup || undefined,
				status: "pending",
				plusOnes: plusOnes,
				plusOneNames: plusOneNames.filter((name) => name.trim()).length > 0 
					? plusOneNames.filter((name) => name.trim())
					: undefined,
				notes: notes.trim() || undefined,
			});
		}

		// Reset form
		setFirstName("");
		setLastName("");
		setEmail("");
		setPhone("");
		setPlusOnes(0);
		setPlusOneNames([]);
		setNotes("");
		setSelectedGroup("");
		setBulkEmails("");
		setBulkPhones("");
		setBulkMode(false);
		setBulkContactMethod("email");
		setShowEmailImport(false);
		setShowPhoneImport(false);
		onClose();
	};

	const handleEmailImport = (emails: string[]) => {
		const currentEmails = bulkEmails
			.split("\n")
			.filter((email) => email.trim());
		const newEmails = [...currentEmails, ...emails].join("\n");
		setBulkEmails(newEmails);
		setShowEmailImport(false);
	};

	const handlePhoneImport = (phones: string[]) => {
		const currentPhones = bulkPhones
			.split("\n")
			.filter((phone) => phone.trim());
		const newPhones = [...currentPhones, ...phones].join("\n");
		setBulkPhones(newPhones);
		setShowPhoneImport(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Add Guest{bulkMode ? "s" : ""}</DialogTitle>
					<DialogDescription>
						{bulkMode
							? `Add multiple guests by entering their ${bulkContactMethod === "email" ? "email addresses" : "phone numbers"} (one per line)`
							: "Add a new guest to your event's RSVP list"}
					</DialogDescription>
				</DialogHeader>

				<div className="mb-4 flex gap-2">
					<Button
						variant={!bulkMode ? "default" : "outline"}
						size="sm"
						onClick={() => setBulkMode(false)}
					>
						Single Guest
					</Button>
					<Button
						variant={bulkMode ? "default" : "outline"}
						size="sm"
						onClick={() => setBulkMode(true)}
					>
						Bulk Add
					</Button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{bulkMode ? (
						<div className="space-y-4">
							{/* Bulk Contact Method Toggle */}
							<div className="flex gap-2">
								<Button
									type="button"
									variant={
										bulkContactMethod === "email" ? "default" : "outline"
									}
									size="sm"
									onClick={() => setBulkContactMethod("email")}
									className="flex items-center gap-2"
								>
									<Mail className="h-4 w-4" />
									Bulk by Email
								</Button>
								<Button
									type="button"
									variant={
										bulkContactMethod === "phone" ? "default" : "outline"
									}
									size="sm"
									onClick={() => setBulkContactMethod("phone")}
									className="flex items-center gap-2"
								>
									<Phone className="h-4 w-4" />
									Bulk by Phone
								</Button>
							</div>

							{bulkContactMethod === "email" ? (
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="bulk-emails">Email Addresses</Label>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => setShowEmailImport(true)}
											className="flex items-center gap-2"
											disabled
										>
											<Download className="h-4 w-4" />
											Import from Email
										</Button>
									</div>
									<Textarea
										id="bulk-emails"
										placeholder="Enter email addresses, one per line:&#10;john@example.com&#10;jane@example.com&#10;mike@example.com"
										value={bulkEmails}
										onChange={(e) => setBulkEmails(e.target.value)}
										rows={6}
										required
									/>
									<p className="text-muted-foreground text-xs">
										Names will be auto-generated from email addresses. You can
										edit them later. Email contact integration coming soon.
									</p>
								</div>
							) : (
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="bulk-phones">Phone Numbers</Label>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => setShowPhoneImport(true)}
											className="flex items-center gap-2"
											disabled
										>
											<Download className="h-4 w-4" />
											Import from Contacts
										</Button>
									</div>
									<Textarea
										id="bulk-phones"
										placeholder="Enter phone numbers, one per line:&#10;+1 (555) 123-4567&#10;+1 (555) 987-6543&#10;+1 (555) 456-7890"
										value={bulkPhones}
										onChange={(e) => setBulkPhones(e.target.value)}
										rows={6}
										required
									/>
									<p className="text-muted-foreground text-xs">
										Names will be auto-generated from phone numbers. You can
										edit them later. Phone contact integration coming soon.
									</p>
								</div>
							)}

							{/* Notes field for bulk mode */}
							<div className="space-y-2">
								<Label htmlFor="bulk-notes">Notes (applied to all guests)</Label>
								<Textarea
									id="bulk-notes"
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									placeholder="Any additional notes (will be applied to all guests)..."
									rows={3}
								/>
							</div>
						</div>
					) : (
						<>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="firstName">First Name *</Label>
									<Input
										id="firstName"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										placeholder="John"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">Last Name *</Label>
									<Input
										id="lastName"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										placeholder="Doe"
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number *</Label>
									<Input
										id="phone"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										placeholder="+1 (555) 123-4567"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email" className="flex items-center gap-1">
										Email
										<Badge variant="secondary" className="text-xs">
											Important
										</Badge>
									</Label>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="john@example.com"
									/>
									<p className="text-muted-foreground text-xs">
										Email helps with notifications and digital invitations
									</p>
								</div>
							</div>

							{allowPlusOnes && (
								<div className="space-y-2">
									<Label htmlFor="plus-ones">
										Plus Ones (Max: {maxPlusOnes})
									</Label>
									<Input
										id="plus-ones"
										type="number"
										min="0"
										max={maxPlusOnes}
										value={plusOnes}
										onChange={(e) =>
											handlePlusOnesChange(parseInt(e.target.value) || 0)
										}
									/>
									{plusOnes > 0 && (
										<div className="mt-2 space-y-2">
											<Label className="text-sm">Plus One Names</Label>
											{Array.from({ length: plusOnes }).map((_, index) => (
												<Input
													key={index}
													value={plusOneNames[index] || ""}
													onChange={(e) =>
														handlePlusOneChange(index, e.target.value)
													}
													placeholder={`Plus One ${index + 1} Name`}
												/>
											))}
										</div>
									)}
								</div>
							)}

							<div className="space-y-2">
								<Label htmlFor="notes">Notes</Label>
								<Textarea
									id="notes"
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									placeholder="Any additional notes about this guest..."
									rows={3}
								/>
							</div>
						</>
					)}

					{/* Common fields for both modes */}
					<div className="space-y-2">
						<Label>Group</Label>
						<div className="flex flex-wrap gap-2">
							<Button
								type="button"
								variant={!selectedGroup ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedGroup("")}
							>
								No Group
							</Button>
							{groups.map((group) => (
								<Button
									key={group.id}
									type="button"
									variant={selectedGroup === group.id ? "default" : "outline"}
									size="sm"
									onClick={() => setSelectedGroup(group.id)}
									className="flex items-center gap-2"
								>
									<div
										className="h-2 w-2 rounded-full"
										style={{ backgroundColor: group.color }}
									/>
									{group.name}
								</Button>
							))}
						</div>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">
							<Plus className="mr-2 h-4 w-4" />
							Add Guest{bulkMode ? "s" : ""}
						</Button>
					</DialogFooter>
				</form>

				{/* Import Dialogs */}
				<EmailContactImportDialog
					isOpen={showEmailImport}
					onClose={() => setShowEmailImport(false)}
					onImport={handleEmailImport}
				/>

				<PhoneContactImportDialog
					isOpen={showPhoneImport}
					onClose={() => setShowPhoneImport(false)}
					onImport={handlePhoneImport}
				/>
			</DialogContent>
		</Dialog>
	);
};

// In AddGuestDialog
const EmailContactImportDialog = ({
	isOpen,
	onClose,
	onImport,
}: EmailContactImportDialogProps) => {
	const mockEmailProviders: EmailProvider[] = [
		{ id: "gmail", name: "Gmail", icon: "📧", isConnected: false },
		{ id: "outlook", name: "Outlook", icon: "📮", isConnected: false },
		{ id: "yahoo", name: "Yahoo Mail", icon: "📫", isConnected: false },
		{ id: "apple", name: "Apple Mail", icon: "✉️", isConnected: false },
	];
	const [selectedProvider, setSelectedProvider] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [contacts, setContacts] = useState<EmailContact[]>([]);
	const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
		new Set(),
	);
	const [importStep, setImportStep] = useState<
		"provider" | "select" | "success"
	>("provider");

	// Mock contacts data
	const mockContacts: EmailContact[] = [
		{
			id: "1",
			name: "John Smith",
			email: "john.smith@example.com",
			organization: "ABC Corp",
		},
		{
			id: "2",
			name: "Jane Doe",
			email: "jane.doe@company.com",
			organization: "XYZ Inc",
		},
		{
			id: "3",
			name: "Mike Johnson",
			email: "mike.j@startup.co",
			organization: "Startup Co",
		},
		{ id: "4", name: "Sarah Wilson", email: "sarah.wilson@freelance.com" },
		{
			id: "5",
			name: "David Brown",
			email: "david.brown@agency.net",
			organization: "Creative Agency",
		},
		{
			id: "6",
			name: "Lisa Chen",
			email: "lisa.chen@tech.com",
			organization: "Tech Solutions",
		},
		{
			id: "7",
			name: "Robert Taylor",
			email: "robert.t@consulting.biz",
			organization: "Business Consulting",
		},
		{
			id: "8",
			name: "Emma Davis",
			email: "emma.davis@design.studio",
			organization: "Design Studio",
		},
	];

	const filteredContacts = contacts.filter(
		(contact) =>
			contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(contact.organization &&
				contact.organization.toLowerCase().includes(searchTerm.toLowerCase())),
	);

	const handleProviderSelect = async (providerId: string) => {
		setSelectedProvider(providerId);
		setIsLoading(true);

		// Simulate OAuth flow and contact fetching
		setTimeout(() => {
			setContacts(mockContacts);
			setIsLoading(false);
			setImportStep("select");
		}, 2000);
	};

	const handleContactToggle = (contactId: string) => {
		const newSelected = new Set(selectedContacts);
		if (newSelected.has(contactId)) {
			newSelected.delete(contactId);
		} else {
			newSelected.add(contactId);
		}
		setSelectedContacts(newSelected);
	};

	const handleSelectAll = () => {
		if (selectedContacts.size === filteredContacts.length) {
			setSelectedContacts(new Set());
		} else {
			setSelectedContacts(new Set(filteredContacts.map((c) => c.id)));
		}
	};

	const handleImport = () => {
		const selectedEmails = contacts
			.filter((contact) => selectedContacts.has(contact.id))
			.map((contact) => contact.email);

		onImport(selectedEmails);

		// Reset state and show success
		setImportStep("success");
		setTimeout(() => {
			onClose();
			resetDialog();
		}, 1500);
	};

	const resetDialog = () => {
		setImportStep("provider");
		setSelectedProvider("");
		setContacts([]);
		setSelectedContacts(new Set());
		setSearchTerm("");
		setIsLoading(false);
	};

	const handleClose = () => {
		onClose();
		resetDialog();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="max-h-[80vh] sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Mail className="h-5 w-5" />
						Import Email Contacts
					</DialogTitle>
					<DialogDescription>
						{importStep === "provider" &&
							"Choose your email provider to import contacts"}
						{importStep === "select" &&
							"Select the contacts you want to add as guests"}
						{importStep === "success" &&
							"Successfully imported your selected contacts!"}
					</DialogDescription>
				</DialogHeader>

				{importStep === "provider" && (
					<div className="space-y-4">
						{isLoading ? (
							<div className="flex flex-col items-center justify-center space-y-4 py-8">
								<div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
								<p className="text-muted-foreground text-sm">
									Connecting to {selectedProvider}...
								</p>
								<p className="text-muted-foreground text-xs">
									Fetching your contacts securely
								</p>
							</div>
						) : (
							<div className="grid grid-cols-2 gap-3">
								{mockEmailProviders.map((provider) => (
									<Button
										key={provider.id}
										variant="outline"
										className="flex h-16 flex-col items-center gap-2"
										onClick={() => handleProviderSelect(provider.id)}
									>
										<span className="text-2xl">{provider.icon}</span>
										<span className="text-sm">{provider.name}</span>
									</Button>
								))}
							</div>
						)}
					</div>
				)}

				{importStep === "select" && (
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Badge variant="secondary">
									<Users className="mr-1 h-3 w-3" />
									{contacts.length} contacts found
								</Badge>
								<Badge variant="outline">
									{selectedContacts.size} selected
								</Badge>
							</div>
							<Button variant="outline" size="sm" onClick={handleSelectAll}>
								{selectedContacts.size === filteredContacts.length
									? "Deselect All"
									: "Select All"}
							</Button>
						</div>

						<div className="relative">
							<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
							<Input
								placeholder="Search contacts..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>

						<ScrollArea className="h-64">
							<div className="space-y-2">
								{filteredContacts.map((contact) => (
									<div
										key={contact.id}
										className="hover:bg-accent flex cursor-pointer items-center space-x-3 rounded-lg border p-3"
										onClick={() => handleContactToggle(contact.id)}
									>
										<Checkbox
											checked={selectedContacts.has(contact.id)}
											onCheckedChange={() => handleContactToggle(contact.id)}
										/>
										<div className="min-w-0 flex-1">
											<div className="flex items-center gap-2">
												<p className="truncate text-sm font-medium">
													{contact.name}
												</p>
												{contact.organization && (
													<Badge variant="outline" className="text-xs">
														{contact.organization}
													</Badge>
												)}
											</div>
											<p className="text-muted-foreground truncate text-sm">
												{contact.email}
											</p>
										</div>
									</div>
								))}
							</div>
						</ScrollArea>
					</div>
				)}

				{importStep === "success" && (
					<div className="flex flex-col items-center justify-center space-y-4 py-8">
						<CheckCircle className="h-12 w-12 text-green-500" />
						<p className="text-lg font-medium">
							Contacts Imported Successfully!
						</p>
						<p className="text-muted-foreground text-sm">
							{selectedContacts.size} contacts have been added to your guest
							list
						</p>
					</div>
				)}

				<DialogFooter>
					{importStep === "select" && (
						<>
							<Button
								variant="outline"
								onClick={() => setImportStep("provider")}
							>
								Back
							</Button>
							<Button
								onClick={handleImport}
								disabled={selectedContacts.size === 0}
							>
								<Download className="mr-2 h-4 w-4" />
								Import {selectedContacts.size} Contact
								{selectedContacts.size !== 1 ? "s" : ""}
							</Button>
						</>
					)}
					{importStep === "provider" && (
						<Button variant="outline" onClick={handleClose}>
							Cancel
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

// In AddGuestDialog
const PhoneContactImportDialog = ({
	isOpen,
	onClose,
	onImport,
}: PhoneContactImportDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [contacts, setContacts] = useState<PhoneContact[]>([]);
	const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
		new Set(),
	);
	const [importStep, setImportStep] = useState<
		"permission" | "select" | "success"
	>("permission");

	// Mock phone contacts data
	const mockPhoneContacts: PhoneContact[] = [
		{
			id: "1",
			name: "John Smith",
			phoneNumbers: [
				{ number: "+1 (555) 123-4567", type: "mobile", isPrimary: true },
				{ number: "+1 (555) 123-4568", type: "work" },
			],
			email: "john.smith@example.com",
			organization: "ABC Corp",
			isFavorite: true,
		},
		{
			id: "2",
			name: "Jane Doe",
			phoneNumbers: [
				{ number: "+1 (555) 987-6543", type: "mobile", isPrimary: true },
			],
			email: "jane.doe@company.com",
			organization: "XYZ Inc",
		},
		{
			id: "3",
			name: "Mike Johnson",
			phoneNumbers: [
				{ number: "+1 (555) 456-7890", type: "mobile", isPrimary: true },
				{ number: "+1 (555) 456-7891", type: "home" },
			],
			isFavorite: true,
		},
		{
			id: "4",
			name: "Sarah Wilson",
			phoneNumbers: [
				{ number: "+1 (555) 321-0987", type: "mobile", isPrimary: true },
			],
			email: "sarah.wilson@freelance.com",
		},
		{
			id: "5",
			name: "David Brown",
			phoneNumbers: [
				{ number: "+1 (555) 654-3210", type: "work", isPrimary: true },
				{ number: "+1 (555) 654-3211", type: "mobile" },
			],
			organization: "Creative Agency",
		},
		{
			id: "6",
			name: "Lisa Chen",
			phoneNumbers: [
				{ number: "+1 (555) 789-0123", type: "mobile", isPrimary: true },
			],
			organization: "Tech Solutions",
		},
		{
			id: "7",
			name: "Mom",
			phoneNumbers: [
				{ number: "+1 (555) 111-2222", type: "mobile", isPrimary: true },
			],
			isFavorite: true,
			group: "Family",
		},
		{
			id: "8",
			name: "Emma Davis",
			phoneNumbers: [
				{ number: "+1 (555) 333-4444", type: "mobile", isPrimary: true },
			],
			organization: "Design Studio",
		},
	];

	const filteredContacts = contacts.filter(
		(contact) =>
			contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			contact.phoneNumbers.some((phone) => phone.number.includes(searchTerm)) ||
			(contact.organization &&
				contact.organization.toLowerCase().includes(searchTerm.toLowerCase())),
	);

	const handleRequestAccess = async () => {
		setIsLoading(true);

		// Simulate permission request and contact fetching
		setTimeout(() => {
			setContacts(mockPhoneContacts);
			setIsLoading(false);
			setImportStep("select");
		}, 2000);
	};

	const handleContactToggle = (contactId: string) => {
		const newSelected = new Set(selectedContacts);
		if (newSelected.has(contactId)) {
			newSelected.delete(contactId);
		} else {
			newSelected.add(contactId);
		}
		setSelectedContacts(newSelected);
	};

	const handleSelectAll = () => {
		if (selectedContacts.size === filteredContacts.length) {
			setSelectedContacts(new Set());
		} else {
			setSelectedContacts(new Set(filteredContacts.map((c) => c.id)));
		}
	};

	const getPhoneTypeIcon = (type: ContactPhone["type"]) => {
		switch (type) {
			case "mobile":
				return <Smartphone className="h-3 w-3" />;
			case "work":
				return <Briefcase className="h-3 w-3" />;
			case "home":
				return <Home className="h-3 w-3" />;
			default:
				return <Phone className="h-3 w-3" />;
		}
	};

	const handleImport = () => {
		const selectedPhones = contacts
			.filter((contact) => selectedContacts.has(contact.id))
			.map(
				(contact) =>
					contact.phoneNumbers.find((p) => p.isPrimary)?.number ||
					contact.phoneNumbers[0]?.number,
			)
			.filter(Boolean);

		onImport(selectedPhones);

		// Reset state and show success
		setImportStep("success");
		setTimeout(() => {
			onClose();
			resetDialog();
		}, 1500);
	};

	const resetDialog = () => {
		setImportStep("permission");
		setContacts([]);
		setSelectedContacts(new Set());
		setSearchTerm("");
		setIsLoading(false);
	};

	const handleClose = () => {
		onClose();
		resetDialog();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="max-h-[80vh] sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Phone className="h-5 w-5" />
						Import Phone Contacts
					</DialogTitle>
					<DialogDescription>
						{importStep === "permission" &&
							"Access your phone contacts to import guest phone numbers"}
						{importStep === "select" &&
							"Select the contacts you want to add as guests"}
						{importStep === "success" &&
							"Successfully imported your selected contacts!"}
					</DialogDescription>
				</DialogHeader>

				{importStep === "permission" && (
					<div className="space-y-4">
						{isLoading ? (
							<div className="flex flex-col items-center justify-center space-y-4 py-8">
								<div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
								<p className="text-muted-foreground text-sm">
									Accessing your contacts...
								</p>
								<p className="text-muted-foreground text-xs">
									This may take a moment
								</p>
							</div>
						) : (
							<div className="space-y-4 text-center">
								<div className="flex justify-center">
									<div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
										<Phone className="text-primary h-8 w-8" />
									</div>
								</div>
								<div>
									<h3 className="mb-2 font-medium">Access Phone Contacts</h3>
									<p className="text-muted-foreground mb-4 text-sm">
										We&apos;ll import your phone contacts so you can easily add
										guests to your event. Your contact data will be processed
										securely and not stored.
									</p>
								</div>
								<Button onClick={handleRequestAccess} className="w-full">
									<Phone className="mr-2 h-4 w-4" />
									Access Phone Contacts
								</Button>
							</div>
						)}
					</div>
				)}

				{importStep === "select" && (
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Badge variant="secondary">
									<Phone className="mr-1 h-3 w-3" />
									{contacts.length} contacts found
								</Badge>
								<Badge variant="outline">
									{selectedContacts.size} selected
								</Badge>
							</div>
							<Button variant="outline" size="sm" onClick={handleSelectAll}>
								{selectedContacts.size === filteredContacts.length
									? "Deselect All"
									: "Select All"}
							</Button>
						</div>

						<div className="relative">
							<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
							<Input
								placeholder="Search contacts..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>

						<ScrollArea className="h-64">
							<div className="space-y-2">
								{filteredContacts.map((contact) => (
									<div
										key={contact.id}
										className="hover:bg-accent flex cursor-pointer items-start space-x-3 rounded-lg border p-3"
										onClick={() => handleContactToggle(contact.id)}
									>
										<Checkbox
											checked={selectedContacts.has(contact.id)}
											onCheckedChange={() => handleContactToggle(contact.id)}
											className="mt-1"
										/>
										<div className="min-w-0 flex-1">
											<div className="mb-1 flex items-center gap-2">
												<p className="truncate text-sm font-medium">
													{contact.name}
												</p>
												{contact.isFavorite && (
													<Heart className="h-3 w-3 fill-current text-red-500" />
												)}
												{contact.organization && (
													<Badge variant="outline" className="text-xs">
														{contact.organization}
													</Badge>
												)}
												{contact.group && (
													<Badge variant="secondary" className="text-xs">
														{contact.group}
													</Badge>
												)}
											</div>
											<div className="space-y-1">
												{contact.phoneNumbers.map((phone, index) => (
													<div
														key={index}
														className="text-muted-foreground flex items-center gap-2 text-xs"
													>
														{getPhoneTypeIcon(phone.type)}
														<span>{phone.number}</span>
														{phone.isPrimary && (
															<Badge variant="outline" className="text-xs">
																Primary
															</Badge>
														)}
														<span className="capitalize">({phone.type})</span>
													</div>
												))}
												{contact.email && (
													<p className="text-muted-foreground text-xs">
														{contact.email}
													</p>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</ScrollArea>
					</div>
				)}

				{importStep === "success" && (
					<div className="flex flex-col items-center justify-center space-y-4 py-8">
						<CheckCircle className="h-12 w-12 text-green-500" />
						<p className="text-lg font-medium">
							Contacts Imported Successfully!
						</p>
						<p className="text-muted-foreground text-sm">
							{selectedContacts.size} contacts have been added to your guest
							list
						</p>
					</div>
				)}

				<DialogFooter>
					{importStep === "select" && (
						<>
							<Button
								variant="outline"
								onClick={() => setImportStep("permission")}
							>
								Back
							</Button>
							<Button
								onClick={handleImport}
								disabled={selectedContacts.size === 0}
							>
								<Download className="mr-2 h-4 w-4" />
								Import {selectedContacts.size} Contact
								{selectedContacts.size !== 1 ? "s" : ""}
							</Button>
						</>
					)}
					{importStep === "permission" && (
						<Button variant="outline" onClick={handleClose}>
							Cancel
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

// In RSVPModule
const GroupManagementDialog = ({
	isOpen,
	onClose,
	groups,
	onUpdateGroups,
	initialGroup = null,
}: GroupManagementDialogProps) => {
	const [editingGroup, setEditingGroup] = useState<RSVPGroup | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		color: "bg-blue-500",
		memberLimit: "",
	});

	// Set editing group when initialGroup prop changes
	useEffect(() => {
		if (initialGroup) {
			setEditingGroup(initialGroup);
			setFormData({
				name: initialGroup.name,
				description: initialGroup.description || "",
				color: initialGroup.color,
				memberLimit: initialGroup.memberLimit?.toString() || "",
			});
		} else {
			setEditingGroup(null);
			setFormData({
				name: "",
				description: "",
				color: "bg-blue-500",
				memberLimit: "",
			});
		}
	}, [initialGroup, isOpen]);

	const colorOptions = [
		{ value: "bg-red-500", label: "Red" },
		{ value: "bg-blue-500", label: "Blue" },
		{ value: "bg-green-500", label: "Green" },
		{ value: "bg-purple-500", label: "Purple" },
		{ value: "bg-yellow-500", label: "Yellow" },
		{ value: "bg-pink-500", label: "Pink" },
		{ value: "bg-indigo-500", label: "Indigo" },
		{ value: "bg-orange-500", label: "Orange" },
	];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name.trim()) return;

		const newGroup: RSVPGroup = {
			id: editingGroup?.id || Date.now().toString(),
			name: formData.name,
			description: formData.description,
			color: formData.color,
			memberLimit: formData.memberLimit
				? parseInt(formData.memberLimit)
				: undefined,
			guestCount: editingGroup?.guestCount ?? 0,
		};

		if (editingGroup) {
			onUpdateGroups(
				groups.map((g) => (g.id === editingGroup.id ? newGroup : g)),
			);
		} else {
			onUpdateGroups([...groups, newGroup]);
		}

		resetForm();
		onClose();
	};

	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			color: "bg-blue-500",
			memberLimit: "",
		});
		setEditingGroup(null);
		onClose();
	};

	const handleEdit = (group: RSVPGroup) => {
		setEditingGroup(group);
		setFormData({
			name: group.name,
			description: group.description || "",
			color: group.color,
			memberLimit: group.memberLimit?.toString() || "",
		});
	};

	const handleDelete = (groupId: string) => {
		onUpdateGroups(groups.filter((g) => g.id !== groupId));
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Manage Guest Groups</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					{/* Add/Edit Form */}
					<form
						onSubmit={handleSubmit}
						className="space-y-4 rounded-lg [background-color:rgb(249_250_251)] bg-gray-50 p-4 dark:[background-color:#020617] dark:bg-[#020617]"
					>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="group-name" className="dark:text-slate-200">
									Group Name *
								</Label>
								<Input
									id="group-name"
									value={formData.name}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, name: e.target.value }))
									}
									placeholder="e.g., VIP Guests, Family, Friends"
									required
									className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
								/>
							</div>
							<div>
								<Label htmlFor="member-limit" className="dark:text-slate-200">
									Member Limit (optional)
								</Label>
								<Input
									id="member-limit"
									type="number"
									value={formData.memberLimit}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											memberLimit: e.target.value,
										}))
									}
									placeholder="No limit"
									className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
								/>
							</div>
						</div>

						<div>
							<Label htmlFor="description" className="dark:text-slate-200">
								Description
							</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										description: e.target.value,
									}))
								}
								placeholder="Brief description of this group"
								rows={2}
								className="dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200"
							/>
						</div>

						<div>
							<Label className="dark:text-slate-200">Group Color</Label>
							<div className="mt-2 flex gap-2">
								{colorOptions.map((color) => (
									<button
										key={color.value}
										type="button"
										onClick={() =>
											setFormData((prev) => ({ ...prev, color: color.value }))
										}
										className={`h-8 w-8 rounded-full ${color.value} ${
											formData.color === color.value
												? "ring-2 ring-gray-900 ring-offset-2 dark:ring-gray-100 dark:ring-offset-slate-700"
												: ""
										}`}
										title={color.label}
									/>
								))}
							</div>
						</div>

						<div className="flex gap-2">
							<Button type="submit">
								{editingGroup ? "Update Group" : "Add Group"}
							</Button>
							{editingGroup && (
								<Button type="button" variant="outline" onClick={resetForm}>
									Cancel
								</Button>
							)}
						</div>
					</form>

					{/* Existing Groups */}
					<div className="space-y-3">
						<h4 className="font-medium dark:text-slate-200">
							Existing Groups ({groups.length})
						</h4>
						{groups.length === 0 ? (
							<p className="py-4 text-center text-gray-500 dark:text-slate-400">
								No groups created yet
							</p>
						) : (
							<div className="space-y-2">
								{groups.map((group) => (
									<div
										key={group.id}
										className="flex items-center justify-between rounded-lg border [background-color:white] bg-white p-3 dark:border-slate-600 dark:[background-color:#020617] dark:bg-[#020617]"
									>
										<div className="flex items-center gap-3">
											<div className={`h-4 w-4 rounded-full ${group.color}`} />
											<div>
												<div className="font-medium dark:text-slate-200">
													{group.name}
												</div>
												{group.description && (
													<div className="text-sm text-gray-600 dark:text-slate-400">
														{group.description}
													</div>
												)}
												{group.memberLimit && (
													<Badge variant="secondary" className="text-xs">
														Limit: {group.memberLimit}
													</Badge>
												)}
												{group.guestCount !== undefined && (
													<Badge variant="outline" className="ml-2 text-xs">
														{group.guestCount} members
													</Badge>
												)}
											</div>
										</div>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleEdit(group)}
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleDelete(group.id)}
												className="text-red-600"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
