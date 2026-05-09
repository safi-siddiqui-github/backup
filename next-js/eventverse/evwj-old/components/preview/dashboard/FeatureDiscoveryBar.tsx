import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Sparkles } from "lucide-react";
import { getModuleById, moduleRegistry } from "@/config/moduleRegistry";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { EnhancedModuleGrid } from "./EnhancedModuleGrid";

interface FeatureDiscoveryBarProps {
	selectedModules: string[];
	onModuleClick: (moduleId: string) => void;
	onActivateModule: (module: any) => void;
}

export const FeatureDiscoveryBar = ({
	selectedModules,
	onModuleClick,
	onActivateModule,
}: FeatureDiscoveryBarProps) => {
	const [showAllModules, setShowAllModules] = useState(false);

	// Get active modules (limit to 4 for display)
	const activeModules = selectedModules
		.map((id) => getModuleById(id))
		.filter(Boolean)
		.slice(0, 4);

	// Get suggested modules (modules not yet activated)
	const suggestedModules = moduleRegistry
		.filter((module) => !selectedModules.includes(module.id))
		.filter((module) => module.status === "active")
		.slice(0, 3);

	return (
		<>
			{/* Full Module Grid Modal */}
			<Dialog open={showAllModules} onOpenChange={setShowAllModules}>
				<DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Add Features to Your Event</DialogTitle>
						<DialogDescription>
							Activate powerful features to enhance your event management
							experience
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4">
						<EnhancedModuleGrid
							selectedModules={selectedModules}
							onModuleClick={onModuleClick}
							onActivateModule={(module) => {
								onActivateModule(module);
								setShowAllModules(false);
							}}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
