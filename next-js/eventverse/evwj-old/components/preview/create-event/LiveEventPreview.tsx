import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import EventCardPreview from "./EventCardPreview";
import { EventFormData } from "./PreviewCreateEventV2Component";

interface LiveEventPreviewProps {
	formData: EventFormData;
	selectedPoster: any | null;
}

const LiveEventPreview = ({
	formData,
	selectedPoster,
}: LiveEventPreviewProps) => {
	const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">(
		"desktop",
	);

	const deviceIcons = {
		desktop: Monitor,
		tablet: Tablet,
		mobile: Smartphone,
	};

	const deviceWidths = {
		desktop: "max-w-full",
		tablet: "max-w-md",
		mobile: "max-w-sm",
	};

	return (
		<Card className="sticky top-24 border-2 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Eye className="text-primary h-5 w-5" />
						<CardTitle className="text-lg">Live Preview</CardTitle>
					</div>
					<Badge variant="secondary" className="bg-primary/10 text-primary">
						What guests see
					</Badge>
				</div>

				{/* Device Toggle */}
				<div className="bg-muted mt-4 flex gap-1 rounded-lg p-1">
					{(["desktop", "tablet", "mobile"] as const).map((device) => {
						const Icon = deviceIcons[device];
						return (
							<Button
								key={device}
								variant={deviceView === device ? "default" : "ghost"}
								size="sm"
								onClick={() => setDeviceView(device)}
								className={cn(
									"h-8 flex-1",
									deviceView === device && "shadow-sm",
								)}
							>
								<Icon className="h-4 w-4" />
							</Button>
						);
					})}
				</div>
			</CardHeader>
			<CardContent>
				<div
					className={cn(
						"mx-auto transition-all duration-300",
						deviceWidths[deviceView],
					)}
				>
					<div
						className={cn(
							"transition-transform duration-300",
							deviceView === "mobile" && "scale-90",
							deviceView === "tablet" && "scale-95",
						)}
					>
						<EventCardPreview formData={formData} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default LiveEventPreview;
