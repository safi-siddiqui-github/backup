import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { VenueLocation } from "@/types/venue";
import { useState } from "react";

interface CreateArrangementDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreate: (data: {
		locationId?: string;
		locationName?: string;
		sectionId?: string;
		sectionName?: string;
		arrangementName: string;
		venueType: "table-based" | "seat-based";
	}) => void;
	locations: VenueLocation[];
}

const CreateArrangementDialog = ({
	open,
	onOpenChange,
	onCreate,
	locations,
}: CreateArrangementDialogProps) => {
	const [step, setStep] = useState<"location" | "section" | "arrangement">(
		"location",
	);
	const [locationMode, setLocationMode] = useState<"existing" | "new">(
		"existing",
	);
	const [sectionMode, setSectionMode] = useState<"existing" | "new">(
		"existing",
	);

	const [selectedLocationId, setSelectedLocationId] = useState<string>("");
	const [newLocationName, setNewLocationName] = useState("");

	const [selectedSectionId, setSelectedSectionId] = useState<string>("");
	const [newSectionName, setNewSectionName] = useState("");

	const [arrangementName, setArrangementName] = useState("");
	const [venueType, setVenueType] = useState<"table-based" | "seat-based">(
		"table-based",
	);

	const selectedLocation = locations.find((l) => l.id === selectedLocationId);

	const handleReset = () => {
		setStep("location");
		setLocationMode("existing");
		setSectionMode("existing");
		setSelectedLocationId("");
		setNewLocationName("");
		setSelectedSectionId("");
		setNewSectionName("");
		setArrangementName("");
		setVenueType("table-based");
	};

	const handleCreate = () => {
		onCreate({
			locationId: locationMode === "existing" ? selectedLocationId : undefined,
			locationName: locationMode === "new" ? newLocationName : undefined,
			sectionId: sectionMode === "existing" ? selectedSectionId : undefined,
			sectionName: sectionMode === "new" ? newSectionName : undefined,
			arrangementName,
			venueType,
		});
		handleReset();
	};

	const canProceedFromLocation =
		(locationMode === "existing" && selectedLocationId) ||
		(locationMode === "new" && newLocationName.trim());

	const canProceedFromSection =
		(sectionMode === "existing" && selectedSectionId) ||
		(sectionMode === "new" && newSectionName.trim());

	const canCreate = arrangementName.trim() && venueType;

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				onOpenChange(open);
				if (!open) handleReset();
			}}
		>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create New Seating Arrangement</DialogTitle>
					<DialogDescription>
						{step === "location" &&
							"Choose or create a location for your arrangement"}
						{step === "section" &&
							"Choose or create a section within the location"}
						{step === "arrangement" && "Configure your seating arrangement"}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					{/* Step 1: Location */}
					{step === "location" && (
						<>
							<RadioGroup
								value={locationMode}
								onValueChange={(v: any) => setLocationMode(v)}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="existing" id="existing-location" />
									<Label htmlFor="existing-location">
										Use existing location
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="new" id="new-location" />
									<Label htmlFor="new-location">Create new location</Label>
								</div>
							</RadioGroup>

							{locationMode === "existing" ? (
								<div className="space-y-2">
									<Label>Select Location</Label>
									<Select
										value={selectedLocationId}
										onValueChange={setSelectedLocationId}
									>
										<SelectTrigger>
											<SelectValue placeholder="Choose a location" />
										</SelectTrigger>
										<SelectContent>
											{locations.map((location) => (
												<SelectItem key={location.id} value={location.id}>
													{location.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							) : (
								<div className="space-y-2">
									<Label htmlFor="new-location-name">Location Name</Label>
									<Input
										id="new-location-name"
										value={newLocationName}
										onChange={(e) => setNewLocationName(e.target.value)}
										placeholder="e.g., Main Reception Hall"
									/>
								</div>
							)}
						</>
					)}

					{/* Step 2: Section */}
					{step === "section" && (
						<>
							<RadioGroup
								value={sectionMode}
								onValueChange={(v: any) => setSectionMode(v)}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="existing" id="existing-section" />
									<Label htmlFor="existing-section">Use existing section</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="new" id="new-section" />
									<Label htmlFor="new-section">Create new section</Label>
								</div>
							</RadioGroup>

							{sectionMode === "existing" ? (
								<div className="space-y-2">
									<Label>Select Section</Label>
									<Select
										value={selectedSectionId}
										onValueChange={setSelectedSectionId}
									>
										<SelectTrigger>
											<SelectValue placeholder="Choose a section" />
										</SelectTrigger>
										<SelectContent>
											{selectedLocation?.sections.map((section) => (
												<SelectItem key={section.id} value={section.id}>
													{section.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							) : (
								<div className="space-y-2">
									<Label htmlFor="new-section-name">Section Name</Label>
									<Input
										id="new-section-name"
										value={newSectionName}
										onChange={(e) => setNewSectionName(e.target.value)}
										placeholder="e.g., Main Floor"
									/>
								</div>
							)}
						</>
					)}

					{/* Step 3: Arrangement */}
					{step === "arrangement" && (
						<>
							<div className="space-y-2">
								<Label htmlFor="arrangement-name">Arrangement Name</Label>
								<Input
									id="arrangement-name"
									value={arrangementName}
									onChange={(e) => setArrangementName(e.target.value)}
									placeholder="e.g., Dinner Seating"
								/>
							</div>

							<div className="space-y-2">
								<Label>Venue Type</Label>
								<RadioGroup
									value={venueType}
									onValueChange={(v: any) => setVenueType(v)}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="table-based" id="table-based" />
										<Label htmlFor="table-based" className="font-normal">
											Table-based (Restaurants, Weddings)
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="seat-based" id="seat-based" />
										<Label htmlFor="seat-based" className="font-normal">
											Seat-based (Theaters, Stadiums)
										</Label>
									</div>
								</RadioGroup>
							</div>
						</>
					)}
				</div>

				<DialogFooter>
					{step !== "location" && (
						<Button
							variant="outline"
							onClick={() => {
								if (step === "section") setStep("location");
								if (step === "arrangement") setStep("section");
							}}
						>
							Back
						</Button>
					)}

					{step === "location" && (
						<Button
							onClick={() => setStep("section")}
							disabled={!canProceedFromLocation}
						>
							Next
						</Button>
					)}

					{step === "section" && (
						<Button
							onClick={() => setStep("arrangement")}
							disabled={!canProceedFromSection}
						>
							Next
						</Button>
					)}

					{step === "arrangement" && (
						<Button onClick={handleCreate} disabled={!canCreate}>
							Create Arrangement
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateArrangementDialog;
