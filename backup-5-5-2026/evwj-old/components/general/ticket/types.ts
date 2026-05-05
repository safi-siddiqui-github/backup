export type TicketTypeData = {
	id: string;
	color:
		| "blue"
		| "orange"
		| "purple"
		| "green"
		| "red"
		| "pink"
		| "indigo"
		| "teal";
	name: string;
	price: number;
	sold: number;
	total: number;
	available: number;
};

export type TicketStats = {
	totalSales: number;
	reserved: number;
	revenue: number;
	checkInRate: number;
};

export type RecentActivity = {
	id: string;
	name: string;
	description: string;
	amount: number;
	status: "paid" | "pending" | "failed";
	timestamp?: string;
};

export type TabValue =
	| "overview"
	| "tickets"
	| "reservations"
	| "promo-codes"
	| "referrals"
	| "check-in"
	| "settings";

export type BuyerInfo = {
	name: string;
	purchaseDate: string;
};

export type TicketType = 
	| "access-level"      // Open seating based on access level
	| "seated"            // Purchase specific seats, price varies by section/row
	| "booth-table"       // Purchase table/booth with assignable tickets
	| "vendor-booth";     // Vendor booth with capacity-based pricing

export type SeatingSection = {
	name: string;
	price: number;
	rows?: Array<{
		name: string;
		price: number;  // Override section price if needed
		seats: number;
	}>;
	totalSeats?: number;  // If no rows specified
};

export type PricingTier = {
	minCapacity: number;
	maxCapacity: number;
	pricePerPerson: number;
};

export type TicketItem = {
	id: string;
	ticketType?: TicketType;  // Ticket type selector
	category: string;
	name: string;
	description: string;
	price: number;
	revenue: number;
	sold: number;
	left: number;
	capacity: number;
	status: "Active" | "Inactive";
	color:
		| "blue"
		| "orange"
		| "green"
		| "purple"
		| "red"
		| "pink"
		| "indigo"
		| "teal";
	isSoldOut: boolean;
	recentBuyers: BuyerInfo[];
	
	// Additional fields based on type
	seatingConfig?: {
		sections?: SeatingSection[];
	};
	numberOfBooths?: number;
	boothCapacity?: number;
	assignableTickets?: number;
	boothPrice?: number;
	numberOfVendorBooths?: number;
	vendorBoothCapacity?: number;
	vendorAssignableTickets?: number;
	pricePerCapacity?: number;
	pricingTiers?: PricingTier[];
};

export type TicketTypeProps = {
	ticket: TicketTypeData;
	onReserve: (ticketId: string) => void;
};

export type TicketHeaderProps = {
	stats: TicketStats;
	onBack?: () => void;
};

export type StatCardProps = {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	gradient?: boolean;
};

export type StatsGridProps = {
	stats: TicketStats;
};

export type EmptyTabContentProps = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

export type TicketTabNavigationProps = {
	className?: string;
	value?: string;
	onValueChange?: (value: string) => void;
};

export type TabConfig = {
	value: TabValue;
	label: string;
	icon: React.ReactNode;
};

export type OverviewTabContentProps = {
	stats: TicketStats;
	ticketTypes: TicketTypeData[];
	recentActivity?: RecentActivity[];
	onReserve: (ticketId: string) => void;
	onAddTicketType?: () => void;
	onViewAllActivity?: () => void;
};

export type DeleteConfirmDialogProps = {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onCancel: () => void;
	onConfirm: () => void;
};

export type TicketForm = {
	// Basic fields (common to all types)
	name: string;
	ticketType?: TicketType;  // Ticket type selector
	category: string;
	description: string;
	saleStart: string;
	saleEnd: string;
	features: string;
	color:
		| "blue"
		| "orange"
		| "green"
		| "purple"
		| "red"
		| "pink"
		| "indigo"
		| "teal";
	active: boolean;

	// Access Level Ticket fields
	price?: number;           // Fixed price for access level
	capacity?: number;        // Total capacity for access level

	// Seated Ticket fields
	enableSeatSelection?: boolean;
	seatingConfig?: {
		sections?: SeatingSection[];
	};

	// Booth/Table Ticket fields
	numberOfBooths?: number;        // Number of booths/tables of this type
	boothCapacity?: number;         // Number of seats at the table/booth
	assignableTickets?: number;     // Number of tickets included (e.g., 10 tickets)
	boothPrice?: number;            // Total price for the booth

	// Vendor Booth Ticket fields
	numberOfVendorBooths?: number;  // Number of vendor booths of this type
	vendorBoothCapacity?: number;    // Booth capacity (people)
	vendorAssignableTickets?: number; // Number of assignable tickets
	pricePerCapacity?: number;       // Base price per person capacity
	pricingTiers?: PricingTier[];
};

export type TicketEditForm = {
	name: string;
	ticketType?: TicketType;
	category: string;
	description: string;
	price?: number;
	capacity?: number;
	// Include additional fields based on ticket type
	seatingConfig?: {
		sections?: SeatingSection[];
	};
	numberOfBooths?: number;
	boothCapacity?: number;
	assignableTickets?: number;
	boothPrice?: number;
	numberOfVendorBooths?: number;
	vendorBoothCapacity?: number;
	vendorAssignableTickets?: number;
	pricePerCapacity?: number;
	pricingTiers?: PricingTier[];
};

export type CreateTicketDialogProps = {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	createForm: TicketForm;
	setCreateForm: React.Dispatch<React.SetStateAction<TicketForm>>;
	onCreate: () => void;
	onCreateMultiple?: (tickets: TicketForm[]) => void; // Optional callback for creating multiple tickets at once
};

export type EditTicketDialogProps = {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	editForm: TicketEditForm;
	setEditForm: React.Dispatch<React.SetStateAction<TicketEditForm>>;
	onSave: () => void;
	onCancel: () => void;
};

export type ViewTicketDialogProps = {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	ticket?: TicketItem | null;
	customersOpen: boolean;
	setCustomersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TicketCardProps = {
	ticket: TicketItem;
	onToggleStatus: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string) => void;
	onCopy: (id: string) => void;
	expandedBuyers: boolean;
	onToggleBuyersExpand: (id: string) => void;
	onView?: (id: string) => void;
};

export type TicketListItemProps = TicketCardProps;

export type ReservationStatus = "sent" | "active" | "redeemed" | "cancelled";

export type Reservation = {
	id: string;
	guestName: string;
	status: ReservationStatus;
	ticketType: string;
	ticketCount: number;
	guestCategory: string;
	email: string;
	reservedDate: string;
	qrCodes: number;
	notes: string;
};

export type ReserveForm = {
	ticketType: string;
	quantity: number;
	guestName: string;
	guestEmail: string;
	reason: string;
	notes: string;
};

// Checkout
export type Attendee = {
	id: number;
	name: string;
	email: string;
	ticketType: string;
	quantity: number;
	orderId: string;
	status: "Checked In" | "Pending";
	checkInTime: string | null;
};

export type StatsCardProps = {
	title: string;
	value: string | number;
	icon?: React.ComponentType<{ size?: number }>;
	colorClass?: "blue" | "green" | "orange" | "purple";
};

// Referral types
export type Influencer = {
	id: string;
	name: string;
	email: string;
	code: string;
	commissionLabel: string;
	clicks: number;
	sales: number;
	revenue: number;
	commissionTotal: number;
	paidAmount: number;
	amountOwed: number;
	status: "Active" | "Inactive";
	paymentDue?: boolean;
	notes?: string;
};

// settings types

export type GeneralSettings = {
	enableTicketing: boolean;
	allowRefunds: boolean;
	allowTransfers: boolean;
	maxTicketsPerOrder: number;
};

export type PaymentSettings = {
	currency: string;
	taxRate: number;
	processingFee: number;
	cardEnabled: boolean;
	paypalEnabled: boolean;
	bankEnabled: boolean;
	applePayEnabled: boolean;
	googlePayEnabled: boolean;
};

export type AccessSettings = {
	requirePhone: boolean;
	requireAddress: boolean;
	allowGuest: boolean;
};

export type Policies = {
	terms: string;
	refundPolicy: string;
	privacyPolicy: string;
};

export type SettingsState = {
	general: GeneralSettings;
	payment: PaymentSettings;
	access: AccessSettings;
	policies: Policies;
};

// Promo Code types

export type PromoCodeStatus = "Active" | "Inactive";
export type PromoCodeIcon = "percent" | "dollar" | "gift";

export type PromoCode = {
	id: string;
	icon: PromoCodeIcon;
	title: string;
	status: PromoCodeStatus;
	description: string;
	promoCode: string;
	promoValue: string;
	usageCurrent: number;
	usageLimit: number;
	revenueImpact: number;
	discountAmount: number;
	validFrom: string;
	validTo: string;
};
