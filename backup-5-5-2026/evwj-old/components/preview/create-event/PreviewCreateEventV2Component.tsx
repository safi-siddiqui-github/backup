"use client";

import { Camera, FileText, Puzzle, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EssentialDetails from "./EssentialDetails";
import ModuleFeaturesSection from "./ModuleFeaturesSection";
import { NavigationButtons } from "./NavigationButtons";
import OptionalDetails from "./OptionalDetails";
import PhotoGallerySection from "./PhotoGallerySection";
import { StepperProgress } from "./StepperProgress";

export interface EventFormData {
	// Basic Details
	visibility: "public" | "private" | "org_members_only";
	eventName: string;
	eventType: string;
	description: string;
	organizationId?: number | null;

	// Vendor booth settings
	//   vendorBoothSettings?: import('@/types/venue').VendorBoothSettings;
	vendorBoothSettings?: VendorBoothSettings;
	descriptionBlocks?: Array<{
		id: string;
		type: "text" | "image" | "video";
		content: string;
		order: number;
	}>;
	theme: {
		primaryColor: string;
		secondaryColor: string;
		accentColor?: string;
		logo?: string;
		template?: string;
		effects?: string[];
		mood?: string;
		generatedName?: string;
	};

	// Enhanced Date & Time Management
	eventDates: {
		isMultiDay: boolean;
		startDate: Date | null;
		endDate: Date | null;
		startTime?: string;
		endTime?: string;
		timezone: string;
		sessions: EventSession[];
	};

	// Backward compatibility properties
	startDate?: Date | null;
	endDate?: Date | null;
	time?: string;
	timezone?: string;
	isRecurring?: boolean;

	// Multi-location Support
	locations: EventLocation[];

	// Recurring Events
	recurrence: EventRecurrence;

	// Modules & Features
	selectedModules: string[];
	moduleConfigurations: Record<string, unknown>;

	// Guest Management (moved to RSVP module)
	expectedAttendees: number;
	maxAttendees?: number;
	guestGroups: Array<{ name: string; members: string[] }>;
	vipGuests: string[];

	// Tickets & Pricing
	ticketTypes: Array<{
		name: string;
		price: number;
		quantity: number;
		description?: string;
	}>;

	// Additional Features
	mealOptions: string[];
	additionalFeatures: string[];
	dressCode: string;
	giftRegistryUrl: string;
	transportationDetails: string;
	accommodationDetails: string;
	specialRequirements: string;

	// Invitation Settings
	invitationSettings: {
		method: string[];
		template: string;
		customMessage: string;
		sendTime: "now" | "scheduled";
		scheduledTime?: Date;
	};

	// Event Photos
	eventPhotos: {
		mainPhoto: string | null;
		additionalPhotos: Array<{
			id: string;
			url: string;
			file?: File;
			title?: string;
			description?: string;
			isUploaded: boolean;
		}>;
		maxPhotos: number;
	};

	// Launch Settings
	status: "draft" | "published";
	softLaunch: boolean;
	analytics: boolean;

	// Additional Details (Optional expandable fields)
	additionalDetails: {
		ageRestrictions: {
			hasRestrictions: boolean;
			minAge?: number;
			maxAge?: number;
			requiresGuardian?: boolean;
			customMessage?: string;
			restrictionType?: "minimum" | "maximum" | "range" | "exact";
		};
		checkIn: {
			hasCustomCheckIn: boolean;
			checkInTime?: string;
			bufferTime?: number;
			checkInInstructions?: string;
			earlyCheckIn?: boolean;
			lateCheckIn?: boolean;
		};
		parking: {
			hasParkingInfo: boolean;
			parkingType?: "free" | "paid" | "valet" | "street" | "garage" | "lot";
			parkingCost?: number;
			parkingDetails?: string;
			parkingMapUrl?: string;
			validationAvailable?: boolean;
			reservationRequired?: boolean;
			alternativeOptions?: string;
		};
		faqs: Array<{
			id: string;
			question: string;
			answer: string;
			category?: string;
		}>;
		specialGuests: Array<{
			id: string;
			type: string;
			order: number;
			guests: Array<{
				id: string;
				name: string;
				title: string;
				bio: string;
				photo?: string;
				credentials: string[];
				socialLinks: {
					linkedin?: string;
					twitter?: string;
					website?: string;
				};
				isImported: boolean;
				importSource?: "linkedin" | "twitter" | "manual";
				groupId: string;
			}>;
		}>;
	};
	// Feature Event Settings
	featureEvent?: {
		isFeatured: boolean;
		featureType: "single" | "recurring";
		weeksFeatured?: number;
	};
}

interface BoothType {
	id: string;
	name: string;
	description?: string;
	price: number;
	currency: string;
	dimensions: {
		width: number;
		height: number;
	};
	maxAvailable: number;
	capacity?: number; // Maximum number of people allowed in the booth
	features?: string[];
	icon: string;
}

interface VendorBoothSettings {
	allowVendorBooths: boolean;
	boothTypes: BoothType[];
	maxBoothsPerVendor: number;
	paymentRequired: boolean;
	additionalTerms?: string;
	setupInstructions?: string;
	invitedVendors?: Array<{
		email: string;
		name?: string;
		businessName?: string;
	}>;
}

interface EventSession {
	id: string;
	date: Date;
	title?: string;
	startTime: string;
	endTime: string;
	locationId?: string;
	description?: string;
}

interface EventLocationSection {
	id: string;
	name: string;
	description?: string;
	capacity?: number;
}

interface EventLocation {
	id: string;
	name: string;
	address: string;
	type: "physical" | "virtual" | "hybrid";
	capacity?: number;
	features?: string[];
	virtualLink?: string;
	source?: "marketplace" | "manual";
	vendorName?: string;
	sections?: EventLocationSection[];
}

interface EventRecurrence {
	isRecurring: boolean;
	pattern: "daily" | "weekly" | "monthly" | "yearly" | "custom";
	frequency: number;
	customPattern?: "days" | "weeks" | "months" | "years";
	endType: "never" | "after" | "until";
	endValue?: number | Date;
	exceptions?: Date[];
	customDays?: number[]; // For weekly: 0=Sunday, 1=Monday, etc.
}

type SectionId = "details" | "photos" | "modules" | "optional";

export default function PreviewCreateEventV2Component() {
	// const navigate = useNavigate();
	//   const { toast } = useToast();
	const [currentStep, setCurrentStep] = useState(0);

	const [formData, setFormData] = useState<EventFormData>({
		visibility: "public",
		eventName: "",
		eventType: "",
		description: "",
		descriptionBlocks: [],
		theme: {
			primaryColor: "#8B5CF6",
			secondaryColor: "#3B82F6",
			accentColor: "#FF6347",
			logo: "",
			template: "",
			effects: [],
			mood: "",
			generatedName: "",
		},
		eventDates: {
			isMultiDay: false,
			startDate: null,
			endDate: null,
			startTime: "",
			endTime: "",
			timezone: "UTC",
			sessions: [],
		},
		startDate: null,
		endDate: null,
		time: "",
		timezone: "UTC",
		isRecurring: false,
		locations: [
			{
				id: "1",
				name: "",
				address: "",
				type: "physical",
				source: "manual",
				sections: [],
			},
		],
		recurrence: {
			isRecurring: false,
			pattern: "weekly",
			frequency: 1,
			endType: "never",
		},
		selectedModules: ["schedules", "announcements", "rsvp"],
		moduleConfigurations: {},
		expectedAttendees: 50,
		guestGroups: [],
		vipGuests: [],
		ticketTypes: [],
		mealOptions: [],
		additionalFeatures: [],
		dressCode: "",
		giftRegistryUrl: "",
		transportationDetails: "",
		accommodationDetails: "",
		specialRequirements: "",
		invitationSettings: {
			method: ["email"],
			template: "elegant",
			customMessage: "",
			sendTime: "now",
		},
		eventPhotos: {
			mainPhoto: null,
			additionalPhotos: [],
			maxPhotos: 10,
		},
		status: "draft",
		softLaunch: false,
		analytics: true,
		additionalDetails: {
			ageRestrictions: { hasRestrictions: false },
			checkIn: { hasCustomCheckIn: false },
			parking: { hasParkingInfo: false },
			faqs: [],
			specialGuests: [],
		},
		featureEvent: {
			isFeatured: false,
			featureType: "single",
			weeksFeatured: 1,
		},
	});

	// Load draft from sessionStorage
	useEffect(() => {
		const savedDraft = sessionStorage.getItem("eventDraft");
		if (savedDraft) {
			try {
				const parsedDraft = JSON.parse(savedDraft);
				setFormData(parsedDraft);
			} catch (error) {
				console.error("Failed to load draft:", error);
			}
		}
	}, []);

	// Auto-save draft
	useEffect(() => {
		const timer = setTimeout(() => {
			sessionStorage.setItem("eventDraft", JSON.stringify(formData));
		}, 1000);
		return () => clearTimeout(timer);
	}, [formData]);

	const handleUpdateFormData = (updates: Partial<EventFormData>) => {
		setFormData((prev) => ({
			...prev,
			...updates,
			// Backward compatibility
			startDate: updates.eventDates?.startDate ?? prev.startDate,
			endDate: updates.eventDates?.endDate ?? prev.endDate,
		}));
	};

	// Validation per step
	const isStepValid = (stepIndex: number): boolean => {
		switch (stepIndex) {
			case 0: // Essential Details
				return !!(formData.eventName && formData.eventDates.startDate);
			case 1: // Photos (optional)
				return true;
			case 2: // Modules (optional)
				return true;
			case 3: // Optional Details
				return true;
			default:
				return false;
		}
	};

	const isStepComplete = (stepIndex: number): boolean => {
		if (stepIndex > currentStep) return false;
		return isStepValid(stepIndex);
	};

	const isFormValid = () => {
		return isStepValid(0); // At minimum, first step must be valid
	};

	// Navigation handlers
	const handleNext = () => {
		if (currentStep < 3 && isStepValid(currentStep)) {
			setCurrentStep((prev) => prev + 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleStepClick = (stepIndex: number) => {
		// Only allow navigation to completed steps
		if (stepIndex < currentStep) {
			setCurrentStep(stepIndex);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key === "ArrowRight" &&
				isStepValid(currentStep) &&
				currentStep < 3
			) {
				handleNext();
			} else if (e.key === "ArrowLeft" && currentStep > 0) {
				handlePrevious();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currentStep, formData]);

	const handlePublish = async () => {
		if (!isFormValid()) {
			toast("Incomplete Information");
			return;
		}

		try {
			// const { UpsertEventAction } = await import("@/actions/event");
			// const response = await UpsertEventAction({
			//   name: formData.eventName,
			//   ...(formData.organizationId
			//     ? { organizationId: formData.organizationId }
			//     : {}),
			// });
			// if (response.success) {
			//   const savedEvents = JSON.parse(
			//     sessionStorage.getItem("savedEvents") || "[]",
			//   );
			//   const newEvent = {
			//     ...formData,
			//     id: `event-${Date.now()}`,
			//     createdAt: new Date().toISOString(),
			//     status: "published",
			//   };
			//   savedEvents.push(newEvent);
			//   sessionStorage.setItem("savedEvents", JSON.stringify(savedEvents));
			//   sessionStorage.removeItem("eventDraft");
			//   toast("🎉 Event Created!");
			// } else {
			//   toast.error(response.message || "Failed to create event");
			// }
		} catch (error) {
			console.error("Error creating event:", error);
			toast.error("Failed to create event. Please try again.");
		}
	};

	const handleSaveAsDraft = () => {
		const savedEvents = JSON.parse(
			sessionStorage.getItem("savedEvents") || "[]",
		);
		const draftEvent = {
			...formData,
			id: `draft-${Date.now()}`,
			createdAt: new Date().toISOString(),
			status: "draft",
		};
		savedEvents.push(draftEvent);
		sessionStorage.setItem("savedEvents", JSON.stringify(savedEvents));
		sessionStorage.removeItem("eventDraft");

		toast("Draft Saved");
		// toast({
		//   title: "Draft Saved",
		//   description: "Your event has been saved as a draft.",
		// });

		// navigate("/");
	};

	const sections = [
		{
			id: "details" as SectionId,
			title: "Essential Details",
			icon: <FileText className="h-5 w-5" />,
			content: (
				<EssentialDetails formData={formData} onUpdate={handleUpdateFormData} />
			),
			isRequired: true,
		},
		{
			id: "photos" as SectionId,
			title: "Event Photos",
			icon: <Camera className="h-5 w-5" />,
			content: (
				<PhotoGallerySection
					formData={formData}
					onUpdate={handleUpdateFormData}
				/>
			),
			isRequired: false,
		},
		{
			id: "modules" as SectionId,
			title: "Features & Modules",
			icon: <Puzzle className="h-5 w-5" />,
			content: (
				<ModuleFeaturesSection
					formData={formData}
					onUpdate={handleUpdateFormData}
				/>
			),
			isRequired: false,
		},
		{
			id: "optional" as SectionId,
			title: "Optional Details",
			icon: <Settings className="h-5 w-5" />,
			content: (
				<OptionalDetails formData={formData} onUpdate={handleUpdateFormData} />
			),
			isRequired: false,
		},
	];

	const currentSection = sections[currentStep];

	return (
		<div className="min-h-screen bg-transparent dark:bg-transparent">
			{/* Top Stepper */}
			<StepperProgress
				steps={sections.map((section, index) => ({
					id: section.id,
					title: section.title,
					icon: section.icon,
					isComplete: isStepComplete(index),
					isRequired: section.isRequired,
				}))}
				currentStep={currentStep}
				onStepClick={handleStepClick}
			/>

			{/* Main Content Area */}
			<div className="container mx-auto min-h-[calc(100vh-250px)] max-w-4xl px-4 py-8">
				{/* Page Header */}
				<div className="animate-in fade-in slide-in-from-bottom-4 mb-8 duration-500">
					<div className="mb-3 flex items-center gap-3">
						<div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-2.5">
							{currentSection.icon}
						</div>
						<div>
							<h1 className="text-foreground text-3xl font-bold">
								{currentSection.title}
							</h1>
							<p className="text-muted-foreground text-sm">
								Step {currentStep + 1} of {sections.length}
							</p>
						</div>
					</div>
				</div>

				{/* Current Step Content */}
				<div
					key={currentStep}
					className="animate-in fade-in slide-in-from-right-4 duration-500"
				>
					{currentSection.content}
				</div>
			</div>

			{/* Bottom Navigation */}
			<NavigationButtons
				currentStep={currentStep}
				totalSteps={sections.length}
				isCurrentStepValid={isStepValid(currentStep)}
				isLastStep={currentStep === sections.length - 1}
				onPrevious={handlePrevious}
				onNext={handleNext}
				onComplete={handlePublish}
				onSaveDraft={handleSaveAsDraft}
			/>
		</div>
	);
}
