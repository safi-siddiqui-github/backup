import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleDefinition, moduleRegistry } from "@/config/moduleRegistry";
import { Lock } from "lucide-react";

interface EnhancedModuleGridProps {
	selectedModules: string[];
	onModuleClick: (moduleId: string) => void;
	onActivateModule: (module: ModuleDefinition) => void;
}

export const EnhancedModuleGrid = ({
	selectedModules,
	onModuleClick,
	onActivateModule,
}: EnhancedModuleGridProps) => {
	// Separate modules into active and available
	const activeModules = moduleRegistry.filter((module) => {
		const moduleMapping = { schedule: "schedules", budget: "budgeting" };
		// const eventModuleId = moduleMapping[module.id] || module.id;
		const eventModuleId = module.id;
		return (
			selectedModules.includes(eventModuleId) ||
			selectedModules.includes(module.id)
		);
	});

	const availableModules = moduleRegistry.filter((module) => {
		const moduleMapping = { schedule: "schedules", budget: "budgeting" };
		// const eventModuleId = moduleMapping[module.id] || module.id;
		const eventModuleId = module.id;
		return !(
			selectedModules.includes(eventModuleId) ||
			selectedModules.includes(module.id)
		);
	});

	const renderModuleCard = (
		// moduleData: Partial<{ icon: ElementType; id: "schedule"|"budget" }>,
		moduleData: ModuleDefinition,
		isActive: boolean,
		index: number,
	) => {
		const Icon = moduleData.icon;
		const isFree = ["schedule", "announcements", "rsvp"].includes(
			moduleData?.id ?? "",
		);
		const moduleMapping = { schedule: "schedules", budget: "budgeting" };
		// const eventModuleId = moduleMapping[moduleData?.id] || moduleData.id;
		const eventModuleId = moduleData.id;

		return (
			<Card
				key={moduleData.id}
				onClick={() => {
					if (isActive) {
						onModuleClick(eventModuleId);
					} else {
						onActivateModule(moduleData);
					}
				}}
				className={`group relative cursor-pointer transition-all duration-300 ${
					isActive
						? "border-border hover:border-primary/50 animate-fade-in shadow-md hover:-translate-y-1 hover:shadow-xl"
						: "animate-fade-in opacity-60 shadow-sm hover:opacity-80"
				} `}
				style={{ animationDelay: `${index * 50}ms` }}
			>
				{/* Lock Overlay for Inactive Modules */}
				{!isActive && (
					<>
						<div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
							<div className="bg-background/95 rounded-full p-3 shadow-lg backdrop-blur-sm">
								<Lock className="text-muted-foreground h-6 w-6" />
							</div>
						</div>
						<div className="bg-muted absolute top-3 right-3 z-20 rounded-full p-1.5 backdrop-blur-sm">
							<Lock className="text-muted-foreground h-3 w-3" />
						</div>
					</>
				)}

				<CardHeader className="p-4 pb-2 text-center">
					<div
						className={`mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${
							isActive
								? isFree
									? "bg-success shadow-success/30 shadow-lg"
									: moduleData.color + " shadow-lg"
								: "bg-muted"
						} `}
						style={
							isActive
								? { boxShadow: `0 0 20px ${moduleData.color}40` }
								: undefined
						}
					>
						<Icon className="h-7 w-7 text-white" />
					</div>
					<CardTitle
						className={`text-sm font-semibold tracking-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}
					>
						{moduleData.name}
					</CardTitle>
					<div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
						{isActive && isFree && (
							<Badge
								variant="secondary"
								className="bg-success/10 text-success border-success/20 text-xs"
							>
								Free
							</Badge>
						)}
						{!isActive && (
							<Badge
								variant="outline"
								className="bg-warning/10 text-warning border-warning/20 text-xs"
							>
								Activate
							</Badge>
						)}
						<Badge variant="outline" className="text-xs">
							{moduleData.category}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="p-4 pt-0 text-center">
					<p
						className={`text-xs ${isActive ? "text-muted-foreground" : "text-muted-foreground/70"}`}
					>
						{moduleData.description}
					</p>
					{isActive && (
						<div className="text-primary mt-3 text-xs font-medium">
							Click to manage →
						</div>
					)}
				</CardContent>
			</Card>
		);
	};

	return (
		<div className="space-y-5">
			{/* Active Modules */}
			{activeModules.length > 0 && (
				<div>
					<div className="mb-3">
						<h3 className="text-foreground mb-1 text-base font-semibold tracking-tight">
							Active Modules
						</h3>
						<p className="text-muted-foreground text-xs">
							Click any module to manage its settings and content
						</p>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{activeModules.map((module, index) =>
							renderModuleCard(module, true, index),
						)}
					</div>
				</div>
			)}

			{/* Available Modules */}
			{availableModules.length > 0 && (
				<div>
					<div className="mb-3">
						<h3 className="text-foreground mb-1 text-base font-semibold tracking-tight">
							Available Modules
						</h3>
						<p className="text-muted-foreground text-xs">
							Activate additional modules to enhance your event
						</p>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{availableModules.map((module, index) =>
							renderModuleCard(module, false, index),
						)}
					</div>
				</div>
			)}
		</div>
	);
};
