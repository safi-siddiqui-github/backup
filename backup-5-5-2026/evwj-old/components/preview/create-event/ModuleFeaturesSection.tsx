import {
	Armchair,
	BarChart3,
	Calendar,
	Camera,
	CheckCircle,
	CheckSquare,
	Crown,
	DollarSign,
	FileText,
	Gamepad2,
	Megaphone,
	Star,
	Ticket,
	Zap,
} from "lucide-react";
import DynamicPricingDisplay from "./DynamicPricingDisplay";
import ModuleCard from "./ModuleCard";
import { EventFormData } from "./PreviewCreateEventV2Component";

interface Module {
	id: string;
	name: string;
	description: string;
	icon: typeof Calendar;
	features: string[];
	price: number;
	recommended?: boolean;
	popular?: boolean;
	premium?: boolean;
}

interface ModuleCategory {
	title: string;
	description: string;
	icon: typeof CheckCircle;
	modules: Module[];
}

const moduleCategories: Record<string, ModuleCategory> = {
	essential: {
		title: "Essential Modules",
		description: "Core functionality every event needs",
		icon: CheckCircle,
		modules: [
			{
				id: "schedules",
				name: "Event Schedule",
				description: "Timeline and agenda management",
				icon: Calendar,
				features: ["Custom timeline", "Session management", "Speaker profiles"],
				price: 0,
			},
			{
				id: "announcements",
				name: "Announcements",
				description: "Keep guests informed with updates",
				icon: Megaphone,
				features: [
					"Real-time updates",
					"Push notifications",
					"Priority messaging",
				],
				price: 0,
			},
			{
				id: "rsvp",
				name: "RSVP Management",
				description: "Guest responses and attendance tracking",
				icon: CheckSquare,
				features: [
					"Response tracking",
					"Dietary preferences",
					"Plus-one management",
				],
				price: 0,
			},
		],
	},
	engagement: {
		title: "Guest Engagement",
		description: "Interactive features to enhance experience",
		icon: Zap,
		modules: [
			{
				id: "games",
				name: "Interactive Games",
				description: "Fun activities and competitions",
				icon: Gamepad2,
				features: ["Trivia games", "Photo contests", "Leaderboards"],
				price: 15,
			},
			{
				id: "survey",
				name: "Surveys & Feedback",
				description: "Collect guest opinions and feedback",
				icon: FileText,
				features: ["Custom surveys", "Real-time results", "Analytics"],
				price: 10,
			},
			{
				id: "media",
				name: "Photo & Media Sharing",
				description: "Collaborative photo galleries",
				icon: Camera,
				features: ["Shared albums", "Live photo feed", "QR code sharing"],
				price: 20,
			},
		],
	},
	business: {
		title: "Business Features",
		description: "Professional event management tools",
		icon: Star,
		modules: [
			{
				id: "ticketing",
				name: "Ticketing System",
				description: "Sell tickets and manage registrations",
				icon: Ticket,
				features: [
					"Multiple ticket types",
					"Payment processing",
					"Promo codes",
				],
				price: 25,
			},
			{
				id: "seating",
				name: "Seating Management",
				description: "Table assignments and floor plans",
				icon: Armchair,
				features: [
					"Visual seating charts",
					"Auto-assignment",
					"Guest preferences",
				],
				price: 30,
			},
			{
				id: "budgeting",
				name: "Budget Planner",
				description: "Track expenses and manage costs",
				icon: DollarSign,
				features: ["Expense tracking", "Vendor management", "Budget analytics"],
				price: 20,
			},
		],
	},
	analytics: {
		title: "Analytics & Insights",
		description: "Data-driven event optimization",
		icon: Crown,
		modules: [
			{
				id: "analytics",
				name: "Event Analytics",
				description: "Detailed insights and reporting",
				icon: BarChart3,
				features: [
					"Attendance tracking",
					"Engagement metrics",
					"Custom reports",
				],
				price: 35,
			},
		],
	},
};

interface ModuleFeaturesSectionProps {
	formData: EventFormData;
	onUpdate: (updates: Partial<EventFormData>) => void;
}

const ModuleFeaturesSection = ({
	formData,
	onUpdate,
}: ModuleFeaturesSectionProps) => {
	const toggleModule = (moduleId: string) => {
		const isSelected = formData.selectedModules.includes(moduleId);
		const newModules = isSelected
			? formData.selectedModules.filter((id) => id !== moduleId)
			: [...formData.selectedModules, moduleId];

		onUpdate({ selectedModules: newModules });
	};

	const getRecommendedModules = () => {
		const eventTypeModules: Record<string, string[]> = {
			Wedding: ["schedules", "rsvp", "media", "seating"],
			Corporate: ["schedules", "announcements", "analytics", "survey"],
			Birthday: ["rsvp", "media", "games"],
			Cultural: ["schedules", "media", "survey"],
			Charity: ["ticketing", "analytics", "budgeting"],
			Festival: ["ticketing", "schedules", "media", "analytics"],
			Business: ["rsvp", "survey", "analytics"],
			Personal: ["rsvp", "media", "games"],
			Workshop: ["schedules", "survey", "analytics"],
			Conference: ["schedules", "ticketing", "analytics", "survey"],
		};

		return (
			eventTypeModules[formData.eventType] || [
				"schedules",
				"rsvp",
				"announcements",
			]
		);
	};

	const calculateTotalCost = () => {
		let total = 0;
		Object.values(moduleCategories).forEach((category) => {
			category.modules.forEach((module) => {
				if (formData.selectedModules.includes(module.id)) {
					total += module.price;
				}
			});
		});
		return total;
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<p className="text-muted-foreground text-sm">
					{formData.selectedModules.length} modules selected
				</p>
				<div className="text-right">
					<div className="text-foreground text-lg font-semibold">
						${calculateTotalCost()}{" "}
						<span className="text-muted-foreground text-sm font-normal">
							per month
						</span>
					</div>
				</div>
			</div>

			<DynamicPricingDisplay
				selectedModules={formData.selectedModules}
				eventType={formData.eventType}
				expectedAttendees={formData.expectedAttendees}
			/>

			{Object.entries(moduleCategories).map(([categoryKey, category]) => {
				const CategoryIcon = category.icon;
				return (
					<div key={categoryKey} className="space-y-4">
						<div className="flex items-center gap-2">
							<CategoryIcon className="text-primary h-4 w-4" />
							<div>
								<h3 className="text-base font-semibold">{category.title}</h3>
								<p className="text-muted-foreground text-sm">
									{category.description}
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{category.modules.map((module) => {
								const isSelected = formData.selectedModules.includes(module.id);
								const isRecommended = getRecommendedModules().includes(
									module.id,
								);

								return (
									<ModuleCard
										key={module.id}
										module={module}
										isSelected={isSelected}
										isRecommended={false}
										onToggle={() => toggleModule(module.id)}
									/>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ModuleFeaturesSection;
