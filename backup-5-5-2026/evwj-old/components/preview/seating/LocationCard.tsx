import { Badge } from "@/components/ui/badge";
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
import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import type { VenueLocation } from "@/types/venue";
import { ChevronDown, ChevronRight, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ArrangementCard from "./ArrangementCard";

interface LocationCardProps {
	location: VenueLocation;
	onNavigateToArrangement: (arrangementId: string) => void;
}

const LocationCard = ({
	location,
	onNavigateToArrangement,
}: LocationCardProps) => {
	const { addArrangement, addSection, deleteSection, deleteLocation, hierarchy } = useVenueHierarchy();
	const [expandedSections, setExpandedSections] = useState<Set<string>>(
		new Set(location.sections.map((s) => s.id)),
	);
	const [showQuickAddDialog, setShowQuickAddDialog] = useState(false);
	const [showAddSectionDialog, setShowAddSectionDialog] = useState(false);
	const [showDeleteLocationDialog, setShowDeleteLocationDialog] = useState(false);
	const [showDeleteSectionDialog, setShowDeleteSectionDialog] = useState(false);
	const [sectionToDelete, setSectionToDelete] = useState<string>("");
	const [selectedSectionId, setSelectedSectionId] = useState<string>("");
	const [arrangementName, setArrangementName] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [venueType, setVenueType] = useState<"table-based" | "seat-based">(
		"table-based",
	);
	const [sectionName, setSectionName] = useState("");

	const toggleSection = (sectionId: string) => {
		setExpandedSections((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(sectionId)) {
				newSet.delete(sectionId);
			} else {
				newSet.add(sectionId);
			}
			return newSet;
		});
	};

	const handleQuickAdd = (sectionId: string) => {
		setSelectedSectionId(sectionId);
		setShowQuickAddDialog(true);
		setArrangementName("");
		setStartTime("");
		setEndTime("");
		setVenueType("table-based");
	};

	const handleCreateArrangement = () => {
		if (arrangementName.trim() && selectedSectionId) {
			const trimmedName = arrangementName.trim();
			addArrangement(selectedSectionId, {
				sectionId: selectedSectionId,
				name: trimmedName,
				description: "",
				startTime: startTime || "",
				endTime: endTime || "",
				venueType,
				tables: [],
				chairs: [],
				seats: [],
				seatSections: [],
				venueObjects: [],
				isActive: true,
			});

			// Find the newly created arrangement by name after state updates
			setTimeout(() => {
				const updatedLocation = hierarchy.locations.find(
					(l) => l.id === location.id,
				);
				const section = updatedLocation?.sections.find(
					(s) => s.id === selectedSectionId,
				);
				// Find by name since it's the most recent one with this name
				const createdArrangement = section?.arrangements.find(
					(a) => a.name === trimmedName,
				);

				if (createdArrangement) {
					onNavigateToArrangement(createdArrangement.id);
				}
			}, 150);

			setShowQuickAddDialog(false);
			setArrangementName("");
			setStartTime("");
			setEndTime("");
			setSelectedSectionId("");
		}
	};

	const handleAddSection = () => {
		if (sectionName.trim()) {
			addSection(location.id, {
				name: sectionName.trim(),
				description: "",
				locationId: location.id,
			});
			setShowAddSectionDialog(false);
			setSectionName("");
		}
	};

	const handleDeleteSection = (sectionId: string) => {
		setSectionToDelete(sectionId);
		setShowDeleteSectionDialog(true);
	};

	const confirmDeleteSection = () => {
		if (sectionToDelete) {
			deleteSection(sectionToDelete);
			setShowDeleteSectionDialog(false);
			setSectionToDelete("");
		}
	};

	const handleDeleteLocation = () => {
		setShowDeleteLocationDialog(true);
	};

	const confirmDeleteLocation = () => {
		deleteLocation(location.id);
		setShowDeleteLocationDialog(false);
	};

	const totalArrangements = location.sections.reduce(
		(sum, section) => sum + section.arrangements.length,
		0,
	);

	return (
		<div className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] rounded-xl border">
			{/* Gradient Overlay */}
			<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50 pointer-events-none" />
			
			{/* Content */}
			<div className="relative z-10 p-4 sm:p-6 space-y-4">
				{/* Location Header */}
				<div className="flex items-center justify-between gap-3 pb-4 border-b border-border/50">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
							<MapPin className="h-5 w-5 text-primary" />
						</div>
						<div>
							<h2 className="text-xl font-bold text-foreground">{location.name}</h2>
							<span className="text-sm text-muted-foreground">
								{location.sections.length} section{location.sections.length !== 1 ? "s" : ""} • {totalArrangements} arrangement{totalArrangements !== 1 ? "s" : ""}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button
							onClick={() => setShowAddSectionDialog(true)}
							variant="outline"
							size="sm"
							className="flex items-center gap-2"
						>
							<Plus className="h-4 w-4" />
							Add Section
						</Button>
						<Button
							onClick={handleDeleteLocation}
							variant="outline"
							size="sm"
							className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
						>
							<Trash2 className="h-4 w-4" />
							Delete Location
						</Button>
					</div>
				</div>

				{/* Sections */}
				<div className="space-y-3">
				{location.sections.map((section) => {
					const isExpanded = expandedSections.has(section.id);
					return (
						<div
							key={section.id}
							className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] rounded-lg border"
						>
							{/* Gradient Overlay */}
							<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50 pointer-events-none" />
							
							{/* Section Header */}
							<div className="relative z-10 flex items-center justify-between px-4 py-3">
								<button
									onClick={() => toggleSection(section.id)}
									className="flex-1 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
								>
									<div className="flex items-center gap-2">
										{isExpanded ? (
											<ChevronDown className="h-4 w-4 text-muted-foreground" />
										) : (
											<ChevronRight className="h-4 w-4 text-muted-foreground" />
										)}
										<span className="font-medium text-foreground">
											{section.name}
										</span>
										<Badge variant="secondary" className="text-xs">
											{section.arrangements.length}
										</Badge>
									</div>
								</button>
								<Button
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteSection(section.id);
									}}
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>

							{/* Arrangements */}
							{isExpanded && (
								<div className="relative z-10">
									{section.arrangements.length > 0 ? (
										<div className="flex flex-wrap gap-4 p-4">
											{section.arrangements.map((arrangement) => (
												<ArrangementCard
													key={arrangement.id}
													arrangement={arrangement}
													onEdit={() => onNavigateToArrangement(arrangement.id)}
												/>
											))}
										</div>
									) : (
										<div className="text-muted-foreground p-8 text-center text-sm">
											No arrangements in this section yet
										</div>
									)}
									
									{/* Quick Add Button */}
									<div className="px-4 pb-4">
										<Button
											onClick={(e) => {
												e.stopPropagation();
												handleQuickAdd(section.id);
											}}
											variant="outline"
											size="sm"
											className="w-full flex items-center justify-center gap-2 border-dashed hover:border-solid"
										>
											<Plus className="h-4 w-4" />
											Add Arrangement
										</Button>
									</div>
								</div>
							)}
						</div>
					);
				})}
				</div>
			</div>

			{/* Quick Add Arrangement Dialog */}
			<Dialog open={showQuickAddDialog} onOpenChange={setShowQuickAddDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Arrangement</DialogTitle>
						<DialogDescription>
							Create a new seating arrangement in this section
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="arrangement-name">Arrangement Name</Label>
							<Input
								id="arrangement-name"
								placeholder="e.g., Dinner Setup"
								value={arrangementName}
								onChange={(e) => setArrangementName(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="start-time">Start Time</Label>
								<Input
									id="start-time"
									type="time"
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="end-time">End Time</Label>
								<Input
									id="end-time"
									type="time"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label>Venue Type</Label>
							<RadioGroup
								value={venueType}
								onValueChange={(value) =>
									setVenueType(value as "table-based" | "seat-based")
								}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="table-based" id="table-based" />
									<Label htmlFor="table-based" className="font-normal cursor-pointer">
										Host assign seating
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="seat-based" id="seat-based" />
									<Label htmlFor="seat-based" className="font-normal cursor-pointer">
										Guest purchase seats
									</Label>
								</div>
							</RadioGroup>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowQuickAddDialog(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={handleCreateArrangement}
							disabled={!arrangementName.trim()}
						>
							Create
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Add Section Dialog */}
			<Dialog open={showAddSectionDialog} onOpenChange={setShowAddSectionDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Section</DialogTitle>
						<DialogDescription>
							Create a new section in {location.name}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="section-name">Section Name</Label>
							<Input
								id="section-name"
								placeholder="e.g., Main Floor"
								value={sectionName}
								onChange={(e) => setSectionName(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && sectionName.trim()) {
										handleAddSection();
									}
								}}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowAddSectionDialog(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={handleAddSection}
							disabled={!sectionName.trim()}
						>
							Create
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Location Confirmation Dialog */}
			<Dialog open={showDeleteLocationDialog} onOpenChange={setShowDeleteLocationDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Location</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete "{location.name}"? This will also delete all sections and arrangements within this location. This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowDeleteLocationDialog(false)}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={confirmDeleteLocation}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Section Confirmation Dialog */}
			<Dialog open={showDeleteSectionDialog} onOpenChange={setShowDeleteSectionDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Section</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete "{location.sections.find(s => s.id === sectionToDelete)?.name}"? This will also delete all arrangements within this section. This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								setShowDeleteSectionDialog(false);
								setSectionToDelete("");
							}}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={confirmDeleteSection}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default LocationCard;
