import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ModuleDefinition } from "@/config/moduleRegistry";
import { Check, Lock, Star, Zap } from "lucide-react";
import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

interface ModuleActivationDialogProps {
	open: boolean;
	onClose: () => void;
	module: ModuleDefinition | null;
	onActivate: (moduleId: string) => void;
}

const ModuleActivationDialog = ({
	open,
	onClose,
	module,
	onActivate,
}: ModuleActivationDialogProps) => {
	const [isActivating, setIsActivating] = useState(false);
	// const { toast } = useToast();

	if (!module) return null;

	const handleActivate = async () => {
		setIsActivating(true);

		// Simulate activation process
		setTimeout(() => {
			onActivate(module.id);
			// toast({
			//   title: "Module Activated!",
			//   description: `${module.name} has been added to your event.`,
			// });
			setIsActivating(false);
			onClose();
		}, 1000);
	};

	const Icon = module.icon;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="bg-card max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3 text-xl">
						<div
							className={`flex h-12 w-12 items-center justify-center rounded-xl ${module.color}`}
						>
							<Icon className="h-6 w-6 text-white" />
						</div>
						Activate {module.name}
					</DialogTitle>
					<DialogDescription className="text-muted-foreground text-base">
						{module.description}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Features List */}
					<Card className="from-background to-muted/50 border-border bg-gradient-to-br">
						<CardContent className="p-6">
							<h3 className="text-foreground mb-4 flex items-center gap-2 font-semibold">
								<Star className="h-5 w-5 text-yellow-500" />
								What you'll get:
							</h3>
							<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
								{module.features.map((feature, index) => (
									<div key={index} className="flex items-center gap-2">
										<Check className="h-4 w-4 flex-shrink-0 text-green-500" />
										<span className="text-foreground text-sm">{feature}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Module Details */}
					<div className="grid grid-cols-3 gap-4 text-center">
						<div className="bg-muted/50 border-border rounded-lg border p-4">
							<Badge variant="outline" className="mb-2">
								{module.category}
							</Badge>
							<p className="text-muted-foreground text-xs">Category</p>
						</div>
						<div className="bg-muted/50 border-border rounded-lg border p-4">
							<Badge
								variant="secondary"
								className="mb-2 border-green-200 bg-green-100 text-green-800"
							>
								{module.status === "active" ? "Stable" : module.status}
							</Badge>
							<p className="text-muted-foreground text-xs">Status</p>
						</div>
						<div className="bg-muted/50 border-border rounded-lg border p-4">
							<div className="mb-2 flex items-center justify-center gap-1">
								<Zap className="h-4 w-4 text-yellow-500" />
								<span className="text-sm font-medium">Instant</span>
							</div>
							<p className="text-muted-foreground text-xs">Setup</p>
						</div>
					</div>

					<Separator />

					{/* Action Buttons */}
					<div className="flex gap-3">
						<Button
							variant="outline"
							onClick={onClose}
							className="flex-1"
							disabled={isActivating}
						>
							Cancel
						</Button>
						<Button
							onClick={handleActivate}
							className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
							disabled={isActivating}
						>
							{isActivating ? (
								<div className="flex items-center gap-2">
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
									Activating...
								</div>
							) : (
								<div className="flex items-center gap-2">
									<Lock className="h-4 w-4" />
									Activate Module
								</div>
							)}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ModuleActivationDialog;
