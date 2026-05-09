"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EventDetailsSidebar } from "./EventDetailsSidebar";
import { EventHeroSection } from "./EventHeroSection";
import { EventOverviewTabs } from "./EventOverviewTabs";
import { FeatureDiscoveryBar } from "./FeatureDiscoveryBar";
import { GoLiveTracker } from "./GoLiveTracker";
import ModuleActivationDialog from "./ModuleActivationDialog";
import { mockHostingEvents } from "./mockHostingEvents";

const EventDashboard = () => {
	// const navigate = useNavigate();
	// const { toast } = useToast();
	const [activationModule, setActivationModule] = useState(null);
	// const [eventModules, setEventModules] = useState(event.selectedModules);
	const [eventModules, setEventModules] = useState(mockHostingEvents[0]);

	const onEdit = () => {};

	// Ensure announcements module is always included
	// const allSelectedModules = eventModules?.includes("announcements")
	//   ? eventModules
	//   : [...eventModules, "announcements"];
	const allSelectedModules = ["announcements"];

	const handleModuleActivation = (moduleId: any) => {
		// const updatedModules = [...eventModules, moduleId];
		// setEventModules(updatedModules);
		// event.selectedModules = updatedModules;

		toast("Module Activated");
		// toast({
		// title: "Module Activated",
		// description: `${getModuleById(moduleId)?.name} is now available for your event.`,
		// });
	};

	const handleModuleClick = (moduleId: string | number) => {
		const moduleMapping = {
			schedules: "schedule",
			budgeting: "budget",
		};

		// const mappedId = moduleMapping[moduleId] || moduleId;
		// navigate(`/modules/${mappedId}?eventId=${event.id}`);
	};

	return (
		<div className="bg-background min-h-screen pb-6">
			{/* Fixed Header with Back Button */}
			<div className="bg-background/95 border-border fixed top-0 right-0 left-0 z-50 border-b shadow-sm backdrop-blur-md">
				<div className="mx-auto max-w-7xl px-6 py-3">
					<Button
						variant="ghost"
						size="sm"
						// onClick={onBack}
						className="hover:bg-accent/50"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Dashboard
					</Button>
				</div>
			</div>

			{/* Add padding to prevent content from going under fixed header */}
			<div className="pt-[52px]">
				{/* Compact Hero Section */}
				<EventHeroSection event={eventModules} onEdit={onEdit} />

				{/* Two-Column Layout: Sidebar + Main Content */}
				<div className="mx-auto mt-6 max-w-7xl px-6">
					<div className="flex w-full gap-6">
						{/* Left Sidebar - Desktop Only */}
						<div className="hidden lg:block">
							<EventDetailsSidebar
								event={eventModules}
								selectedModules={allSelectedModules}
								onEdit={onEdit}
								onModuleClick={handleModuleClick}
							/>
						</div>

						{/* Main Content Area */}
						<div className="min-w-0 flex-1">
							{/* Feature Discovery Bar */}
							<FeatureDiscoveryBar
								selectedModules={allSelectedModules}
								onModuleClick={handleModuleClick}
								onActivateModule={(module) => setActivationModule(module)}
							/>

							<EventOverviewTabs
								event={eventModules}
								selectedModules={allSelectedModules}
								onModuleClick={handleModuleClick}
								onActivateModule={(module) => setActivationModule(module)}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Sticky Bottom Go Live Tracker */}
			{eventModules.status !== "published" && <GoLiveTracker event={event} />}

			{/* Module Activation Dialog */}
			<ModuleActivationDialog
				module={activationModule}
				open={!!activationModule}
				onClose={() => setActivationModule(null)}
				onActivate={handleModuleActivation}
			/>
		</div>
	);
};

export default EventDashboard;
