import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, MapPin, Video } from "lucide-react";
import { useState } from "react";
// import { EventFormData } from "../EnhancedEventCreationDialog";
import { cn } from "@/lib/utils";
import { EventFormData } from "./PreviewCreateEventV2Component";

interface Props {
	formData: EventFormData;
	onUpdate: (updates: Partial<EventFormData>) => void;
}

const LocationManagerV2 = ({ formData, onUpdate }: Props) => {
	const location = formData.locations[0];
	const [type, setType] = useState<"physical" | "virtual" | "hybrid">(
		location?.type || "physical",
	);

	const handleTypeChange = (newType: "physical" | "virtual" | "hybrid") => {
		setType(newType);
		onUpdate({
			locations: [
				{
					...location,
					type: newType,
				},
			],
		});
	};

	const updateLocation = (updates: any) => {
		onUpdate({
			locations: [
				{
					...location,
					...updates,
				},
			],
		});
	};

	return (
		<div className="space-y-4">
			{/* Venue Type Selection */}
			<div className="space-y-2">
				<Label>Venue Type *</Label>
				<div className="grid grid-cols-3 gap-3">
					<Card
						className={cn(
							"cursor-pointer border-2 transition-all",
							type === "physical"
								? "border-primary bg-primary/5"
								: "border-border hover:border-primary/30",
						)}
						onClick={() => handleTypeChange("physical")}
					>
						<CardContent className="p-4 text-center">
							<MapPin className="text-primary mx-auto mb-2 h-5 w-5" />
							<p className="text-sm font-medium">Physical</p>
						</CardContent>
					</Card>

					<Card
						className={cn(
							"cursor-pointer border-2 transition-all",
							type === "virtual"
								? "border-primary bg-primary/5"
								: "border-border hover:border-primary/30",
						)}
						onClick={() => handleTypeChange("virtual")}
					>
						<CardContent className="p-4 text-center">
							<Video className="text-primary mx-auto mb-2 h-5 w-5" />
							<p className="text-sm font-medium">Virtual</p>
						</CardContent>
					</Card>

					<Card
						className={cn(
							"cursor-pointer border-2 transition-all",
							type === "hybrid"
								? "border-primary bg-primary/5"
								: "border-border hover:border-primary/30",
						)}
						onClick={() => handleTypeChange("hybrid")}
					>
						<CardContent className="p-4 text-center">
							<Globe className="text-primary mx-auto mb-2 h-5 w-5" />
							<p className="text-sm font-medium">Hybrid</p>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Physical Location Fields */}
			{(type === "physical" || type === "hybrid") && (
				<Card className="border !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
					<CardContent className="space-y-4 p-4">
						<div className="space-y-2">
							<Label>Venue Name *</Label>
							<Input
								placeholder="Enter venue name"
								className="h-10"
								value={location?.name || ""}
								onChange={(e) => updateLocation({ name: e.target.value })}
							/>
						</div>

						<div className="space-y-2">
							<Label>Address *</Label>
							<Textarea
								placeholder="Enter full address"
								className="min-h-[80px]"
								value={location?.address || ""}
								onChange={(e) => updateLocation({ address: e.target.value })}
							/>
							<p className="text-muted-foreground text-xs">
								Street address, city, state, zip code
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Capacity</Label>
								<Input
									type="number"
									placeholder="e.g., 150"
									className="h-10"
									value={location?.capacity || ""}
									onChange={(e) =>
										updateLocation({
											capacity: e.target.value
												? parseInt(e.target.value)
												: undefined,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label>Parking Available</Label>
								<Select
									value={location?.features?.includes("parking") ? "yes" : "no"}
									onValueChange={(value) => {
										const features = location?.features || [];
										if (value === "yes" && !features.includes("parking")) {
											updateLocation({ features: [...features, "parking"] });
										} else if (value === "no") {
											updateLocation({
												features: features.filter((f) => f !== "parking"),
											});
										}
									}}
								>
									<SelectTrigger className="h-10">
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="yes">Yes</SelectItem>
										<SelectItem value="no">No</SelectItem>
										<SelectItem value="street">Street parking</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Virtual Meeting Link */}
			{(type === "virtual" || type === "hybrid") && (
				<Card className="border !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
					<CardContent className="space-y-4 p-4">
						<div className="space-y-2">
							<Label>Meeting Link</Label>
							<Input
								placeholder="https://zoom.us/j/..."
								className="h-10"
								value={location?.virtualLink || ""}
								onChange={(e) =>
									updateLocation({ virtualLink: e.target.value })
								}
							/>
							<p className="text-muted-foreground text-xs">
								You can add this later if not available yet
							</p>
						</div>

						<div className="space-y-2">
							<Label>Meeting ID / Password</Label>
							<Input
								placeholder="Optional"
								className="h-10"
								value={
									location?.virtualLink
										? location.virtualLink.split("?password=")[1] || ""
										: ""
								}
								onChange={(e) => {
									const baseLink = location?.virtualLink?.split("?")[0] || "";
									const newLink = e.target.value
										? `${baseLink}?password=${e.target.value}`
										: baseLink;
									updateLocation({ virtualLink: newLink });
								}}
							/>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default LocationManagerV2;
