import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DndContext,
	DragOverlay,
	DragEndEvent,
	DragStartEvent,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LocationContextProvider } from "@/hooks/useLocationContext";
import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import type {
	Chair,
	Guest,
	Seat,
	Table,
	VendorPresetUsage,
	VenueObject,
	VenuePreset,
} from "@/types/venue";
import { resetArrangement, smartAssignGuests } from "@/utils/smartAssignment";
import {
	Armchair,
	ArrowLeft,
	ArrowRight,
	Box,
	Palette,
	Plus,
	Store,
	TableIcon,
	Table as TableIconLucide,
	Users,
} from "lucide-react";
import React, { useRef, useState, useCallback, useMemo } from "react";
import ChairConfigDialog from "./ChairConfigDialog";
import CompactNavigationHeader from "./CompactNavigationHeader";
import CompactVenueHeader from "./CompactVenueHeader";
import EnhancedTableConfigDialog from "./EnhancedTableConfigDialog";
import GuestAssignmentPanel from "./GuestAssignmentPanel";
import { mockGuests } from "./mockGuestData";
import PrintDialog from "./PrintDialog";

import SeatingAnalytics from "./SeatingAnalytics";
import SeatingCanvas from "./SeatingCanvas";
import KonvaSeatingCanvas from "./KonvaSeatingCanvas";
import SeatSwapDialog from "./SeatSwapDialog";
import SimpleLayoutDesigner from "./SimpleLayoutDesigner";
import VendorPresetSelector from "./VendorPresetSelector";
import VenueObjectDialog from "./VenueObjectDialog";
import SmartAssignDialog from "./SmartAssignDialog";

interface EnhancedSeatingModuleProps {
	eventId?: string;
	onBack?: () => void;
}

const EnhancedSeatingModuleContent = ({ onBack }: { onBack?: () => void }) => {
	const { currentArrangement, updateArrangement } = useVenueHierarchy();

	const [unassignedGuests, setUnassignedGuests] = useState<Guest[]>(mockGuests);
	const [draggedGuest, setDraggedGuest] = useState<Guest | null>(null);

	const [selectedTable, setSelectedTable] = useState<Table | null>(null);
	const [selectedChair, setSelectedChair] = useState<Chair | null>(null);
	const [selectedVenueObject, setSelectedVenueObject] =
		useState<VenueObject | null>(null);
	const [showTableConfig, setShowTableConfig] = useState(false);
	const [showChairConfig, setShowChairConfig] = useState(false);

	const [showSeatSwap, setShowSeatSwap] = useState(false);
	const [showVenueObjectConfig, setShowVenueObjectConfig] = useState(false);
	const [showPrintDialog, setShowPrintDialog] = useState(false);
	const [showAnalytics, setShowAnalytics] = useState(false);
	const [showTimeline, setShowTimeline] = useState(false);
	const [viewMode, setViewMode] = useState<"design" | "preview">("design");
	const [isCreatingTable, setIsCreatingTable] = useState(false);
	const [isCreatingChair, setIsCreatingChair] = useState(false);
	const [isCreatingVenueObject, setIsCreatingVenueObject] = useState(false);
	const canvasRef = useRef<any>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);

	const [showLayoutDesigner, setShowLayoutDesigner] = useState(false);
	const [layoutOpacity, setLayoutOpacity] = useState(0.3);
	const [showVendorPresets, setShowVendorPresets] = useState(false);
	const [currentPresetUsage, setCurrentPresetUsage] =
		useState<VendorPresetUsage | null>(null);
	const [showSmartAssignDialog, setShowSmartAssignDialog] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [ticketMode, setTicketMode] = useState(false);

	if (!currentArrangement) {
		return (
			<LocationContextProvider>
				<div className="flex h-full flex-col">
					<CompactNavigationHeader />
					<div className="flex flex-1 items-center justify-center">
						<div className="text-center">
							<h3 className="text-lg font-semibold text-foreground">
								No Arrangement Selected
							</h3>
							<p className="text-muted-foreground">
								Please select or create an arrangement to get started.
							</p>
						</div>
					</div>
				</div>
			</LocationContextProvider>
		);
	}

	const handleSmartAssign = () => {
		// Open confirmation dialog
		setShowSmartAssignDialog(true);
	};

	const handleConfirmSmartAssign = () => {
		const { tables: updatedTables, unassigned } = smartAssignGuests(
			unassignedGuests,
			currentArrangement?.tables ?? [],
		);

		updateArrangement(currentArrangement.id, { tables: updatedTables });
		setUnassignedGuests(unassigned);
		setShowSmartAssignDialog(false);
	};

	const handleReset = () => {
		const resetTables = resetArrangement(currentArrangement?.tables ?? []);
		updateArrangement(currentArrangement.id, { tables: resetTables });

		// Reset chairs
		const resetChairs = (currentArrangement.chairs || []).map((chair) => ({
			...chair,
			guest: undefined,
		}));

		// Restore all guests to unassigned
		const allGuests = [
			...unassignedGuests,
			...(currentArrangement?.tables?.flatMap((table) => table.guests) ?? []),
			...(currentArrangement.chairs || [])
				.filter((chair) => chair.guest)
				.map((chair) => chair.guest!),
		];
		updateArrangement(currentArrangement.id, { chairs: resetChairs });
		setUnassignedGuests(allGuests);
	};

	const handleExport = async () => {
		if (!canvasRef.current?.exportImage) {
			console.error("Canvas export method not available");
			return;
		}

		try {
			const canvas = await canvasRef.current.exportImage();
			if (canvas) {
				const link = document.createElement("a");
				link.download = `seating-chart-${currentArrangement.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.png`;
				link.href = canvas.toDataURL("image/png", 1.0);
				link.click();
			}
		} catch (error) {
			console.error("Export failed:", error);
			alert("Failed to export diagram. Please try again.");
		}
	};

	const handlePrint = () => {
		setShowPrintDialog(true);
	};

	const handleUpdateTable = useCallback((tableId: number, updates: Partial<Table>) => {
		const updatedTables = currentArrangement?.tables?.map((table) =>
			table.id === tableId ? { ...table, ...updates } : table,
		);
		updateArrangement(currentArrangement.id, { tables: updatedTables });
	}, [currentArrangement, updateArrangement]);

	const handleUpdateSeat = useCallback((seatId: number, updates: Partial<Seat>) => {
		const updatedSeats = currentArrangement?.seats?.map((seat) =>
			seat.id === seatId ? { ...seat, ...updates } : seat,
		);
		updateArrangement(currentArrangement.id, { seats: updatedSeats });
	}, [currentArrangement, updateArrangement]);

	const handleUpdateVenueObject = useCallback((
		objectId: number,
		updates: Partial<VenueObject>,
	) => {
		const updatedObjects = currentArrangement?.venueObjects?.map((obj) =>
			obj.id === objectId ? { ...obj, ...updates } : obj,
		);
		updateArrangement(currentArrangement.id, { venueObjects: updatedObjects });
	}, [currentArrangement, updateArrangement]);

	const handleUpdateChair = useCallback((chairId: number, updates: Partial<Chair>) => {
		const updatedChairs = (currentArrangement.chairs || []).map((chair) =>
			chair.id === chairId ? { ...chair, ...updates } : chair,
		);
		updateArrangement(currentArrangement.id, { chairs: updatedChairs });
	}, [currentArrangement, updateArrangement]);

	const handleDeleteTable = (tableId: number) => {
		const updatedTables = currentArrangement?.tables?.filter(
			(table) => table.id !== tableId,
		);
		updateArrangement(currentArrangement.id, { tables: updatedTables });
		setSelectedTable(null);
	};

	const handleDeleteChair = (chairId: number) => {
		const updatedChairs = (currentArrangement.chairs || []).filter(
			(chair) => chair.id !== chairId,
		);
		updateArrangement(currentArrangement.id, { chairs: updatedChairs });
		setSelectedChair(null);
	};

	const handleDeleteVenueObject = (objectId: number) => {
		const updatedObjects = currentArrangement?.venueObjects?.filter(
			(obj) => obj.id !== objectId,
		);
		updateArrangement(currentArrangement.id, { venueObjects: updatedObjects });
		setSelectedVenueObject(null);
	};

	const handleAddTable = () => {
		setIsCreatingTable(true);
		setShowTableConfig(true);
	};

	const handleAddChair = () => {
		setIsCreatingChair(true);
		setShowChairConfig(true);
	};

	const handleAddVenueObject = () => {
		setIsCreatingVenueObject(true);
		setShowVenueObjectConfig(true);
	};

	const handleAssignChair = (chair: Chair) => {
		console.log("Chair assignment via dialog removed");
	};

	const handleAssignGuestFromPanel = useCallback((guest: Guest, tableOrChairId: number, seatNumber?: number) => {
		console.log("🎯 handleAssignGuestFromPanel called:", { guest: guest.name, tableOrChairId, seatNumber });

		// Check if this is a table assignment (has seatNumber) or chair assignment (no seatNumber)
		if (seatNumber !== undefined) {
			// This is a table assignment
			const table = currentArrangement?.tables?.find((t) => t.id === tableOrChairId);
			if (!table) {
				console.error("Table not found:", tableOrChairId);
				return;
			}

			// Check if seat is already occupied
			if (table.seatAssignments?.[seatNumber]) {
				console.warn("Seat already occupied");
				return;
			}

			// Assign guest to the seat
			const updatedSeatAssignments = {
				...table.seatAssignments,
				[seatNumber]: guest,
			};

			const updatedTables = currentArrangement?.tables?.map((t) =>
				t.id === tableOrChairId ? { ...t, seatAssignments: updatedSeatAssignments } : t,
			);

			updateArrangement(currentArrangement.id, { tables: updatedTables });
			setUnassignedGuests((prev) => prev.filter((g) => g.id !== guest.id));

			// Select the table to highlight it on the canvas
			setSelectedTable(table);
		} else {
			// This is a chair assignment
			const chair = (currentArrangement.chairs || []).find((c) => c.id === tableOrChairId);
			if (!chair) {
				console.error("Chair not found:", tableOrChairId);
				return;
			}

			// Check if chair is already occupied
			if (chair.guest) {
				console.warn("Chair already occupied");
				return;
			}

			// Assign guest to the chair
			const updatedChairs = (currentArrangement.chairs || []).map((c) =>
				c.id === tableOrChairId ? { ...c, guest } : c,
			);

			updateArrangement(currentArrangement.id, { chairs: updatedChairs });
			setUnassignedGuests((prev) => prev.filter((g) => g.id !== guest.id));

			// Select the chair to highlight it on the canvas
			setSelectedChair(chair);
		}
	}, [currentArrangement, updateArrangement]);

	const handleUnassignGuest = (guest: Guest, id: number) => {
		// Check if this is a table or chair based on the guest assignment
		const table = currentArrangement?.tables?.find((t) =>
			Object.values(t.seatAssignments || {}).some((g) => g.id === guest.id),
		);

		if (table) {
			// Handle table unassignment
			const updatedSeatAssignments = { ...table.seatAssignments };
			Object.keys(updatedSeatAssignments).forEach((seatNumber) => {
				if (updatedSeatAssignments[Number(seatNumber)]?.id === guest.id) {
					delete updatedSeatAssignments[Number(seatNumber)];
				}
			});

			const updatedTables = currentArrangement?.tables?.map((t) =>
				t.id === table.id
					? { ...t, seatAssignments: updatedSeatAssignments }
					: t,
			);
			updateArrangement(currentArrangement.id, { tables: updatedTables });
		} else {
			// Handle chair unassignment
			const updatedChairs = (currentArrangement.chairs || []).map((chair) =>
				chair.id === id ? { ...chair, guest: undefined } : chair,
			);
			updateArrangement(currentArrangement.id, { chairs: updatedChairs });
		}

		setUnassignedGuests((prev) => [...prev, guest]);
	};

	const handleDropGuestToSeat = useCallback((tableId: number, seatNumber: number) => {
		if (!draggedGuest) return;

		const table = currentArrangement?.tables?.find((t) => t.id === tableId);
		if (!table) return;

		// Check if seat is already occupied
		if (table.seatAssignments?.[seatNumber]) {
			console.warn("Seat already occupied");
			return;
		}

		// Assign guest to the seat
		const updatedSeatAssignments = {
			...table.seatAssignments,
			[seatNumber]: draggedGuest,
		};

		const updatedTables = currentArrangement?.tables?.map((t) =>
			t.id === tableId ? { ...t, seatAssignments: updatedSeatAssignments } : t,
		);

		updateArrangement(currentArrangement.id, { tables: updatedTables });
		setUnassignedGuests((prev) => prev.filter((g) => g.id !== draggedGuest.id));
		setDraggedGuest(null);
	}, [draggedGuest, currentArrangement, updateArrangement]);

	const handleDropGuestToChair = useCallback((chairId: number) => {
		if (!draggedGuest) return;

		const chair = (currentArrangement.chairs || []).find((c) => c.id === chairId);
		if (!chair) return;

		// Check if chair is already occupied
		if (chair.guest) {
			console.warn("Chair already occupied");
			return;
		}

		// Assign guest to the chair
		const updatedChairs = (currentArrangement.chairs || []).map((c) =>
			c.id === chairId ? { ...c, guest: draggedGuest as Guest } : c,
		);

		updateArrangement(currentArrangement.id, { chairs: updatedChairs });
		setUnassignedGuests((prev) => prev.filter((g) => g.id !== draggedGuest.id));
		setDraggedGuest(null);
	}, [draggedGuest, currentArrangement, updateArrangement]);

	const handleSaveTableConfig = (config: any) => {
		if (isCreatingTable) {
			const newTable: Table = {
				id: Date.now(),
				name: config.name,
				seats: config.seats,
				shape: config.shape,
				x: 50 + (currentArrangement?.tables?.length ?? 0) * 50,
				y: 50 + (currentArrangement?.tables?.length ?? 0) * 50,
				guests: [],
				targetGroup: config.targetGroup,
				scale: config.scale,
				notes: config.notes,
				rotation: config.rotation,
				seatAssignments: {},
			};

			const updatedTables = [...(currentArrangement?.tables ?? []), newTable];
			updateArrangement(currentArrangement.id, { tables: updatedTables });
		} else if (selectedTable) {
			handleUpdateTable(selectedTable.id, config);
		}
		setShowTableConfig(false);
		setSelectedTable(null);
		setIsCreatingTable(false);
	};

	const handleSaveChairConfig = (config: any) => {
		if (isCreatingChair) {
			const baseX = 100 + (currentArrangement.chairs || []).length * 50;
			const baseY = 100 + (currentArrangement.chairs || []).length * 50;
			const gridId =
				config.layoutType === "grid" ? `grid-${Date.now()}` : undefined;

			const newChairs: Chair[] = [];

			if (config.layoutType === "single") {
				newChairs.push({
					id: Date.now(),
					name: config.name,
					x: baseX,
					y: baseY,
					targetGroup: config.targetGroup,
					notes: config.notes,
					rotation: config.rotation,
					gridId,
				});
			} else {
				// Create grid of chairs
				const chairSpacing = 40;
				for (let row = 0; row < config.rows; row++) {
					for (let col = 0; col < config.columns; col++) {
						newChairs.push({
							id: Date.now() + row * config.columns + col,
							name: `${config.name} R${row + 1}C${col + 1}`,
							x: baseX + col * chairSpacing,
							y: baseY + row * chairSpacing,
							targetGroup: config.targetGroup,
							notes: config.notes,
							rotation: config.rotation,
							gridId,
						});
					}
				}
			}

			const updatedChairs = [
				...(currentArrangement.chairs || []),
				...newChairs,
			];
			updateArrangement(currentArrangement.id, { chairs: updatedChairs });
		} else if (selectedChair) {
			handleUpdateChair(selectedChair.id, config);
		}
		setShowChairConfig(false);
		setSelectedChair(null);
		setIsCreatingChair(false);
	};

	const handleSaveVenueObjectConfig = (config: Partial<VenueObject>) => {
		if (isCreatingVenueObject) {
			const newObject: VenueObject = {
				id: Date.now(),
				name: config.name || "New Object",
				type: config.type || "stage",
				x: 50 + (currentArrangement?.venueObjects?.length ?? 0) * 50,
				y: 50 + (currentArrangement?.venueObjects?.length ?? 0) * 50,
				width: config.width || 200,
				height: config.height || 100,
				rotation: config.rotation || 0,
				color: config.color || "#8B5CF6",
			};

			const updatedObjects = [
				...(currentArrangement?.venueObjects ?? []),
				newObject,
			];
			updateArrangement(currentArrangement.id, {
				venueObjects: updatedObjects,
			});
		} else if (selectedVenueObject) {
			handleUpdateVenueObject(selectedVenueObject.id, config);
		}
		setShowVenueObjectConfig(false);
		setSelectedVenueObject(null);
		setIsCreatingVenueObject(false);
	};

	const handleSaveLayout = (layoutData: any) => {
		const arrangementUpdates: any = { layoutData };

		// Merge tables - preserve seatAssignments and guests from current arrangement if table exists
		arrangementUpdates.tables = (layoutData.tables || []).map((newTable: Table) => {
			const existingTable = currentArrangement.tables?.find((t) => t.id === newTable.id);
			if (existingTable) {
				return {
					...newTable,
					seatAssignments: existingTable.seatAssignments || {},
					// Also sync the guests array which might be used in some views
					guests: existingTable.seatAssignments ? Object.values(existingTable.seatAssignments) : (existingTable.guests || []),
				};
			}
			return newTable;
		});

		// Merge chairs - preserve guest from current arrangement if chair exists
		arrangementUpdates.chairs = (layoutData.chairs || []).map((newChair: Chair) => {
			const existingChair = currentArrangement.chairs?.find((c) => c.id === newChair.id);
			if (existingChair) {
				return { ...newChair, guest: existingChair.guest };
			}
			return newChair;
		});

		// Overwrite venue objects
		arrangementUpdates.venueObjects = layoutData.venueObjects || [];

		updateArrangement(currentArrangement.id, arrangementUpdates);
	};
	const handleUseAsBackground = (layoutData: any) => {
		const arrangementUpdates: any = { layoutData };

		// Merge tables - preserve seatAssignments and guests
		arrangementUpdates.tables = (layoutData.tables || []).map((newTable: Table) => {
			const existingTable = currentArrangement.tables?.find((t) => t.id === newTable.id);
			if (existingTable) {
				return {
					...newTable,
					seatAssignments: existingTable.seatAssignments || {},
					guests: existingTable.seatAssignments ? Object.values(existingTable.seatAssignments) : (existingTable.guests || []),
				};
			}
			return newTable;
		});

		// Merge chairs - preserve guest
		arrangementUpdates.chairs = (layoutData.chairs || []).map((newChair: Chair) => {
			const existingChair = currentArrangement.chairs?.find((c) => c.id === newChair.id);
			if (existingChair) {
				return { ...newChair, guest: existingChair.guest };
			}
			return newChair;
		});

		// Overwrite venue objects
		arrangementUpdates.venueObjects = layoutData.venueObjects || [];

		updateArrangement(currentArrangement.id, arrangementUpdates);
		setShowLayoutDesigner(false);
		setViewMode("design");
	};

	const handleSelectVendorPreset = (
		preset: VenuePreset,
		usageType: "as-is" | "template" | "modified" | "hybrid",
	) => {
		// Create preset usage tracking
		const presetUsage: VendorPresetUsage = {
			id: `usage-${Date.now()}`,
			presetId: preset.id,
			eventId: currentArrangement?.sectionId ?? "0", // Using section ID as event reference
			hostId: "current-host", // This would come from auth context
			usageType,
			status: "active",
			bookedAt: new Date().toISOString(),
			modifications: [],
		};

		setCurrentPresetUsage(presetUsage);

		// Apply the preset based on usage type
		const arrangementUpdates: any = {};

		if (usageType === "as-is") {
			// Import exact layout without modifications
			arrangementUpdates.tables = preset.tables;
			arrangementUpdates.chairs = preset.chairs;
			arrangementUpdates.seats = preset.seats;
			arrangementUpdates.seatSections = preset.seatSections;
			arrangementUpdates.venueObjects = preset.venueObjects;
			arrangementUpdates.layoutData = preset.layoutData;
		} else if (usageType === "template") {
			// Copy structure but allow full customization
			arrangementUpdates.tables = preset?.tables?.map((table) => ({
				...table,
				id: Date.now() + Math.random(), // New IDs for full independence
				guests: [],
				seatAssignments: {},
			}));
			arrangementUpdates.chairs = preset?.chairs?.map((chair) => ({
				...chair,
				id: Date.now() + Math.random(),
				guest: undefined,
			}));
			arrangementUpdates.seats = preset.seats;
			arrangementUpdates.seatSections = preset.seatSections;
			arrangementUpdates.venueObjects = preset?.venueObjects?.map((obj) => ({
				...obj,
				id: Date.now() + Math.random(),
			}));
			arrangementUpdates.layoutData = preset.layoutData;
		} else {
			// Modified or hybrid - import with vendor connection maintained
			arrangementUpdates.tables = preset?.tables?.map((table) => ({
				...table,
				vendorPresetId: preset.id, // Mark as vendor-connected
				guests: [],
				seatAssignments: {},
			}));
			arrangementUpdates.chairs = preset?.chairs?.map((chair) => ({
				...chair,
				vendorPresetId: preset.id,
				guest: undefined,
			}));
			arrangementUpdates.seats = preset.seats;
			arrangementUpdates.seatSections = preset.seatSections;
			arrangementUpdates.venueObjects = preset?.venueObjects?.map((obj) => ({
				...obj,
				vendorPresetId: preset.id,
			}));
			arrangementUpdates.layoutData = preset.layoutData;
		}

		// Update the arrangement
		updateArrangement(currentArrangement.id, arrangementUpdates);
		setShowVendorPresets(false);

		// Show success message based on usage type
		const messages = {
			"as-is":
				"Vendor preset imported as-is. Layout is locked to vendor specifications.",
			template: "Vendor preset used as template. You can modify freely.",
			modified: "Vendor preset imported with modification tracking enabled.",
			hybrid:
				"Vendor preset imported in hybrid mode. Vendor elements are locked, custom additions allowed.",
		};

		// This would show a toast in a real implementation
		console.log(messages[usageType]);
	};

	const handleSwapSeats = (
		tableId: number,
		seatNumber1: number,
		seatNumber2: number,
	) => {
		const table = currentArrangement?.tables?.find((t) => t.id === tableId);
		if (!table || !table.seatAssignments) return;

		const guest1 = table.seatAssignments[seatNumber1];
		const guest2 = table.seatAssignments[seatNumber2];

		if (!guest1 || !guest2) return;

		const updatedSeatAssignments = { ...table.seatAssignments };
		updatedSeatAssignments[seatNumber1] = guest2;
		updatedSeatAssignments[seatNumber2] = guest1;

		const updatedTables = currentArrangement?.tables?.map((t) =>
			t.id === tableId ? { ...t, seatAssignments: updatedSeatAssignments } : t,
		);

		updateArrangement(currentArrangement.id, { tables: updatedTables });
	};

	const totalAssigned =
		currentArrangement.venueType === "seat-based"
			? currentArrangement?.seats?.filter((s) => s.status === "assigned").length
			: (currentArrangement?.tables?.reduce(
				(sum, table) => sum + Object.keys(table.seatAssignments || {}).length,
				0,
			) ?? 0) +
			(currentArrangement.chairs || []).filter((chair) => chair.guest).length;

	const totalCapacity =
		currentArrangement.venueType === "seat-based"
			? currentArrangement?.seats?.length
			: (currentArrangement?.tables?.reduce(
				(sum, table) => sum + table.seats,
				0,
			) ?? 0) + (currentArrangement.chairs || []).length;

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setDraggedGuest(active.data.current as Guest);
	};

	const handleDragMove = (event: DragEndEvent) => { // DragMoveEvent type is similar
		if (!canvasRef.current || !canvasRef.current.highlightSeatAtPosition) return;

		const { delta, activatorEvent } = event;
		// Calculate pointer position
		const pointerEvent = activatorEvent as PointerEvent | MouseEvent | TouchEvent;
		let clientX, clientY;

		if ('clientX' in pointerEvent) {
			clientX = pointerEvent.clientX;
			clientY = pointerEvent.clientY;
		} else if ('touches' in pointerEvent && pointerEvent.changedTouches.length > 0) {
			clientX = pointerEvent.changedTouches[0].clientX;
			clientY = pointerEvent.changedTouches[0].clientY;
		}

		if (clientX !== undefined && clientY !== undefined && canvasContainerRef.current) {
			const rect = canvasContainerRef.current.getBoundingClientRect();
			const finalX = clientX + delta.x - rect.left;
			const finalY = clientY + delta.y - rect.top;
			canvasRef.current.highlightSeatAtPosition({ x: finalX, y: finalY });
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { over, active, delta } = event;
		setDraggedGuest(null);

		// Clear any highlight
		if (canvasRef.current && canvasRef.current.highlightSeatAtPosition) {
			canvasRef.current.highlightSeatAtPosition(null);
		}

		// The canvasRef.current should expose a method to check intersection
		if (canvasRef.current && canvasRef.current.getSeatAtPosition) {

			const pointerEvent = event.activatorEvent as PointerEvent | MouseEvent | TouchEvent;
			let clientX, clientY;

			if ('clientX' in pointerEvent) {
				clientX = pointerEvent.clientX;
				clientY = pointerEvent.clientY;
			} else if ('touches' in pointerEvent && pointerEvent.changedTouches.length > 0) {
				clientX = pointerEvent.changedTouches[0].clientX;
				clientY = pointerEvent.changedTouches[0].clientY;
			}

			if (clientX !== undefined && clientY !== undefined && canvasContainerRef.current) {
				const rect = canvasContainerRef.current.getBoundingClientRect();
				// Add delta to initial position to get final position, then subtract container offset
				const finalX = clientX + delta.x - rect.left;
				const finalY = clientY + delta.y - rect.top;

				const result = canvasRef.current.getSeatAtPosition({ x: finalX, y: finalY });
				if (result) {
					const { tableId, seatNumber, chairId } = result;
					const guest = active.data.current as Guest;

					if (tableId !== undefined && seatNumber !== undefined) {
						handleAssignGuestFromPanel(guest, tableId, seatNumber);
					} else if (chairId !== undefined) {
						handleAssignGuestFromPanel(guest, chairId);
					}
				}
			}
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	);

	return (
		<LocationContextProvider>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragMove={handleDragMove}
				onDragEnd={handleDragEnd}
			>
				<div className="flex h-full flex-col">
					{/* Ultra-Compact Navigation */}
					<CompactNavigationHeader />

					{/* Compact Action Header */}
					<CompactVenueHeader
						onSmartAssign={handleSmartAssign}
						onReset={handleReset}
						onExport={handleExport}
						onPrint={handlePrint}
						totalAssigned={Number(totalAssigned)}
						totalCapacity={Number(totalCapacity)}
						unassignedCount={unassignedGuests.length}
						ticketMode={ticketMode}
						onToggleTicketMode={setTicketMode}
					/>

					{/* Minimal Content Header */}
					<div className="flex h-8 items-center justify-between border-b bg-background px-3">
						<div className="flex items-center gap-2 text-sm">
							{onBack && (
								<Button
									variant="ghost"
									size="sm"
									onClick={onBack}
									className="h-6 text-xs"
								>
									<ArrowLeft className="mr-1 h-3 w-3" />
									Back
								</Button>
							)}
							<Users className="h-4 w-4 text-purple-600" />
							<span className="font-medium">Seating</span>
							<Badge variant="outline" className="h-5 text-xs">
								{currentArrangement?.venueType === "seat-based" ? (
									<>
										<Armchair className="mr-1 h-3 w-3" />
										Seats
									</>
								) : (
									<>
										<TableIcon className="mr-1 h-3 w-3" />
										Tables
									</>
								)}
							</Badge>
						</div>

						<div className="flex items-center gap-1">
							<Button
								variant={
									!showLayoutDesigner && viewMode === "design"
										? "default"
										: "outline"
								}
								size="sm"
								onClick={() => {
									setShowLayoutDesigner(false);
									setViewMode("design");
								}}
								className="h-6 text-xs"
							>
								Seating
							</Button>
							<Button
								variant={showLayoutDesigner ? "default" : "outline"}
								size="sm"
								onClick={() => setShowLayoutDesigner(true)}
								className="h-6 text-xs"
							>
								Layout
							</Button>
							<Button
								variant={
									!showLayoutDesigner && viewMode === "preview"
										? "default"
										: "outline"
								}
								size="sm"
								onClick={() => {
									setShowLayoutDesigner(false);
									setViewMode("preview");
								}}
								className="h-6 text-xs"
							>
								Preview
							</Button>
							{/* <Button
								variant="outline"
								size="sm"
								onClick={() => setShowVendorPresets(true)}
								className="h-6 text-xs"
							>
								Vendor Presets
							</Button> */}
						</div>
					</div>

					{/* Vendor Preset Usage Indicator */}
					{
						currentPresetUsage && (
							<div className="bg-primary/10 flex h-6 items-center justify-between border-b px-3 text-xs">
								<span className="text-primary font-medium">
									Using vendor preset:{" "}
									{currentPresetUsage.usageType === "as-is"
										? "As-Is"
										: currentPresetUsage.usageType === "template"
											? "Template"
											: currentPresetUsage.usageType === "modified"
												? "Modified"
												: "Hybrid"}
								</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setCurrentPresetUsage(null)}
									className="h-4 text-xs"
								>
									Disconnect
								</Button>
							</div>
						)
					}

					{
						showLayoutDesigner ? (
							/* Layout Designer Mode */
							<div className="flex-1 overflow-hidden min-h-0 max-h-screen">
								<SimpleLayoutDesigner
									viewMode="design"
									initialLayout={{
										...currentArrangement?.layoutData,
										tables: currentArrangement?.tables || [],
										chairs: currentArrangement?.chairs || [],
										venueObjects: currentArrangement?.venueObjects || [],
									}}
									onSave={handleSaveLayout}
									onUseAsBackground={handleUseAsBackground}
									onExport={handleExport}
									ticketMode={ticketMode}
								/>
							</div>
						) : (
							/* Original Seating Mode */
							<div className="flex flex-1 overflow-hidden min-h-0">
								{/* Canvas Area */}
								<div className="relative flex flex-1 flex-col min-w-0 overflow-hidden min-h-0 max-h-screen">
									{/* Note: Add button moved to Layout Designer - Seating is now for assignment only */}

									{/* Canvas */}
									<div ref={canvasContainerRef} className="relative flex-1 bg-background min-w-0 min-h-0 max-h-screen overflow-hidden">
										<KonvaSeatingCanvas
											ref={canvasRef}
											tables={currentArrangement?.tables || []}
											chairs={currentArrangement?.chairs}
											venueObjects={currentArrangement?.venueObjects || []}
											layoutData={currentArrangement?.layoutData}
											onUpdateTable={handleUpdateTable}
											onUpdateChair={handleUpdateChair}
											onUpdateVenueObject={handleUpdateVenueObject}
											onSelectTable={setSelectedTable}
											onSelectChair={setSelectedChair}
											onSelectVenueObject={setSelectedVenueObject}
											onDeleteTable={handleDeleteTable}
											onDeleteChair={handleDeleteChair}
											onDeleteVenueObject={handleDeleteVenueObject}
											onConfigureTable={(table) => {
												setSelectedTable(table);
												setIsCreatingTable(false);
												setShowTableConfig(true);
											}}
											onConfigureChair={(chair) => {
												setSelectedChair(chair);
												setIsCreatingChair(false);
												setShowChairConfig(true);
											}}
											onConfigureVenueObject={(object) => {
												setSelectedVenueObject(object);
												setIsCreatingVenueObject(false);
												setShowVenueObjectConfig(true);
											}}
											onAssignSeat={() => { }}
											onAssignChair={handleAssignChair}
											onSwapSeats={(table) => {
												setSelectedTable(table);
												setShowSeatSwap(true);
											}}
											selectedTable={selectedTable}
											selectedChair={selectedChair}
											selectedVenueObject={selectedVenueObject}
											viewMode={viewMode}
											draggedGuest={draggedGuest}
											onDropGuestToSeat={handleDropGuestToSeat}
											onDropGuestToChair={handleDropGuestToChair}
											sidebarCollapsed={sidebarCollapsed}
											onToggleSidebar={() => {
												setSidebarCollapsed(!sidebarCollapsed);
												// Trigger manual resize after state update
												setTimeout(() => {
													if (canvasRef.current && canvasRef.current.handleResize) {
														canvasRef.current.handleResize();
													}
												}, 0);
											}}
										/>
									</div>
								</div>

								{/* Right Panel - Guest Management */}
								<div
									className={`relative flex flex-shrink-0 flex-col border-l bg-muted/30 ${sidebarCollapsed ? "w-0 border-l-0" : "w-64 lg:w-80"
										}`}
								>
									{!sidebarCollapsed && (
										<div className="flex flex-1 flex-col overflow-hidden min-h-0 max-h-screen">
											<GuestAssignmentPanel
												guests={unassignedGuests}
												tables={currentArrangement?.tables || []}
												chairs={currentArrangement?.chairs}
												selectedTable={selectedTable}
												onAssignGuest={handleAssignGuestFromPanel}
												onUnassignGuest={handleUnassignGuest}
												draggedGuest={draggedGuest}
												onSetDraggedGuest={setDraggedGuest}
											/>
										</div>
									)}
								</div>
							</div>
						)
					}

					{/* Analytics Panel */}
					{
						showAnalytics && (
							<SeatingAnalytics
								tables={currentArrangement?.tables || []}
								unassignedGuests={unassignedGuests}
								onClose={() => setShowAnalytics(false)}
							/>
						)
					}

					{/* Dialogs */}
					{
						showTableConfig && (
							<EnhancedTableConfigDialog
								table={selectedTable || undefined}
								onSave={handleSaveTableConfig}
								onClose={() => {
									setShowTableConfig(false);
									setSelectedTable(null);
									setIsCreatingTable(false);
								}}
								isCreating={isCreatingTable}
								availableGroups={["VIP", "Family", "Friends", "Colleagues"]}
							/>
						)
					}

					{
						showChairConfig && (
							<ChairConfigDialog
								chair={selectedChair || undefined}
								onSave={handleSaveChairConfig}
								onClose={() => {
									setShowChairConfig(false);
									setSelectedChair(null);
									setIsCreatingChair(false);
								}}
								isCreating={isCreatingChair}
								availableGroups={["VIP", "Family", "Friends", "Colleagues"]}
							/>
						)
					}

					{
						showVenueObjectConfig && (
							<VenueObjectDialog
								venueObject={selectedVenueObject || undefined}
								onSave={handleSaveVenueObjectConfig}
								onClose={() => {
									setShowVenueObjectConfig(false);
									setSelectedVenueObject(null);
									setIsCreatingVenueObject(false);
								}}
								isCreating={isCreatingVenueObject}
							/>
						)
					}

					{
						showSeatSwap && selectedTable && (
							<SeatSwapDialog
								table={selectedTable}
								onSwapSeats={(seat1, seat2) =>
									handleSwapSeats(selectedTable.id, seat1, seat2)
								}
								onClose={() => {
									setShowSeatSwap(false);
									setSelectedTable(null);
								}}
							/>
						)
					}

					{/* Print Dialog */}
					<PrintDialog
						open={showPrintDialog}
						onClose={() => setShowPrintDialog(false)}
						tables={currentArrangement?.tables || []}
						chairs={currentArrangement?.chairs}
						arrangementName={currentArrangement?.name || "Arrangement"}
						onExportDiagram={handleExport}
					/>

					{/* Smart Assign Dialog */}
					<SmartAssignDialog
						isOpen={showSmartAssignDialog}
						onClose={() => setShowSmartAssignDialog(false)}
						onConfirm={handleConfirmSmartAssign}
						unassignedGuests={unassignedGuests.length}
						availableSeats={(() => {
							const tableSeats = (currentArrangement?.tables || []).reduce((total, table) => {
								const assigned = Object.keys(table.seatAssignments || {}).length;
								return total + (table.seats - assigned);
							}, 0);
							const chairSeats = (currentArrangement?.chairs || []).filter(chair => !chair.guest).length;
							return tableSeats + chairSeats;
						})()}
						groupMatches={(() => {
							const groups = ["Colleagues", "Family", "Friends", "Plus Ones", "VIP"];
							return groups.map(group => {
								const guestsCount = unassignedGuests.filter(g => g.group === group).length;
								const seatsCount = (currentArrangement?.tables || []).reduce((total, table) => {
									if (table.targetGroup === group) {
										const assigned = Object.keys(table.seatAssignments || {}).length;
										return total + (table.seats - assigned);
									}
									return total;
								}, 0) + (currentArrangement?.chairs || []).filter(chair =>
									chair.targetGroup === group && !chair.guest
								).length;
								return { group, guestsCount, seatsCount };
							}).filter(match => match.guestsCount > 0 || match.seatsCount > 0);
						})()}
					/>

					{/* Vendor Preset Selector */}
					{
						showVendorPresets && (
							<div className="bg-background fixed inset-0 z-50 overflow-auto">
								<div className="p-6">
									<div className="mb-6 flex items-center justify-between">
										<h2 className="text-2xl font-bold">Choose Vendor Preset</h2>
										<Button
											variant="outline"
											onClick={() => setShowVendorPresets(false)}
										>
											Cancel
										</Button>
									</div>
									<VendorPresetSelector
										onSelectPreset={handleSelectVendorPreset}
										onClose={() => setShowVendorPresets(false)}
									/>
								</div>
							</div>
						)
					}

					{/* Drag Overlay */}
					<DragOverlay>
						{draggedGuest ? (
							<div className="bg-card text-card-foreground shadow-xl border rounded-lg p-3 w-64 pointer-events-none opacity-90 ring-2 ring-purple-500">
								<div className="flex items-center gap-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-xs ring-2 ring-white">
										{draggedGuest.initials}
									</div>
									<div>
										<div className="font-semibold text-sm">{draggedGuest.name}</div>
										<div className="text-xs text-muted-foreground">{draggedGuest.group}</div>
									</div>
								</div>
							</div>
						) : null}
					</DragOverlay>
				</div>
			</DndContext>
		</LocationContextProvider>
	);
};

const EnhancedSeatingModule = ({
	eventId,
	onBack,
}: EnhancedSeatingModuleProps) => {
	return <EnhancedSeatingModuleContent onBack={onBack} />;
};

export default EnhancedSeatingModule;
