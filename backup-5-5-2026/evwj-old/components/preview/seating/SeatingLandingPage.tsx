import { useState } from "react";
import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import LocationCard from "./LocationCard";
import EmptySeatingState from "./EmptySeatingState";
import CreateArrangementDialog from "./CreateArrangementDialog";
import EventContextBanner from "./EventContextBanner";
import SeatingHero from "./SeatingHero";
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
import { Plus } from "lucide-react";

interface SeatingLandingPageProps {
	onNavigateToArrangement: (arrangementId: string) => void;
}

const SeatingLandingPage = ({
	onNavigateToArrangement,
}: SeatingLandingPageProps) => {
	const { hierarchy, addLocation, addSection, addArrangement } =
		useVenueHierarchy();
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [showAddLocationDialog, setShowAddLocationDialog] = useState(false);
	const [locationName, setLocationName] = useState("");

	const handleCreateArrangement = (data: {
		locationId?: string;
		locationName?: string;
		sectionId?: string;
		sectionName?: string;
		arrangementName: string;
		venueType: "table-based" | "seat-based";
	}) => {
		let finalLocationId = data.locationId;
		let finalSectionId = data.sectionId;
		let newArrangementId = "";

		// Create location if needed
		if (!finalLocationId && data.locationName) {
			addLocation({ name: data.locationName, description: "" });
			// Get the newly created location ID
			const newLocation = hierarchy.locations[hierarchy.locations.length - 1];
			if (newLocation) {
				finalLocationId = newLocation.id;
			}
		}

		// Create section if needed
		if (finalLocationId && !finalSectionId && data.sectionName) {
			addSection(finalLocationId, {
				name: data.sectionName,
				description: "",
				locationId: finalLocationId,
			});
			// Get the newly created section ID
			const location = hierarchy.locations.find(
				(l) => l.id === finalLocationId,
			);
			const newSection = location?.sections[location.sections.length - 1];
			if (newSection) {
				finalSectionId = newSection.id;
			}
		}

		// Create arrangement
		if (finalLocationId && finalSectionId) {
			addArrangement(finalSectionId, {
				sectionId: finalSectionId,
				name: data.arrangementName,
				description: "",
				startTime: "",
				endTime: "",
				venueType: data.venueType,
				tables: [],
				chairs: [],
				seats: [],
				seatSections: [],
				venueObjects: [],
				isActive: true,
			});

			// Get the newly created arrangement ID
			const location = hierarchy.locations.find(
				(l) => l.id === finalLocationId,
			);
			const section = location?.sections.find((s) => s.id === finalSectionId);
			const newArrangement =
				section?.arrangements[section.arrangements.length - 1];
			if (newArrangement) {
				newArrangementId = newArrangement.id;
			}

			// Small delay to allow state to update before navigating
			setTimeout(() => {
				onNavigateToArrangement(newArrangementId);
			}, 100);
		}

		setShowCreateDialog(false);
	};

	const handleAddLocation = () => {
		if (locationName.trim()) {
			addLocation({ name: locationName.trim(), description: "" });
			setShowAddLocationDialog(false);
			setLocationName("");
		}
	};

	// Check if there are any locations
	const hasLocations = hierarchy.locations.length > 0;

	return (
		<div className="">
			{/* Event Context Banner */}
			<EventContextBanner />

			{!hasLocations ? (
				<EmptySeatingState onCreateFirst={() => setShowCreateDialog(true)} />
			) : (
				<div className="w-full px-4 sm:px-6 lg:px-8 space-y-6 pb-8">
					{/* Hero Section */}
					<SeatingHero onCreateNew={() => setShowCreateDialog(true)} />

					{/* Locations & Arrangements */}
					<div className="space-y-6">
						{hierarchy.locations.map((location) => (
							<LocationCard
								key={location.id}
								location={location}
								onNavigateToArrangement={onNavigateToArrangement}
							/>
						))}
						
						{/* Add Location Button */}
						<div className="flex justify-center pt-4">
							<Button
								onClick={() => setShowAddLocationDialog(true)}
								variant="outline"
								size="lg"
								className="flex items-center gap-2 border-dashed hover:border-solid"
							>
								<Plus className="h-5 w-5" />
								Add New Location
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Create Arrangement Dialog */}
			<CreateArrangementDialog
				open={showCreateDialog}
				onOpenChange={setShowCreateDialog}
				onCreate={handleCreateArrangement}
				locations={hierarchy.locations}
			/>

			{/* Add Location Dialog */}
			<Dialog open={showAddLocationDialog} onOpenChange={setShowAddLocationDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Location</DialogTitle>
						<DialogDescription>
							Create a new venue location for your event
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="location-name">Location Name</Label>
							<Input
								id="location-name"
								placeholder="e.g., Main Reception Hall"
								value={locationName}
								onChange={(e) => setLocationName(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && locationName.trim()) {
										handleAddLocation();
									}
								}}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowAddLocationDialog(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={handleAddLocation}
							disabled={!locationName.trim()}
						>
							Create
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SeatingLandingPage;
